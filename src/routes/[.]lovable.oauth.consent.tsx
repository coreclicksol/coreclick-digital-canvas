import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Wordmark } from "@/components/Navbar";

type OAuthResult = {
  redirect_url?: string;
  redirect_to?: string;
  client?: { name?: string; client_name?: string; redirect_uri?: string } | null;
  scope?: string;
  scopes?: string[];
};

type OAuthApi = {
  getAuthorizationDetails: (
    id: string,
  ) => Promise<{ data: OAuthResult | null; error: { message: string } | null }>;
  approveAuthorization: (
    id: string,
  ) => Promise<{ data: OAuthResult | null; error: { message: string } | null }>;
  denyAuthorization: (
    id: string,
  ) => Promise<{ data: OAuthResult | null; error: { message: string } | null }>;
};

function oauthApi(): OAuthApi {
  return (supabase.auth as unknown as { oauth: OAuthApi }).oauth;
}

export const Route = createFileRoute("/.lovable/oauth/consent")({
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({
    authorization_id: typeof s["authorization_id"] === "string" ? s["authorization_id"] : "",
  }),
  loader: async ({ location }) => {
    const authorizationId = new URLSearchParams(location.search).get("authorization_id");
    if (!authorizationId) throw new Error("Missing authorization_id");

    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) return { needsAuth: true as const, details: null };

    const { data, error } = await oauthApi().getAuthorizationDetails(authorizationId);
    if (error) throw new Error(error.message);

    const immediate = data?.redirect_url ?? data?.redirect_to;
    if (immediate && !data?.client) throw redirect({ href: immediate });

    return {
      needsAuth: false as const,
      details: data,
      email: sessionData.session.user.email ?? null,
    };
  },
  component: Consent,
  errorComponent: ({ error }) => (
    <Shell>
      <h1 className="font-display text-2xl font-semibold">Authorization unavailable</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        {String((error as Error)?.message ?? error)}
      </p>
    </Shell>
  ),
});

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-28">
      <div className="glass w-full max-w-md rounded-[2rem] p-8">
        <Wordmark />
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}

const field =
  "w-full rounded-2xl border border-glass-border bg-transparent px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";

function SignIn() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setNotice(null);
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");

    if (mode === "signin") {
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      if (err) {
        setBusy(false);
        setError(err.message);
        return;
      }
      window.location.reload();
      return;
    }

    const { error: err } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.href },
    });
    setBusy(false);
    if (err) {
      setError(err.message);
      return;
    }
    setNotice("Check your inbox to confirm your email, then return to this page.");
  };

  const google = async () => {
    setError(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.href,
    });
    if (result.error) {
      setError("Google sign-in failed. Please try again.");
      return;
    }
    if (result.redirected) return;
    window.location.reload();
  };

  return (
    <Shell>
      <h1 className="font-display text-2xl font-semibold tracking-tight">Sign in to continue</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Sign in to your CoreClick account to approve this connection.
      </p>

      <button
        type="button"
        onClick={google}
        className="mt-6 w-full rounded-full border border-glass-border px-5 py-3 text-sm font-medium transition-colors hover:border-primary/60 hover:text-primary"
      >
        Continue with Google
      </button>

      <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-glass-border" /> or <span className="h-px flex-1 bg-glass-border" />
      </div>

      <form onSubmit={onSubmit} className="grid gap-3">
        <input required type="email" name="email" placeholder="you@company.com" className={field} />
        <input
          required
          type="password"
          name="password"
          minLength={6}
          placeholder="Password"
          className={field}
        />
        <button
          type="submit"
          disabled={busy}
          className="rounded-full bg-primary px-5 py-3 font-display text-sm font-medium text-primary-foreground disabled:opacity-60"
        >
          {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
        </button>
      </form>

      {error ? (
        <p className="mt-3 text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
      {notice ? <p className="mt-3 text-sm text-primary">{notice}</p> : null}

      <button
        type="button"
        onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
        className="mt-5 text-sm text-muted-foreground underline-offset-4 hover:underline"
      >
        {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
      </button>
    </Shell>
  );
}

function Consent() {
  const data = Route.useLoaderData();
  const { authorization_id } = Route.useSearch();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Authorize access — CoreClick";
  }, []);

  if (data.needsAuth) return <SignIn />;

  const details = data.details;
  const clientName = details?.client?.name ?? details?.client?.client_name ?? "an app";
  const scopes = details?.scopes ?? (details?.scope ? details.scope.split(" ") : []);

  const decide = async (approve: boolean) => {
    setBusy(true);
    setError(null);
    const api = oauthApi();
    const { data: result, error: err } = approve
      ? await api.approveAuthorization(authorization_id)
      : await api.denyAuthorization(authorization_id);
    if (err) {
      setBusy(false);
      setError(err.message);
      return;
    }
    const target = result?.redirect_url ?? result?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("No redirect returned by the authorization server.");
      return;
    }
    window.location.href = target;
  };

  return (
    <Shell>
      <h1 className="font-display text-2xl font-semibold tracking-tight">
        Connect {clientName} to CoreClick
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        This lets {clientName} use CoreClick&apos;s tools as you — reading services, packages, work
        and articles, and creating or reading your own project inquiries.
      </p>

      <dl className="mt-6 space-y-3 text-sm">
        {data.email ? (
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Signed in as</dt>
            <dd className="truncate">{data.email}</dd>
          </div>
        ) : null}
        {details?.client?.redirect_uri ? (
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Redirects to</dt>
            <dd className="truncate">{details.client.redirect_uri}</dd>
          </div>
        ) : null}
        {scopes.length ? (
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Shares</dt>
            <dd className="truncate">{scopes.join(", ")}</dd>
          </div>
        ) : null}
      </dl>

      <p className="mt-5 text-xs text-muted-foreground">
        This does not bypass this app&apos;s permissions — you only ever see your own inquiries.
      </p>

      {error ? (
        <p className="mt-4 text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}

      <div className="mt-7 flex flex-wrap gap-3">
        <button
          type="button"
          disabled={busy}
          onClick={() => decide(true)}
          className="rounded-full bg-primary px-6 py-3 font-display text-sm font-medium text-primary-foreground disabled:opacity-60"
        >
          Approve
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() => decide(false)}
          className="rounded-full border border-glass-border px-6 py-3 font-display text-sm font-medium disabled:opacity-60"
        >
          Cancel connection
        </button>
      </div>
    </Shell>
  );
}

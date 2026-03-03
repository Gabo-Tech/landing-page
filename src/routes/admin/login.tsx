import { createSignal } from 'solid-js';

export default function AdminLoginPage() {
  const [passcode, setPasscode] = createSignal('');
  const [error, setError] = createSignal('');
  const [submitting, setSubmitting] = createSignal(false);

  const submit = async (event: Event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ passcode: passcode() }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        setError(payload.error ?? 'Login failed');
        return;
      }

      window.location.href = '/admin';
    } catch {
      setError('Network error while logging in');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main class="min-h-screen bg-stone-900 text-white flex items-center justify-center px-4">
      <section class="w-full max-w-md bg-stone-800 rounded-lg p-6 shadow-lg">
        <h1 class="text-2xl font-bold mb-2">Admin Login</h1>
        <p class="text-sm text-gray-300 mb-6">
          Enter your admin passcode to access content editing.
        </p>
        <form onSubmit={submit} class="space-y-4">
          <div>
            <label for="passcode" class="block text-sm mb-2">
              Passcode
            </label>
            <input
              id="passcode"
              type="password"
              value={passcode()}
              onInput={e => setPasscode(e.currentTarget.value)}
              class="w-full rounded border border-gray-600 bg-stone-950 px-3 py-2 text-white"
              autocomplete="current-password"
              required
            />
          </div>
          {error() && <p class="text-sm text-red-400">{error()}</p>}
          <button
            type="submit"
            disabled={submitting()}
            class="w-full rounded bg-white text-stone-900 font-semibold px-4 py-2 disabled:opacity-70"
          >
            {submitting() ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </section>
    </main>
  );
}

import { For, Show, createEffect, createSignal } from 'solid-js';

const sections = [
  'site',
  'home',
  'about',
  'contact',
  'legal',
  'pricing',
  'partners',
  'customers',
] as const;

type SectionKey = (typeof sections)[number];

export default function AdminDashboardPage() {
  const [selectedSection, setSelectedSection] = createSignal<SectionKey>('home');
  const [jsonText, setJsonText] = createSignal('');
  const [loading, setLoading] = createSignal(true);
  const [saving, setSaving] = createSignal(false);
  const [error, setError] = createSignal('');
  const [success, setSuccess] = createSignal('');

  const loadSection = async (section: SectionKey) => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const response = await fetch(`/api/admin/content/${section}`);
      if (response.status === 401) {
        window.location.href = '/admin/login';
        return;
      }
      const payload = await response.json();
      if (!response.ok) {
        setError(payload.error ?? 'Unable to load content');
        return;
      }
      setJsonText(JSON.stringify(payload.data, null, 2));
    } catch {
      setError('Network error while loading content');
    } finally {
      setLoading(false);
    }
  };

  createEffect(() => {
    void loadSection(selectedSection());
  });

  const saveSection = async () => {
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const parsed = JSON.parse(jsonText());
      const response = await fetch(`/api/admin/content/${selectedSection()}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ data: parsed }),
      });
      const payload = await response.json().catch(() => ({}));
      if (response.status === 401) {
        window.location.href = '/admin/login';
        return;
      }
      if (!response.ok) {
        setError(payload.error ?? 'Unable to save content');
        return;
      }
      setSuccess('Saved successfully.');
    } catch {
      setError('Invalid JSON. Fix formatting before saving.');
    } finally {
      setSaving(false);
    }
  };

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  };

  return (
    <main class="min-h-screen bg-stone-900 text-white px-4 py-6">
      <div class="max-w-6xl mx-auto space-y-4">
        <header class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 class="text-2xl font-bold">Content Dashboard</h1>
            <p class="text-sm text-gray-300">
              Edit page copy, services, carousels, and contact links/icons.
            </p>
          </div>
          <button
            onClick={logout}
            class="rounded bg-stone-700 px-4 py-2 text-sm font-medium hover:bg-stone-600"
          >
            Logout
          </button>
        </header>

        <section class="bg-stone-800 rounded-lg p-4">
          <label for="section" class="block text-sm mb-2">
            Section
          </label>
          <select
            id="section"
            value={selectedSection()}
            onChange={e => setSelectedSection(e.currentTarget.value as SectionKey)}
            class="w-full sm:w-80 rounded border border-gray-600 bg-stone-950 px-3 py-2"
          >
            <For each={sections}>
              {section => (
                <option value={section}>
                  {section}
                </option>
              )}
            </For>
          </select>
        </section>

        <section class="bg-stone-800 rounded-lg p-4 space-y-3">
          <Show when={!loading()} fallback={<p class="text-sm text-gray-300">Loading...</p>}>
            <textarea
              value={jsonText()}
              onInput={e => setJsonText(e.currentTarget.value)}
              class="w-full min-h-[420px] rounded border border-gray-600 bg-stone-950 p-3 font-mono text-sm text-gray-100"
              spellcheck={false}
            />
          </Show>

          <div class="flex flex-wrap items-center gap-3">
            <button
              onClick={saveSection}
              disabled={saving() || loading()}
              class="rounded bg-white text-stone-900 px-4 py-2 text-sm font-semibold disabled:opacity-70"
            >
              {saving() ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              onClick={() => void loadSection(selectedSection())}
              disabled={loading()}
              class="rounded bg-stone-700 px-4 py-2 text-sm font-medium hover:bg-stone-600 disabled:opacity-70"
            >
              Reload
            </button>
          </div>
          {error() && <p class="text-sm text-red-400">{error()}</p>}
          {success() && <p class="text-sm text-green-400">{success()}</p>}
        </section>
      </div>
    </main>
  );
}

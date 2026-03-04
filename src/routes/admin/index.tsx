import { For, Show, createEffect, createMemo, createSignal } from 'solid-js';
import type { JSX } from 'solid-js';

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

type JsonPrimitive = string | number | boolean | null;
type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };
type JsonPath = Array<string | number>;

function isRecord(value: unknown): value is Record<string, JsonValue> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

function getDefaultFromTemplate(template: JsonValue | undefined): JsonValue {
  if (template === undefined || template === null) return '';
  if (Array.isArray(template)) return [];
  if (typeof template === 'object') {
    const next: Record<string, JsonValue> = {};
    for (const [key, value] of Object.entries(template)) {
      next[key] = getDefaultFromTemplate(value);
    }
    return next;
  }
  if (typeof template === 'number') return 0;
  if (typeof template === 'boolean') return false;
  return '';
}

function setAtPath(source: JsonValue, path: JsonPath, value: JsonValue): JsonValue {
  const next = structuredClone(source) as JsonValue;
  let cursor: any = next;
  for (let index = 0; index < path.length - 1; index += 1) {
    cursor = cursor[path[index]];
  }
  cursor[path[path.length - 1]] = value;
  return next;
}

function removeArrayItemAtPath(source: JsonValue, path: JsonPath, indexToRemove: number): JsonValue {
  const next = structuredClone(source) as JsonValue;
  let cursor: any = next;
  for (const segment of path) {
    cursor = cursor[segment];
  }
  if (Array.isArray(cursor)) {
    cursor.splice(indexToRemove, 1);
  }
  return next;
}

function addArrayItemAtPath(source: JsonValue, path: JsonPath, template?: JsonValue): JsonValue {
  const next = structuredClone(source) as JsonValue;
  let cursor: any = next;
  for (const segment of path) {
    cursor = cursor[segment];
  }
  if (Array.isArray(cursor)) {
    cursor.push(getDefaultFromTemplate(template));
  }
  return next;
}

export default function AdminDashboardPage() {
  const [selectedSection, setSelectedSection] = createSignal<SectionKey>('home');
  const [sectionData, setSectionData] = createSignal<JsonValue | null>(null);
  const [jsonText, setJsonText] = createSignal('{}');
  const [showJsonEditor, setShowJsonEditor] = createSignal(false);
  const [loading, setLoading] = createSignal(true);
  const [saving, setSaving] = createSignal(false);
  const [uploading, setUploading] = createSignal(false);
  const [uploadHref, setUploadHref] = createSignal('');
  const [uploadAlt, setUploadAlt] = createSignal('');
  const [uploadFile, setUploadFile] = createSignal<File | null>(null);
  const [error, setError] = createSignal('');
  const [success, setSuccess] = createSignal('');
  const isBrandSection = createMemo(
    () => selectedSection() === 'partners' || selectedSection() === 'customers',
  );

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
      setSectionData(payload.data);
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
      const payloadData = showJsonEditor() ? JSON.parse(jsonText()) : sectionData();
      const response = await fetch(`/api/admin/content/${selectedSection()}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ data: payloadData }),
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
      if (showJsonEditor()) {
        setSectionData(JSON.parse(jsonText()));
      } else if (sectionData() != null) {
        setJsonText(JSON.stringify(sectionData(), null, 2));
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

  const applyUpdate = (next: JsonValue) => {
    setSectionData(next);
    setJsonText(JSON.stringify(next, null, 2));
  };

  const updatePrimitive = (path: JsonPath, nextValue: JsonValue) => {
    const current = sectionData();
    if (current == null || path.length === 0) return;
    applyUpdate(setAtPath(current, path, nextValue));
  };

  const removeFromArray = (path: JsonPath, indexToRemove: number) => {
    const current = sectionData();
    if (current == null) return;
    applyUpdate(removeArrayItemAtPath(current, path, indexToRemove));
  };

  const addToArray = (path: JsonPath, template?: JsonValue) => {
    const current = sectionData();
    if (current == null) return;
    applyUpdate(addArrayItemAtPath(current, path, template));
  };

  const uploadSvg = async () => {
    if (!isBrandSection()) return;
    if (!uploadFile()) {
      setError('Select an SVG file first.');
      return;
    }
    if (!uploadHref().trim() || !uploadAlt().trim()) {
      setError('Logo link and alt text are required.');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('section', selectedSection());
      formData.append('href', uploadHref().trim());
      formData.append('alt', uploadAlt().trim());
      formData.append('file', uploadFile() as File);

      const response = await fetch('/api/admin/content/upload', {
        method: 'POST',
        body: formData,
      });
      const payload = await response.json().catch(() => ({}));
      if (response.status === 401) {
        window.location.href = '/admin/login';
        return;
      }
      if (!response.ok) {
        setError(payload.error ?? 'Unable to upload SVG');
        return;
      }

      setUploadHref('');
      setUploadAlt('');
      setUploadFile(null);
      setSuccess('Logo uploaded. Remember to verify in production with persistent storage.');
      await loadSection(selectedSection());
    } catch {
      setError('Network error while uploading SVG');
    } finally {
      setUploading(false);
    }
  };

  const renderField = (value: JsonValue, path: JsonPath, label: string): JSX.Element => {
    if (value === null) {
      return (
        <div class="space-y-1">
          <label class="block text-xs text-gray-300">{label}</label>
          <input
            value=""
            onInput={event => updatePrimitive(path, event.currentTarget.value)}
            class="w-full rounded border border-gray-600 bg-stone-950 px-3 py-2 text-sm"
          />
        </div>
      );
    }

    if (typeof value === 'string') {
      const multiline = value.length > 100 || value.includes('\n');
      return (
        <div class="space-y-1">
          <label class="block text-xs text-gray-300">{label}</label>
          <Show
            when={multiline}
            fallback={
              <input
                value={value}
                onInput={event => updatePrimitive(path, event.currentTarget.value)}
                class="w-full rounded border border-gray-600 bg-stone-950 px-3 py-2 text-sm"
              />
            }
          >
            <textarea
              value={value}
              onInput={event => updatePrimitive(path, event.currentTarget.value)}
              class="w-full min-h-24 rounded border border-gray-600 bg-stone-950 px-3 py-2 text-sm"
              spellcheck={false}
            />
          </Show>
        </div>
      );
    }

    if (typeof value === 'number') {
      return (
        <div class="space-y-1">
          <label class="block text-xs text-gray-300">{label}</label>
          <input
            type="number"
            value={String(value)}
            onInput={event => updatePrimitive(path, Number(event.currentTarget.value))}
            class="w-full rounded border border-gray-600 bg-stone-950 px-3 py-2 text-sm"
          />
        </div>
      );
    }

    if (typeof value === 'boolean') {
      return (
        <label class="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={value}
            onChange={event => updatePrimitive(path, event.currentTarget.checked)}
          />
          {label}
        </label>
      );
    }

    if (Array.isArray(value)) {
      return (
        <div class="rounded border border-stone-700 p-3 space-y-3">
          <div class="flex items-center justify-between gap-2">
            <h3 class="text-sm font-semibold">{label}</h3>
            <button
              type="button"
              onClick={() => addToArray(path, value[0])}
              class="rounded bg-stone-700 px-2 py-1 text-xs hover:bg-stone-600"
            >
              Add Item
            </button>
          </div>
          <Show when={value.length > 0} fallback={<p class="text-xs text-gray-400">No items.</p>}>
            <For each={value}>
              {(item, index) => (
                <div class="rounded border border-stone-700 p-3 space-y-2">
                  <div class="flex items-center justify-between">
                    <p class="text-xs text-gray-300">
                      Item {index() + 1}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeFromArray(path, index())}
                      class="rounded bg-red-600/20 px-2 py-1 text-xs text-red-300 hover:bg-red-600/30"
                    >
                      Remove
                    </button>
                  </div>
                  {renderField(item as JsonValue, [...path, index()], `${label} item`)}
                </div>
              )}
            </For>
          </Show>
        </div>
      );
    }

    if (isRecord(value)) {
      return (
        <div class="rounded border border-stone-700 p-3 space-y-3">
          <h3 class="text-sm font-semibold">{label}</h3>
          <div class="grid gap-3">
            <For each={Object.entries(value)}>
              {([key, nestedValue]) => renderField(nestedValue, [...path, key], key)}
            </For>
          </div>
        </div>
      );
    }

    return <></>;
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
          <p class="text-sm mb-3">Section</p>
          <nav class="flex flex-wrap gap-2">
            <For each={sections}>
              {section => (
                <button
                  type="button"
                  onClick={() => setSelectedSection(section)}
                  class={`rounded px-3 py-2 text-sm ${
                    selectedSection() === section
                      ? 'bg-white text-stone-900 font-semibold'
                      : 'bg-stone-950 border border-stone-700 hover:bg-stone-700'
                  }`}
                >
                  {section}
                </button>
              )}
            </For>
          </nav>
        </section>

        <Show when={isBrandSection()}>
          <section class="bg-stone-800 rounded-lg p-4 space-y-3">
            <h2 class="text-base font-semibold">Upload SVG Logo</h2>
            <div class="grid gap-3 md:grid-cols-2">
              <input
                value={uploadHref()}
                onInput={event => setUploadHref(event.currentTarget.value)}
                placeholder="Logo target link (https://...)"
                class="rounded border border-gray-600 bg-stone-950 px-3 py-2 text-sm"
              />
              <input
                value={uploadAlt()}
                onInput={event => setUploadAlt(event.currentTarget.value)}
                placeholder="Logo alt text"
                class="rounded border border-gray-600 bg-stone-950 px-3 py-2 text-sm"
              />
            </div>
            <input
              type="file"
              accept=".svg,image/svg+xml"
              onChange={event => setUploadFile(event.currentTarget.files?.[0] ?? null)}
              class="block w-full text-sm"
            />
            <button
              type="button"
              onClick={uploadSvg}
              disabled={uploading() || loading()}
              class="rounded bg-emerald-500 px-4 py-2 text-sm font-semibold text-stone-950 disabled:opacity-70"
            >
              {uploading() ? 'Uploading...' : `Upload to ${selectedSection()}`}
            </button>
          </section>
        </Show>

        <section class="bg-stone-800 rounded-lg p-4 space-y-3">
          <Show when={!loading()} fallback={<p class="text-sm text-gray-300">Loading...</p>}>
            <div class="space-y-3">
              <Show when={sectionData() !== null}>
                {renderField(sectionData() as JsonValue, [], selectedSection())}
              </Show>
            </div>
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
            <button
              type="button"
              onClick={() => setShowJsonEditor(!showJsonEditor())}
              class="rounded bg-stone-700 px-4 py-2 text-sm font-medium hover:bg-stone-600"
            >
              {showJsonEditor() ? 'Hide JSON' : 'Advanced JSON'}
            </button>
          </div>
          <Show when={showJsonEditor()}>
            <textarea
              value={jsonText()}
              onInput={event => setJsonText(event.currentTarget.value)}
              class="w-full min-h-[280px] rounded border border-gray-600 bg-stone-950 p-3 font-mono text-sm text-gray-100"
              spellcheck={false}
            />
          </Show>
          {error() && <p class="text-sm text-red-400">{error()}</p>}
          {success() && <p class="text-sm text-green-400">{success()}</p>}
        </section>
      </div>
    </main>
  );
}

import { createSignal, onMount } from 'solid-js';
import type { JSX } from 'solid-js';

type LocalizedPriceProps = {
  fromChf: number;
  toChf?: number;
  prefix?: string;
  period?: 'month';
  class?: string;
  showChfReference?: boolean;
};

const currencyByRegion: Record<string, string> = {
  US: 'USD',
  GB: 'GBP',
  CA: 'CAD',
  AU: 'AUD',
  NZ: 'NZD',
  JP: 'JPY',
  IN: 'INR',
  BR: 'BRL',
  MX: 'MXN',
  SG: 'SGD',
  HK: 'HKD',
  AE: 'AED',
  SA: 'SAR',
  ZA: 'ZAR',
  SE: 'SEK',
  NO: 'NOK',
  DK: 'DKK',
  PL: 'PLN',
  CZ: 'CZK',
  HU: 'HUF',
  RO: 'RON',
  TR: 'TRY',
  CH: 'CHF',
  DE: 'EUR',
  FR: 'EUR',
  IT: 'EUR',
  ES: 'EUR',
  PT: 'EUR',
  NL: 'EUR',
  BE: 'EUR',
  AT: 'EUR',
  IE: 'EUR',
  FI: 'EUR',
  GR: 'EUR',
  SK: 'EUR',
  SI: 'EUR',
  HR: 'EUR',
  EE: 'EUR',
  LV: 'EUR',
  LT: 'EUR',
  LU: 'EUR',
  CY: 'EUR',
  MT: 'EUR',
};

let ratesCache: Record<string, number> | null = null;
let ratesPromise: Promise<Record<string, number> | null> | null = null;

function getRegionFromLocale(locale: string): string {
  const normalized = locale.replace('_', '-');
  const parts = normalized.split('-');
  return parts[1]?.toUpperCase() ?? 'US';
}

function getCurrencyFromLocale(locale: string): string {
  const region = getRegionFromLocale(locale);
  return currencyByRegion[region] ?? 'USD';
}

function formatAmount(amount: number, locale: string, currency: string): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatRange(from: number, to: number | undefined, locale: string, currency: string): string {
  const fromText = formatAmount(from, locale, currency);
  if (to === undefined) return fromText;
  const toText = formatAmount(to, locale, currency);
  return `${fromText}-${toText}`;
}

function appendPeriod(value: string, period: LocalizedPriceProps['period']): string {
  if (!period) return value;
  return `${value}/${period}`;
}

async function getChfRates(): Promise<Record<string, number> | null> {
  if (ratesCache) return ratesCache;
  if (ratesPromise) return ratesPromise;

  ratesPromise = fetch('https://open.er-api.com/v6/latest/CHF')
    .then(async (response) => {
      if (!response.ok) return null;
      const payload = await response.json();
      if (payload?.result !== 'success' || !payload?.rates) return null;
      ratesCache = payload.rates as Record<string, number>;
      return ratesCache;
    })
    .catch(() => null);

  return ratesPromise;
}

export default function LocalizedPrice(props: LocalizedPriceProps): JSX.Element {
  const [display, setDisplay] = createSignal<string>('');

  const buildChfText = (): string => {
    const locale = 'en-CH';
    const range = formatRange(props.fromChf, props.toChf, locale, 'CHF');
    const withPeriod = appendPeriod(range, props.period);
    return props.prefix ? `${props.prefix} ${withPeriod}` : withPeriod;
  };

  onMount(async () => {
    const locale = navigator.language || 'en-US';
    const targetCurrency = getCurrencyFromLocale(locale);
    const chfText = buildChfText();

    if (targetCurrency === 'CHF') {
      setDisplay(chfText);
      return;
    }

    const rates = await getChfRates();
    const rate = rates?.[targetCurrency];

    if (!rate) {
      setDisplay(chfText);
      return;
    }

    const localFrom = props.fromChf * rate;
    const localTo = props.toChf !== undefined ? props.toChf * rate : undefined;
    const localRange = formatRange(localFrom, localTo, locale, targetCurrency);
    const localWithPeriod = appendPeriod(localRange, props.period);
    const localText = props.prefix ? `${props.prefix} ${localWithPeriod}` : localWithPeriod;

    if (props.showChfReference === false) {
      setDisplay(localText);
      return;
    }

    setDisplay(`${localText} (CHF ${appendPeriod(formatRange(props.fromChf, props.toChf, 'en-CH', 'CHF'), props.period)})`);
  });

  return <span class={props.class}>{display() || buildChfText()}</span>;
}

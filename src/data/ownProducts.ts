export type OwnProduct = {
  name: string;
  description: string;
  href: string;
  host: string;
};

export const ownProducts: readonly OwnProduct[] = [
  {
    name: 'Puto Pulse',
    description:
      'Weekly book-summary newsletter. One great book in 5 minutes, with 500+ subscribers.',
    href: 'https://putopulse.org/',
    host: 'putopulse.org',
  },
  {
    name: 'Mining Profit Lab',
    description: 'Free crypto mining profitability calculator.',
    href: 'https://miningcalculator.gabo.rocks/',
    host: 'miningcalculator.gabo.rocks',
  },
  {
    name: 'Grok Voice',
    description: "Open-source Android voice assistant for xAI's Grok.",
    href: 'https://gabo-tech.github.io/grok-voice-android/',
    host: 'gabo-tech.github.io',
  },
  {
    name: 'Aurelia',
    description: 'Personal finance and net worth tracker.',
    href: 'https://financetracker.putopulse.org/',
    host: 'financetracker.putopulse.org',
  },
  {
    name: 'Threadly',
    description: 'Writing studio for threads and long posts.',
    href: 'https://threadly.putopulse.org/',
    host: 'threadly.putopulse.org',
  },
];

// @refresh reload
import { mount, StartClient } from '@solidjs/start/client';
import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';
import './app.css';

inject();
injectSpeedInsights();

export default mount(() => <StartClient />, document.getElementById('app')!);

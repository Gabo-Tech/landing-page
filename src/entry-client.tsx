// @refresh reload
import { mount, StartClient } from '@solidjs/start/client';
import './app.css';

export default mount(() => <StartClient />, document.getElementById('app')!);

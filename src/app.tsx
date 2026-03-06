import { Router, useLocation, useRoutes } from '@solidjs/router';
import { Suspense } from 'solid-js';
import { FileRoutes } from '@solidjs/start/router';
import { getRequestEvent, isServer } from 'solid-js/web';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/playfair-display/500.css';
import '@fontsource/playfair-display/700.css';
import Nav from '~/components/Navbar/Nav';
import Footer from '~/components/Footer/Footer';
import ScrollbarVisibility from '~/components/Scrollbar/ScrollbarVisibility';
import ScrollRevealManager from '~/components/animations/ScrollRevealManager';
import './app.css';

function AppRoutes() {
  const Routes = useRoutes(FileRoutes());
  return <Routes />;
}

function AppLayout() {
  const location = useLocation();
  const isAdminRoute = () => location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollbarVisibility />
      <ScrollRevealManager />
      {!isAdminRoute() && <Nav />}
      <div class={`app-scroll-root ${isAdminRoute() ? 'app-scroll-root--admin' : ''}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <AppRoutes />
        </Suspense>
        {!isAdminRoute() && <Footer />}
      </div>
    </>
  );
}

export default function App() {
  const requestUrl = isServer ? getRequestEvent()?.request.url : undefined;

  return (
    <Router url={requestUrl}>
      <AppLayout />
    </Router>
  );
}

import { Router, useLocation, useRoutes } from '@solidjs/router';
import { Suspense } from 'solid-js';
import { FileRoutes } from '@solidjs/start/router';
import { getRequestEvent, isServer } from 'solid-js/web';
import Nav from '~/components/Navbar/Nav';
import Footer from '~/components/Footer/Footer';
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
      {!isAdminRoute() && <Nav />}
      <Suspense fallback={<div>Loading...</div>}>
        <AppRoutes />
      </Suspense>
      {!isAdminRoute() && <Footer />}
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

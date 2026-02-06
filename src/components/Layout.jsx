import { Outlet, Link } from "react-router";

/**
 * Layout wrapper
 */

export function Layout() {
  return (
    <div className="app-layout">
      <header className="app-header">
        <nav className="app-nav">
          <Link to="/" className="app-logo">
            The Movie Internet
          </Link>
          <div className="nav-links">
            <Link to="/">Home</Link>
          </div>
        </nav>
      </header>

      <main className="app-main">
        {/* Outlet renders the matched child route */}
        <Outlet />
      </main>

      <footer className="app-footer">
        <p>Powered by TMDB - Be Kind, Please Rewind </p>
      </footer>
    </div>
  );
}
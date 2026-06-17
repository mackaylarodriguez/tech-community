"use client";

import AuthPanel from "./AuthPanel";
import { AuthProvider } from "./AuthProvider";

export default function AppShell({ children }) {
  return (
    <AuthProvider>
      <header className="navbar">
        <div className="navbar-inner">
          <div className="navbar-brand">
            <h1>Tech Community</h1>
            <p className="text-secondary navbar-tagline">
              Find programs, jobs, and resources in tech
            </p>
          </div>
          <AuthPanel />
        </div>
      </header>
      <main className="page">{children}</main>
    </AuthProvider>
  );
}

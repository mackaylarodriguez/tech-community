"use client";

import AuthPanel from "./AuthPanel";
import { AuthProvider } from "./AuthProvider";

export default function AppShell({ children }) {
  return (
    <AuthProvider>
      <header className="navbar">
        <div className="navbar-inner">
          <div>
            <h1>Tech Community</h1>
            <p className="text-secondary">
              A community resource board for people in tech
            </p>
          </div>
          <AuthPanel />
        </div>
      </header>
      <main className="page">{children}</main>
    </AuthProvider>
  );
}

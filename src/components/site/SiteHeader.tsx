import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/sb-logo.svg";
import { cta } from "./ui";

const nav = [
  { to: "/services", label: "Services" },
  { to: "/pay-monthly-websites", label: "Pay monthly" },
  { to: "/pricing", label: "Pricing" },
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container-site flex h-18 items-center justify-between py-3">
        <Link to="/" aria-label="SB Digital Studios home" className="shrink-0">
          <img src={logo} alt="SB Digital Studios" className="h-10 w-auto" width={113} height={40} />
        </Link>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Link to="/contact" className={cta()}>Book a free call</Link>
        </div>
        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="container-site flex flex-col gap-4 pb-6 lg:hidden" aria-label="Mobile">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="text-lg font-medium">
              {n.label}
            </Link>
          ))}
          <Link to="/contact" onClick={() => setOpen(false)} className={cta()}>Book a free call</Link>
        </nav>
      )}
    </header>
  );
}

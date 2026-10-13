import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { cta } from "./ui";

const KEY = "sb-cookie-consent";
const EVENT = "sb-open-cookie-settings";

export function openCookieSettings() {
  window.dispatchEvent(new Event(EVENT));
}

/** Stores the visitor's choice. The site sets no non-essential cookies until analytics is added and accepted. */
export function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem(KEY)) setShow(true);
    const open = () => setShow(true);
    window.addEventListener(EVENT, open);
    return () => window.removeEventListener(EVENT, open);
  }, []);
  if (!show) return null;
  const choose = (v: "accepted" | "rejected") => {
    localStorage.setItem(KEY, JSON.stringify({ choice: v, at: new Date().toISOString() }));
    setShow(false);
  };
  return (
    <div role="dialog" aria-label="Cookie preferences" className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl rounded-2xl border border-border bg-card p-5 shadow-2xl">
      <p className="text-sm text-muted-foreground">
        We only use essential storage to run this site. If we add optional analytics cookies, they will only be used if you accept. Read our{" "}
        <Link to="/cookies" className="text-primary underline">cookie policy</Link>.
      </p>
      <div className="mt-4 flex gap-3">
        <button className={cta({ size: "md" })} onClick={() => choose("accepted")}>Accept</button>
        <button className={cta({ variant: "outline" })} onClick={() => choose("rejected")}>Reject optional</button>
      </div>
    </div>
  );
}

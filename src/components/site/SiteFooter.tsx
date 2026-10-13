import { Link } from "@tanstack/react-router";
import logo from "@/assets/sb-logo.svg";
import { business, services } from "@/lib/site/data";
import { openCookieSettings } from "./CookieBanner";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-site grid gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <img src={logo} alt="SB Digital Studios" className="h-10 w-auto" width={113} height={40} />
          <p className="mt-4 text-sm text-muted-foreground">
            Bespoke websites, WordPress and WooCommerce from Kettering, Northamptonshire.
          </p>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-highlight">Services</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to="/services/$slug" params={{ slug: s.slug }} className="hover:text-foreground">{s.title}</Link>
              </li>
            ))}
            <li><Link to="/pay-monthly-websites" className="hover:text-foreground">Pay-monthly websites</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-highlight">Local</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/website-design-kettering" className="hover:text-foreground">Website design Kettering</Link></li>
            <li><Link to="/wordpress-woocommerce-kettering" className="hover:text-foreground">WordPress & WooCommerce Kettering</Link></li>
            <li><Link to="/website-design-northamptonshire" className="hover:text-foreground">Website design Northamptonshire</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-highlight">Contact</h3>
          <address className="space-y-1 text-sm not-italic text-muted-foreground">
            <p><a href={`mailto:${business.email}`} className="hover:text-foreground">{business.email}</a></p>
            <p>{business.address.town}</p>
            <p>{business.address.county} {business.address.postcode}</p>
            <p>{business.hours}</p>
          </address>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-site flex flex-col gap-3 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {business.legal}.</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/privacy" className="hover:text-foreground">Privacy policy</Link>
            <Link to="/cookies" className="hover:text-foreground">Cookie policy</Link>
            <Link to="/terms" className="hover:text-foreground">Terms</Link>
            <button onClick={openCookieSettings} className="hover:text-foreground">Cookie settings</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

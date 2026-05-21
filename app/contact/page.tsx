import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { ContactForm } from "@/components/landing/contact-form";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "person@gmail.com",
    href: "mailto:person@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "(610) 555-0100",
    href: "tel:6105550100",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "Ardmore, PA 19003",
    href: "#",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon – Fri, 8am – 6pm",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <Navigation />

      {/* ── Page Hero ────────────────────────────────────────── */}
      <section className="relative pt-44 pb-24 border-b border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-8">
            <span className="w-8 h-px bg-foreground/30" />
            Contact
          </span>
          <h1 className="text-[clamp(3rem,8vw,7rem)] font-display leading-[0.95] tracking-tight">
            <span className="block">Get in</span>
            <span className="block text-muted-foreground">Touch.</span>
          </h1>
        </div>
      </section>

      {/* ── Contact Content ──────────────────────────────────── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24 items-start">

            {/* Contact Info Panel */}
            <div className="lg:sticky lg:top-32">
              <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-10">
                <span className="w-8 h-px bg-foreground/30" />
                Contact Information
              </span>

              <div className="space-y-8 mb-12">
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-8 h-8 border border-foreground/15 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs font-mono text-muted-foreground/60 tracking-wider uppercase mb-1">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="text-foreground/80 hover:text-foreground transition-colors"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-foreground/80">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-foreground/10 pt-10">
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  OAK Engineering serves the Greater Philadelphia region including
                  Delaware County, Montgomery County, Chester County, and the City
                  of Philadelphia.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We typically respond to all inquiries within one to two business
                  days. For urgent matters, please call directly.
                </p>
              </div>
            </div>

            {/* Request Form */}
            <div>
              <div className="mb-10">
                <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-4">
                  <span className="w-8 h-px bg-foreground/30" />
                  Submit a Request
                </span>
                <p className="text-muted-foreground leading-relaxed max-w-lg">
                  Fill out the form below to start a conversation about your project.
                  The more detail you can provide, the better we can assess your needs.
                </p>
              </div>

              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}

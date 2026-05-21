import Link from "next/link";
import { ArrowRight, Building2, Ruler, HardHat, ClipboardCheck, Layers, Search } from "lucide-react";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { StructuralBackground } from "@/components/landing/structural-background";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Building2,
    title: "Structural Design",
    description:
      "Full structural engineering packages for new construction — foundations, framing, lateral systems, and connection details.",
  },
  {
    icon: Ruler,
    title: "Structural Analysis",
    description:
      "Load calculations, code compliance review, and peer review for existing structures and proposed modifications.",
  },
  {
    icon: HardHat,
    title: "Construction Administration",
    description:
      "On-site observation, RFI responses, and shop drawing review to ensure the structure is built as designed.",
  },
  {
    icon: Layers,
    title: "Foundation Engineering",
    description:
      "Foundation design, underpinning, and remediation for new construction, additions, and settlement repair.",
  },
  {
    icon: Search,
    title: "Building Inspections",
    description:
      "Condition assessments and structural reports for real estate transactions, capital planning, and code compliance.",
  },
  {
    icon: ClipboardCheck,
    title: "Historic Preservation",
    description:
      "Structural assessment and repair design for historic masonry, timber, and mixed-construction buildings.",
  },
];

const stats = [
  { value: "20+", label: "Years Experience" },
  { value: "500+", label: "Projects Completed" },
  { value: "PA Licensed", label: "Professional Engineer" },
  { value: "Ardmore, PA", label: "Headquartered" },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <Navigation />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        <StructuralBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-32 lg:py-40">
          <div className="mb-8">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground">
              <span className="w-8 h-px bg-foreground/30" />
              Structural Engineering — Ardmore, PA
            </span>
          </div>

          <h1 className="text-[clamp(3rem,10vw,9rem)] font-display leading-[0.92] tracking-tight mb-12">
            <span className="block">Engineering</span>
            <span className="block text-muted-foreground">Structures That</span>
            <span className="block">Last.</span>
          </h1>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-end">
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-xl">
              OAK Engineering delivers precise, reliable structural solutions for
              residential, commercial, and institutional projects across the
              Greater Philadelphia region.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-foreground hover:bg-foreground/90 text-background px-8 h-14 text-base rounded-full group"
                >
                  Start a Project
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 text-base rounded-full border-foreground/20 hover:bg-foreground/5"
                >
                  Our Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services Overview ────────────────────────────────── */}
      <section className="relative py-24 lg:py-32 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-16 lg:mb-20">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              What We Do
            </span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight">
              Full-spectrum
              <br />
              <span className="text-muted-foreground">structural services.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/10">
            {services.map((service, i) => (
              <div
                key={i}
                className="bg-background group p-10 hover:bg-foreground/[0.03] transition-colors duration-300"
              >
                <service.icon className="w-6 h-6 mb-6 text-muted-foreground group-hover:text-foreground transition-colors" />
                <h3 className="text-xl font-display mb-3">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link href="/services">
              <Button
                variant="outline"
                className="rounded-full border-foreground/20 hover:bg-foreground/5 group"
              >
                View Exemplar Projects
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── About Preview ────────────────────────────────────── */}
      <section className="relative py-24 lg:py-32 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
                <span className="w-8 h-px bg-foreground/30" />
                About the Firm
              </span>
              <h2 className="text-4xl lg:text-5xl font-display tracking-tight mb-8">
                Built on precision.
                <br />
                <span className="text-muted-foreground">Driven by integrity.</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                OAK Engineering is a structural engineering firm serving the
                Greater Philadelphia area. Founded on technical excellence and
                client-centered service, we bring deep expertise to every
                project — from single-family renovations to complex commercial
                builds.
              </p>
              <Link href="/about">
                <Button
                  variant="outline"
                  className="rounded-full border-foreground/20 hover:bg-foreground/5 group"
                >
                  Our Story
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-px bg-foreground/10">
              {stats.map((stat, i) => (
                <div key={i} className="bg-background p-8 lg:p-10">
                  <div className="text-3xl lg:text-4xl font-display mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-mono">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="relative py-24 lg:py-32 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-8">
            Ready to build
            <br />
            <span className="text-muted-foreground">something great?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-xl mx-auto leading-relaxed">
            Contact OAK Engineering today to discuss your project and get a
            structural consultation.
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-foreground hover:bg-foreground/90 text-background px-10 h-14 text-base rounded-full group"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}

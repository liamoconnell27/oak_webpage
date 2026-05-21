import Link from "next/link";
import { ArrowRight, Building2, Ruler, HardHat, Layers, Search, ClipboardCheck } from "lucide-react";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { ProjectCarousel } from "@/components/landing/project-carousel";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Building2,
    number: "01",
    title: "Structural Design",
    description:
      "Complete structural engineering packages for new construction projects. We design foundations, floor systems, wall systems, roof framing, and lateral load-resisting systems in wood, steel, and concrete.",
  },
  {
    icon: Ruler,
    number: "02",
    title: "Structural Analysis",
    description:
      "Load calculations, deflection analysis, and code compliance review for existing structures and proposed modifications. We also provide independent peer review of structural documents.",
  },
  {
    icon: HardHat,
    number: "03",
    title: "Construction Administration",
    description:
      "On-site structural observation, response to contractor RFIs, and review of shop drawings and submittals. We ensure the structure is built in conformance with the construction documents.",
  },
  {
    icon: Layers,
    number: "04",
    title: "Foundation Engineering",
    description:
      "Foundation design for new construction, additions, and underpinning of existing structures. We design conventional spread footings, deep foundations, and specialty systems for challenging conditions.",
  },
  {
    icon: Search,
    number: "05",
    title: "Building Inspections",
    description:
      "Structural condition assessments for pre-purchase due diligence, capital planning studies, damage investigations, and regulatory compliance. Written reports suitable for real estate transactions.",
  },
  {
    icon: ClipboardCheck,
    number: "06",
    title: "Historic Preservation",
    description:
      "Structural assessment and repair design for historic masonry, heavy timber, and mixed-construction buildings. We understand how older buildings were built and how to sensitively engineer their repair.",
  },
];

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <Navigation />

      {/* ── Page Hero ────────────────────────────────────────── */}
      <section className="relative pt-44 pb-24 border-b border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-8">
            <span className="w-8 h-px bg-foreground/30" />
            Services
          </span>
          <h1 className="text-[clamp(3rem,8vw,7rem)] font-display leading-[0.95] tracking-tight">
            <span className="block">What We</span>
            <span className="block text-muted-foreground">Deliver.</span>
          </h1>
        </div>
      </section>

      {/* ── Services List ────────────────────────────────────── */}
      <section className="py-24 lg:py-32 border-b border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              Capabilities
            </span>
            <h2 className="text-4xl lg:text-5xl font-display tracking-tight">
              Everything you need,
              <br />
              <span className="text-muted-foreground">structurally speaking.</span>
            </h2>
          </div>

          <div>
            {services.map((service) => (
              <div
                key={service.number}
                className="group flex flex-col lg:flex-row gap-8 lg:gap-16 py-12 lg:py-16 border-b border-foreground/10 last:border-b-0"
              >
                <div className="shrink-0 flex items-start gap-6">
                  <span className="font-mono text-sm text-muted-foreground w-8">
                    {service.number}
                  </span>
                  <service.icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors mt-0.5" />
                </div>

                <div className="flex-1 grid lg:grid-cols-2 gap-6 items-start">
                  <h3 className="text-2xl lg:text-3xl font-display group-hover:translate-x-1 transition-transform duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Project Showcase ─────────────────────────────────── */}
      <section className="py-24 lg:py-32 border-b border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-14">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              Exemplar Projects
            </span>
            <div className="flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-0 justify-between">
              <h2 className="text-4xl lg:text-5xl font-display tracking-tight">
                A sample of
                <br />
                <span className="text-muted-foreground">our work.</span>
              </h2>
              <p className="text-muted-foreground max-w-sm leading-relaxed lg:text-right">
                Each project represents a different challenge — use the arrows to
                browse, and click &ldquo;See Project Details&rdquo; to learn more.
              </p>
            </div>
          </div>

          <ProjectCarousel />
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl lg:text-5xl font-display tracking-tight mb-8">
            Have a project in mind?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-lg mx-auto leading-relaxed">
            Tell us about your project and we will be in touch within one to two
            business days.
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-foreground hover:bg-foreground/90 text-background px-10 h-14 text-base rounded-full group"
            >
              Submit a Request
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}

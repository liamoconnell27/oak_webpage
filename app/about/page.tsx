import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { Button } from "@/components/ui/button";

const values = [
  {
    number: "01",
    title: "Precision",
    description:
      "Every calculation, every design detail, every site observation is approached with exacting accuracy. We hold ourselves to the highest technical standards on every project, regardless of scope.",
  },
  {
    number: "02",
    title: "Integrity",
    description:
      "We give honest assessments — even when it is not what a client hopes to hear. Our advice is driven by what is structurally sound and safe, not what is commercially convenient.",
  },
  {
    number: "03",
    title: "Collaboration",
    description:
      "Great buildings require great teamwork. We work closely with architects, contractors, and owners to ensure the design intent is realized at every stage of a project.",
  },
  {
    number: "04",
    title: "Community",
    description:
      "We are invested in the built environment of the communities we serve. Ardmore and the surrounding Main Line is home, and we take pride in helping shape its built fabric.",
  },
];

const credentials = [
  "Licensed P.E. — Pennsylvania",
  "Civil Engineering, [University]",
  "Member, ASCE",
  "[X]+ Years Experience",
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <Navigation />

      {/* ── Page Hero ────────────────────────────────────────── */}
      <section className="relative pt-44 pb-24 border-b border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-8">
            <span className="w-8 h-px bg-foreground/30" />
            About
          </span>
          <h1 className="text-[clamp(3rem,8vw,7rem)] font-display leading-[0.95] tracking-tight">
            <span className="block">The People</span>
            <span className="block text-muted-foreground">Behind the Work.</span>
          </h1>
        </div>
      </section>

      {/* ── Owner / Principal ────────────────────────────────── */}
      <section className="py-24 lg:py-32 border-b border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Photo placeholder */}
            <div className="aspect-[4/5] bg-foreground/[0.04] border border-foreground/10 flex items-center justify-center">
              <div className="text-center text-muted-foreground/40 space-y-3">
                <div className="w-20 h-20 rounded-full border border-foreground/10 mx-auto" />
                <span className="text-xs font-mono block">Photo — Coming Soon</span>
              </div>
            </div>

            {/* Bio */}
            <div className="lg:pt-6">
              <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-8">
                <span className="w-8 h-px bg-foreground/30" />
                Principal Engineer &amp; Founder
              </span>

              <h2 className="text-4xl lg:text-5xl font-display tracking-tight mb-2">
                [Owner Name],
              </h2>
              <p className="text-xl text-muted-foreground font-mono mb-10">P.E.</p>

              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p className="text-lg">
                  [Owner Name] is a licensed Professional Engineer with over [X] years
                  of experience in structural engineering. After earning a degree in Civil
                  Engineering from [University], they built a career working on a wide
                  range of structural projects across the Philadelphia metropolitan area.
                </p>
                <p>
                  Their experience spans residential additions, historic preservation,
                  commercial renovations, and ground-up new construction. With a commitment
                  to clear communication and technically rigorous design, they founded OAK
                  Engineering to deliver the kind of thoughtful, owner-focused service that
                  larger firms often lack.
                </p>
                <p>
                  A registered Professional Engineer in the Commonwealth of Pennsylvania,
                  [Owner Name] approaches every engagement with the same level of care —
                  whether it is a single beam calculation or a full structural design package.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mt-10">
                {credentials.map((cred) => (
                  <span
                    key={cred}
                    className="text-xs font-mono px-3 py-2 border border-foreground/15 text-muted-foreground"
                  >
                    {cred}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Company Story ────────────────────────────────────── */}
      <section className="py-24 lg:py-32 border-b border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24">
            <div>
              <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-8">
                <span className="w-8 h-px bg-foreground/30" />
                Our Story
              </span>
              <h2 className="text-4xl lg:text-5xl font-display tracking-tight">
                Rooted in the
                <br />
                <span className="text-muted-foreground">Main Line.</span>
              </h2>
            </div>

            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed lg:pt-2">
              <p>
                OAK Engineering was founded in Ardmore, Pennsylvania with a simple
                conviction: that small, local firms can provide better structural
                engineering than large, impersonal ones. Where bigger firms often assign
                junior engineers to routine projects, OAK Engineering means the principal
                is directly involved in every project — from first conversation to final
                stamp.
              </p>
              <p>
                The firm was established to serve homeowners, architects, developers, and
                contractors across Delaware County, Montgomery County, Chester County, and
                the City of Philadelphia. Deep familiarity with local building codes, soil
                conditions, historic construction methods, and the regional regulatory
                landscape informs every project we take on.
              </p>
              <p>
                From calculating the right beam for a kitchen renovation to designing the
                foundation system for a new commercial building, OAK Engineering brings the
                same level of rigor, care, and professionalism to every scope of work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 border-b border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              Our Values
            </span>
            <h2 className="text-4xl lg:text-5xl font-display tracking-tight">
              How we work.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-foreground/10">
            {values.map((value) => (
              <div key={value.number} className="bg-background p-10 lg:p-14">
                <span className="font-mono text-sm text-muted-foreground block mb-6">
                  {value.number}
                </span>
                <h3 className="text-3xl font-display mb-4">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl lg:text-5xl font-display tracking-tight mb-8">
            Let&apos;s work together.
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-lg mx-auto leading-relaxed">
            Whether you have a project in mind or just want to ask a question,
            we would love to hear from you.
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-foreground hover:bg-foreground/90 text-background px-10 h-14 text-base rounded-full group"
            >
              Contact Us
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}

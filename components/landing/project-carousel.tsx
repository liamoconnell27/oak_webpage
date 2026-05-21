"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: "01",
    name: "Ardmore Residential Addition",
    type: "Residential",
    location: "Ardmore, PA",
    year: "2023",
    summary:
      "Structural design for a two-story rear addition to an existing Colonial-style home, including foundation extension and new load path coordination.",
    details:
      "This project required removing a first-floor bearing wall to open the kitchen and living area. OAK Engineering designed a new LVL ridge beam and post system to carry the roof loads from the addition, and extended the existing poured concrete foundation with a new stem wall and isolated footings. Close coordination with the architect of record ensured all structural modifications met ICC code requirements and fit the architectural intent.",
    visual: "residential",
  },
  {
    id: "02",
    name: "Wayne Commercial Renovation",
    type: "Commercial",
    location: "Wayne, PA",
    year: "2022",
    summary:
      "Structural assessment and design for the gut renovation of a 1960s-era commercial office building, including floor system upgrades.",
    details:
      "The existing composite floor system showed signs of inadequate capacity for the proposed new tenant loads. OAK Engineering performed a full structural assessment, identified deficient members, and designed a supplemental framing system using wide-flange steel sections. A phased construction approach was developed to allow the building to remain partially occupied during construction.",
    visual: "commercial",
  },
  {
    id: "03",
    name: "Haverford Foundation Retrofit",
    type: "Foundation Engineering",
    location: "Haverford, PA",
    year: "2023",
    summary:
      "Forensic investigation and remediation design for a failing residential foundation exhibiting significant cracking and differential settlement.",
    details:
      "Following a homeowner report of wall cracking and sticking doors, OAK Engineering conducted a forensic site investigation including soil probing and crack mapping. The root cause was identified as inadequate bearing capacity in a fill zone. A helical pier underpinning system was designed to transfer loads to competent bearing strata, arresting further settlement. Construction administration services were provided throughout the repair.",
    visual: "foundation",
  },
  {
    id: "04",
    name: "Bryn Mawr Multi-Family Residential",
    type: "New Construction",
    location: "Bryn Mawr, PA",
    year: "2022",
    summary:
      "Full structural design package for a new 4-unit townhome development, from foundation through roof framing.",
    details:
      "OAK Engineering provided complete structural engineering services for this new construction townhome project, including geotechnical review, foundation design, wood-framed floor and wall systems, and roof structure. Special consideration was given to the party wall assembly between units for both structural performance and sound attenuation. The project was delivered on schedule, meeting the developer's timeline for permitting.",
    visual: "newconstruction",
  },
  {
    id: "05",
    name: "Philadelphia Historic Masonry Assessment",
    type: "Historic Preservation",
    location: "Philadelphia, PA",
    year: "2021",
    summary:
      "Condition assessment and structural repair design for a 19th-century unreinforced masonry building in the Rittenhouse Square neighborhood.",
    details:
      "This rowhouse, built circa 1885, required a full masonry condition assessment prior to sale. OAK Engineering performed a thorough inspection, documented deterioration patterns, and prepared a repair scope covering repointing, lintel replacement, and interior crack injection. A structural report was issued for the client's use in the transaction, and construction documents were later prepared for the remediation work.",
    visual: "historic",
  },
  {
    id: "06",
    name: "Delaware County School Inspection",
    type: "Building Inspection",
    location: "Delaware County, PA",
    year: "2024",
    summary:
      "Structural inspection of a 1950s-era elementary school building as part of a capital planning study for the district.",
    details:
      "OAK Engineering was engaged by the school district to assess the structural condition of the building's roof framing, exterior walls, and foundation. The inspection included visual observation, review of available drawings, and limited destructive investigation of concealed conditions. A comprehensive condition report with prioritized repair recommendations and budget estimates was delivered, informing the district's 10-year capital plan.",
    visual: "inspection",
  },
];

function StructuralIllustration({ type }: { type: string }) {
  switch (type) {
    case "residential":
      return (
        <svg viewBox="0 0 300 220" className="w-full h-full" fill="none" stroke="currentColor">
          {/* House outline */}
          <polyline points="150,30 280,110 280,190 20,190 20,110 150,30" strokeWidth="1.5" opacity="0.4" />
          {/* Floor beam */}
          <line x1="20" y1="140" x2="280" y2="140" strokeWidth="2" opacity="0.6" />
          {/* Posts */}
          <line x1="90" y1="140" x2="90" y2="190" strokeWidth="2" opacity="0.6" />
          <line x1="210" y1="140" x2="210" y2="190" strokeWidth="2" opacity="0.6" />
          {/* Ridge beam */}
          <line x1="150" y1="30" x2="150" y2="140" strokeWidth="1.5" opacity="0.5" strokeDasharray="5 3" />
          {/* Rafters */}
          <line x1="150" y1="30" x2="60" y2="110" strokeWidth="1" opacity="0.3" />
          <line x1="150" y1="30" x2="240" y2="110" strokeWidth="1" opacity="0.3" />
          {/* Load arrows */}
          <line x1="150" y1="5" x2="150" y2="25" strokeWidth="1" opacity="0.5" />
          <polyline points="144,20 150,30 156,20" strokeWidth="1" opacity="0.5" />
          {/* Foundation */}
          <rect x="10" y="190" width="280" height="12" strokeWidth="1" opacity="0.3" fill="currentColor" fillOpacity="0.05" />
          {/* Dimension lines */}
          <line x1="20" y1="210" x2="280" y2="210" strokeWidth="0.5" opacity="0.2" />
          <line x1="20" y1="207" x2="20" y2="213" strokeWidth="0.5" opacity="0.2" />
          <line x1="280" y1="207" x2="280" y2="213" strokeWidth="0.5" opacity="0.2" />
        </svg>
      );
    case "commercial":
      return (
        <svg viewBox="0 0 300 220" className="w-full h-full" fill="none" stroke="currentColor">
          {/* Multi-story frame */}
          {[0, 1, 2, 3].map((c) => (
            <line key={`col-${c}`} x1={40 + c * 73} y1="20" x2={40 + c * 73} y2="200" strokeWidth="2" opacity="0.5" />
          ))}
          {[0, 1, 2, 3].map((r) => (
            <line key={`beam-${r}`} x1="40" y1={20 + r * 60} x2="259" y2={20 + r * 60} strokeWidth="1.5" opacity="0.5" />
          ))}
          {/* Diagonal bracing */}
          <line x1="40" y1="80" x2="113" y2="20" strokeWidth="1" opacity="0.3" />
          <line x1="113" y1="80" x2="40" y2="20" strokeWidth="1" opacity="0.3" />
          <line x1="186" y1="140" x2="259" y2="80" strokeWidth="1" opacity="0.3" />
          <line x1="259" y1="140" x2="186" y2="80" strokeWidth="1" opacity="0.3" />
          {/* Foundation line */}
          <line x1="20" y1="200" x2="280" y2="200" strokeWidth="2" opacity="0.4" />
          {/* Node dots */}
          {[0, 1, 2, 3].map((c) =>
            [0, 1, 2, 3].map((r) => (
              <circle key={`node-${c}-${r}`} cx={40 + c * 73} cy={20 + r * 60} r="3" fill="currentColor" fillOpacity="0.4" strokeWidth="0" />
            ))
          )}
        </svg>
      );
    case "foundation":
      return (
        <svg viewBox="0 0 300 220" className="w-full h-full" fill="none" stroke="currentColor">
          {/* Grade line */}
          <line x1="20" y1="80" x2="280" y2="80" strokeWidth="1" opacity="0.3" strokeDasharray="8 4" />
          {/* Stem wall */}
          <rect x="100" y="40" width="20" height="160" strokeWidth="1.5" opacity="0.5" fill="currentColor" fillOpacity="0.05" />
          <rect x="180" y="40" width="20" height="160" strokeWidth="1.5" opacity="0.5" fill="currentColor" fillOpacity="0.05" />
          {/* Footing */}
          <rect x="75" y="185" width="70" height="25" strokeWidth="1.5" opacity="0.5" fill="currentColor" fillOpacity="0.08" />
          <rect x="155" y="185" width="70" height="25" strokeWidth="1.5" opacity="0.5" fill="currentColor" fillOpacity="0.08" />
          {/* Helical piers */}
          <line x1="110" y1="210" x2="110" y2="215" strokeWidth="2" opacity="0.6" />
          <ellipse cx="110" cy="215" rx="12" ry="4" strokeWidth="1" opacity="0.4" />
          <line x1="190" y1="210" x2="190" y2="215" strokeWidth="2" opacity="0.6" />
          <ellipse cx="190" cy="215" rx="12" ry="4" strokeWidth="1" opacity="0.4" />
          {/* Load arrows downward */}
          {[110, 150, 190].map((x) => (
            <g key={x}>
              <line x1={x} y1="20" x2={x} y2="38" strokeWidth="1" opacity="0.5" />
              <polyline points={`${x - 5},33 ${x},40 ${x + 5},33`} strokeWidth="1" opacity="0.5" />
            </g>
          ))}
          {/* Soil hatch */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <line key={i} x1={20 + i * 38} y1="80" x2={10 + i * 38} y2="100" strokeWidth="0.5" opacity="0.15" />
          ))}
        </svg>
      );
    case "newconstruction":
      return (
        <svg viewBox="0 0 300 220" className="w-full h-full" fill="none" stroke="currentColor">
          {/* Floor plan grid */}
          <rect x="30" y="30" width="240" height="160" strokeWidth="1.5" opacity="0.4" />
          {/* Interior walls */}
          <line x1="30" y1="110" x2="270" y2="110" strokeWidth="1" opacity="0.35" />
          <line x1="130" y1="30" x2="130" y2="190" strokeWidth="1" opacity="0.35" />
          <line x1="200" y1="110" x2="200" y2="190" strokeWidth="1" opacity="0.35" />
          {/* Column locations */}
          {[[30,30],[130,30],[270,30],[30,110],[130,110],[270,110],[30,190],[130,190],[200,190],[270,190]].map(([x,y], i) => (
            <rect key={i} x={x - 5} y={y - 5} width="10" height="10" fill="currentColor" fillOpacity="0.3" strokeWidth="1" opacity="0.5" />
          ))}
          {/* Beam span annotations */}
          <line x1="30" y1="22" x2="130" y2="22" strokeWidth="0.5" opacity="0.3" />
          <line x1="130" y1="22" x2="270" y2="22" strokeWidth="0.5" opacity="0.3" />
          <line x1="22" y1="30" x2="22" y2="190" strokeWidth="0.5" opacity="0.3" />
        </svg>
      );
    case "historic":
      return (
        <svg viewBox="0 0 300 220" className="w-full h-full" fill="none" stroke="currentColor">
          {/* Masonry wall */}
          <rect x="60" y="20" width="180" height="190" strokeWidth="1.5" opacity="0.4" />
          {/* Brick coursing */}
          {[0,1,2,3,4,5,6,7,8,9,10].map((r) => (
            <g key={r}>
              <line x1="60" y1={20 + r * 17} x2="240" y2={20 + r * 17} strokeWidth="0.4" opacity="0.2" />
              {[0,1,2,3,4].map((c) => (
                <line key={c} x1={60 + c * 36 + (r % 2 === 0 ? 18 : 0)} y1={20 + r * 17} x2={60 + c * 36 + (r % 2 === 0 ? 18 : 0)} y2={37 + r * 17} strokeWidth="0.4" opacity="0.2" />
              ))}
            </g>
          ))}
          {/* Lintel over opening */}
          <rect x="100" y="80" width="100" height="8" fill="currentColor" fillOpacity="0.15" strokeWidth="1.5" opacity="0.6" />
          {/* Opening */}
          <rect x="100" y="88" width="100" height="70" strokeWidth="1" opacity="0.4" />
          {/* Crack indication */}
          <polyline points="150,20 154,60 148,100 152,140 148,190" strokeWidth="1" opacity="0.5" strokeDasharray="4 2" />
          {/* Repair annotation */}
          <line x1="160" y1="80" x2="200" y2="50" strokeWidth="0.5" opacity="0.4" />
          <circle cx="205" cy="47" r="3" strokeWidth="1" opacity="0.4" />
        </svg>
      );
    case "inspection":
      return (
        <svg viewBox="0 0 300 220" className="w-full h-full" fill="none" stroke="currentColor">
          {/* Building outline */}
          <rect x="40" y="40" width="220" height="160" strokeWidth="1.5" opacity="0.4" />
          {/* Roof line */}
          <polyline points="30,40 150,10 270,40" strokeWidth="1.5" opacity="0.4" />
          {/* Floor levels */}
          <line x1="40" y1="120" x2="260" y2="120" strokeWidth="1" opacity="0.3" />
          {/* Windows */}
          {[[60,55],[130,55],[200,55],[60,135],[200,135]].map(([x,y],i) => (
            <rect key={i} x={x} y={y} width="30" height="30" strokeWidth="1" opacity="0.35" />
          ))}
          {/* Inspection callouts */}
          <circle cx="80" cy="40" r="8" strokeWidth="1" opacity="0.5" />
          <line x1="88" y1="35" x2="110" y2="20" strokeWidth="0.5" opacity="0.4" />
          <text x="112" y="18" fontSize="8" fill="currentColor" opacity="0.4" fontFamily="monospace">Roof framing</text>
          <circle cx="150" cy="120" r="8" strokeWidth="1" opacity="0.5" />
          <line x1="158" y1="115" x2="190" y2="100" strokeWidth="0.5" opacity="0.4" />
          <text x="192" y="98" fontSize="8" fill="currentColor" opacity="0.4" fontFamily="monospace">Floor beam</text>
          {/* Condition key */}
          <circle cx="250" cy="170" r="4" fill="currentColor" fillOpacity="0.5" strokeWidth="0" />
          <text x="258" y="174" fontSize="7" fill="currentColor" opacity="0.35" fontFamily="monospace">Review req.</text>
        </svg>
      );
    default:
      return null;
  }
}

export function ProjectCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setExpandedProject(null);
    });
  }, [emblaApi]);

  const toggleDetails = (id: string) => {
    setExpandedProject((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full">
      {/* Carousel viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex-none w-full min-w-0"
            >
              <div className="grid lg:grid-cols-2 gap-0 border border-foreground/10">
                {/* Project info */}
                <div className="p-10 lg:p-14 flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-sm text-muted-foreground block mb-8">
                      {project.id} / {String(projects.length).padStart(2, "0")}
                    </span>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-mono px-2 py-1 border border-foreground/15 text-muted-foreground">
                        {project.type}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">{project.year}</span>
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-display mb-2">{project.name}</h3>
                    <p className="text-sm font-mono text-muted-foreground mb-8">{project.location}</p>
                    <p className="text-muted-foreground leading-relaxed">{project.summary}</p>
                  </div>

                  <div className="mt-10">
                    <button
                      onClick={() => toggleDetails(project.id)}
                      className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors group"
                    >
                      {expandedProject === project.id ? (
                        <>
                          <Minus className="w-4 h-4" />
                          Hide Details
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          See Project Details
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Structural illustration */}
                <div className="border-l border-foreground/10 bg-foreground/[0.02] flex items-center justify-center p-12 lg:p-16 min-h-[300px] text-foreground/30">
                  <StructuralIllustration type={project.visual} />
                </div>
              </div>

              {/* Expandable details */}
              <div
                className={`overflow-hidden transition-all duration-500 border-x border-b border-foreground/10 ${
                  expandedProject === project.id ? "max-h-64" : "max-h-0"
                }`}
              >
                <div className="p-10 lg:p-14 border-t border-foreground/10">
                  <h4 className="text-sm font-mono text-muted-foreground mb-4">Project Details</h4>
                  <p className="text-muted-foreground leading-relaxed max-w-3xl">{project.details}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-px transition-all duration-300 ${
                i === selectedIndex
                  ? "w-8 bg-foreground"
                  : "w-4 bg-foreground/25 hover:bg-foreground/50"
              }`}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            className="rounded-full border-foreground/20 hover:bg-foreground/5 w-10 h-10"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            className="rounded-full border-foreground/20 hover:bg-foreground/5 w-10 h-10"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

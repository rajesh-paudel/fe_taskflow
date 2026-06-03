import React, { useState, useEffect, useRef } from "react";
import { Shield, ExternalLink, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const sections = [
  { id: "scope", title: "1. Scope & Framework" },
  { id: "collection", title: "2. Data We Collect" },
  { id: "processing", title: "3. Processing Grounds" },
  { id: "retention", title: "4. Retention & Purging" },
  { id: "security", title: "5. Security Framework" },
  { id: "compliance", title: "6. Global Compliance" },
];

export default function PrivacyPolicy() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("scope");
  const observerRef = useRef({});

  // Intersection Observer to track scroll positions dynamically
  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // Calibrated hotspot for triggering updates mid-viewport
      threshold: 0.1,
    });

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -40; // Clean margin clearance from view top
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-950 font-sans antialiased selection:bg-neutral-100">
      <div className="max-w-5xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-12 gap-16">
        {/* SIDEBAR NAVIGATION (STICKY & REFLECTIVE) */}
        <aside className="hidden md:block md:col-span-4 sticky top-16 self-start space-y-8 pr-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-neutral-950 transition-colors cursor-pointer group"
          >
            <ArrowLeft
              size={14}
              className="transform group-hover:-translate-x-0.5 transition-transform"
            />
            Exit Document
          </button>

          <div className="space-y-1">
            <h1 className="text-2xl font-black text-neutral-950 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-[11px] text-neutral-400 font-mono">
              REVISION // 2026.04.11
            </p>
          </div>

          <div className="h-px bg-neutral-100" />

          <nav className="flex flex-col gap-0.5 border-l border-neutral-100">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`text-left text-xs py-2 pl-4 -ml-px transition-all border-l ${
                  activeSection === section.id
                    ? "border-neutral-950 text-neutral-950 font-bold"
                    : "border-transparent text-neutral-400 hover:text-neutral-950"
                }`}
              >
                {section.title}
              </button>
            ))}
          </nav>
        </aside>

        {/* LONG-FORM BODY CANVAS */}
        <main className="col-span-1 md:col-span-8 space-y-16 text-neutral-600 leading-relaxed max-w-2xl">
          {/* Mobile-only header configuration */}
          <div className="md:hidden space-y-4 mb-12">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-xs font-bold text-neutral-400"
            >
              <ArrowLeft size={14} /> Back
            </button>
            <h1 className="text-3xl font-black text-neutral-950 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xs text-neutral-400 font-mono">
              REVISION // 2026.04.11
            </p>
          </div>

          {/* INTRODUCTION */}
          <div className="prose">
            <p className="text-base text-neutral-500 leading-relaxed">
              TaskFlow operates a high-performance productivity infrastructure
              layer. We treat the privacy of our global developers, teams, and
              enterprises as a core design priority. This policy acts as a
              legally binding disclosure outlining our data management
              pipelines, tracking systems, and compliance frameworks.
            </p>
          </div>

          {/* SECTION 1 */}
          <section id="scope" className="space-y-4 scroll-mt-12">
            <h2 className="text-lg font-black text-neutral-950 tracking-tight">
              1. Scope & Global Infrastructure Framework
            </h2>
            <p>
              This architectural disclosure covers all system applications,
              secondary API nodes, and browser interfaces provided by TaskFlow
              globally. By creating a sandbox or team workspace layer inside our
              ecosystem, you explicitly authorize our automated ingestion
              networks to interface with your account metadata arrays under the
              guidelines of this agreement.
            </p>
            <p>
              This framework governs both active online sessions and cold
              database persistence. If you are accessing this application on
              behalf of an enterprise or institution, your administrative
              configurations may be bound by additional localized processing
              amendments.
            </p>
          </section>

          {/* SECTION 2 */}
          <section id="collection" className="space-y-4 scroll-mt-12">
            <h2 className="text-lg font-black text-neutral-950 tracking-tight">
              2. Granular Data Ingestion Patterns
            </h2>
            <p>
              We systematically organize raw information inputs into three
              separate internal categories to ensure your workspace performs
              with minimal latency:
            </p>
            <div className="space-y-4 my-6 pl-4 border-l-2 border-neutral-100">
              <div>
                <h4 className="text-sm font-bold text-neutral-950">
                  A. Cryptographic Account Identity
                </h4>
                <p className="text-sm text-neutral-500 mt-1">
                  We collect profile credentials including verified legal names,
                  working email lines, and token profiles. Passwords are never
                  parsed as cleartext; they pass through client-side encryption
                  vectors prior to server handshake storage routines.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-neutral-950">
                  B. Dynamic Workspace Data
                </h4>
                <p className="text-sm text-neutral-500 mt-1">
                  This encompasses raw operational content generated within your
                  workflow: text properties, custom tag labels, drag-and-drop
                  calendar sequences, task items, Kanban column order
                  structures, and system file maps.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-neutral-950">
                  C. System Telemetry Arrays
                </h4>
                <p className="text-sm text-neutral-500 mt-1">
                  To isolate performance bottlenecks, our application records
                  machine parameters, localized IP routing sequences, client
                  version logs, error trace tracking logs, and layout viewport
                  measurements.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 3 */}
          <section id="processing" className="space-y-4 scroll-mt-12">
            <h2 className="text-lg font-black text-neutral-950 tracking-tight">
              3. Legal Processing Grounds & Use Vectors
            </h2>
            <p>
              TaskFlow limits its data usage strictly to operational functional
              necessities. We do not maintain or profit from ad network trackers
              or informational data broker platforms. Your parameters are
              leveraged to:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-neutral-600">
              <li>
                Coordinate real-time state variable transfers across web-socket
                clusters.
              </li>
              <li>
                Authenticate encryption headers to block unlawful workspace
                breaches.
              </li>
              <li>
                Provide personalized notification indexing for deadline
                parameters.
              </li>
              <li>
                Analyze request volumes to optimize query speeds across our
                database storage disks.
              </li>
            </ul>
          </section>

          {/* SECTION 4 */}
          <section id="retention" className="space-y-4 scroll-mt-12">
            <h2 className="text-lg font-black text-neutral-950 tracking-tight">
              4. Data Retention Limits & Hard Purging Protocols
            </h2>
            <p>
              We keep your files in active state containers as long as your
              profile remains registered. If a workspace is labeled as
              "inactive" for a continuous stretch of 180 days, our automation
              scripts flag the parameters for archiving.
            </p>
            <p>
              When an owner triggers an account deletion request through their
              dashboard workspace dashboard, a terminal purge timeline begins.
              Data items are scrubbed from main operational clusters within 72
              hours. Cold backup redundancy logs are hard-written and cleared
              within 30 days due to rotational server loops.
            </p>
          </section>

          {/* SECTION 5 */}
          <section id="security" className="space-y-4 scroll-mt-12">
            <h2 className="text-lg font-black text-neutral-950 tracking-tight">
              5. Advanced Encryption & Cold Storage Security
            </h2>
            <p>
              Our software stack implements production-grade protection
              properties. Data traversing the open web passes through TLS 1.3
              protocol configurations. At-rest asset tracking parameters are
              locked using AES-256 byte segments.
            </p>
            <div className="bg-neutral-50 border border-neutral-100 rounded-xl p-4 font-mono text-[11px] text-neutral-500 space-y-1">
              <p className="font-bold text-neutral-950">
                // CRYPTO SECURITY PROTOCOL LAYERS
              </p>
              <p>TRANSPORT Layer : HTTPS / TLS 1.3 Strict-Transport-Security</p>
              <p>PERSISTENCE Layer: AES-256 Block-Cipher Isolated Volumes</p>
              <p>HASHING Engine : Salted Argon2id Key Derivation Routines</p>
            </div>
          </section>

          {/* SECTION 6 */}
          <section id="compliance" className="space-y-4 scroll-mt-12">
            <h2 className="text-lg font-black text-neutral-950 tracking-tight">
              6. Global Compliance (GDPR, CCPA & Data Rights)
            </h2>
            <p>
              Regardless of geographical origin, all users enjoy advanced access
              rights over their information footprint. You can explicitly demand
              a complete structural JSON file extract of your assets, request
              data modification if errors appear, or deny secondary analytics
              tracking entirely.
            </p>
            <p>
              To exercise these statutory choices, or to report an identity
              mapping issue, initiate an urgent legal ticket directly at{" "}
              <a
                href="mailto:compliance@taskflow.com"
                className="text-blue-600 inline-flex items-center gap-0.5 hover:underline font-medium"
              >
                compliance@taskflow.com <ExternalLink size={12} />
              </a>
              .
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}

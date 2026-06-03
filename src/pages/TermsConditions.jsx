import React, { useState, useEffect } from "react";
import { FileText, AlertCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const sections = [
  { id: "acceptance", title: "1. Acceptance of Terms" },
  { id: "accounts", title: "2. Account Infrastructure" },
  { id: "conduct", title: "3. Acceptable System Use" },
  { id: "licensing", title: "4. Intellectual & Content Rights" },
  { id: "billing", title: "5. Billing & Subscription Plans" },
  { id: "liability", title: "6. Liability & Warranties" },
];

export default function TermsConditions() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("acceptance");

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
      rootMargin: "-20% 0px -60% 0px",
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
      const yOffset = -40;
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
              Terms of Service
            </h1>
            <p className="text-[11px] text-neutral-400 font-mono">
              VERSION // 4.0.26
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
              Terms of Service
            </h1>
            <p className="text-xs text-neutral-400 font-mono">
              VERSION // 4.0.26
            </p>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-neutral-50 border border-neutral-100 text-xs text-neutral-500">
            <AlertCircle
              size={15}
              className="text-neutral-400 shrink-0 mt-0.5"
            />
            <p>
              Notice: These parameters govern systemic accessibility laws,
              billing collection timelines, and binding class-action waiver
              requirements across our application nodes.
            </p>
          </div>

          {/* SECTION 1 */}
          <section id="acceptance" className="space-y-4 scroll-mt-12">
            <h2 className="text-lg font-black text-neutral-950 tracking-tight">
              1. Explicit Binding Acceptance of Terms
            </h2>
            <p>
              By spinning up a live account matrix, linking organization tools,
              or deploying data structures inside the TaskFlow application
              cloud, you state your complete legal compliance with these terms.
              This document forms a formal, binding contract between you and
              TaskFlow.
            </p>
            <p>
              If you decline any segment of these engineering protocols, your
              access tokens are legally voided, and you must terminate system
              interactions immediately. We preserve the right to append or
              refactor these terms as our architecture scales. Continued
              deployment implies acceptance of modified terms.
            </p>
          </section>

          {/* SECTION 2 */}
          <section id="accounts" className="space-y-4 scroll-mt-12">
            <h2 className="text-lg font-black text-neutral-950 tracking-tight">
              2. Account Integrity, Allocation & Access Security
            </h2>
            <p>
              To claim clean ownership over workspace branches, registration
              forms must contain current, comprehensive, and accurate details.
              You hold exclusive liability for preserving session cookie secrecy
              and managing account-level administrative permissions.
            </p>
            <p>
              Any activity occurring under your access tokens will be directly
              linked to your legal responsibility. If an external developer
              cracks your password string or accesses an authorized API hook
              without permission, you are obligated to dispatch an emergency
              lockout notification to our support dispatch.
            </p>
          </section>

          {/* SECTION 3 */}
          <section id="conduct" className="space-y-4 scroll-mt-12">
            <h2 className="text-lg font-black text-neutral-950 tracking-tight">
              3. Acceptable System Use & System Rate-Limiting
            </h2>
            <p>
              TaskFlow provides open canvas features for constructive
              management. You are explicitly restricted from weaponizing or
              probing our container layers. Unlawful deployment vectors include:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-neutral-600">
              <li>
                Running reverse-engineering attempts against bundled production
                Javascript modules.
              </li>
              <li>
                Exceeding system rate-limit parameters (maxing out at 120 API
                requests per rolling 60-second window per client block).
              </li>
              <li>
                Hosting malicious cross-site scripting strings or payload links
                inside public dashboard text areas.
              </li>
              <li>
                Bypassing structural verification modules to gain root
                administrative access over cloud databases.
              </li>
            </ul>
          </section>

          {/* SECTION 4 */}
          <section id="licensing" className="space-y-4 scroll-mt-12">
            <h2 className="text-lg font-black text-neutral-950 tracking-tight">
              4. Intellectual Property, Assets & Workspace Content Rights
            </h2>
            <p>
              You maintain absolute intellectual sovereignty over all file
              structures, layout arrangements, tasks, and documentation objects
              you save inside our application databases. TaskFlow holds zero
              ownership claims over your proprietary data.
            </p>
            <p>
              Conversely, our specific system styling architectures, custom
              vector graphics libraries, interface engines, CSS configurations,
              and compiled algorithmic assets remain the property of TaskFlow.
              We grant your environment a limited, non-transferable, revocable
              license to access features for standard project coordination
              workflows.
            </p>
          </section>

          {/* SECTION 5 */}
          <section id="billing" className="space-y-4 scroll-mt-12">
            <h2 className="text-lg font-black text-neutral-950 tracking-tight">
              5. Billing Policies, Subscriptions & Cancellations
            </h2>
            <p>
              Premium capabilities require clear subscription transactions
              processed via authorized gateways (e.g., Stripe integration
              paths). Billing processes operate on standard, rolling monthly or
              annual auto-renewal terms.
            </p>
            <p>
              Failed transactions drop accounts into a 7-day safe grace period.
              If alternative payment credentials are not provided within this
              timeframe, system containers lock down automatically to conserve
              system processing power. All sales milestones are definitive, and
              refunds are calculated entirely at company discretion.
            </p>
          </section>

          {/* SECTION 6 */}
          <section id="liability" className="space-y-4 scroll-mt-12">
            <h2 className="text-lg font-black text-neutral-950 tracking-tight">
              6. Absolute Limitations of Liability & Warranty Waivers
            </h2>
            <p className="uppercase text-xs font-mono tracking-wider text-neutral-400 bg-neutral-50 p-4 border border-neutral-100 rounded-xl leading-normal">
              // DISCLAIMER OF COMPLIANCE LIABILITY
              <br />
              THE TASKFLOW SYSTEM DEPLOYS COMPLETELY "AS IS" AND "AS AVAILABLE."
              WE DISCLAIM ALL STATUTORY ASSURANCES, EXPRESS OR IMPLIED,
              INCLUDING ANY WARRANTIES OF RUNTIME PERFORMANCE, ACCURACY, OR
              UNINTERRUPTED UPTIME. WE ACCEPT ZERO RESPONSIBILITY FOR SYSTEM
              CONTEXT DAMAGE CAUSED BY SERVER DRIFT OR NETWORK INTERRUPTIONS.
            </p>
            <p>
              Under no legal paradigm will our development core be accountable
              for indirect capital losses, revenue deficits, or server crash
              fees originating from platform downtime or unexpected
              authentication lockout incidents.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}

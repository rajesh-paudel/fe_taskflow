import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  Shield,
  ShieldCheck,
  KeyRound,
  EyeOff,
  Scale,
  HelpCircle,
} from "lucide-react";

export default function Security() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-neutral-950 font-sans antialiased selection:bg-neutral-100">
      {/* ========================================== */}
      {/* HERO SECTION                               */}
      {/* ========================================== */}
      <div className="py-24 px-6 relative border-b border-neutral-100 bg-neutral-50/20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f3f4f6_1px,transparent_1px),linear-gradient(to_bottom,#f3f4f6_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-30 pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center space-y-4 relative z-10">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-neutral-950 transition-colors cursor-pointer group mb-4"
          >
            <ArrowLeft
              size={14}
              className="transform group-hover:-translate-x-0.5 transition-transform"
            />
            Back to App
          </button>

          <h1 className="text-4xl sm:text-5xl font-black text-neutral-950 tracking-tight">
            Security & privacy
          </h1>
          <p className="text-neutral-500 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Your security, safety, and privacy is our top priority—and we build
            TaskFlow accordingly.
          </p>
        </div>
      </div>

      {/* CORE WRAPPER */}
      <div className="max-w-4xl mx-auto px-6 divide-y divide-neutral-100">
        {/* ========================================== */}
        {/* SECTION 1: SECURITY                        */}
        {/* ========================================== */}
        <section className="py-16 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-8 space-y-4">
            <h2 className="text-2xl font-black text-neutral-950 tracking-tight">
              Security
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base leading-relaxed">
              TaskFlow takes a security-by-design approach to protecting your
              data. Our team continues to make investments so you can use
              TaskFlow with absolute confidence.
            </p>
            <a
              href="#practices"
              className="inline-flex items-center gap-1 text-sm font-bold text-neutral-950 hover:underline group"
            >
              Our security practices{" "}
              <ArrowUpRight
                size={14}
                className="text-neutral-400 group-hover:text-neutral-950 transition-colors"
              />
            </a>

            {/* Asymmetric Sub-grid matching layout in image_f510dd.png */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-neutral-950 tracking-tight flex items-center gap-2">
                  <Shield size={16} className="text-neutral-400" /> Security
                  infrastructure
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                  TaskFlow's infrastructure is designed with layers of
                  protection to help ensure your data is secure while
                  transmitted, stored, or processed. Protections include
                  continuous TLS 1.3 encryption, least privilege access, secure
                  software development lifecycles, and an active bug bounty
                  system.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-neutral-950 tracking-tight flex items-center gap-2">
                  <KeyRound size={16} className="text-neutral-400" />{" "}
                  Operational security
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                  Our core information security systems continuously implement
                  new security controls and monitor TaskFlow for malicious
                  activity across our container infrastructure, isolated server
                  networks, and code assets.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
              <div className="space-y-2 sm:col-span-2">
                <h3 className="text-sm font-bold text-neutral-950 tracking-tight flex items-center gap-2">
                  <ShieldCheck size={16} className="text-neutral-400" /> Product
                  security
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                  We provide a robust set of in-product data protection and
                  admin controls for greater visibility and authority over your
                  workspaces. Admins can manage team organizational layers,
                  configure granular object editing keys, fine-tune permission
                  controls for external guests, and access real-time session
                  logs.
                </p>
              </div>
            </div>
          </div>

          {/* Right side vector placeholder matching the handshake layout alignment */}
          <div className="hidden md:flex md:col-span-4 justify-end pt-2">
            <div className="w-32 h-32 border border-dashed border-neutral-200 rounded-2xl flex items-center justify-center bg-neutral-50 text-neutral-400 font-mono text-[10px] text-center p-4"></div>
          </div>
        </section>

        {/* ========================================== */}
        {/* SECTION 2: PRIVACY                         */}
        {/* ========================================== */}
        <section className="py-16 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-8 space-y-4">
            <h2 className="text-2xl font-black text-neutral-950 tracking-tight">
              Privacy
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base leading-relaxed">
              TaskFlow maintains a comprehensive privacy compliance program and
              is committed to partnering with its customers and vendors on
              privacy compliance efforts. This page highlights some of the key
              aspects of our program.
            </p>

            {/* Sub-grid matching the 2x2 design matrix from image_f510dd.png */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-neutral-950 tracking-tight flex items-center gap-2">
                  <EyeOff size={16} className="text-neutral-400" /> How we
                  handle your data
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                  Our team is dedicated to developing and implementing data
                  privacy processes and safeguards that meet high industry
                  standards and best practices. We conduct ongoing training for
                  our teams to ensure they are up to speed with developments in
                  legislation and privacy practices.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-neutral-950 tracking-tight flex items-center gap-2">
                  <Scale size={16} className="text-neutral-400" /> Agreements
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                  We strive to keep all of our agreements up to date with the
                  latest regulations and industry standards. To ensure that our
                  terms track with the GDPR, CCPA and other global privacy
                  standards, we continually have our terms assessed by privacy
                  experts.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-neutral-950 tracking-tight flex items-center gap-2">
                  <HelpCircle size={16} className="text-neutral-400" /> Data
                  governance
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                  Data governance relates to the policies and procedures that
                  dictate how data is procured and used throughout its
                  lifecycle—from creation to processing, distribution, and
                  deletion. Our commitment is key to keeping our users' data
                  secure, private, and accessible.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-neutral-950 tracking-tight flex items-center gap-2">
                  <Shield size={16} className="text-neutral-400" /> Policies
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                  We want to be as transparent as possible with our customers
                  about how we collect, process, store, and use their data.
                  TaskFlow maintains comprehensive and detailed policies
                  regarding how we handle your personal information and how you
                  can exercise your rights.
                </p>
              </div>
            </div>
          </div>

          {/* Right side vector placeholder matching the chain-link layout alignment */}
          <div className="hidden md:flex md:col-span-4 justify-end pt-2">
            <div className="w-32 h-32 border border-dashed border-neutral-200 rounded-2xl flex items-center justify-center bg-neutral-50 text-neutral-400 font-mono text-[10px] text-center p-4">
              [ Privacy illustration placeholder ]
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* SECTION 3: COMPLIANCE                      */}
        {/* ========================================== */}
        <section className="py-16 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-8 space-y-4">
            <h2 className="text-2xl font-black text-neutral-950 tracking-tight">
              Compliance
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base leading-relaxed">
              TaskFlow maintains a comprehensive compliance infrastructure layer
              designed to meet stringent global standards, providing enterprise
              environments with audited system transparency.
            </p>
          </div>

          <div className="hidden md:flex md:col-span-4 justify-end pt-2">
            <div className="w-32 h-32 border border-dashed border-neutral-200 rounded-2xl flex items-center justify-center bg-neutral-50 text-neutral-400 font-mono text-[10px] text-center p-4">
              [ Compliance illustration placeholder ]
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

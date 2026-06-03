import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Settings,
  ShieldAlert,
  Zap,
  Search,
  HelpCircle,
  ChevronDown,
  ArrowLeft,
  MessageSquare,
} from "lucide-react";

const categories = [
  {
    icon: <Zap className="text-blue-600" size={22} />,
    title: "Getting Started",
    description:
      "Learn the core basics, build your first task board, and configure your workspace architecture.",
    count: "5 articles",
  },
  {
    icon: <Settings className="text-purple-600" size={22} />,
    title: "Account & Billing",
    description:
      "Manage subscription plans, profile adjustments, workspace permissions, and security parameters.",
    count: "4 articles",
  },
  {
    icon: <BookOpen className="text-emerald-600" size={22} />,
    title: "Features & Features",
    description:
      "Deep dives into real-time collaboration tools, calendar sync, and advanced Kanban operations.",
    count: "8 articles",
  },
  {
    icon: <ShieldAlert className="text-amber-600" size={22} />,
    title: "Security & Compliance",
    description:
      "Understand data residency laws, continuous server encryption pipelines, and identity token lifecycles.",
    count: "3 articles",
  },
];

const faqs = [
  {
    question: "How do I invite team members to a specific workspace layout?",
    answer:
      "Navigate to your workspace settings on the left dashboard pane, select 'Members', and enter their registered email addresses. They will receive an automated invitation routing link to instantly inherit permission states.",
  },
  {
    question: "Can I self-export my entire operational database data layout?",
    answer:
      "Yes. Under your account parameters layer, navigate to Privacy & Data. Click 'Trigger Structural Export' to systematically request a comprehensive JSON data extraction pack containing your task history logs.",
  },
  {
    question: "What happens when my application API rate-limits clear out?",
    answer:
      "Standard client actions are limited to 120 server requests per rolling 60-second window to prevent framework strain. Exceeding this triggers a temporary status constraint that clears up instantly once the frame cycles.",
  },
  {
    question: "How do I cancel my premium subscription tier?",
    answer:
      "Go to Billing Settings inside your profile container. Click 'Cancel Subscription Layer'. Your workspace environment will remain active in premium access mode until the expiration date of your current billing cycle.",
  },
];

export default function HelpCenter() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Filter categories or content dynamically if search is typed
  const filteredCategories = categories.filter(
    (cat) =>
      cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-white text-neutral-950 font-sans antialiased selection:bg-neutral-100">
      {/* HERO REGION: Minimalist architectural header with search anchor */}
      <div className="bg-neutral-50/50 border-b border-neutral-100 py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f3f4f6_1px,transparent_1px),linear-gradient(to_bottom,#f3f4f6_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-30 pointer-events-none" />

        <div className="max-w-4xl mx-auto space-y-6 relative z-10 text-center md:text-left">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-neutral-950 transition-colors cursor-pointer group"
          >
            <ArrowLeft
              size={14}
              className="transform group-hover:-translate-x-0.5 transition-transform"
            />
            Back to Application
          </button>

          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-black text-neutral-950 tracking-tight">
              Documentation & Support Hub
            </h1>
            <p className="text-neutral-500 text-sm max-w-xl">
              Search engineering protocols, resolve billing pipelines, or read
              system guidelines to streamline your workflow workspace.
            </p>
          </div>

          {/* Clean Input Search Field */}
          <div className="max-w-xl relative mx-auto md:mx-0 pt-2">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search articles, terms, operational errors..."
              className="w-full bg-white border border-neutral-200 focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 rounded-xl pl-12 pr-4 py-3.5 text-base placeholder-neutral-400 outline-none transition-all shadow-3xs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* CORE MATRIX CANVAS */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-20">
        {/* GRID SECTION: CATEGORY CARD ARCHITECTURE */}
        <section className="space-y-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400 font-mono">
            Knowledge Infrastructure
          </h2>

          {filteredCategories.length === 0 ? (
            <p className="text-sm text-neutral-400 italic">
              No corresponding documentation models found matching your
              parameters.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCategories.map((category, idx) => (
                <div
                  key={idx}
                  className="group bg-white border border-neutral-100 hover:border-neutral-950 rounded-xl p-6 transition-all duration-200 shadow-3xs flex flex-col justify-between space-y-4 cursor-pointer"
                >
                  <div className="space-y-2">
                    <div className="p-2 bg-neutral-50 group-hover:bg-neutral-100 rounded-lg inline-block transition-colors">
                      {category.icon}
                    </div>
                    <h3 className="text-base font-bold text-neutral-950 tracking-tight">
                      {category.title}
                    </h3>
                    <p className="text-sm text-neutral-500 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400 font-bold tracking-wider uppercase bg-neutral-50 group-hover:bg-neutral-100 px-2 py-1 rounded w-fit transition-colors">
                    {category.count}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ACCORDION SECTION: FREQUENTLY ASKED QUESTIONS */}
        <section className="space-y-6 max-w-3xl">
          <div className="space-y-1">
            <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400 font-mono">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-neutral-500">
              Quick answers to architectural and runtime inquiries.
            </p>
          </div>

          <div className="border-t border-neutral-100 divide-y divide-neutral-100">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="py-4">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between text-left font-bold text-sm md:text-base text-neutral-950 hover:text-neutral-700 transition-colors py-2 cursor-pointer gap-4 group"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      size={16}
                      className={`text-neutral-400 transition-transform duration-200 shrink-0 ${isOpen ? "transform rotate-180 text-neutral-950" : ""}`}
                    />
                  </button>

                  {/* Fluid CSS Accordion Canvas */}
                  <div
                    className={`grid transition-all duration-200 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 pt-2" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-sm text-neutral-500 leading-relaxed pl-1 max-w-2xl">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* FOOTER CTA: DIRECT SUPPORT ROUTE */}
        <section className="bg-neutral-950 rounded-2xl p-8 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30 pointer-events-none" />

          <div className="space-y-2 relative z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-[10px] font-bold font-mono text-neutral-400 uppercase tracking-wider">
              <HelpCircle size={10} className="text-blue-400" /> Operational
              Support
            </div>
            <h3 className="text-xl font-black tracking-tight text-white">
              Can't locate your problem layer?
            </h3>
            <p className="text-sm text-neutral-400 max-w-md">
              Our engineering systems dispatch unit is live 24/7. Open a
              diagnostic ticket for direct assistance.
            </p>
          </div>

          <a
            href="mailto:support@taskflow.com"
            className="relative z-10 px-5 py-3 bg-white text-neutral-950 hover:bg-neutral-100 font-semibold text-sm rounded-xl transition-all shadow-xs shrink-0 flex items-center gap-2 active:scale-[0.99]"
          >
            <MessageSquare size={15} /> Contact Support
          </a>
        </section>
      </div>
    </div>
  );
}

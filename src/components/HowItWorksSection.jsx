import { motion } from "framer-motion";
import { Plus, FolderKanban, Target } from "lucide-react";

const steps = [
  {
    icon: Plus,
    title: "Create Tasks Instantly",
    desc: "Capture anything in seconds before you forget it.",
  },
  {
    icon: FolderKanban,
    title: "Organize into Projects",
    desc: "Group tasks into structured, meaningful workflows.",
  },
  {
    icon: Target,
    title: "Track & Complete",
    desc: "Focus, finish, and see real progress every day.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-28 bg-white overflow-hidden">
      {/* background glow */}
      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-100 blur-3xl opacity-40 rounded-full" />

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            From idea to completion in 3 simple steps
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            TaskFlow keeps your workflow simple, structured, and fast.
          </p>
        </motion.div>

        {/* Flow */}
        <div className="mt-20 space-y-10">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`flex items-start gap-6 ${
                  index % 2 === 1 ? "flex-row-reverse text-right" : ""
                }`}
              >
                {/* icon bubble */}
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                  <Icon className="text-blue-600" />
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-gray-600 max-w-md">{step.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

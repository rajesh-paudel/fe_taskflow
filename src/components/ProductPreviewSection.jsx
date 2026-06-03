import { motion } from "framer-motion";

export default function ProductPreview() {
  return (
    <section className="relative py-28 bg-gray-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-gray-900">
            Everything you need, in one clean workspace
          </h2>
          <p className="mt-4 text-gray-600">
            A simple yet powerful interface built for focus.
          </p>
        </motion.div>

        {/* mock previews */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {["Task Board", "Project View", "Calendar"].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="rounded-2xl border bg-white shadow-sm overflow-hidden"
            >
              <div className="h-40 bg-gradient-to-br from-blue-100 to-purple-100"></div>
              <div className="p-5">
                <h3 className="font-semibold text-gray-900">{item}</h3>
                <p className="text-sm text-gray-600 mt-2">
                  View your work in a way that fits your flow.
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

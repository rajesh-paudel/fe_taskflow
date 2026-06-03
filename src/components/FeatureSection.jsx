const features = [
  "Drag & drop task management",
  "Smart due dates & reminders",
  "Tags & priority system",
  "Project-level tracking",
  "Instant global search",
];

export default function FeatureDeepDive() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900">
          Built for real workflow control
        </h2>

        <p className="mt-4 text-gray-600">
          Every detail is designed to reduce friction and save time.
        </p>

        <div className="mt-12 space-y-4 text-left max-w-xl mx-auto">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-4 rounded-xl border bg-gray-50 hover:bg-white transition"
            >
              <p className="text-gray-800 font-medium">✔ {f}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

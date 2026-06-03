const stats = [
  { label: "Tasks created", value: "10,000+" },
  { label: "Active users", value: "1,000+" },
  { label: "Productivity boost", value: "2.5x" },
];

export default function Stats() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-3 gap-6 text-center">
        {stats.map((s, i) => (
          <div key={i} className="p-6">
            <p className="text-3xl font-bold text-gray-900">{s.value}</p>
            <p className="text-gray-600 mt-2">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

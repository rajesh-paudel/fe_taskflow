import {
  FaCalendarAlt,
  FaChartBar,
  FaCheckCircle,
  FaCog,
  FaFolder,
  FaHome,
  FaRegStar,
  FaUsers,
} from "react-icons/fa";

const projects = ["Website Redesign", "Mobile App", "Marketing"];

const menuItems = [
  { label: "My Tasks", icon: FaCheckCircle, active: true },
  { label: "Calendar", icon: FaCalendarAlt },
  { label: "Team", icon: FaUsers },
  { label: "Analytics", icon: FaChartBar },
  { label: "Favorites", icon: FaRegStar },
];

export default function Dashboard() {
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = storedUser.name || "Rame";
  const userEmail = storedUser.email || "rame@gmail.com";

  return (
    <div className="min-h-screen bg-app text-main">
      <div className="flex min-h-screen flex-col md:flex-row">
        <aside className="flex w-full shrink-0 flex-col border-b border-border-subtle bg-sidebar px-5 py-6 md:min-h-screen md:w-72 md:border-b-0 md:border-r">
          <div className="mb-6 flex items-center gap-3 md:mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-text">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-main">
                {userName}
              </p>
              <p className="truncate text-xs text-muted">{userEmail}</p>
            </div>
          </div>

          <nav className="flex flex-1 flex-col gap-6 md:gap-7" aria-label="Dashboard">
            <a
              href="/dashboard"
              className="flex items-center gap-3 rounded-lg bg-white px-3 py-2.5 text-sm font-semibold text-primary shadow-sm"
            >
              <FaHome className="text-base" />
              Dashboard
            </a>

            <section>
              <div className="mb-3 flex items-center gap-3 px-3 text-sm font-semibold text-secondary-text">
                <FaFolder className="text-primary" />
                Projects
              </div>
              <div className="space-y-1 pl-8">
                {projects.map((project) => (
                  <a
                    key={project}
                    href="#"
                    className="block rounded-md px-3 py-2 text-sm text-muted transition hover:bg-white hover:text-main"
                  >
                    {project}
                  </a>
                ))}
              </div>
            </section>

            <section className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href="#"
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                      item.active
                        ? "bg-accent-subtle text-accent-text"
                        : "text-secondary-text hover:bg-white hover:text-main"
                    }`}
                  >
                    <Icon className="text-base" />
                    {item.label}
                  </a>
                );
              })}
            </section>

            <a
              href="#"
              className="mt-auto flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-secondary-text transition hover:bg-white hover:text-main"
            >
              <FaCog className="text-base" />
              Settings
            </a>
          </nav>
        </aside>

        <main className="flex-1 px-5 py-6 md:px-8 md:py-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8">
              <p className="text-sm font-medium text-muted">Task Management</p>
              <h1 className="mt-1 text-3xl font-bold text-main">My Tasks</h1>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {["To Do", "In Progress", "Done"].map((status) => (
                <section
                  key={status}
                  className="rounded-lg border border-border-subtle bg-card p-5 shadow-sm"
                >
                  <h2 className="text-sm font-semibold text-main">{status}</h2>
                  <p className="mt-2 text-sm text-muted">
                    Your {status.toLowerCase()} tasks will appear here.
                  </p>
                </section>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

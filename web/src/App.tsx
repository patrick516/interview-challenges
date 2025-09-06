import { useEffect, useMemo, useState } from "react";

/** quick helpers */
const fmt = new Intl.NumberFormat();
const classx = (...xs: (string | false | null | undefined)[]) =>
  xs.filter(Boolean).join(" ");

/** try to fetch a JSON asset; fallback to given default */
async function fetchJson<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(path, { cache: "no-store" });
    if (!res.ok) return fallback;
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}

/** tiny sparkline (no libs) */
function Spark({ data }: { data: number[] }) {
  const width = Math.max(90, data.length * 6);
  const height = 36;
  const pad = 4;
  const min = Math.min(...data, 0);
  const max = Math.max(...data, 1);
  const H = height - pad * 2;
  const step = (width - pad * 2) / Math.max(1, data.length - 1);
  const pts = data.map((v, i) => {
    const x = pad + i * step;
    const y = pad + (1 - (v - min) / (max - min || 1)) * H;
    return `${x},${y}`;
  });
  const color =
    data.at(-1)! > data[0]
      ? "#16a34a"
      : data.at(-1)! < data[0]
      ? "#dc2626"
      : "#2563eb";
  return (
    <svg width={width} height={height}>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth={2}
        points={pts.join(" ")}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** service pill */
function Status({ s }: { s: "healthy" | "degraded" | "down" }) {
  const map = {
    healthy: "bg-emerald-100 text-emerald-700 border-emerald-300",
    degraded: "bg-amber-100 text-amber-700 border-amber-300",
    down: "bg-rose-100 text-rose-700 border-rose-300",
  } as const;
  return (
    <span className={classx("px-2 py-0.5 rounded border text-xs", map[s])}>
      {s[0].toUpperCase() + s.slice(1)}
    </span>
  );
}

type Service = {
  id: string;
  name: string;
  status: "healthy" | "degraded" | "down";
  icon?: string | null;
};

export default function App() {
  /** demo KPIs (you can swap to real JSON later) */
  const [cpu, setCpu] = useState<number[]>([30, 34, 29, 40, 38, 44, 36, 42]);
  const [mem, setMem] = useState<number[]>([62, 60, 63, 65, 64, 66, 67, 68]);
  const [lat, setLat] = useState<number[]>([
    180, 170, 190, 210, 160, 175, 185, 195,
  ]);
  const [err, setErr] = useState<number[]>([2, 1, 3, 2, 4, 3, 2, 2]);

  /** services from asset JSON if available, else fallback */
  const [services, setServices] = useState<Service[]>([
    {
      id: "api",
      name: "API Gateway",
      status: "healthy",
      icon: "icons/api.svg",
    },
    {
      id: "auth",
      name: "Auth Service",
      status: "degraded",
      icon: "icons/lock.svg",
    },
    { id: "db", name: "Database", status: "healthy", icon: "icons/db.svg" },
  ]);

  /** load optional services.json if present */
  useEffect(() => {
    fetchJson<{ services: Service[] }>("/assets/resources/services.json", {
      services,
    }).then((j) => {
      if (Array.isArray(j.services) && j.services.length)
        setServices(j.services as any);
    });
  }, []);

  /** simple ticker to simulate updates (you can remove in interview) */
  useEffect(() => {
    const t = setInterval(() => {
      const evolve = (a: number[]) => [
        ...a.slice(1),
        Math.max(0, a.at(-1)! + (Math.random() * 10 - 5)),
      ];
      setCpu((a) => evolve(a));
      setMem((a) => evolve(a));
      setLat((a) => evolve(a));
      setErr((a) => evolve(a));
    }, 2500);
    return () => clearInterval(t);
  }, []);

  /** hero images from the provided designs */
  const phoneImg = "/ui/mobile.png";
  const noteImg = "/ui/notepad.png";

  return (
    <div style={{ fontFamily: "Inter, system-ui, Arial, sans-serif" }}>
      {/* header */}
      <div className="mx-auto max-w-6xl p-4">
        <header className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Monitoring Dashboard</h1>
          <div className="text-xs text-gray-500">
            assets from /assets and /ui
          </div>
        </header>

        {/* hero using their images */}
        <section className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 p-5 rounded-2xl border shadow-sm bg-white flex items-center gap-6">
            <img
              src={phoneImg}
              className="w-28 h-28 object-contain rounded-xl border bg-gray-50"
            />
            <div className="min-w-0">
              <div className="text-sm text-gray-500">Demo</div>
              <div className="text-lg font-semibold">
                Your provided UI assets
              </div>
              <p className="text-sm text-gray-600 mt-1">
                This dashboard developed by patrick kulinji uses the same files
                you gave me (in <code>/ui</code> &amp; <code>/assets</code>).
              </p>
            </div>
          </div>
          <div className="p-5 rounded-2xl border shadow-sm bg-white flex items-center gap-4">
            <img
              src={noteImg}
              className="w-20 h-20 object-contain rounded-xl border bg-gray-50"
            />
            <div>
              <div className="text-sm text-gray-500">Status</div>
              <div className="text-2xl font-semibold">
                {services.filter((s) => s.status !== "down").length}/
                {services.length}
              </div>
              <div className="text-xs text-gray-500">services operational</div>
            </div>
          </div>
        </section>

        {/* KPIs */}
        <section className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Kpi
            title="CPU Load"
            value={`${Math.round(cpu.at(-1) || 0)}%`}
            series={cpu}
          />
          <Kpi
            title="Memory Usage"
            value={`${Math.round(mem.at(-1) || 0)}%`}
            series={mem}
          />
          <Kpi
            title="p95 Latency"
            value={`${Math.round(lat.at(-1) || 0)} ms`}
            series={lat}
          />
          <Kpi
            title="Errors / min"
            value={`${Math.round(err.at(-1) || 0)}`}
            series={err}
          />
        </section>

        {/* Services */}
        <section className="mt-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {services.map((s) => (
              <div
                key={s.id}
                className="p-4 bg-white rounded-2xl border shadow-sm flex items-center gap-3"
              >
                <SvcIcon src={s.icon} name={s.name} />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="font-medium truncate">{s.name}</div>
                    <Status s={s.status} />
                  </div>
                  <div className="text-xs text-gray-500">ID: {s.id}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

/** KPI card */
function Kpi({
  title,
  value,
  series,
}: {
  title: string;
  value: string;
  series: number[];
}) {
  return (
    <div className="p-4 bg-white rounded-2xl border shadow-sm flex items-center justify-between">
      <div>
        <div className="text-xs text-gray-500">{title}</div>
        <div className="text-2xl font-semibold">{value}</div>
      </div>
      <Spark data={series} />
    </div>
  );
}

/** service icon from /assets/icons (provided) with graceful fallback */
function SvcIcon({ src, name }: { src?: string | null; name: string }) {
  const [ok, setOk] = useState<string>(() => {
    if (!src) return "";
    // allow relative like "icons/api.svg" or absolute "/assets/icons/api.svg"
    return src.startsWith("/") ? src : `/assets/${src}`;
  });
  if (ok) {
    return (
      <img
        src={ok}
        className="w-8 h-8 rounded-lg border object-contain bg-white"
        alt={name}
        onError={() => setOk("")}
      />
    );
  }
  const initials =
    name
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => (w[0] || "").toUpperCase())
      .join("") || "S";
  return (
    <div className="w-8 h-8 rounded-lg border bg-gray-50 flex items-center justify-center text-xs font-semibold">
      {initials}
    </div>
  );
}

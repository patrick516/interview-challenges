import type { ReactNode } from "react";

export default function Layout({
  sidebar,
  header,
  children,
}: {
  sidebar: ReactNode;
  header: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[260px_1fr] h-full">
      <aside className="bg-white border-r border-slate-200 overflow-auto">
        {sidebar}
      </aside>
      <main className="flex flex-col min-w-0">
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200">
          {header}
        </div>
        <div className="px-6 py-6 max-w-3xl">{children}</div>
      </main>
    </div>
  );
}

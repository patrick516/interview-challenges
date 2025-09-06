import Icon from "./Icon";

export type NoteItemModel = {
  id: string;
  title: string;
  datetime: string;
  color?: "purple" | "green" | "yellow" | "blue";
};

const pillColor = (c?: NoteItemModel["color"]) =>
  c === "green"
    ? "bg-emerald-100 text-emerald-600"
    : c === "yellow"
    ? "bg-amber-100 text-amber-600"
    : c === "blue"
    ? "bg-sky-100 text-sky-600"
    : "bg-brand-100 text-brand-600";

export default function NoteItem({ item }: { item: NoteItemModel }) {
  return (
    <button className="card w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50">
      <div className={`pill ${pillColor(item.color)}`}>
        <Icon name="calendar" className="w-5 h-5" />
      </div>

      <div className="min-w-0 text-left">
        <div className="font-semibold truncate">{item.title}</div>
        <div className="text-xs text-slate-500">{item.datetime}</div>
      </div>

      <div className="ml-auto text-slate-400">
        <Icon name="chevron-right" className="w-5 h-5" />
      </div>
    </button>
  );
}

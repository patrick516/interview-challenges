import Icon from "./Icon";

export default function Header() {
  return (
    <div className="px-6 py-3 flex items-center justify-between gap-3">
      {/* search */}
      <div className="flex items-center gap-2 bg-slate-100 border border-slate-200 px-3 py-2 rounded-xl w-full max-w-2xl">
        <Icon name="search" className="w-5 h-5 text-slate-500" />
        <input
          className="bg-transparent outline-none w-full text-sm placeholder:text-slate-500"
          placeholder="Search"
          aria-label="Search notes"
        />
      </div>

      {/* actions */}
      <div className="flex items-center gap-3">
        <button className="btn-accent">
          <Icon name="plus" className="w-5 h-5" />
          New Note
        </button>
        <img
          className="w-9 h-9 rounded-full border border-slate-200"
          src="https://i.pravatar.cc/60?img=36"
          alt="Profile"
        />
      </div>
    </div>
  );
}

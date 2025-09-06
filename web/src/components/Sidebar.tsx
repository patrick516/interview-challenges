import Icon from "./Icon";

type NoteLink = { id: string; title: string };

export default function Sidebar({ myNotes }: { myNotes: NoteLink[] }) {
  return (
    <div className="p-4 flex flex-col h-full">
      {/* brand */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-brand-600 text-white grid place-items-center font-bold">
          N
        </div>
        <div className="font-bold">NotaAI</div>
      </div>

      {/* main menu */}
      <nav className="flex flex-col gap-1 mb-4">
        <a className="nav-item nav-item-active">
          <Icon name="home" className="w-5 h-5" /> <span>Home</span>
        </a>
        <a className="nav-item">
          <Icon name="mic" className="w-5 h-5" /> <span>Transcribe</span>
        </a>
        <a className="nav-item">
          <Icon name="library" className="w-5 h-5" /> <span>My Library</span>
        </a>
        <a className="nav-item">
          <Icon name="settings" className="w-5 h-5" /> <span>Setting</span>
        </a>
      </nav>

      {/* notes */}
      <div className="text-xs text-slate-500 mb-1">My Notes</div>
      <nav className="flex flex-col gap-1">
        {myNotes.map((n) => (
          <a key={n.id} className="nav-item">
            <Icon name="file" className="w-5 h-5" />
            <span className="truncate">{n.title}</span>
          </a>
        ))}
      </nav>

      {/* bottom card */}
      <div className="mt-auto card p-3">
        <div className="text-xs">8/24 Meetings</div>
        <div className="text-[11px] text-slate-500">
          Your free space is running out!
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden my-2">
          <div className="h-full bg-brand-600 w-1/3"></div>
        </div>
        <button className="w-full py-2 text-sm rounded-xl bg-brand-600 hover:bg-brand-700 text-white">
          Upgrade Now
        </button>
      </div>
    </div>
  );
}

import Layout from "./components/Layout";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Section from "./components/Section";
import NoteItem from "./components/NoteItem";
import { comingUp, today, myNotes } from "./data";

export default function App() {
  return (
    <Layout sidebar={<Sidebar myNotes={myNotes} />} header={<Header />}>
      <div className="space-y-8">
        <Section title="Coming up">
          <div className="space-y-2">
            {comingUp.map((n) => (
              <NoteItem key={n.id} item={n} />
            ))}
          </div>
        </Section>

        <Section title="Today">
          <div className="space-y-2">
            {today.map((n) => (
              <NoteItem key={n.id} item={n} />
            ))}
          </div>
        </Section>
      </div>
    </Layout>
  );
}

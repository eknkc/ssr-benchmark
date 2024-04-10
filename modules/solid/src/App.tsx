import { For, Suspense, createResource } from "solid-js";
import { testData } from "testdata";

function App() {
  return (
    <Suspense>
      <Table />
    </Suspense>
  );
}

function Table() {
  const [tdata] = createResource(testData);

  return (
    <table>
      <tbody>
        <For each={tdata()}>{(entry) => <Entry entry={entry} />}</For>
      </tbody>
    </table>
  );
}

function Entry(props: { entry: { id: string; name: string; asyncData?: () => Promise<string> } }) {
  return (
    <tr>
      <td>{props.entry.id}</td>
      <td>{props.entry.name}</td>
    </tr>
  );
}

export default App;

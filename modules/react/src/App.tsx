import { Suspense, useRef, use } from "react";
import { testData } from "testdata";

function App() {
  const dataRef = useRef<ReturnType<typeof testData>>();

  if (!dataRef.current) dataRef.current = testData();

  return (
    <Suspense>
      <Table data={dataRef.current} />
    </Suspense>
  );
}

function Table({ data }: { data: ReturnType<typeof testData> }) {
  const tdata = use(data);

  return (
    <table>
      <tbody>
        {tdata.map((entry) => (
          <Entry key={entry.id} entry={entry} />
        ))}
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

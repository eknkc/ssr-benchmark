import { testData } from "testdata";
import { Suspense } from "hono/jsx";

function App() {
  return (
    <Suspense fallback={"loading..."}>
      <Table data={testData()} />
    </Suspense>
  );
}

async function Table({ data }: { data: ReturnType<typeof testData> }) {
  const entries = await data;
  return (
    <table>
      <tbody>
        {entries.map((entry) => (
          <Entry entry={entry} />
        ))}
      </tbody>
    </table>
  );
}

function Entry(props: { entry: { id: string; name: string } }) {
  return (
    <tr>
      <td>{props.entry.id}</td>
      <td>{props.entry.name}</td>
    </tr>
  );
}

export default App;

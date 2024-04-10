export const dynamic = "force-dynamic";

import { testData } from "testdata";

export default async function App() {
  return <Table data={await testData()} />;
}

function Table({ data }: { data: Awaited<ReturnType<typeof testData>> }) {
  return (
    <table>
      <tbody>
        {data.map((entry) => (
          <Entry key={entry.id} entry={entry} />
        ))}
      </tbody>
    </table>
  );
}

function Entry(props: {
  entry: { id: string; name: string; asyncData?: () => Promise<string> };
}) {
  return (
    <tr>
      <td>{props.entry.id}</td>
      <td>{props.entry.name}</td>
    </tr>
  );
}

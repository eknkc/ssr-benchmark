import { testData } from "testdata";

type Entry = { id: string, name: string };

function Table(props: { data: Entry[] }) {
  return (
    <table>
      <tbody>
        {props.data.map((entry: Entry) => (
          <Entry
            key={entry.id}
            entry={entry}
          />
        ))}
      </tbody>
    </table>
  );
}

function Entry(props: { entry: Entry }) {
  return (
    <tr>
      <td>{props.entry.id}</td>
      <td>{props.entry.name}</td>
    </tr>
  );
}

export async function App() {
  const tdata = await testData();

  return <Table data={tdata} />;
}

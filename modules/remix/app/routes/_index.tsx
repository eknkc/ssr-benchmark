import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { testData } from "testdata";

export const loader = async () => {
  return json(await testData());
};

export default function App() {
  const data = useLoaderData<typeof loader>();

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

function Entry(props: { entry: { id: string; name: string; asyncData?: () => Promise<string> } }) {
  return (
    <tr>
      <td>{props.entry.id}</td>
      <td>{props.entry.name}</td>
    </tr>
  );
}

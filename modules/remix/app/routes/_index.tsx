import { defer } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { testData } from "testdata";

export const loader = async () => {
  return defer({ testData: testData() });
};

export default function App() {
  const data = useLoaderData<typeof loader>();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Await resolve={data.testData}>
        {(data) => (
          <table>
            <tbody>
              {data.map((entry) => (
                <Entry key={entry.id} entry={entry} />
              ))}
            </tbody>
          </table>
        )}
      </Await>
    </Suspense>
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

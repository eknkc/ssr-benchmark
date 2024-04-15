import { Suspense } from '@kitajs/html/suspense.js';
import { testData } from 'testdata';
import Html from '@kitajs/html';

export default function App(rid: number | string) {
  return (
    <Suspense rid={rid} fallback={''}>
      <Table data={testData()} />
    </Suspense>
  );
}

async function Table({ data }: { data: ReturnType<typeof testData> }) {
  return (
    <table>
      <tbody>
        {(await data).map((entry) => (
          <Entry entry={entry} />
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
      <td safe>{props.entry.id}</td>
      <td safe>{props.entry.name}</td>
    </tr>
  );
}

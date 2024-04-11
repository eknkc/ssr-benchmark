import { Suspense, useRef, use } from "react";
import { testData } from "testdata";

export const getServerSideProps = async () => {
  return {
    props: {
      data: await testData(),
    },
  };
};

function App({ data }: { data: Awaited<ReturnType<typeof testData>> }) {
  return <Table data={data} />;
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

export default App;

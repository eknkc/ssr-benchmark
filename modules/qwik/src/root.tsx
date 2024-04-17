import { component$, useSignal } from "@builder.io/qwik";
import { type testData } from "testdata";

type TestData = Awaited<ReturnType<typeof testData>>;

export function Entry(props: { id: string; name: string }) {
  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.name}</td>
    </tr>
  );
}

export default component$((props: any) => {
  const data = useSignal<TestData>(props.data);
  return (
    <table>
      <tbody>
        {data.value?.map((entry, i) => (
          <Entry key={i} id={entry.id} name={entry.name} />
        ))}
      </tbody>
    </table>
  );
});

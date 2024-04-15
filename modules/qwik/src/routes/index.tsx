import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { testData } from "testdata";

type TestData = Awaited<ReturnType<typeof testData>>;

// Route Loader for the data
export const useData = routeLoader$<TestData>(() => testData());

export function Entry(props: { id: string; name: string }) {
  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.name}</td>
    </tr>
  );
}

export default component$(() => {
  const data = useData();
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

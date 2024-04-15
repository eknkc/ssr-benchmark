import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { testData } from "testdata";

export const useData = routeLoader$(() => testData());

function Entry(props: { id: string; name: string }) {
  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.name}</td>
    </tr>
  );
}

export default component$(() => {
  const data = useData().value;
  return (
    <table>
      <tbody>
        {data?.map((entry: any, i: number) => (
          <Entry key={i} id={entry.id} name={entry.name} />
        ))}
      </tbody>
    </table>
  );
});

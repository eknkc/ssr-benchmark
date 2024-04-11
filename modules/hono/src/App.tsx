import { testData } from 'testdata'

function App() {
  return <Table data={testData()} />
}

async function Table({ data }: { data: ReturnType<typeof testData> }) {
  const entries = await data
  return (
    <table>
      <tbody>
        {entries.map((entry) => (
          <Entry entry={entry} />
        ))}
      </tbody>
    </table>
  )
}

function Entry(props: { entry: { id: string; name: string } }) {
  return (
    <tr>
      <td>{props.entry.id}</td>
      <td>{props.entry.name}</td>
    </tr>
  )
}

export default App

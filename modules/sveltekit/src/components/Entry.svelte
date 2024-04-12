<script lang="ts">
  import type { EntryData } from "$lib/type";

  export let entry: EntryData
</script>

<tr>
  <td>{entry.id}</td>
  <td>{entry.name}</td>
</tr>

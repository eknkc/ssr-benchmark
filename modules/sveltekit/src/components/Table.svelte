<script lang="ts">
  import type { EntryData } from "$lib/type";
  import Entry from './Entry.svelte'

  export let entries: EntryData[]
</script>

<table>
  {#each entries as entry}
    <Entry {entry} />
  {/each}
</table>

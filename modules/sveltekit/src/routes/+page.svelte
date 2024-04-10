<script lang="ts">
  import Entry from "../components/Entry.svelte";

  export let data: any;
</script>

<main>
  <table>
    {#each data.entries as entry}
      <Entry {entry} />
    {/each}
  </table>
</main>

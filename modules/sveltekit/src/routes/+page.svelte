<script lang="ts">
  import Table from "../components/Table.svelte";

  export let data;
</script>

<main>
  <Table entries={data.entries} />
</main>

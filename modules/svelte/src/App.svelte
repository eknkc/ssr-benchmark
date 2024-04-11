<script lang="ts">
	import Entry from "./Entry.svelte";

	export let entries: any;
</script>

<main>
	<table>
		{#each entries as entry}
			<Entry {entry} />
		{/each}
	</table>
</main>

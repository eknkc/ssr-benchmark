<script setup>
const props = defineProps({
  entry: Object,
});
</script>

<template>
  <tr>
    <td>{{ props.entry.id }}</td>
    <td>{{ props.entry.name }}</td>
  </tr>
</template>

<script setup>
const { data } = await useAsyncData(() => import('testdata').then(r => r.testData()), { deep: false });
</script>

<template>
  <table>
    <tbody>
      <Entry v-for="entry in data" :key="entry.id" :entry="entry" />
    </tbody>
  </table>
</template>

<script setup>
import Entry from "./Entry.vue";
import { testData } from "testdata";

const data = await testData();
</script>

<template>
  <table>
    <tbody>
      <Entry v-for="entry in data" :key="entry.id" :entry="entry" />
    </tbody>
  </table>
</template>

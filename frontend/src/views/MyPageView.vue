<script setup>
import { useAuthStore } from '@/stores/useAuth';
import { storeToRefs } from 'pinia';
const auth = useAuthStore();

const { token } = storeToRefs(auth);
</script>
<template>
  <div class="container mx-auto my-8">
    <h1 class="text-4xl text-center mb-4 font-bold">
      マイページ（プライベート）
    </h1>
    <div class="break-words">
      <h2 class="font-bold mt-4">token</h2>
      <p>{{ token }}</p>
    </div>
  </div>
</template>
<style>

</style>

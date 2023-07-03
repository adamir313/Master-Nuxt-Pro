<template>
  <div class="min-h-screen gap-y-5 flex flex-col justify-center items-center ">
    <h1 class="text-5xl font-bold text-indigo-800">
      {{ error.statusCode }} </h1>
      <h2 class="text-3xl font-bold text-indigo-800">{{ error.message }}</h2>
    <button class="amir text-lg rounded-sm border border-gray-500 p-3 text-indigo-500" @click="handleError">Go to Home</button>
  </div>
</template>
  
<script setup>

const props = defineProps({
  error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>
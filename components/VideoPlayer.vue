<template>
  <div class="relative w-full overflow-hidden pt-[56.25%]">
    <iframe :src="`https://player.vimeo.com/video/${props.videoId}`" frameborder="0" title="Video player" allow="accelerometer; autoplay; clipboard-write; 
   encrypted-media; " allowfullscreen class="absolute top-0 right-0 left-0 bottom-0 w-full h-full"></iframe>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  videoId: {
    type: Number,
    required: true,
  },
});
</script>

<style scoped></style>

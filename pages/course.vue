<template>
    <div class="p-12 bg-gray-100 w-full h-full min-h-screen flex flex-col items-center">
        <div class="mb-12">
            <h1 class="text-5xl">
                <span class="font-medium">
                    Course:
                    <span class="font-bold">Mastering Nuxt</span>
                </span>
            </h1>
        </div>
        <div class="w-full flex flex-row justify-center">
            <div class="w-3/12 mr-4 p-8 bg-white rounded-md min-w-[20ch] flex flex-col">
                <h3 class="text-xl font-bold">Chapters</h3>
                <div v-for="chapter in chapters" :key="chapter.id" class="gap-2 mt-4 flex flex-col">
                    <h4 class="text-lg font-semibold">
                        {{ chapter.title }}</h4>
                    <NuxtLink v-for="(lesson, index) in chapter.lessons" :key="lesson.id" :class="{'ml-2': true, 
                        'text-blue-500': lesson.path === $route.fullPath,
                        'text-gray-600': lesson.path !== $route.fullPath}"
                        :to="lesson.path">
                        <span class="text-gray-500 mr-1">{{ index + 1 }}.</span>
                        <span>{{ lesson.title }}</span>
                    </NuxtLink>
                </div>
            </div>
            <div class="w-8/12 p-12 bg-white rounded-md">
                <NuxtPage />
            </div>
        </div>
    </div>
</template>

<script setup>
const chapters = useCourse().chapters;
</script>
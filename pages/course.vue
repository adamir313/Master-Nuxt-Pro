<template>
    <div class="mb-12 flex justify-between items-center w-full">
        <h1 class="text-5xl">
            <span class="font-medium">
                Course:
                <span class="font-bold">{{ course.title }}</span>
            </span>
        </h1>
        <UserCard />
    </div>
    <div class="w-full flex flex-row justify-center">

        <div class="w-3/12 mr-4 p-8 bg-white rounded-md min-w-[20ch] flex flex-col">
            <nav>
                <h3 class="text-xl font-bold">Chapters</h3>
                <div v-for="(chapter, index) in course.chapters" :key="chapter.id" class="gap-2 mt-4 flex flex-col">
                    <h4 class="text-lg font-semibold flex justify-between items-center">
                        {{ chapter.title }}
                        <span v-if="percentageCompleted && user" class="text-emerald-500 text-sm">
                            {{ percentageCompleted.chapters[index] }}%
                        </span>
                    </h4>
                    <NuxtLink v-for="(lesson, index) in chapter.lessons" :key="lesson.id" :class="{
                        'ml-2': true,
                    }" :to="`${basePath}${chapter.id}/lesson/${lesson.id}`">
                        <span class="mr-1">{{ index + 1 }}.</span>
                        <span>{{ lesson.title }}</span>
                    </NuxtLink>
                </div>
                <div v-if="percentageCompleted" class="mt-8 text-sm font-medium text-gray-500 flex justify-between">
                    Course completion: {{ percentageCompleted.course }}%
                </div>
            </nav>
        </div>

        <div class="w-9/12 p-12 bg-white rounded-md">
            <NuxtPage />
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useCourseProgress } from '~/stores/courseProgress';
const user = useSupabaseUser();
const course = await useCourse();
const basePath = `/course/chapter/`;

const { percentageCompleted } = storeToRefs(useCourseProgress());
</script>

<style>
.router-link-active {
    color: #00c58e
}
</style>
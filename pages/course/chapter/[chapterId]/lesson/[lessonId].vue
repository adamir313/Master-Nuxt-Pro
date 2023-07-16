<template>
    <div class="space-y-3">
        <p class="mt-0 uppercase font-bold text-slate-400">
            Lesson {{ chapter.number }} - {{ lesson.number }}
        </p>
        <h2 class="text-2xl font-bold">{{ lesson.title }}</h2>
        <div class="flex space-x-4">
            <NuxtLink v-if="lesson.sourceUrl" class="font-normal text-md text-gray-500" :to="lesson.sourceUrl">Download
                Source
                Code</NuxtLink>
            <NuxtLink v-if="lesson.videoUrl" class="font-normal text-md text-gray-500" :to="lesson.videoUrl">Download Video
            </NuxtLink>
        </div>
        <VideoPlayer v-if="lesson.videoId" :videoId="lesson.videoId" />
        <p class=""> {{ lesson.text }} </p>
        <LessonCompleteButton v-if="user" :modelValue="isCompleted" @update:modelValue="toggleComplete" />
    </div>
</template>

<script setup>
import { useCourseProgress } from '~/stores/courseProgress';
const course = await useCourse();
const route = useRoute();

const user = useSupabaseUser();
const store = useCourseProgress();
const { initialize, toggleComplete } = store;

initialize();

const { chapterId, lessonId } = route.params;

const lesson = await useLesson(chapterId, lessonId);

definePageMeta({
    //middleware: ["auth"]
    middleware: ['lesson-route-middleware', 'auth']
})

const chapter = computed(() => {
    return course.value.chapters.find((
        chapter) => chapter.id === route.params.chapterId);
});

const title = computed(() => {
    return `${lesson.value.title} - ${course.value.title}`;
});

const isCompleted = computed(() => {
    return store.progress[chapterId]?.[lessonId] || false;
});

useHead({
    title
});

</script>
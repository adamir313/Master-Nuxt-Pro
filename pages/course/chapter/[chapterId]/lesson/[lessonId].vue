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
        <LessonCompleteButton :modelValue="isLessonCompleted" @update:modelValue="toggleComplete" />
    </div>
</template>

<script setup>

const course = await useCourse();
const route = useRoute();

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



// const lesson = computed(() => {
//     return chapter.value.lessons.find((
//         lesson) => lesson.id === route.params.lessonId);
// });

const title = computed(() => {
    return `${lesson.value.title} - ${course.value.title}`;
});

useHead({
    title
});

const progress = useLocalStorage('progress', []);

const isLessonCompleted = computed(() => {
    if (!progress.value[chapter.value.number - 1]) {
        return false;
    }

    if (!progress.value[chapter.value.number - 1][lesson.value.number - 1]) {
        return false;
    }

    return progress.value[chapter.value.number - 1][lesson.value.number - 1];
});

const toggleComplete = () => {
    if (!progress.value[chapter.value.number - 1]) {
        progress.value[chapter.value.number - 1] = [];
    }
    console.log(chapter);
    console.log({ chapter });
    progress.value[chapter.value.number - 1][lesson.value.number - 1] = !isLessonCompleted.value;
}

</script>
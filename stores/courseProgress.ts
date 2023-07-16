import { defineStore } from "pinia";
import { CourseProgress } from "types/course";

export const useCourseProgress = defineStore(
    'courseProgress',
    () => {
        const progress = ref<CourseProgress>({});

        const initialized = ref(false);

        async function initialize() {
            if (initialized.value) return;
            initialized.value = true;
            const { data: userProgress, error } = await useFetch<CourseProgress>('http://localhost:3000/api/user/progress', {
                headers: useRequestHeaders(['cookie'])
            });

            if (userProgress.value) {
                progress.value = userProgress.value;
            }
        }

        const toggleComplete = async (chapter: string, lesson: string) => {
            const user = useSupabaseUser();
            if (!user.value) return;

            if (!chapter || !lesson) {
                const { params: { chapterId, lessonId }, } = useRoute();
                chapter = chapterId as string;
                lesson = lessonId as string;
            }

            const currentProgress = progress.value[chapter]?.[lesson];

            // if (!progress.value[chapter]) {
            //     progress.value[chapter] = [];
            // }
            progress.value[chapter] = {
                ...progress.value[chapter],
                [lesson]: !currentProgress,
            };

            //Update the progress in DB
            try {
                await $fetch(`http://localhost:3000/api/course/chapter/${chapter}/lesson/${lesson}/progress`, {
                    method: 'POST',
                    body: {
                        completed: !currentProgress,
                    },
                });
            }
            catch (error) {
                console.error(error);

                progress.value[chapter][lesson] = currentProgress;
            }
        };

        const percentageCompleted = computed(() => {
            //Per chapter
            const chapters = Object.values(progress.value).map((chapter) => {
                const lessons = Object.values(chapter);
                const completedLessons = lessons.filter((lesson) => lesson);
                return Number((completedLessons.length / lessons.length) * 100).toFixed(0);
            }, []);

            //Per course
            const totalLessons = Object.values(
                progress.value
            ).reduce((number, chapter) => {
                return number + Object.values(chapter).length;
            }, 0);

            const totalCompletedLessons = Object.values(
                progress.value
            ).reduce((number, chapter) => {
                return (
                    number +
                    Object.values(chapter).filter((lesson) => lesson)
                        .length
                );
            }, 0);

            const course = Number(
                (totalCompletedLessons / totalLessons) * 100
            ).toFixed(0);

            return {
                chapters,
                course,
            };
        });

        return {
            initialize,
            progress,
            toggleComplete,
            percentageCompleted,
        };
    }
);
export default async () => {
    const course = await useCourse();
    const firstChapter = course.value.chapters[0];
    const firstLesson = course.value.chapters[0].lessons[0];
    return { ...firstLesson, path: `/course/chapter/${firstChapter.id}/lesson/${firstLesson.id}` };
}
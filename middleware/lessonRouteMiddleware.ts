export default defineNuxtRouteMiddleware(async (to, from) => {

    const course = await useCourse();

    const chapter = course.value.chapters.find((
        chapter) => chapter.id === to.params.chapterId);

    if (!chapter) {
        return abortNavigation(
            createError({
                statusCode: 404,
                message: 'Chapter not found!'
            }));
    }

    const lesson = chapter.lessons.find((
        lesson) => lesson.id === to.params.lessonId);

    if (!lesson) {
        return abortNavigation(
            createError({
                statusCode: 404,
                message: 'Lesson not found!'
            }));
    }

    // if (to.params.id === '1') {
    //   return abortNavigation()
    // }
    // In a real app you would probably not redirect every route to `/`
    // however it is important to check `to.path` before redirecting or you
    // might get an infinite redirect loop
    // if (to.path !== '/') {
    //   return navigateTo('/')
    // }
  });
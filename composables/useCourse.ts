import courseData from "./courseData";

export const useCourse = () => {
  return {
    ...courseData,
    chapters: courseData.chapters.map((chapter) => ({
      ...chapter,
      lessons: chapter.lessons.map((lesson) => ({
        ...lesson,
        path: `/course/chapter/${chapter.id}/lesson/${lesson.id}`,
      })),
    })),
  };
}

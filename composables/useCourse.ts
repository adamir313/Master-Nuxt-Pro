import { type } from "os";
import courseData from "./courseData";

type Lesson = {
  title: string;
  id: string;
  number: number;
  videoUrl: string;
  videoId: number;
  text: string;
  sourceUrl?: string;
  path: string;
};

type Chapter = {
  title: string;
  id: string;
  number: number;
  lessons: Lesson[];
};

type Course = {
  title: string;
  chapters: Chapter[];
};

export const useCourse = (): Course => {

  const chapters: Chapter[] = courseData.chapters.map((chapter) => {

    const lessons: Lesson[] = chapter.lessons.map((lesson) => ({
      ...lesson,
      path: `/course/chapter/${chapter.id}/lesson/${lesson.id}`,
    }));
    return { ...chapter, lessons };
  });
  return { ...courseData, chapters };
};

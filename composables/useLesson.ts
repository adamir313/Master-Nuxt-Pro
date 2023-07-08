import { LessonWithPath } from "types/course";

export default async (chapterId: string, lessonId: string) =>

    useFetchWithCache<LessonWithPath>(`/api/course/chapter/${chapterId}/lesson/${lessonId}`);

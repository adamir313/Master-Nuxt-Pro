import { PrismaClient } from "@prisma/client";
import { ChapterOutline, CourseOutline, LessonOutline } from "../course/meta.get";
import { CourseProgress, ChapterProgress } from "~/types/course";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    protectRoute(event);

    const { user: { email: userEmail } } = event.context;

    const userProgress = await prisma.lessonProgress.findMany({
        where: {
            userEmail,
            Lesson: {
                Chapter: {
                    Course: {
                        id: 1,
                    }
                }
            }
        },
        select: {
            completed: true,
            Lesson: {
                select: {
                    id: true,
                    Chapter: {
                        select: {
                            id: true,
                        }
                    }
                }
            }
        }
    });

    const courseOutline = await $fetch<CourseOutline>('http://localhost:3000/api/course/meta');
    if (!courseOutline) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Course outline not found!',
        });
    }

    const progress = courseOutline.chapters.reduce(
        (
            courseProgress: CourseProgress,
            chapter: ChapterOutline
        ) => {
            // Collect the progress for each chapter in the course
            courseProgress[chapter.id] = chapter.lessons.reduce(
                (
                    chapterProgress: ChapterProgress,
                    lesson: LessonOutline
                ) => {
                    // Collect the progress for each lesson in the chapter
                    chapterProgress[lesson.id] =
                        userProgress.find(
                            (progress) =>
                                progress.Lesson.id === lesson.id &&
                                progress.Lesson.Chapter.id ===
                                chapter.id
                        )?.completed || false;

                    return chapterProgress;
                },
                {}
            );

            return courseProgress;
        },
        {}
    );

    return progress;
});
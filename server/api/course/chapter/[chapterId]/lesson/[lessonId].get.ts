import { PrismaClient } from "@prisma/client";
import protectRoute from "~/server/Utils/protectRoute";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {

    if (event.context.params.chapterId !== 'c1') {
        protectRoute(event);
    }

    const { chapterId, lessonId } = event.context.params;

    const lesson = await prisma.lesson.findFirst({
        where: {
            id: lessonId,
            Chapter: {
                id: chapterId
            }
        }
    });

    if (!lesson) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Lesson not found!'
        });
    }

    return { ...lesson, path: `/course/chapter/${chapterId}/lesson/${lessonId}` };
});
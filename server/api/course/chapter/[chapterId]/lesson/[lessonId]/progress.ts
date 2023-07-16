import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {

    assertMethod(event, ['PUT', 'PATCH', 'POST']);

    protectRoute(event);

    const { chapterId, lessonId } = event.context.params;

    const lesson = await prisma.lesson.findFirst({
        where: {
            id: lessonId,
            Chapter: {
                id: chapterId,
            }
        }
    });

    if (!lesson) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Lesson not found!',
        });
    }

    const { completed } = await readBody(event);
    const { user: { email: userEmail } } = event.context;

    return prisma.lessonProgress.upsert({
        where: {
            lessonIde_userEmail: {
                lessonIde: lesson.ide,
                userEmail,
            },
        },
        update: {
            completed,
        },
        create: {
            completed,
            userEmail,
            Lesson: {
                connect: {
                    ide: lesson.ide,
                },
            },
        },
    });
});
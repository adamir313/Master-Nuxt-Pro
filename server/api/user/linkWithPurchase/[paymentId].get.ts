import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const { paymentId } = event.context.params;
    const user = event.context.user;

    try {
        await prisma.coursePurchase.update({
            where: {
                paymentId,
            },
            data: {
                userEmail: user.email,
            }
        });
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Erro linking course purchase!',
        });
    }

    return 200;
});
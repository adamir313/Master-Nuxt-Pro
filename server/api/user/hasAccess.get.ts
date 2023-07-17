import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type User = {
    email: string;
};

export default defineEventHandler(async (event) => {
    const user = event.context.user as User;

    if (!user) {
        return false;
    }

    const coursePurchses = await prisma.coursePurchase.findMany({
        where: {
            userEmail: user.email,
            verified: true,
            courseId: 1,
        },
    });

    return coursePurchses.length > 0;
});
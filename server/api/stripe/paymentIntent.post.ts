import { PrismaClient } from "@prisma/client";
import stripe from "./stripe";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const { email } = await readBody(event);

    let paymentIntent;
    try {
        paymentIntent = await stripe.paymentIntents.create({
            amount: 97 * 100,
            currency: 'usd',
            // metaData: {
            //     email,
            // },
        });
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Error creating payment intent',
        });
    }

    try {
        await prisma.coursePurchase.create({
            data: {
                userEmail: email,
                courseId: 1,
                paymentId: paymentIntent.id,
            },
        });
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Error creating course purchase',
        });
    }

    return paymentIntent.client_secret;
});
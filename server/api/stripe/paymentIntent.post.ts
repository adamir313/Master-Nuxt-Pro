import stripe from "./stripe";

export default defineEventHandler(async (event) => {
    const { email } = await readBody(event);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: 97 * 100,
        currency: 'usd',
        // metaData: {
        //     email,
        // },
    });

    console.log(paymentIntent.client_secret);

    return paymentIntent.client_secret;
});
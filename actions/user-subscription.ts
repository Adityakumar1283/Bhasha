"use server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { stripe } from "@lib/stripe";
import { absoluteUrl } from "@lib/utils";

import { getUserSubscription } from "@/config/queries";


const returnUrl = absoluteUrl("/shop");

export const createStripeUrl = async () => {
  const { userId } = await auth();
  const user = await currentUser();
  if (!userId || !user) {
    throw new Error("User not authenticated");
  }

  const userSubscripton = await getUserSubscription();

  if (userSubscripton && userSubscripton.stripeCustomerId) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: userSubscripton.stripeCustomerId,
      return_url: returnUrl,
    });

    return { data: stripeSession.url };
  }

  const stripeSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer_email: user.emailAddresses[0].emailAddress,
    line_items: [
      {
        price_data: {
          currency: "USD",
          product_data: {
            name: "Bhasha Pro Subscription",
            description: "Unlock all features with Bhasha Pro",
          },
          unit_amount: 2000,
          recurring: { interval: "month" },
        },
        quantity: 1,
      },
    ],
    metadata: {userId,},
    success_url: returnUrl,
    cancel_url: returnUrl,
  });

    return { data: stripeSession.url}
};

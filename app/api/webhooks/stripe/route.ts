import {db} from "@/config/db";
import { userSubscription } from "@/config/schema";
import { stripe } from "@/lib/stripe";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const sig = (await headers()).get("stripe-signature") as string;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error, ${error.message}`, { status: 400 });
  }

 const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === "checkout.session.completed") {
        // Handle successful checkout session completion
        const subscription =  await stripe.subscriptions.retrieve(session.subscription as string);

        if(!session?.metadata?.userId ){
            return new NextResponse("User ID required", { status: 400 });
            
        }
  await db.insert(userSubscription).values({
            userId: session.metadata.userId,
            stripeCustomerId: session.customer as string,
            stripeSubscriptionId: subscription.id,
            stripePriceId: subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
        })
      
    }

    if(event.type === "invoice.payment_succeeded") {

         const subscription =  await stripe.subscriptions.retrieve(session.subscription as string);

         await db.update(userSubscription).set({
            stripePriceId: subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
         }).where(eq(userSubscription.stripeSubscriptionId, subscription.id));
    
        }
    

  return new NextResponse(null, { status: 200 });
}

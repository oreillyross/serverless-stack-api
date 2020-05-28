import handler from "./libs/handler-lib.js";
import StripePackage from "stripe";
import { calculateCost } from "./libs/billing-lib.js";

export const main = handler(async (event, context) => {
  const { storage, source } = JSON.parse(event.body);
  const amount = calculateCost(storage);
  const description = "Scratch billing";

  const stripe = StripePackage(process.env.stripeSecretKey);

  await stripe.charges.create({
    source,
    amount,
    description,
    currency: "usd",
  });
  return { status: true };
});

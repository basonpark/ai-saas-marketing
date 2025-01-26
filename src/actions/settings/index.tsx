import { currentUser } from "@clerk/nextjs/server";
import { client } from "../../lib/prisma";

export const onGetSubscriptionPlan = async () => {
  try {
    const user = await currentUser();
    if (!user) return;
    const plan = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });
    if (plan) {
      return plan.subscription?.plan;
    }
    return plan;
  } catch (error) {
    console.log(error);
  }
};

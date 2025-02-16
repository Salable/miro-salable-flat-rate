'use server'
import {
  PaginatedSubscriptionInvoice,
  Plan,
  PlanCurrency,
  Subscription
} from "@salable/node-sdk/dist/src/types";
import {Result} from "../../fetch/licenses/check";
import {salableBoardPlanUuid, salableProductUuid} from "../../app/constants";
import {salable} from "../../app/salable";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import initMiroAPI from "../../utils/initMiroAPI";
import {SalableResponseError} from "@salable/node-sdk";

export type SubscriptionExpandedPlan = Subscription & {
  plan: Plan
}

export type GetAllSubscriptionsExpandedPlan = {
  first: string;
  last: string;
  data: SubscriptionExpandedPlan[]
}

export async function getAllSubscriptions(email: string): Promise<Result<GetAllSubscriptionsExpandedPlan>> {
  try {
    const data = await salable.subscriptions.getAll({
      email,
      expand: ['plan'],
      sort: 'desc',
      productUuid: salableProductUuid,
    }) as GetAllSubscriptionsExpandedPlan
    return {
      data, error: null
    }
  } catch (e) {
    console.log(e)
    return {
      data: null,
      error: 'Failed to fetch subscriptions',
    }
  }
}

export type SubscriptionExpandedPlanCurrency = Subscription & {
  plan: Plan & {
    currencies: PlanCurrency[]
  }
}

export const cancelSubscription = async (subscriptionUuid: string) => {
  try {
    await salable.subscriptions.cancel(subscriptionUuid, {when: 'now'})
    await new Promise<void>(async (resolve) => {
      while (true) {
        try {
          const subscription = await getOneSubscription(subscriptionUuid)
          if (subscription.data?.status === 'CANCELED') {
            resolve()
            break
          }
          await new Promise(r => setTimeout(r, 500));
        } catch (e) {
          console.log(e)
          break
        }
      }
    })
  } catch (e) {
    console.log(e)
    return {
      data: null,
      error: 'Failed to cancel subscription'
    }
  }
  revalidatePath(`/`)
  revalidatePath(`/dashboard/subscriptions/${subscriptionUuid}`)
  redirect(`/dashboard/subscriptions/${subscriptionUuid}`)
}

export async function getOneSubscription(uuid: string, boardId?: string): Promise<Result<SubscriptionExpandedPlanCurrency | null>> {
  const {userId, miro} = await initMiroAPI()
  try {
    const data = await salable.subscriptions.getOne(uuid, {expand: ['plan.currencies']}) as SubscriptionExpandedPlanCurrency
    if (data.planUuid === salableBoardPlanUuid && boardId) {
      const api = miro.as(userId)
      const board = await api.getBoard(boardId)
      if (board.owner?.id !== userId) {
        return {
          data: null,
          error: 'Failed to fetch subscription',
        }
      }
    }
    return {
      data, error: null
    }
  } catch (e) {
    if (e instanceof SalableResponseError && e.code === 'S1002') {
      return {
        data: null,
        error: null
      }
    }
    console.log(e)
    return {
      data: null,
      error: 'Failed to fetch subscription',
    }
  }
}

export async function getSubscriptionInvoices(uuid: string, boardId: string): Promise<Result<PaginatedSubscriptionInvoice>> {
  const {userId, miro} = initMiroAPI()
  try {
    const subscription = await salable.subscriptions.getOne(uuid)
    if (subscription.planUuid === salableBoardPlanUuid && boardId) {
      const api = miro.as(userId)
      const board = await api.getBoard(boardId)
      if (board.owner?.id !== userId) {
        return {
          data: null,
          error: 'Failed to fetch invoices',
        }
      }
    }
    const data = await salable.subscriptions.getInvoices(uuid)
    return {
      data, error: null
    }
  } catch (e) {
    console.log(e)
    return {
      data: null,
      error: 'Failed to fetch subscription',
    }
  }
}

export const changeSubscription = async (subscriptionUuid: string, planUuid: string) => {
  try {
    await salable.subscriptions.changePlan(subscriptionUuid, {planUuid, proration: 'always_invoice'});
    await new Promise<void>(async (resolve) => {
      while (true) {
        try {
          const subscription = await getOneSubscription(subscriptionUuid)
          if (subscription.data?.planUuid === planUuid) {
            resolve()
            break
          }
          await new Promise(r => setTimeout(r, 500));
        } catch (e) {
          console.log(e)
          break
        }
      }
    })
  } catch (e) {
    console.log(e)
    return {
      data: null,
      error: 'Failed to update subscription'
    }
  }
  revalidatePath(`/dashboard/subscriptions/${subscriptionUuid}`)
  redirect(`/dashboard/subscriptions/${subscriptionUuid}`)
}
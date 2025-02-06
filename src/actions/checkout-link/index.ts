'use server'
import {PlanCheckout} from "@salable/node-sdk/dist/src/types";
import {Result} from "../../fetch/licenses/check";
import {salable} from "../../app/salable";

export async function getCheckoutLink(
  planUuid: string,
  options: {
    email: string,
    member: string,
    granteeId: string,
    successUrl: string,
    cancelUrl: string,
  }): Promise<Result<PlanCheckout>> {
  try {
    const data = await salable.plans.getCheckoutLink(planUuid, {
      customerEmail: options.email,
      granteeId: options.granteeId,
      member: options.member,
      successUrl: options.successUrl,
      cancelUrl: options.cancelUrl,
    })
    return {
      data, error: null
    }
  } catch (e) {
    console.log(e)
    return {data: null, error: 'Failed to fetch checkout link'}
  }
}
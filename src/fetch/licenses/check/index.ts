'use server'
import { CheckLicensesCapabilitiesResponse } from "@salable/node-sdk/dist/src/types";
import {salable} from "../../../app/salable";
import {salableProductUuid} from "../../../app/constants";

export type Result<T> =
  | { data: T; error: null }
  | { data: null; error: string };

export async function licenseCheck(granteeIds: string[]): Promise<Result<CheckLicensesCapabilitiesResponse>> {
  try {
    const check = await salable.licenses.check({
      productUuid: salableProductUuid,
      granteeIds,
    })
    return {
      data: check,
      error: null
    }
  } catch (e) {
    console.log(e)
    return {
      data: null,
      error: 'Failed to check license'
    }
  }
}
if(!process.env.NEXT_PUBLIC_SALABLE_PRO_PLAN_UUID) throw new Error('Missing env SALABLE_PRO_PLAN_UUID')
if(!process.env.NEXT_PUBLIC_SALABLE_BASIC_PLAN_UUID) throw new Error('Missing env SALABLE_BASIC_PLAN_UUID')
if(!process.env.NEXT_PUBLIC_SALABLE_PRODUCT_UUID) throw new Error('Missing env SALABLE_PRODUCT_UUID')
if(!process.env.NEXT_PUBLIC_SALABLE_BOARD_PLAN_UUID) throw new Error('Missing env NEXT_PUBLIC_BOARD_BASE_URL')

export const salableBasicPlanUuid = process.env.NEXT_PUBLIC_SALABLE_BASIC_PLAN_UUID
export const salableProPlanUuid = process.env.NEXT_PUBLIC_SALABLE_PRO_PLAN_UUID
export const salableProductUuid = process.env.NEXT_PUBLIC_SALABLE_PRODUCT_UUID
export const salableBoardPlanUuid = process.env.NEXT_PUBLIC_SALABLE_BOARD_PLAN_UUID

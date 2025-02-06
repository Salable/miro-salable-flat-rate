'use client'
import {salableBasicPlanUuid, salableBoardPlanUuid, salableProPlanUuid} from "../app/constants";
import {ChangePlanButton} from "./change-plan-button";
import {CancelPlanButton} from "./cancel-plan-button";
import {FetchError} from "./fetch-error";
import React, {useEffect, useState} from "react";
import {getOneSubscription, SubscriptionExpandedPlanCurrency} from "../actions/subscriptions";
import {notFound} from "next/navigation";

export const SubscriptionView = ({uuid}: {uuid: string}) => {
  const [loading, setLoading] = useState(true)
  const [subscription, setSubscription] = useState<SubscriptionExpandedPlanCurrency | null>(null)
  const [subscriptionError, setSubscriptionError] = useState<string | null>(null)
  useEffect(() => {
    async function fetchData() {
      try {
        const boardInfo = await miro.board.getInfo()
        const data = await getOneSubscription(uuid, boardInfo.id)
        if (data.data) setSubscription(data.data)
        if (data.error) setSubscriptionError(data.error)
        setLoading(false)
      } catch (e) {
        setLoading(false)
        console.log(e)
      }
    }
    fetchData()
  }, []);
  if (loading) {
    return (
      <div>
        Loading...
      </div>
    )
  }
  if (subscriptionError) return <FetchError error={subscriptionError}/>
  if (!subscription) return notFound()
  return (
    <>
      <h1 className='text-3xl mb-6 flex items-center'>Subscription
        <span
          className={`px-2 ml-2 py-2 rounded-md leading-none ${subscription.status === 'CANCELED' ? 'bg-red-200 text-red-500' : 'bg-green-200 text-green-700'} uppercase text-lg font-bold`}
        >
          {subscription.status}
        </span>
      </h1>
      <div className='mb-3'>
        <div className='flex justify-between items-end mb-3'>
          <div>
            <div className='text-gray-500'>Plan</div>
            <div className='text-xl'>{subscription.plan.displayName}</div>
          </div>
        </div>
      </div>
      {subscription.status !== 'CANCELED' ? (
        <div>
          <div className='flex'>
            {subscription.planUuid !== salableBoardPlanUuid ? (
              <ChangePlanButton
                subscriptionUuid={uuid}
                planUuid={subscription.planUuid === salableProPlanUuid ? salableBasicPlanUuid : salableProPlanUuid}
                planName={subscription.planUuid === salableProPlanUuid ? 'Basic plan' : 'Pro plan'}
              />
            ) : null}
            <CancelPlanButton subscriptionUuid={uuid}/>
          </div>
        </div>
      ) : null}
    </>
  )
}
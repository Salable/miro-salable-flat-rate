'use client'
import {salableBasicPlanUuid, salableBoardPlanUuid, salableProPlanUuid} from "../app/constants";
import {ChangePlanButton} from "./change-plan-button";
import {CancelPlanButton} from "./cancel-plan-button";
import {FetchError} from "./fetch-error";
import React, {useEffect, useState} from "react";
import {getOneSubscription, SubscriptionExpandedPlanCurrency} from "../actions/subscriptions";
import {notFound} from "next/navigation";
import Link from "next/link";

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
  if (loading) return <Loading />
  if (subscriptionError) return <FetchError error={subscriptionError}/>
  if (!subscription) return notFound()
  return (
    <>
      <Link href='/dashboard/subscriptions' className='text-sm text-blue-700 hover:underline'>Back to subscriptions</Link>
      <h1 className='text-3xl mb-6 flex items-center'>
        Subscription
        <span className={`px-2 ml-2 py-2 rounded-md leading-none ${subscription.status === 'CANCELED' ? 'bg-red-200 text-red-500' : 'bg-green-200 text-green-700'} uppercase text-lg font-bold`}>
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

const Loading = () => {
  return (
    <div>
      <Link href='/dashboard/subscriptions' className='text-sm text-blue-700 hover:underline'>Back to subscriptions</Link>
      <div>
        <div className="flex items-center mb-6">
          <h1 className='text-3xl flex items-center'>
            Subscription
            <div className="ml-2 h-[34px] w-[95px] bg-slate-300 rounded-md animate-pulse"></div>
          </h1>
        </div>

        <div className='mb-3'>
          <div className='flex justify-between items-end'>
            <div>
              <div className='text-gray-500'>Plan</div>
              <div className="mr-2 h-[28px] bg-slate-300 rounded w-[100px]"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
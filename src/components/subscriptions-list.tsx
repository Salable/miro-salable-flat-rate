'use client'
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {UserInfoWithEmail} from "@mirohq/websdk-types/stable/api/board";
import {getAllSubscriptions, SubscriptionExpandedPlan} from "../actions/subscriptions";
import {FetchError} from "./fetch-error";

export const SubscriptionsList = () => {
  const [loading, setLoading] = useState(true)
  const [subscriptions, setSubscriptions] = useState<SubscriptionExpandedPlan[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await miro.board.getUserInfo() as UserInfoWithEmail
        const subscriptionData = await getAllSubscriptions(userData.email)
        if (subscriptionData.data?.data) setSubscriptions(subscriptionData.data.data)
        if (subscriptionData.error) setError(subscriptionData.error)
        setLoading(false)
      } catch (e) {
        setLoading(false)
        setError('Failed to fetch subscriptions')
        console.log(e)
      }
    }
    fetchData()
  }, []);
  if (loading) {
    return (
      <Loading />
    )
  }
  if (error) {
    return (
      <FetchError error={error} />
    )
  }
  return (
    <div>
      {subscriptions.length ? (
        <div>
          {subscriptions.map((subscription, index) => (
            <div className='bg-white mb-3 flex justify-between items-center shadow rounded-sm p-3'
                 key={`subscription-${index}`}>
              <div className='flex items-center'>
                <div className='text-lg mr-2 leading-none'>{subscription.plan.displayName}</div>
                {subscription.plan.licenseType === 'perSeat' ? <span
                  className='text-sm'>({subscription.quantity} seat{Number(subscription.quantity) > 1 ? "s" : ""})</span> : null}
              </div>
              <div>
                {subscription.status === 'CANCELED' ? (
                  <span className='bg-red-200 text-red-500 text-xs uppercase p-1 leading-none rounded-sm font-bold mr-2'>{subscription.status}</span>
                ) : null}
                <Link
                  className='text-blue-700 hover:underline'
                  href={`/dashboard/subscriptions/${subscription.uuid}`}
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      ): (
        <div>You currently have no subscriptions. To subscribe sign up to one of our paid plans on our <Link href={'/'}>pricing table</Link>.</div>
      )}
    </div>
  )
}
const Loading = () => {
  return (
    <div>
      Loading...
    </div>
  )
}
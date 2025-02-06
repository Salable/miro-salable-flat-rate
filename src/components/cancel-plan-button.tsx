'use client'
import React, {useState} from "react";
import {cancelSubscription} from "../actions/subscriptions";
import LoadingSpinner from "./loading-spinner";

export const CancelPlanButton = ({subscriptionUuid}: {subscriptionUuid: string}) => {
  const [isCancellingSubscription, setIsCancellingSubscription] = useState(false);

  const handleClick = async () => {
    setIsCancellingSubscription(true)
    const cancel = await cancelSubscription(subscriptionUuid)
    if (cancel?.error) {
      console.log(cancel.error)
    }
    setIsCancellingSubscription(false)
  }

  return (
    <button
      className={`p-4 rounded-md leading-none text-white bg-red-600 hover:bg-red-700 flex items-center justify-center transition font-light cursor-pointer`}
      onClick={handleClick}
      disabled={isCancellingSubscription}>
      {isCancellingSubscription ? (
        <div className='w-[14px] mr-2'><LoadingSpinner fill="white"/></div>) : ''}
      Cancel subscription
    </button>
  )
}
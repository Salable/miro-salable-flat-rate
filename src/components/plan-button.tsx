'use client'
import React, {useState} from "react";
import {getCheckoutLink} from "../actions/checkout-link";
import LoadingSpinner from "./loading-spinner";
import {UserInfoWithEmail} from "@mirohq/websdk-types/stable/api/board";
import {salableBoardPlanUuid} from "../app/constants";

export const PlanButton = ({
  planUuid
}: {
  planUuid: string,
}) => {
  const [isFetchingUrl, setIsFetchingUrl] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleClick = async () => {
    let url = null
    setError(null)
    try {
      setIsFetchingUrl(true)
      const board = await miro.board.getInfo()
      const user = await miro.board.getUserInfo() as UserInfoWithEmail
      const response = await getCheckoutLink(planUuid, {
        granteeId: planUuid === salableBoardPlanUuid ? board.id :user.id,
        member: user.id,
        email: user.email,
        successUrl: `https://miro.com/app/board/${board.id}`,
        cancelUrl: `https://miro.com/app/board/${board.id}`
      })
      if (response.error !== null) {
        setError(response.error)
        setIsFetchingUrl(false)
        return
      }
      url = response.data.checkoutUrl
      setIsFetchingUrl(false)
      window.open(url, '_blank')
    } catch (e) {
      setIsFetchingUrl(false)
      console.log(e)
    }
    if (!url) {
      console.error('Failed to create checkout link')
    }
  }

  return (
    <div>
      <button
        className={`p-4 rounded-md leading-none font-light text-sm transition flex items-center justify-center w-full border-solid border-2 border-blue-700 bg-blue-700 hover:bg-blue-900 text-white cursor-pointer`}
        onClick={handleClick}
      >
        {isFetchingUrl ? <div className='w-[14px] mr-2'><LoadingSpinner fill="white"/></div> : null}
        Purchase plan
      </button>
      {error ? (<div className='mt-1 text-red-600'>{error}</div>) : null}
    </div>
  )
}
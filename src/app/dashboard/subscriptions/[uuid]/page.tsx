import React from "react";
import {SubscriptionView} from "../../../../components/subscription-view";
import {InvoicesList} from "../../../../components/invoices-list";

export const metadata = {
  title: 'Subscription',
}

export default async function SubscriptionPage({ params }: { params: Promise<{ uuid: string }> }) {
  const { uuid } = await params
  return (
    <div className='text-sm bg-gray-100 p-6'>
      <SubscriptionView uuid={uuid} />
      <div className='mt-6'>
        <h2 className='text-2xl font-bold text-gray-900'>Invoices</h2>
        <div className='mt-3'>
          <InvoicesList uuid={uuid} />
        </div>
      </div>
    </div>
  )
}

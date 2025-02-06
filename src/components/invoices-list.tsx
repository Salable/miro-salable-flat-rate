'use client'
import {useEffect, useState} from "react";
import {getSubscriptionInvoices} from "../actions/subscriptions";
import {PaginatedSubscriptionInvoice} from "@salable/node-sdk/dist/src/types";
import {FetchError} from "./fetch-error";
import {format} from "date-fns";
import Link from "next/link";

export const InvoicesList = ({uuid}: {uuid: string}) => {
  const [invoices, setInvoices] = useState<PaginatedSubscriptionInvoice | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const board = await miro.board.getInfo()
        const data = await getSubscriptionInvoices(uuid, board.id)
        if (data.data) setInvoices(data.data)
        if (data.error) setError(data.error)
        setLoading(false)
      } catch (e) {
        setLoading(false)
        setError('Failed to fetch subscription invoices')
      }
    }
    fetchData()
  }, []);
  if (loading) return <div>Loading...</div>
  if (error) return <FetchError error={error} />
  return (
    <div>
      {invoices ? (
        <div className='rounded-sm bg-white'>
          {invoices?.data.sort((a, b) => a.created + b.created).map((invoice, index) => {
            return (
              <div className='border-b-2 p-3 flex justify-between items-center' key={`invoice-${index}`}>
                <div>
                  {invoice.effective_at ? (
                    <span>{format(new Date(invoice.effective_at * 1000), "d LLL yyy")}</span>
                  ) : null}
                  {invoice.automatically_finalizes_at ? (
                    <span>Finalises at {format(new Date(invoice.automatically_finalizes_at * 1000), 'd LLL yyy H:mm')}</span>
                  ) : null}
                </div>
                <div className='flex items-center'>
                  <span className='mr-2'>£{(invoice.lines.data[0].quantity * invoice.lines.data[0].price.unit_amount) / 100}</span>
                  {invoice.automatically_finalizes_at && invoice.lines.data[0].price.unit_amount ? (
                    <span className='p-1 leading-none uppercase rounded-sm bg-gray-200 text-gray-500 text-xs font-bold'>DRAFT</span>
                  ) : null}
                  {invoice.hosted_invoice_url ? (
                    <Link className='text-blue-700 hover:underline' href={invoice.hosted_invoice_url} target='_blank'>View</Link>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      ): null}
    </div>
  )
}
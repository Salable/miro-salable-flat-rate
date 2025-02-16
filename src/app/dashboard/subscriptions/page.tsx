import React from "react";
import {SubscriptionsList} from "../../../components/subscriptions-list";
import {NavBar, NavLink} from "../../../components/nav-bar";

export const metadata = {
  title: 'Subscriptions',
}

const modalLinks: NavLink[] = [
  {
    label: 'Plans',
    url: '/dashboard/pricing',
  },
  {
    label: 'Subscriptions',
    url: '/dashboard/subscriptions',
  }
]

export default async function SubscriptionPage() {
  return (
    <main>
      <NavBar links={modalLinks} currentLink='/dashboard/subscriptions' />
      <div className='bg-gray-100 p-6'>
        <h1 className='text-3xl mb-4'>Subscriptions</h1>
        <SubscriptionsList />
      </div>
    </main>
  );
}
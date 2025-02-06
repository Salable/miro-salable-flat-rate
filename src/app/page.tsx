'use server'
import React from 'react';
import initMiroAPI from '../utils/initMiroAPI';
import '../assets/style.css';
import {LoginButton} from "../components/login-button";
import Link from "next/link";
import {Shapes} from "../components/shapes";

const getAuthUrl = async () => {
  const {miro, userId} = initMiroAPI();
  // redirect to auth url if user has not authorized the app
  if (!userId || !(await miro.isAuthorized(userId))) {
    return miro.getAuthUrl();
  }
  return null
};

export default async function Page({searchParams}: {
  searchParams: Promise<Record<string, string>>
}) {
  const {userId} = initMiroAPI();
  const params = await searchParams
  const authUrl = await getAuthUrl();
  if (authUrl) {
    return (
      <div className='p-6 pt-0'>
        It is required to authorise this app before you are able to use it.
        <div className='mt-3'>
          <LoginButton authUrl={authUrl} />
        </div>
      </div>
    )
  }
  if (params.auth === 'redirect') {
    return (
      <div className='p-6 pt-0'>
        <h1>Successfully authorised app</h1>
        <Link className='button button-primary mt-3' href={`https://miro.com/app/dashboard`}>Get started!</Link>
      </div>
    )
  }
  return (
    <div className='p-6 pt-0'>
      <Shapes userId={userId} />
    </div>
  )
}

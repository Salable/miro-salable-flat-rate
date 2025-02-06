'use client'
import React from "react";

export const Footer = () => {
  // const authUrl = await getAuthUrl();
  return (
    <div className='flex justify-between items-center mt-auto p-6'>
      <div>
        <span className='text-xs'>Developed by Salable</span>
      </div>
      <div>
        <button
          className='cursor-pointer'
          onClick={async () => {
            await miro.board.ui.openModal({url: '/dashboard/pricing'});
            await miro.board.ui.closePanel();
          }}
        >
          <span className='block bg-contain icon-settings h-[20px] w-[20px]' />
        </button>
      </div>
    </div>
  )
}
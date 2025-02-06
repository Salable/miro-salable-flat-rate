'use client'
import {licenseCheck} from "../fetch/licenses/check";
import {useEffect, useState} from "react";
import {CheckLicensesCapabilitiesResponse} from "@salable/node-sdk/dist/src/types";
import {TriangleIcon} from "./icons/triangle";
import {Circle} from "./icons/circle";
import {BoardInfo} from "@mirohq/websdk-types/stable/api/board";

export const Shapes = ({userId}: {userId: string}) => {
  const [check, setCheck] = useState<CheckLicensesCapabilitiesResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [board, setBoard] = useState<BoardInfo | null>(null)
  const shapes = ['rectangle', 'triangle', 'circle'] as const
  useEffect(() => {
    async function fetchData() {
      try {
        const boardInfo = await miro.board.getInfo()
        setBoard(boardInfo)
        const data = await licenseCheck([userId, boardInfo.id])
        if (data.data) setCheck(data.data)
        setLoading(false)
      } catch (e) {
        console.log(3)
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

  return (
    <>
      {shapes.map((shape, i) => {
        const hasCapability = check?.capabilities.find((c) => c.capability === shape)
        return (
          <div className='flex items-center justify-between p-6 mb-3 rounded-md bg-blue-50' key={`shape-${i}`}>
            <div className='mr-6 w-[120px]'>
              <Shape shape={shape} disabled={!hasCapability}  />
            </div>
            <div className='flex flex-col justify-center'>
              <div>
                <button
                  className={'py-2 px-4 mb-2 rounded-sm leading-none font-light bg-white border-2 border-solid border-blue-500 text-blue-500 disabled:text-gray-500 disabled:border-gray-500 disabled:opacity-50 cursor-pointer disabled:cursor-auto'}
                  disabled={shape !== 'rectangle' && !hasCapability}
                  onClick={async () => {
                    if (!board) return
                    const check = await licenseCheck([userId, board.id])
                    if (shape === 'rectangle' || check.data?.capabilities.find((c) => c.capability === shape)) {
                      const createShape = await miro.board.createShape({
                        shape,
                        type: 'shape',
                        width: 50,
                        height: 50,
                      });
                      await miro.board.viewport.zoomTo(createShape);
                    }
                  }}
                >
                  Add shape
                </button>
              </div>
              {shape === 'triangle' && !hasCapability ? (
                <span className='text-xs text-center'>Included on <button onClick={async () => {
                    await miro.board.ui.openModal({url: '/dashboard/pricing'})
                    await miro.board.ui.closePanel();
                  }} className='text-blue-500 font-bold hover:underline cursor-pointer'>
                    Basic Plan
                  </button>
                </span>
              ) : null}
              {shape === 'circle' && !hasCapability ? (
                <span className='text-xs text-center'>
                  Included on <button onClick={async () => {
                    await miro.board.ui.openModal({url: '/dashboard/pricing'})
                    await miro.board.ui.closePanel();
                  }} className='text-blue-500 font-bold hover:underline cursor-pointer'>Pro Plan</button>
                </span>
              ) : null}
            </div>
          </div>
        );
      })}
      {!check?.capabilities.length ? (
        <div>
          <p>To start using shapes subscribe to our product and get started!</p>
          <button
            className='p-4 mt-3 rounded-md leading-none font-light transition flex items-center justify-center w-full bg-blue-700 hover:bg-blue-900 text-white cursor-pointer'
            onClick={async () => {
              await miro.board.ui.openModal({url: '/dashboard/pricing'})
            }}
          >
            Pricing
          </button>
        </div>
      ) : null}
    </>
  )
}

const Shape = ({shape, disabled}:{shape: string, disabled: boolean}) => {
  switch (shape) {
    case 'rectangle':
      return (
        <div className={'h-[120px] w-[120px] rounded-lg bg-amber-500'} />
      )
    case 'circle':
      return (
        <div className={disabled ? 'opacity-50' : ''}>
          <Circle fill={disabled ? 'fill-gray-500' : 'fill-purple-500'} />
        </div>
      )
    case 'triangle':
      return (
        <div className={disabled ? 'opacity-50' : ''}>
          <TriangleIcon fill={disabled ? 'fill-gray-500' : 'fill-cyan-300'} />
        </div>
      )
    default:
      return null
  }
}
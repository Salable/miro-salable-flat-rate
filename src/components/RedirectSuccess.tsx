'use client'

export const RedirectSuccess = () => (
  <div>
    <h1>Successfully authorised app!</h1>
    <button
      className='mt-4 button button-primary'
      onClick={async () => {await miro.board.ui.closeModal()}}
    >
      Close
    </button>
  </div>
)
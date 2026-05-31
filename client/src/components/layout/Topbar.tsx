import React from 'react'

const Topbar: React.FC = () => {
  return (
    <>
      <div className="w-full h-fit relative flex items-center justify-center bg-stone-900 text-stone-100 leading-none px-5 py-2 text-sm text-center ">
        <span>Shipping & 18% GST will be calculated at checkout.</span>
      </div>
    </>
  )
}

export default Topbar

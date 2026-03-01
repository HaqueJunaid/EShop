import React, { useEffect, useRef, useState } from 'react'

type MobileSearchPopupProps = {
  open: boolean
  onClose: () => void
}

const MobileSearchPopup: React.FC<MobileSearchPopupProps> = ({ open, onClose }) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (!open) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  useEffect(() => {
    if (!open) return
    const id = window.setTimeout(() => inputRef.current?.focus(), 0)
    return () => window.clearTimeout(id)
  }, [open])

  if (!open) return null

  return (
    <div className='lg:hidden fixed inset-0 z-50' onClick={onClose}>
      <div className='absolute inset-0 bg-black/40' />
      <div
        className='relative mx-auto mt-16 px-4 w-full max-w-md'
        onClick={(e) => e.stopPropagation()}
        role='dialog'
        aria-modal='true'
      >
        <div className='bg-white shadow-xl border border-stone-200'>
          <div className='flex justify-between items-center px-4 py-3 border-stone-200 border-b'>
            <span className='font-semibold text-stone-900 text-sm'>Search</span>
            <button className='text-stone-700' onClick={onClose} aria-label='Close search'>
              ✕
            </button>
          </div>

          <div className='p-4'>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type='text'
              placeholder='Search Product...'
              className='px-3 py-2 border border-stone-300 rounded-sm w-full h-10 text-stone-800 text-sm outline-none placeholder:text-stone-400 focus:border-stone-400'
            />

            <button
              className='bg-stone-800 hover:bg-stone-900 mt-3 px-4 py-2 rounded-sm w-full text-stone-50 text-sm transition-all duration-300 cursor-pointer'
              onClick={() => {
                onClose()
              }}
              type='button'
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileSearchPopup

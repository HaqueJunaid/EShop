import React from 'react'
import Heading from '../components/common/Heading'

const ContactUs: React.FC = () => {
  return (
    <div className='bg-stone-50 py-8 pb-14 w-full'>
      <div className='px-6'>
        <Heading title='Contact Us' />
      </div>

      <div className='mx-auto mt-10 px-6 w-full lg:w-2/3'>
        <div className='flex lg:flex-row flex-col gap-12'>
          <div className='flex-1'>
            <p className='text-md text-stone-800'>Have a question? You can contact us:</p>

            <div className='space-y-2 mt-6 text-md text-stone-700'>
              <p>
                <span className='font-semibold text-stone-900'>Email:</span>{' '}
                bishrish@gmail.com
              </p>
            </div>

            <div className='mt-8 text-md text-stone-700'>
              <p className='font-semibold text-stone-900'>Opening Hours:</p>
              <p className='mt-2'>Monday to Saturday 10:30 am - 6:30 pm</p>
              <p className='mt-1'>Sunday: Closed</p>
            </div>

            <div className='bg-white mt-10 border border-stone-200'>
              <iframe
                title='Srishbish Location'
                src='https://www.google.com/maps?q=Surat%2C%20Gujarat%2C%20India&z=12&output=embed'
                className='w-full h-64'
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
              />
            </div>
          </div>

          <div className='flex-2'>
            <h2 className='font-semibold text-stone-900 text-2xl'>Drop Us A Line</h2>
            <p className='mt-4 max-w-xl text-md text-stone-600 leading-relaxed'>
              We’re happy to answer any questions you have or provide you with an estimate. Just send us a message in the
              form below with any questions you may have.
            </p>

            <form
              className='space-y-5 mt-8'
              onSubmit={(e) => {
                e.preventDefault()
              }}
            >
              <div>
                <label className='block font-medium text-stone-700 text-xs tracking-wide'>
                  NAME (required)*
                </label>
                <input
                  required
                  type='text'
                  placeholder='Enter please your name'
                  className='mt-2 px-3 py-2 border border-stone-200 focus:border-stone-400 rounded-md outline-none w-full h-10 text-stone-700 text-sm'
                />
              </div>

              <div>
                <label className='block font-medium text-stone-700 text-xs tracking-wide'>
                  EMAIL (required)*
                </label>
                <input
                  required
                  type='email'
                  placeholder='Enter please your email address'
                  className='mt-2 px-3 py-2 border border-stone-200 focus:border-stone-400 rounded-md outline-none w-full h-10 text-stone-700 text-sm'
                />
              </div>

              <div>
                <label className='block font-medium text-stone-700 text-xs tracking-wide'>PHONE NUMBER</label>
                <input
                  type='tel'
                  placeholder='Enter please your phone number'
                  className='mt-2 px-3 py-2 border border-stone-200 focus:border-stone-400 rounded-md outline-none w-full h-10 text-stone-700 text-sm'
                />
              </div>

              <div>
                <label className='block font-medium text-stone-700 text-xs tracking-wide'>
                  YOUR MESSAGE (required)*
                </label>
                <textarea
                  required
                  placeholder='Enter please your message'
                  className='mt-2 px-3 py-2 border border-stone-200 focus:border-stone-400 rounded-md outline-none w-full min-h-40 text-stone-700 text-sm resize-none'
                />
              </div>

              <button
                type='submit'
                className='inline-flex items-center gap-2 bg-stone-800 hover:bg-stone-900 px-6 py-2.5 rounded-md text-white text-xs tracking-wide cursor-pointer'
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
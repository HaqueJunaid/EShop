import Heading from '../components/common/Heading'
import React from 'react'

const AboutUs: React.FC = () => {
    return (
        <div className='bg-stone-50 py-8 pb-14 w-full'>
            <div className='px-6'>
                <Heading title='About Us' />
                <p className='mx-auto mt-3 w-full lg:w-[90%] text-stone-700 text-center'>Srishbish is a small design studio with big dreams based out of Surat. Being a Brainchild of the lovely Miss Srishti Bhartia, we work to deliver best graphic and branding experiences to our clients and also help to translate emotions through visuals and stationery gifting for our wonderful customers all over the world. Our mini team composed of super humans, work hard and multitask their way through the chaotic yet aesthetically pleasing routines to conquer one project at a time.</p>
                <section className="flex md:flex-row flex-col justify-center items-center gap-10 mt-24 max-md:px-4">
                    <div className="relative rounded-2xl overflow-hidden shrink-0">
                        <img className="rounded-2xl w-full max-w-md object-cover"
                            src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?q=80&w=830&h=844&auto=format&fit=crop"
                            alt="" />
                    </div>
                    <div className="max-w-lg text-stone-600 text-sm">
                        <p className="text-lg">In a graphic studio, what job profile do you assign someone who has advanced life experience, a little less than intermediary, almost non existent software experience but pro level hand skills? Odd candidate you think? Well we disagree because our Nani Intern is a rock star, she's 100% high on life, 150% high on art and craft skills and occasionally, more secretly a little high on gulab jamun.</p>
                        <strong className='inline-block mt-8 font-semibold text-stone-900 text-lg'>Defining old age as simply bold age, she is 70 years yound with a passion of a 18 year old.</strong>

                        <a href="#" className="flex items-center gap-2 bg-[#FCB435] mt-8 px-8 py-3 rounded-full w-max text-white transition hover:-translate-y-0.5">
                            <span>Read more</span>
                            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12.53 6.53a.75.75 0 0 0 0-1.06L7.757.697a.75.75 0 1 0-1.06 1.06L10.939 6l-4.242 4.243a.75.75 0 0 0 1.06 1.06zM0 6v.75h12v-1.5H0z"
                                    fill="#fff" />
                            </svg>
                        </a>
                    </div>
                </section>
                <section className="flex md:flex-row flex-col-reverse flex-reverse justify-center items-center gap-10 mt-24">
                    <div className="max-w-lg text-stone-600 text-sm">
                        <p className="text-lg">They said to me "Aaj mere pass Mac Book Pros hai, iPad Pro hai, 100k followers hai, blue tick hai, 7million views hai, kyaa hai tumhare paas?"</p>
                        <strong className='inline-block mt-8 font-semibold text-stone-900 text-lg'>Mere paas Srishbish mom hai!!</strong>

                        <a href="#" className="flex items-center gap-2 bg-[#FCB435] mt-8 px-8 py-3 rounded-full w-max text-white transition hover:-translate-y-0.5">
                            <span>Read more</span>
                            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12.53 6.53a.75.75 0 0 0 0-1.06L7.757.697a.75.75 0 1 0-1.06 1.06L10.939 6l-4.242 4.243a.75.75 0 0 0 1.06 1.06zM0 6v.75h12v-1.5H0z"
                                    fill="#fff" />
                            </svg>
                        </a>
                    </div>
                    <div className="relative rounded-2xl overflow-hidden shrink-0">
                        <img className="rounded-2xl w-full max-w-md object-cover"
                            src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?q=80&w=830&h=844&auto=format&fit=crop"
                            alt="" />
                    </div>
                </section>
            </div>
        </div>
    )
}

export default AboutUs
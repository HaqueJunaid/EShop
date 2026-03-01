import React from 'react'

const FaqDropDown: React.FC<{faqs: {question: string, answer: string}[], title: string}> = ({faqs, title}) => {
    const [openIndex, setOpenIndex] = React.useState<number | null>(null);

    return (
        <>
            <div className="flex flex-col justify-center items-center mx-auto mt-16 px-4 md:px-0 py-5 max-w-2xl">
                <h2 className="mb-4 font-semibold text-stone-900 text-2xl">{title}</h2>
                {faqs.map((faq, index) => (
                    <div className="py-4 border-stone-200 border-b w-full cursor-pointer" key={index} onClick={() => setOpenIndex(openIndex === index ? null : index)}>
                        <div className="flex justify-between items-center">
                            <h3 className="font-medium text-stone-800 text-base">
                                {faq.question}
                            </h3>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${openIndex === index ? "rotate-180" : ""} transition-all duration-500 ease-in-out`}>
                                <path d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2" stroke="#1D293D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <p className={`text-sm text-stone-500 transition-all duration-500 ease-in-out w-full ${openIndex === index ? "opacity-100 max-h-[300px] translate-y-0 pt-4" : "opacity-0 max-h-0 -translate-y-2"}`} >
                            {faq.answer}
                        </p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default FaqDropDown
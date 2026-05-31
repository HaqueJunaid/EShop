import React from 'react'
import Heading from '../components/common/Heading'
import { RefreshCcw, CreditCard } from 'lucide-react'
import FaqDropDown from '../components/common/FaqDropDown'

const Faqs: React.FC = () => {
    const faqs1 = [
        {
            question: "Is my Order Confirmed?",
            answer: "Once you have placed your order, you should receive an email confirmation with your Order Id.",
        },
        {
            question: "When will you Ship My Order?",
            answer: "We normally ship all orders within 15 business days, but there might be a slight delay in shipment depending upon your order customization or in the case of some unavoidable circumstances. Final delivery time will vary based on your location.",
        },
        {
            question: "When will my order get Delivered?",
            answer: "It usually takes 15-20 business days for your order to get delivered. But the delivery time may vary depending on your order customization and location.",
        },
        {
            question: "How much do you Charge for Delivery?",
            answer: "Delivery charges depend on the weight of your parcel and will be calculated at the checkout page.",
        },
        {
            question: "How can I Track my Order?",
            answer: "An Email containing your Tracking Id and details of the service provider is sent to you after the order is shipped. If you can't find the tracking information in your email, or if you have any other questions related to tracking, reach out to us on bishrish@gmail.com or contact us on +91 77668 88626. They will be glad to assist you and provide the necessary information.",
        },
        {
            question: "What if I have not received some part of my order?",
            answer: "If some part of your order is missing, it's possible that it could have been sent in more than one parcel, due to the large size of your order. In this case, you will receive one dispatch email per parcel. If you have only received one dispatch email and haven't received all of your items, please contact us within 7 days.",
        },
        {
            question: "Can I Update My Order?",
            answer: "Kindly note that we work hard to get your order dispatched as quickly as possible, we may not be able to update your order in time. If your order has not been shipped, please reach out to us at bishrish@gmail.com or contact us on +91 77668 88626 with your details. Kindly note that we cannot guarantee that the change will be made as the order may have been already processed.",
        },
        {
            question: "Can I have my order Gift-Wrapped?",
            answer: "Gift wrap option is available for all products. An additional amount of ₹75 will be charged.",
        },
        {
            question: "I have received a Damaged Product, what should I do?",
            answer: "In case you receive a damaged product, please capture an unboxing video for evidence and reach out to us on bishrish@gmail.com and we will resolve the issue ASAP.",
        },
    ];

    const faqs2 = [
        {
            question: "What is your Return Policy?",
            answer: "You can return certain products upto 5 days from the date of delivery. You can send a request to bishrish@gmail.com or call our number +91 77668 88626. The returned product should be in its original packaging and in the same unused condition as received.",
        },
        {
            question: "What items can I Return?",
            answer: "You can only return items that are damaged/defective. You will need to inform us of any damages/defects within 24 hours of delivery of the product, in order to receive the replacement.",
        },
        {
            question: "Do you arrange for Reverse Pickups?",
            answer: "Reverse pickup is not available on any items, you will have to ship the item back to our address.",
        },
        {
            question: "Where do I Ship the Returns?",
            answer: "Please mail the item(s) to the address below. Do remember to mention your Order ID and Contact Number. Srishti Bhartia. 414-15, A, Villa, New City light, Althan, Surat, Gujarat, India, Contact Number - +91 77668 88626.",
        },
        {
            question: "What if the parcel gets returned back by the shipping company?",
            answer: "In any circumstance if your parcel gets returned back to us by the company, lets say because the customer's phone was not reachable, you'll have to pay the shipping amount again for us to reship it to you.",
        },
        {
            question: "When will I receive my Replacement?",
            answer: "Replacement will be shipped after the original item has been received, subject to the following conditions: 1.The item(s) should be unused, unsoiled and unwashed. 2.The package should have the original packaging. They should be returned within 7 days from the dispatch date. Any returned item received by us that does not meet the above mentioned conditions will not be accepted. No amount will be reimbursed in this case.",
        },
        {
            question: "Can I choose a Different Item in Exchange?",
            answer: "You can only exchange your item if it is damaged/defective within 5 days and receive a replacement of that exact product or another product of the same value. If the value of the replacement product exceeds that of the previously purchased product, the difference will have to be paid in advance.",
        },
        {
            question: "What is your Refund Policy?",
            answer: "We do not refund money even if the item(s) is damaged/defective. We only exchange the product.",
        },
        {
            question: "Do you have Discounts/ Sales?",
            answer: "Yes we do. Subscribe to our newsletter for all the perks!",
        },
    ];

    return (
        <div className='bg-stone-50 py-8 pb-14 w-full'>
            <div className='px-6'>
            <Heading title='Frequently Asked Questions (FAQs)' />
            </div>
            <div className='bg-stone-50 mt-8 border-stone-200 border-y'>
                <div className='flex md:flex-row flex-col md:justify-between md:items-center gap-4 md:gap-10 mx-auto py-4 w-full max-w-6xl text-stone-700 text-xs px-4 md:px-20'>
                    <div className='flex items-start gap-3'>
                        <span className='inline-flex justify-center items-center mt-0.5 text-stone-700'>
                            <RefreshCcw size={16} />
                        </span>
                        <p>
                            <span className='font-semibold text-stone-900'>Returns &amp; Refunds.</span>{' '}
                            You can return certain products, up to 5 days from the date of delivery by sending a request to srishbish@gmail.com or call our number +91 7766888626.
                        </p>
                    </div>

                    <div className='hidden md:block bg-stone-200 w-px h-8' />

                    <div className='flex items-start gap-3'>
                        <span className='inline-flex justify-center items-center mt-0.5 text-stone-700'>
                            <CreditCard size={16} />
                        </span>
                        <p>
                            <span className='font-semibold text-stone-900'>Payment Methods.</span>{' '}
                            We accept UPI payments, as well as all major credit and debit cards.
                        </p>
                    </div>
                </div>
            </div>
            <div className='px-6'>
                <FaqDropDown faqs={faqs1} title="Shipping & Orders" />
                <FaqDropDown faqs={faqs2} title="Returns & Exchange" />
            </div>
        </div>
    )
}

export default Faqs
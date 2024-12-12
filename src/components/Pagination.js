import React, { useEffect, useState } from 'react'

export default function Pagination(props) {
    const totalEntries = props.totalEntries;
    const currentPage = props.currentPage;
    const start = (6 * (currentPage - 1)) + 1;
    const end = Math.min(6 * currentPage, totalEntries)
    const [nextDisable, setNextDisable] = useState(false);
    const [prevDisable, setPrevDisable] = useState(false);

    const handleNext = () => {
        props.setStartingPage(props.startingPage + 1)
    }

    const handlePrev = () => {
        props.setStartingPage(props.startingPage - 1)
    }

    useEffect(() => {
        if (currentPage === 1) {
            setPrevDisable(true)
        } else {
            setPrevDisable(false)
        }
        if (currentPage === Math.ceil(totalEntries / 6)) {
            setNextDisable(true)
        } else {
            setNextDisable(false)
        }
    }, [currentPage, totalEntries]);


    return (
        <div className='flex justify-center mt-4 mb-6 '>



            <div class="flex flex-col items-center">

                <span class="text-sm text-gray-700 ">
                    Showing <span class="font-semibold text-gray-900">{start}</span> to <span class="font-semibold text-gray-900">{end}</span> of <span class="font-semibold text-gray-900">{totalEntries}</span> Entries
                </span>
                <div class="inline-flex mt-2 xs:mt-0">

                    <button disabled={prevDisable} onClick={handlePrev} class={`flex items-center justify-center px-3 h-8 text-sm font-medium text-white ${prevDisable ? 'bg-gray-300' : 'bg-gray-800'} border-0 border-s border-gray-700 rounded-s ${!prevDisable ? 'hover:bg-gray-900' : ''} `}>
                        <svg class="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                        </svg>
                        Prev
                    </button>
                    <button disabled={nextDisable} onClick={handleNext} class={`flex items-center justify-center px-3 h-8 text-sm font-medium text-white ${nextDisable ? 'bg-gray-300' : 'bg-gray-800'} border-0 border-s border-gray-700 rounded-e ${!nextDisable ? 'hover:bg-gray-900' : ''} `}>
                        Next
                        <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </button>
                </div>
            </div>



        </div>
    )
}

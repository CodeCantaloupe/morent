
const BookingForm = () => {
    return (
        <div className="flex min-w-[100vw] justify-center items-center bg-gray-100">
            <div className="flex flex-col sm:flex-row w-full mx-5 ">
                {/* Pick-Up Section */}
                <div className="flex flex-col w-1/2 bg-white rounded-lg p-6">
                    <label className="font-semibold mb-1">
                        <input type="radio" className='shadow-blue-400 shadow-sm' defaultChecked />
                        <span className="ml-2">Pick-Up</span>
                    </label>
                    <div className="grid grid-cols-3 mb-4 divide-x">
                        <div className='px-3'>
                            <label className="block mb-1">Locations</label>
                            <select className="text-slate-500 bg-white rounded-md p-2 w-full">
                                <option>City</option>
                            </select>
                        </div>
                        <div className='px-3'>
                            <label className="block mb-1">Date</label>
                            <input type="date" className="text-slate-500 rounded-md p-2 w-full focus:outline-none"/>
                        </div>
                        <div className='px-3'>
                            <label className="block mb-1">Time</label>
                            <select className="bg-white text-slate-500 rounded-md p-2 w-full">
                                <option>Time</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Swap Icon */}
                <button className="bg-primaryBlue-500 hover:bg-primaryBlue-600 active:bg-primaryBlue-700 text-white rounded-xl size-16 mx-4 flex items-center justify-center my-auto">
                    <img src="/icons/Swap.svg" alt="swap icon"/>
                </button>

                {/* Drop-Off Section */}
                <div className="flex flex-col w-1/2 bg-white rounded-lg p-6">
                    <label className="font-semibold mb-1">
                        <input type="radio" className='shadow-blue-400 shadow-sm' defaultChecked />
                        <span className="ml-2">Drop-Off</span>
                    </label>
                    <div className="grid grid-cols-3 mb-4 divide-x">
                        <div className='px-3'>
                            <label className="block mb-1">Locations</label>
                            <select className="text-slate-500 bg-white rounded-md p-2 w-full">
                                <option>City</option>
                            </select>
                        </div>
                        <div className='px-3'>
                            <label className="block mb-1">Date</label>
                            <input type="date" className="text-slate-500 rounded-md p-2 w-full focus:outline-none"
                            />
                        </div>
                        <div className='px-3'>
                            <label className="block mb-1">Time</label>
                            <select className="bg-white text-slate-500 rounded-md p-2 w-full">
                                <option>Time</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingForm;

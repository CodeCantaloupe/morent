import './Hero.css';

const Hero = () => {
  return (
    <div className="flex w-screen justify-between sm:justify-center gap-6 items-center text-white m-6">
        <div className="flex bg-center relative p-6 md:mx-auto xs:mr-12 rounded-lg h-72 bg-no-repeat bg-cover flex-1" id="ad-1">
            <div className='font-plus-jakarta-sans space-y-3'>
                <h1 className='font-semibold overflow-hidden'>The Best Platform <br/> for Car Rental</h1>
                <p className='w-1/2'>Ease of doing a car rental safely and reliably.
                     Of course at a low price
                </p>
                <button className='text-center py-2 px-4 font-semibold bg-primaryBlue-500 hover:bg-primaryBlue-600 active:bg-primaryBlue-700 transition rounded'>
                    <a href='#popularCars'>Rental Car</a>
                </button>
            </div>
            <img className='absolute bottom-5 right-5 w-1/2' src="/cars/Car1.png" alt="" />
        </div>

        <div className="hidden md:flex bg-center flex-grow relative p-6 mr-12 rounded-lg h-72 bg-no-repeat bg-cover flex-1" id="ad-2">
            <div className='font-plus-jakarta-sans space-y-3'>
                <h1 className='font-semibold overflow-hidden'>Easy Way to Rent a <br/> Car at a Low Price</h1>
                <p className='w-1/2'>
                    Providing cheap car rental services
                    and safe and comfortable facilities.
                </p>
                <button className='text-center py-2 px-4 font-semibold bg-primaryBlue-400 hover:bg-sky-300 active:bg-sky-500 transition rounded'>
                    <a href='#popularCars'>Rental Car</a>
                </button>
            </div>
            <img className='absolute bottom-5 right-5 w-1/2' src="/cars/Car2.png" alt="" />
        </div>
    </div>
  )
}

export default Hero
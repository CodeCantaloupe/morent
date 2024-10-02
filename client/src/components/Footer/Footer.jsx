import {Link} from 'react-router-dom'
const Footer = () => {
  return (
    <footer className="bg-white font-plus-jakarta-sans">
        {/*Top Footer*/}
        <div className=" p-20 flex justify-between">  
            <div className="space-y-4">        
                <Link to={"/"} className="text-3xl font-bold text-primaryBlue-500">MORENT</Link>
                <p className="text-slate-500 text-lg">Our vision is to provide convenience <br/> and help increase your sales business.</p>
            </div>
            <div className="flex space-x-24">
                <div className="flex flex-col gap-5">
                    <h4 className="text-xl font-semibold mb-8">About</h4>
                    <a className="text-slate-500 hover:text-slate-400 hover:font-semibold">How it works</a>
                    <a className="text-slate-500 hover:text-slate-400 hover:font-semibold">Featured</a>
                    <a className="text-slate-500 hover:text-slate-400 hover:font-semibold">Partnership</a>
                    <a className="text-slate-500 hover:text-slate-400 hover:font-semibold">Business Relation</a>
                </div>
                <div className="flex flex-col gap-5">
                    <h4 className="text-xl font-semibold mb-8">Community</h4>
                    <a className="text-slate-500 hover:text-slate-400 hover:font-semibold">Events</a>
                    <a className="text-slate-500 hover:text-slate-400 hover:font-semibold">Blog</a>
                    <a className="text-slate-500 hover:text-slate-400 hover:font-semibold">Podcast</a>
                    <a className="text-slate-500 hover:text-slate-400 hover:font-semibold">Invite a friend</a>
                </div>
                <div className="flex flex-col gap-5">
                    <h4 className="text-xl font-semibold mb-8">Socials</h4>
                    <a className="text-slate-500 hover:text-slate-400 hover:font-semibold">Discord</a>
                    <a className="text-slate-500 hover:text-slate-400 hover:font-semibold">Instagram</a>
                    <a className="text-slate-500 hover:text-slate-400 hover:font-semibold">Twitter (X)</a>
                    <a className="text-slate-500 hover:text-slate-400 hover:font-semibold">Facebook</a>
                </div>
            </div>
        </div>

        <hr className="my-4 mx-6"/>
        
        <div className="p-12 font-bold text-xl flex items-center justify-between">
            <p className="">© 2022 MORENT. All rights reserved</p>
            <div className="space-x-6 flex">
                <a>Privacy Policy</a>
                <a>Terms & Conditions</a>
            </div>
        </div>
    </footer>
  )
}

export default Footer
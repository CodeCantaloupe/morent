import { Link, Outlet } from 'react-router-dom'
import { Slide, ToastContainer } from 'react-toastify'

const Dashboard = () => {
  return (
    <div className="flex m-6 gap-4">
      <nav className="h-[90vh] min-w-[200px] border rounded-lg shadow-xl flex flex-col font-plus-jakarta-sans p-2">
        <div className="text-xl font-bold py-4 text-center">Dashboard</div>
        <hr className='mx-4 py-2'/>
        <Link to={"/dashboard/users"} className='p-4 hover:font-semibold hover:bg-blue-600 hover:text-white rounded-lg'>👤 Users</Link>
        <Link to={"/dashboard/cars"}  className='p-4 hover:font-semibold hover:bg-blue-600 hover:text-white rounded-lg'>🚘 Cars</Link>
        <Link to={"/dashboard/cars"}  className='p-4 hover:font-semibold hover:bg-blue-600 hover:text-white rounded-lg'>📈 Analytics</Link>
        <Link to={"/dashboard/cars"}  className='p-4 hover:font-semibold hover:bg-blue-600 hover:text-white rounded-lg'>📄 Reports</Link>
        <Link to={"/dashboard/cars"}  className='p-4 hover:font-semibold hover:bg-blue-600 hover:text-white rounded-lg'>🔒 Security</Link>
      </nav>
      <div className="h-screen flex-grow bg-white border rounded-lg shadow-xl">
        <Outlet />
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        transition={Slide}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </div>
  )
}

export default Dashboard
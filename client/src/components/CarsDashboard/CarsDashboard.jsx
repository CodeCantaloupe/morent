import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
const CarsDashboard = () => {
    const [cars, setCars] = useState([])
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [updateTrigger, setUpdateTrigger] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);
    const [updatedCar, setUpdatedCar] = useState({
        carName: '',
        carPrice: '',
        carImage: '',
        carType: '',
        carSeats: '',
        carFuelCapacity: '',
        carDriveType: '',
    })

    const [newCar, setNewCar] = useState({
        carName: '',
        carPrice: '',
        carImage: '',
        carType: '',
        carSeats: '',
        carFuelCapacity: '',
        carDriveType: 'manual',
    })

    const openDeleteModal = (selectedCar) => {
        setSelectedCar(selectedCar);
        setDeleteModalOpen(true);
    };
    const openAddModal = () => {
        setAddModalOpen(true);
    };

    const openEditModal = (selectedCar) => {
        setSelectedCar(selectedCar);
        setEditModalOpen(true);
    }

    const closeDeleteModal = (selectedCar) => {
        setDeleteModalOpen(false);

        if (selectedCar) {
            axios.delete(`http://localhost:5000/api/cars/${selectedCar._id}`)
                .then((res) => {
                    console.log(res.data)
                    if (res.status === 200) {
                        toast.success(res.data.message)
                        setUpdateTrigger(!updateTrigger)
                    }
                })
                .catch((err) => {
                    console.log(err)
                    toast.error(err.response.data.message)
                });
        }

        setSelectedCar(null);
    };

    const closeEditModal = (selectedCar) => {
        setEditModalOpen(false);

        if (selectedCar) {
            console.log(selectedCar);

            axios.patch(`http://localhost:5000/api/cars/${selectedCar._id}`, updatedCar)
                .then((res) => {
                    if (res.status === 200) {
                        toast.success(res.data.message)
                        setUpdateTrigger(!updateTrigger)
                    }
                })
                .catch((err) => {
                    toast.error(err.response.data.message)
                });
        }
        setSelectedCar(null);
    }

    const closeAddModal = (newCar) => {
        setAddModalOpen(false);

        if (newCar) {
            console.log(newCar);

            axios.post(`http://localhost:5000/api/cars`, newCar)
                .then((res) => {
                    if (res.status === 201) {
                        console.log(res)
                        toast.success(res.data.message)
                        setUpdateTrigger(!updateTrigger)
                    }
                })
                .catch((err) => {
                    console.log(err);
                    (err.response.data.message.errors).forEach(error => {
                        toast.error(error.msg)
                    });
                });
        }
    }

    useEffect(() => {
        axios.get('http://localhost:5000/api/cars')
            .then(res => {
                console.log(res.data.object)
                setCars(res.data.object)
            })
            .catch(err => console.log(err))

        if (selectedCar) {
            setUpdatedCar({
                carName: selectedCar.carName || '',
                carPrice: selectedCar.carPrice || '',
                carImage: selectedCar.carImage || '',
                carType: selectedCar.carType || '',
                carSeats: selectedCar.carSeats || '',
                carFuelCapacity: selectedCar.carFuelCapacity || '',
                carDriveType: selectedCar.carDriveType || '',
            })
        }
    }, [updateTrigger, selectedCar])

    return (
        <div className='relative '>
            <button onClick={openAddModal} className='absolute top-2 right-2 bg-blue-500 hover:bg-blue-600 p-2 rounded-full'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12H18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 18V6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            <div className='grid grid-cols-3 gap-3 font-plus-jakarta-sans p-5'>
                {cars.map((car, index) => (
                    <div className='group flex flex-col p-5 border shadow rounded-lg' key={index}>
                        <div className='mx-auto'>
                            <img className='max-w-full h-16 block object-contain' src={"/cars/" + car.carImage} alt="Car" />
                        </div>
                        <hr className='m-5 border-slate-500'></hr>
                        <div className='grid grid-cols-2 items-center space-y-2 text-nowrap'>
                            <label className=''>Car Name:</label>
                            <p>{car.carName}</p>
                            <label className=''>Car Type:</label>
                            <p>{car.carType}</p>
                            <label className=''>Car Price:</label>
                            <p className='font-semibold'>${car.carPrice}/
                                <span className='font-normal text-slate-500'>day</span>
                            </p>
                            <label className=''>Car Seats:</label>
                            <p>{car.carSeats} People</p>
                            <label className=''>Fuel Capacity:</label>
                            <p>{car.carFuelCapacity}L</p>
                            <label className=''>Transmission:</label>
                            <p className='capitalize'>{car.carDriveType}</p>
                        </div>
                        <hr className='m-5 border-slate-500' />
                        <div className="group-hover:visible group-hover:flex invisible flex-grow justify-center items-center space-x-4">
                            <button onClick={() => { openDeleteModal(car) }} className="border p-2 rounded-full hover:bg-slate-50">
                                <img src="/icons/trashcan.svg" alt="Delete User" />
                            </button>
                            <button onClick={() => { openEditModal(car) }} className="border p-2 rounded-full hover:bg-slate-50">
                                <img src="/icons/userSettings.svg" alt="User Settings" />
                            </button>
                        </div>
                    </div>
                ))}

                {isDeleteModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
                            <h2 className="text-xl font-bold mb-4">Are You Sure?</h2>
                            <p>You are about to delete {selectedCar?.carName}</p>
                            <button
                                className="bg-red-500 text-white px-4 py-2 mt-4 rounded hover:bg-red-700"
                                onClick={() => {
                                    closeDeleteModal(selectedCar);
                                }}>
                                Delete Car
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 mt-4 ml-4 rounded hover:bg-blue-700"
                                onClick={() => closeDeleteModal(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {isEditModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
                            <h2 className="text-xl font-bold mb-4">Update User Info</h2>
                            <div className='grid grid-cols-3 items-center space-y-4 my-6'>
                                <label className="font-semibold">Car Name: </label>
                                <input
                                    value={updatedCar?.carName}
                                    onChange={(e) => setUpdatedCar({ ...updatedCar, carName: e.target.value })}
                                    type="text"
                                    id="username"
                                    name="username"
                                    className="border p-2 mr-2 col-span-2 border-black focus:outline-blue-500 rounded" />
                                <label className="font-semibold">Car Type: </label>
                                <input
                                    value={updatedCar?.carType}
                                    onChange={(e) => setUpdatedCar({ ...updatedCar, carType: e.target.value })}
                                    type="text"
                                    id="username"
                                    name="username"
                                    className="border p-2 mr-2 col-span-2 border-black focus:outline-blue-500 rounded" />
                                <label className="font-semibold">Car Price: </label>
                                <input
                                    value={updatedCar?.carPrice}
                                    onChange={(e) => setUpdatedCar({ ...updatedCar, carPrice: e.target.value })}
                                    type="text"
                                    id="username"
                                    name="username"
                                    className="border p-2 mr-2 col-span-2 border-black focus:outline-blue-500 rounded" />
                                <label className="font-semibold">No. of Seats: </label>
                                <input
                                    value={updatedCar?.carSeats}
                                    onChange={(e) => setUpdatedCar({ ...updatedCar, carSeats: e.target.value })}
                                    type="text"
                                    id="username"
                                    name="username"
                                    className="border p-2 mr-2 col-span-2 border-black focus:outline-blue-500 rounded" />
                                <label className="font-semibold">Fuel Capacity: </label>
                                <input
                                    value={updatedCar?.carType}
                                    onChange={(e) => setUpdatedCar({ ...updatedCar, carFuelCapacity: e.target.value })}
                                    type="text"
                                    id="username"
                                    name="username"
                                    className="border p-2 mr-2 col-span-2 border-black focus:outline-blue-500 rounded" />
                                <label className="font-semibold">Transmission Type: </label>
                                <select
                                    value={updatedCar?.carDriveType}
                                    onChange={(e) => setUpdatedCar({ ...updatedCar, carDriveType: e.target.value })}
                                    type="text"
                                    id="username"
                                    name="username"
                                    className="border p-2 mr-2 col-span-2 border-black focus:outline-blue-500 rounded">
                                    <option value="manual">Manual</option>
                                    <option value="automatic">Automatic</option>
                                </select>
                            </div>
                            <button
                                className="bg-green-500 text-white px-4 py-2 mt-4 rounded hover:bg-gren-700"
                                onClick={() => {
                                    closeEditModal(selectedCar);
                                }}>
                                Update Info
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 mt-4 ml-4 rounded hover:bg-blue-700"
                                onClick={() => closeEditModal(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {isAddModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
                            <h2 className="text-xl font-bold mb-4">Add New Car</h2>
                            <div className='grid grid-cols-3 items-center space-y-4 my-6'>
                                <label className="font-semibold">Car Name: </label>
                                <input
                                    onChange={(e) => setNewCar({ ...newCar, carName: e.target.value })}
                                    type="text"
                                    id="username"
                                    name="username"
                                    className="border p-2 mr-2 col-span-2 border-black focus:outline-blue-500 rounded" />
                                    
                                <label className="font-semibold">Car Image: </label>
                                <input
                                    onChange={(e) => setNewCar({ ...newCar, carImage: e.target.value })}
                                    type="text"
                                    id="username"
                                    name="username"
                                    className="border p-2 mr-2 col-span-2 border-black focus:outline-blue-500 rounded" />
                                <label className="font-semibold">Car Type: </label>
                                <input
                                    onChange={(e) => setNewCar({ ...newCar, carType: e.target.value })}
                                    type="text"
                                    id="username"
                                    name="username"
                                    className="border p-2 mr-2 col-span-2 border-black focus:outline-blue-500 rounded" />
                                <label className="font-semibold">Car Price: </label>
                                <input
                                    onChange={(e) => setNewCar({ ...newCar, carPrice: e.target.value })}
                                    type="text"
                                    id="username"
                                    name="username"
                                    className="border p-2 mr-2 col-span-2 border-black focus:outline-blue-500 rounded" />
                                <label className="font-semibold">No. of Seats: </label>
                                <input
                                    onChange={(e) => setNewCar({ ...newCar, carSeats: e.target.value })}
                                    type="text"
                                    id="username"
                                    name="username"
                                    className="border p-2 mr-2 col-span-2 border-black focus:outline-blue-500 rounded" />
                                <label className="font-semibold">Fuel Capacity: </label>
                                <input
                                    onChange={(e) => setNewCar({ ...newCar, carFuelCapacity: e.target.value })}
                                    type="text"
                                    id="username"
                                    name="username"
                                    className="border p-2 mr-2 col-span-2 border-black focus:outline-blue-500 rounded" />
                                <label className="font-semibold">Transmission Type: </label>
                                <select
                                    value={newCar?.carDriveType}
                                    onChange={(e) => setNewCar({ ...newCar, carDriveType: e.target.value })}
                                    type="text"
                                    id="username"
                                    name="username"
                                    className="border p-2 mr-2 col-span-2 border-black focus:outline-blue-500 rounded">
                                    <option value="manual">Manual</option>
                                    <option value="automatic">Automatic</option>
                                </select>
                            </div>
                            <button
                                className="bg-green-500 text-white px-4 py-2 mt-4 rounded hover:bg-gren-700"
                                onClick={() => {
                                    closeAddModal(newCar);
                                }}>
                                Add Car
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 mt-4 ml-4 rounded hover:bg-blue-700"
                                onClick={() => closeAddModal(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CarsDashboard
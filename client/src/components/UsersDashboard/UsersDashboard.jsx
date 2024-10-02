import { useEffect, useState } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import axios from 'axios';
import { toast } from 'react-toastify';

const UsersDashboard = () => {
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [updateTrigger, setUpdateTrigger] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [updatedUser, setUpdatedUser] = useState({
        userFirstName: '',
        userLastName: '',
        userName: '',
        userEmail: '',
        userPassword: '',
        userProfile: '',
    })

    useEffect(() => {
        axios.get('http://localhost:5000/api/users').then((res) => {
            setUsers(res.data.object);
        });

        if (selectedUser) {
            setUpdatedUser({
                userFirstName: selectedUser.userFirstName || '',
                userLastName: selectedUser.userLastName || '',
                userName: selectedUser.userName || '',
                userEmail: selectedUser.userEmail || '',
                userPassword: selectedUser.userPassword || '',
                userRole: selectedUser.userRole || '',
                userStatus: selectedUser.userStatus || '',
            });
        }
    }, [selectedUser, updateTrigger]);

    // Open modal function
    const openDeleteModal = (user) => {
        setSelectedUser(user);
        setDeleteModalOpen(true);
    };

    const openEditModal = (user) => {
        setSelectedUser(user);
        setEditModalOpen(true);
    }

    // Close modal function
    const closeDeleteModal = (selectedUser) => {
        setDeleteModalOpen(false);

        if (selectedUser) {
            axios.delete(`http://localhost:5000/api/users/${selectedUser._id}`)
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

        setSelectedUser(null);
    };

    const closeEditModal = (selectedUser) => {
        setEditModalOpen(false);

        if (selectedUser) {
            axios.patch(`http://localhost:5000/api/users/${selectedUser._id}`, updatedUser)
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
        setSelectedUser(null);
    }

    return (
        <div className="flex flex-col w-full divide-y">
            {users.map((user) => (
                <div key={user._id} className="group flex py-8 px-5 font-plus-jakarta-sans">
                    <div className="size-8 border border-black rounded-full p-1 mr-6">
                        <img src="/icons/profile-2user.svg" alt="" />
                    </div>
                    <div className="grid grid-cols-2 grid-rows-3 w-[80%] gap-x-4 gap-y-1">
                        <div>
                            <label className="font-semibold">Username: </label>
                            <label>{user.userName}</label>
                        </div>
                        <div>
                            <label className="font-semibold">Email: </label>
                            <label>{user.userEmail}</label>
                        </div>
                        <div>
                            <label className="font-semibold">Password: </label>
                            <label>Example123</label>
                        </div>
                        <div>
                            <label className="font-semibold">Role: </label>
                            <label className='capitalize'>{user.userRole}</label>
                        </div>
                        <div>
                            <label className="font-semibold">Status: </label>
                            <label className='capitalize'>{user.userStatus}</label>
                        </div>
                        <div>
                            <label className="font-semibold">Created at: </label>
                            <label>{formatDistanceToNow(parseISO(user.userCreatedAt), { addSuffix: true })}</label>
                        </div>
                    </div>
                    <div className="group-hover:flex hidden flex-grow justify-end items-center space-x-4">
                        <button onClick={() => openDeleteModal(user)} className="border p-2 rounded-full hover:bg-slate-50">
                            <img src="/icons/trashcan.svg" alt="Delete User" />
                        </button>
                        <button onClick={() => openEditModal(user)} className="border p-2 rounded-full hover:bg-slate-50">
                            <img src="/icons/userSettings.svg" alt="User Settings" />
                        </button>
                    </div>
                </div>
            ))}

            {isDeleteModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4">Are You Sure?</h2>
                        <p>You are about to delete {selectedUser?.userName}</p>
                        <button
                            className="bg-red-500 text-white px-4 py-2 mt-4 rounded hover:bg-red-700"
                            onClick={() => {
                                closeDeleteModal(selectedUser);
                            }}>
                            Delete User
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
                            <label className="font-semibold">Username: </label>
                            <input
                                value={updatedUser?.userName}
                                onChange={(e) => setUpdatedUser({ ...updatedUser, userName: e.target.value })}
                                type="text"
                                id="username"
                                name="username"
                                className="border p-2 mr-2 col-span-2 border-black focus:outline-blue-500 rounded" />

                            <label className="font-semibold">Email: </label>
                            <input
                                value={updatedUser?.userEmail}
                                onChange={(e) => setUpdatedUser({ ...updatedUser, userEmail: e.target.value })}
                                type="text"
                                id="username"
                                name="username"
                                className="border p-2 mr-2 col-span-2 border-black focus:outline-blue-500 rounded" />

                            <label className="font-semibold">Role: </label>
                            <select
                                value={updatedUser?.userRole}
                                onChange={(e) => setUpdatedUser({ ...updatedUser, userRole: e.target.value })}
                                type="text"
                                id="username"
                                name="username"
                                className="border p-2 mr-2 col-span-2 border-black focus:outline-blue-500 rounded">
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>

                            <label className="font-semibold">Status: </label>
                            <select
                                value={updatedUser?.userStatus}
                                onChange={(e) => setUpdatedUser({ ...updatedUser, userStatus: e.target.value })}
                                type="text"
                                id="username"
                                name="username"
                                className="border p-2 mr-2 col-span-2 border-black focus:outline-blue-500 rounded">
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="suspended">Suspended</option>
                            </select>
                        </div>
                        <button
                            className="bg-green-500 text-white px-4 py-2 mt-4 rounded hover:bg-gren-700"
                            onClick={() => {
                                closeEditModal(selectedUser);
                            }}>
                            Update User
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
        </div>
    );
};

export default UsersDashboard;

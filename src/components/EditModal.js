import React, { useEffect } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import { Slide, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ring } from 'ldrs'
ring.register()
export default function EditModal({ open, setOpen, user }) {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false);
    const successToast = (msg) => toast.success(msg, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        transition: Slide,
        theme: "light",

    });;

    const errorToast = (msg) => toast.error(msg, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        transition: Slide,
        theme: "light",

    });

    const handleEdit = async () => {
        setLoading(true);
        try {
            const res = await fetch(`https://reqres.in/api/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    email: email
                })
            });
            const data = await res.json();
            console.log('Data:', data);
            successToast('User updated successfully');
        } catch (error) {
            errorToast('User not updated. Try again');
        }
        setLoading(false);
        setOpen(false);
    }




    useEffect(() => {
        if (user) {
            setFirstName(user.first_name || '');
            setLastName(user.last_name || '');
            setEmail(user.email || '');
        }
    }, [user, open]);

    return (
        <Dialog open={open} onClose={setOpen} className="relative z-10">

            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">

                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <DialogTitle as="h3" className="text-lg font-bold mb-2 leading-6 text-gray-900">
                                        Edit Category
                                    </DialogTitle>
                                    <div className="mt-2">
                                        <div className='w-full mb-2'>
                                            <label htmlFor="" className="block text-sm font-medium text-gray-700">First Name</label>
                                            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" className="mt-1 block w-80  border-2 p-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 " placeholder='Edit First Name' />
                                        </div>
                                        <div className='w-full mb-2'>
                                            <label htmlFor="" className="block text-sm font-medium text-gray-700">Last Name</label>
                                            <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" className="mt-1 block w-80  border-2 p-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 " placeholder='Edit Last Name' />
                                        </div>
                                        <div className='w-full mb-2'>
                                            <label htmlFor="" className="block text-sm font-medium text-gray-700">Email</label>
                                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="mt-1 block w-80  border-2 p-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 " placeholder='Edit Email' />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                type="button"
                                onClick={handleEdit}
                                className="inline-flex w-full justify-center rounded-md bg-[#006400] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                            >
                               {loading? <div className='flex justify-center'>
                                    <l-ring
                                        size="20"
                                        stroke="3"
                                        bg-opacity="0"
                                        speed="2"
                                        color="white"
                                    ></l-ring>
                                </div>: 'Update'}
                            </button>
                            <button
                                type="button"
                                data-autofocus
                                onClick={() => setOpen(false)}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            >
                                Cancel
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

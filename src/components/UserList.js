import React, {  useState } from 'react'
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import { ring } from 'ldrs'
ring.register()
export default function UserList(props) {


    const users = props.users
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);    

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setShowEditModal(true);
    };

    const handleDeleteClick = (user) => {
        setSelectedUser(user); 
        setShowDeleteModal(true); 
    };


    return (

        <div className='pt-20 flex flex-row flex-wrap items-center justify-center gap-2 '>
            

            {
                users && users.map((user) => (
                    <div key={user.id} class="w-full max-w-sm bg-black border  border-gray-200 rounded-lg shadow ">

                        <div class="flex flex-col items-center pb-10 pt-4">
                            <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src={user.avatar} alt="Bonnie" />
                            <h5 class="mb-1 text-xl font-medium text-white ">{user.first_name} {user.last_name}</h5>
                            <span class="text-sm text-gray-500 ">{user.email}</span>
                            <div class="flex mt-4 md:mt-6">
                                <div onClick={() => handleEditClick(user)} class="cursor-pointer inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 ">Edit</div>
                                <div onClick={() => handleDeleteClick(user)} class="cursor-pointer inline-flex items-center py-2 px-4 ms-2 text-sm font-medium text-red-500 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-red-500 ">Delete</div>
                            </div>
                        </div>

                    </div>
                )
                )
            }
            {showEditModal && selectedUser && (
                <EditModal
                    user={selectedUser}
                    open={showEditModal}
                    setOpen={setShowEditModal}
                />
            )}

            {showDeleteModal && selectedUser && (
                <DeleteModal
                    user={selectedUser}
                    open={showDeleteModal}
                    setOpen={setShowDeleteModal}
                />
            )}

        </div>
    )
}

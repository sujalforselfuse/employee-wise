import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import UserList from '../components/UserList'
import Pagination from '../components/Pagination'
import { ring } from 'ldrs'
ring.register()
export default function UserListPage() {

    const [users, setUsers] = useState([]);
    const [startingPage, setStartingPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalEntries, setTotalEntries] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await fetch(`https://reqres.in/api/users?page=${startingPage}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            const data = await res.json()
            console.log(data)
            setUsers(data.data)
            setTotalEntries(data.total)
            setCurrentPage(data.page)
        } catch (error) {

        }
        setLoading(false);
    }

    useEffect(() => {
        fetchUsers()
    }
        , [])

    useEffect(() => {
        fetchUsers()
    }
        , [startingPage]);
    return (
        <div className=''>
            <Navbar></Navbar>
            {loading ? <div className='flex justify-center pt-28'>
                <l-ring
                    size="60"
                    stroke="3"
                    bg-opacity="0"
                    speed="2"
                    color="black"
                ></l-ring>
            </div> :
                <UserList users={users}></UserList>}
            <Pagination currentPage={currentPage} totalEntries={totalEntries} startingPage={startingPage} setStartingPage={setStartingPage}></Pagination>
        </div>
    )
}

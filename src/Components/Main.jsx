import React, { useState } from 'react';
import { FaEdit, FaPen, FaPlus, FaTrash } from 'react-icons/fa';
import { Link, useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const Main = () => {
    const loadedChocolates = useLoaderData()
    const [chocolates, setChocolates] = useState(loadedChocolates)
    console.log(chocolates)

    const handleDelete = (id) => {
        // console.log(id)
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    fetch(`http://localhost:5000/chocolates/${id}`, {
                        method: "DELETE"
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            if (data.deletedCount > 0) {
                                Swal.fire(
                                    'Deleted!',
                                    'Your file has been deleted.',
                                    'success'
                                )
                            }
                            const remainingChocolates = chocolates.filter(chocolate => chocolate._id !== id)
                            console.log(remainingChocolates)
                            setChocolates(remainingChocolates)
                        })
                }
            })

    }


    return (
        <div className='max-w-7xl mx-auto mt-12'>
            <h1 className='mx-auto text-center py-3 font-semibold text-white text-3xl rounded bg-yellow-700 w-1/2'>Chocolate Management System</h1>

            <Link to='/addChocolates'> <button className='flex items-center gap-2 border-2 py-2 px-5 font-semibold text-lg'><FaPlus /> ADD Chocolates</button></Link>


            <div className='my-16'>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className='text-xl'>
                            <tr>
                                <th>Images</th>
                                <th>Name</th>
                                <th>Country</th>
                                <th>Category</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                chocolates.map(chocolate =>
                                    <tr key={chocolate._id}>
                                        <th className='w-20 h-20'><img src={chocolate.url} alt="" /></th>
                                        <td>{chocolate.name}</td>
                                        <td>{chocolate.country}</td>
                                        <td>{chocolate.category}</td>
                                        <td className='flex items-center gap-5 mt-2'>

                                            <Link to={`/chocolates/${chocolate._id}`}> <button className='bg-orange-100 p-3'><FaEdit /></button></Link>

                                            <button onClick={() => handleDelete(chocolate._id)} className='bg-orange-100 text-red-500 p-3'><FaTrash /></button>
                                        </td>
                                    </tr>)
                            }
                            {/* <tr>
                                
                            </tr> */}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default Main;
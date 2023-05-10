import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaBeer } from 'react-icons/fa';
import Swal from 'sweetalert2';


const AddChocolates = () => {

    const handleAddChocolate = event => {
        event.preventDefault()
        const form = event.target;
        const name = form.chocolateName.value;
        const country = form.country.value;
        const category = form.category.value;
        const url = form.url.value;
        const newChocolate = { name, country, category, url }
        console.log(newChocolate)

        fetch('http://localhost:5000/chocolates', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newChocolate)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                Swal.fire({
                    title: 'success!',
                    text: 'Data Inserted Successfully!',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
                form.reset()
            })
    }

    return (
        <div className='max-w-6xl mx-auto my-20'>
            <h1 className='mx-auto text-center py-3 font-semibold text-white text-3xl rounded bg-yellow-700 w-1/2'>Chocolate Management System</h1>
            <Link to="/">
                <p className='font-semibold flex gap-3 items-center my-10 text-xl'>
                    <span><FaArrowLeft /></span>
                    All Chocolate
                </p>
            </Link>

            <div className='bg-orange-100 pt-10 px-10'>
                <h1 className='text-center text-4xl text-orange-600 font-mono font-bold'>New Chocolates</h1>
                <p className='text-center text-sm font-serif'>Use the below form to create a new product</p>
                <form onSubmit={handleAddChocolate} className='p-10'>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-lg font-bold">Name</span>
                        </label>
                        <label className="input-group">
                            <input type="text" placeholder="Enter chocolate name" name='chocolateName' className="input input-bordered w-full rounded py-3 px-2" />
                        </label>
                    </div>
                    <div className="form-control mt-5">
                        <label className="label">
                            <span className="label-text text-lg font-bold">Country</span>
                        </label>
                        <label className="input-group">
                            <input type="text" placeholder="Enter Country name" name='country' className="input input-bordered w-full rounded py-3 px-2" />
                        </label>
                    </div>
                    <div className="form-control mt-5">
                        <label className="label">
                            <span className="label-text text-lg font-bold">Category</span>
                        </label>
                        <label className="input-group">
                            <input type="text" placeholder="Enter category name" name='category' className="input input-bordered w-full rounded py-3 px-2" />
                        </label>
                    </div>
                    <div className="form-control mt-5">
                        <label className="label">
                            <span className="label-text text-lg font-bold">Photo Url</span>
                        </label>
                        <label className="input-group">
                            <input type="url" placeholder="Enter Photo url" name='url' className="input input-bordered w-full rounded py-3 px-2" />
                        </label>
                    </div>
                    <div className='text-center mt-5'>
                        <button className='bg-orange-600 px-5 py-3 rounded-lg text-white font-bold text-lg'><input type="submit" value="Add Chocolate" /></button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddChocolates;
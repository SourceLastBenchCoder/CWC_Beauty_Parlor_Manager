import React from 'react'
import { Link } from 'react-router-dom'
import { BsFillPaletteFill, BsPeopleFill,BsFillFileEarmarkSlidesFill,BsPalette, BsSubtract } from 'react-icons/bs'

function Sidebar() {
    return (
        <div className="border-end bg-white" id="sidebar-wrapper">

            <div className="sidebar-heading border-bottom bg-primary"
                style={{ fontWeight: 'bold', color: 'white' }}>
                <BsFillPaletteFill className='mb-1' /> BPMS ADMIN
            </div>

            <div className="list-group list-group-flush">
                <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/admin/dashboard">Dashboard</Link>
                <Link to="/admin/all" className="list-group-item list-group-item-action list-group-item-light p-3">
                    <BsPeopleFill className='mb-1' />&nbsp;Administrators
                </Link>
                <Link to="/admin/beautician/all" className="list-group-item list-group-item-action list-group-item-light p-3">
                    <BsPalette className='mb-1' />&nbsp;Beautician
                </Link>
                <Link to="/admin/category/all" className="list-group-item list-group-item-action list-group-item-light p-3">
                    <BsFillFileEarmarkSlidesFill className='mb-1' />&nbsp;Category
                </Link>
                <Link to="/admin/product/all" className="list-group-item list-group-item-action list-group-item-light p-3">
                    <BsSubtract className='mb-1' />&nbsp;Product
                </Link>
            </div>
        </div >
    )
}

export default Sidebar
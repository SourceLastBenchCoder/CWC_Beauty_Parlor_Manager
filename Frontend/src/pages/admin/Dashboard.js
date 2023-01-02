import React from 'react'
import AdminHome from "./AdminHome";
import AllAdmin from "./AllAdmin";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Routes, Route } from "react-router-dom";
import "./dashboard.css";
import CreateAdmin from './CreateAdmin';
import DetailAdmin from './DetailAdmin';
import EditAdmin from './EditAdmin';
import AllCategory from './AllCategory';
import CreateCategory from './CreateCategory';
import DetailCategory from './DetailCategory';
import EditCategory from './EditCategory';
import AllBeautician from './AllBeautician';
import CreateBeautician from './CreateBeautician';
import EditBeautician from './EditBeautician';
import DetailBeautician from './DetailBeautician';
import AllProduct from './AllProduct';
import CreateProduct from './CreateProduct';
import DetailProduct from './DetailProduct';

function Dashboard() {
    return (
        <div className="d-flex" id="wrapper">
            <Sidebar />
            <div id="page-content-wrapper">
                <Header />
                <Routes>
                    <Route path="/admin/dashboard" element={<AdminHome />} />
                    <Route path="/admin/all" element={<AllAdmin />} />
                    <Route path="/admin/create" element={<CreateAdmin />} />
                    <Route path="/admin/detail/:id" element={<DetailAdmin />} />
                    <Route path="/admin/edit/:id" element={<EditAdmin />} />

                    <Route path="/admin/beautician/all" element={<AllBeautician />} />
                    <Route path="/admin/beautician/create" element={<CreateBeautician />} />
                    <Route path="/admin/beautician/detail/:id" element={<DetailBeautician />} />
                    <Route path="/admin/beautician/edit/:id" element={<EditBeautician />} />

                    <Route path="/admin/category/all" element={<AllCategory />} />
                    <Route path="/admin/category/create" element={<CreateCategory />} />
                    <Route path="/admin/category/detail/:id" element={<DetailCategory />} />
                    <Route path="/admin/category/edit/:id" element={<EditCategory />} />

                    <Route path="/admin/product/all" element={<AllProduct />} />
                    <Route path="/admin/product/create" element={<CreateProduct />} />
                    <Route path="/admin/product/detail/:id" element={<DetailProduct />} />
                    <Route path="/admin/product/edit/:id" element={<EditCategory />} />
                </Routes>
            </div>
        </div>
    )
}

export default Dashboard
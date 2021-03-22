import React from 'react';
import {
    CreateProduct,
    CategoryForm,
    DashboardProductsContainer,
    UpdateProduct,
    DashboardOrdersContainer,
    OrderContainer,
    AdminDashboard
} from '../components';

const AdminRoutes = [
    {
        path   : '/admin',
        render : () => <AdminDashboard />,
        auth   : 'admin'
    },
    {
        path   : '/admin/products',
        render : () => <DashboardProductsContainer />,
        auth   : 'admin'
    },
    {
        path   : '/admin/products/create',
        render : () => <CreateProduct />,
        auth   : 'admin'
    },
    {
        path   : '/admin/products/edit/:id',
        render : ({ match }) => <UpdateProduct id={match.params.id} />,
        auth   : 'admin'
    },
    {
        path   : '/admin/categories',
        render : () => <CategoryForm />,
        auth   : 'admin'
    },
    {
        path   : '/admin/orders',
        render : () => <DashboardOrdersContainer />,
        auth   : 'admin'
    },
    {
        path   : '/admin/orders/edit/:id',
        render : ({ match }) => <OrderContainer id={match.params.id} />,
        auth   : 'admin'
    }
]

export default AdminRoutes;

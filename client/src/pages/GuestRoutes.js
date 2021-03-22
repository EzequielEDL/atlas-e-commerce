import React from "react";
import {
    Products,
    Catalog,
    Home,
    ForgetPassEmailContainer,
    ForgetPassCodeContainer
} from "../components";
import AboutUsContainer from "../components/AboutUs/AboutUsContainer";

const GuestRoutes = [
    {
        path: "/",
        render: () => <Home />,
    },
    {
        path: "/products/:value",
        render: ({ match }) => <Catalog value={match.params.value || ""} />,
    },
    {
        path: "/products",
        render: () => <Catalog name={""} />,
    },
    {
        path: "/products/search/:id",
        render: ({ match }) => <Products id={match.params.id} />,
    },
    {

        path: "/signin/reset",
        render: () => <ForgetPassCodeContainer />
    },
    {
        path: "/aboutUs",
        render: () => <AboutUsContainer />
    },
    {
        path: "/reset",
        render: () => <ForgetPassEmailContainer />,
        auth: "paleto"
    },
    {
        path: "/reset/code",
        render: () => <ForgetPassCodeContainer />,
        auth: "paleto"
    }
];

export default GuestRoutes;

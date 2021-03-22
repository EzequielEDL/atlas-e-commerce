import React from "react";
import {
  SignIn,
  SignUp,
  Cart,
  UserProfile,
  Checkout,
  SuccessComponent,
  ErrorComponent,
} from "../components";

const UserRoutes = [
  {
    path: "/signin",
    render: () => <SignIn />,
    auth: "paleto",
  },
  {
    path: "/signup",
    render: () => <SignUp />,
    auth: "paleto",
  },
  {                         //REVISAR AUTENTIACIONES DE ROUTES POSTERIORES A ESTE COMENTARIO
    path: "/user/profile",
    render: () => <UserProfile />,
    auth: "all",
  },
  {
    path: "/cart",
    render: () => <Cart />,
    auth: "all",
  },
  {
    path: "/checkout",
    render: () => <Checkout />,
    auth: "all",
  },
  {
    path: "/payment/success",
    render: () => <SuccessComponent />,
    auth: "all",
  },
  {
    path: "/payment/error",
    render: () => <ErrorComponent />,
    auth: "all",
  },
];

export default UserRoutes;

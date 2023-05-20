import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import AllToys from "../pages/AllToys/AllToys";
import PrivateRoute from "./PrivateRoute";
import Details from "../pages/Details/Details";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: ([
            {
                path: "/",
                element: <Home />
            },
            {
                path: "allToys",
                element: <AllToys />,
                loader: () => fetch('http://localhost:5000/allToys')
            },
            {
                path: "/details/:id",
                element: <PrivateRoute><Details /></PrivateRoute>
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
        ])
    }
]);


export default router;
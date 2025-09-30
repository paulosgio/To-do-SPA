import { useAppSelector } from "../hook"
import { Navigate, Outlet } from "react-router-dom"

export default function PrivateRoute() {

    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)

    if (!isAuthenticated) {
        return <Navigate to="/" replace/>
    }

    return(
        <>
            <Outlet/>
        </>
    )
}
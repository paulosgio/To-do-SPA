import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import EditTask from "./components/EditTask";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import { useEffect, useState } from "react";
import { useAppDispatch } from "./hook";
import { loginSuccess } from "./features/Auth/authSlice";

function AppRoutes() {

  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState<boolean>(true)
  
    useEffect(()=> {
    const token = localStorage.getItem("token")
    if (token) {
      dispatch(loginSuccess(token))
    }
    setLoading(false)
  }, [])

  if (loading) {
    return(
      <p>carregando</p>
    )
  }

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route element={<PrivateRoute/>}>
          <Route path="/home" element={<Home/>}/>
          <Route path="home/task/:id" element={<EditTask/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

function App() {
  return (
    <Provider store={store}>
      <AppRoutes/>
    </Provider>
  )
}

export default App

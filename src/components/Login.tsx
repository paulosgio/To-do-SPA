import { useForm } from "react-hook-form"
import { useAppDispatch } from "../hook"
import { loginFailed, loginSuccess } from "../features/Auth/authSlice"
import { useNavigate } from "react-router-dom"

interface ILogin {
    user: string,
    password: string
}

export default function Login() {

    const { register, handleSubmit } = useForm<ILogin>()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const onSubmit = handleSubmit((data)=> {
        if (data.user === "paulo" && data.password === "1234") {
            const token = "fodase"
            dispatch(loginSuccess(token))
            navigate("/home")
        } else {
            dispatch(loginFailed())
        }
    })

    return(
        <form onSubmit={onSubmit}>
            <label htmlFor="">User</label>
            <input { ...register("user") } type="text" />
            <label htmlFor="">Senha</label>
            <input { ...register("password") } type="password" />
            <button type="submit">Enviar</button>
        </form>
    )
}
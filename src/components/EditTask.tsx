import { useForm } from "react-hook-form"
import { editTask } from "../features/toDo/toDoSlice"
import { useAppDispatch, useAppSelector } from "../hook"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import type { IToDo } from "../interfaces/ToDoInterface"

export default function EditTask() {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<IToDo>()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const data = useAppSelector((state)=> state.toDo)
    const { id } = useParams()

    const onSubmit = handleSubmit((data)=> {
        dispatch(editTask(data))
        navigate("/home")
      })

    const task = data.find(param => param.id === id)

    function getValueToForm() {
        if (task) {
            setValue("task", task.task)
            setValue("category", task.category)
            setValue("id", task.id)
        }
    }

      useEffect(()=> {
        getValueToForm()
      }, [])
    
    return(
        <form onSubmit={onSubmit}>
        <label htmlFor="task">Tarefa</label>
        <input { ...register("task", { required:true }) } type="text" />
        <label htmlFor="category">Categoria</label>
        <select {...register("category", { required: true })}>
          <option value="">Selecione</option>
          <option value="Casa">Casa</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Lazer">Lazer</option>
          <option value="Estudo">Estudo</option>
          <option value="Atividade física">Atividade física</option>
        </select>
        <button type='submit'>Enviar</button>
      </form>
    )
}
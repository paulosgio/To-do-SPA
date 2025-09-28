import "./../App.css"
import { useAppDispatch, useAppSelector } from '../hook'
import { addTask, removeTask } from "../features/toDo/toDoSlice"
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"

interface IToDoForm {
  task: string,
  category: "Casa" | "Trabalho" | "Lazer" | "Estudo" | "Atividade física"
  id: string
}

function Home() {
  
  const dispatch = useAppDispatch()
  const data = useAppSelector((state)=> state.toDo)
  const { register, handleSubmit, formState: { errors } } = useForm<IToDoForm>()
  const categories: string[] = ["Casa", "Trabalho", "Lazer", "Estudo", "Atividade física"]
  const [categoryActive, setCategoryActive] = useState<string>("")
  const filteredData = categoryActive ? data.filter(param => param.category === categoryActive) : data
  const navigate = useNavigate()

  const onSubmit = handleSubmit((data)=> {
    dispatch(addTask(data))
  })

  return (
    <>
      <select name='filter' id='filter' onChange={(e)=> {
        const category = e.target.value
        setCategoryActive(category)
      }}>
        <option value="">Selecione</option>
        {categories.map((param, i)=> {
          return(
            <option key={i} value={param}>{param}</option>
          )
        })}
      </select>
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
      <ul>
        {filteredData.map((param, i)=> {
          return(
            <li key={i}>
              <p>{param.task}</p>
              <p>{param.category}</p>
              <button onClick={()=> dispatch(removeTask(param.id))}>Deletar</button>
              <button onClick={()=> navigate(`task/${param.id}`)}>Editar</button>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default Home

import { TaskTable } from "@/components/elements"
import { Header, MainContainer } from "@/components/layouts"
import { useEffect, useState } from "react"

export function Todos() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/todo")
      .then(response => response.json())
      .then(data => setTodos(data?.data?.tasks))
      .catch(error => console.error(error))
  }, [])

  return (
    <>
      <Header />
      <MainContainer className="flex-col pt-12">
        <h1 className="border-b pb-4 text-3xl font-semibold">Tarefas</h1>

        {/* <pre>{JSON.stringify(todos, null, 2)}</pre> */}
        <TaskTable data={todos} />
      </MainContainer>
    </>
  )
}

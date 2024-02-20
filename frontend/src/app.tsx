import { CreateTaskForm } from "./components/elements"
import { TaskItem, TaskItemProps } from "./components/elements/task"
import { MainContainer, TaskList } from "./components/layouts"
// import { formatDate } from "./lib/format-date"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

interface TaskResponse extends TaskItemProps {
  id: string
}

export function App() {
  const { isPending, error, data } = useQuery<Array<TaskResponse>>({
    queryKey: ["get-tasks"],
    queryFn: async () => {
      const response = await fetch("http://localhost:5000/todo", {
        method: "GET"
      })
      const data = await response.json()

      return data?.data?.tasks
    },
    placeholderData: keepPreviousData,
    retry: 1,
    refetchInterval: 5000
  })

  return (
    <MainContainer className="flex min-h-screen w-screen flex-col items-center gap-14 pt-14">
      <div className="flex w-full flex-col items-center">
        <h1 className="pb-2 text-3xl font-semibold">Adicione uma tarefa</h1>
        <CreateTaskForm />
      </div>

      <main className="w-full">
        <h1 className="pb-4 text-3xl font-semibold">Tarefas</h1>

        <TaskList className="w-full" error={error} isPending={isPending}>
          {!!data ? (
            data.map(task => (
              <TaskItem
                key={task.id}
                title={task.title}
                description={task.description}
                deadline={task.deadline}
                isCompleted={task.isCompleted}
              />
            ))
          ) : (
            <p>Não há tarefas cadastradas</p>
          )}
        </TaskList>
      </main>
    </MainContainer>
  )
}

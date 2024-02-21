import { CreateTaskForm } from "@/components/elements"
import { Link } from "react-router-dom"

import { MainContainer } from "@/components/layouts"
import { Button } from "@/components/ui/button"

export function Home() {
  return (
    <MainContainer className="flex min-h-screen w-screen flex-col items-center gap-14 pt-14">
      <div className="flex w-full flex-col items-center">
        <h1 className="pb-2 text-3xl font-semibold">Adicione uma tarefa</h1>
        <CreateTaskForm />
      </div>

      <main className="inline-flex w-full justify-between">
        <h1 className="pb-4 text-3xl font-semibold">Tarefas</h1>

        <Button asChild>
          <Link to="/todos">Ver tarefas</Link>
        </Button>
      </main>
    </MainContainer>
  )
}

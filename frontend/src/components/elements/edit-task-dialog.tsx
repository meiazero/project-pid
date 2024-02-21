import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { cn } from "@/lib/utils"

import { PencilIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { buttonVariants } from "../ui/button"
import { EditTaskForm } from "./edit-task-form"
import { TaskResponse } from "./task-table"

interface EditTaskDialogProps {
  taskId: string
}

export function EditTaskDialog({ taskId }: EditTaskDialogProps) {
  const [todo, setTodo] = useState({} as TaskResponse)

  useEffect(() => {
    fetch(`http://localhost:5000/todo/${taskId}`)
      .then(response => response.json())
      .then(data => setTodo(data?.data?.task))
      .catch(error => console.error(error))
  }, [])

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
      >
        <PencilIcon className="size-4" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Editar Tarefa</AlertDialogTitle>
          <AlertDialogDescription>
            As Alterações podem não sofrer atualização imediata
          </AlertDialogDescription>
        </AlertDialogHeader>

        <EditTaskForm taskId={taskId} data={todo}>
          <AlertDialogCancel>cancelar</AlertDialogCancel>
        </EditTaskForm>
      </AlertDialogContent>
    </AlertDialog>
  )
}

import { Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import { toast } from "../ui/use-toast"
import { EditTaskDialog } from "./edit-task-dialog"

interface TaskActionButtonProps {
  taskId: string
}

export function TaskActionButton({ taskId }: TaskActionButtonProps) {
  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:5000/todo/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })

      toast({
        title: "Tarefa deletada"
      })

      window.location.replace("/todos")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="inline-flex gap-4 ">
      <EditTaskDialog taskId={taskId} />
      <Button size="icon" variant="outline" onClick={handleDelete}>
        <Trash2 className="size-4" />
      </Button>
    </div>
  )
}

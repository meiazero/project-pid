import { PenLine, Trash2 } from "lucide-react"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"

export interface TaskItemProps {
  title: string
  description: string
  deadline: string
  isCompleted: boolean
}

export function TaskItem({
  title,
  description,
  deadline,
  isCompleted
}: TaskItemProps) {
  return (
    <div className="flex w-full flex-row items-center justify-between border px-4 py-2">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm">{description}</p>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div className="flex flex-col items-center justify-end gap-2">
          <p className="text-sm">{deadline}</p>
          <p className="text-sm">
            {isCompleted ? (
              <Badge
                variant="default"
                className="bg-emerald-500 text-background hover:bg-emerald-600 focus:bg-emerald-600"
              >
                Concluído
              </Badge>
            ) : (
              <Badge variant="destructive">Pendente</Badge>
            )}
          </p>
        </div>
        <div className="flex flex-row gap-2">
          {/* fazer componente separadado que recebe os dados e o id, para poder atualizar com um form dialog */}
          <Button size="icon">
            <PenLine />
          </Button>

          {/* fazer um dialog para perguntar se realmente quer deletar */}
          <Button size="icon">
            <Trash2 />{" "}
          </Button>
        </div>
      </div>
    </div>
  )
}

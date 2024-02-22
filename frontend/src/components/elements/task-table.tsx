import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { TaskActionButton } from "./task-action-menu"

export interface TaskResponse {
  id: string
  title: string
  description: string
  deadline: string
  is_complete: boolean
}

interface TaskTableProps {
  className?: string
  data: TaskResponse[]
}

export function TaskTable({ data }: TaskTableProps) {
  return (
    <div className="rounded-lg border p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titulo</TableHead>
            <TableHead style={{ width: 160 }}>Status</TableHead>
            <TableHead className="text-right" style={{ width: 140 }}>
              Prazo
            </TableHead>
            <TableHead className="text-right" style={{ width: 200 }}>
              Ações
            </TableHead>
            <TableHead style={{ width: 64 }} />
          </TableRow>
        </TableHeader>
        <TableBody>
          {!!data && data.length > 0 ? (
            <>
              {data.map(task => (
                <TableRow key={task.id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>
                    {task.is_complete ? (
                      <Badge className="bg-emerald-500 text-background hover:bg-emerald-600 focus:bg-emerald-600">
                        Concluída
                      </Badge>
                    ) : (
                      <Badge variant="destructive">Pendente</Badge>
                    )}
                  </TableCell>

                  <TableCell className="text-right">
                    {new Date(task.deadline).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell className="flex justify-end">
                    <TaskActionButton taskId={task.id} />
                  </TableCell>
                </TableRow>
              ))}
            </>
          ) : (
            <TableRow>
              <TableCell>Nenhuma tarefa encontrada</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

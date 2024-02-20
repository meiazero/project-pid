import { cn } from "@/lib/utils"

interface TaskListProps {
  children: React.ReactNode
  className?: string
  isPending?: boolean
  error?: Error | null
}

export function TaskList({
  children,
  className,
  error,
  isPending
}: TaskListProps) {
  if (isPending) return <p>Carregando...</p>

  if (error) return <p>Ocorreu um erro: {error?.message}</p>

  return <div className={cn("flex flex-col gap-4", className)}>{children}</div>
}

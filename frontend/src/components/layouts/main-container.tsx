import { cn } from "@/lib/utils"

interface MainContainerProps {
  children: React.ReactNode
  className?: string
}

export function MainContainer({ children, className }: MainContainerProps) {
  return <div className={cn("container flex", className)}>{children}</div>
}

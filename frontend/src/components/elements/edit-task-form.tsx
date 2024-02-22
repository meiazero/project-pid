import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { taskFormSchema } from "@/schema/task-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "../ui/use-toast"
import { Icons } from "./icons"

interface EditTaskFormProps {
  children: React.ReactNode
  taskId: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}

export function EditTaskForm({ children, taskId, data }: EditTaskFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const defaultValuesTaskForm: z.infer<typeof taskFormSchema> = {
    ...data,
    deadline: new Date(data.deadline)
  }

  const form = useForm<z.infer<typeof taskFormSchema>>({
    defaultValues: defaultValuesTaskForm,
    resolver: zodResolver(taskFormSchema)
  })

  const onSubmit = async (values: z.infer<typeof taskFormSchema>) => {
    setIsLoading(!isLoading)
    try {
      await fetch(`http://localhost:5000/todo/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      })

      window.location.replace("/todos")
    } catch (error) {
      toast({
        title: "Erro ao Editar tarefa",
        description: "Ocorreu um erro ao editar a tarefa"
      })
    } finally {
      setIsLoading(isLoading)
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel
                  htmlFor={field.name}
                  className="text-lg font-semibold"
                >
                  Título da tarefa:
                </FormLabel>
                <FormControl>
                  <Input
                    id={field.name}
                    disabled={isLoading}
                    {...field}
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="col-span-2 flex items-end justify-between">
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem className=" flex flex-col">
                  <FormLabel
                    htmlFor={field.name}
                    className="text-lg font-semibold"
                  >
                    Prazo
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          disabled={isLoading}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPPP", {
                              locale: ptBR
                            }).replace(/de/g, "do")
                          ) : (
                            <span>Selecione uma data</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={date => date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="is_completed"
              render={({ field }) => (
                <FormItem className="">
                  <div className="flex flex-row items-center gap-2">
                    <FormLabel htmlFor={field.name}>
                      Status da tarefa:
                    </FormLabel>
                    <FormControl>
                      <Checkbox
                        disabled={isLoading}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </div>
                  <FormDescription>
                    Marque se a tarefa foi concluída
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex w-full flex-row justify-between">
          <Button type="submit">
            {isLoading ? (
              <>
                <Icons.spinner className="mr-2 size-4 animate-spin" />
                Atualizando tarefa
              </>
            ) : (
              "Atualizar tarefa"
            )}
          </Button>
          {children}
        </div>
      </form>
    </Form>
  )
}

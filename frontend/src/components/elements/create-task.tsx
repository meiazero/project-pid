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
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { taskFormSchema } from "@/schema/task-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Icons } from "./icons"

type TaskFormSchema = z.infer<typeof taskFormSchema>

const defaultValuesTaskForm: TaskFormSchema = {
  title: "",
  deadline: new Date(),
  is_completed: false
}

export function CreateTaskForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<TaskFormSchema>({
    defaultValues: defaultValuesTaskForm,
    resolver: zodResolver(taskFormSchema)
  })

  // todo: implementar chamada no banco para criar tarefa
  const onSubmit = async (values: TaskFormSchema) => {
    setIsLoading(!isLoading)
    const { title, deadline, is_completed } = values

    try {
      const response = await fetch("http://localhost:5000/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          deadline,
          is_completed
        })
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Tarefa adicionada",
          description: "Sua tarefa foi adicionada com sucesso"
        })
        form.reset()
      } else {
        toast({
          title: "Erro ao adicionar tarefa",
          description: data?.data || "Ocorreu um erro ao adicionar a tarefa"
        })
      }
    } catch (error) {
      toast({
        title: "Erro ao adicionar tarefa",
        description: "Ocorreu um erro ao adicionar a tarefa"
      })
    } finally {
      setIsLoading(isLoading)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-lg space-y-6 rounded-lg border px-4 py-2"
      >
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

          <div className="col-span-2 flex flex-row items-end gap-4">
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem className="flex flex-col">
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
                          variant={"outline"}
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
                <FormItem className=" flex flex-row items-center justify-start space-x-3 ">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel htmlFor={field.name}>Status da tarefa</FormLabel>
                    <FormDescription>
                      Marque se a tarefa já foi concluída.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" disabled={isLoading} className="font-semibold">
          {isLoading ? (
            <>
              <Icons.spinner className="mr-2 size-4 animate-spin" />
              Adicionando tarefa
            </>
          ) : (
            "Adicionar tarefa"
          )}
        </Button>
      </form>
    </Form>
  )
}

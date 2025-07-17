import Modal from "@/components/custom/modal";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useCreateTodoMutation, useUpdateTodoMutation } from "@/store/todo/api";
import { ITodo } from "@/types/todo";
import { ScaleLoader } from "react-spinners";
import { useEffect } from "react";

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  completed: z.boolean().optional(),
});

export default function TodoForm({
  data,
  openModal,
  toogleOpenModal,
}: {
  data?: ITodo;
  openModal: boolean;
  toogleOpenModal: (value: boolean) => void;
}) {
  const [createTodo, { isLoading: isLoadingCreate }] = useCreateTodoMutation();
  const [updateTodo, { isLoading: isLoadingUpdate }] = useUpdateTodoMutation();
  const title = data ? "updated" : "created";
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      completed: false,
    },
  });

  useEffect(() => {
    if (data) {
      form.setValue("title", data.title);
      form.setValue("completed", data.completed);
    }
  }, [data, form]);

  async function onSubmit(v: z.infer<typeof FormSchema>) {
    try {
      if (data) {
        await updateTodo({
          id: data.id,
          userId: data.userId || 1,
          title: v.title,
          completed: v.completed,
        }).unwrap();
      } else {
        await createTodo({
          userId: 1,
          title: v.title,
          completed: v.completed,
        }).unwrap();
      }
      toast.success(`Todo ${title} successfully!`);
      toogleOpenModal(false);
      form.reset();
    } catch (err) {
      console.error(`Failed to ${title} todo:`, err);
      toast.error(`Failed to ${title} todo. Please try again.`);
    }
  }

  return (
    <Modal
      title={`${data ? "Update" : "Create new"} todo`}
      open={openModal}
      onCancel={() => toogleOpenModal(false)}
      onOk={form.handleSubmit(onSubmit)}
      loading={isLoadingCreate || isLoadingUpdate}
      okText="Submit"
      okVariant="default"
      cancelText="Cancel"
      cancelVariant="destructive"
      centered
      className="w-full sm:max-w-xl md:max-w-3xl"
    >
      {isLoadingCreate ||
        (isLoadingUpdate ? (
          <div className="flex justify-center items-center w-full min-h-52 text-primary">
            <ScaleLoader color="currentColor" />
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mb-4"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Input title..." {...field} />
                    </FormControl>
                    <FormDescription>
                      Title will be shown in the todo list.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="completed"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Status</FormLabel>
                      <FormDescription>
                        Status of todo. If checked, the todo is considered
                        completed.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        ))}
    </Modal>
  );
}

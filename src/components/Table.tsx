import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TodoModel } from "@/feature/todo/models/todoModel";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { UpdateTaskModal } from "./UpdateTaskModal";
import { useTranslation } from "react-i18next";

interface TableDemoProps {
  tasks: TodoModel[];
  caption: string;
}

const TaskTable: React.FC<TableDemoProps> = ({ tasks, caption }) => {
  const [t] = useTranslation("global");

  return (
    <Table className="bg-white mt-10 rounded-md">
      <TableCaption>{caption.toUpperCase()} TASKS</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">#</TableHead>
          <TableHead>{t("table.taskName")}</TableHead>
          <TableHead className="">{t("table.status")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task, index) => (
          <Dialog key={task.id}>
            <DialogTrigger asChild>
              <TableRow key={task.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{task.name}</TableCell>
                <TableCell className="">{task.status}</TableCell>
              </TableRow>
            </DialogTrigger>
            <UpdateTaskModal task={task} />
          </Dialog>
        ))}
      </TableBody>
    </Table>
  );
};

export default TaskTable;

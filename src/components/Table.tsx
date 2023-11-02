import React from "react";
import {
  Table,
  TableBody,
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
}

const TaskTable: React.FC<TableDemoProps> = ({ tasks }) => {
  const [t] = useTranslation("global");

  return (
    <Table className="bg-white mt-6 md:mt-10 rounded-md">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">#</TableHead>
          <TableHead className="w-[100px]">{t("table.taskName")}</TableHead>
          <TableHead className="w-[100px]">{t("table.status")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task, index) => (
          <TableRow key={task.id}>
            <TableCell className="w-[100px] font-medium">{index + 1}</TableCell>
            <TableCell className="w-[100px]">{task.name}</TableCell>
            <TableCell className="">{task.status}</TableCell>
            <Dialog key={task.id}>
              <DialogTrigger asChild>
                <TableCell className="w-[100px]">
                  <div className="flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-300 p-2 rounded-sm transition-all duration-200">
                    Edit
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="fill-gray-600"
                    >
                      <path d="M19.045 7.401c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.378-.378-.88-.586-1.414-.586s-1.036.208-1.413.585L4 13.585V18h4.413L19.045 7.401zm-3-3 1.587 1.585-1.59 1.584-1.586-1.585 1.589-1.584zM6 16v-1.585l7.04-7.018 1.586 1.586L7.587 16H6zm-2 4h16v2H4z"></path>
                    </svg>
                  </div>
                </TableCell>
              </DialogTrigger>
              <UpdateTaskModal task={task} />
            </Dialog>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TaskTable;

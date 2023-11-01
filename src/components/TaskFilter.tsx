// TaskFilter.tsx
import React from "react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { CreateTaskModal } from "./CreateTaskModal";
import { useTranslation } from "react-i18next";

type TaskFilterProps = {
  selectedTab: string;
  onTabClick: (status: string) => void;
  allTasksCount: number;
  completeTasksCount: number;
  deletedTasksCount: number;
  incompleteTasksCount: number;
};

const TaskFilter: React.FC<TaskFilterProps> = ({
  selectedTab,
  onTabClick,
  allTasksCount,
  completeTasksCount,
  deletedTasksCount,
  incompleteTasksCount,
}) => {
  const [t] = useTranslation("global");

  const tabs = [
    { status: "all", label: `${t("tabs.all")}` },
    { status: "incomplete", label: `${t("tabs.ongoing")}` },
    { status: "complete", label: `${t("tabs.complete")}` },
    { status: "deleted", label: `${t("tabs.deleted")}` },
  ];

  return (
    <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:items-center justify-between">
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-24 justify-between">
        {tabs.map((tab) => (
          <div
            key={tab.status}
            className={`flex items-center gap-4 text-white w-full md:w-56 p-2 rounded-md transition-all duration-200 cursor-pointer ${
              selectedTab === tab.status ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
            onClick={() => onTabClick(tab.status)}
          >
            {/* TODO: Check why color in prod is missing */}
            <div
              className={`p-2 rounded-md ${
                tab.status === "all"
                  ? "bg-all"
                  : tab.status === "complete"
                  ? "bg-complete"
                  : tab.status === "incomplete"
                  ? "bg-incomplete"
                  : "bg-deleted"
              }`}
            >
              <img
                src={`/${tab.status}.svg`}
                height={25}
                width={25}
                alt={tab.status}
              />
            </div>
            <div>
              <p className="text-sm text-gray-300">{tab.label}</p>
              <p className="font-bold">
                {tab.status === "all"
                  ? allTasksCount
                  : tab.status === "complete"
                  ? completeTasksCount
                  : tab.status === "deleted"
                  ? deletedTasksCount
                  : incompleteTasksCount}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <button className="bg-blue-500 px-4 py-2 text-white rounded-sm hover:bg-blue-600 transition-all duration-200">
            {t("tabs.create")}
          </button>
        </DialogTrigger>
        <CreateTaskModal />
      </Dialog>
    </div>
  );
};

export default TaskFilter;

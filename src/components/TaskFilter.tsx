// TaskFilter.tsx
import React from "react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { CreateTaskModal } from "./CreateTaskModal";

type TaskFilterProps = {
  selectedTab: string;
  onTabClick: (status: string) => void;
};

const TaskFilter: React.FC<TaskFilterProps> = ({ selectedTab, onTabClick }) => {
  const tabs = [
    { status: "all", label: "All Tasks" },
    { status: "incomplete", label: "Ongoing Tasks" },
    { status: "complete", label: "Complete Tasks" },
    { status: "deleted", label: "Deleted Tasks" },
  ];

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center md:gap-24 justify-between">
        {tabs.map((tab) => (
          <div
            key={tab.status}
            className={`flex items-center gap-4 text-white w-52 p-2 rounded-md transition-all duration-200 cursor-pointer ${
              selectedTab === tab.status ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
            onClick={() => onTabClick(tab.status)}
          >
            {/* TODO: Check why color in prod is missing */}
            <div className={`bg-${tab.status} p-2 rounded-md`}>
              <img
                src={`/${tab.status}.svg`}
                height={25}
                width={25}
                alt={tab.status}
              />
            </div>
            <div>
              <p className="text-sm text-gray-300">{tab.label}</p>
              <p className="font-bold">27</p>
            </div>
          </div>
        ))}
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <button className="bg-blue-500 px-4 py-2 text-white rounded-md hover:bg-blue-600 transition-all duration-200">
            Create Task
          </button>
        </DialogTrigger>
        <CreateTaskModal />
      </Dialog>
    </div>
  );
};

export default TaskFilter;

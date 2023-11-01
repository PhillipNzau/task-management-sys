import { useState } from "react";
import TaskFilter from "@/components/TaskFilter";
import TaskTable from "@/components/Table";
import SEO from "@/components/SEO";
import { useTask } from "@/feature/todo/context/TaskContext";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { tasks } = useTask();
  const [t] = useTranslation("global");

  const allTasksCount = tasks.length;
  const completeTasksCount = tasks.filter(
    (task) => task.status === "complete"
  ).length;
  const deletedTasksCount = tasks.filter(
    (task) => task.status === "deleted"
  ).length;
  const incompleteTasksCount = tasks.filter(
    (task) => task.status === "incomplete"
  ).length;

  const [selectedTab, setSelectedTab] = useState("all");

  const filterByStatus = (status: string) => {
    setSelectedTab(status);
  };

  // Filter tasks based on the selected tab
  const filteredTasks =
    selectedTab === "all"
      ? tasks
      : selectedTab === "complete"
      ? tasks.filter((task) => task.status === "complete")
      : selectedTab === "deleted"
      ? tasks.filter((task) => task.status === "deleted")
      : tasks.filter((task) => task.status === "incomplete");
  // Reverse the order of filteredTasks to display in LIFO order
  const lifoTasks = filteredTasks.slice().reverse();

  return (
    <section className="px-6 py-6 md:px-20">
      <SEO
        title="Task Management"
        description="FAO's ultimate project management system"
        type="article"
      />

      <h1 className="text-bold text-xl text-white mb-6">{t("home.title")}</h1>
      {/* Filter */}
      <TaskFilter
        selectedTab={selectedTab}
        onTabClick={filterByStatus}
        allTasksCount={allTasksCount}
        completeTasksCount={completeTasksCount}
        deletedTasksCount={deletedTasksCount}
        incompleteTasksCount={incompleteTasksCount}
      />

      {/* table */}
      {filteredTasks.length === 0 ? (
        <p className="text-white">No tasks to display.</p>
      ) : (
        <TaskTable tasks={lifoTasks} />
      )}
    </section>
  );
};

export default Home;

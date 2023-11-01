import { useState } from "react";
import TaskFilter from "@/components/TaskFilter";
import TaskTable from "@/components/Table";
import SEO from "@/components/SEO";
import { useTask } from "@/feature/todo/context/TaskContext";

const Home = () => {
  const { tasks } = useTask();

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

  return (
    <section className="p-8 px-20">
      <SEO
        title="Task Management"
        description="FAO's ultimate project management system"
        type="article"
      />

      <h1 className="text-bold text-xl text-white my-4">Task Summary</h1>
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
      {tasks.length === 0 ? (
        <p className="text-white">Loading...</p>
      ) : (
        <TaskTable caption={selectedTab} tasks={tasks} />
      )}
    </section>
  );
};

export default Home;

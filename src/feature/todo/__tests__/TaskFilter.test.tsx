import { render, screen } from "@testing-library/react";
import TaskFilter from "../../../components/TaskFilter";

describe("TaskFilter component", () => {
  it("should render", () => {
    render(
      <TaskFilter
        selectedTab="all"
        onTabClick={() => {}}
        allTasksCount={0}
        completeTasksCount={0}
        deletedTasksCount={0}
        incompleteTasksCount={0}
      />
    );

    // Ensure the component is rendered without checking specific content
    expect(screen.getByTestId("task-filter")).toBeInTheDocument();
  });
});

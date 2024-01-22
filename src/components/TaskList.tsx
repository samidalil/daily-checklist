import classNames from "classnames";

import type { TaskType } from "../types";
import Task from "./Task";
import "./TaskList.css";

export type TaskListPropsType = {
  showCompletedTasks: boolean;
  selectedIds: string[];
  tasks: TaskType[];
  toggleTask: (id: string) => void;
};

export default function TaskList({
  tasks,
  selectedIds,
  showCompletedTasks,
  toggleTask,
}: TaskListPropsType) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={classNames({
            hiddenListElement: !showCompletedTasks && task.completed,
          })}
        >
          <Task
            title={task.title}
            completed={task.completed}
            selected={selectedIds.includes(task.id)}
            toggle={() => toggleTask(task.id)}
          />
        </li>
      ))}
    </ul>
  );
}

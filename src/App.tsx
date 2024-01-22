import { useCallback, useState } from "react";
import {
  MdDeleteForever,
  MdDeleteSweep,
  MdLibraryAddCheck,
  MdOutlineDeleteForever,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import classNames from "classnames";

import IconToggle from "./components/common/IconToggle";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import useTasks from "./hooks/useTasks";
import useToggler from "./hooks/useToggler";
import "./App.css";

import favicon from "/favicon.svg";

export default function App() {
  const [showCompletedTasks, toggleShowCompletedTasks] = useToggler(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteIds, setDeleteIds] = useState<string[]>([]);
  const { tasks, addTask, toggleTask, completeAllTasks, deleteTasks } =
    useTasks();

  const toggleShouldDeleteTask = useCallback(
    (id: string) => {
      setDeleteIds((ids) =>
        ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id],
      );
    },
    [setDeleteIds],
  );
  const applyDeleteTasks = useCallback(() => {
    deleteTasks(deleteIds);
    setDeleteIds([]);
  }, [deleteIds, deleteTasks]);
  const toggleIsDeleting = useCallback(() => {
    setIsDeleting((isDeleting) => {
      if (isDeleting) {
        setDeleteIds([]);
      }
      return !isDeleting;
    });
  }, [setDeleteIds, setIsDeleting]);

  return (
    <>
      <div className="app-title">
        <div className="image-container">
          <img src={favicon} width={60} height={60} alt="logo" />
        </div>
        <h1>Daily Tasks</h1>
      </div>

      <div className="app-container">
        <div className="button-row-container">
          <button
            className={classNames({ hidden: isDeleting })}
            onClick={completeAllTasks}
            children={<MdLibraryAddCheck />}
          />
          <button
            className={classNames({ hidden: !isDeleting })}
            onClick={applyDeleteTasks}
            children={<MdDeleteSweep />}
          />
          <IconToggle
            toggled={isDeleting}
            on={<MdDeleteForever />}
            off={<MdOutlineDeleteForever />}
            onClick={toggleIsDeleting}
          />
          <IconToggle
            toggled={showCompletedTasks}
            on={<MdVisibility />}
            off={<MdVisibilityOff />}
            onClick={toggleShowCompletedTasks}
          />
        </div>

        <TaskList
          tasks={tasks}
          selectedIds={deleteIds}
          showCompletedTasks={showCompletedTasks}
          toggleTask={isDeleting ? toggleShouldDeleteTask : toggleTask}
        />

        <TaskForm
          className={classNames({ hidden: isDeleting })}
          onSubmit={addTask}
        />
      </div>
    </>
  );
}

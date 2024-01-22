import { useCallback, useEffect, useRef } from "react";

import type { TaskType } from "../types";
import generateId from "../utils/createId";
import useLocalStorage from "./useLocalStorage";

export default function useTasks() {
  const [tasks, setTasks] = useLocalStorage<TaskType[]>("tasks", []);
  const initializedRef = useRef(false);

  const addTask = useCallback(
    (title: string) => {
      if (title === "") {
        return;
      }

      setTasks((tasks) => [
        ...tasks,
        { completed: false, completedAt: null, id: generateId(), title },
      ]);
    },
    [setTasks],
  );

  const completeAllTasks = useCallback(
    () =>
      setTasks((tasks) =>
        tasks.map((task) => ({
          ...task,
          completed: true,
          completedAt: new Date(),
        })),
      ),
    [setTasks],
  );

  const deleteTasks = useCallback(
    (ids: string[]) =>
      setTasks((tasks) => tasks.filter((task) => !ids.includes(task.id))),
    [setTasks],
  );

  const toggleTask = useCallback(
    (id: string) => {
      setTasks((tasks) =>
        tasks.map((task) =>
          task.id === id
            ? {
                ...task,
                completed: !task.completed,
                completedAt: task.completed ? null : new Date(),
              }
            : task,
        ),
      );
    },
    [setTasks],
  );

  useEffect(() => {
    if (!initializedRef.current) {
      const currentDay = new Date().getDay();

      setTasks((tasks) =>
        tasks.map((task) => ({
          ...task,
          completed: task.completed
            ? task.completedAt?.getDay() === currentDay
            : false,
        })),
      );
      initializedRef.current = true;
    }
  }, [initializedRef, setTasks]);

  return {
    tasks,
    addTask,
    completeAllTasks,
    deleteTasks,
    toggleTask,
  };
}

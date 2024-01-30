import { useCallback } from "react";

import type { TaskType } from "../types";
import generateId from "../utils/createId";
import useLocalStorage from "./useLocalStorage";

export default function useTasks() {
  const [tasks, setTasks] = useLocalStorage<TaskType[]>("tasks", (tasks) => {
    if (!tasks) {
      return [];
    }

    const now = Date.now();
    const startTimeOfCurrentDay = now - (now % (1000 * 60 * 60 * 24));

    return (tasks as TaskType[]).map((task) => {
      const completedAt = new Date(task.completedAt || "");
      const completed =
        task.completed && !isNaN(completedAt.getTime())
          ? completedAt.getTime() >= startTimeOfCurrentDay
          : false;

      return {
        ...task,
        completed,
        completedAt: completed ? completedAt : null,
      };
    });
  });

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

  return {
    tasks,
    addTask,
    completeAllTasks,
    deleteTasks,
    toggleTask,
  };
}

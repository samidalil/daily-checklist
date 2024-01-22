import classNames from "classnames";

import "./Task.css";

export type TaskPropsType = {
  completed: boolean;
  selected: boolean;
  title: string;
  toggle: () => void;
};

export default function Task({
  title,
  completed,
  selected,
  toggle,
}: TaskPropsType) {
  return (
    <button
      className={classNames("task", { completed, selected })}
      onClick={toggle}
      children={title}
    />
  );
}

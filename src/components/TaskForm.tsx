import { useCallback } from "react";
import { MdAdd } from "react-icons/md";

import "./TaskForm.css";
import classNames from "classnames";

export type TaskFormPropsType = Omit<
  React.FormHTMLAttributes<HTMLFormElement>,
  "onSubmit"
> & {
  onSubmit: (title: string) => void;
};

export default function TaskForm({
  onSubmit,
  ...formProps
}: TaskFormPropsType) {
  const onEnter = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        onSubmit(e.currentTarget.value);
        e.currentTarget.value = "";
      }
    },
    [onSubmit],
  );
  const handleFormSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const target = e.target as typeof e.target & {
        name: { value: string };
      };

      onSubmit(target.name.value);
      target.name.value = "";
    },
    [onSubmit],
  );

  return (
    <form
      {...formProps}
      className={classNames(formProps.className, "task-form")}
      name="task-form"
      onSubmit={handleFormSubmit}
    >
      <div className="task-form-input-container">
        <input
          name="name"
          type="text"
          autoComplete="off"
          placeholder="Enter task name"
          onKeyDown={onEnter}
        />
      </div>
      <button type="submit" children={<MdAdd />} />
    </form>
  );
}

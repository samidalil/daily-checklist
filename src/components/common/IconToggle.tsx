import classNames from "classnames";

import "./IconToggle.css";

export type IconTogglePropsType =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    off: JSX.Element;
    onClick: () => void;
    on: JSX.Element;
    toggled: boolean;
  };

export default function IconToggle({
  off: offIcon,
  on: onIcon,
  toggled,
  onClick,
  ...buttonProps
}: IconTogglePropsType) {
  return (
    <button
      {...buttonProps}
      className={classNames(buttonProps.className, "icon-toggle")}
      onClick={onClick}
    >
      <span
        className={classNames("icon", { "hidden-icon": !toggled })}
        children={onIcon}
      />
      <span
        className={classNames("icon", { "hidden-icon": toggled })}
        children={offIcon}
      />
    </button>
  );
}

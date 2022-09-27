import React from "react";
import { Link } from "react-router-dom";
import "./index.scss";

function getClass(props) {
  let classNames = [`button-component`];
  let primary = false;
  let secondary = false;
  let danger = false;
  let outlined = false;
  let block = false;
  let className = false;

  if (props.primary) primary = true;
  if (props.secondary) secondary = true;
  if (props.danger) danger = true;
  if (props.outlined) outlined = true;
  if (props.block) block = true;
  if (props.className) className = true;

  primary && classNames.push("is-primary");
  secondary && classNames.push("is-secondary");
  danger && classNames.push("is-danger");
  outlined && classNames.push("is-outlined");
  block && classNames.push("is-block");
  className && classNames.push(props.className);

  return classNames.join(" ");
}
function Button(props, ref) {
  let classNames = getClass(props);

  if (!props.to) {
    return (
      <button
        onClick={props.onClick}
        type={props.type || "button"}
        className={classNames}
        style={{
          width: props.width || "",
          height: props.height || "",
        }}
        disabled={props.loading || props.disabled}
        ref={ref}
        id={props.id}
      >
        {props.loading ? (
          <div
            className="spinner-border spinner-border-sm text-black mx-3 my-0"
            role="status"
          />
        ) : (
          props.children
        )}
      </button>
    );
  } else {
    return (
      <Link
        to={props.to}
        className={`d-flex align-items-center text-decoration-none ${classNames}`}
        style={{
          width: props.width || "",
          height: props.height || "",
        }}
        disabled={props.loading || props.disabled}
        ref={ref}
        id={props.id}
      >
        {props.children}
      </Link>
    );
  }
}

export default React.forwardRef(Button);

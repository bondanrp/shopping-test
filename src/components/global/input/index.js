import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.scss";

export default function Input(props) {
  let value = props.value || "";
  return (
    <label className={`w-100 ${props.labelClass}`}>
      {props.label && <div className="d-flex">{props.label} </div>}
      <div className="input-container">
        {props.type !== "textarea" ? (
          <input
            className={`input ${props.className}`}
            style={{ height: props.height, width: props.width }}
            id={props.id}
            required={props.required}
            type={props.type}
            value={value}
            placeholder={props.placeholder}
            onChange={props.onChange}
            maxLength={props.maxLength}
            disabled={props.disabled}
          />
        ) : (
          <textarea
            className={`textarea ${props.className}`}
            style={{ height: props.height, width: props.width }}
            required={props.required}
            placeholder={props.placeholder}
            id={props.id}
            value={value}
            onChange={props.onChange}
            maxLength={props.maxLength}
            disabled={props.disabled}
          />
        )}
        {props.icon ? (
          <FontAwesomeIcon
            icon={props.icon}
            className="input-container__icon"
          />
        ) : null}
      </div>
      {props.maxLength ? (
        <p className="mb-0">
          {value.length}/{props.maxLength}
        </p>
      ) : null}
    </label>
  );
}

import "./index.scss";

function getClass(props) {
  let classNames = [props.className];
  props.alt && classNames.push("-alt");
  return classNames.join(" ");
}

export default function Card(props) {
  return (
    <div
      style={{ ...props.style, height: props.height, width: props.width }}
      className={`card ${getClass(props)}`}
      onClick={props.onClick}
    >
      {props.header && (
        <>
          <h4 className="card__header mb-0">{props.header}</h4>
          <hr />
        </>
      )}
      {props.children}
    </div>
  );
}

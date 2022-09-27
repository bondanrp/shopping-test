import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Image from "../global/image";
import "./index.scss";

export default function Carousel({ data }) {
  let [selected, setSelected] = useState(0);
  return (
    <div className="carousel">
      <div className="position-relative">
        <Image className="carousel__selected" src={data[selected]} />
        <div className="carousel__info">
          <button
            onClick={() => (selected ? setSelected((state) => state - 1) : "")}
          >
            <FontAwesomeIcon
              icon={faChevronLeft}
              className={`me-2 pointer ${!selected ? "text-sub" : ""}`}
              size="xs"
            />
          </button>
          <p className="mb-0">
            {selected + 1} / {data.length}{" "}
          </p>
          <button
            onClick={() =>
              selected + 1 !== data.length
                ? setSelected((state) => state + 1)
                : ""
            }
          >
            <FontAwesomeIcon
              icon={faChevronRight}
              className={`ms-2 pointer ${
                selected + 1 === data.length ? "text-sub" : ""
              }`}
              size="xs"
            />
          </button>
        </div>
      </div>
      <div className="carousel__options">
        {data.map((v, i) => {
          return (
            <button
              onClick={() => setSelected(i)}
              className={`pointer ${i === selected ? "-active" : ""}`}
            >
              <Image src={v} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

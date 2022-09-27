import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarOutline } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function Rating({ rate, id }) {
  let [state, setState] = useState([]);
  useEffect(() => {
    _getRating();
  }, []);

  let _getRating = () => {
    let activeStars = [...Array(Math.floor(rate))].fill(1);
    if (rate % 1) {
      activeStars.push(0.5);
    }
    while (activeStars.length < 5) {
      activeStars.push(0);
    }
    setState(activeStars);
  };
  return (
    <div>
      {state.map((v, i) => {
        if (v === 1) {
          return (
            <FontAwesomeIcon
              key={`star${i}${id}`}
              icon={faStar}
              color="#ffcd3c"
            />
          );
        } else if (v === 0.5) {
          return (
            <FontAwesomeIcon
              key={`star${i}${id}`}
              icon={faStarHalfAlt}
              color="#ffcd3c"
            />
          );
        } else {
          return (
            <FontAwesomeIcon
              key={`star${i}${id}`}
              icon={faStarOutline}
              color="#ffcd3c"
            />
          );
        }
      })}
    </div>
  );
}

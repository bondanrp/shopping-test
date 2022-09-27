import { useState } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/reducer/modal";
import Card from "../global/card";
import "./index.scss";
import ItemModal from "./item-modal";
import Rating from "./rating";

export default function ListItem({ data }) {
  let [imgError, setImgError] = useState(false);
  let dispatch = useDispatch();
  let _handleOpenModal = () => {
    dispatch(openModal(<ItemModal data={data} />));
  };

  let _getDiscountedPrice = (price, discount) => {
    let result = Number(price.replace(/[^0-9.-]+/g, ""));
    let realDiscount = Number(discount.replace(/[^0-9.-]+/g, "")) / 100;

    return "$" + (result - result * realDiscount);
  };
  return (
    <Card onClick={_handleOpenModal} className="h-100 pointer list-item">
      {imgError ? (
        <div className="h-100 w-100 d-flex justify-content-center align-items-center no-item">
          <h3 className="pre-line text-center fw-bold text-primary">{`Image\n Unavailable`}</h3>
        </div>
      ) : (
        <img
          onError={() => {
            setImgError(true);
          }}
          src={data.image}
        />
      )}
      <div className="border-top py-4">
        <p className="mb-0 fw-bold">{data.name}</p>
        <div className="mt-3 pb-3" style={{ height: "100px" }}>
          <div className="d-flex align-items-center">
            {(data.off && (
              <p className="fw-bold me-2 mb-0 text-decoration-line-through text-sub">
                {data.price}
              </p>
            )) || <h5 className="fw-bold me-2 mb-0">{data.price}</h5>}
            {data.off && (
              <span className="text-small text-danger fw-normal">
                {data.off}
              </span>
            )}
          </div>
          {data.off && (
            <h5 className="fw-bold">
              {_getDiscountedPrice(data.price, data.off)}
            </h5>
          )}
        </div>
        <div className="d-flex align-items-center">
          <Rating rate={data.rating} />
          <p className="text-sub mb-0 text-small ms-2">
            ({data.reviewCount} reviews)
          </p>
        </div>
      </div>
    </Card>
  );
}

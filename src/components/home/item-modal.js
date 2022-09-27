import { useEffect, useState } from "react";
import "./index.scss";
import Button from "../global/button";
import Rating from "./rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import Carousel from "./carousel";

export default function ItemModal({ data }) {
  let [state, setState] = useState({
    size: "",
  });
  let _handleSelectSize = (e) => {
    setState({ ...state, size: e });
  };

  let _getDiscountedPrice = (price, discount) => {
    let result = Number(price.replace(/[^0-9.-]+/g, ""));
    let realDiscount = Number(discount.replace(/[^0-9.-]+/g, "")) / 100;

    return "$" + (result - result * realDiscount);
  };
  _getDiscountedPrice(data.price, data.off);
  return (
    <div className="item-modal container w-100">
      <div className="row">
        <div className="col-12 col-md-6">
          <Carousel data={data.images} />
        </div>
        <div className="col-12 col-md-6">
          <div className="my-5">
            {data.off && <p className="text-danger text-small mb-0">SALE</p>}
            <h5 className="fw-bold">{data.name}</h5>
            <div className="d-flex align-items-center">
              <Rating rate={data.rating} />
              <p className="text-sub mb-0 text-small ms-2">
                ({data.reviewCount} reviews)
              </p>
            </div>
            <div className="mt-3 pb-3 border-bottom">
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
            <p className="mb-2">Sizes:</p>
            <div className="item-modal__sizes border-bottom pb-3">
              {data.sizes &&
                data.sizes.map((v, i) => {
                  return (
                    <button
                      className={`item-modal__sizes__item pointer ${
                        state.size == i ? "-active" : ""
                      }`}
                      onClick={() => _handleSelectSize(i)}
                    >
                      {v}
                    </button>
                  );
                })}
            </div>
            <div className="d-flex pt-4">
              <Button secondary>
                <FontAwesomeIcon icon={faCartArrowDown} className="me-2" />
                Add to Cart
              </Button>
              <Button primary className="ms-3">
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

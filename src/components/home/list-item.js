import { useState } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/reducer/modal";
import Card from "../global/card";
import "./index.scss";

export default function ListItem({ data }) {
  let [imgError, setImgError] = useState(false);
  let dispatch = useDispatch();
  let _handleOpenModal = () => {
    dispatch(
      openModal(
        <div>
          <img
            onError={() => {
              setImgError(true);
            }}
            src={data.image}
          />
        </div>
      )
    );
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
        <p>{data.price}</p>
      </div>
    </Card>
  );
}

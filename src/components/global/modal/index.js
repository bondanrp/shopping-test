import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import ReactModal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../redux/reducer/modal";
import "./index.scss";

const customStyles = {
  content: {
    maxWidth: "800px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "100%",
    marginRight: "-50%",
    maxHeight: "100vh",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    background: "rgba(0,0,0,0.4)",
    zIndex: "10",
  },
};
export default function Modal() {
  let state = useSelector((state) => state.modal);
  useEffect(() => {
    ReactModal.setAppElement("#root");
  }, [state]);
  let dispatch = useDispatch();
  let handleClose = () => {
    dispatch(closeModal());
  };
  return (
    <ReactModal
      style={customStyles}
      isOpen={state.isOpen}
      onRequestClose={handleClose}
      shouldCloseOnOverlayClick={true}
    >
      <div className="modal__container container w-100">
        <div onClick={handleClose} className="modal__close pointer">
          <FontAwesomeIcon icon={faXmark} />
        </div>
        {state.content}
      </div>
    </ReactModal>
  );
}

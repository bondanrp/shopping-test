import { BrowserRouter } from "react-router-dom";
import Router from "./router";
import Modal from "./components/global/modal";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Modal />

        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;

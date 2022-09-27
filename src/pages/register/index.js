import Card from "../../components/global/card";
import Input from "../../components/global/input";
import Button from "../../components/global/button";
import Spacer from "../../components/global/spacer";
import "./index.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authControllers from "../../api/auth";
import { toast } from "react-toastify";

export default function RegisterPage() {
  let [state, setState] = useState({
    email: "",
    password: "",
    confPassword: "",
    name: "",
  });
  let [errMsg, setErrMsg] = useState("");
  let [loading, setLoading] = useState(false);
  let { email, password, name, confPassword } = state;
  let navigate = useNavigate();

  let _handleChange = (e) => {
    let { id, value } = e.target;
    setState({ ...state, [id]: value });
  };
  let _handleSubmit = (e) => {
    e.preventDefault();
    if (password == confPassword) {
      const { email, password } = state;
      setLoading(true);
      authControllers
        .register({ email, name, password })
        .then((res) => {
          setLoading(false);
          toast.success(res.data);
          navigate(`/login`);
        })
        .catch((err) => {
          setLoading(false);
          let errMessages = [];
          let errResponse = err.response && err.response.data;
          if (errResponse) {
            if (errResponse.email) {
              errMessages = [...errMessages, errResponse.email];
            }
            if (errResponse.name) {
              errMessages = [...errMessages, errResponse.name];
            }
          }
          setErrMsg(errMessages.join("\n"));
        });
    } else {
      setErrMsg("Password and confirmation password does not match");
    }
  };
  return (
    <div className="register-page">
      <div className="container p-0">
        <div className="row">
          <Card header="Register" className="col-12 col-md-6 offset-md-3">
            <form
              onSubmit={_handleSubmit}
              className="p-4 d-flex flex-column align-items-end"
            >
              <Input
                onChange={_handleChange}
                value={name}
                className=""
                id="name"
                label="Name"
              />
              <Spacer height="30px" />
              <Input
                onChange={_handleChange}
                value={email}
                className=""
                id="email"
                label="Email"
              />
              <Spacer height="30px" />
              <Input
                onChange={_handleChange}
                value={password}
                label="Password"
                id="password"
                type="password"
              />
              <Spacer height="15px" />
              <Input
                onChange={_handleChange}
                value={confPassword}
                label="Confirmaton Password"
                id="confPassword"
                type="password"
              />
              <Spacer height="15px" />
              {errMsg && (
                <p className="text-danger mb-0 w-100 text-center pre-line">
                  {errMsg}
                </p>
              )}
              <Spacer height="15px" />
              <div className="d-flex justify-content-between align-items-center w-100">
                <p className="mb-0">
                  Already a user?{" "}
                  <Link className="fw-bold" to="/login">
                    Login
                  </Link>
                </p>

                <Button loading={loading} type="submit" primary>
                  Submit
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}

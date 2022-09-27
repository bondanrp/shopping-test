import Card from "../../components/global/card";
import Input from "../../components/global/input";
import Button from "../../components/global/button";
import Spacer from "../../components/global/spacer";
import "./index.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authControllers from "../../api/auth";
import { login } from "../../redux/reducer/user";

export default function LoginPage() {
  let [state, setState] = useState({
    email: "",
    password: "",
  });
  let [err, setErr] = useState("");
  let [loading, setLoading] = useState(false);
  let { email, password } = state;
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let _handleChange = (e) => {
    let { id, value } = e.target;
    setState({ ...state, [id]: value });
  };
  let _handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = state;
    setLoading(true);
    authControllers
      .login({ email, password })
      .then((res) => {
        setLoading(false);
        dispatch(
          login({
            email,
            token: res.data.token,
            isAuthenticated: true,
          })
        );
        navigate(`/home`);
      })
      .catch((err) => {
        setLoading(false);
        let errMsg = (err.response && err.response.data) || "Error";
        setErr(errMsg);
      });
  };
  return (
    <div className="login-page">
      <div className="container p-0">
        <div className="row">
          <Card header="Login" className="col-12 col-md-6 offset-md-3">
            <form
              onSubmit={_handleSubmit}
              className="p-4 d-flex flex-column align-items-end"
            >
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
              {err && (
                <p className="text-danger mb-0 w-100 text-center">{err}</p>
              )}
              <Spacer height="15px" />
              <div className="d-flex justify-content-between align-items-center w-100">
                <p className="mb-0">
                  Not a user?{" "}
                  <Link className="fw-bold" to="/register">
                    Register
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

import Card from "../../components/global/card";
import Input from "../../components/global/input";
import Button from "../../components/global/button";
import Spacer from "../../components/global/spacer";
import "./index.scss";

export default function LoginPage() {
  return (
    <div className="login-page">
      <div className="container p-0">
        <div className="row">
          <Card header="Login" className="col-12 col-md-6 offset-md-3">
            <div className="p-4 d-flex flex-column align-items-end">
              <Input className="" label="Username" />
              <Spacer height="30px" />
              <Input label="Password" type="password" />
              <Spacer height="30px" />
              <Button primary>Submit</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

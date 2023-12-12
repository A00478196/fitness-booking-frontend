import React from "react";
import Container from "../components/Container";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

const Login = () => {
  return (
    <Container>
      <div className="row">
        <div className="col-lg-6 col-md-8 col-sm-12 mx-auto">

          <form className="form-container mt-4 pt-4 border border-1 p-4 rounded-3">
          <h6 className="  fw-bold">Login</h6>

            <Input
              type="text"
              name="username"
              id="username"
              label={true}
              placeholder="Enter your username"
            />

            <Input
              type="password"
              name="password"
              id="password"
              label={true}
              placeholder="Enter your password"
            />

            <Button
              text="Login"
              type="main"
              className="mt-2"
              color="black"
              textColor="white"
              //   onClick={onSubmit}
              //   disabled={loading}
            />
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Login;

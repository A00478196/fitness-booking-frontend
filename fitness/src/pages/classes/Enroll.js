import React from "react";
import Container from "../../components/Container";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

const Enroll = () => {
  return (
    <Container>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 mx-auto">
          <form className="form-container p-3 rounded">
          <h6 className="fw-bold fw-9">Enter your details to enroll in this class</h6>

            <Input
              type="text"
              id="firstName"
              name="firstName"
              label="First Name"
              placeholder="Enter your first name"
              //   onChange={onChange}
            />

            <Input
              type="text"
              id="lastName"
              name="lastName"
              label="Last Name"
              placeholder="Enter your last name"
              //   onChange={onChange}
            />

            <Input
              type="text"
              id="email"
              name="email"
              label="Email"
              placeholder="Enter your email"
              // onChange={onChange}
            />

<Button
              text="Enroll"
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

export default Enroll;

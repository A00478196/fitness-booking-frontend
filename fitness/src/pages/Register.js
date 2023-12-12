import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import Input from "../components/common/Input";
import Checkbox from "../components/Checkbox";
import instance from "../components/auth/axiosConfig";
import Select from "../components/common/Select";
import Button from "../components/common/Button";

const Register = () => {
  const [isInstructor, setIsInstructor] = useState(false);
  const [qualifications, setQualifications] = useState([]);

  useEffect(() => {
    if (isInstructor === true) {
      instance
        .get("data/programs")
        .then((res) => {
          const unique = [...new Map(res?.data.map((m) => [m.id, m])).values()];

          setQualifications(unique);
         
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isInstructor]);

  return (
    <>
      <Container>
        <div className="row form-register mb-4">
          <div className="col-lg-6 col-md-8 col-sm-12 mx-auto">
            {/* {success && <SuccessMessage message="User Created Sucessfully!" />} */}

            {/* {error && <ErrorMessage message={error} className="my-2" />} */}
            <div className="form-container mt-4 pt-4 border border-1 p-4 rounded-3">
              <h4 className="mb-4 text-center title">Register</h4>
              <form>
                <div className="row">
                  <div className="col-lg-6">
                    <Input
                      type="text"
                      id="firstName"
                      name="firstName"
                      label="First Name"
                      placeholder="John"
                      //   onChange={onChange}
                    />
                    {/* {formErrors?.firstName && (
                    <ErrorMessage message={formErrors?.firstName} />
                  )} */}
                  </div>

                  <div className="col-lg-6">
                    <Input
                      type="text"
                      id="lastName"
                      name="lastName"
                      label="Last Name"
                      placeholder=" Doe"
                      //   onChange={onChange}
                    />
                    {/* {formErrors?.lastName && (
                    <ErrorMessage message={formErrors?.lastName} />
                  )} */}
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <Input
                      type="text"
                      id="email"
                      name="email"
                      label="Email"
                      placeholder="john.doe@gmail.com"
                      // onChange={onChange}
                    />
                    {/* {formErrors?.email && (
                    <ErrorMessage message={formErrors?.email} />
                  )} */}
                  </div>

                  <div className="col-lg-6">
                    <Input
                      type="password"
                      id="password"
                      name="password"
                      label="Password"
                      placeholder="Password"
                      //   onChange={onChange}
                    />
                    {/* {formErrors?.email && (
                    <ErrorMessage message={formErrors?.email} />
                  )} */}
                  </div>
                </div>

                <div>
                  <label class="form-label text-muted mb-0 text-capitalize fw-bold">
                    Register As Instructor?
                  </label>

                  <Checkbox
                    name="is_instructor"
                    label="Instructor"
                    className={"mt-2"}
                    onChange={() => setIsInstructor(!isInstructor)}
                  />
                </div>

                {isInstructor && (
                  <>
                    <div className="row">
                      <div className="col-lg-6">
                        <Input
                          type="text"
                          id="bio"
                          name="bio"
                          label={true}
                          placeholder="Enter your Bio"
                          //   onChange={onChange}
                        />
                        {/* {formErrors?.email && (
                    <ErrorMessage message={formErrors?.email} />
                  )} */}
                      </div>

                      <div className="col-lg-6">
                        <Input
                          type="text"
                          name="mobile"
                          id="mobile"
                          label="Mobile"
                          placeholder="7297743478"
                          //   onChange={onChange}
                        />
                        {/* {formErrors?.mobile && (
                      <ErrorMessage message={formErrors?.mobile} />
                    )} */}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-6">
                        <label class="form-label text-muted mb-0 text-capitalize fw-bold">
                          Qualifications
                        </label>
                        <Select options={qualifications} />
                      </div>
                    </div>
                  </>
                )}

                <div className="mt-3">
                  <Button
                    text="Register"
                    type="main"
                    className="mt-2"
                    color="black"
                    textColor="white"
                    //   onClick={onSubmit}
                    //   disabled={loading}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Register;

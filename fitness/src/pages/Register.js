import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import Input from "../components/common/Input";
import instance from "../components/auth/axiosConfig";
import Select from "../components/common/Select";
import Button from "../components/common/Button";
import Message from "../components/common/Message";
import Checkbox from "../components/common/Checkbox";
import { returnTimeOut, validateForm } from "../components/helpers/common";

const Register = () => {
  const [isInstructor, setIsInstructor] = useState(false);
  const [qualifications, setQualifications] = useState([]);
  const [data, setData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [fieldError, setFielErrors] = useState({});

  const [message, setMessage] = useState({
    success: false,
    error: false,
    message: "",
  });

  useEffect(() => {
    if (isInstructor === true) {
      instance
        .get("data/programs")
        .then((res) => {
          const unique = [
            ...new Map(res?.data.map((m) => [m.programId, m])).values(),
          ];

          setQualifications(unique);
        })

        .catch((err) => {
          console.log(err);
        });
    }
  }, [isInstructor]);

  const onChange = (e) => {
    const { name, value } = e?.target;
    let formData = { ...data };
    formData[name] = value;
    fieldError[name] = "";
    setFielErrors({});
    setData(formData);
   
    setFormErrors({ error: "" });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let formData = { ...data };

    formData["programs"] = [
      {
        programId: parseInt(formData?.programId),
      },
    ];

    let testData = {};

    if (isInstructor) {
      testData = {
        fistName: formData?.firstName,
        email: formData?.email,
        username: formData?.username,
        password: formData?.password,
        bio: formData?.bio,
        businessPhone: formData?.businessPhone,
        programs:formData?.programs?.length>0?formData?.programs:""
      };
    } else {
      testData = {
        firstName: formData?.firstName,
        email: formData?.email,
        username: formData?.username,
        password: formData?.password,
      };
    }

    delete formData?.programId;

    if (data && Object.keys(testData)?.length > 0) {
      if (validateForm(testData, setFielErrors)) {
        instance
        .post("/data/instructors", formData)
        .then((res) => {
          setMessage({
            success: true,
            error: false,
            message: "User registered Successfully!",
          });
          console.log(res);
        })
        .catch((err) => {
          setMessage({
            success: false,
            error: true,
            message: err?.response?.data?.errorMessage,
          });
          console.log(err);
        });
      } else {
      }
    } else {
      setFormErrors({ error: "All the fields are required" });
    }

    returnTimeOut(setMessage);
  };

  return (
    <>
      <Container>
        <div className="row form-register mb-4">
          <div className="col-lg-6 col-md-8 col-sm-12 mx-auto">
            <div className="form-container mt-4 pt-4 border border-1 p-4 rounded-3">
              <h4 className="mb-4 text-center title">Register</h4>
              <Message
                success={message?.success}
                error={message?.error}
                message={message?.message}
              />

              <p className="text-danger">{formErrors?.error}</p>
              <form>
                <div className="row">
                  <div className="col-lg-6">
                    <Input
                      type="text"
                      id="firstName"
                      name="firstName"
                      label="First Name"
                      placeholder="John"
                      value={data?.firstName}
                      onChange={onChange}
                    />
                  </div>
                  {fieldError?.firstName && (
                    <p className="text-danger">{fieldError?.firstName}</p>
                  )}

                  <div className="col-lg-6">
                    <Input
                      type="text"
                      id="lastName"
                      name="lastName"
                      label="Last Name"
                      placeholder=" Doe"
                      onChange={onChange}
                      value={data?.lastName}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <Input
                    type="text"
                    id="username"
                    name="username"
                    label="Username"
                    placeholder="username"
                    value={data?.username}
                    onChange={onChange}
                  />
                  {fieldError?.username && (
                    <p className="text-danger">Username is required</p>
                  )}
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <Input
                      type="text"
                      id="email"
                      name="email"
                      label="Email"
                      placeholder="john.doe@gmail.com"
                      value={data?.email}
                      onChange={onChange}
                    />
                    {fieldError?.email && (
                      <p className="text-danger">Email is required</p>
                    )}
                  </div>

                  <div className="col-lg-6">
                    <Input
                      type="password"
                      id="password"
                      name="password"
                      label="Password"
                      placeholder="Password"
                      value={data?.password}
                      onChange={onChange}
                    />
                    {fieldError?.password && (
                      <p className="text-danger">Password is required</p>
                    )}
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
                          value={data?.bio}
                          onChange={onChange}
                        />
                        {fieldError?.bio && (
                          <p className="text-danger">Bio is required</p>
                        )}
                      </div>

                      <div className="col-lg-6">
                        <Input
                          type="text"
                          name="businessPhone"
                          id="businessPhone"
                          label="businessPhone"
                          placeholder="7297743478"
                          value={data?.businessPhone}
                          onChange={onChange}
                        />
                        {fieldError?.businessPhone && (
                          <p className="text-danger">
                            Business Phone is required
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-6">
                        <label class="form-label text-muted mb-0 text-capitalize fw-bold">
                          Qualifications
                        </label>
                        <Select
                          options={qualifications}
                          onChange={onChange}
                          name="programId"
                        />
                      </div>
                      {fieldError?.programs && (
                      <p className="text-danger">Programs are required</p>
                    )}
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
                    onClick={onSubmit}
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

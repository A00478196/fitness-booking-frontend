import React, { useEffect, useState } from "react";
import instance from "../components/auth/axiosConfig";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Container from "../components/Container";
import Message from "../components/common/Message";
import { returnTimeOut } from "../components/helpers/common";

const Profile = () => {
  const [loggedUser, setLoggedUser] = useState({});
  const [user, setUser] = useState({});
  const [data, setData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [message, setMessage] = useState({
    success: false,
    error: false,
    message: "",
  });

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("userDetails"));
    if (items) {
      setLoggedUser(items);
    }

    // console.log()
    instance
      .get(`data/persons/${items?.id}`)
      .then((res) => {
        setUser(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    setData(user);
  }, [user]);

  const onChange = (e) => {
    const { name, value } = e?.target;

    let formData = { ...data };
    formData[name] = value;

    setData(formData);

    setFormErrors({ error: "" });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    instance
      .put(`data/persons/${loggedUser?.id}`, data)
      .then((res) => {
        // console.log(res);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        setMessage({
          success: true,
          error: false,
          message: "User data edited Successfully!",
        });
      })
      .catch((err) => {
        console.log(err);
        setMessage({
          success: false,
          error: true,
          message: err?.response?.data?.errorMessage,
        });
      });
    // returnTimeOut(setMessage);
  };

  return (
    <>
      <Container>
        <div className="row">
          <div className="col-lg-8 col-md-8 col-sm-12 mx-auto">
            <form className="bg-white py-2 px-4">
              <Message
                success={message?.success}
                error={message?.error}
                message={message?.message}
              />

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
                    disabled={disabled}
                  />
                </div>

                <div className="col-lg-6">
                  <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    placeholder=" Doe"
                    value={data?.lastName}
                    onChange={onChange}
                    disabled={disabled}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <Input
                    type="text"
                    id="username"
                    name="username"
                    label="Username"
                    placeholder="username"
                    onChange={onChange}
                    value={data?.username}
                    disabled={disabled}
                  />
                </div>
                <div className="col-lg-6">
                  <Input
                    type="text"
                    id="email"
                    name="email"
                    label="Email"
                    placeholder="john.doe@gmail.com"
                    onChange={onChange}
                    value={data?.email}
                    disabled={disabled}
                  />
                </div>
              </div>

              {user && user?.hasOwnProperty("bio") && (
                <div className="row">
                  <div className="col-lg-6">
                    <Input
                      type="text"
                      id="bio"
                      name="bio"
                      label={true}
                      placeholder="Enter your Bio"
                      onChange={onChange}
                      value={data?.bio}
                      disabled={disabled}
                    />
                  </div>

                  <div className="col-lg-6">
                    <Input
                      type="text"
                      name="businessPhone"
                      id="businessPhone"
                      label="Mobile"
                      placeholder="7297743478"
                      onChange={onChange}
                      value={data?.businessPhone}
                      disabled={disabled}
                    />
                  </div>
                </div>
              )}

              <div className="mt-3">
                {disabled ? (
                  <Button
                    text="Edit"
                    type="main"
                    className="mt-2"
                    color="black"
                    textColor="white"
                    onClick={(e) => {
                      return e.preventDefault(), setDisabled(!disabled);
                    }}
                    //   disabled={loading}
                  />
                ) : (
                  <Button
                    text="Register"
                    type="main"
                    className="mt-2"
                    color="black"
                    textColor="white"
                    onClick={onSubmit}
                    //   disabled={loading}
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Profile;

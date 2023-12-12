import React, { useState } from "react";
import Container from "../components/Container";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import instance from "../components/auth/axiosConfig";
import Message from "../components/common/Message";

const Login = () => {
  const [message, setMessage] = useState({
    success: false,
    error: false,
    message: "",
  });

  const [data, setData] = useState({});

  const onChange = (e) => {
    const { name, value } = e?.target;
    let formData = { ...data };
    formData[name] = value;
    setData(formData);
  };

  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();

    

    instance
      .post("/data/login", data)
      .then((res) => {

        navigate("/");
        setTimeout(()=>{
          window?.location?.reload()
        },[10])
        if(res?.data?.hasOwnProperty('bio')){
          localStorage?.setItem("user", "instructor")
        }else{
          localStorage?.setItem("user", "other")
        }
        localStorage?.setItem("userDetails", JSON.stringify({username:res?.data?.username, id:res?.data?.personId}))
      })
      .catch((err) => {
        setMessage({
          success: false,
          error: true,
          message: err?.response?.data?.errorMessage,
        });
        // console.log(err?.response?.data?.errorMessage);
      });

      setTimeout(()=>{
        setMessage({
          success:false,
          error:false,
          message:""
        })
      },[1000])
  };

  return (
    <Container>
      <div className="row">
        <div className="col-lg-6 col-md-8 col-sm-12 mx-auto">
          <form className="form-container mt-4 pt-4 border border-1 p-4 rounded-3">
            <h6 className="fw-bold">Login</h6>

            <Message success={message?.success} error={message?.error} message={message?.message}/>

            <Input
              type="text"
              name="username"
              id="username"
              label={true}
              placeholder="Enter your username"
              onChange={onChange}
            />

            <Input
              type="password"
              name="password"
              id="password"
              label={true}
              placeholder="Enter your password"
              onChange={onChange}
            />

            <Button
              text="Login"
              type="main"
              className="mt-2"
              color="black"
              textColor="white"
              onClick={onSubmit}
              //   disabled={loading}
            />
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Login;

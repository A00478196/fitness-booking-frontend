import React from "react";
import Button from "../components/common/Button";
import home from "../assets/home.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="container-fluid home">
        <div className="row">
          <div class="col-lg-6 col-md-7 col-sm-12 bg-white vh-100 text-start postion-relative p-0">
            <div className="details d-flex flex-column">
              <h1 className="main-heading    mb-4"> Find your inner peace</h1>
              <p className="text-left text-muted w-75">
                Improve your mental and physical fitness. Join our community by
                signing up.
              </p>

              <Button
                style={{ width: "fit-content" }}
                className="mt-3"
                text="Find our Programs"
                color="black"
                textColor="white"
                onClick={() => navigate("/programs")}
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-6 vh-100">
            <div className="homeImg">
              <img src={home} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import instance from "../../components/auth/axiosConfig";
import { useLocation, useNavigate } from "react-router-dom";
import Tags from "../../components/common/Tags";
import Button from "../../components/common/Button";
import { loggedUser, userDetail } from "../../components/helpers/common";
import SectionHeader from "../../components/common/SectionHeader";

const View = () => {
  const [classDetail, setClassDetail] = useState({});

  const location = useLocation();
  let insId = location?.state;
  // console.log(location);

  useEffect(() => {
    if (insId) {
      instance
        .get(`data/classes/${insId?.id}`)
        .then((res) => setClassDetail(res?.data))
        .catch((err) => {
          console.log(err);
        });
    }
  }, [insId]);

  const navigate = useNavigate();

  let user = userDetail && JSON.parse(userDetail);

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(insId);

    instance
      .put(`data/persons/${user?.id}`, {
        classes: [
          {
            classId: `${insId?.id}`,
          },
        ],
      })
      .then((res) => {
        console.log(res);
        navigate("/classes/view");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Container>
        <div className="row">
          <div className="col-lg-8 col-md-8 col-sm-12">
            <div>
              <div className="">
                <h4>{classDetail?.program?.name}</h4>
                <div className="d-flex">
                  {classDetail?.totalCapacity !== 0 && (
                    <Tags label="Open" color="success" />
                  )}

                  <Tags label="Class" color="primary" className="ms-2" />
                </div>
                <span className="fw-9">
                  {classDetail?.program?.description}
                </span>
              </div>
              <div className="instructors d-flex align-items-center mt-3 w-">
                <div class="card border-0">
                  <div class="card-body">
                    <h6 class="card-title fw-bold fw-9">
                      {classDetail?.instructor?.firstName +
                        " " +
                        classDetail?.instructor?.lastName}
                    </h6>
                    <h6 class="card-subtitle  text-muted fw-9 mb-0">
                      Instructor
                    </h6>
                    {/* <p>{classDetail?.instructor?.person?.email}</p> */}
                  </div>
                </div>

                <div class="card border-0 ms-3">
                  <div class="card-body">
                    <h6 className="card-title fw-bold fw-9">
                      <span className="me-2">
                        {classDetail?.startTime &&
                          new Date(
                            classDetail?.startTime
                          )?.toLocaleDateString()}
                      </span>
                      -
                      <span className="ms-2">
                        {classDetail?.endTime &&
                          new Date(classDetail?.endTime)?.toLocaleDateString()}
                      </span>
                    </h6>

                    <h6 class="card-subtitle text-muted fw-9">
                      {classDetail?.startTime &&
                        new Date(
                          classDetail?.startTime
                        )?.toLocaleTimeString()}{" "}
                      -
                      {classDetail?.endTime &&
                        new Date(classDetail?.endTime)?.toLocaleTimeString()}
                    </h6>
                  </div>
                </div>

                <div class="card border-0 ms-3">
                  <div class="card-body">
                    <h6 className="card-title fw-bold fw-9">Physical</h6>

                    <h6 className="fw-9 mb-0">{classDetail?.location?.name}</h6>
                  </div>
                </div>

                {loggedUser === "instructor" && (
                  <div class="card border-0 ms-3">
                    <div class="card-body">
                      <h6 className="card-title fw-bold fw-9">Users Registered</h6>

                      <h6 className="fw-9 mb-0">{classDetail?.persons?.length}</h6>
                    </div>
                  </div>
                )}
              </div>

              <div className="register mt-3">
                {insId?.registered === false ? (
                  loggedUser &&
                  loggedUser === "other" && (
                    <button
                      type="button"
                      class="btn btn-dark"
                      data-bs-toggle="modal"
                      data-bs-target="#myModal"
                      disabled={insId?.registered}
                    >
                      Join this class
                    </button>
                  )
                ) : (
                  <p className="fst-italic fw-8 fw-bold mt-1 text-info">
                    Note: You are already registered for this class
                  </p>
                )}

                {loggedUser === null ? (
                  <p className="fst-italic fw-8 fw-bold mt-1 text-info">
                    Note: Log in to sign up for a class
                  </p>
                ) : (
                  loggedUser !==
                  "others" **
                  (
                    <p className="fst-italic fw-8 fw-bold mt-1 text-info">
                      Note: Log in to sign up for a class
                    </p>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
        {loggedUser === "instructor" && (
          <div className="row mt-3">
            <div className="col-lg-9 col-md-9 col-sm-12">
              <SectionHeader label={"List of users in your class"} />

              <div class="table-responsive">
                <table class="table table-bordered mt-2 fw-9">
                  <thead>
                    <tr>
                      <th scope="col">User</th>
                      <th scope="col">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classDetail?.persons?.length > 0 ? (
                      classDetail?.persons?.map((person, index) => {
                        return (
                          <tr>
                            <td>
                              {person?.firstName + " " + person?.lastName}
                            </td>
                            <td>{person?.email}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr className="bg-white">
                        <td colSpan="3" className="text-muted fw-bold">
                          No user has registered for your class yet!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        <div class="modal" id="myModal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Join our class</h4>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>

              <div class="modal-body">
                Are you sure you want to register for this class?
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={onSubmit}
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default View;

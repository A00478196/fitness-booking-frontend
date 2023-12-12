import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import instance from "../../components/auth/axiosConfig";
import { useLocation, useNavigate } from "react-router-dom";
import Tags from "../../components/common/Tags";
import Button from "../../components/common/Button";

const View = () => {
  const [classDetail, setClassDetail] = useState({});

  const location = useLocation();
  let insId = location?.state;

  useEffect(() => {
    if (insId) {
      instance
        .get(`data/classes/${insId}`)
        .then((res) => setClassDetail(res?.data))
        .catch((err) => {
          console.log(err);
        });
    }
  }, [insId]);

  const navigate = useNavigate();

  return (
    <>
      <Container>
        <div className="row">
          <div className="col-lg-8 col-md-8 col-sm-12">
            <div>
              <div className="header">
                <h4>{classDetail?.program?.name}</h4>
                <div className="d-flex">
                  {classDetail?.availableSpace !== 0 && (
                    <Tags label="Open" color="success" />
                  )}

                  <Tags label="Class" color="primary" className="ms-2" />
                </div>
                <span className="fw-9">
                  {classDetail?.program?.description}
                </span>
              </div>
              <div className="instructors d-flex align-items-center mt-3 w-100">
                <div class="card border-0">
                  <div class="card-body">
                    <h6 class="card-title fw-bold">
                      {classDetail?.instructor?.person?.firstName +
                        " " +
                        classDetail?.instructor?.person?.lastName}
                    </h6>
                    <h6 class="card-subtitle mb-2 text-muted fw-9">
                      Instructor
                    </h6>
                    <p>{classDetail?.instructor?.person?.email}</p>
                  </div>
                </div>

                <div class="card border-0 ms-3">
                  <div class="card-body">
                    <h6 className="card-title fw-bold">
                      {classDetail?.startTime &&
                        new Date(classDetail?.startTime)?.toLocaleDateString()}
                    </h6>

                    <h6 class="card-subtitle mb-2 text-muted fw-9">
                      {classDetail?.startTime &&
                        new Date(
                          classDetail?.startTime
                        )?.toLocaleTimeString()}{" "}
                      -
                      {classDetail?.endTime &&
                        new Date(classDetail?.endTime)?.toLocaleTimeString()}
                    </h6>
                    <h6>{classDetail?.location?.name}</h6>
                  </div>
                </div>
              </div>

              <div className="register mt-3">
                <Button
                  text="Enroll "
                  type="main"
                  className="mt-2"
                  color="black"
                  textColor="white"
                  onClick={() =>
                    navigate(`/classes/${classDetail?.id}/enroll`, {
                      state: classDetail,
                    })
                  }
                  //   disabled={loading}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default View;

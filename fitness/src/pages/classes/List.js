import React, { useEffect, useState } from "react";
import instance from "../../components/auth/axiosConfig";
import Container from "../../components/Container";
import { useNavigate } from "react-router-dom";
import EmptyMessage from "../../components/common/EmptyMessage";
import { userDetail } from "../../components/helpers/common";
import { EachList } from "../programs/Programs";

const List = () => {
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);

  let user = userDetail && JSON.parse(userDetail);

  useEffect(() => {
    instance
      .get("data/classes")
      .then((res) => setClasses(res?.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigate = useNavigate();
  return (
    <>
      <Container>
        <div className="row">
          <div className="col-lg-12 col-md-7 col-sm-12 mx-auto">
            {/* <div class="table-responsive">
              <table class="table table-bordered mt-2 fw-9">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Program</th>
                    <th scope="col">Seats Available</th>
                    <th scope="col">Instructor</th>
                    <th scope="col">Class Time</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr className="border">
                      <div class="d-flex justify-content-center ">
                        <div class="spinner-border" role="status">
                          <span class="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    </tr>
                  ) : classes?.length > 0 ? (
                    classes &&
                    classes?.map((clas, index) => {
                      console.log(clas?.persons);
                      return (
                        <>
                          <tr
                            key={index}
                            onClick={() =>
                              navigate(`/classes/view/${clas?.classId}`, {
                                state: clas?.classId,
                              })
                            }
                          >
                            <td>{index + 1}</td>
                            <td
                           
                            >
                              {clas?.program?.name}
                            </td>
                            <td>{clas?.totalCapacity}</td>
                            <td>{clas?.instructor?.firstName}</td>
                            <td>
                              <div>
                                <p>
                                  {" "}
                                  {clas?.startTime &&
                                    new Date(
                                      clas?.startTime
                                    )?.toLocaleDateString()}
                                </p>
                                <p>
                                  {" "}
                                  {clas?.startTime &&
                                    new Date(
                                      clas?.startTime
                                    )?.toLocaleTimeString()}{" "}
                                  -
                                  {clas?.endTime &&
                                    new Date(
                                      clas?.endTime
                                    )?.toLocaleTimeString()}
                                </p>
                              </div>
                            </td>
                            <td>
                              {
                                clas?.persons.filter(
                                  (e) => e.personId === user?.id
                                ).length > 0 ? (
                                  <span class="badge bg-warning text-dark">
                                    Registered
                                  </span>
                                ) : (
                                  <span class="badge bg-dark">
                                    Register Now
                                  </span>
                                )
                              }
                            </td>
                          </tr>
                        </>
                      );
                    })
                  ) : (
                    <tr className=" text-center">
                      <td colspan="4">
                        <EmptyMessage title="classes" className="" />
                      </td>{" "}
                    </tr>
                  )}
                </tbody>
              </table>
            </div> */}

            <div className="listSection">
              <div className="header"></div>
              <div className="body">
                {loading ? (
                  <div class="d-flex justify-content-center ">
                    <div class="spinner-border" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : classes?.length > 0 ? (
                  classes &&
                  classes?.map((listData, index) => {
                    return (
                      <>
                        <div
                          key={index}
                          className="border-bottom fw-9"
                          style={{ cursor: "pointer" }}
                        >
                          <EachList>
                            <div>
                              <p className="fw-bold m-0">
                                {listData?.program?.name}
                              </p>
                            </div>

                            <div>
                              <p className="listHeading">Physical Class</p>
                              <p className="fw-9">{listData?.location?.name}</p>
                            </div>
                            <div className="fw-9">
                              <p className=" fw-bold mb-1">
                                <span className="me-2">
                                  {listData?.startTime &&
                                    new Date(
                                      listData?.startTime
                                    )?.toLocaleDateString()}
                                </span>
                                -
                                <span className="ms-2">
                                  {listData?.endTime &&
                                    new Date(
                                      listData?.endTime
                                    )?.toLocaleDateString()}
                                </span>
                              </p>
                              <p class=" text-muted mb-0">
                                {listData?.startTime &&
                                  new Date(
                                    listData?.startTime
                                  )?.toLocaleTimeString()}{" "}
                                -
                                {listData?.endTime &&
                                  new Date(
                                    listData?.endTime
                                  )?.toLocaleTimeString()}
                              </p>
                            </div>
                            <div>
                              <p className="listHeading">Available Space</p>
                              <p>{listData?.totalCapacity}</p>
                            </div>
                            <div>
                              <p className="listHeading">Taught By</p>
                              <p>
                                {listData?.instructor?.firstName +
                                  " " +
                                  listData?.instructor?.lastName}
                              </p>
                            </div>
                            <div
                              onClick={() =>
                                navigate(`/classes/view/${listData?.classId}`, {
                                  state: {
                                    id: listData?.classId,
                                    registered:
                                      listData?.persons.filter(
                                        (e) => e.personId === user?.id
                                      ).length > 0
                                        ? true
                                        : false,
                                  },
                                })
                              }
                            >
                              {listData?.persons.filter(
                                (e) => e.personId === user?.id
                              ).length > 0 ? (
                                <span class="badge bg-warning text-dark p-1 py-2">
                                  Registered
                                </span>
                              ) : (
                                <span class="badge bg-dark p-1 py-2">
                                  Register Now
                                </span>
                              )}
                            </div>
                          </EachList>
                        </div>
                      </>
                    );
                  })
                ) : (
                  <tr className=" text-center">
                    <td colspan="4">
                      <EmptyMessage title={`classes`} className="" />
                    </td>{" "}
                  </tr>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default List;

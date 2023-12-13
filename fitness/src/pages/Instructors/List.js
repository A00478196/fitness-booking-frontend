import React, { useEffect, useState } from "react";
import instance from "../../components/auth/axiosConfig";
import Container from "../../components/Container";
import SectionHeader from "../../components/common/SectionHeader";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import { loggedUser, userDetail } from "../../components/helpers/common";
import EmptyMessage from "../../components/common/EmptyMessage";
import { EachList } from "../programs/Programs";

const List = () => {
  const [loading, setLoading] = useState(false);
  const [allClasses, setAllClasses] = useState([]);
  const id = 1;
  const navigate = useNavigate();
  let detail = JSON.parse(userDetail);

  useEffect(() => {
    instance
      .get(`data/instructors/${detail?.id}/classes`, {
        instructorId: 3,
      })
      .then((res) => {
        setAllClasses(res?.data);
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Container>
        <div className="row">
          <div className="col-lg-9 col-md-8 col-sm-12 mx-auto">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <SectionHeader label={"Your classes"} />
              <Button
                text={`Create`}
                // icon={<FaCirclePlus />}
                type="main"
                color="black"
                textColor="white"
                onClick={() => navigate("/instructors/class/new")}
              />
            </div>

            {/* <div class="table-responsive">
              <table class="table  mt-2 fw-9">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Program</th>
                    <th scope="col">Seats Available</th>
                    <th scope="col">Class Time</th>
                    <th scope="col">Location</th>
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
                  ) : allClasses?.length > 0 ? (
                    allClasses &&
                    allClasses?.map((clas, index) => {
                      return (
                        <>
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td
                              style={{ cursor: "pointer" }}
                              className="text-decoration-underline"
                            >
                              {clas?.program?.name}
                            </td>
                            <td>{clas?.totalCapacity}</td>
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
                            <td>{clas?.location?.name}</td>
                          </tr>
                        </>
                      );
                    })
                  ) : (
                    <tr className=" text-center">
                      <td colspan="5">
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
                ) : allClasses?.length > 0 ? (
                  allClasses &&
                  allClasses?.map((listData, index) => {
                    return (
                      <>
                        <div
                          key={index}
                          className="border-bottom fw-9"
                          style={{ cursor: "pointer" }}
                        >
                          <EachList>
                            <div>
                              <p className="fw-bold">
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
                            {loggedUser === "instructor" && (
                              <div className="d-flex flex-column">
                              <div
                                className="secondaryBtn"
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  navigate(
                                    `/classes/view/${listData?.classId}`,
                                    {
                                      state: {
                                        id: listData?.classId,
                                        registered: false,
                                      },
                                    }
                                  )
                                }
                              >
                                View Details
                              </div>

                              <div
                                className="secondaryBtn mt-2"
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  navigate(
                                    `/classes/edit/${listData?.classId}`,
                                    {
                                      state: {
                                        id: listData?.classId,
                                        registered: false,
                                      },
                                    }
                                  )
                                }
                              >
                                Edit Details
                              </div>
                              </div>
                            )}
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

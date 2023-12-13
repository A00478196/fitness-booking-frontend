import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import instance from "../../components/auth/axiosConfig";
import Container from "../../components/Container";
import SectionHeader from "../../components/common/SectionHeader";
import EmptyMessage from "../../components/common/EmptyMessage";
import { FaEye } from "react-icons/fa";
import { EachList } from "./Programs";
import { loggedUser, userDetail } from "../../components/helpers/common";
import Button from "../../components/common/Button";

const Classes = () => {
  const location = useLocation();
  const program = location?.state;
  const [programClasses, setProgramClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  let user = userDetail && JSON.parse(userDetail);

  useEffect(() => {
    setLoading(true);
    instance
      .get(`data/programs/${program?.id}/classes`)
      .then((res) => {
        setProgramClasses(res?.data);
        setLoading(false);
        console.log(res);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [program]);

  const navigate = useNavigate();

  return (
    <>
      <Container>
        <div className="row">
          <div className="col-lg-9 col-md-8 col-sm-12 mx-auto">
            <SectionHeader label={`All Classes offered for `} />{" "}
            <span className="fw-9 headingName">{program?.name}</span>
            <Button text="Qualify for this program"/>
            {/* <div class="table-responsive">
              <table class="table table-bordered  mt-2 fw-9">
                <thead>
                  <tr>
                    <th scope="col">#</th>

                    <th scope="col">Date</th>
                    <th scope="col">End Date</th>
                    <th scope="col">Available Seats</th>
                    <th scope="col">Taught By</th>
                    <th scope="col"></th>
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
                  ) : programClasses?.length > 0 ? (
                    programClasses &&
                    programClasses?.map((clas, index) => {
                      return (
                        <>
                          <tr key={index}>
                            <td>{index+1}</td>
                            <td>
                              {clas?.startTime &&
                                new Date(clas?.startTime)?.toLocaleString()}
                            </td>
                            <td>
                              {clas?.endTime &&
                                new Date(clas?.endTime)?.toLocaleString()}
                            </td>

                            <td>{clas?.totalCapacity}</td>
                            <td>{clas?.instructor?.firstName}</td>
                            <td style={{cursor:"pointer"}}   onClick={() =>
                              navigate(`/classes/view/${clas?.classId}`, {
                                state: clas?.classId,
                              })
                            }><FaEye /> <span className="text-decoration-underline">View</span> </td>
                          </tr>
                        </>
                      );
                    })
                  ) : (
                    <tr className="border text-center">
                        <td colspan="6">
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
                ) : programClasses?.length > 0 ? (
                  programClasses &&
                  programClasses?.map((listData, index) => {
                    return (
                      <>
                        <div
                          key={index}
                          className="border-bottom fw-9"
                          style={{ cursor: "pointer" }}
                        >
                          <EachList>
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
                            {loggedUser === "others" && (
                              <div
                                onClick={() =>
                                  navigate(
                                    `/classes/view/${listData?.classId}`,
                                    {
                                      state: {
                                        id: listData?.classId,
                                        registered:
                                          listData?.persons.filter(
                                            (e) => e.personId === user?.id
                                          ).length > 0
                                            ? true
                                            : false,
                                      },
                                    }
                                  )
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

export default Classes;

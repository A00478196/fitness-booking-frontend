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
import Input from "../../components/common/Input";

const Classes = () => {
  const location = useLocation();
  const program = location?.state;
  const [programClasses, setProgramClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState("")

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

  const qualify = (e) => {
    e.preventDefault();
    // if(bio!==""){
    instance
      .put(`data/instructors/${user?.id}`, {
        // bio:bio,
        programs: [
          {
            programId: program?.id,
          },
        ],
      })
      .then((res) => {
        navigate('/programs')
        window?.location?.reload();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // }
  };

  return (
    <>
      <Container>
        <div className="row">
          <div className="col-lg-9 col-md-8 col-sm-12 mx-auto">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <SectionHeader label={`All Classes offered for `} />{" "}
                <span className="fw-9 headingName">{program?.name}</span>
                {loggedUser === "instructor" &&
                  (program?.qualified ? (
                    <span
                      style={{ width: "fit-content" }}
                      class="my-3 d-block badge bg-danger"
                    >
                      Qualified
                    </span>
                  ) : (
                    <button
                      // onClick={qualify}
                      className="d-block my-3 py-2 px-1"
                      color="black"
                      textColor="white"
                      data-bs-toggle="modal"
                      data-bs-target="#qualifyModal"
                    >
                      Qualify for this program
                    </button>
                  ))}
              </div>

              <div>
                {
                  loggedUser==="instructor" && program?.qualified &&

                  <Button
                  text="Create Class"
                  type="main"
                  className="mt-2"
                  color="black"
                  textColor="white"
                  onClick={()=>navigate('/instructors/class/new')}
                  //   disabled={loading}
                />
                }
              </div>
            </div>

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
                    console.log(listData?.persons)
                    console.log(user)
                    return (
                      <>
                        <div
                          key={index}
                          className="border-bottom fw-9"
                          style={{ cursor: "pointer" }}
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
                              <p className="listHeading">Total Capacity</p>
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
                            {/* {loggedUser === "others" && (
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
                                
                              </div>
                            )} */}
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

        <div
          class="modal fade"
          id="qualifyModal"
          tabindex="-1"
          aria-labelledby="qualifyModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Qualification
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                Are you sure you want to qualify for this program?

              {/* <Input
                          type="text"
                          id="bio"
                          name="bio"
                          label={true}
                          placeholder="Enter your Bio"
                          value={bio}
                          onChange={(e)=>{setBio(e?.target?.value)}}
                        /> */}

              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-danger" onClick={qualify}>
                  Qualify
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Classes;

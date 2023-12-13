import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import instance from "../../components/auth/axiosConfig";
import SectionHeader from "../../components/common/SectionHeader";
import Checkbox from "../../components/common/Checkbox";
import EmptyMessage from "../../components/common/EmptyMessage";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const Programs = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [selectedCat, setSelectedCat] = useState("");

  const getPrograms = () => {
    instance
      .get("data/programs")
      .then((res) => setList(res?.data))
      .catch((err) => {
        console.log(err);
      });
  };

  const getInstructors = () => {
    instance
      .get("data/instructors")
      .then((res) => setList(res?.data))
      .catch((err) => {
        console.log(err);
      });
  };

  const getLocations = () => {
    instance
      .get("data/locations")
      .then((res) => setList(res?.data))
      .catch((err) => {
        console.log(err);
      });
  };

  const getClasses = () => {
    instance
      .get("data/classes")
      .then((res) => setList(res?.data))
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setSelectedCat("programs");
    getPrograms();
  }, []);

  let matchApi = {
    instructors: "/data/instructors",
    locations: "/data/locations",
    classes: "/data/classses",
    programs: "/data/programs",
  };

  const onChange = (api) => {
    console.log(api);
    setSelectedCat(api);

    if (api === "programs") {
      // setSelectedCat("programs");
      getPrograms();
    } else if (api === "instructors") {
      // setSelectedCat("instructors");
      getInstructors();
    } else if (api === "locations") {
      // setSelectedCat("locations");
      getLocations();
    } else if (api === "classes") {
      // setSelectedCat("classes");
      getClasses();
    } else {
      // setSelectedCat("programs")
      getPrograms();
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="container-fluid ">
        <div className="row">
          <div className="col-lg-3 col-md-5 col-sm-12 bg-white vh-100">
            <div className="p-3 py-5">
              <SectionHeader label={"Filter By"} className={"mb-2"} />

              <div className="search mt-2">
                {matchApi &&
                  Object?.keys(matchApi)?.map((api, index) => {
                    return (
                      <li
                        onClick={() => onChange(api)}
                        className={`text-capitalize cursor-pointer mb-2 cat ${
                          selectedCat === api ? "selectedCat" : ""
                        }`}
                      >
                        {api}
                      </li>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="col-lg-9 col-md-7 col-sm-12 p-5 mx-auto">
            <SectionHeader label={`All the available ${selectedCat}`} />

            {/* <div class="table-responsive">
              <table class="table p-2  mt-2 fw-9">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    {selectedCat === "programs" ? (
                      <>
                        <th scope="col">Program</th>
                        <th scope="col">Description</th>
                        <th></th>
                      </>
                    ) : selectedCat === "instructors" ? (
                      <>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">bio</th>
                      </>
                    ) : selectedCat === "classes" ? (
                      <>
                        <th scope="col">Name</th>
                        <th scope="col">Start Date</th>
                        <th scope="col">End Date</th>
                        <th scope="col">Available Seats</th>
                        <th scope="col">Taught By</th>
                      </>
                    ) : selectedCat === "locations" ? (
                      <>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                      </>
                    ) : (
                      ""
                    )}
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
                  ) : list?.length > 0 ? (
                    list &&
                    list?.map((listData, index) => {
                      return (
                        <>
                          <tr key={index} style={{ cursor: "pointer" }}>
                            {selectedCat === "programs" ? (
                              <>
                                <td >{index + 1}</td>
                                <td onClick={()=>navigate(`/programs/${listData?.programId}/classes`, {state:{id:listData?.programId, name:listData?.name}})}
                                  
                                >
                                  {listData?.name}
                                </td>
                                <td>
                                  {
                                    listData?.description?.length > 100 ? `${ listData?.description.substring(0, 80)} ....` :  listData?.description
                                  }
                                </td>
                                <td style={{cursor:"pointer"}}   onClick={()=>navigate(`/programs/${listData?.programId}/classes`, {state:{id:listData?.programId, name:listData?.name}})}><FaEye /> <span className="text-decoration-underline">View Class</span> </td>
                              </>
                            ) : selectedCat === "instructors" ? (
                              <>
                                <td>{index + 1}</td>
                                <td>
                                  {listData?.firstName +
                                    " " +
                                    listData?.lastName}
                                </td>
                                <td>{listData?.email}</td>
                                <td>{listData?.businessPhone || "- -"}</td>

                                <td>{listData?.bio || "- -"}</td>
                              </>
                            ) : (
                              selectedCat==="classes"?
                              <>
                                <td>{index + 1}</td>
                                <td>{listData?.program?.name}</td>
                                <td>{listData?.startTime && new Date(listData?.startTime)?.toLocaleString()}</td>
                                <td>{listData?.endTime && new Date(listData?.endTime)?.toLocaleString()}</td>
                                <td>{listData?.totalCapacity}</td>
                                <td>{listData?.instructor?.firstName + " " +listData?.instructor?.lastName}</td>
                              </>
                              :
                              selectedCat==='locations'?
                              <>
                              <td>{index + 1}</td>
                              <td>{listData?.name}</td>
                              <td>{listData?.description}</td>
                              </>
                              :
                              ''
                            )}
                          </tr>
                        </>
                      );
                    })
                  ) : (
                    <tr className=" text-center">
                      <td colspan="4">
                        <EmptyMessage title={`${selectedCat}`} className="" />
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
                ) : list?.length > 0 ? (
                  list &&
                  list?.map((listData, index) => {
                    return (
                      <>
                        <div
                          key={index}
                          className="border-bottom fw-9"
                          style={{ cursor: "pointer" }}
                        >
                          {selectedCat === "programs" ? (
                            <>
                              <EachList>
                                <div>
                                  <p
                                    className="mb-0 fw-bold"
                                    onClick={() =>
                                      navigate(
                                        `/programs/${listData?.programId}/classes`,
                                        {
                                          state: {
                                            id: listData?.programId,
                                            name: listData?.name,
                                          },
                                        }
                                      )
                                    }
                                  >
                                    {listData?.name}
                                  </p>
                                  <p className="text-muted mb-0 mt-2 fw-9">
                                    {listData?.description?.length > 100
                                      ? `${listData?.description.substring(
                                          0,
                                          80
                                        )} ....`
                                      : listData?.description}
                                  </p>
                                </div>

                                <p
                                  className="secondaryBtn"
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    navigate(
                                      `/programs/${listData?.programId}/classes`,
                                      {
                                        state: {
                                          id: listData?.programId,
                                          name: listData?.name,
                                        },
                                      }
                                    )
                                  }
                                >
                                  <span className="">View All Class</span>{" "}
                                </p>
                              </EachList>
                            </>
                          ) : selectedCat === "instructors" ? (
                            <EachList>
                              <div>
                                <p className="fw-bold m-0">
                                  {listData?.firstName +
                                    " " +
                                    listData?.lastName}
                                </p>
                                <p className="fw-9 text-muted">
                                  {listData?.bio || "- -"}
                                </p>
                              </div>
                              <div>
                                <p className="listHeading">Email</p>
                                <p>{listData?.email}</p>
                              </div>
                              <div>
                                <p className="listHeading">Phone</p>
                                <p>{listData?.businessPhone || "- -"}</p>
                              </div>
                            </EachList>
                          ) : selectedCat === "classes" ? (
                            <EachList>
                              <div>
                                <p className="fw-bold m-0">
                                  {listData?.program?.name}
                                </p>
                                <p className="fw-9">
                                  {listData?.location?.name}
                                </p>
                              </div>

                              <div className="fw-9">
                                <p className="fw-bold m-0">
                                  {" "}
                                  {listData?.startTime &&
                                    new Date(
                                      listData?.startTime
                                    )?.toLocaleDateString()}
                                  {/* {listData?.endTime &&
                                    new Date(
                                      listData?.endTime
                                    )?.toLocaleDateString()} */}
                                </p>
                                <p>
                                  {" "}
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
                            </EachList>
                          ) : selectedCat === "locations" ? (
                            <EachList>
                              <div>
                                <p className="m-0 fw-bold">{listData?.name}</p>
                                <p className="align-self-start text-muted">
                                  {listData?.description}
                                </p>
                              </div>
                              <p className="fw-bold fw-9">
                                {listData?.roomSize} sq feet
                              </p>
                            </EachList>
                          ) : (
                            ""
                          )}
                        </div>
                      </>
                    );
                  })
                ) : (
                  <tr className=" text-center">
                    <td colspan="4">
                      <EmptyMessage title={`${selectedCat}`} className="" />
                    </td>{" "}
                  </tr>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Programs;

export const EachList = ({ children }) => {
  return (
    <div className="bg-white d-flex justify-content-between align-items-center p-3">
      {children}
    </div>
  );
};

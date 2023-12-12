import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import instance from "../../components/auth/axiosConfig";
import SectionHeader from "../../components/common/SectionHeader";
import Checkbox from "../../components/common/Checkbox";
import EmptyMessage from "../../components/common/EmptyMessage";

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
  // const onChange = (e) => {
  //   let { name, value } = e?.target;
  //   let checked = e?.target?.checked;

  //   if (checked) {
  // if (value === "programs") {
  //   setSelectedCat("programs");
  //   getPrograms();
  // } else if (value === "instructors") {
  //   setSelectedCat("instructors");
  //   getInstructors();
  // } else if (value === "locations") {
  //   setSelectedCat("locations");
  //   getLocations();
  // } else if (value === "classes") {
  //   setSelectedCat("classes");
  //   getClasses();
  // }else{
  //   setSelectedCat("programs")
  //   getPrograms();
  // }
  //   } else {
  //     if (value === "programs") {
  //       setSelectedCat("");
  //     } else if (value === "instructors") {
  //       setSelectedCat("");
  //     } else if (value === "locations") {
  //       setSelectedCat("");
  //     } else if (value === "classes") {
  //       setSelectedCat("");
  //     }
  //   }
  // };

  return (
    <>
      <div className="container-fluid ">
        <div className="row">
          <div className="col-lg-3 col-md-5 col-sm-12 bg-white vh-100">
            <div className="p-3 py-5">
              <SectionHeader label={"Search By"} className={"mb-2"} />

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

            <div class="table-responsive">
              <table class="table  mt-2 fw-9">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    {selectedCat === "programs" ? (
                      <>
                        <th scope="col">Program</th>
                        <th scope="col">Description</th>
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
                          <tr key={index}>
                            {selectedCat === "programs" ? (
                              <>
                                <td>{index + 1}</td>
                                <td
                                  style={{ cursor: "pointer" }}
                                  className="text-decoration-underline"
                                >
                                  {listData?.name}
                                </td>
                                <td>{listData?.description}</td>
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
                      {/* <EmptyMessage title="preferences" className="w-100" /> */}
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Programs;

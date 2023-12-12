import React, { useEffect, useState } from "react";
import instance from "../../components/auth/axiosConfig";
import Container from "../../components/Container";
import SectionHeader from "../../components/common/SectionHeader";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import { userDetail } from "../../components/helpers/common";
import EmptyMessage from "../../components/common/EmptyMessage";

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
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Container>
        <div className="row">
          <div className="col-lg-8 col-md-8 col-sm-12 mx-auto">
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

            <div class="table-responsive">
              <table class="table  mt-2 fw-9">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Program</th>
                    <th scope="col">Seats Available</th>
                    <th scope="col">Class Time</th>
                    <th scope="col">Location</th>
                    {/* <td scope="col"></td> */}
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
                      //   console.log(clas);
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
                            <td>{clas?.availableSpace}</td>
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
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default List;

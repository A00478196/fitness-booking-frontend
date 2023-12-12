import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import instance from "../../components/auth/axiosConfig";
import Container from "../../components/Container";
import SectionHeader from "../../components/common/SectionHeader";
import EmptyMessage from "../../components/common/EmptyMessage";

const Classes = () => {
  const location = useLocation();
  const program = location?.state;
  const [programClasses, setProgramClasses] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <>
      <Container>
        <div className="row">
          <div className="col-lg-8 col-md-8 col-sm-12 mx-auto">
            <SectionHeader label={`All Classes offered by this program`} />

            <div class="table-responsive">
              <table class="table  mt-2 fw-9">
                <thead>
                  <tr>
                    <th scope="col">#</th>

                    <th scope="col">Name</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">End Date</th>
                    <th scope="col">Available Seats</th>
                    <th scope="col">Taught By</th>
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
                            <td>{clas?.name}</td>
                            <td>
                              {clas?.startDate &&
                                new Date(clas?.startDate)?.toLocaleString()}
                            </td>
                            <td>
                              {clas?.endDate &&
                                new Date(clas?.endDate)?.toLocaleString()}
                            </td>

                            <td>{clas?.availableSpace}</td>
                            <td>{clas?.instructor?.person?.firstName}</td>
                          </tr>
                        </>
                      );
                    })
                  ) : (
                    <tr className="border text-center">
                        <td colspan="4">
                        <EmptyMessage title="classes" className="" />
                      </td>{" "}
                      {/* <EmptyMessage title="preferences" className="w-100" /> */}
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

export default Classes;

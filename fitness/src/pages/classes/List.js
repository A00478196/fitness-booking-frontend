import React, { useEffect, useState } from "react";
import instance from "../../components/auth/axiosConfig";
import Container from "../../components/Container";
import { useNavigate } from "react-router-dom";

const List = () => {
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    instance
      .get("data/classes")
      .then((res) => setClasses(res?.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigate = useNavigate()
  return (
    <>
      <Container>
        <div className="row">
          <div className="col-lg-6 col-md-7 col-sm-12 mx-auto">
            <div class="table-responsive">
              <table class="table table-bordered mt-2 fw-9">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Program</th>
                    <th scope="col">Seats Available</th>
                    <th scope="col">Instructor</th>

                    {/* <th scope="col">Created On</th> */}
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
                  ) : classes?.length > 0 ? (
                    classes &&
                    classes?.map((clas, index) => {
                      //   console.log(clas);
                      return (
                        <>
                          <tr key={index} onClick={()=>navigate(`/classes/view/${clas?.id}`, {state:clas?.id})}>
                            <td>{index + 1}</td>
                            <td style={{cursor:"pointer"}} className="text-decoration-underline">{clas?.program?.name}</td>
                            <td>{clas?.availableSpace}</td>
                            <td>{clas?.instructor?.person?.firstName}</td>
                          </tr>
                        </>
                      );
                    })
                  ) : (
                    <tr className="border text-center w-100">
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

export default List;

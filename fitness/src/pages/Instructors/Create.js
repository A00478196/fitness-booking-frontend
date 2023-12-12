import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import Input from "../../components/common/Input";
import instance from "../../components/auth/axiosConfig";
import Select from "../../components/common/Select";
import Button from "../../components/common/Button";

const Create = () => {
  const [locations, setLocations] = useState([]);
  const [programs, setPrograms] = useState([]);

  function uniqueById(items) {
    const set = new Set();
    return items.filter((item) => {
      const isDuplicate = set.has(item);
      set.add({ value: item?.id, label: item?.value });
      return !isDuplicate;
    });
  }

  useEffect(() => {
    instance
      .get("data/programs")
      .then((res) => {
        if (res) {
          const unique = [...new Map(res?.data.map((m) => [m.id, m])).values()];

          setPrograms(unique);
        }
      })

      .catch((err) => {
        console.log(err);
      });

    instance
      .get("data/locations")
      .then((res) => {
        const unique = [...new Map(res?.data.map((m) => [m.id, m])).values()];

        setLocations(unique);
        //   console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Container>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 mx-auto">
            <form className="form-container p-3 rounded">
              <h6 className="fw-bold fw-9">Create a new class</h6>

              <div>
                <label class="form-label text-muted mb-0 text-capitalize fw-bold">
                  Select the Program
                </label>
                <Select options={programs} />
              </div>

              <div className="mt-2">
                <label class="form-label text-muted mb-0 text-capitalize fw-bold">
                  Select the Location
                </label>
                <Select options={locations} />
              </div>

              <Input
                type="datetime-local"
                name="startTime"
                id="startTime"
                label={true}
                className="mt-2"
              />

              <Input
                type="datetime-local"
                name="endTime"
                id="endTime"
                label={true}
              />

              <div className="mt-3">
                <Button
                  text="Create"
                  type="main"
                  className="mt-2"
                  color="black"
                  textColor="white"
                  //   onClick={onSubmit}
                  //   disabled={loading}
                />
              </div>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Create;

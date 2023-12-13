import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import Input from "../../components/common/Input";
import instance from "../../components/auth/axiosConfig";
import Select from "../../components/common/Select";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";
import { returnTimeOut, userDetail } from "../../components/helpers/common";
import Message from "../../components/common/Message";

const Create = () => {
  const [locations, setLocations] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [data, setData] = useState({});
  const [message, setMessage] = useState({
    success: false,
    error: false,
    message: "",
  });

  useEffect(() => {
    instance
      .get("data/programs")
      .then((res) => {
        if (res) {
          const unique = [
            ...new Map(res?.data.map((m) => [m.programId, m])).values(),
          ];
          setPrograms(unique);
        }
      })

      .catch((err) => {
        console.log(err);
      });

    instance
      .get("data/locations")
      .then((res) => {
        const unique = [
          ...new Map(res?.data.map((m) => [m.locationId, m])).values(),
        ];
        setLocations(unique);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onChange = (e) => {
    const { name, value } = e?.target;
    let formData = { ...data };
    formData[name] = value;
    setData(formData);
  };

  const navigate = useNavigate();

  let detail = JSON.parse(userDetail)
  // console.log(JSON.parse(userDetail))
  const onSubmit = (e) =>{
    e?.preventDefault()
    let formData = {...data}
    formData['instructor'] = {
      'personId' : parseInt(detail?.id)
    }

    formData['program'] = {
      'programId' : parseInt(formData?.programId)
    }

    formData['location'] = {
      'locationId' : parseInt(formData?.locationId)
    }

    delete formData?.locationId
    delete formData?.programId

    // formData['instructorId'] = parseInt(detail?.id)
    // formData['programId'] = parseInt(formData?.programId)
    // formData['locationId'] = parseInt(formData?.locationId)
    formData['totalCapacity'] = parseInt(formData?.totalCapacity)

    instance.post('data/classes', formData)
    .then((res)=>{
      // console.log(res)
      setTimeout(()=>{
        navigate("/instructors/class");
        // window?.location?.reload()
      },[1000])
      setMessage({
        success: true,
        error: false,
        message: "Class Created Successfully",
      });
    }).catch((err)=>{
      setMessage({
        success: false,
        error: true,
        message: err?.response?.data?.errorMessage,
      });
      console.log(err)
    })
   
    returnTimeOut(setMessage)
  }

  return (
    <>
      <Container>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 mx-auto">
            <form className="form-container p-3 rounded">
              <h6 className="fw-bold fw-9">Create a new class</h6>
              <Message success={message?.success} error={message?.error} message={message?.message}/>

              <div>
                <label class="form-label text-muted mb-0 text-capitalize fw-bold">
                  Select the Program
                </label>
                <Select
                  options={programs}
                  name="programId"
                  onChange={onChange}
                />
              </div>

              <div className="mt-2">
                <label class="form-label text-muted mb-0 text-capitalize fw-bold">
                  Select the Location
                </label>
                <Select
                  options={locations}
                  name="locationId"
                  onChange={onChange}
                />
              </div>

              <Input
                type="datetime-local"
                name="startTime"
                id="startTime"
                label={true}
                className="mt-2"
                onChange={onChange}
              />

              <Input
                type="datetime-local"
                name="endTime"
                id="endTime"
                label={true}
                onChange={onChange}
              />

              <Input
                type="number"
                name="totalCapacity"
                id="totalCapacity"
                label={true}
                onChange={onChange}
              />

              <div className="mt-3">
                <Button
                  text="Create"
                  type="main"
                  className="mt-2"
                  color="black"
                  textColor="white"
                    onClick={onSubmit}
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

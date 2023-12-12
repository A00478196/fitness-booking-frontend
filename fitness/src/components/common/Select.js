import React from "react";

const Select = (props) => {
  let { options, name, className, onChange } = props;

  return (
    <>
      <select class="form-select" aria-label="Default select example" onChange={onChange} name={name}>
        <option selected>--Select--</option>
        {options?.length > 0 &&
          options?.map((option, index) => {
            // console.log(option)
            return (
              <option key={index} value={option?.programId || option?.locationId}>
                {option?.name}
              </option>
            );
          })}
      </select>
    </>
  );
};

export default Select;

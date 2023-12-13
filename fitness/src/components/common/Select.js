import React from "react";

const Select = (props) => {
  let { options, name, className, onChange, selected } = props;

  return (
    <>
      <select
        class="form-select"
        aria-label="Default select example"
        onChange={onChange}
        name={name}
      >
        <option selected>--Select--</option>
        {options?.length > 0 &&
          options?.map((option, index) => {

            let optionalSelected =
              option?.programId === selected
                ? option?.programId
                : option?.locationId === selected
                ? option?.locationId
                : "";
            return (
              <option
                key={index}
                value={option?.programId || option?.locationId}
                selected={optionalSelected}
              >
                {option?.name}
              </option>
            );
          })}
      </select>
    </>
  );
};

export default Select;

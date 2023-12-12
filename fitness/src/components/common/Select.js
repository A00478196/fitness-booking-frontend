import React from "react";

const Select = (props) => {
  let { options, className, onChange } = props;

  return (
    <>
      <select class="form-select" aria-label="Default select example">
        <option selected>--Select--</option>
        {options?.length > 0 &&
          options?.map((option, index) => {
            return (
              <option key={index} value={option?.value}>
                {option?.name}
              </option>
            );
          })}
      </select>
    </>
  );
};

export default Select;

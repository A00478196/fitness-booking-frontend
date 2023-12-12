import React from "react";

const Checkbox = ({ name, label, onChange, className, value, checked }) => {
  // console.log(value);
  return (
    <>
      <div class="form-check"  className={className}           
>
        <input
          class="form-check-input"
          type="radio"
          value={value}
          id={name}
          name={name}
          // checked={value==="programs"}
          onChange={onChange}
        />
        <label class="form-check-label ms-2 text-capitalize" for={name}>
          {label}
        </label>
      </div>
    </>
  );
};

export default Checkbox;

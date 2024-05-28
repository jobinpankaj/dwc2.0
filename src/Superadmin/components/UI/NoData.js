import React from "react";

const NoData = ({ image }) => {
  return (
    <div class="d-flex flex-column justify-content-center align-items-center">
      <img className="w-25" src={image} />
      <h6>No Data...</h6>
    </div>
  );
};

export default NoData;

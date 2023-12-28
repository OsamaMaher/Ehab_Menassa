import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fa1, fa2, fa3 } from "@fortawesome/free-solid-svg-icons";
import { Navigate } from "react-router-dom";

const YearSection = () => {
  const navigate = useNavigate();
  return (
    <div className="row justify-content-center">
      <div
        className="col col-3 year-select"
        onClick={() => {
          navigate("/secondaryfirst");
        }}
      >
        <FontAwesomeIcon
          icon={fa1}
          size="7x"
          className="mb-3"
          style={{ color: "#000000" }}
        />
        <hr />
        <h3 id="id-1">الأول الثانوي</h3>
      </div>
      <div
        className="col col-3 mx-3 year-select"
        onClick={() => {
          navigate("/secondarysecond");
        }}
      >
        <FontAwesomeIcon
          icon={fa2}
          size="7x"
          className="mb-3"
          style={{ color: "#000000" }}
        />
        <hr />
        <h3 id="id-1">الثاني الثانوي</h3>
      </div>
      <div
        className="col col-3 year-select"
        onClick={() => {
          navigate("/secondarythird");
        }}
      >
        <FontAwesomeIcon
          icon={fa3}
          size="7x"
          className="mb-3"
          style={{ color: "#000000" }}
        />
        <hr />
        <h3 id="id-1">الثالث الثانوي</h3>
      </div>
    </div>
  );
};

export default YearSection;

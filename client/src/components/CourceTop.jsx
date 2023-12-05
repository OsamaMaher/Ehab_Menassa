import React from "react";

const CourseTop = ({ title }) => {
  return (
    <div>
      <div className="image-container">
        <img
          className="course-top-image"
          src={`/../Courses_images/background2.jpg`}
          alt="course top"
        />
        <div className="course-top-text">
          <h1>{title}</h1>
        </div>
      </div>
    </div>
  );
};

export default CourseTop;

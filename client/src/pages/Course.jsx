import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import CourseTop from "../components/CourceTop";
import VideoPlayer from "../components/VideoPlayer";

const server = process.env.REACT_APP_API_URL;

const Course = () => {
  const [card, setCard] = useState();
  const getLocation = useLocation();
  const { currentUser } = useContext(UserContext);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const cardIndex = getLocation.pathname.split("/")[3];
  const chapterId = getLocation.pathname.split("/")[2];
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchpost = async () => {
      await axiosInstance
        .get(`/course/${chapterId}/${cardIndex}`)
        .then((res) => {
          setCard(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchpost();
  }, [cardIndex, chapterId]);
  return (
    <div className="course-page">
      <CourseTop title={card?.title} />
      <div className="course-container">
        <h1>عن الدرس</h1>
        <h4>{card?.content}</h4>
        {currentUser.phoneNumber && currentUser.parentPhoneNum ? (
          <div className="accordion accordion-flush" id="course-accordion">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#course-video"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  فيديو الدرس
                </button>
              </h2>
              <div
                id="course-video"
                className="accordion-collapse collapse show"
                data-bs-parent="#course-accordion"
              >
                <div className="accordion-body">
                  <div className="video-sec">
                    {card && <VideoPlayer videoId={card?.videoID} />}
                  </div>
                </div>
              </div>
            </div>
            {card?.homeworkID && (
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    فيديو الواجب
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  data-bs-parent="#course-accordion"
                >
                  <div className="accordion-body">
                    <div className="video-sec">
                      <VideoPlayer videoId={card?.homeworkID} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {card?.homeworkID && (
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    حل اسئلة الكتاب
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  data-bs-parent="#course-accordion"
                >
                  <div className="accordion-body">
                    <div className="video-sec">
                      <VideoPlayer videoId={card?.workbookID} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center" style={{ color: "red" }}>
            <h2>
              للدخول إلى الدرس, الرجاء اكمال البيانات المطلوبة في الصفحة الشخصية
              من{" "}
              <Link to="/profile" style={{ color: "blue" }}>
                هنا
              </Link>
            </h2>
          </div>
        )}
        {currentUser?.username === "admin" && (
          <div className="d-flex justify-content-center">
            <Link
              className="btn btn-secondary"
              to={`/write/${chapterId}/${card?.id}/${cardIndex}`}
            >
              تعديل الدرس
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Course;

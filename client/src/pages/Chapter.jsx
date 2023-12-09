import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

function Chapter() {
  const [chapter, setChapter] = useState();
  const getLocation = useLocation();
  const { currentUser } = useContext(UserContext);
  const chapterId = getLocation.pathname.split("/")[3];
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchcards = async () => {
      await axiosInstance
        .get(`/onechapter/${chapterId}`)
        .then((res) => {
          setChapter(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchcards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapterId]);
  return (
    <div>
      <div className="home-posts home">
        <div className="chapter-intro">
          <h1>{chapter?.title}</h1>
        </div>
        <div className="container-fluid section">
          <div className="row">
            <div className="col-lg-9  section-text">
              <h2>في هذا الباب سنتناول مختلف الماضيع </h2>
            </div>
            <div className="col-lg-3">
              <img className="img" src="/images/lab.jpg" alt="lab" />
            </div>
          </div>
        </div>
        <div className="select-cource container-fluid" id="scrollToCources">
          <div className="row row-cols-1 row-cols-md-3 g-5 mb-5">
            {chapter?.courses.map((card) => {
              return (
                <div className="col">
                  <div className="card text-end h-100">
                    <img
                      src={
                        card.image !== "undefined"
                          ? `../../images/${card.image}`
                          : "../../images/organic.jpg"
                      }
                      className="card-img-top"
                      alt="card"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{card.title}</h5>
                      <p className="card-text">
                        {card.content.substring(0, 100) + "..."}
                      </p>
                      <div className="text-center">
                        <Link
                          className="my-btn"
                          to={`/course/${chapterId}/${chapter.courses.indexOf(
                            card
                          )}`}
                        >
                          اشترك في الدرس
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {currentUser?.username === "admin" && (
          <div>
            <Link className="btn btn-secondary" to="/write">
              اضافة دروس
            </Link>
            <Link
              className="btn btn-secondary me-4"
              to={`/writechapter/${chapterId}`}
            >
              تعديل الباب
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chapter;

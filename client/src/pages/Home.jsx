import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import SvgHome from "../components/SVG-home";
import InfoSection from "../components/HomeSections/InfoSection";
import YearSection from "../components/HomeSections/YearSection";

function Home(year) {
  const [chapters, setChapters] = useState([]);
  const getLocation = useLocation();
  const { currentUser } = useContext(UserContext);
  const axiosInstance = axios.create({
    baseURL: Process.env.REACT_APP_API_URL,
  });

  useEffect(() => {
    if (!year.year) {
      window.scrollTo(0, 0);
    } else {
      const container = document.getElementById("scrollToCources");
      container?.scrollIntoView({ behavior: "smooth" });
    }
    const fetchcards = async () => {
      await axiosInstance
        .get(`chapter/${year.year}`)
        .then((res) => {
          setChapters(res.data);
        })
        .catch((err) => console.log(err));
    };
    year.year ? fetchcards() : setChapters([]);
  }, [getLocation, year.year]);
  return (
    <div className="home">
      <div className="svg-section">
        <div className="intro">
          <h1>Chemistry</h1>
          <h2>أ/إيهاب حطاب</h2>
          {currentUser ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Link className="my-btn" to="/profile">
                إلى الملف الشخصية
              </Link>
              <a className="btn btn-dark" href="#scrollToCources">
                إلى الكورسات
              </a>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Link className="my-btn" to="/register">
                اشترك الان
              </Link>
              <Link className="btn btn-dark" to="/login">
                سجل الدخول
              </Link>
            </div>
          )}
        </div>
        <div className="svg-container">
          <SvgHome />
        </div>
      </div>
      <div className="home-posts">
        <div className="container-fluid section">
          <div className="row">
            <div className="col-lg-3">
              <img className="img" src="/images/Mr_Profile.jpg" alt="lab" />
            </div>
            <div className="col-lg-9 section-text">
              <h2>منصة الكيمياء</h2>
              {year.year ? (
                <h1>{year.year}</h1>
              ) : (
                <>
                  <br />
                  <h1>
                    المنصة بتلبي جميع احتياجاتك في مادة الكيمياء بخبرة مدرس
                    ومجهود تيم كامل
                  </h1>
                </>
              )}
            </div>
          </div>
        </div>
        {!year.year && (
          <>
            <InfoSection />
            <div className="container-fluid section">
              <YearSection />
            </div>
          </>
        )}
        {year.year && (
          <>
            <div className="select-cource container-fluid" id="scrollToCources">
              <div className="row row-cols-1 row-cols-md-3 g-5 mb-5">
                {chapters.map((chapter) => {
                  return (
                    <div className="col">
                      <div className="card text-end h-100">
                        <img
                          src={
                            chapter.image !== "undefined"
                              ? `images/${chapter.image}`
                              : "images/sience.jpg"
                          }
                          className="card-img-top"
                          alt="card"
                        />
                        <div className="card-body">
                          <h5 className="card-title">{chapter.title}</h5>
                          <p className="card-text">
                            {chapter.content.substring(0, 100) + "..."}
                          </p>
                          <div className="text-center">
                            <Link
                              className="my-btn"
                              to={`/chapter/chapter/${chapter._id}`}
                            >
                              ادخل إلى الباب
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
                <Link className="btn btn-secondary mb-5" to="/writechapter">
                  اضافة باب
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Home;

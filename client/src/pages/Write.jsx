import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { useFormik, Field, FormikProvider } from "formik";
import * as Yup from "yup";
import { UserContext } from "../context/UserContext";

function Write() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [Id, setId] = useState();
  const [card, setCard] = useState();
  const [chapters, setChapters] = useState([]);
  const getLocation = useLocation();
  const { curyear } = useContext(UserContext);
  const cardId = getLocation.pathname.split("/")[4];
  const chapterId = getLocation.pathname.split("/")[2];
  const history = useNavigate();
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  useEffect(() => {
    const fetchpost = async () => {
      cardId &&
        (await axiosInstance
          .get(`/course/${chapterId}/${cardId}`)
          .then((res) => {
            setCard(res.data);
            setId(res.data._id);
          })
          .catch((err) => console.log(err)));
      await axiosInstance
        .get(`/chapter/${curyear}`)
        .then((res) => {
          setChapters(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchpost();
  }, [cardId, chapterId, curyear]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: cardId ? card?.title : "",
      content: cardId ? card?.content : "",
      videoID: cardId ? card?.videoID : "",
      homeworkID: cardId ? card?.homeworkID : "",
      workbookID: cardId ? card?.workbookID : "",
      chapter: cardId ? card?.chapter : "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
     //   .max(100, "Must be 100 characters or less")
        .required("Required"),
      content: Yup.string()
     //   .max(1000, "Must be 1000 characters or less")
        .required("Required"),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("imageFile", selectedImage);
      Id && formData.append("Id", `${card.id}`);
      formData.append("image", selectedImage?.name);
      formData.append("values", JSON.stringify(values));
      console.log(values?.chapter);
      console.log(curyear);
      axiosInstance.post(`/course/${curyear}/${values?.chapter}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      history("/");
    },
  });

  const handleDelete = async () => {
    var retVal = window.confirm("هل أنت متأكد من الحذف ؟");
    if (retVal === true) {
      await axiosInstance
        .delete(`/write/delete/${card.id}/${chapterId}`)
        .catch((err) => {
          console.log(err);
        });
      return true;
    } else {
      return false;
    }
  };
  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <div className="container write">
          <div className="write-body">
            <input
              id="title"
              name="title"
              className="form-control"
              type="text"
              placeholder="عنوان الدرس"
              autoComplete="off"
              {...formik.getFieldProps("title")}
            />
            {formik.touched.title && formik.errors.title ? (
              <div>{formik.errors.title}</div>
            ) : null}
            <div className="text-box">
              <textarea
                className="text-boxarea form-control"
                placeholder="عن الدرس"
                id="content"
                name="content"
                {...formik.getFieldProps("content")}
              />
              {formik.touched.content && formik.errors.content ? (
                <div>{formik.errors.content}</div>
              ) : null}
            </div>
          </div>
          <div className="write-menu">
            <div className="item">
              <h1>الموضوع</h1>
              <div id="radio-check">
                {chapters.map((chapter) => {
                  return (
                    <div className="form-check">
                      <label>
                        <Field
                          type="radio"
                          name="chapter"
                          value={chapter.title}
                        />
                        {chapter.title}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="item">
              <h1>الملحقات</h1>
              <input
                type="text"
                className="form-control"
                placeholder="رابط الفيديو"
                id="videoID"
                {...formik.getFieldProps("videoID")}
              />
              <input
                type="text"
                className="form-control"
                placeholder="رابط حل الواجب"
                id="homeworkID"
                {...formik.getFieldProps("homeworkID")}
              />
              <input
                type="text"
                className="form-control"
                placeholder="رابط حل الكتاب"
                id="workbookID"
                {...formik.getFieldProps("workbookID")}
              />
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                onChange={(event) => {
                  setSelectedImage(event.target.files[0]);
                }}
              />
              <label htmlFor="file" className="up-file">
                ارفع الصورة
              </label>
              <div className="buttons">
                <button className="btn btn-outline-success" type="submit">
                  حفظ
                </button>
                {cardId && (
                  <Link
                    onClick={handleDelete}
                    className="btn btn-outline-danger"
                    to="/"
                  >
                    حذف
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </FormikProvider>
  );
}

export default Write;

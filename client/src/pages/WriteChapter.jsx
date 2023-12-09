import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useFormik, Field, FormikProvider } from "formik";
import * as Yup from "yup";

function WriteChapter() {
  const history = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [Id, setId] = useState();
  const [card, setCard] = useState({
    id: "",
    title: "",
    content: "",
    videoID: "",
  });
  const getLocation = useLocation();
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const cardId = getLocation.pathname.split("/")[2];
  useEffect(() => {
    const fetchpost = async () => {
      cardId &&
        (await axiosInstance
          .get(`chapter/${cardId}`)
          .then((res) => {
            setCard(res.data[0]);
            setId(res.data[0]._id);
          })
          .catch((err) => console.log(err)));
    };
    fetchpost();
  }, [cardId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: cardId ? card?.title : "",
      content: cardId ? card?.content : "",
      year: cardId ? card?.year : "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      content: Yup.string()
        .max(100, "Must be 100 characters or less")
        .required("Required"),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("imageFile", selectedImage);
      Id && formData.append("Id", `${Id}`);
      formData.append("image", selectedImage?.name);
      formData.append("values", JSON.stringify(values));
      axiosInstance.post("/chapter", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      history("/");
    },
  });

  const handleDelete = async () => {
    await axiosInstance.delete(`delete/${cardId}`).catch((err) => {
      console.log(err);
    });
  };
  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <div className="container write">
          <div className="write-body">
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="عنوان الباب"
              id="card-title"
              autoComplete="off"
              {...formik.getFieldProps("title")}
            />
            {formik.touched.title && formik.errors.title ? (
              <div>{formik.errors.title}</div>
            ) : null}
            <div className="text-box">
              <textarea
                className="text-boxarea form-control"
                placeholder="عن الباب"
                id="card-content"
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
                <div className="form-check">
                  <label>
                    <Field type="radio" name="year" value="الأول الثانوي" />
                    الأول الثانوي
                  </label>
                </div>
                <div className="form-check">
                  <label>
                    <Field type="radio" name="year" value="الثاني الثانوي" />
                    الثاني الثانوي
                  </label>
                </div>
                <div className="form-check">
                  <label>
                    <Field type="radio" name="year" value="الثالث الثانوي" />
                    الثالث الثانوي
                  </label>
                </div>
              </div>
            </div>
            <div className="item">
              <h1>الملحقات</h1>
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

export default WriteChapter;

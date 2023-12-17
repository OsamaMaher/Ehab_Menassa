import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import EditIcon from "@mui/icons-material/Edit";
import UploadIcon from "@mui/icons-material/Upload";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const server = process.env.REACT_APP_API_URL;

function ProfilePage() {
  // const percentage = 56;
  const { currentUser } = useContext(UserContext);
  const [isDisabled, setIsDisabled] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const navigate = useNavigate();

  const { register } = useContext(UserContext);

  const handleClick = () => {
    setIsDisabled(false);
  };
  const handleDelete = () => {
    var retVal = window.confirm("هل أنت متأكد من حذف الحساب ؟");
    if (retVal === true) {
      axiosInstance.delete(`delete/${currentUser._id}`).catch((err) => {
        console.log(err);
      });
    } else {
      return false;
    }
    navigate("/");
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      userID: currentUser?._id,
      username: currentUser?.username,
      email: currentUser?.email,
      centerName: currentUser?.centerName,
      phoneNumber: currentUser?.phoneNumber,
      parentPhoneNum: currentUser?.parentPhoneNum,
      password: "",
      newPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().max(20, "عدد حروف كثيرة"),
      password: Yup.string().min(8, "كلمة السر قصيره"),
      newPassword: Yup.string().min(8, "كلمة السر قصيرة"),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("imageFile", selectedImage);
      formData.append("image", selectedImage?.name);
      formData.append("values", JSON.stringify(values));
      register(formData)
        .then(() => {})
        .catch((err) => console.log(err.response.data));
      navigate("/");
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    !currentUser && navigate("/login");
  }, []);
  return (
    <div className="profile-container home">
      <div className="row">
        <div className="col-lg-4 col-md-4 col-11 mb-5">
          <div className="card fixed-element" id="profile-avatar">
            <div className=" text-center">
              <div className="my-upload">
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                  onChange={(event) => {
                    setSelectedImage(event.target.files[0]);
                  }}
                />
                <label htmlFor="file" className="up-file">
                  <UploadIcon></UploadIcon>
                </label>
              </div>
              <img
                src={
                  currentUser?.image
                    ? `${server}images/${currentUser?.image}`
                    : "${server}images/DPP.jpeg"
                }
                className="w-50 mx-auto my-4 profile-image"
                alt="Profile avatar"
              />
            </div>
            <div
              className="list-group text-center profile-list"
              id="list-example"
            >
              <a
                className="list-group-item list-group-item-action"
                href="#list-item-1"
              >
                عن المستخدم
              </a>
              <a
                className="list-group-item list-group-item-action"
                href="#list-item-2"
              >
                التواصل
              </a>
              <a
                className="list-group-item list-group-item-action"
                href="#list-item-3"
              >
                الأمان
              </a>
            </div>
          </div>
        </div>
        <div className="col-lg-8 col-md-8">
          <form onSubmit={formik.handleSubmit}>
            <div
              data-bs-spy="scroll"
              data-bs-target="#list-example"
              data-bs-offset="0"
              data-bs-root-margin="0px 0px -40%"
              data-bs-smooth-scroll="true"
              className="scrollspy form-horizontal"
              tabIndex="0"
            >
              <div className="card col-11" id="list-item-1">
                <div className="card-body">
                  <div className="text-start">
                    <EditIcon
                      className="edit-icon"
                      onClick={handleClick}
                    ></EditIcon>
                  </div>
                  <div className="card-title">
                    <h4 className="card-title">معلومات الطالب</h4>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 control-label mt-3">
                      الاسم:
                    </label>
                    <div className="col-sm-12">
                      <input
                        type="text"
                        className="form-control"
                        name="username"
                        disabled={isDisabled}
                        {...formik.getFieldProps("username")}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-3 control-label mt-2">
                      البريد الإلكتروني:
                    </label>
                    <div className="col-sm-12">
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        {...formik.getFieldProps("email")}
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-5 control-label mt-3">
                      اسم السنتر :
                      <label className="small-info">(مطلوب للدخول للدرس)</label>
                    </label>
                    <div className="col-sm-12">
                      <select
                        className="form-control"
                        name="centerName"
                        disabled={isDisabled}
                        {...formik.getFieldProps("centerName")}
                      >
                        <option value="البهنساوي">البهنساوي</option>
                        <option value="جاردينيا">جاردينيا</option>
                        <option value="الملكة">الملكة</option>
                        <option value="اوكسفورد">اوكسفورد</option>
                        <option value="العراقي">العراقي</option>
                        <option value="IMA">IMA</option>
                        <option value="MSA">MSA</option>
                        <option value="online">Online</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-6 control-label mt-3">
                      السنة الدراسية :
                      <label className="small-info">(مطلوب للدخول للدرس)</label>
                    </label>
                    <div className="col-sm-12">
                      <select
                        className="form-control"
                        name="yearOfStudy"
                        disabled={isDisabled}
                        {...formik.getFieldProps("yearOfStudy")}
                      >
                        <option value="الأول الثانوي">الأول الثانوي</option>
                        <option value="الثاني الثانوي">الثاني الثانوي</option>
                        <option value="الثالث الثانوي">الثالث الثانوي</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card col-11 mt-5" id="list-item-2">
                <div className="card-body">
                  <div className="card-title">
                    <h4 className="card-title">معلومات التواصل:</h4>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-5 control-label mt-3">
                      رقم الهاتف:
                      <label className="small-info">(مطلوب للدخول للدرس)</label>
                    </label>
                    <div className="col-sm-12">
                      <input
                        type="tel"
                        className="form-control"
                        name="phoneNumber"
                        disabled={isDisabled}
                        {...formik.getFieldProps("phoneNumber")}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-6 control-label mt-2">
                      رقم هاتف ولي الأمر:
                      <label className="small-info">(مطلوب للدخول للدرس)</label>
                    </label>
                    <div className="col-sm-12 ">
                      <input
                        type="tel"
                        className="form-control"
                        name="parentPhoneNum"
                        disabled={isDisabled}
                        {...formik.getFieldProps("parentPhoneNum")}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="card col-11 mt-5" id="list-item-3">
                <div className="card-body">
                  <div className="card-title">
                    <h4 className="card-title">الأمان:</h4>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-3 control-label mt-3">
                      كلمة السر الحالية:
                    </label>
                    <div className="col-sm-12">
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        disabled={isDisabled}
                        {...formik.getFieldProps("password")}
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <div>{formik.errors.password}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-3 control-label mt-2">
                      كلمة السر الجديدة:
                    </label>
                    <div className="col-sm-12">
                      <input
                        type="password"
                        className="form-control"
                        name="newPassword"
                        disabled={isDisabled}
                        {...formik.getFieldProps("newPassword")}
                      />
                      {formik.touched.newPassword &&
                      formik.errors.newPassword ? (
                        <div>{formik.errors.newPassword}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-lg-9 col-sm-12 col-sm-offset-2">
                      <button type="submit" className="btn btn-primary">
                        حفظ التغييرات
                      </button>
                      <Link className="btn btn-default" to="/">
                        الخروج
                      </Link>
                    </div>
                    <div className="col-lg-3 col-12 text-start">
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={handleDelete}
                      >
                        حذف الحساب
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

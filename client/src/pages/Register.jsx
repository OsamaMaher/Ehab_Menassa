import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";

function Regester() {
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const { register } = useContext(UserContext);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().max(20, "عدد حروف كثيرة").required("مطلوب"),
      email: Yup.string().email("بريد الكتروني غير صحيح").required("مطلوب"),
      password: Yup.string().min(8, "كلمة السر قصيره").required("مطلوب"),
    }),
    onSubmit: (values) => {
      register(values)
        .then(() => {
          navigate("/success");
        })
        .catch((err) => setError(err.response.data));
    },
  });

  return (
    <FormikProvider value={formik}>
      <div>
        <div className="reg">
          <h1>التسجيل</h1>
          <form onSubmit={formik.handleSubmit}>
            <input
              required
              type="text"
              name="username"
              className="form-control"
              placeholder="اسم المستخدم"
              {...formik.getFieldProps("username")}
            />
            {formik.touched.username && formik.errors.username ? (
              <div>{formik.errors.username}</div>
            ) : null}
            <input
              required
              type="email"
              className="form-control"
              placeholder="البريد الإلكتروني (Email)"
              name="email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
            <input
              required
              type="password"
              className="form-control"
              placeholder="كلمة المرور"
              name="password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
            <button className="my-btn btn btn-success" type="submit">
              تسجيل
            </button>
            {error && <p>{error}</p>}
            <span>
              لديك حساب؟ <Link to="/login">تسجيل الدخول</Link>
            </span>
          </form>
        </div>
      </div>
    </FormikProvider>
  );
}

export default Regester;

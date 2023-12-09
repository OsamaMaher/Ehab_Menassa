// import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";

function Login() {
  const [error, setError] = useState(null);

  const { login } = useContext(UserContext);

  const navigate = useNavigate();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().max(20, "عدد حروف كثيرة").required("مطلوب"),
      password: Yup.string().min(8, "كلمة السر قصيره").required("مطلوب"),
    }),
    onSubmit: (values) => {
      login(values)
        .then((res) => {
          navigate("/");
        })
        .catch((err) => setError(err.response.data));
    },
  });

  return (
    <FormikProvider value={formik}>
      <div>
        <div className="reg">
          <h1>تسجيل الدخول</h1>
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
              type="password"
              name="password"
              className="form-control"
              placeholder="كلمة السر"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
            <button className="my-btn btn btn-success" type="submit">
              الدخول
            </button>
            {error && <p>{error}</p>}
            <span>
              لي لديك حساب؟ <Link to="/register">سجل</Link>
            </span>
          </form>
        </div>
      </div>
    </FormikProvider>
  );
}

export default Login;

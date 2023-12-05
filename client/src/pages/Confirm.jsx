import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Confirm() {
  const getLocation = useLocation();
  const token = getLocation.pathname.split("/")[2];
  const { confirm } = useContext(UserContext);

  confirm(token);
  return (
    <div>
      <div className="reg">
        <h1>تم تفعيل الحساب</h1>
        <Link className="btn btn-success" to="/">
          العودة للمنصة
        </Link>
      </div>
    </div>
  );
}

export default Confirm;

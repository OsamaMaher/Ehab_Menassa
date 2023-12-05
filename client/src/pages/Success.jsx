import React from "react";
import { Link } from "react-router-dom";

function Success() {
  return (
    <div>
      <div className="reg">
        <h1>ستصلك رسالة التفعيل على حسابك الخاص</h1>
        <Link className="btn btn-success" to="/">
          العودة للمنصة
        </Link>
      </div>
    </div>
  );
}

export default Success;

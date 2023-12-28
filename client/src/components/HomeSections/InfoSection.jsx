import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faUsers,
  faHourglassHalf,
} from "@fortawesome/free-solid-svg-icons";
import {
  faYoutube,
  faTiktok,
  faFacebook,
  faWhatsapp,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const ELEMENTS = [
  //   {
  //     id: "id-1",
  //     connectWith: [{ id: "id-2", color: "red", stroke: "dashed", edge: "step" }],
  //   },
  //   { id: "id-2", connectWith: [{ id: "id-3" }] },
  {
    id: "id-instagram",
    connectWith: [{ id: "id-facebook", color: "white" }],
  },
  {
    id: "id-facebook",
    connectWith: [{ id: "id-whatsapp", color: "white" }],
  },
  { id: "id-whatsapp", connectWith: [{ id: "id-youtube", color: "white" }] },
  {
    id: "id-tiktok",
    connectWith: [
      { id: "id-youtube", color: "white" },
      { id: "id-instagram", color: "white" },
    ],
  },
  { id: "id-youtube", connectWith: [{}] },
  { id: "id-empty", connectWith: [{}] },
];

const InfoSection = () => {
  return (
    <>
      <div className="info-section">
        <h1 className="mb-5">ايه اللي بيميزنا؟</h1>
        <div className="row">
          <div className="col-lg-4 p-3">
            <FontAwesomeIcon
              icon={faBolt}
              size="7x"
              className="mb-3"
              style={{ color: "#ffffff" }}
            />
            <hr />
            <h3 id="id-1">منصه مجانية للجميع</h3>
            <p>
              هذه المنصة مجانية ولفترة محدودة لمساعدة كافة الطلبة وتمكين الجميع
              من الاستفادة
            </p>
          </div>
          <div className="col-lg-4 p-3">
            <FontAwesomeIcon
              icon={faHourglassHalf}
              size="7x"
              className="mb-3"
              style={{ color: "#ffffff" }}
            />
            <hr />
            <h3>كل حاجه محسوبة بالدقيقة</h3>
            <p>
              عشان وقتك مهم بالنسبالنا ، فكل حاجه منظمنها بحيث نحافظلك علي وقتك
              ، بداية من حصتك هتكون في معادها ونزول الواجبات وحلول الامتحانات
              وخطة الانتهاء من المنهج والمراجعه عليه
            </p>
          </div>
          <div className="col-lg-4 p-3">
            <FontAwesomeIcon
              icon={faUsers}
              size="7x"
              className="mb-3"
              style={{ color: "#ffffff" }}
            />
            <hr />
            <h3>معاك في كل مكان</h3>
            <p id="id-2">
              عشان عارفين ان المذاكرة تقيله عليك , عملنالك شبكة تواصل اجتماعي
              مميزة , في كل ابلكيشن تدخله هتلاقينا بنحاول نوصلك المعلومة بطريقة
              مبسطه , والطريقة دي هتساعد عقلك علي استيعاب المعلومة وتثبيتها بشكل
              اسرع
            </p>
          </div>
        </div>
      </div>
      <div className="col-7">
        <div className="row justify-content-center">
          <div className="col col-3 text-center">
            <a href="https://wa.me/201113213938">
              <FontAwesomeIcon
                icon={faWhatsapp}
                size="4x"
                style={{ color: "#ffffff" }}
                id="id-whatsapp"
              />
            </a>
          </div>
          <div className="col col-3 text-center">
            <a href="https://www.facebook.com/MR.Ehab.elhattab.official">
              <FontAwesomeIcon
                icon={faFacebook}
                size="4x"
                style={{ color: "#ffffff" }}
                id="id-facebook"
              />
            </a>
          </div>
          <div className="col col-3 text-center">
            <a href="https://www.instagram.com/mr.ehab.elhattab/">
              <FontAwesomeIcon
                icon={faInstagram}
                size="4x"
                style={{ color: "#ffffff" }}
                id="id-instagram"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="col-7">
        <div className="row justify-content-center">
          <div className="col col-3 text-center">
            <a href="https://www.youtube.com/@heisenberg-in-chemistry">
              <FontAwesomeIcon
                icon={faYoutube}
                size="4x"
                style={{ color: "#ffffff" }}
                id="id-youtube"
              />
            </a>
          </div>
          <div className="col col-1" id="id-empty"></div>
          <div className="col col-3 text-center">
            <a href="https://www.tiktok.com/@mr..ehab.elhattab?is_from_webapp=1&sender_device=pc">
              <FontAwesomeIcon
                icon={faTiktok}
                size="4x"
                style={{ color: "#ffffff" }}
                id="id-tiktok"
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoSection;

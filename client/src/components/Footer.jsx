import React from "react";
// import { blue, red } from "@mui/material/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import {
  faYoutube,
  faTiktok,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <footer className="py-3 my-3">
          <hr />
          <div className="text-start row my-3 mx-auto">
            <div className="col-2 mx-2">
              <a href="https://www.instagram.com/mr.ehab.elhattab/">
                <FontAwesomeIcon icon={faInstagram} size="2xl" />
              </a>
            </div>
            <div className="col-2 mx-3">
              <a href="https://www.facebook.com/MR.Ehab.elhattab.official">
                <FontAwesomeIcon icon={faFacebook} size="2xl" />
              </a>
            </div>
            <div className="col-2 mx-3">
              <a href="https://www.tiktok.com/@mr..ehab.elhattab?is_from_webapp=1&sender_device=pc">
                <FontAwesomeIcon icon={faTiktok} size="2xl" />
              </a>
            </div>
            <div className="col-2 mx-2">
              <a href="https://www.youtube.com/@heisenberg-in-chemistry">
                <FontAwesomeIcon icon={faYoutube} size="2xl" />
              </a>
            </div>
          </div>
          <p className="text-center text-muted">
            ©️ {new Date().getFullYear()} Osama Ibrahim
          </p>
        </footer>
      </div>
    </footer>
  );
}

export default Footer;

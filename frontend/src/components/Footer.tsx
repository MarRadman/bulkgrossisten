import visaLogo from "../assets/visa.png";
import swishLogo from "../assets/swish.png";
import mastercardLogo from "../assets/mastercard.png";
import googlepayLogo from "../assets/googlepay.png";
import paypalLogo from "../assets/paypal.png";
import facebookLogo from "../assets/facebookIcon.svg";
import instagramLogo from "../assets/instagramIcon.svg";
import linkedinLogo from "../assets/linkedinIcon.svg";
import { Link } from "react-router-dom";
import "../assets/footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <footer className="py-3 my-4">
        <div className="row text-center text-md-start">
          <div className="col-md-3">
            <h5>About</h5>
            <ul className="list-unstyled text-small">
              <li>
                <Link to="#" className="text-muted" >
                  Our Team
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted" >
                  Locations
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted" >
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted" >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Help</h5>
            <ul className="list-unstyled text-small">
              <li>
                <Link to="#" className="text-muted" >
                  Support
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted" >
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted" >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Contact</h5>
            <ul className="list-unstyled text-small">
              <li>
                <Link to="#" className="text-muted" >
                  Email
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted" >
                  Phone
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted" >
                  Address
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3 text-center">
            <h5>Payment Methods</h5>
            <img
              className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
              src={visaLogo}
              alt="Visa"
              width="35"
              height="24"
            />
            <img
              className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
              src={swishLogo}
              alt="Swish"
              width="35"
              height="24"
            />
            <img
              className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
              src={mastercardLogo}
              alt="Mastercard"
              width="35"
              height="24"
            />
            <img
              className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
              src={googlepayLogo}
              alt="Google Pay"
              width="35"
              height="24"
            />
            <img
              className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
              src={paypalLogo}
              alt="Paypal"
              width="35"
              height="24"
            />
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center border-top mt-3 pt-3">
          <span className="text-muted">© 2024 Bulkgrossisten AB</span>
          <ul className="nav">
            <li className="ms-3">
              <Link to="#" className="text-muted" >
                <img
                  className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
                  src={facebookLogo}
                  alt="Paypal"
                  width="30"
                  height="24"
                />
              </Link>
            </li>
            <li className="ms-3">
              <Link to="#" className="text-muted" >
                <img
                  className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
                  src={instagramLogo}
                  alt="Paypal"
                  width="30"
                  height="24"
                />
              </Link>
            </li>
            <li className="ms-3">
              <Link to="#" className="text-muted" >
                <img
                  className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
                  src={linkedinLogo}
                  alt="Paypal"
                  width="30"
                  height="24"
                />
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

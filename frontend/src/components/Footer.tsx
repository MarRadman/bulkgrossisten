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

  const paymentLogos = [
    { src: visaLogo, alt: "Visa" },
    { src: swishLogo, alt: "Swish" },
    { src: mastercardLogo, alt: "Mastercard" },
    { src: googlepayLogo, alt: "Google Pay" },
    { src: paypalLogo, alt: "Paypal" },
  ];

  const socialLogos = [
    { src: facebookLogo, alt: "Facebook" },
    { src: instagramLogo, alt: "Instagram" },
    { src: linkedinLogo, alt: "LinkedIn" },
  ];

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
            {paymentLogos.map((logo, index) => (
              <img
                key={index}
                className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
                src={logo.src}
                alt={logo.alt}
                width="35"
                height="24"
              />
            ))}
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center border-top mt-3 pt-3">
          <span className="text-muted">© 2024 Bulkgrossisten AB</span>
          <ul className="nav">
            {socialLogos.map((logo, index) => (
              <li className="ms-3" key={index}>
                <Link to="#" className="text-muted" >
                  <img
                    className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
                    src={logo.src}
                    alt={logo.alt}
                    width="30"
                    height="24"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

import visaLogo from '../assets/visa.png';
import swishLogo from '../assets/swish.png';
import mastercardLogo from '../assets/mastercard.png';
import googlepayLogo from '../assets/googlepay.png';
import paypalLogo from '../assets/paypal.png';
import facebookLogo from '../assets/facebook.png';
import instagramLogo from '../assets/instagram.png';
import linkedinLogo from '../assets/linkedin.png';


const Footer = () => {
  return (
    <div className="container">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
            <img className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1" src={visaLogo} alt="Visa" width="35" height="24" />
            <img className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1" src={swishLogo} alt="Swish" width="35" height="24" />
            <img className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1" src={mastercardLogo} alt="Swish" width="35" height="24" />
            <img className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1" src={googlepayLogo} alt="Swish" width="35" height="24" />
            <img className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1" src={paypalLogo} alt="Swish" width="35" height="24" />

        </div>
        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li><a href="./"><img className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1" src={facebookLogo} alt="Swish" width="30" height="24" /></a></li>
            <li><a href="./"><img className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1" src={instagramLogo} alt="Swish" width="30" height="24" /></a></li>
            <li><a href="./"><img className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1" src={linkedinLogo} alt="Swish" width="30" height="24" /></a></li>
        </ul>
      </footer>
      <span className="mb-3 mb-md-0 text-muted">© 2022 Company, Inc</span>
    </div>
  );
};

export default Footer;

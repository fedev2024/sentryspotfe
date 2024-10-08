
import CopyrightFooter from "./CopyrightFooter";
import FooterContent from "./FooterContent";
import logo from "../../../Images/logo.png"
import { Link } from "react-router-dom";
const index = ({ footerStyle = "" }) => {
  return (
  <div class="footer">
		<div class="container">
			<div class="menu-section">
				<div class="footer-one">
					<div class="logo">
						<img src="https://htmlsentryspot.vercel.app/img/company_logo_white.png"/>
						<div class="social-mdeai">
							<a href=""><i class="fa-brands fa-linkedin-in"></i></a>
							<a href=""><i class="fa-brands fa-facebook"></i></a>
							<a href=""><i class="fa-brands fa-instagram"></i></a>
							<a href=""><i class="fa-brands fa-x-twitter"></i></a>
						</div>
					</div>
				</div>
				<div class="footer-one">
					<div class="footer-menu">
						<h2>Our services</h2>
						<ul>
							<li><a href="">Why sentryspot?</a></li>
							<li><a href="">Recruiter Advice</a></li>
							<li><a href="">Customer success</a></li>
							<li><a href="">Our audience</a></li>
							<li><a href="">Work for us</a></li>
							<li><a href="">Terms and Conditions</a></li>
							<li><a href="">Cookies Policy</a></li>
							<li><a href="">Manage Preferences</a></li>
							<li><a href="">Complaints Policy</a></li>
							<li><a href="">Privacy Policy</a></li>
						</ul>
					</div>
				</div>
				<div class="footer-one">
					<div class="footer-menu">
						<h2>Services for recruiters</h2>
						<ul>
							<li><a href="">Post a job</a></li>
							<li><a href="">CV Search</a></li>
							<li><a href="">Pay for Performance</a></li>
							<li><a href="">Recruitment Agencies</a></li>
							<li><a href="">For developers</a></li>
						</ul>
					</div>
				</div>
				<div class="footer-one">
					<div class="footer-menu">
						<h2>Other services</h2>
						<ul>
							<li><a href="">Find a job</a></li>
							<li><a href="">Find a course</a></li>
							<li><a href="">Advertise a course</a></li>
							<li><a href="">Sentryspot Global</a></li>
							<li><a href="">Sentryspot Screening</a></li>
						</ul>
					</div>
				</div>
				<div class="footer-one">
					<div class="footer-menu">
						<h2>Help and contact</h2>
						<ul>
							<li><a href="">Help</a></li>
							<li><a href="">Contact Us</a></li>
							<li><a href="">Press Office</a></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
    //   {/* <!-- End Main Footer --> */}
  );
};

export default index;

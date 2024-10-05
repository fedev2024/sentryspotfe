

import "./style.css"
import blog1 from "./img/blog1.webp"
import faqimge from "./img/faqimge.webp"

const FilterJobsBox = () => {
 
  return (
    <>
      <div>
       
       
        <div className="">
          <div className="container">
            <div className="HomeBannerContent">
              <div className="BannerContent">
                <h2>One Stop AI Enabled Career Portal</h2>
                <h1>Your Career Journey Starts at SentrySpot</h1>
                <p>Your AI-powered gateway to a successful career in security services. Start your journey with smart tools for job searching, resume building, and more.</p>
                <div className="BannerBtn">
                  <button type="button">Get Started Now</button>
                </div>
              </div>
              <div className="HomeHeroMedia">
                <div className="HomeSlider">
                  <div className="">
                    <img src="https://htmlsentryspot.vercel.app/img/home-1.webp" />
                    <div className="BannerText">
                      <div className="BannerTextUpper">
                        <i className="fa-solid fa-medal" />
                        <span>
                          <h2><strong>Resume Build</strong> for Security Services</h2>
                        </span>
                      </div>
                      <div className="BannerTextUpper">
                        <i className="fa-solid fa-compass" />
                        <span>
                          <h2>Upgraded Job opportunity</h2>
                        </span>
                      </div>
                      <div className="BannerTextDowe">
                        <h2>Job seeker</h2>
                        {/* <p>From Behavioral Health to IT</p> */}
                      </div>
                    </div>
                  </div>
                  <div className="HeroSliderone">
                    <img src="img/home-2.webp" />
                    <div className="BannerText">
                      <div className="BannerTextUpper">
                        <i className="fa-solid fa-medal" />
                        <span>
                          <h2><strong>Enrolled course</strong> for IT</h2>
                        </span>
                      </div>
                      <div className="BannerTextUpper">
                        <i className="fa-solid fa-compass" />
                        <span>
                          <h2>Secured Job in IT</h2>
                        </span>
                      </div>
                      <div className="BannerTextDowe">
                        <h2>Job seeker</h2>
                        {/* <p>From Behavioral Health to IT</p> */}
                      </div>
                    </div>
                  </div>
                  <div className="HeroSliderone">
                    <img src="img/home-3.webp" />
                    <div className="BannerText">
                      <div className="BannerTextUpper">
                        <i className="fa-solid fa-medal" />
                        <span>
                          <h2><strong>Managed documentation</strong> in Sentry ID</h2>
                        </span>
                      </div>
                      <div className="BannerTextUpper">
                        <i className="fa-solid fa-compass" />
                        <span>
                          <h2>Multiple Job opportunity</h2>
                        </span>
                      </div>
                      <div className="BannerTextDowe">
                        <h2>Verified Job seeker</h2>
                        {/* <p>From Behavioral Health to IT</p> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="NavigationBtn">
                  <div className="NavPre" onclick="plusSlides(-1)">
                    <i className="fa-solid fa-chevron-left" />
                  </div>
                  <div className="NavNext" onclick="plusSlides(1)">
                    <i className="fa-solid fa-chevron-right" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ServiceCard">
          <div className="container">
            <div className="CardTop">
              <p>How We Spot Career Growth For You</p>
              <h2>AI-Powered Tools to Enhance Your Job Search</h2>
            </div>
            <div className="ProgramCards owl-carousel owl-theme">
              <a href>
                <div className="program-card tomato ">
                  <i className="fa-solid fa-forward" />
                  <div className="program-card-info">
                    <div className="heading-md">AI Skill Test</div>
                    <button className="button-tertiary tomato">Get Started</button>
                  </div>
                </div>
              </a>
              <a href>
                <div className="program-card berry">
                  <i className="fa-solid fa-compass" />
                  <div className="program-card-info">
                    <div className="heading-md">Build Your Resume</div>
                    <button className="button-tertiary berry">Explore Careers</button>
                  </div>
                </div>
              </a>
              <a href>
                <div className="program-card teal">
                  <i className="fa-solid fa-medal" />
                  <div className="program-card-info">
                    <div className="heading-md">Earn Job Skills Quickly</div>
                    <button className="button-tertiary teal">Signup to Begin</button>
                  </div>
                </div>
              </a>
              <a href>
                <div className="program-card pear">
                  <i className="fa-solid fa-clipboard-list" />
                  <div className="program-card-info">
                    <div className="heading-md">Talk To Industry Experts</div>
                    <button className="button-tertiary pear">With Community</button>
                  </div>
                </div>
              </a>
              <a href>
                <div className="program-card marigold">
                  <i className="fa-solid fa-handshake" />
                  <div className="program-card-info">
                    <div className="heading-md">Get Spotted with SentrySpot ID</div>
                    <button className="button-tertiary marigold">Get yours now</button>
                  </div>
                </div>
              </a>
              <a href>
                <div className="program-card marigold">
                  <i className="fa-solid fa-handshake" />
                  <div className="program-card-info">
                    <div className="heading-md">Verified Jobs</div>
                    <button className="button-tertiary marigold">Check Here</button>
                  </div>
                </div>
              </a>
            </div>
            {/* <div class="NavigationBtn" style="justify-content: center;">
				<div class="NavPre" id="leftButton">
					<i class="fa-solid fa-chevron-left"></i>
				</div>
				<div class="NavNext" id="rightButton">
					<i class="fa-solid fa-chevron-right"></i>
				</div>
			</div> */}
          </div>
        </div>
        <div className="FAQs">
          <div className="container">
            <div className="FaqBox">
              <div className="FaqImage">
                <img src="https://htmlsentryspot.vercel.app/img/faqimge.webp" />
              </div>
              <div className="FaqText">
                <p>SentrySpot Community</p>
                <h2>Join community to gain the support and resources you need for a smooth transition to a better career.</h2>
                <details>
                  <summary>What is SentrySpot Community?</summary>
                  <div className="content">
                    <p>The SentrySpot Community is an online platform where job seekers can connect, learn new skills, and receive guidance to advance their careers in the security services industry.</p>
                  </div>
                </details>
                <details>
                  <summary>Is it free to use?</summary>
                  <div className="content">
                    <p>Yes, the SentrySpot Community is free to join and use for job seekers looking to enhance their skills and career opportunities.</p>
                  </div>
                </details>
                <details>
                  <summary>How is this platform different?</summary>
                  <div className="content">
                    <p>SentrySpot stands out with its AI-driven platform tailored specifically for the security services industry, offering personalized job recommendations, resume-building tools, and a supportive online community to help users advance their careers efficiently.</p>
                  </div>
                </details>
                <div className="FaqBtn">
                  <button type="button">Signup to view our community</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Help">
          <div className="container">
            <div className="StatsBox">
              <div className="HelpBox">
                <div className="HelpText ">
                  <p>Verified Job Listings</p>
                  <h2>Creating Impact Every Step of the Way</h2>
                  <div className="StatsBtn">
                    <button type="button">View All Jobs</button>
                  </div>
                </div>
                {/* <div class="HelpNavigationBtn">
						<div class="HelpNavPre" id="leftButton">
							<i class="fa-solid fa-chevron-left"></i>
						</div>
						<div class="HelpNavNext" id="rightButton">
							<i class="fa-solid fa-chevron-right"></i>
						</div>
					</div> */}
              </div>
              <div className="HelpSlider slider3">
                <div className="StatsCard item">
                  <div className="StatsSlider ">
                    <div className="JobCards">
                      <i className="fa-brands fa-dropbox" />
                      <p>Dropbox</p>
                      <h2>Software Engineer (Android), Libraries</h2>
                      <div className="Location">
                        <i className="fa-solid fa-location-dot"> London, UK</i> 
                      </div>
                      <div className="Job-Tab">
                        <a href>App</a>
                        <a href>Design</a>
                        <a href>Digital</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="StatsCard item">
                  <div className="StatsSlider">
                    <div className="JobCards">
                      <i className="fa-brands fa-dropbox" />
                      <p>Dropbox</p>
                      <h2>Software Engineer (Android), Libraries</h2>
                      <div className="Location">
                        <i className="fa-solid fa-location-dot"> London, UK</i> 
                      </div>
                      <div className="Job-Tab">
                        <a href>App</a>
                        <a href>Design</a>
                        <a href>Digital</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="StatsCard item">
                  <div className="StatsSlider">
                    <div className="JobCards">
                      <i className="fa-brands fa-dropbox" />
                      <p>Dropbox</p>
                      <h2>Software Engineer (Android), Libraries</h2>
                      <div className="Location">
                        <i className="fa-solid fa-location-dot"> London, UK</i> 
                      </div>
                      <div className="Job-Tab">
                        <a href>App</a>
                        <a href>Design</a>
                        <a href>Digital</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="StatsCard item">
                  <div className="StatsSlider">
                    <div className="JobCards">
                      <i className="fa-brands fa-dropbox" />
                      <p>Dropbox</p>
                      <h2>Software Engineer (Android), Libraries</h2>
                      <div className="Location">
                        <i className="fa-solid fa-location-dot"> London, UK</i> 
                      </div>
                      <div className="Job-Tab">
                        <a href>App</a>
                        <a href>Design</a>
                        <a href>Digital</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="StatsCard item">
                  <div className="StatsSlider">
                    <div className="JobCards">
                      <i className="fa-brands fa-dropbox" />
                      <p>Dropbox</p>
                      <h2>Software Engineer (Android), Libraries</h2>
                      <div className="Location">
                        <i className="fa-solid fa-location-dot"> London, UK</i> 
                      </div>
                      <div className="Job-Tab">
                        <a href>App</a>
                        <a href>Design</a>
                        <a href>Digital</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="StatsCard item">
                  <div className="StatsSlider">
                    <div className="JobCards">
                      <i className="fa-brands fa-dropbox" />
                      <p>Dropbox</p>
                      <h2>Software Engineer (Android), Libraries</h2>
                      <div className="Location">
                        <i className="fa-solid fa-location-dot"> London, UK</i> 
                      </div>
                      <div className="Job-Tab">
                        <a href>App</a>
                        <a href>Design</a>
                        <a href>Digital</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="StatsCard item">
                  <div className="StatsSlider">
                    <div className="JobCards">
                      <i className="fa-brands fa-dropbox" />
                      <p>Dropbox</p>
                      <h2>Software Engineer (Android), Libraries</h2>
                      <div className="Location">
                        <i className="fa-solid fa-location-dot"> London, UK</i> 
                      </div>
                      <div className="Job-Tab">
                        <a href>App</a>
                        <a href>Design</a>
                        <a href>Digital</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="StatsCard item">
                  <div className="StatsSlider">
                    <div className="JobCards">
                      <i className="fa-brands fa-dropbox" />
                      <p>Dropbox</p>
                      <h2>Software Engineer (Android), Libraries</h2>
                      <div className="Location">
                        <i className="fa-solid fa-location-dot"> London, UK</i> 
                      </div>
                      <div className="Job-Tab">
                        <a href>App</a>
                        <a href>Design</a>
                        <a href>Digital</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="TabSection">
          <div className="container">
            <div className="TabHead">
              <h2>SentrySpot Careers - Training Programs &amp; Certifications</h2>
              <p>With over 100,000 customers, from individuals to some of the most respected global brands</p>
            </div>
            <div className="tab">
              <button className="tablinks active" onclick="openCity(event, '1')">Health and Safety</button>
              <button className="tablinks" onclick="openCity(event, '2')">First Aid</button>
              <button className="tablinks" onclick="openCity(event, '3')">Security</button>
              <button className="tablinks" onclick="openCity(event, '4')">Hospitality</button>
              <button className="tablinks" onclick="openCity(event, '5')">Teaching &amp; Academics</button>
              <button className="tablinks" onclick="openCity(event, '6')">Construction</button>
            </div>
            <div id={1} className="tabcontent" style={{display: 'block'}}>
              <div className="TabContentHeadr">
                <img src="https://htmlsentryspot.vercel.app/img/Tab1.webp" />
                <div className="TabIMgContent">
                  <h4>Health and Safety</h4>
                  <p>#1 Most popular topic on Hurak</p>
                  <a href>Explore Health and Safety Courses</a>
                </div>
              </div>
              <div className="slick-slider">
                <div className="element element-1">
                  <div className="InnerSlider">
                    <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="element element-2">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="element element-3">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="element element-4">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="element element-5">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="element element-6">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="element element-7">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="element element-8">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="element element-9">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="element element-10">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
              </div>
            </div>
            <div id={2} className="tabcontent">
              <div className="TabContentHeadr">
                <img src="img/Tab1.webp" />
                <div className="TabIMgContent">
                  <h4>Health and Safety</h4>
                  <p>#1 Most popular topic on Hurak</p>
                  <a href>Explore Health and Safety Courses</a>
                </div>
              </div>
              <div className="slider1">
                <div className="elements elements-1">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="elements elements-2">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="elements elements-3">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="elements elements-4">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="elements elements-5">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="elements elements-6">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="elements elements-7">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="elements elements-8">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="elements elements-9">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="elements elements-10">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
              </div>
            </div>
            <div id={3} className="tabcontent">
              <div className="TabContentHeadr">
                <img src="img/Tab1.webp" />
                <div className="TabIMgContent">
                  <h4>Health and Safety</h4>
                  <p>#1 Most popular topic on Hurak</p>
                  <a href>Explore Health and Safety Courses</a>
                </div>
              </div>
              <div className="slider2">
                <div className="element element-1">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="element element-2">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="element element-3">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="element element-4">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="element element-5">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="element element-6">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="element element-7">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="element element-8">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="element element-9">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="element element-10">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
              </div>
            </div>
            <div id={4} className="tabcontent">
              <div className="TabContentHeadr">
                <img src="img/Tab1.webp" />
                <div className="TabIMgContent">
                  <h4>Health and Safety</h4>
                  <p>#1 Most popular topic on Hurak</p>
                  <a href>Explore Health and Safety Courses</a>
                </div>
              </div>
              <div className="slider4">
                <div className="element element-1">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="element element-2">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="element element-3">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="element element-4">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="element element-5">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="element element-6">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="element element-7">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="element element-8">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="element element-9">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="element element-10">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
              </div>
            </div>
            <div id={5} className="tabcontent">
              <div className="TabContentHeadr">
                <img src="img/Tab1.webp" />
                <div className="TabIMgContent">
                  <h4>Health and Safety</h4>
                  <p>#1 Most popular topic on Hurak</p>
                  <a href>Explore Health and Safety Courses</a>
                </div>
              </div>
              <div className="slider5">
                <div className="element element-1">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="element element-2">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="element element-3">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="element element-4">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="element element-5">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="element element-6">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="element element-7">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="element element-8">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="element element-9">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="element element-10">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
              </div>
            </div>
            <div id={6} className="tabcontent">
              <div className="TabContentHeadr">
                <img src="img/Tab1.webp" />
                <div className="TabIMgContent">
                  <h4>Health and Safety</h4>
                  <p>#1 Most popular topic on Hurak</p>
                  <a href>Explore Health and Safety Courses</a>
                </div>
              </div>
              <div className="slider6">
                <div className="element element-1">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="element element-2">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="element element-3">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="element element-4">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="element element-5">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="element element-6">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="element element-7">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="element element-8">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="element element-9">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
                <div className="element element-10">
                  <div className="InnerSlider">
                      <img src="https://htmlsentryspot.vercel.app/img/InnerSlider.webp" style={{width:"150px"}} />
                    <h6>IOSH Working Safely Course</h6>
                    <p>1 Course Providers</p>
                    <h5>£107</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Blog">
          <div className="container">
            <div className="BlogHeading">
              Career Guidance by SentrySpot Editorial
            </div>
            <div className="BlogsCards">
              <a href>
                <div className="BlogBoxs">
                  <div className="Blogs-Text">
                    <img src="https://htmlsentryspot.vercel.app/img/blog1.webp" />
                    <div className="BlogInfoContainer">
                      <div className="Category">
                        Career Discovery
                      </div>
                      <div className="CardInfo">
                        <div className="Date">September 3, 2024</div>
                        <div className="Heading">How to Find a Career You Love</div>
                        <div className="Para">
                          <p>It's important to find a career you enjoy, but the process can be challenging. Check out some tips and resources for…</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
              <a href>
                <div className="BlogBoxs">
                  <div className="Blogs-Text">
                     <img src="https://htmlsentryspot.vercel.app/img/blog1.webp" />
                    <div className="BlogInfoContainer">
                      <div className="Category">
                        Career Discovery
                      </div>
                      <div className="CardInfo">
                        <div className="Date">September 3, 2024</div>
                        <div className="Heading">How to Find a Career You Love</div>
                        <div className="Para">
                          <p>It's important to find a career you enjoy, but the process can be challenging. Check out some tips and resources for…</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
              <a href>
                <div className="BlogBoxs">
                  <div className="Blogs-Text">
                     <img src="https://htmlsentryspot.vercel.app/img/blog1.webp" />
                    <div className="BlogInfoContainer">
                      <div className="Category">
                        Career Discovery
                      </div>
                      <div className="CardInfo">
                        <div className="Date">September 3, 2024</div>
                        <div className="Heading">How to Find a Career You Love</div>
                        <div className="Para">
                          <p>It's important to find a career you enjoy, but the process can be challenging. Check out some tips and resources for…</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="BlogBtn">
              <button type="button">Visit our Blog Section</button>
            </div>
          </div>
        </div>
        <div className="Talk">
          <div className="container">
            <div className="Talkbox">
              <div className="TalkInfo">
                <h2>Interested in Becoming a SentrySpot Partner?</h2>
                <div className="TalkBox">
                  <a href>Lets Talk</a>
                </div>	
              </div>
              <img src="	https://htmlsentryspot.vercel.app/img/Partner-CTA-block.webp" />
            </div>
          </div>
        </div>
        <div className="FooterSection">
          <div className="container">
            <div className="FooterCTA">
              <div className="CtaInfo">
                <span><i className="fa-solid fa-angles-right" /> <h3>Explore Top Careers, Training, and Jobs</h3></span>
                <div className="Footerbtn">
                  <button type="button">Start Your Journey</button>
                </div>
              </div>
              <div className="NewsletterConatiner">
                <h3>Get Monthly Newsletters and Career Resources</h3>
                <div className="LetterForm">
                  <form method style={{width: '100%'}}>
                    <div className="From_Section">
                      <input type="email" name="email" placeholder="Enter Your Email" />
                      <div className="FormBTn">
                        <button type="button"> Submit</button>
                      </div>
                    </div>
                  </form>
                  <p>By entering your email, you agree to our privacy policy and consent to receiving marketing emails from SkillUp.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
   
      </div>
    </>
  );
};

export default FilterJobsBox;





import topCompany from "../../data/topCompany";
import Slider from "react-slick";
import { Link } from "react-router-dom";


const TopCompany = () => {
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings} arrows={false}>
      {topCompany.slice(0, 12).map((company) => (
        <div className="company-block" key={company.id}>
          <div className="inner-box">
            <figure className="image">
              <img
               
                src={company.img}
                alt="top company"
              />
            </figure>
            <h4 className="name">
              <Link to={`/employers-single-v1/${company.id}`}>
                {company.name}
              </Link>
            </h4>
            <div className="location">
              <i className="flaticon-map-locator"></i> {company.location}
            </div>
            <Link
              to={`/employers-single-v1/${company.id}`}
              className="theme-btn btn-style-three"
            >
              {company.jobNumber} Open Position
            </Link>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default TopCompany;

import { Link } from "react-router-dom";
import blogContent from "../../data/blogs";


const Blog6 = () => {
  return (
    <>
      {blogContent.slice(0, 6).map((item) => (
        <div className="news-block col-lg-6 col-md-6 col-sm-12" key={item.id}>
          <div className="inner-box">
            <div className="image-box">
              <figure className="image">
                <img
                 
                  src={item.img}
                  alt="blog post"
                />
              </figure>
            </div>
            {/* End image-box */}

            <div className="lower-content">
              <ul className="post-meta">
                <li>
                  <a href="#">August 31, 2021</a>
                </li>
                <li>
                  <a href="#">12 Comment</a>
                </li>
              </ul>
              {/* End post meta */}

              <h3>
                <Link to={`/blog-details/${item.id}`}>{item.title}</Link>
              </h3>

              <p className="text">{item.blogText}</p>
              <Link to={`/blog-details/${item.id}`} className="read-more">
                Read More <i className="fa fa-angle-right"></i>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Blog6;

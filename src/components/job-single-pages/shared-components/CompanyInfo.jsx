import PropTypes from 'prop-types'; // Import PropTypes
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const CompanyInfo = ({ company }) => {
  return (
    <div className="bg-slate-50 p-6 rounded-lg max-w-md">
      <Link to={`/employers-single-v1/${company.id}`} className="text-blue-500 hover:text-blue-600 font-medium block mb-6">
        View company profile
      </Link>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-900 font-medium">Primary industry:</span>
          <span className="text-gray-600">{company.company_industry.name || "Software"}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-900 font-medium">Company size:</span>
          <span className="text-gray-600">{company.company_size.range || "N.A"}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-900 font-medium">Founded in:</span>
          <span className="text-gray-600">{company.founded_date || "N.A"}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-900 font-medium">Phone:</span>
          <span className="text-gray-600">{company.phone || "N.A"}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-900 font-medium">Email:</span>
          <a href="mailto:info@joio.com" className="text-gray-600 hover:text-blue-500">
            {company.email || "N.A"}
          </a>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-900 font-medium">Location:</span>
          <span className="text-gray-600">{company.city.name} {company.country.name ? ',' : " "}{company.country.name}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-900 font-medium">Social media:</span>
          <div className="flex space-x-3">
            <a href={company.facebook_link} className="text-gray-500 hover:text-blue-500">
              <Facebook size={18} />
            </a>
            <a href={company.twitter_link} className="text-gray-500 hover:text-blue-500">
              <Twitter size={18} />
            </a>
            <a href={company.instagram_link} className="text-gray-500 hover:text-blue-500">
              <Instagram size={18} />
            </a>
            <a href={company.linkedin_link} className="text-gray-500 hover:text-blue-500">
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        {/* <a 
          href={company.website_link} 
          className="mt-6 block text-center bg-blue-100 text-blue-500 py-3 rounded-lg hover:bg-blue-200 transition-colors duration-200"
        >
          Company Website
        </a> */}

<a
  href={
    company.website_link.startsWith("http://") || company.website_link.startsWith("https://")
      ? company.website_link
      : `https://${company.website_link}`
  }
  target="_blank"
  rel="noopener noreferrer"
  className="mt-6 block text-center bg-blue-100 text-blue-500 py-3 rounded-lg hover:bg-blue-200 transition-colors duration-200"
>
  Company Website
</a>
      </div>
    </div>
  );
};

// Prop validation
CompanyInfo.propTypes = {
  company: PropTypes.shape({
    company_industry: PropTypes.shape({
      name: PropTypes.string,
    }),
    company_size: PropTypes.shape({
      range: PropTypes.string,
    }),
    founded_date: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    city: PropTypes.shape({
      name: PropTypes.string,
    }),
    country: PropTypes.shape({
      name: PropTypes.string,
    }),
    facebook_link: PropTypes.string,
    twitter_link: PropTypes.string,
    instagram_link: PropTypes.string,
    linkedin_link: PropTypes.string,
    website_link: PropTypes.string,
  }).isRequired,
};

export default CompanyInfo;
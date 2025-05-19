"use client";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import styled from "styled-components";
import PropTypes from "prop-types";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    align-items: flex-start;
  }
`;

const Title = styled.h2`
  margin: 0;
  font-size: 24px;

  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

const ButtonGroup = styled.ul`
  display: flex;
  gap: 0.25rem;
  list-style: none;
  padding: 0;
  margin: 0;

  & > li {
    margin-left: 10px;

    @media (max-width: 768px) {
      margin-left: 0;
      &:nth-child(2) {
        display: none; /* Hide the Save Changes button on smaller screens */
      }
    }
  }

  & > li > a,
  & > li > button {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    font-size: 16px;

    @media (max-width: 768px) {
      padding: 2px;
      justify-content: center;
      font-size: 8px;

      & > span {
        display: none; /* Hide the text on smaller screens */
      }
    }
  }

  & > li > a > svg,
  & > li > button > svg {
    margin-right: 8px;

    @media (max-width: 768px) {
      margin-right: 0;
    }
  }
`;

const CoursePageHeader = ({ title, onAddSection, onSave, userType }) => {
  return (
    // <HeaderWrapper>
    //   <Title>{title}</Title>
    //   <ButtonGroup>
    //     <li>
    //       <button onClick={onAddSection} className="btn btn-primary">
    //         <FeatherIcon icon="plus-circle" />
    //         <span>Add Section</span>
    //       </button>
    //     </li>
    //     <li>
    //       <button onClick={onSave} className="btn btn-success-dark">
    //         <FeatherIcon icon="save" />
    //         <span>Save Changes</span>
    //       </button>
    //     </li>
    //     <li>
    //       <Link to={`/admin-dashboard/dashboard`} className="btn btn-black">
    //         <FeatherIcon icon="arrow-left" />
    //         <span>Back to Course</span>
    //       </Link>
    //     </li>
    //   </ButtonGroup>
    // </HeaderWrapper>
    <div className=" w-full flex flex-wrap justify-between items-center bg-gray-100 py-5 px-4 rounded-lg shadow-md ">
      {/* Title */}
      <h2 className="text-2xl font-semibold">{title}</h2>

      {/* Button Group */}
      <ul className="flex gap-2 list-none p-0 m-0">
        <li>
          <button
            onClick={onAddSection}
            className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            <FeatherIcon icon="plus-circle" className="mr-2" />
            <span className="hidden sm:inline">Add Section</span>
          </button>
        </li>
        <li>
          <button
            onClick={onSave}
            className="flex items-center px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition"
          >
            <FeatherIcon icon="save" className="mr-2" />
            <span className="hidden sm:inline">Save Changes</span>
          </button>
        </li>
        <li>
          <Link
            to={`/admin-dashboard/dashboard`}
            className="flex items-center px-4 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-900 transition"
          >
            <FeatherIcon icon="arrow-left" className="mr-2" />
            <span className="hidden sm:inline">Back to Course</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

// PropTypes validation
CoursePageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onAddSection: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  userType: PropTypes.string.isRequired,
};

export default CoursePageHeader;

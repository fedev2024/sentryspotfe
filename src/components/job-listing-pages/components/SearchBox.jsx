
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addKeyword } from "../../../features/filter/filterSlice";

const SearchBox = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { jobList } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  // Initialize state from URL or Redux store
  const [getKeyWord, setkeyWord] = useState(
    searchParams.get('keywords') || jobList.keyword || ''
  );

  // Keyword handler to update both Redux and URL
  const keywordHandler = (e) => {
    const keyword = e.target.value;
    
    // Update Redux store
    dispatch(addKeyword(keyword));
    
    // Update URL parameters
    const currentParams = Object.fromEntries(searchParams);
    if (keyword) {
      currentParams['keywords'] = keyword;
    } else {
      delete currentParams['keywords'];
    }
    setSearchParams(currentParams);
  };

  // Synchronize state with URL or Redux changes
  useEffect(() => {
    // Priority: URL params > Redux store
    const urlKeyword = searchParams.get('keywords');
    if (urlKeyword !== null) {
      setkeyWord(urlKeyword);
      dispatch(addKeyword(urlKeyword));
    } else {
      setkeyWord(jobList.keyword);
    }
  }, [searchParams, jobList.keyword, dispatch]);

  return (
    <>
      <input
        type="text"
        name="listing-search"
        placeholder="Job title, keywords, or company"
        value={getKeyWord}
        onChange={keywordHandler}
      />
      <span className="icon flaticon-search-3"></span>
    </>
  );
};

export default SearchBox;
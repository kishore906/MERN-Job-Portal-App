import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";

function CustomPagination({ searchJobsCount, resPerPage }) {
  const [currentPage, setCurrentPage] = useState();

  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  //console.log(searchParams);

  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  // pageNumber -> will be provided by the <Pagination /> component
  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);

    // if &page=1 exists in url we will update the page with pageNumber to the existing query string
    // if &page doesn't exists then we will append it to the url

    if (searchParams.has("page")) {
      searchParams.set("page", pageNumber);
    } else {
      searchParams.append("page", pageNumber);
    }

    // we will redirect to the mentioned pageNumber
    const path = window.location.pathname + "?" + searchParams.toString();
    navigate(path);
  };

  return (
    <div className="d-flex justify-content-center my-5">
      <Pagination
        activePage={currentPage}
        itemsCountPerPage={resPerPage}
        totalItemsCount={searchJobsCount}
        onChange={setCurrentPageNo}
        nextPageText={"Next"}
        prevPageText={"Prev"}
        firstPageText={"First"}
        lastPageText={"Last"}
        itemClass="page-item"
        linkClass="page-link"
      />
    </div>
  );
}

export default CustomPagination;

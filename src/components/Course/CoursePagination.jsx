import React from "react";
import ReactPaginate from "react-paginate";
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";

const Pagination = ({
  totalPageSize,
  pageSize,
  setCurrentPage,
  currentPage,
}) => {
  const GetPageSize = () => {
    const pageCount = Math.ceil(totalPageSize / pageSize);
    return pageCount;
  };

  const HandleChange = (page) => {
    const PageNumber = page.selected;
    setCurrentPage(PageNumber);
  };

  return (
    <ReactPaginate
      renderOnZeroPageCount={null}
      previousLabel={<HiArrowNarrowRight />}
      nextLabel={<HiArrowNarrowLeft />}
      breakLabel={"..."}
      forcePage={currentPage}
      pageCount={GetPageSize()}
      pageRangeDisplayed={4} //Display Right
      marginPagesDisplayed={2} //Display Left
      onPageChange={(page) => HandleChange(page)}
      //container
      containerClassName="border-t  border-button-300 px-4 flex items-center justify-between sm:px-0 mt-4"
      //page
      pageClassName="hidden md:-mt-px md:flex"
      pageLinkClassName="border-transparent text-toz hover:text-button-700 hover:border-button-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
      //break ...
      breakClassName="border-transparent text-toz border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
      //active
      activeClassName="border-button-500 text-button-600 border-t-4"
      //previous ->
      previousClassName="-mt-px w-0 flex-1 flex"
      previousLinkClassName="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-textHover-500 hover:text-textHover-700"
      // <- next
      nextClassName="-mt-px w-0 flex-1 flex justify-end"
      nextLinkClassName="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-textHover-500 hover:text-textHover-700"
    />
  );
};

export default Pagination;

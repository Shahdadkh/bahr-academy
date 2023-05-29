import React from "react";
import ReactPaginate from "react-paginate";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

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
      previousLabel={<HiChevronRight />}
      nextLabel={<HiChevronLeft />}
      breakLabel={"..."}
      forcePage={currentPage}
      pageCount={GetPageSize()}
      pageRangeDisplayed={4} //Display Right
      marginPagesDisplayed={2} //Display Left
      onPageChange={(page) => HandleChange(page)}
      //container
      containerClassName="bg-background-700 px-4 py-3 flex items-center justify-center border-t border-gray-200 sm:px-6 mt-4"
      //previous ->
      previousClassName="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-background-600 text-sm font-medium text-toz hover:bg-gray-50"
      previousLinkClassName="h-5 w-5 text-xl"
      // <- next
      nextClassName="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-background-600 text-sm font-medium text-toz hover:bg-gray-50"
      nextLinkClassName="h-5 w-5 text-xl"
      //page
      pageClassName="bg-background-600 border-gray-300 text-toz hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
      pageLinkClassName="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
      //break ...
      breakClassName="bg-background-600 border-gray-300 text-toz hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
      //active
      activeClassName="z-10 bg-button-50 border-button-500 text-textHover-400 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
    />
  );
};

export default Pagination;

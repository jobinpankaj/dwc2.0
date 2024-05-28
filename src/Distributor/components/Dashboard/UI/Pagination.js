import React, { useState } from "react";

const Pagination = ({
  maxPaginationCount,
  paginationCount,
  setPaginationCount,
}) => {
  const paginationArray = Array.from(
    { length: maxPaginationCount },
    (_, index) => index + 1
  );

  return (
    <>
      <nav
        aria-label="Page navigation example"
        style={{ margin: "1.5rem 0px" }}
      >
        <ul class="pagination justify-content-center">
          <li class={`page-item ${paginationCount == 1 && "disabled"}`}>
            <a
              class="page-link"
              onClick={() => setPaginationCount(paginationCount - 1)}
              tabindex="-1"
            >
              Previous
            </a>
          </li>

          {paginationArray?.map((value) => (
            <li class="page-item">
              <a
                class={`page-link ${paginationCount == value && "active"}`}
                onClick={() => setPaginationCount(value)}
              >
                {value}
              </a>
            </li>
          ))}

          <li
            class={`page-item ${
              paginationCount == maxPaginationCount && "disabled"
            }`}
          >
            <a
              class="page-link"
              onClick={() => setPaginationCount(paginationCount + 1)}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Pagination;

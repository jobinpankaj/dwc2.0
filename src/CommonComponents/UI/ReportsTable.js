import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/system";
import "../../assets/scss/dashboard.scss"
import {
  TablePagination,
  tablePaginationClasses as classes,
} from "@mui/base/TablePagination";

const CustomTablePagination = styled(TablePagination)`
  & .${classes.toolbar} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.spacer} {
    display: none;
  }

  & .${classes.actions} {
    display: flex;
    gap: 0.25rem;
  }
`;

const ReportsTable = ({
  tableData = [],
  headings = [],
  needActionBox = false,
  className = "",
}) => {
  const { t, i18n } = useTranslation();

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  let data;
  if (rowsPerPage > 0) {
    data = tableData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  } else {
    data = tableData;
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <div className="table-responsive">
        <table className={`table table-striped m-0 ${className}`}>
          <thead>
            <tr>
              {headings?.map((data) => (
                <th className="tableNameBox">{data?.toUpperCase()}</th>
              ))}
              {/* {needActionBox && <th className="tableActionBox"></th>} */}
            </tr>
          </thead>
          <tbody>
            {data && data?.length > 0 ? (
              data?.map((values, index) => {
                return (
                  <tr key={index}>
                    {
                      <td>
                        {new Date(values?.created_at)
                          ?.toLocaleDateString("en-GB")
                          .replace(new RegExp("/", "g"), "-")}
                      </td>
                    }
                    {<td>{values?.file_type}</td>}
                    {
                      <td>
                        <a
                          class="btn btn-success"
                          target="_blank"
                          href={`${values?.file_path}/${values?.filename}`}
                        >
                          Download - {values?.file_type}
                        </a>
                      </td>
                    }

                    {/* <td>
                      <div class="form-check form-switch d-inline-flex align-items-center w-auto">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          checked={
                            status === "" || status === "0" || status === "1"
                              ? ele.status === "1"
                                ? true
                                : false
                              : ele.status === "1"
                              ? true
                              : false
                          }
                          onChange={(e) =>
                            handleStatus(e.target.checked, ele.id)
                          }
                          role="switch"
                          id="flexSwitchCheck1"
                        />
                        <input
                          class="form-check-input d-none"
                          type="checkbox"
                          checked={status}
                          onChange={(e) =>
                            handleStatus(e.target.checked, ele.id)
                          }
                          role="switch"
                          id="flexSwitchCheck1"
                        />
                      </div>
                    </td> */}
                    {/* {needActionBox && (
                      <td>
                        <div className="btn-group dropstart table-action">
                          <button
                            type="button"
                            className="dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <span></span>
                          </button>
                          <ul className="dropdown-menu">
                            <li>
                              <p
                                onClick={() => handleViewSupplier(ele.id)}
                                className="dropdown-item"
                              >
                                View
                              </p>
                              <p
                                className="dropdown-item"
                                onClick={() => handleEditSupplier(ele.id)}
                              >
                                Edit
                              </p>
                              <p
                                className="dropdown-item"
                                onClick={() => handleDeleteClick(ele.id)}
                              >
                                Delete User
                              </p>
                              <p
                                className="dropdown-item"
                                onClick={() => handleSupplierLogin(ele.id)}
                              >
                                Login with this user
                              </p>
                            </li>
                          </ul>
                        </div>
                      </td>
                    )} */}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>No data show.</td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              {data.length > 0 ? (
                <CustomTablePagination
                  rowsPerPageOptions={[5, 10, 15, { label: "All", value: -1 }]}
                  labelRowsPerPage={t(
                    "admin.supplier_management.list.pagination_text"
                  )}
                  colSpan={6}
                  count={tableData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  size="small"
                  slotProps={{
                    select: {
                      "aria-label": "rows per page",
                    },
                    actions: {
                      showFirstButton: true,
                      showLastButton: true,
                    },
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  sx={{
                    ".MuiTablePagination-toolbar button": {
                      backgroundColor: "#623ead",
                      borderColor: "#623ead",
                      borderRadius: "25px",
                      color: "#fefefe",
                    },

                    ".MuiTablePagination-toolbar span": {
                      fontSize: "12px",
                    },
                  }}
                />
              ) : (
                <></>
              )}
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ReportsTable;

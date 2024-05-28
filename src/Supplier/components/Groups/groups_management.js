import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import filter from "../../assets/images/filter-icon.png"
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import { styled } from "@mui/system";
import {
    TablePagination,
    tablePaginationClasses as classes,
} from "@mui/base/TablePagination";
import '../../assets/scss/dashboard.scss';
import "../../../assets/scss/dashboard.scss";
import { NavLink, useNavigate } from "react-router-dom";
import useAuthInterceptor from "../../../utils/apis";
import { hasPermission } from "../../../CommonComponents/commonMethods";
import { GROUP_EDIT, GROUP_VIEW } from "../../../Constants/constant";
import LoadingOverlay from "react-loading-overlay";
import { useTranslation } from "react-i18next";

toast.configure();

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

const SupplierGroupsManagement = () => {
    const { t } = useTranslation();
    const token = localStorage.getItem("supplier_accessToken")
    const navigate = useNavigate()
    const apis = useAuthInterceptor()
    const [groupsList, setGroupsList] = useState("")
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);
    const [allData, setAllData] = useState(true);
    const [q, setQ] = useState("");

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                permission: "groups-view"
            }
        }

        if (hasPermission(GROUP_VIEW)) {
            apis.get('/supplier/groups', config)
                .then((res) => {
                    setLoading(false)
                    if (res.data.success === true) {
                        setGroupsList(res.data.data);
                        setAllData(res.data.data);
                    } else {
                        toast.error("Could not fetch groups. Please try again later.", { autoClose: 2000, position: toast.POSITION.TOP_CENTER, });
                    }
                })
                .catch((error) => {
                    setLoading(false)
                    if (error.message !== "revoke") {
                        toast.error("Could not fetch groups. Please try again later.", { autoClose: 2000, position: toast.POSITION.TOP_CENTER, });
                    }
                })
        }



    }, [])

    const handleInputChange = (e) => {
        setQ(e.target.value);
        const valueTosearch = e.target.value;
        const filterData = allData.filter(
            (group) =>
                group.name.toLowerCase().includes(valueTosearch.toLowerCase())
        );
        setGroupsList(filterData);
    }

    let data;
    if (rowsPerPage > 0) {
        data = groupsList.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
        );
    } else {
        data = groupsList;
    }

    return (
        <div className="container-fluid page-wrap order-manage">
            <div className="row height-inherit">

                <Sidebar userType={"supplier"} />

                <div className="col main p-0">
                    <Header title="Groups" />
                    <LoadingOverlay
                        active={loading}
                        spinner
                        styles={{
                            overlay: (base) => ({
                                ...base,
                                background: '#fefefe',
                                width: '100%',
                                '& svg circle': {
                                    stroke: 'black'
                                }
                            })
                        }}
                    >
                        <div className="container-fluid page-content-box px-3 px-sm-4">
                            <div className="row mb-3">

                            </div>
                            <div className="row">
                                <div className="col">
                                    {/* [Card] */}
                                    <div className="card user-card height-100">
                                        <div className="card-body p-0">
                                            <div className="row">
                                                <div className="col">
                                                    <div className="card-top-filter-box p-3">

                                                        <div className="search-table">
                                                            <div className="form-group">
                                                                <input type="text" className="search-input" placeholder={t(
                                                                    "supplier.inventory_management.list.search_here"
                                                                )} value={q} onChange={(e) => handleInputChange(e)}></input>
                                                            </div>
                                                        </div>

                                                        <div className="filter-row page-top-filter">

                                                            {hasPermission(GROUP_EDIT) && <NavLink to="/supplier/groups-management/create-groups" className="btn btn-purple btn-sm">{t("supplier.inventory_management.list.createGroup")}</NavLink>}

                                                            {/* <div class="dropdown right-filter">
                                                        <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                                                            <img src={filter} /> Filter
                                                        </button>
                                                        <form class="dropdown-menu p-3 ">
                                                            <div class="mb-3">
                                                                <label class="form-label">Sender</label>
                                                                <select className="form-select">
                                                                    <option selected disabled>Select Senter</option>
                                                                    <option value=''>Senter 1</option>
                                                                    <option value=''>Senter 2</option>
                                                                    <option value=''>Senter 3</option>
                                                                </select>
                                                            </div>
                                                            <div class="mb-3">
                                                                <label class="form-label">Recepient</label>
                                                                <select className="form-select">
                                                                    <option selected disabled>Select Recepient</option>
                                                                    <option value=''>Recepient 1</option>
                                                                    <option value=''>Recepient 2</option>
                                                                    <option value=''>Recepient 3</option>
                                                                </select>
                                                            </div> 
                                                            <div className="d-flex justify-content-end">
                                                                <button type="submit" class="btn btn-purple width-auto me-2">Apply</button>
                                                                <input type="reset" class="btn btn-outline-black width-auto" value="Reset" />
                                                            </div>                                       
                                                        </form>
                                                        </div> */}

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <div className="table-responsive">
                                                        <table className="table table-striped m-0">
                                                            <thead>
                                                                <tr>
                                                                    <th></th>
                                                                    <th>{t("supplier.inventory_management.list.grpName")}</th>
                                                                    <th>{t("supplier.inventory_management.list.noOfRetailer")}</th>
                                                                    <th>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    data && data.length > 0 ?
                                                                        data.map((ele) => {
                                                                            return (
                                                                                <tr>
                                                                                    <td><input type="checkbox" name="" id="" /> </td>
                                                                                    <td>{ele.name}</td>
                                                                                    <td>{ele.retailerCount}</td>
                                                                                    <td>
                                                                                        <div class="btn-group dropstart table-action float-start">
                                                                                            <button type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                                <span></span>
                                                                                            </button>
                                                                                            <ul class="dropdown-menu">
                                                                                                <li>
                                                                                                    <a className="dropdown-item" onClick={() => navigate(`/supplier/groups-management/edit-group/${ele.id}`)}>View/Edit</a>
                                                                                                </li>
                                                                                            </ul>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                            )
                                                                        })
                                                                        :
                                                                        <>No data to show</>
                                                                }

                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div className="table-pagination mb-2 mt-3">
                                                    {data.length > 0 ? (
                                                        <CustomTablePagination
                                                            rowsPerPageOptions={[
                                                                5,
                                                                10,
                                                                15,
                                                                { label: "All", value: -1 },
                                                            ]}
                                                            colSpan={6}
                                                            count={groupsList.length}
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
                                                            onRowsPerPageChange={
                                                                handleChangeRowsPerPage
                                                            }
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
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* [/Card] */}

                                </div>
                            </div>
                        </div>
                    </LoadingOverlay>

                </div>

            </div>
            {/* [Modal] */}
            <div class="modal fade" id="assignToShipment" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true" se>
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content p-3">
                        <div class="modal-header justify-content-start">
                            <h6 class="modal-title">
                                Assign to shipment
                            </h6>
                            <hr />
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>Assign 1 Order to shipment</p>
                            <div className="routeInfo mb-3">
                                Route 1:5 Orders
                            </div>
                            <div className="border-purple p-3 rounded-2">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="radio1" />
                                    <label class="form-check-label" for="radio1">
                                        New Shipment
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <label>Delivery Date</label>
                                    <div className="input-group">
                                        <input type="date" placeholder="" className="form-control rounded-pill" />
                                    </div>
                                </div>
                            </div>
                            <div className="border-purple p-3 mt-3 rounded-2">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="radio2" />
                                    <label class="form-check-label" for="radio2">
                                        Existing Shipment
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <div className="input-group">
                                        <select className="form-select rounded-pill">
                                            <option selected disabled>Supplier</option>
                                            <option>Supplier 1</option>
                                            <option>Supplier 2</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer border-0">
                            <button type="button" class="btn btn-outline-black width-auto" data-bs-dismiss="modal">{t("supplier.inventory_management.list.cancel")}</button>&nbsp;&nbsp;
                            <button type="button" class="btn btn-purple width-auto">Save</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* [/Modal] */}
        </div>

    )
}

export default SupplierGroupsManagement;
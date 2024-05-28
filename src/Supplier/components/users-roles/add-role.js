import React, {useState, useEffect} from "react"; 
import { toast } from "react-toastify";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import '../../assets/scss/dashboard.scss'
import useAuthInterceptor from "../../../utils/apis";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";

toast.configure();

const initialValues = {
    "pricing-view": false,
    "pricing-edit": false,
    "groups-view": false,
    "groups-edit": false,
    "order-view": false,
    "order-edit": false,
    "inventory-view": false,
    "inventory-edit": false,
    "product-view": false,
    "product-edit": false,
    "role-view": false,
    "role-edit": false,
    "retailer-view": false,
    "reports-view": false,
    "dashboard-view": false,
  };

const AddRole = () => {
    const token = localStorage.getItem("supplier_accessToken")
    const navigate = useNavigate()
    const apis = useAuthInterceptor()
    const [roleName, setRoleName] = useState("")
    const [values, setValues] = useState(initialValues);
    const [permissions, setPermissions] = useState("");
    const [defaultPermissions, setDefaultPermissions] = useState([]);
    const [show, setShow] = useState(false)
    const [roleError, setRoleError] = useState("")
    const [permissionError, setPermissionError] = useState("")


    const getValueId = (object, value) => {
        return Object.keys(object).find((key) => object[key] === value);
    }

    const handleCheck = (e) => {
        setValues({
          ...values,
          [e.target.name]: e.target.checked,
        });
    
        let updateArray = defaultPermissions;
        if (e.target.checked === false) {
          updateArray = updateArray.filter(function (item) {
            return item !== parseInt(e.target.value);
          });
          setDefaultPermissions(updateArray);
        } else {
          updateArray.push(parseInt(e.target.value));
          setDefaultPermissions(updateArray);
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        setShow(false)
    };

    const handleHide = () => {
        setShow(false);
        setValues(initialValues)
        setDefaultPermissions([])
    };

    const handleCreateRole = () => {
        let roleValid = true, permissionValid = true

        if(roleName === ""){
            setRoleError("Role name is required.")
            roleValid = false
        }

        if(defaultPermissions.length === 0){
            setPermissionError("Please select atleast one permission to create role.")
            permissionValid = false
        }

        if(!roleValid || !permissionValid){
            console.log("Validation error")
        }else{
            const config = {
                headers : {
                    Authorization : `Bearer ${token}`,
                    permission : "role-edit"
                }
            }

            const bodyData = {
                name : roleName,
                permissions : defaultPermissions.toString()
            }

            apis.post("/supplier/addSupplierRole", bodyData, config)
            .then((res) => {
                if(res.data.success === true){
                    navigate("/supplier/user-role-management")
                    toast.success("Role created successfully.", {autoClose: 3000, position: toast.POSITION.TOP_CENTER,});
                }else{
                    toast.error("Something went wrong. Please try again later.", {autoClose: 3000, position: toast.POSITION.TOP_CENTER,});
                }
            })
            .catch((error) => {
                if(error.message !== "revoke"){
                    toast.error("Something went wrong. Please try again later.", {autoClose: 3000, position: toast.POSITION.TOP_CENTER,});
                }
            })
        }
    }

    useEffect(() => {
        const config = {
            headers: {
                Authorization : `Bearer ${token}`,
                permission: "role-view"
            }
        }

        apis.get('/supplier/getPermission', config)
        .then((res) => {
            if(res.data.success === true){
                setPermissions(res.data.data.permissions)
            }else{
                toast.error("Something went wrong. Please try again later.", {autoClose: 3000, position: toast.POSITION.TOP_CENTER,});
            }
        })
        .catch((error) => {
            if(error.message !== "revoke"){
                toast.error("Something went wrong. Please try again later.", {autoClose: 3000, position: toast.POSITION.TOP_CENTER,});
            }
        })
    }, [])


    
    

    return(
        <div className="container-fluid page-wrap order-manage product-detail">
            <div className="row height-inherit">
                <Sidebar userType={"supplier"}/>
                <div className="col main p-0">
                    <Header title="Create Role"/>
                    <div className="container-fluid page-content-box px-3 px-sm-4">
                        <div class="row">
                            <div class="col-12 mb-3">
                                <form>
                                <div class="card user-card mb-3">
                                    <div class="card-body p-4">
                                        <div class="row">
                                            <div class="col-sm-8 col-12">
                                                
                                                    <div class="d-flex">
                                                        <div>
                                                        <label class="form-label">Role Name</label>
                                                        <input type="text" class="form-control" placeholder="Enter Role Name" value={roleName} onChange={(e) => {setRoleName(e.target.value); setRoleError("")}}/>
                                                        {roleError !== "" ? (<p className="error-label"> {roleError}</p>) : (<></>)}
                                                        </div>
                                                        <div className="m-4">
                                                        <button type="button" class="btn btn-purple width-auto" onClick={() => {setShow(true); setPermissionError("")}}>Assign Permissions</button>
                                                        {permissionError !== "" ? (<p className="error-label"> {permissionError}</p>) : (<></>)}
                                                        </div>
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex">
                                    <button type="button" class="btn btn-outline-black width-auto me-2" onClick={() => navigate("/supplier/user-role-management")}>Cancel</button>
                                    <button type="button" class="btn btn-purple width-auto" onClick={() => handleCreateRole()}>Create</button>
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                className="modal fade permissionList"
                show={show}
                centered
                onHide={() => handleHide()}
            >
                <Modal.Header closeButton>
                <Modal.Title>
                    <p>Permissions List</p>
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="row">
                    <div className="col-sm-12">
                    <div className="card shadow-none img-card">
                        <div className="card-body">
                        <form>
                            {/* [Row] */}
                            <div class="row mb-2 mb-lg-3 border-bottom align-items-center justify-content-between">
                            <div class="col-6">
                                <div class="form-check">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckDefault"
                                />
                                <label
                                    class="form-check-label"
                                    for="flexCheckDefault"
                                >
                                    Pricing Management
                                </label>
                                </div>
                            </div>
                            <div class="col-6 text-end">
                                <div class="form-check form-check-inline">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    id="inlineCheckbox1"
                                    name="pricing-view"
                                    value={
                                    permissions && permissions !== ""
                                        ? getValueId(
                                            permissions["pricing-management"],
                                            "pricing-view"
                                        )
                                        : ""
                                    }
                                    onChange={(e) => handleCheck(e)}
                                    checked={values["pricing-view"]}
                                />
                                <label class="form-check-label" for="inlineCheckbox1">
                                    View
                                </label>
                                </div>
                                <div class="form-check form-check-inline">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    id="inlineCheckbox2"
                                    name="pricing-edit"
                                    value={
                                    permissions && permissions !== ""
                                        ? getValueId(
                                            permissions["pricing-management"],
                                            "pricing-edit"
                                        )
                                        : ""
                                    }
                                    onChange={(e) => handleCheck(e)}
                                    checked={values["pricing-edit"]}
                                />
                                <label class="form-check-label" for="inlineCheckbox2">
                                    Edit
                                </label>
                                </div>
                            </div>
                            </div>
                            {/* [/Row] */}

                            {/* [Row] */}
                            <div class="row mb-2 mb-lg-3 border-bottom align-items-center justify-content-between">
                            <div class="col-6">
                                <div class="form-check">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckDefault"
                                />
                                <label
                                    class="form-check-label"
                                    for="flexCheckDefault"
                                >
                                    Groups Management
                                </label>
                                </div>
                            </div>
                            <div class="col-6 text-end">
                                <div class="form-check form-check-inline">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    id="inlineCheckbox1"
                                    name="groups-view"
                                    value={
                                    permissions && permissions !== ""
                                        ? getValueId(
                                            permissions["groups-management"],
                                            "groups-view"
                                        )
                                        : ""
                                    }
                                    onChange={(e) => handleCheck(e)}
                                    checked={values["groups-view"]}
                                />
                                <label class="form-check-label" for="inlineCheckbox1">
                                    View
                                </label>
                                </div>
                                <div class="form-check form-check-inline">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    id="inlineCheckbox2"
                                    name="groups-edit"
                                    value={
                                    permissions && permissions !== ""
                                        ? getValueId(
                                            permissions["groups-management"],
                                            "groups-edit"
                                        )
                                        : ""
                                    }
                                    onChange={(e) => handleCheck(e)}
                                    checked={values["groups-edit"]}
                                />
                                <label class="form-check-label" for="inlineCheckbox2">
                                    Edit
                                </label>
                                </div>
                            </div>
                            </div>
                            {/* [/Row] */}

                            {/* [Row] */}
                            <div class="row mb-2 mb-lg-3 border-bottom align-items-center justify-content-between">
                            <div class="col-6">
                                <div class="form-check">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckDefault"
                                />
                                <label
                                    class="form-check-label"
                                    for="flexCheckDefault"
                                >
                                    Order Management
                                </label>
                                </div>
                            </div>
                            <div class="col-6 text-end">
                                <div class="form-check form-check-inline">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    id="inlineCheckbox1"
                                    name="order-view"
                                    value={
                                    permissions && permissions !== ""
                                        ? getValueId(
                                            permissions["order-management"],
                                            "order-view"
                                        )
                                        : ""
                                    }
                                    onChange={(e) => handleCheck(e)}
                                    checked={values["order-view"]}
                                />
                                <label class="form-check-label" for="inlineCheckbox1">
                                    View
                                </label>
                                </div>
                                <div class="form-check form-check-inline">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    id="inlineCheckbox2"
                                    name="order-edit"
                                    value={
                                    permissions && permissions !== ""
                                        ? getValueId(
                                            permissions["order-management"],
                                            "order-edit"
                                        )
                                        : ""
                                    }
                                    onChange={(e) => handleCheck(e)}
                                    checked={values["order-edit"]}
                                />
                                <label class="form-check-label" for="inlineCheckbox2">
                                    Edit
                                </label>
                                </div>
                            </div>
                            </div>
                            {/* [/Row] */}

                            {/* [Row] */}
                            <div class="row mb-2 mb-lg-3 border-bottom align-items-center justify-content-between">
                            <div class="col-6">
                                <div class="form-check">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckDefault"
                                />
                                <label
                                    class="form-check-label"
                                    for="flexCheckDefault"
                                >
                                    Inventory Management
                                </label>
                                </div>
                            </div>
                            <div class="col-6 text-end">
                                <div class="form-check form-check-inline">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    id="inlineCheckbox1"
                                    name="inventory-view"
                                    value={
                                    permissions && permissions !== ""
                                        ? getValueId(
                                            permissions["inventory-management"],
                                            "inventory-view"
                                        )
                                        : ""
                                    }
                                    onChange={(e) => handleCheck(e)}
                                    checked={values["inventory-view"]}
                                />
                                <label class="form-check-label" for="inlineCheckbox1">
                                    View
                                </label>
                                </div>
                                <div class="form-check form-check-inline">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    id="inlineCheckbox2"
                                    name="inventory-edit"
                                    value={
                                    permissions && permissions !== ""
                                        ? getValueId(
                                            permissions["inventory-management"],
                                            "inventory-edit"
                                        )
                                        : ""
                                    }
                                    onChange={(e) => handleCheck(e)}
                                    checked={values["inventory-edit"]}
                                />
                                <label class="form-check-label" for="inlineCheckbox2">
                                    Edit
                                </label>
                                </div>
                            </div>
                            </div>
                            {/* [/Row] */}

                            {/* [Row] */}
                            <div class="row mb-2 mb-lg-3 border-bottom align-items-center justify-content-between">
                            <div class="col-6">
                                <div class="form-check">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckDefault"
                                />
                                <label
                                    class="form-check-label"
                                    for="flexCheckDefault"
                                >
                                    Product Management
                                </label>
                                </div>
                            </div>
                            <div class="col-6 text-end">
                                <div class="form-check form-check-inline">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    id="inlineCheckbox1"
                                    name="product-view"
                                    value={
                                    permissions && permissions !== ""
                                        ? getValueId(
                                            permissions["product-management"],
                                            "product-view"
                                        )
                                        : ""
                                    }
                                    onChange={(e) => handleCheck(e)}
                                    checked={values["product-view"]}
                                />
                                <label class="form-check-label" for="inlineCheckbox1">
                                    View
                                </label>
                                </div>
                                <div class="form-check form-check-inline">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    id="inlineCheckbox2"
                                    name="product-edit"
                                    value={
                                    permissions && permissions !== ""
                                        ? getValueId(
                                            permissions["product-management"],
                                            "product-edit"
                                        )
                                        : ""
                                    }
                                    onChange={(e) => handleCheck(e)}
                                    checked={values["product-edit"]}
                                />
                                <label class="form-check-label" for="inlineCheckbox2">
                                    Edit
                                </label>
                                </div>
                            </div>
                            </div>
                            {/* [/Row] */}

                            {/* [Row] */}
                            {/* <div class="row mb-2 mb-lg-3 border-bottom align-items-center justify-content-between">
                            <div class="col-6">
                                <div class="form-check">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckDefault"
                                />
                                <label
                                    class="form-check-label"
                                    for="flexCheckDefault"
                                >
                                    Role Management
                                </label>
                                </div>
                            </div>
                            <div class="col-6 text-end">
                                <div class="form-check form-check-inline">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    id="inlineCheckbox1"
                                    name="role-view"
                                    value={
                                    permissions && permissions !== ""
                                        ? getValueId(
                                            permissions["role-management"],
                                            "role-view"
                                        )
                                        : ""
                                    }
                                    onChange={(e) => handleCheck(e)}
                                    checked={values["role-view"]}
                                />
                                <label class="form-check-label" for="inlineCheckbox1">
                                    View
                                </label>
                                </div>
                                <div class="form-check form-check-inline">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    id="inlineCheckbox2"
                                    name="role-edit"
                                    value={
                                    permissions && permissions !== ""
                                        ? getValueId(
                                            permissions["role-management"],
                                            "role-edit"
                                        )
                                        : ""
                                    }
                                    onChange={(e) => handleCheck(e)}
                                    checked={values["role-edit"]}
                                />
                                <label class="form-check-label" for="inlineCheckbox2">
                                    Edit
                                </label>
                                </div>
                            </div>
                            </div> */}
                            {/* [/Row] */}

                            {/* [Row] */}
                            {/* <div class="row mb-2 mb-lg-3 border-bottom align-items-center justify-content-between">
                            <div class="col-6">
                                <div class="form-check">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckDefault"
                                />
                                <label
                                    class="form-check-label"
                                    for="flexCheckDefault"
                                >
                                    User Management
                                </label>
                                </div>
                            </div>
                            <div class="col-6 text-end">
                                <div class="form-check form-check-inline">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    id="inlineCheckbox1"
                                    name="user-view"
                                    value={
                                    permissions && permissions !== ""
                                        ? getValueId(
                                            permissions["user-management"],
                                            "user-view"
                                        )
                                        : ""
                                    }
                                    onChange={(e) => handleCheck(e)}
                                    checked={values["user-view"]}
                                />
                                <label class="form-check-label" for="inlineCheckbox1">
                                    View
                                </label>
                                </div>
                                <div class="form-check form-check-inline">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    id="inlineCheckbox2"
                                    name="user-edit"
                                    value={
                                    permissions && permissions !== ""
                                        ? getValueId(
                                            permissions["user-management"],
                                            "user-edit"
                                        )
                                        : ""
                                    }
                                    onChange={(e) => handleCheck(e)}
                                    checked={values["user-edit"]}
                                />
                                <label class="form-check-label" for="inlineCheckbox2">
                                    Edit
                                </label>
                                </div>
                            </div>
                            </div> */}
                            {/* [/Row] */}

                            {/* [Row] */}
                            <div class="row mb-2 mb-lg-3 border-bottom align-items-center justify-content-between">
                            <div class="col-6">
                                <div class="form-check">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckDefault"
                                />
                                <label
                                    class="form-check-label"
                                    for="flexCheckDefault"
                                >
                                    Retailers Management
                                </label>
                                </div>
                            </div>
                            <div class="col-6 text-end">
                                <div class="form-check form-check-inline">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    id="inlineCheckbox1"
                                    name="retailer-view"
                                    value={
                                    permissions && permissions !== ""
                                        ? getValueId(
                                            permissions["retailers-management"],
                                            "retailer-view"
                                        )
                                        : ""
                                    }
                                    onChange={(e) => handleCheck(e)}
                                    checked={values["retailer-view"]}
                                />
                                <label class="form-check-label" for="inlineCheckbox1">
                                    View
                                </label>
                                </div>
                                <div class="form-check form-check-inline">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    id="inlineCheckbox2"
                                    disabled
                                />
                                <label class="form-check-label" for="inlineCheckbox2">
                                    Edit
                                </label>
                                </div>
                            </div>
                            </div>
                            {/* [/Row] */}

                            {/* [Row] */}
                            <div class="row mb-2 mb-lg-3 border-bottom align-items-center justify-content-between">
                            <div class="col-6">
                                <div class="form-check">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckDefault"
                                />
                                <label
                                    class="form-check-label"
                                    for="flexCheckDefault"
                                >
                                    Reports Management
                                </label>
                                </div>
                            </div>
                            <div class="col-6 text-end">
                                <div class="form-check form-check-inline">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    id="inlineCheckbox1"
                                    name="reports-view"
                                    value={
                                    permissions && permissions !== ""
                                        ? getValueId(
                                            permissions["reports-management"],
                                            "reports-view"
                                        )
                                        : ""
                                    }
                                    onChange={(e) => handleCheck(e)}
                                    checked={values["reports-view"]}
                                />
                                <label class="form-check-label" for="inlineCheckbox1">
                                    View
                                </label>
                                </div>
                                <div class="form-check form-check-inline">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    id="inlineCheckbox2"
                                    value="option2"
                                    disabled
                                />
                                <label class="form-check-label" for="inlineCheckbox2">
                                    Edit
                                </label>
                                </div>
                            </div>
                            </div>
                            {/* [/Row] */}

                            {/* [Row] */}
                            <div class="row mb-2 mb-lg-3 align-items-center justify-content-between">
                            <div class="col-6 ">
                                <div class="form-check">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckDefault"
                                />
                                <label
                                    class="form-check-label"
                                    for="flexCheckDefault"
                                >
                                    Dashboard
                                </label>
                                </div>
                            </div>
                            <div class="col-6 text-end">
                                <div class="form-check form-check-inline">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    id="inlineCheckbox1"
                                    name="dashboard-view"
                                    value={
                                    permissions && permissions !== ""
                                        ? getValueId(
                                            permissions["dashboard-management"],
                                            "dashboard-view"
                                        )
                                        : ""
                                    }
                                    onChange={(e) => handleCheck(e)}
                                    checked={values["dashboard-view"]}
                                />
                                <label class="form-check-label" for="inlineCheckbox1">
                                    View
                                </label>
                                </div>
                                <div class="form-check form-check-inline">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    id="inlineCheckbox2"
                                    value="option2"
                                    disabled
                                />
                                <label class="form-check-label" for="inlineCheckbox2">
                                    Edit
                                </label>
                                </div>
                            </div>
                            </div>
                            {/* [/Row] */}

                            <div className="row mt-4">
                            <div className="col text-center">
                                <button
                                type="button"
                                // onClick={() => navigate(backpath)}
                                className="btn btn-outline-black me-3"
                                onClick={() => handleHide()}
                                >
                                Cancel
                                </button>
                                <button
                                type="button"
                                className="btn btn-purple"
                                onClick={(e) => handleSave(e)}
                                >
                                Save
                                </button>
                            </div>
                            </div>
                        </form>
                        </div>
                    </div>
                    </div>
                </div>
                </Modal.Body>
            </Modal>
        </div>
    
    )
}

export default AddRole;
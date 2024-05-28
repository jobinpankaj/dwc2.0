import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

// Superadmin imports
import ForgotPassword from "../Superadmin/components/Login/forgotpass";
import Dashboard from "../Superadmin/components/Dashboard/dashboard";
import Login from "../CommonComponents/Login/login";
import PassCode from "../Superadmin/components/Login/passcode";
import ResetPass from "../Superadmin/components/Login/resetpass";
import Supplier from "../Superadmin/components/Supplier-Management/supplier";
import AddSupplier from "../Superadmin/components/Supplier-Management/add-supplier";
import AddSupplierGeneralInfo from "../Superadmin/components/Supplier-Management/AddSupplierGeneralInfo";
import AddSupplierAddress from "../Superadmin/components/Supplier-Management/add-supplier-address";
import ViewEditSupplierProfile from "../Superadmin/components/Supplier-Management/ViewEditProfile";
import EditSupplierGeneralInfo from "../Superadmin/components/Supplier-Management/ViewEditGeneralInfo";
import ViewEditSupplierAddress from "../Superadmin/components/Supplier-Management/ViewEditAddress";
import ViewSupplier from "../Superadmin/components/Supplier-Management/ViewDetails";
import SupplierManagePermission from "../Superadmin/components/Supplier-Management/ManagePermission";
import Distributor from "../Superadmin/components/Distributor-Management/distributor";
import AddDistributor from "../Superadmin/components/Distributor-Management/add-distributor";
import AddDistributorGeneralInfo from "../Superadmin/components/Distributor-Management/AddDistributorGeneralInfo";
import AddDistributorAddress from "../Superadmin/components/Distributor-Management/add-distributor-address";
import DistributorManagePermission from "../Superadmin/components/Distributor-Management/ManagePermission";
import Retailer from "../Superadmin/components/Retailer-Management/retailer";
import AddRetailer from "../Superadmin/components/Retailer-Management/add-retailer";
import AddRetailerAddress from "../Superadmin/components/Retailer-Management/add-retailer-address";
import RetailerDetails from "../Superadmin/components/Retailer-Management/retailer-details";
import ViewEditDistributorProfile from "../Superadmin/components/Distributor-Management/ViewEditProfile";
import ViewDistributor from "../Superadmin/components/Distributor-Management/ViewDetails";
import EditDistributorGeneralInfo from "../Superadmin/components/Distributor-Management/ViewEditGeneralInfo";
import EditDistributorAddress from "../Superadmin/components/Distributor-Management/ViewEditAddress";
import EditRetailer from "../Superadmin/components/Retailer-Management/EditRetailer";
import EditRetailerAddress from "../Superadmin/components/Retailer-Management/EditRetailerAddress";
import ChangePassword from "../Superadmin/components/Profile/ChangePassword";

// Retailer Imports
import RetailerLogin from "../CommonComponents/Login/login";
import RetailerSignup from "../Retailer/components/Signup/signup";
import SignupVerified from "../Retailer/components/Signup/signupVerified";
import RetailerPassCode from "../Retailer/components/Login/passcode";
import RetailerForgotPassword from "../Retailer/components/Login/forgotpass";
import RetailerResetPass from "../Retailer/components/Login/resetpass";
import RetailerDashboard from "../Retailer/components/Dashboard/dashboard";
import RetailerOrderManagement from "../Retailer/components/Order-Management/order-management";
import AllSupplierList from "../Retailer/components/Marketplace/all-supplier";
import Marketplace from "../Retailer/components/Marketplace/marketplace";
import ProductDetails from "../Retailer/components/Marketplace/product-details";
import Cart from "../Retailer/components/Marketplace/cart";

import RetailerSupplierManagement from "../Retailer/components/Supplier-Management/supplier-management";
// import RetailerEditStock from '../Retailer/components/Inventory-Management/edit-stock';
// import RetailerCreateTransfer from '../Retailer/components/Inventory-Management/create-transfer';
import RetailerProductManagement from "../Retailer/components/Product-Management/product-management";
import RetailerProductDetail from "../Retailer/components/Product-Management/product-detail";
import RetailerShipments from "../Retailer/components/Shipment/shipments";
import RetailerCreateCompanyProfile from "../Retailer/components/Profile/CreateCompanyProfile";
import RetailerAddCompanyAddress from "../Retailer/components/Profile/AddCompanyAddress";
import RetailerAddCompanyBillingInfo from "../Retailer/components/Profile/AddCompanyBillingInfo";
import MyProfile from "../Retailer/components/Profile/myProfile";
import EditProfile from "../Retailer/components/Profile/EditProfile";
import AccountPayable from "../Retailer/components/Account-Payable/account-payable";
import RetailerCompleteGeneralInfo from "../Retailer/components/Login/CreateCompanyProfile";
import RetailerCompleteMainAdd from "../Retailer/components/Login/AddCompanyAddress";
import RetailerCompleteBillingAdd from "../Retailer/components/Login/AddCompanyBillingInfo";
import RetailerChangePassword from "../Retailer/components/Profile/ChangePassword";
import RetailerOrderDetail from "../Retailer/components/Order-Management/order-detail";
import RetailerReports from "../Retailer/components/Reports/reports";
import RetailerInvoice from "../Retailer/components/Invoice/invoice";
import RetailerInvoiceList from "../Retailer/components/Invoice/invoice_list";
import RetailerCreateInvoice from "../Retailer/components/Invoice/new_invoice";
import RetailerAddUsersRoles from "../Retailer/components/users-roles/add-users-roles";
import AddRoleRetailer from "../Retailer/components/users-roles/add-role";
// import RetailerUsersRoles from "../Retailer/components/users-roles/users-roles-management";

//Supplier Imports
import SupplierDashboard from "../Supplier/components/Dashboard/dashboard";
import SupplierOrderManagement from "../Supplier/components/Order-Management/order-management";
import SupplierOrderDetail from "../Supplier/components/Order-Management/order-detail";
import SupplierCreateOrder from "../Supplier/components/Order-Management/create-order";
import SupplierInventoryManagement from "../Supplier/components/Inventory-Management/inventory-management";
import SupplierEditStock from "../Supplier/components/Inventory-Management/edit-stock";
import SupplierCreateTransfer from "../Supplier/components/Inventory-Management/create-transfer";
import SupplierProductManagement from "../Supplier/components/Product-Management/product-management";
import SupplierProductDetail from "../Supplier/components/Product-Management/product-detail";
import SupplierAddProduct from "../Supplier/components/Product-Management/add-product";
import SupplierEditProduct from "../Supplier/components/Product-Management/EditProduct";
import SupplierConfigurePricing from "../Supplier/components/Inventory-Management/configure-pricing";
import SupplierConfigureAvailability from "../Supplier/components/Inventory-Management/configure-availability";
import SupplierRetailer from "../Supplier/components/Retailer-Management/retailer";
import SupplierRetailerDetail from "../Supplier/components/Retailer-Management/retailer-details";

// Reports import
import SupplierReports from "../Supplier/components/Reports/reports";
// Invoice
import SupplierInvoice from "../Supplier/components/Invoice/invoice";
import SupplierInvoiceList from "../Supplier/components/Invoice/invoice_list";
import SupplierCreateInvoice from "../Supplier/components/Invoice/new_invoice";

import SupplierLogin from "../CommonComponents/Login/login";
import SupplierForgotPassword from "../Supplier/components/Login/forgotpass";
import SupplierPasscode from "../Supplier/components/Login/passcode";
import SupplierProfile from "../Supplier/components/Profile/myProfile";
import SupplierEditProfile from "../Supplier/components/Profile/EditProfile";
import SupplierGeneralInfo from "../Supplier/components/Profile/CreateCompanyProfile";
import SupplierEditMain from "../Supplier/components/Profile/AddCompanyAddress";
import SupplierPricingAvailability from "../Supplier/components/Pricing-Availability/pricing-availability";
import EditPricing from "../Supplier/components/Pricing-Availability/edit-pricing";
import EditAvailability from "../Supplier/components/Pricing-Availability/edit-availability";
import SupplierGroupsManagement from "../Supplier/components/Groups/groups_management";
import SupplierCreateGroup from "../Supplier/components/Groups/create-groups";
import RetailerRequests from "../Supplier/components/Retailer-Requests/requests";
import SupplierTransferDetail from "../Supplier/components/Inventory-Management/transfer-detail";
import SuppliearUsersRoles from "../Supplier/components/users-roles/users-roles-management";
import SuppliearAddUsersRoles from "../Supplier/components/users-roles/add-users-roles";
import SupplierCompleteGeneralInfo from "../Supplier/components/Login/CreateCompanyProfile";
import SupplierCompleteMainAdd from "../Supplier/components/Login/AddCompanyAddress";
import SupplierCompleteBillingAdd from "../Supplier/components/Login/AddCompanyBillingInfo";

// Distributor Imports
import DistributorLogin from "../CommonComponents/Login/login";
import DistributorPassCode from "../Distributor/components/Login/passcode";
import DistributorForgotPassword from "../Distributor/components/Login/forgotpass";
import DistributorDashboard from "../Distributor/components/Dashboard/dashboard";
import OrderManagement from "../Distributor/components/Order-Management/order-management";
import OrderDetail from "../Distributor/components/Order-Management/order-detail";
import InventoryManagement from "../Distributor/components/Inventory-Management/inventory-management";
import EditStock from "../Distributor/components/Inventory-Management/edit-stock";
import Receive from "../Distributor/components/Inventory-Management/receive";
import ProductManagement from "../Distributor/components/Product-Management/product-management";
import ProductDetail from "../Distributor/components/Product-Management/product-detail";
import Shipments from "../Distributor/components/Shipment/shipments";
import DistributorProfile from "../Distributor/components/Profile/myProfile";
import DistributorEditProfile from "../Distributor/components/Profile/EditProfile";
import DistributorRouteManagment from "../Distributor/components/Route-Management/route-managment";
import DistributorRouteMap from "../Distributor/components/Route-Management/route-map";
import DistributorRouteDetails from "../Distributor/components/Route-Management/route-details";
import DistributorRouteEdit from "../Distributor/components/Route-Management/route-edit";
import DistributorShipmentsDetail from "../Distributor/components/Shipment/shipments-detail";
import DistributorOrderDetail from "../Distributor/components/Order-Management/order-detail";
import DistributorRetailerManagment from "../Distributor/components/Retailer-Management/retailer-management";
import DistributorRetailerDetails from "../Distributor/components/Retailer-Management/retailer-details";
import DistributorSupplierManagement from "../Distributor/components/Supplier-Management/supplier";
import DistributorSupplierDetails from "../Distributor/components/Supplier-Management/ViewDetails";
import DistributorReceive from "../Distributor/components/Inventory-Management/receive";
import DistributorTransfer from "../Distributor/components/Inventory-Management/transfer-detail";
import CreateTransfer from "../Distributor/components/Inventory-Management/create-transfer";

import DistributorCompleteGeneralInfo from "../Distributor/components/Login/CreateCompanyProfile";
import DistributorCompleteMainAdd from "../Distributor/components/Login/AddCompanyAddress";
import DistributorCompleteBillingAdd from "../Distributor/components/Login/AddCompanyBillingInfo";

// import UserRollsManagment from "../Distributor/components/User-Rolls-Managment/userrolls-management";
// import AddUserRoll from "../Distributor/components/User-Rolls-Managment/add-user";
import Reports from "../Distributor/components/Reports/reports";
import DistributorInvoice from "../Distributor/components/Invoice/invoice";
import DistributorInvoiceList from "../Distributor/components/Invoice/invoice_list";
import DistributorCreateInvoice from "../Distributor/components/Invoice/new_invoice";

import DistributorUsersRoles from "../Distributor/components/User-Rolls-Managment/userrolls-management";
import DistributorAddUsersRoles from "../Distributor/components/User-Rolls-Managment/add-users-roles";
import DistributorAddRole from "../Distributor/components/User-Rolls-Managment/add-role";
// Landing
import HomePage from "../LandingPage/home";
import ContactUs from "../LandingPage/contact";
import PrivacyPolicy from "../LandingPage/PrivacyPolicy";
import TermsConditions from "../LandingPage/TermsConditions";
import CSRPolicy from "../LandingPage/CSR";
import OrderOnline from "../LandingPage/orderOnline";
import PaymentOptions from "../LandingPage/paymentOption";
import InventoryLevels from "../LandingPage/InventoryLevels";
import CommunityPage from "../LandingPage/Community";
import NewsletterSubscription from "../LandingPage/NewsletterSubscription";
import DebitCreditApplication from "../LandingPage/DebitCreditApplication";
import Slick from "../CommonComponents/Slick";

import SupplierChangePassword from "../Supplier/components/Profile/ChangePassword";
import DistributorChangePassword from "../Distributor/components/Profile/ChangePassword";

import Teams from "../LandingPage/TeamsPage";
import JohnesscoRodriguezPage from "../LandingPage/JohnesscoRodriguez";
import DanielStPierreBuckePage from "../LandingPage/DanielStPierreBucke";
// import RochPage from "../LandingPage/RochPageDetail";
import EveMarieGravelPage from "../LandingPage/EveMarieGravel";
import PhileppeWoutersPage from "../LandingPage/PhileppeWouters";
import RaphaelEthierPage from "../LandingPage/RaphaelEthier";
import LegalMentionPage from "../LandingPage/LeagalMention";
import DebitAgreement from "../LandingPage/DebitAgreement";
import PickupMeainFest from "../LandingPage/PickupMainFest";
import FAQ from "../LandingPage/faq";
import ErrorBoundary from "../ErrorPages/404";
import PickUpTicket from "../LandingPage/pickup_ticket";
import DeliveryTicket from "../LandingPage/delivery";

import Protected from "./Protected";
import AddRole from "../Supplier/components/users-roles/add-role";
import EditGroup from "../Supplier/components/Groups/edit-group";

import { useTranslation } from "react-i18next";
import DeliveryMeainFest from "../LandingPage/DeliveryMainFest";
import DistributorTransferDetail from "../Distributor/components/Inventory-Management/transfer-detail";
// import { routePaths } from './routePaths'; // Import the route path mapping
//Context Api import
import { XProvider } from "../ContxtApi/HeaderContext";

const Router = () => {
  // const { t } = useTranslation();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const routePaths = {
    en: t("router.adminLogin"),
    fr: t("router.adminLogin"),


  };
  const admindash={
en:t("router.admindashboard"),
    fr:t("router.admindashboard"),
  }

  return (
    <main>
      <XProvider>
      <Routes>
        {/* Superadmin Routes */}
        <Route
          exact
          path={routePaths[currentLanguage]}
           //path="/admin/login"
          element={
            <Protected>
              <Login />
            </Protected>
          }
        />
        <Route
          exact
          path="/otp-verification"
          element={
            <Protected>
              <PassCode />
            </Protected>
          }
        />
        <Route
          exact
          path="/forgot-password"
          element={
            <Protected>
              <ForgotPassword />
            </Protected>
          }
        />
        <Route
          exact
          path="/reset-password"
          element={
            <Protected>
              <ResetPass />
            </Protected>
          }
        />
        <Route
          exact
          path="/dashboard"
          // path={admindash[currentLanguage]}
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        />
        {/* Admin Additinal routes */}

        <Route
          exact
          path="/admin/change-password"
          // path={admindash[currentLanguage]}
          element={
            <Protected>
              <ChangePassword />
            </Protected>
          }
        />


        <Route
          exact
          path="/supplier-management"
          element={
            <Protected>
              <Supplier />
            </Protected>
          }
        />
        <Route
          exact
          path="/supplier-management/add-supplier"
          element={
            <Protected>
              <AddSupplier />
            </Protected>
          }
        />
        <Route
          exact
          path="/supplier-management/add-supplier-general-info/:user_id"
          element={
            <Protected>
              <AddSupplierGeneralInfo />
            </Protected>
          }
        />
        <Route
          exact
          path="/supplier-management/add-supplier-address/:user_id"
          element={
            <Protected>
              <AddSupplierAddress />
            </Protected>
          }
        />
        <Route
          exact
          path="/supplier-management/manage-permission/:user_id"
          element={
            <Protected>
              <SupplierManagePermission />
            </Protected>
          }
        />
        <Route
          exact
          path="/supplier-management/edit-supplier/:user_id"
          element={
            <Protected>
              <ViewEditSupplierProfile />
            </Protected>
          }
        />
        <Route
          exact
          path="/supplier-management/supplier-edit-general-info/:user_id"
          element={
            <Protected>
              <EditSupplierGeneralInfo />
            </Protected>
          }
        />
        <Route
          exact
          path="/supplier-management/supplier-edit-address/:user_id"
          element={
            <Protected>
              <ViewEditSupplierAddress />
            </Protected>
          }
        />
        <Route
          exact
          path="/supplier-management/view-supplier/:user_id"
          element={
            <Protected>
              <ViewSupplier />
            </Protected>
          }
        />
        <Route
          exact
          path="/distributor-management"
          element={
            <Protected>
              <Distributor />
            </Protected>
          }
        />
        <Route
          exact
          path="/distributor-management/add-distributor"
          element={
            <Protected>
              <AddDistributor />
            </Protected>
          }
        />
        <Route
          exact
          path="/distributor-management/add-distributor-general-info/:user_id"
          element={
            <Protected>
              <AddDistributorGeneralInfo />
            </Protected>
          }
        />
        <Route
          exact
          path="/distributor-management/add-distributor-address/:user_id"
          element={
            <Protected>
              <AddDistributorAddress />
            </Protected>
          }
        />
        <Route
          exact
          path="/distributor-management/manage-permission/:user_id"
          element={
            <Protected>
              <DistributorManagePermission />
            </Protected>
          }
        />
        <Route
          exact
          path="/distributor-management/edit-distributor/:user_id"
          element={
            <Protected>
              <ViewEditDistributorProfile />
            </Protected>
          }
        />
        <Route
          exact
          path="/distributor-management/distributor-edit-general-info/:user_id"
          element={
            <Protected>
              <EditDistributorGeneralInfo />
            </Protected>
          }
        />
        <Route
          exact
          path="/distributor-management/distributor-edit-address/:user_id"
          element={
            <Protected>
              <EditDistributorAddress />
            </Protected>
          }
        />
        <Route
          exact
          path="/distributor-management/view-distributor/:user_id"
          element={
            <Protected>
              <ViewDistributor />
            </Protected>
          }
        />
        <Route
          exact
          path="/retailer-management"
          element={
            <Protected>
              <Retailer />
            </Protected>
          }
        />
        <Route
          exact
          path="/retailer-management/add-retailer"
          element={
            <Protected>
              <AddRetailer />
            </Protected>
          }
        />
        <Route
          exact
          path="/retailer-management/retailer-details/:user_id"
          element={
            <Protected>
              <RetailerDetails />
            </Protected>
          }
        />
        <Route
          exact
          path="/retailer-management/add-retailer-address/:user_id"
          element={
            <Protected>
              <AddRetailerAddress />
            </Protected>
          }
        />
        <Route
          exact
          path="/retailer-management/edit-retailer/:user_id"
          element={
            <Protected>
              <EditRetailer />
            </Protected>
          }
        />
        <Route
          exact
          path="/retailer-management/edit-retailer-address/:user_id"
          element={
            <Protected>
              <EditRetailerAddress />
            </Protected>
          }
        />
        {/* Retailer Routes */}
        <Route
          exact
          path="/email-verification"
          element={
            <Protected>
              <SignupVerified />
            </Protected>
          }
        />
        <Route
          exact
          path="/retailer/sign-up"
          element={
            <Protected>
              <RetailerSignup />
            </Protected>
          }
        />
        <Route
          exact
          path="/retailer/login"
          element={
            <Protected>
              <RetailerLogin />
            </Protected>
          }
        />
        <Route
          exact
          path="/retailer/otp-verification"
          element={
            <Protected>
              <RetailerPassCode />
            </Protected>
          }
        />
        <Route
          exact
          path="/retailer/forgot-password"
          element={
            <Protected>
              <RetailerForgotPassword />
            </Protected>
          }
        />
        <Route
          exact
          path="/retailer/reset-password"
          element={
            <Protected>
              <RetailerResetPass />
            </Protected>
          }
        />
        <Route
          exact
          path="/retailer/complete-general-profile"
          element={
            <Protected>
              <RetailerCompleteGeneralInfo />
            </Protected>
          }
        />
        <Route
          exact
          path="/retailer/complete-main-address"
          element={
            <Protected>
              <RetailerCompleteMainAdd />
            </Protected>
          }
        />
        <Route
          exact
          path="/retailer/complete-billing-address"
          element={
            <Protected>
              <RetailerCompleteBillingAdd />
            </Protected>
          }
        />
        <Route
          exact
          path="/retailer/change-password"
          element={
            <Protected>
              <RetailerChangePassword />
            </Protected>
          }
        />
        <Route
          exact
          path="/retailer/dashboard"
          element={
            <Protected>
              <RetailerDashboard />
            </Protected>
          }
        />
        <Route
          exact
          path="/retailer/order-management"
          element={
            <Protected>
              <RetailerOrderManagement />
            </Protected>
          }
        />
        <Route
          exact
          path="/retailer/order-detail/:id"
          element={
            <Protected>
              <RetailerOrderDetail />
            </Protected>
          }
        />
        <Route
          exact
          path="/retailer/supplier-list"
          element={
            <Protected>
              <AllSupplierList />
            </Protected>
          }
        />
        <Route
          exact
          path="/retailer/marketplace"
          element={
            <Protected>
              <Marketplace />
            </Protected>
          }
        />

        <Route
          exact
          path="/retailer/marketplace/product-details"
          element={
            <Protected>
              <ProductDetails />
            </Protected>
          }
        />
        <Route
          exact
          path="/retailer/marketplace/cart"
          element={
            <Protected>
              <Cart />
            </Protected>
          }
        />
        <Route
          exact
          path="/retailer/account-payable"
          element={
            <Protected>
              <AccountPayable />
            </Protected>
          }
        />
        {/* <Route exact path="/retailer/inventory-management" element={<RetailerInventoryManagement />} /> */}
        {/* <Route exact path="/retailer/edit-stock" element={<RetailerEditStock />} />
        <Route exact path="/retailer/create-transfer" element={<RetailerCreateTransfer />} /> */}
        <Route
          exact
          path="/retailer/product-management"
          element={
            <Protected>
              <RetailerProductManagement />
            </Protected>
          }
        />
        <Route
          exact
          path="/retailer/product-detail"
          element={
            <Protected>
              <RetailerProductDetail />
            </Protected>
          }
        />
        <Route
          exact
          path="/retailer/shipments"
          element={
            <Protected>
              <RetailerShipments />
            </Protected>
          }
        />
        <Route
          exact
          path="/retailer/my-account/edit-company-profile"
          element={
            <Protected>
              <RetailerCreateCompanyProfile />
            </Protected>
          }
        />
        <Route
          exact
          path="/retailer/my-account/edit-company-address"
          element={
            <Protected>
              <RetailerAddCompanyAddress />
            </Protected>
          }
        />
        <Route
          exact
          path="/retailer/my-account/edit-company-billing-info"
          element={
            <Protected>
              <RetailerAddCompanyBillingInfo />
            </Protected>
          }
        />
        <Route
          exact
          path="/retailer/my-account"
          element={
            <Protected>
              <MyProfile />
            </Protected>
          }
        />
        <Route
          exact
          path="/retailer/my-account/edit-profile/:id"
          element={
            <Protected>
              <EditProfile />
            </Protected>
          }
        />
        <Route
          exact
          path="/retailer/supplier-management"
          element={
            <Protected>
              <RetailerSupplierManagement />
            </Protected>
          }
        />
        <Route
          exact
          path="/retailer/reports"
          element={
            <Protected>
              <RetailerReports />
            </Protected>
          }
        />
        <Route
          exact
          path="/retailer/invoice"
          element={
            <Protected>
              <RetailerInvoice />
            </Protected>
          }
        />
        <Route
          exact
          path="/retailer/invoice_list"
          element={
            <Protected>
<RetailerInvoiceList />
</Protected>
}
/>
        {/* <Route
          exact
          path="/retailer/user-role"
          element={
            <Protected>
              <RetailerUsersRoles />
            </Protected>
          }
        /> */}
        <Route
          exact
          path="/retailer/user-role/add-user-role"
          element={
            <Protected>
              <RetailerAddUsersRoles />
            </Protected>
          }
        />
        <Route
          exact
          path="/retailer/user-role/add-role"
          element={
            <Protected>
              <AddRoleRetailer />
            </Protected>
          }
        />
        {/* Supplier-Routes */}
        <Route
          exact
          path="/supplier/login"
          element={
            <Protected>
              <SupplierLogin />
            </Protected>
          }
        />
        <Route
          exact
          path="supplier/otp-verification"
          element={
            <Protected>
              <SupplierPasscode />
            </Protected>
          }
        />
        <Route
          exact
          path="supplier/forgot-password"
          element={
            <Protected>
              <SupplierForgotPassword />
            </Protected>
          }
        />
        <Route
          exact
          path="/supplier/complete-general-profile"
          element={
            <Protected>
              <SupplierCompleteGeneralInfo />
            </Protected>
          }
        />
        <Route
          exact
          path="/supplier/complete-main-address"
          element={
            <Protected>
              <SupplierCompleteMainAdd />
            </Protected>
          }
        />
        <Route
          exact
          path="/supplier/complete-billing-address"
          element={
            <Protected>
              <SupplierCompleteBillingAdd />
            </Protected>
          }
        />
        <Route
          exact
          path="/supplier/product-management"
          element={
            <Protected>
              <SupplierProductManagement />
            </Protected>
          }
        />
        <Route
          exact
          path="/supplier/product-management/view-product/:product_id"
          element={
            <Protected>
              <SupplierProductDetail />
            </Protected>
          }
        />
        <Route
          exact
          path="/supplier/product-management/add-product"
          element={
            <Protected>
              <SupplierAddProduct />
            </Protected>
          }
        />
        <Route
          exact
          path="/supplier/product-management/edit-product/:product_id"
          element={
            <Protected>
              <SupplierEditProduct />
            </Protected>
          }
        />
        <Route
          exact
          path="/supplier/inventory-management"
          element={
            <Protected>
              <SupplierInventoryManagement />
            </Protected>
          }
        />
        <Route
          exact
          path="/supplier/dashboard"
          element={
            <Protected>
              <SupplierDashboard />
            </Protected>
          }
        />
        <Route
          exact
          path="/supplier/order-management"
          element={
            <Protected>
              <SupplierOrderManagement />
            </Protected>
          }
        />
        <Route
          exact
          path="/supplier/order-management/order-detail/:order_id"
          element={
            <Protected>
              <SupplierOrderDetail />
            </Protected>
          }
        />
        <Route
          exact
          path="/supplier/order-management/create-order"
          element={
            <Protected>
              <SupplierCreateOrder />
            </Protected>
          }
        />
        <Route
          exact
          path="/supplier/inventory-management/create-transfer"
          element={
            <Protected>
              <SupplierCreateTransfer />
            </Protected>
          }
        />
        <Route
          exact
          path="/supplier/inventory-management/configure-availability/:product_id"
          element={
            <Protected>
              <SupplierConfigureAvailability />
            </Protected>
          }
        />
        <Route
          exact
          path="/supplier/edit-stock"
          element={
            <Protected>
              <SupplierEditStock />{" "}
            </Protected>
          }
        />
        <Route
          exact
          path="/supplier/inventory-management/configure-pricing/:product_id"
          element={
            <Protected>
              <SupplierConfigurePricing />
            </Protected>
          }
        />
        {/* <Route exact path="/supplier/shipments" element={<SupplierShipments />} /> */}
        <Route
          exact
          path="/supplier/my-account"
          element={
            <Protected>
              <SupplierProfile />
            </Protected>
          }
        />
        <Route
          exact
          path="/supplier/my-account/edit-profile"
          element={
            <Protected>
              <SupplierEditProfile />
            </Protected>
          }
        />
        <Route
          exact
          path="/supplier/edit-general-info"
          element={
            <Protected>
              <SupplierGeneralInfo />
            </Protected>
          }
        />
        <Route
          exact
          path="/supplier/my-account/edit-main-address"
          element={
            <Protected>
              <SupplierEditMain />
            </Protected>
          }
        />
        <Route
          exact
          path="/supplier/pricing-availability"
          element={
            <Protected>
              <SupplierPricingAvailability />
            </Protected>
          }
        />
        <Route
          exact
          path="/supplier/pricing-availability/edit-pricing/:id"
          element={
            <Protected>
              <EditPricing />
            </Protected>
          }
        />
        <Route
          exact
          path="/supplier/pricing-availability/edit-availability/:id"
          element={
            <Protected>
              <EditAvailability />
            </Protected>
          }
        />
        <Route
          exact
          path="/supplier/requests"
          element={
            <Protected>
              <RetailerRequests />
            </Protected>
          }
        />
        <Route
          exact
          path="/supplier/groups-management"
          element={
            <Protected>
              <SupplierGroupsManagement />
            </Protected>
          }
        />
        <Route
          exact
          path="/supplier/groups-management/create-groups"
          element={
            <Protected>
              <SupplierCreateGroup />
            </Protected>
          }
        />
        <Route
          exact
          path="/supplier/groups-management/edit-group/:id"
          element={
            <Protected>
              <EditGroup />
            </Protected>
          }
        />
        <Route
          exact
          path="/supplier/transfer-detail"
          element={
            <Protected>
              <SupplierTransferDetail />
            </Protected>
          }
        />
        <Route
          exact
          path="/supplier/retailer-management"
          element={
            <Protected>
              <SupplierRetailer />
            </Protected>
          }
        />
        <Route
          exact
          path="/supplier/retailer-management/retailer-details/:user_id"
          element={
            <Protected>
              <SupplierRetailerDetail />
            </Protected>
          }
        />
        {/* supplier reports page */}
        <Route
          exact
          path="/supplier/reports"
          element={
            <Protected>
              <SupplierReports />
            </Protected>
          }
        />
        <Route
          exact
          path="/supplier/reports"
          element={
            <Protected>
              <SupplierReports />
            </Protected>
          }
        />
        <Route
          exact
          path="/supplier/invoice"
          element={
            <Protected>
              <SupplierInvoice />
            </Protected>
          }
        />
        <Route
          exact
          path="/supplier/invoice_list"
          element={
            <Protected>
        <SupplierInvoiceList />
        </Protected>
      }
    />
        <Route
          exact
          path="/supplier/user-role-management"
          element={
            <Protected>
              <SuppliearUsersRoles />
            </Protected>
          }
        />
        <Route
          exact
          path="/supplier/user-role-management/add-role"
          element={
            <Protected>
              <AddRole />
            </Protected>
          }
        />
        <Route
          exact
          path="/supplier/user-role-management/add-user"
          element={
            <Protected>
              <SuppliearAddUsersRoles />
            </Protected>
          }
        />
        <Route
          exact
          path="/supplier/change-password"
          element={
            <Protected>
              <SupplierChangePassword />
            </Protected>
          }
        />
        {/* Distributor Routes */}
        <Route
          exact
          path="/distributor/login"
          element={
            <Protected>
              <DistributorLogin />
            </Protected>
          }
        />
        <Route
          exact
          path="/distributor/otp-verification"
          element={
            <Protected>
              <DistributorPassCode />
            </Protected>
          }
        />
        <Route
          exact
          path="/distributor/forgot-password"
          element={
            <Protected>
              <DistributorForgotPassword />
            </Protected>
          }
        />
        <Route
          exact
          path="/distributor/complete-general-profile"
          element={
            <Protected>
              <DistributorCompleteGeneralInfo />
            </Protected>
          }
        />
        <Route
          exact
          path="/distributor/complete-main-address"
          element={
            <Protected>
              <DistributorCompleteMainAdd />
            </Protected>
          }
        />
        <Route
          exact
          path="/distributor/complete-billing-address"
          element={
            <Protected>
              <DistributorCompleteBillingAdd />
            </Protected>
          }
        />
        <Route
          exact
          path="/distributor/dashboard"
          element={
            <Protected>
              <DistributorDashboard />
            </Protected>
          }
        />
        <Route
          exact
          path="/distributor/order-management"
          element={
            <Protected>
              <OrderManagement />
            </Protected>
          }
        />
        <Route
          exact
          path="/distributor/order-detail/:orderId"
          element={
            <Protected>
              <OrderDetail />
            </Protected>
          }
        />
        <Route
          exact
          path="/distributor/inventory-management"
          element={
            <Protected>
              <InventoryManagement />
            </Protected>
          }
        />
        <Route
          exact
          path="/distributor/inventory-management/receive/:id"
          element={
            <Protected>
              <DistributorReceive />
            </Protected>
          }
        />
        <Route
          exact
          path="/distributor/inventory-management/transfer-detail/:id"
          element={
            <Protected>
              <DistributorTransfer />
            </Protected>
          }
        />
        <Route
          exact
          path="/distributor/inventory-management/create-transfer"
          element={
            <Protected>
              <CreateTransfer />
            </Protected>
          }
        />
        <Route
          exact
          path="/distributor/edit-stock"
          element={
            <Protected>
              <EditStock />
            </Protected>
          }
        />
        <Route
          exact
          path="/distributor/create-transfer"
          element={
            <Protected>
              <Receive />
            </Protected>
          }
        />
        <Route
          exact
          path="/distributor/product-management"
          element={
            <Protected>
              <ProductManagement />
            </Protected>
          }
        />
        <Route
          exact
          path="/distributor/product-detail"
          element={
            <Protected>
              <ProductDetail />
            </Protected>
          }
        />
        <Route
          exact
          path="/distributor/shipments"
          element={
            <Protected>
              <Shipments />
            </Protected>
          }
        />
        <Route
          exact
          path="/distributor/my-account"
          element={
            <Protected>
              <DistributorProfile />
            </Protected>
          }
        />
        <Route
          exact
          path="/distributor/my-account/edit-profile/:id"
          element={
            <Protected>
              <DistributorEditProfile />
            </Protected>
          }
        />
        <Route
          exact
          path="/distributor/route-management"
          element={
            <Protected>
              <DistributorRouteManagment />
            </Protected>
          }
        />
        <Route
          exact
          path="/distributor/routes-map"
          element={
            <Protected>
              <DistributorRouteMap />
            </Protected>
          }
        />
        <Route
          exact
          path="/distributor/route-details"
          element={
            <Protected>
              <DistributorRouteDetails />
            </Protected>
          }
        />
        <Route
          exact
          path="/distributor/route-edit"
          element={
            <Protected>
              <DistributorRouteEdit />
            </Protected>
          }
        />
        <Route
          exact
          path="/distributor/shipments-detail"
          element={
            <Protected>
              <DistributorShipmentsDetail />
            </Protected>
          }
        />
        <Route
          exact
          path="/distributor/order-detail"
          element={
            <Protected>
              <DistributorOrderDetail />
            </Protected>
          }
        />
        <Route
          exact
          path="/distributor/retailer-managment/retailer-management"
          element={
            <Protected>
              <DistributorRetailerManagment />
            </Protected>
          }
        />
        <Route
          exact
          path="/distributor/retailer-managment/retailer-details/:user_id"
          element={
            <Protected>
              <DistributorRetailerDetails />
            </Protected>
          }
        />
        <Route
          exact
          path="/distributor/supplier-management"
          element={
            <Protected>
              <DistributorSupplierManagement />
            </Protected>
          }
        />
        <Route
          exact
          path="/distributor/change-password"
          element={
            <Protected>
              <DistributorChangePassword />
            </Protected>
          }
        />
        <Route
          exact
          path="/distributor/view-supplier/:user_id"
          element={
            <Protected>
              <DistributorSupplierDetails />
            </Protected>
          }
        />
        <Route
          exact
          path="/distributor/reports"
          element={
            <Protected>
              <Reports />
            </Protected>
          }
        />
        <Route
          exact
          path="/distributor/invoice"
          element={
            <Protected>
        <DistributorInvoice />
        </Protected>
      }
    />
    <Route
      exact
      path="/distributor/invoice_list"
      element={
        <Protected>
    <DistributorInvoiceList />
    </Protected>
  }
/>
<Route
  exact
  path="/distributor/create_invoice"
  element={
    <Protected>
<DistributorCreateInvoice />
</Protected>
}
/>
        <Route
          exact
          path="/distributor/user-role"
          element={
            <Protected>
              <DistributorUsersRoles />
            </Protected>
          }
        />
        <Route
          exact
          path="/distributor/user-role/add-user-role"
          element={
            <Protected>
              <DistributorAddUsersRoles />
            </Protected>
          }
        />
        <Route
          exact
          path="/distributor/user-role/add-role"
          element={
            <Protected>
              <DistributorAddRole />
            </Protected>
          }
        />
        {/* <Route
          exact
          path="/distributor/add-user"
          element={
            <Protected>
              <AddUserRoll />
            </Protected>
          }
          /> */}
        {/* landing page design Link */}
        <Route exact path="/" element={<HomePage />} />
        <Route
          exact
          path="/contact-us"
          element={
            <Protected>
              <ContactUs />
            </Protected>
          }
        />
        <Route
          exact
          path="/privacy-policy"
          element={
            <Protected>
              <PrivacyPolicy />
            </Protected>
          }
        />
        <Route
          exact
          path="/terms-conditions"
          element={
            <Protected>
              <TermsConditions />
            </Protected>
          }
        />
        <Route
          exact
          path="/CSR-Policy"
          element={
            <Protected>
              <CSRPolicy />
            </Protected>
          }
        ></Route>
        <Route
          exact
          path="/paymentOption"
          element={
            <Protected>
              <PaymentOptions />
            </Protected>
          }
        ></Route>
        <Route
          exact
          path="/order-online"
          element={
            <Protected>
              <OrderOnline />
            </Protected>
          }
        ></Route>
        <Route
          exact
          path="/inventory-levels"
          element={
            <Protected>
              <InventoryLevels />
            </Protected>
          }
        ></Route>
        <Route
          exact
          path="/Community"
          element={
            <Protected>
              <CommunityPage />
            </Protected>
          }
        ></Route>
        <Route
          exact
          path="/newsletter-subscription"
          element={
            <Protected>
              <NewsletterSubscription />
            </Protected>
          }
        ></Route>
        <Route
          exact
          path="/Debit-Credit-Application"
          element={
            <Protected>
              <DebitCreditApplication />
            </Protected>
          }
        ></Route>
        <Route
          exact
          path="/slick"
          element={
            <Protected>
              <Slick />
            </Protected>
          }
        ></Route>
        {/* <Route
          exact
          path="/teams"
          element={
            <Protected>
              <Teams />
            </Protected>
          }
        ></Route> */}
        <Route
          exact
          path="/Johness"
          element={
            <Protected>
              <JohnesscoRodriguezPage />
            </Protected>
          }
        ></Route>
        <Route
          exact
          path="/DanielSt-Pierre-Bucke"
          element={
            <Protected>
              <DanielStPierreBuckePage />
            </Protected>
          }
        ></Route>
        {/* <Route exact path="/roch" element={<Protected><RochPage /></Protected>}></Route> */}
        <Route
          exact
          path="/Phileppe-Wouters"
          element={
            <Protected>
              <PhileppeWoutersPage />
            </Protected>
          }
        ></Route>
        <Route
          exact
          path="/Raphael-Ethier"
          element={
            <Protected>
              <RaphaelEthierPage />
            </Protected>
          }
        ></Route>
        <Route
          exact
          path="/Eve-Marie-Gravel"
          element={
            <Protected>
              <EveMarieGravelPage />
            </Protected>
          }
        ></Route>
        <Route
          exact
          path="/LegalMention"
          element={
            <Protected>
              <LegalMentionPage />
            </Protected>
          }
        ></Route>
        <Route
          exact
          path="/DebitAgreement"
          element={
            <Protected>
              <DebitAgreement />
            </Protected>
          }
        ></Route>
        <Route
          exact
          path="/PickupMenifest"
          element={
            <Protected>
              <PickupMeainFest />
            </Protected>
          }
        ></Route>
        <Route
          exact
          path="/Delivery-MeainFest"
          element={
            <Protected>
              <DeliveryMeainFest />
            </Protected>
          }
        ></Route>
        <Route
          exact
          path="/pickup-ticket"
          element={
            <Protected>
              <PickUpTicket />
            </Protected>
          }
        ></Route>
        <Route
          exact
          path="/delivery-ticket"
          element={
            <Protected>
              <DeliveryTicket />
            </Protected>
          }
        ></Route>
        <Route
          exact
          path="/faq"
          element={
            <Protected>
              <FAQ />
            </Protected>
          }
        ></Route>
        <Route
          path="*"
          element={
            <Protected>
              <ErrorBoundary />
            </Protected>
          }
        />{" "}
      </Routes>
      </XProvider>
    </main>
  );
};

export default Router;

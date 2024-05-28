import React, { useEffect, useState } from "react";
import Layout from "../src/layout";
import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Oval } from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

toast.configure();

function App() {
  const { t, i18n } = useTranslation();
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="d-flex justify-content-center">
              <Oval color="purple" secondaryColor="purple" />
            </div>
          }
        >
          <Layout />
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;

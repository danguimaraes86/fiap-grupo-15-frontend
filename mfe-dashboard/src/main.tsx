import React from "react";
import ReactDOMClient from "react-dom/client";
import singleSpaReact from "single-spa-react";
import DashboardView from "./DashboardView";
import "./styles/global.css";

export const { bootstrap, mount, unmount } = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: DashboardView,
  errorBoundary(err: any, _info: any, _props: any) {
    return <div>Error: {err}</div>;
  },
});

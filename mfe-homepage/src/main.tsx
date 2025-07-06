import React from "react";
import ReactDOMClient from "react-dom/client";
import singleSpaReact from "single-spa-react";
import HomepageView from "./HomepageView";

export const { bootstrap, mount, unmount } = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: HomepageView,
  errorBoundary(err: any, _info: any, _props: any) {
    return <div>Error: {err}</div>;
  }
});

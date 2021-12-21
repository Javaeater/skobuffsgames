import React, {Component} from "react";
import {render} from "react-dom";
import ReactDom from "react-dom";
import HomePage from "./HomePage";

export default function App(){

   return (<div>
      <HomePage />
   </div>)
}
ReactDom.render(<App />,
    document.getElementById("app"))
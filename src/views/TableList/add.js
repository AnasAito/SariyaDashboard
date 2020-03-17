import React, { useState, useEffect } from "react";
import Levels from "./comp";
import Upload from "../upload/upload";
export default function Add() {
  const [type, settype] = useState("survey");
  useEffect(() => {
    // Create an scoped async function in the hook
    console.log(localStorage.getItem("type"));
    settype(localStorage.getItem("type"));
  }, []);

  return <>{type == "survey" ? <Levels /> : <Upload />}</>;
}

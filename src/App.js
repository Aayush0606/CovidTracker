import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMyData } from "./Redux/Feature/CovidData";
import Navbar from "./Components/Navbar/Navbar";
import TableBuilder from "./Components/Table/TableBuilder";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyData());
  }, [dispatch]);
  return (
    <>
      <Navbar />
      <TableBuilder />
    </>
  );
}

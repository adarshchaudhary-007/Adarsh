import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDirectoryData } from "../../Redux/DirectorySlice";
import "./Styles/style.css";
import StickyNav from "./StickyNav";
import HeroCont from "./HeroCont";
import MainCont from "./MainCont";
import Footer from "./Footer";

const Home = () => {
  const dispatch = useDispatch();
  const { directoryCode } = useParams();
  const code = directoryCode || "ebn"; // default to "ebn" if no directory code is provided

  useEffect(() => {
    dispatch(fetchDirectoryData(code));
  }, [dispatch, code]);

  return (
    <div>
      <StickyNav />
      <HeroCont />
      <MainCont />
      <Footer />
    </div>
  );
};

export default Home;

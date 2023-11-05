import { Outlet } from "react-router-dom";
import Header from "../components/header/header";
import "./Global.css";

export function DefaultLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

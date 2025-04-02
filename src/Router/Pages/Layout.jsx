import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
   <>               
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link text-white">Home</Link>   
          </li>
          <li className="nav-item">
            <Link to="/blogs" className="nav-link text-white">Blogs</Link>  
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link text-white">Contact</Link> 
          </li>
        </ul>
      </div>
    </nav>
    <div className="container-fluid w-75 mx-auto">
             <Outlet/>       
    </div>
    </>
  );
}

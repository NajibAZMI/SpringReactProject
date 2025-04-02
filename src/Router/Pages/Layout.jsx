import React from "react";

export default function Layout() {
  return (
    <>
      <ul class="nav justify-content-center  ">
        <li class="nav-item">
                    
          <a class="nav-link active" href="/" aria-current="page">
            Home
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/blogs">
           Blogs
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link " href="/contact">
           Contact
          </a>
        </li>
      </ul>
    </>
  );
}

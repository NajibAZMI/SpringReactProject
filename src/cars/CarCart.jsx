import React from 'react'

export default function CarCart({brand,model,body,color,price,year}) {
  return (
    <>
      <li className="nav-item">
            <a className="nav-link" href="#">
            {brand}
            </a>
      </li>
    </>
  )
}


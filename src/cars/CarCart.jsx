import React from 'react'

export default function CarCart({brand,model,body,color,price,year}) {
  return (
    <>
      <tr>
           <td>{brand}</td>
           <td>{model}</td>
           <td>{body}</td>
           <td>{color}</td>
           <td>{price}</td>
           <td>{year}</td>         
      </tr>
    </>
  )
}


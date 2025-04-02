import Rating from "./Rating"
export default function Productitem({product}){
         return <tr>
            <td>{product.id}</td>
             <td>{product.title}</td>
             <td>{product.price}</td>
             <td>{product.description}</td>
             <td>{product.category}</td>
             <td><img src={product.image} width="100" alt="" /></td>
             <td><Rating count={product.rating.count} rate={product.rating.rate}/></td> 
         </tr>           
}
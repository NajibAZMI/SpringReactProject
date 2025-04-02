import { useEffect, useState } from "react";
import Productitem from "./ProductItem";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchInput,setSarchInput]=useState(null);
  const displayProducts = () => {

    const productsTemp = products.filter(product => {            
      return String(product.id).includes(searchInput)
          || product.title.includes(searchInput)
          ||  product.description.includes(searchInput)
          || product.category.includes(searchInput);
    });
  

    return productsTemp.map((product) => {
      return <Productitem product={product} />;
    });
  };

  const getProducts = () => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((response) => setProducts(response));
  };
  useEffect(() => {
    getProducts();
  }, []);
  
  const handleSearch=(e)=>{
        e.preventDefault()
        const searchValue=document.getElementById('search').value
        setSarchInput(searchValue)
  }

  return (
    <div className="container-fluid mx-auto w-75 my-3">
      <h2>Search :</h2>
      <form>
        <div class="mb-3">
          <label for="" class="form-label">
            {" "}
          </label>
          <input
            type="text"
            name="search"
            id="search"
            className="form-control"
          />
        </div>
        <input type="submit" value="Search" onClick={handleSearch} />
      </form>
      <h1>Products :</h1>
      <table className="table">
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Price</th>
          <th>Description</th>
          <th>Category</th>
          <th>Image</th>
          <th>Rating</th>
        </tr>
        <tbody>{displayProducts()}</tbody>
      </table>
    </div>
  );
}

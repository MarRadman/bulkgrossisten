import React from 'react';
import { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';

type Product = {
  product_id: number;
  name: string;
  description: string;
  price: number;
};

function ProductsView() {
  const [productList, setProductList] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProductData = async () => {
      const response = await fetch("http://localhost:3000/products");
      const result = await response.json();
      if(result.length === 0 || result === null) {
        console.log("No products found");
        return;
      }
      else {
        setProductList(result);
        console.log(result);
      }
    };

    fetchProductData();
  },[]);

  return (
    <React.Fragment>
      <h2>Products</h2>
         <ListGroup>
          {productList.length > 0 && productList.map((product) => (
            <ListGroup.Item action key={product.product_id}>
              <h2>{product.name}</h2>
              <p>Beskriving: {product.description}</p>
              <p>Pris: {product.price}kr</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </React.Fragment>
    );
}

export default ProductsView;

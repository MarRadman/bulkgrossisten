import React from 'react';
import { useState, useEffect } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import withAuthCheck from '../authentication/withAuthCheck';
import BackBtn from '../components/BackBtn';

type Product = {
  product_id: number;
  name: string;
  description: string;
  price: number;
};

function ProductsView() {
  const [productList, setProductList] = useState<Product[]>([]);
  const [selectedCartItem, setSelectedCartItem] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProductData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found');
        return;
      }

      const response = await fetch('http://localhost:3000/products', {
        headers: {
          'Authorization': token
        }
      });
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

  function handleClick() {
    console.log("Item added to cart", productList);
    setSelectedCartItem(productList); //TODO add selected item to cart
  }

  return (
    <React.Fragment>
      <h2>Products</h2>
         <ListGroup>
          {productList.length > 0 && productList.map((product) => (
            <ListGroup.Item action key={product.product_id}>
              <h2>{product.name}</h2>
              <p>Beskriving: {product.description}</p>
              <p>Pris: {product.price}kr</p>
              <Button onClick={handleClick} >Add to Cart</Button> {/*TODO add onClick event to add item to cart*/}
            </ListGroup.Item>
          ))}
        </ListGroup>
        <BackBtn />
      </React.Fragment>
    );
}

export default withAuthCheck(ProductsView);

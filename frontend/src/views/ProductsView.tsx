import React from 'react';
import { useState, useEffect } from 'react';
import { ListGroup, Button , Modal} from 'react-bootstrap';
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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);

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
        // console.log(result);
      }
    };

    fetchProductData();
  },[]);

  function handleClick(product: Product) {
    if (!product) {
      console.log('Product is undefined');
      return;
    }
    console.log('Product:', product);
    if (!product.name) {
      console.log('Product name is undefined');
      return;
    }
    console.log("Item added to cart", product.name);
    setCartItems(prevItems => [...prevItems, product]);
  }

  const handleShowModal = (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <React.Fragment>
    <h2>Products</h2>
    <ListGroup>
      {productList.length > 0 && productList.map((product) => (
        <ListGroup.Item action key={product.product_id}>
          <h2>{product.name}</h2>
          <p>Pris: {product.price}kr</p>
          <div>
          <Button onClick={() => handleClick(product)}>Add to Cart</Button>
          <Button variant="info" onClick={() => handleShowModal(product)}>Info</Button>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
        <Modal.Title>{selectedProduct?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{selectedProduct?.description}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <BackBtn />
    </React.Fragment>
  );
}

export default withAuthCheck(ProductsView);

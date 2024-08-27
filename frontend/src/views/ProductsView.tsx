import React, { useState, useEffect } from "react";
import { ListGroup, Button, Modal } from "react-bootstrap";
import withAuthCheck from "../authentication/withAuthCheck";
import BackBtn from "../components/BackBtn";
import "../assets/ProductView.css";
import image1 from "../assets/1.jpg";
import image2 from "../assets/2.jpg";
import image3 from "../assets/3.jpg";
import image4 from "../assets/4.jpg";
import image5 from "../assets/5.jpg";
import image6 from "../assets/6.jpg";
import image7 from "../assets/7.jpg";
import image8 from "../assets/8.jpg";
import image9 from "../assets/9.jpg";
import image10 from "../assets/10.jpg";
import image11 from "../assets/11.jpg";
import image12 from "../assets/12.jpg";
import image13 from "../assets/13.jpg";
import image14 from "../assets/14.jpg";
import image15 from "../assets/15.jpg";
import image16 from "../assets/16.jpg";
import image17 from "../assets/17.jpg";
import config from "../../config";
import { useCart } from '../context/CartContext';
import { Product } from '../types';

const images: { [key: number]: string } = {
  1: image1,
  2: image2,
  3: image3,
  4: image4,
  5: image5,
  6: image6,
  7: image7,
  8: image8,
  9: image9,
  10: image10,
  11: image11,
  12: image12,
  13: image13,
  14: image14,
  15: image15,
  16: image16,
  17: image17
}; //Fix this later with a more dynamic solution

function ProductsView() {
  const [productList, setProductList] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { cartItems, addCartItem } = useCart();
  const [showNotification, setShowNotification] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const fetchProductData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found");
        return;
      }

      try {
        const response = await fetch(`${config.apiUrl}/productsAdmin`, {
          headers: {
            Authorization: token,
          },
        });

        if (!response.ok) {
          console.log("Failed to fetch products");
          return;
        }

        const products: Product[] = await response.json();
        if (products.length === 0) {
          console.log("No products found");
          return;
        }

        setProductList(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProductData();
  }, []);

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleShowModal = (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <React.Fragment>
      <h1 className="products-title">Produkter</h1>
      <div className="product-grid-products">
        {productList.map((product) => (
          <div className="product-card" key={product.product_id}>
            <ListGroup.Item action className="product-item">
              <h2>{product.name}</h2>
              <img src={images[product.product_id]} alt={product.name} />
              <p>Pris: {product.price}kr</p>
            </ListGroup.Item>
            <div className="button-group">
            <Button onClick={() => {
                addCartItem(product);
                setShowNotification(prevState => ({ ...prevState, [product.product_id]: true }));
                setTimeout(() => setShowNotification(prevState => ({ ...prevState, [product.product_id]: false })), 3000);
              }}>Add to cart</Button>
              <Button variant="info" onClick={() => handleShowModal(product)}>
                Info
              </Button>
            </div>
            {showNotification[product.product_id] && <div>Item added to cart!</div>}
          </div>
        ))}
      </div>
      {selectedProduct && (
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedProduct.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{selectedProduct.description}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      <BackBtn />
    </React.Fragment>
  );
}

export default withAuthCheck(ProductsView);

import React, { useState, useEffect } from "react";
import { ListGroup, Button, Modal } from "react-bootstrap";
import withAuthCheck from "../authentication/withAuthCheck";
import BackBtn from "../components/BackBtn";
import "../assets/Product.css";
import image1 from "../assets/1.jpg";
import image2 from "../assets/2.jpg";
import image3 from "../assets/3.jpg";
import image4 from "../assets/4.jpg";
import image5 from "../assets/5.jpg";
import image6 from "../assets/6.jpg";
import image7 from "../assets/7.jpg";
import image8 from "../assets/8.jpg";
import useSessionStorage from "../hooks/SessionStorageHook";
import config from "../../../backend/config";

const images: { [key: number]: string } = {
  1: image1,
  2: image2,
  3: image3,
  4: image4,
  5: image5,
  6: image6,
  7: image7,
  8: image8,
};

interface Product {
  product_id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

function ProductsView() {
  const [productList, setProductList] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [cartItems, setCartItems] = useSessionStorage<CartItem[]>("cart", []);

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

  const addToCart = (product: Product) => {
    if (!product || !product.name) {
      console.log("Invalid product");
      return;
    }

    console.log("Item added to cart", product.name);

    setCartItems((prevItems) => {
      const newItems = [...prevItems];
      const itemIndex = newItems.findIndex(
        (item) => item.product.product_id === product.product_id
      );

      if (itemIndex !== -1) {
        const updatedItem = {
          ...newItems[itemIndex],
          quantity: newItems[itemIndex].quantity + 1,
        };
        newItems[itemIndex] = updatedItem;
      } else {
        newItems.push({ product, quantity: 1 });
      }

      return newItems;
    });
  };

  const handleShowModal = (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <React.Fragment>
      <h1 className="Products-title">Produkter</h1>
      <div className="product-grid-products">
        {productList.map((product) => (
          <div className="product-card" key={product.product_id}>
            <ListGroup.Item action className="product-item">
              <h2>{product.name}</h2>
              <img src={images[product.product_id]} alt={product.name} />
              <p>Pris: {product.price}kr</p>
            </ListGroup.Item>
            <div className="button-group">
              <Button onClick={() => addToCart(product)}>
                Lägg till i varukorg
              </Button>
              <Button variant="info" onClick={() => handleShowModal(product)}>
                Info
              </Button>
            </div>
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

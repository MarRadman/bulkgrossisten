import React from 'react';
import { useState, useEffect } from 'react';
import { ListGroup, Button , Modal} from 'react-bootstrap';
import withAuthCheck from '../authentication/withAuthCheck';
import BackBtn from '../components/BackBtn';
import '../assets/Product.css';
import image1 from '../assets/productsPhotos/1.jpg';
import image2 from '../assets/productsPhotos/2.jpg';
import image3 from '../assets/productsPhotos/3.jpg';
import image4 from '../assets/productsPhotos/4.jpg';
import image5 from '../assets/productsPhotos/5.jpg';
import image6 from '../assets/productsPhotos/6.jpg';
import image7 from '../assets/productsPhotos/7.jpg';
import image8 from '../assets/productsPhotos/8.jpg';
import useSessionStorage from '../hooks/SessionStorageHook';

const images: { [key: number]: string } = {
  1: image1,
  2: image2,
  3: image3,
  4: image4,
  5: image5,
  6: image6,
  7: image7,
  8: image8
};

interface Product {
  product_id: number;
  name: string;
  description: string;
  price: number;
  images: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

function ProductsView() {
  const [productList, setProductList] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [cartItems, setCartItems] = useSessionStorage<CartItem[]>("cart");

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
      // const result = await response.json();
      const products: Product[] = await response.json();

      if(products.length === 0 || products === null) {
        console.log("No products found");
        return;
      }
      else {
        setProductList(products);
      }
    };

    fetchProductData();
  },[]);

  useEffect(() => {
    sessionStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

// This function is called when you want to add a product to the cart
const addToCart = (product: Product) => {
  // First, we check if the product is valid. If it's not, we log an error message and stop the function
  if (!product || !product.name) {
    console.log('Invalid product');
    return;
  }

  // If the product is valid, we log a message saying that it's being added to the cart
  console.log("Item added to cart", product.name);

  // Then, we update the cart items. We use a function to do this because we want to base the new cart items on the old ones
  setCartItems((prevItems: CartItem[]) => {
    // If there are no previous items (meaning the cart is empty), we just add the new product to the cart
    if (!prevItems) {
      return [{ product, quantity: 1 }];
    }

    // If there are previous items, we check if the product is already in the cart
    const existingProductIndex = prevItems.findIndex(item => item.product.product_id === product.product_id);

    // If the product is already in the cart, we increase its quantity
    if (existingProductIndex !== -1) {
      const newItems = [...prevItems];
      newItems[existingProductIndex].quantity += 1;
      return newItems;
    }

    // If the product is not in the cart, we add it with a quantity of 1
    else {
      return [...prevItems, { product, quantity: 1 }];
    }
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
    <h1>Products</h1>
    <div className="product-grid">
      {productList && productList.map((product) => (
        <div className="product-card" key={product.product_id}>
          <ListGroup.Item action className="product-item">
            <h2>{product.name}</h2>
            <img src={images[product.product_id]} alt={product.name} />
            <p>Pris: {product.price}kr</p>
          </ListGroup.Item>
          <div className="button-group">
            <Button onClick={() => addToCart(product)}>Add to Cart</Button>
            <Button variant="info" onClick={() => handleShowModal(product)}>Info</Button>
          </div>
        </div>
      ))}
    </div>
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

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
  const [cartItems, setCartItems] = useSessionStorage<CartItem>("cart", []);
  // const [cartItems, setCartItems] = useState<Product[]>([]);

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

  // Then, we update the cart items.
  setCartItems((prevItems: CartItem[]) => {
    const newItems = [...prevItems];
    const itemIndex = newItems.findIndex(item => item.product.product_id === product.product_id);

    if (itemIndex !== -1) {
      const updatedItem = { ...newItems[itemIndex], quantity: newItems[itemIndex].quantity + 1 };
      newItems[itemIndex] = updatedItem;
    } else {
      newItems.push({ product, quantity: 1 });
    }
    refreshPage() //Temporary solution to refresh the page
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

  function refreshPage(){
    window.location.reload();
  }

  return (
    <React.Fragment>
    <h1 className='Products-title'>Products</h1>
    <div className="product-grid-products">
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

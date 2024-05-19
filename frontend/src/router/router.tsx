import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Products from '../views/ProductsView';
import Menus from '../views/MenusView';
import AppView from '../views/AppView';
import OrderView from '../views/OrderView';
import CartView from '../views/CartView';
import LoginView from '../views/LoginView';
import SignUpView from '../views/SignUpView';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path="/app" element={<AppView />} />
        <Route path="/products" element={<Products />} />
        <Route path="/menus" element={<Menus />} />
        <Route path="/order" element={<OrderView />} />
        <Route path="/cart" element= {<CartView />} />
        <Route path="/signup" element={<SignUpView />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
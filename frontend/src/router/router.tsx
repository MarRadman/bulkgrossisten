import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Products from '../views/ProductsView';
import Menus from '../views/MenusView';
import AppView from '../views/AppView';
import OrderView from '../views/OrderView';
import CartView from '../views/CartView';
import LoginView from '../views/LoginView';
import SignUpView from '../views/SignUpView';
import ComingSoon from '../views/ComingSoonView'
import NavMenu from '../components/NavMenu';
import Footer from '../components/Footer';

function AppRouter() {

  return (
    <BrowserRouter>
        <NavMenu />
          <Routes>
            <Route path="/" element={<LoginView />} />
            <Route path="/signup" element={<SignUpView />} />
            <Route path="/app" element={<AppView />} />
            <Route path="/products" element={<Products />} />
            <Route path="/menus" element={<Menus />} />
            <Route path="/cart" element= {<CartView />} />
            <Route path="/order" element={<OrderView />} />
            <Route path='/comingsoon' element={<ComingSoon />} />
          </Routes>
        <Footer />
    </BrowserRouter>
  )
}

export default AppRouter;

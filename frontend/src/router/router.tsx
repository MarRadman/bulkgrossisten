import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Products from '../views/ProductsView';
import Menus from '../views/MenusView';
import AppView from '../views/AppView';
import MemberView from '../views/MemberView';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppView />} />
        <Route path="/products" element={<Products />} />
        <Route path="/menus" element={<Menus />} />
        <Route path="/member" element={<MemberView />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

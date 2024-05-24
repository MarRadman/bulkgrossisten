import React from 'react';
import { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import withAuthCheck from '../authentication/withAuthCheck';
import BackBtn from '../components/BackBtn';
import config from "../../config";

type Menu = {
  menu_id: number;
  name: string;
  description: string;
};

function MenusView() {
  const [menuList, setMenuList] = useState<Menu[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchMenuData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found');
        return;
      }
      const response = await fetch(`${config.apiUrl}/menusAdmin`, {
        headers: {
          'Authorization': token
        }
      });
      const result = await response.json();
      if(result.length === 0 || result === null) {
        console.log("No menus found");
        return;
      }
      else {
        setMenuList(result);
        // console.log(result);
      }
    };

    fetchMenuData();
  },[]);

  return (
    <React.Fragment>
      <h2>Menus</h2>
         <ListGroup>
          {menuList.length > 0 && menuList.map((menu) => (
            <ListGroup.Item action key={menu.menu_id}>
              <h2>{menu.name}</h2>
              <p>{menu.description}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <BackBtn />
      </React.Fragment>
    );
}

export default withAuthCheck(MenusView);

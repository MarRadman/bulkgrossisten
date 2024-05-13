import React from 'react';
import { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';

type Menu = {
  menu_id: number;
  name: string;
  description: string;
};

function MenusView() {
  const [menuList, setMenuList] = useState<Menu[]>([]);

  useEffect(() => {
    const fetchMenuData = async () => {
      const response = await fetch("http://localhost:3000/menus");
      const result = await response.json();
      if(result.length === 0 || result === null) {
        console.log("No products found");
        return;
      }
      else {
        setMenuList(result);
        console.log(result);
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
              <p>Beskriving: {menu.description}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </React.Fragment>
    );
}

export default MenusView;

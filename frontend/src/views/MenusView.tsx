import React from 'react';
import { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import withAuthCheck from '../authentication/withAuthCheck';
import BackBtn from '../components/BackBtn';
import config from "../../config";
import '../assets/MenusView.css';
import { Link } from 'react-router-dom';

type Menu = {
  menu_id: number;
  name: string;
  description: string;
};

function MenusView() {
  const [menuList, setMenuList] = useState<Menu[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuData = async () => {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found');
        return;
      }
      try {
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
        }
      } catch (error) {
        console.error(error);
      } finally {
        setError(null);
        setIsLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  return (
    <React.Fragment>
      <div className="container-menu">
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <div>
            <h2 className="title-menu">Menyer</h2>
            <ListGroup className="listGroup-menu">
              {menuList.length > 0 ? (
                menuList.map((menu) => (
                  <ListGroup.Item action key={menu.menu_id}>
                    <Link to="/ComingSoon" style={{color:"black"}}>
                      <h2>{menu.name}</h2>
                      <p>{menu.description}</p>
                    </Link>
                  </ListGroup.Item>
                ))
              ) : (
                <div>No menus available</div>
              )}
            </ListGroup>
          </div>
        )}
      </div>
      <BackBtn />
    </React.Fragment>
  );
}

export default withAuthCheck(MenusView);

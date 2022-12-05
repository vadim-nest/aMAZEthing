import '../css/bottomNavbar.css'
import { useState } from 'react';
import MediaQuery from 'react-responsive';

export default function BottomNavbar () {
    const [toggle, setToggle] = useState(false);

    const toggleLeftBar = () => {
        setToggle(!toggle);
      };
    

    return (
        <MediaQuery maxWidth={950}>
        <div
          className="container-navbar"
          onClick={() => {
            toggleLeftBar();
          }}
        >
          <div className={`plus ${toggle}`}>+</div>
          <div className={`minus ${toggle}`}>-</div>
        </div>
      </MediaQuery>
    )
}
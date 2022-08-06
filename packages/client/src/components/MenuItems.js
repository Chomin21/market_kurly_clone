import { useState, useEffect, useRef } from "react";
import styles from "../css/MenuItems.module.css";

import Dropdown from "./dropdown";

const MenuItems = ({ items, depthLevel }) => {
  const [dropdown, setDropdown] = useState(false);

  let ref = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
    setDropdown(true);
  };

  const onMouseLeave = () => {
    setDropdown(false);
  };

  return (
    <li
      className={`menu-items ${styles.menu_items}`}
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* if item has url and submenu, we make the button clickable to visit 
      the url while still showing dropdown on hover. If no url, we only show 
      hover without linking the button. Else, we render a simple <a> element. 
      Be aware that they are internal links, so we will use the <Link> component from react-router. Here, we are using the <a> for simplicity. */}
      {items.url && items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            // onClick={() => setDropdown((prev) => !prev)}
          >
            <a href={items.url}>
              <img alt="" src={items.img} />
              {items.title}
            </a>
            {/* {items.title}{" "}
            {depthLevel > 0 ? (
              <span>&raquo;</span>
            ) : (
              <span
                className={`arrow${
                  items.url && items.submenu ? " custom" : ""
                }`}
              />
            )} */}
          </button>
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
          />
        </>
      ) : !items.url && items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => setDropdown((prev) => !prev)}
          >
            {/* <a href="/#">{items.title}</a> */}
            {items.title}{" "}
            {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow" />}
          </button>
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
          />
        </>
      ) : (
        <a className={styles.nvLnk} href={items.url}>
          {items.title}
        </a>
      )}
    </li>
  );
};

export default MenuItems;

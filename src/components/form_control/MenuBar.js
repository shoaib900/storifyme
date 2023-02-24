import { Menu, Dropdown } from "antd";
import { FaAdd } from "../FontAwesome";

const MenuBar = ({ children, menuItems, actionTrigger, disabled }) => {
  console.log("far", children);
  const menu = (
    <Menu>
      {menuItems &&
        menuItems.map((menu, i) => (
          <Menu.Item
            key={i}
            onClick={menu.action}
            style={{ display: "flex", justifyContent: "space-between" }}
            icon={menu.icon}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="context-menu-div">{menu.text}</div>
              <small style={{ color: "lightgray" }}> {menu.short}</small>
            </div>
          </Menu.Item>
        ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={[actionTrigger]} disabled={disabled}>
      <div className="site-dropdown-context-menu">{children}</div>
    </Dropdown>
  );
};

MenuBar.defaultProps = {
  menuItems: null,
  actionTrigger: "click", //< click|hover|contextMenu(open when right clicked) >
  disabled: false,
};

export default MenuBar;

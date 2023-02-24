import React, { useEffect } from "react";
import {
  Layout,
  Avatar,
  Row,
  Col,
  Input,
  Tooltip,
  // Menu,
  // Popover
} from "antd";
import { CaretLeftOutlined, SearchOutlined } from "@ant-design/icons";
import { FaHome } from "../FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserAlt,
  faTachometerAlt,
  faUsers,
  faCog,
  faDatabase,
  // faUserCircle,
  // faSignOutAlt,
  faChartArea,
  faLayerGroup,
  faClone,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/imgs/logo.png";
import { Content } from "antd/lib/layout/layout";
import TemplateModal from "../Stories/TemplateModal";

const { Sider } = Layout;

export default function Templates() {
  const [openUserProfileTab, setOpenUserProfileTab] = React.useState(false);
  useEffect(() => {
    document.addEventListener("click", clickOutsideProfileMenu);
    return () => document.removeEventListener("click", clickOutsideProfileMenu);
  }, [openUserProfileTab]);

  const clickOutsideProfileMenu = (e) => {
    // console.log(!e.target.closest('#subMenu'), openUserProfileTab)
    if (!e.target.closest("#subMenu") && openUserProfileTab) {
      userProfileTabHandler();
    } else return;
  };

  const fontSizings = {
    fontSize: "16px",
  };

  const userProfileTabHandler = () => {
    setOpenUserProfileTab(!openUserProfileTab);
  };

  return (
    <Layout className="sect ">
      <Sider className="template-sider">
        <div className="template-logo">
          <Avatar shape="square" size="medium" src={logo} />{" "}
        </div>

        <div className="template-sidebar-content">
          <div className="template-sidebar-icons">
            <Tooltip placement="right" title={"Homepage"}>
              <FaHome style={fontSizings} />
            </Tooltip>
          </div>
        </div>

        <div className="template-sidebar-content">
          <div className="template-sidebar-icons">
            <Tooltip placement="right" title={"Stories"}>
              <FontAwesomeIcon icon={faLayerGroup} style={fontSizings} />
            </Tooltip>
          </div>
        </div>

        <div className="template-sidebar-content">
          <Tooltip placement="right" title={"Templates"}>
            <div className="template-sidebar-icons-active">
              <FontAwesomeIcon icon={faClone} style={fontSizings} />
            </div>
          </Tooltip>
        </div>

        <div className="template-sidebar-content">
          <div className="template-sidebar-icons">
            <Tooltip placement="right" title={"Analytics"}>
              <FontAwesomeIcon icon={faChartArea} style={fontSizings} />
            </Tooltip>
          </div>
        </div>

        <div className="template-sidebar-content">
          <div className="template-sidebar-icons">
            <Tooltip placement="right" title={"Widgets"}>
              <FontAwesomeIcon icon={faTachometerAlt} style={fontSizings} />
            </Tooltip>
          </div>
        </div>

        <div className="template-sidebar-content">
          <div className="template-sidebar-icons">
            <Tooltip placement="right" title={"Audience"}>
              <FontAwesomeIcon icon={faUsers} style={fontSizings} />
            </Tooltip>
          </div>
        </div>

        <div className="template-sidebar-content">
          <div className="template-sidebar-icons">
            <Tooltip placement="right" title={"Settings"}>
              <FontAwesomeIcon icon={faCog} style={fontSizings} />
            </Tooltip>
          </div>
        </div>

        <div className="template-sidebar-content">
          <div className="template-sidebar-icons">
            <Tooltip placement="right" title={"Integrations"}>
              <FontAwesomeIcon icon={faDatabase} style={fontSizings} />
            </Tooltip>
          </div>
        </div>
        <div className="userProfile" onClick={userProfileTabHandler}>
          <FontAwesomeIcon icon={faUserAlt} style={{ fontSize: "21px" }} />
        </div>
        {openUserProfileTab && (
          <div
            onClick={clickOutsideProfileMenu}
            id="subMenu"
            className="ant-dropdown ant-dropdown-placement-bottomRight"
            style={{ minWidth: "200px", left: "65px", top: "54.4%" }}
          >
            <div className="nav-profile nav-dropdown">
              <div className="nav-profile-header">
                <div className="d-flex">
                  <span
                    style={{
                      width: "45px",
                      height: "45px",
                      lineHeight: "45px",
                      fontSize: "18px",
                    }}
                    className="ant-avatar ant-avatar-circle ant-avatar-image"
                  >
                    <img alt="" src="/thumb-1.jpg" />
                  </span>
                  <div className="pl-3">
                    <h4 className="mb-0">Charlie Howard</h4>
                    <span className="text-muted">Frontend Developer</span>
                  </div>
                </div>
              </div>
              <div className="nav-profile-body">
                <ul
                  className="ant-menu ant-menu-light ant-menu-root ant-menu-vertical"
                  direction="ltr"
                  role="menu"
                >
                  <li
                    className="ant-menu-item ant-menu-item-only-child"
                    role="menuitem"
                  >
                    <a href="/">
                      <span
                        role="img"
                        aria-label="edit"
                        className="anticon anticon-edit mr-3"
                      >
                        <svg
                          viewBox="64 64 896 896"
                          focusable="false"
                          data-icon="edit"
                          width="1em"
                          height="1em"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path>
                        </svg>
                      </span>
                      <span className="font-weight-normal">Edit Profile</span>
                    </a>
                  </li>
                  <li
                    className="ant-menu-item ant-menu-item-only-child"
                    role="menuitem"
                  >
                    <a href="/">
                      <span
                        role="img"
                        aria-label="setting"
                        className="anticon anticon-setting mr-3"
                      >
                        <svg
                          viewBox="64 64 896 896"
                          focusable="false"
                          data-icon="setting"
                          width="1em"
                          height="1em"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M924.8 625.7l-65.5-56c3.1-19 4.7-38.4 4.7-57.8s-1.6-38.8-4.7-57.8l65.5-56a32.03 32.03 0 009.3-35.2l-.9-2.6a443.74 443.74 0 00-79.7-137.9l-1.8-2.1a32.12 32.12 0 00-35.1-9.5l-81.3 28.9c-30-24.6-63.5-44-99.7-57.6l-15.7-85a32.05 32.05 0 00-25.8-25.7l-2.7-.5c-52.1-9.4-106.9-9.4-159 0l-2.7.5a32.05 32.05 0 00-25.8 25.7l-15.8 85.4a351.86 351.86 0 00-99 57.4l-81.9-29.1a32 32 0 00-35.1 9.5l-1.8 2.1a446.02 446.02 0 00-79.7 137.9l-.9 2.6c-4.5 12.5-.8 26.5 9.3 35.2l66.3 56.6c-3.1 18.8-4.6 38-4.6 57.1 0 19.2 1.5 38.4 4.6 57.1L99 625.5a32.03 32.03 0 00-9.3 35.2l.9 2.6c18.1 50.4 44.9 96.9 79.7 137.9l1.8 2.1a32.12 32.12 0 0035.1 9.5l81.9-29.1c29.8 24.5 63.1 43.9 99 57.4l15.8 85.4a32.05 32.05 0 0025.8 25.7l2.7.5a449.4 449.4 0 00159 0l2.7-.5a32.05 32.05 0 0025.8-25.7l15.7-85a350 350 0 0099.7-57.6l81.3 28.9a32 32 0 0035.1-9.5l1.8-2.1c34.8-41.1 61.6-87.5 79.7-137.9l.9-2.6c4.5-12.3.8-26.3-9.3-35zM788.3 465.9c2.5 15.1 3.8 30.6 3.8 46.1s-1.3 31-3.8 46.1l-6.6 40.1 74.7 63.9a370.03 370.03 0 01-42.6 73.6L721 702.8l-31.4 25.8c-23.9 19.6-50.5 35-79.3 45.8l-38.1 14.3-17.9 97a377.5 377.5 0 01-85 0l-17.9-97.2-37.8-14.5c-28.5-10.8-55-26.2-78.7-45.7l-31.4-25.9-93.4 33.2c-17-22.9-31.2-47.6-42.6-73.6l75.5-64.5-6.5-40c-2.4-14.9-3.7-30.3-3.7-45.5 0-15.3 1.2-30.6 3.7-45.5l6.5-40-75.5-64.5c11.3-26.1 25.6-50.7 42.6-73.6l93.4 33.2 31.4-25.9c23.7-19.5 50.2-34.9 78.7-45.7l37.9-14.3 17.9-97.2c28.1-3.2 56.8-3.2 85 0l17.9 97 38.1 14.3c28.7 10.8 55.4 26.2 79.3 45.8l31.4 25.8 92.8-32.9c17 22.9 31.2 47.6 42.6 73.6L781.8 426l6.5 39.9zM512 326c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm79.2 255.2A111.6 111.6 0 01512 614c-29.9 0-58-11.7-79.2-32.8A111.6 111.6 0 01400 502c0-29.9 11.7-58 32.8-79.2C454 401.6 482.1 390 512 390c29.9 0 58 11.6 79.2 32.8A111.6 111.6 0 01624 502c0 29.9-11.7 58-32.8 79.2z"></path>
                        </svg>
                      </span>
                      <span className="font-weight-normal">
                        Account Setting
                      </span>
                    </a>
                  </li>
                  <li
                    className="ant-menu-item ant-menu-item-only-child"
                    role="menuitem"
                  >
                    <a href="/">
                      <span
                        role="img"
                        aria-label="shop"
                        className="anticon anticon-shop mr-3"
                      >
                        <svg
                          viewBox="64 64 896 896"
                          focusable="false"
                          data-icon="shop"
                          width="1em"
                          height="1em"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M882 272.1V144c0-17.7-14.3-32-32-32H174c-17.7 0-32 14.3-32 32v128.1c-16.7 1-30 14.9-30 31.9v131.7a177 177 0 0014.4 70.4c4.3 10.2 9.6 19.8 15.6 28.9v345c0 17.6 14.3 32 32 32h676c17.7 0 32-14.3 32-32V535a175 175 0 0015.6-28.9c9.5-22.3 14.4-46 14.4-70.4V304c0-17-13.3-30.9-30-31.9zM214 184h596v88H214v-88zm362 656.1H448V736h128v104.1zm234 0H640V704c0-17.7-14.3-32-32-32H416c-17.7 0-32 14.3-32 32v136.1H214V597.9c2.9 1.4 5.9 2.8 9 4 22.3 9.4 46 14.1 70.4 14.1s48-4.7 70.4-14.1c13.8-5.8 26.8-13.2 38.7-22.1.2-.1.4-.1.6 0a180.4 180.4 0 0038.7 22.1c22.3 9.4 46 14.1 70.4 14.1 24.4 0 48-4.7 70.4-14.1 13.8-5.8 26.8-13.2 38.7-22.1.2-.1.4-.1.6 0a180.4 180.4 0 0038.7 22.1c22.3 9.4 46 14.1 70.4 14.1 24.4 0 48-4.7 70.4-14.1 3-1.3 6-2.6 9-4v242.2zm30-404.4c0 59.8-49 108.3-109.3 108.3-40.8 0-76.4-22.1-95.2-54.9-2.9-5-8.1-8.1-13.9-8.1h-.6c-5.7 0-11 3.1-13.9 8.1A109.24 109.24 0 01512 544c-40.7 0-76.2-22-95-54.7-3-5.1-8.4-8.3-14.3-8.3s-11.4 3.2-14.3 8.3a109.63 109.63 0 01-95.1 54.7C233 544 184 495.5 184 435.7v-91.2c0-.3.2-.5.5-.5h655c.3 0 .5.2.5.5v91.2z"></path>
                        </svg>
                      </span>
                      <span className="font-weight-normal">Billing</span>
                    </a>
                  </li>
                  <li
                    className="ant-menu-item ant-menu-item-only-child"
                    role="menuitem"
                  >
                    <a href="/">
                      <span
                        role="img"
                        aria-label="question-circle"
                        className="anticon anticon-question-circle mr-3"
                      >
                        <svg
                          viewBox="64 64 896 896"
                          focusable="false"
                          data-icon="question-circle"
                          width="1em"
                          height="1em"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                          <path d="M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z"></path>
                        </svg>
                      </span>
                      <span className="font-weight-normal">Help Center</span>
                    </a>
                  </li>
                  <li
                    className="ant-menu-item ant-menu-item-only-child"
                    role="menuitem"
                  >
                    <span>
                      <span
                        role="img"
                        aria-label="logout"
                        className="anticon anticon-logout mr-3"
                      >
                        <svg
                          viewBox="64 64 896 896"
                          focusable="false"
                          data-icon="logout"
                          width="1em"
                          height="1em"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 01-112.7 75.9A352.8 352.8 0 01512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 01-112.7-75.9 353.28 353.28 0 01-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 000-12.6z"></path>
                        </svg>
                      </span>
                      <span className="font-weight-normal">Sign Out</span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </Sider>
      <Layout>
        <Content className="template-content">
          <Row>
            <Col span={8}>
              <h2 style={{ marginBottom: "0.5em" }}>
                <Avatar
                  style={{
                    background: "#F6F6F9",
                    color: "#000",
                    marginRight: "15px",
                  }}
                  size={32}
                  icon={<CaretLeftOutlined />}
                />
                <b>Templates</b>
              </h2>
            </Col>
            <Col offset={10} span={6}>
              <Input
                placeholder="Search Templates"
                prefix={<SearchOutlined />}
              />
            </Col>
          </Row>
          <Row>
            <TemplateModal />
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}

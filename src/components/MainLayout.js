import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Layout, Avatar, Upload } from "antd";
import { FaPalette, FaFont, FaCamera, FaSmiley, FaUpload } from "./FontAwesome";
import MainContent from "./MainContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar";
import logo from "../assets/imgs/logo.png";
import SideMenuContent from "./Editor/SideMenuContent";
import { SlidesProvider } from "../providers/Slides";
import { UploadFiles } from "./Editor/SideBar/Upload/Upload";

const { Sider } = Layout;

export default function MainLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const [sideType, setSideType] = useState("");
  const [customComponent, setCustomComponent] = useState([]);
  const [uploadFiles, setUploadFiles] = useState(null);
  const [preview, setPreview] = useState(true);

  const history = useHistory();

  const openSecondarySider = (type) => {
    if (sideType === type && isOpen) {
      setIsOpen(false);
      setSideType("");
      return;
    } else {
      setIsOpen(true);
      switch (type) {
        case "background":
          setSideType(type);
          break;
        case "text":
          setSideType(type);
          break;
        case "media":
          setSideType(type);
          break;
        case "objects":
          setSideType(type);
          break;
        case "help":
          setSideType(type);
          break;
        case "custom":
          setSideType(type);
          break;
        case "upload":
          setSideType(type);
          break;
        default:
          setIsOpen(!isOpen);
          break;
      }
    }
  };
  const [visible, setVisible] = useState(false);

  return (
    <SlidesProvider>
      <Layout className="sect main-sidebar">
        <Sider className="sider">
          <div className="logo">
            <Avatar
              shape="square"
              size="medium"
              src={logo}
              onClick={() => history.push("/stories/templates")}
            />{" "}
          </div>
          <div
            className={
              sideType === "background" && isOpen
                ? "sideBarContent sideBarContent-active"
                : "sideBarContent"
            }
            onClick={() => openSecondarySider("background")}
          >
            <div className="sideBarIcons">
              <FaPalette />
            </div>
            <div className="sideBarTexts">Background</div>
          </div>

          <div
            className={
              sideType === "text" && isOpen
                ? "sideBarContent sideBarContent-active"
                : "sideBarContent"
            }
            onClick={() => openSecondarySider("text")}
          >
            <div className="sideBarIcons">
              <FaFont />
            </div>
            <div className="sideBarTexts">Text</div>
          </div>

          <div
            className={
              sideType === "media" && isOpen
                ? "sideBarContent sideBarContent-active"
                : "sideBarContent"
            }
            onClick={() => openSecondarySider("media")}
          >
            <div className="sideBarIcons">
              <FaCamera />
            </div>
            <div className="sideBarTexts">Media</div>
          </div>

          <div
            className={
              sideType === "objects" && isOpen
                ? "sideBarContent sideBarContent-active"
                : "sideBarContent"
            }
            onClick={() => openSecondarySider("objects")}
          >
            <div className="sideBarIcons">
              <FaSmiley />
            </div>
            <div className="sideBarTexts">Objects</div>
          </div>

          <div
            className={
              sideType === "objects" && isOpen
                ? "sideBarContent sideBarContent-active"
                : "sideBarContent"
            }
            onClick={() => {
              openSecondarySider("upload");
              setUploadFiles({ component: <UploadFiles /> });
              // setVisible(true)
            }}
          >
            <div className="sideBarIcons">
              {/* <FaUpload /> */}
              <FontAwesomeIcon icon={faCloudUploadAlt} />
            </div>
            <div className="sideBarTexts">Upload</div>
          </div>

          <div className="sideLastItem">?</div>
        </Sider>

        {/* {isOpen && sideType && ( */}
        <SideMenuContent
          sideType={sideType}
          open={isOpen}
          onClose={() => {
            setIsOpen(!isOpen);
            setSideType("");
          }}
          customComponent={customComponent}
          uploadFiles={uploadFiles}
        />
        {/* )} */}
        <Layout className="sect">
          <Navbar
            openAnimationPanel={({ component }) => {
              setIsOpen(true);
              setCustomComponent({ component, name: "Animations" });
              openSecondarySider("custom");
            }}
          />
          <MainContent />
        </Layout>
      </Layout>
    </SlidesProvider>
  );
}

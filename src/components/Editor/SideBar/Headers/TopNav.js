import React, { useState } from "react";
import { Layout } from "antd";
import { FaUndo, FaRedo, FaPlay } from "../../../FontAwesome";
import BasicButton from "../../../form_control/BasicButton";
// import {undo,redo } from "../../../../redux/middlewares/undoRedo"
import { push, pop } from "../../../../redux/slices/actionStackSlice";
import Stories from "react-insta-stories";
import { ActionCreators } from "redux-undo";
import { useDispatch, useSelector } from "react-redux";
import * as htmlToImage from "html-to-image";
// import { STORIES_KEY } from '../../../../helper/contants';
import { selectCount } from "../../../../redux/slices/storiesSlice";
import { useOnDrop, useRedux, useStories } from "../../../../hooks";
import { Button, Modal, Carousel } from "antd";
const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
const contentStyle2 = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7pWVyFRA4Kr7JSzGXOpOgSAys7yS1A7o5SttJwrP-t5czKLexFq-Z-cWfe-l5napC1Iw&usqp=CAU",
  "https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg",
  "https://images.unsplash.com/photo-1628504672396-167ffac88e95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGF2ZW58ZW58MHx8MHx8&w=1000&q=80",
];
const { Header } = Layout;

const TopNav = () => {
  const stated = useSelector(selectCount);
  // console.log("999", stated);
  const story = useStories();
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cusstore, setCusstore] = useState([]);
  console.log("first", story);
  const showModal = async () => {
    let arr = [];

    const arrayOfPromises = await story?.storyLayers.map(async function (item) {
      let imageUrls = await htmlToImage.toPng(document.getElementById(item.id));
      return imageUrls;
    });
    const arrayOfData = await Promise.all(arrayOfPromises);

    for (let i = 0; i < arrayOfData.length; i++) {
      arr.push(arrayOfData[i]);
    }
    console.log("arr", arrayOfData);
    console.log("arrlenght", arr.length);
    setCusstore(arr);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  console.log("cusstore", cusstore.length);
  console.log("cusstoresssssss", cusstore);
  return (
    <div>
      <Header className="headerOne">
        <BasicButton
          className="btn"
          type="default"
          withTooltip
          tooltipProps={{
            tooltipTitle: "Go back to list of stories",
            tooltipPosition: "right",
          }}
        >
          My Stories
        </BasicButton>
        {/*////////////////////////////////////////////// undo  backward*/}
        <BasicButton
          withTooltip
          onClick={() => dispatch(ActionCreators.undo())}
          tooltipProps={{ tooltipTitle: "Undo" }}
          icon={<FaUndo />}
          className="btn btn-undo"
          type="default"
          size="sm"
        />
        {/*/////////////////////////////////////////////// redo forward */}
        <BasicButton
          withTooltip
          onClick={() => dispatch(ActionCreators.redo())}
          tooltipProps={{ tooltipTitle: "Redo" }}
          icon={<FaRedo />}
          className="btn btn-redo"
          type="default"
          size="sm"
        />
        <Modal
          title="Stories"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <Stories
            stories={cusstore.slice(0, -1)}
            defaultInterval={1500}
            // width={432}
            // height={768}
          />
          {/* <Carousel {...settings} arrows>
            <div>
              <h3 style={contentStyle}>1</h3>
            </div>
            <div>
              <h3 style={contentStyle}>2</h3>
            </div>
            <div>
              <h3 style={contentStyle}>3</h3>
            </div>
            <div>
              <h3 style={contentStyle}>4</h3>
            </div>
          </Carousel> */}
        </Modal>
        <div className="leftSideOfNav">
          <BasicButton
            // topBar={<LayerHeader number={i + 1} />}
            withTooltip
            tooltipProps={{ tooltipTitle: "View Your Slides" }}
            icon={<FaPlay />}
            className="btn"
            type="default"
            onClick={showModal}
          >
            &nbsp;Preview
          </BasicButton>
          <BasicButton
            className="btn"
            type="default"
            withTooltip
            tooltipProps={{
              tooltipTitle: "Publish story",
            }}
          >
            Publish
          </BasicButton>
          <BasicButton
            className="btn btn-save"
            type="default"
            withTooltip
            tooltipProps={{
              tooltipTitle: "Save story",
              tooltipPosition: "left",
            }}
          >
            Save
          </BasicButton>
        </div>
      </Header>
    </div>
  );
};

export { TopNav };

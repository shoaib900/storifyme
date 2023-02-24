import React, { useCallback, useState } from "react";
import { Modal, Card, Button, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ModalForm from "./ModalForm";
import { useHistory } from "react-router-dom";
import { createStory } from "../../redux/slices/storiesSlice";
import { useRedux } from "../../hooks";
import { generateId } from "../../helper/meta";
import {
  MIN_STORY_NAME_LENGTH,
  MAX_STORY_NAME_LENGTH,
  REQUIRED_STORY_MIN_MSG,
  REQUIRED_STORY_MAX_MSG,
} from "../../helper/contants";
import AllStories from "./AllStories";

const { Meta } = Card;

const TemplateModal = () => {
  const [dispatch] = useRedux();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [storyName, setStoryName] = useState("");
  const [storyTags, setTags] = useState("");
  const [error, setError] = useState(null);

  const history = useHistory();
  const goto = (url) => history.push(url);

  let setNameOfStory = useCallback((name) => {
    if (error && name === "") setError("Please enter story name!");
    else if (error && name.length < MIN_STORY_NAME_LENGTH)
      setError(REQUIRED_STORY_MIN_MSG);
    else if (error && name.length > MAX_STORY_NAME_LENGTH)
      setError(REQUIRED_STORY_MAX_MSG);
    else if (
      error &&
      name.length >= MIN_STORY_NAME_LENGTH &&
      name.length <= MAX_STORY_NAME_LENGTH
    )
      setError(" ");
    setStoryName(name);
  });

  const createNewStory = () => {
    if (storyName === "") setError("Please enter story name!");
    else if (storyName.length < MIN_STORY_NAME_LENGTH)
      setError(REQUIRED_STORY_MIN_MSG);
    else if (storyName.length > MAX_STORY_NAME_LENGTH)
      setError(REQUIRED_STORY_MAX_MSG);
    else {
      let id = generateId();
      dispatch(createStory({ name: storyName, tags: storyTags, id }));
      setIsModalVisible(!isModalVisible);
      goto(`/story/${id}`);
    }
  };

  const handleVisibility = () => {
    setIsModalVisible(!isModalVisible);
  };


  return (
    <>
      <Col span={4} key={generateId()}>
        <Card
          hoverable
          style={{
            width: 200,
            height: 360,
            borderRadius: 15,
            textAlign: "center",
            padding: "120px 0",
            background: "#F0F2F5",
          }}
          onClick={handleVisibility}
        >
          <PlusOutlined className="dashboard-scratch" />
          <Meta title=" Start from scratch" />
        </Card>
      </Col>

      <AllStories />

      <div id="codeblock"></div>

      <Modal
        title="New Story"
        visible={isModalVisible}
        className="templateModal"
        onCancel={handleVisibility}
        footer={[
          <Button
            type="primary"
            onClick={handleVisibility}
            className="modal-cancel-button"
            key={1}
          >
            Cancel
          </Button>,
          <Button
            type="primary"
            onClick={createNewStory}
            className="modal-create-button"
            key={2}
          >
            Create Stories
          </Button>,
        ]}
      >
        <ModalForm
          setStoryName={setNameOfStory}
          setTags={setTags}
          error={error}
          onSubmit={createNewStory}
        />
      </Modal>
    </>
  );
};

export default TemplateModal;

import { useDrop } from "react-dnd";
import { ItemTypes } from "../helper/contants";
import { updateStoryLayer } from "../redux/slices/storiesSlice";
import { useRedux } from "./";

const useOnDrop = () => {
  const [dispatch, , getState] = useRedux();
  const { currentSlide } = getState("story");
  const { HEADER1, HEADER2, HEADER3, HEADER4, PARAGRAPH, SPAN, IMAGE } =
    ItemTypes;
  const [{ isOver, isOverCurrent }, drop] = useDrop(
    () => ({
      accept: [HEADER1, HEADER2, HEADER3, HEADER4, PARAGRAPH, SPAN, IMAGE],

      drop(item, monitor) {
        let val = "";
        let alt = "";
        let { props } = item.children;
        if (monitor.getItemType() === "img") {
          // console.log('iamge', item.children.props['data-url'])
          val = props["data-url"] ?? props.src;
          alt = props.alt;
        } else {
          val = props.children.props.children;
        }
        const didDrop = monitor.didDrop();
        dispatch(updateStoryLayer({ type: monitor.getItemType(), val, alt }));
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
      }),
    }),
    [currentSlide]
  );

  return [drop];
};

export default useOnDrop;

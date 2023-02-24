import React from "react";
import "../../../../assets/css/animation.css";
import { ANIMATIONS } from "../../../../helper/contants";
import { capitalizeString } from "../../../../helper/meta";
import { useRedux } from "../../../../hooks";

import {
  setAnimations
} from "../../../../redux/slices/storiesSlice";

const Animation = () => {
  let [dispatch] = useRedux();
  const animate = (e, animate, type) => {
    let anim = e.currentTarget.children[0];
    if (type) anim.classList.add(animate);
    else anim.classList.remove(animate);
  };
  // const userd = useSelector((state) => state.STORIES_KEY.animations);
  // console.log("anim", userd);
  return (
    <div>
      {/* <h3>Animations</h3> */}
      <div className="animations-container sideBarContent-active">
        {ANIMATIONS.map((animation, i) => {
          return (
            <div
              key={i}
              onMouseOver={(e) => {
                animate(e, animation, i);
                dispatch(
                  setAnimations(animation)
                );

                // dispatch(changeRectAlignments({ newAligns, index: 0 }));
              }}
              onMouseLeave={(e) => animate(e, animation, 0)}
              className="animation-container"
            >
              {console.log("ani", animation)}
              <div className="animation"></div>
              <span>{capitalizeString(animation, "-")}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { Animation };

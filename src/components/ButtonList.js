import React from "react";
import Button from "./Button";

const list = [
  "All",
  "Shorts",
  "Ghosts",
  "Web Development",
  "Music",
  "Podcasts",
  "Live",
  "Recently uploaded",
  "Over 20 minutes",
];

const ButtonList = () => {
  return (
    <div className="flex">
      {list.map((item, id) => {
        return <Button key={id} name={item} />;
      })}
    </div>
  );
};

export default ButtonList;

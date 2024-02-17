import React from "react";
import Button from "./Button";

const list = [
  "All",
  "Gaming",
  "Ghosts",
  "Web Development",
  "Music",
  "Podcasts",
  "Mixes",
  "Chess",
  "News",
  "Cricket",
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

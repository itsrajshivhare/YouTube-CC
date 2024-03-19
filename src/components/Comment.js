import React from "react";

const Comment = ({ data }) => {
  const { name, text } = data;
  return (
    <div className="flex p-2 rounded-md bg-gray-100 my-2">
      <img
        className="w-9 h-9"
        alt="user"
        src="https://pluginicons.craft-cdn.com/commentscvQGFyYIVV53CsHK33dTFFHFFgXnYd9dm0OF.svg?1535165130"
      />
      <div className="px-3">
        <p className="font-bold text-sm">{name}</p>
        <p className="text-sm">{text}</p>
      </div>
    </div>
  );
};

export default Comment;

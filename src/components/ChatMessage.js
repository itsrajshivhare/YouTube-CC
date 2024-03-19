import React from "react";

const ChatMessage = ({ name, message, image }) => {
  return (
    <div className="flex p-2 items-center">
      <img className="h-5 rounded-full" alt="user" src={image} />
      <span className="font-bold px-2 text-[13px] text-[#11111199]">
        {name}
      </span>
      <span className="text-[14px] truncate font-medium">{message}</span>
    </div>
  );
};

export default ChatMessage;

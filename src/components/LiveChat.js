import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { VscSend } from "react-icons/vsc";

const LiveChat = ({ videoId }) => {
  const dispatch = useDispatch();

  const chatMessages = useSelector((store) => store.chat.messages);

  const [liveMessage, setLiveMessage] = useState("");

  useEffect(() => {
    let commentIndex = 0;
    const i = setInterval(async () => {
      // API POLLING
      const data = await fetch(
        `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=AIzaSyADU0dB12ejgTrjz25tH0CxciWBtIdB-bg&maxResults=90`
      );
      const json = await data.json();

      // Extracting data
      const comment = json.items[commentIndex];
      const name = comment.snippet.topLevelComment.snippet.authorDisplayName;
      const message = comment.snippet.topLevelComment.snippet.textDisplay;
      const image =
        comment.snippet.topLevelComment.snippet.authorProfileImageUrl;

      dispatch(
        addMessage({
          name: name,
          message: message,
          image: image,
        })
      );

      commentIndex = (commentIndex + 1) % json.items.length;
    }, 1500);

    return () => clearInterval(i);
  }, [videoId, dispatch]);

  return (
    <>
      <div className="ml-4 w-full h-[500px] border border-gray-300 rounded-lg overflow-y-scroll flex flex-col-reverse">
        {chatMessages.map((comment, id) => (
          <ChatMessage
            key={id}
            name={comment.name}
            message={comment.message}
            image={comment.image}
          />
        ))}
      </div>
      <form
        className="w-full p-2 ml-4 border border-gray-300 rounded-md flex items-center justify-center"
        onSubmit={(e) => {
          e.preventDefault();
          if (liveMessage !== "") {
            dispatch(
              addMessage({
                name: "@rajaryaman26",
                message: liveMessage,
                image:
                  "https://media.licdn.com/dms/image/D4D03AQFTA94cVuZc9Q/profile-displayphoto-shrink_400_400/0/1687715196065?e=1716422400&v=beta&t=sSvdBVl38axQZePBNiojuOmpepi-a2kPVyD_XqVBcdk",
              })
            );
          }
          setLiveMessage("");
        }}
      >
        <input
          type="text"
          placeholder="Chat..."
          value={liveMessage}
          className="w-72 outline-none px-3 py-1 text-xs border border-gray-200 rounded-xl bg-gray-200"
          onChange={(e) => {
            setLiveMessage(e.target.value);
          }}
        />
        <VscSend
          className="mx-4 text-xl text-gray-500 cursor-pointer"
          onClick={() => {
            if (liveMessage !== "") {
              dispatch(
                addMessage({
                  name: "@rajaryaman26",
                  message: liveMessage,
                  image:
                    "https://media.licdn.com/dms/image/D4D03AQFTA94cVuZc9Q/profile-displayphoto-shrink_400_400/0/1687715196065?e=1716422400&v=beta&t=sSvdBVl38axQZePBNiojuOmpepi-a2kPVyD_XqVBcdk",
                })
              );
            }
            setLiveMessage("");
          }}
        />
      </form>
    </>
  );
};

export default LiveChat;

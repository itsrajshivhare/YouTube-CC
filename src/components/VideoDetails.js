import React, { useEffect, useState } from "react";
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { formatDate, formatCount, formatViewCount } from "../utils/helper";

const VideoDetails = ({ videoId }) => {
  const [videoData, setVideoData] = useState();
  const [channelData, setChannelData] = useState();

  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  useEffect(() => {
    if (!videoId) return; // Skip fetch if videoId is not set
    getVideoData(videoId);
  }, [videoId]);

  const getVideoData = async (videoId) => {
    try {
      // Video data
      const data = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=` +
          "AIzaSyADU0dB12ejgTrjz25tH0CxciWBtIdB-bg"
      );
      const json = await data.json();
      setVideoData(json.items[0]);

      // Channel data
      const channelId = json.items[0]?.snippet?.channelId;

      const data1 = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=` +
          "AIzaSyADU0dB12ejgTrjz25tH0CxciWBtIdB-bg"
      );
      const json1 = await data1.json();
      setChannelData(json1.items[0]);
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  };

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    setIsDisliked(false);
  };

  const handleDislikeClick = () => {
    setIsDisliked(!isDisliked);
    setIsLiked(false);
  };

  return (
    <div className="ml-[4.5rem] pr-4 max-w-[888px]">
      <div className="flex flex-col">
        {/* TITLE OF VIDEO */}

        <div>
          <span className="font-bold text-lg">
            {videoData?.snippet?.localized?.title}
          </span>
        </div>

        {/* Channel details and buttons */}

        <div className="py-3 flex">
          <img
            className="h-10 rounded-full"
            alt="channel-logo"
            src={channelData?.snippet?.thumbnails?.default?.url}
          />
          <div className="flex flex-col px-2">
            <span className="text-sm font-semibold">
              {videoData?.snippet?.channelTitle}
            </span>
            <span className="text-[15px] text-gray-600">
              {formatViewCount(channelData?.statistics?.subscriberCount)}{" "}
              subscribers
            </span>
          </div>

          <button className="ml-2 px-3 py-1 text-white bg-black rounded-full text-xs cursor-pointer">
            Subscriber
          </button>

          <div className="ml-36 px-2 flex items-center border bg-gray-100 rounded-3xl">
            {isLiked ? (
              <BiSolidLike
                className="ml-4 mr-2 text-xl cursor-pointer"
                onClick={handleLikeClick}
              />
            ) : (
              <BiLike
                className="ml-4 mr-2 text-xl cursor-pointer"
                onClick={handleLikeClick}
              />
            )}

            <span className="mr-2 text-sm font-semibold">
              {formatViewCount(videoData?.statistics?.likeCount)}
            </span>

            <div className="border-l border-gray-200 h-8"></div>

            {isDisliked ? (
              <BiSolidDislike
                className="text-xl mx-4 cursor-pointer"
                onClick={handleDislikeClick}
              />
            ) : (
              <BiDislike
                className="text-xl mx-4 cursor-pointer"
                onClick={handleDislikeClick}
              />
            )}
          </div>
        </div>

        {/* DESCRIPTION OF VIDEO */}

        <div className="px-2 pb-2 bg-gray-200 rounded-lg">
          <span className="text-xs font-semibold">
            {formatCount(videoData?.statistics?.viewCount)} views •{" "}
            {formatDate(videoData?.snippet?.publishedAt)}
          </span>
          <p className="text-xs font-medium text-gray-600">
            {videoData?.snippet?.description.split("\n").map((line, id) => (
              <p key={id} className="text-xs font-medium text-gray-600">
                {line}
                <br />
              </p>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;

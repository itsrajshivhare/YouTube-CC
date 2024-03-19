import React from "react";
import timeAgo from "../utils/timeAgo";

const formatViewCount = (count) => {
  if (count >= 1e6) {
    return (count / 1e6).toFixed(1) + "M views";
  } else if (count >= 1e3) {
    return (count / 1e3).toFixed(1) + "K views";
  } else {
    return count + " views";
  }
};

const VideoCard = ({ info }) => {
  if (!info) {
    return <div>No video information available.</div>;
  }
  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails, publishedAt } = snippet;

  const viewCount = formatViewCount(statistics.viewCount);

  return (
    <div className="p-2 m-2 bg-white w-60 cursor-pointer">
      <img className="rounded-lg" alt="thumbnail" src={thumbnails.medium.url} />
      <ul>
        <li
          className="text-sm py-2 truncate font-semibold"
          style={{ WebkitBoxOrient: "vertical" }}
        >
          {title}
        </li>
        <li className="text-xs text-gray-600 font-medium">{channelTitle}</li>
        <li className="text-xs text-gray-600 font-medium">
          {viewCount} • {timeAgo(publishedAt)}
        </li>
      </ul>
    </div>
  );
};

export default VideoCard;

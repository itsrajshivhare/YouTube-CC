import React, { useEffect, useState } from "react";
import timeAgo from "../utils/timeAgo";
import { Link, useSearchParams } from "react-router-dom";

const SearchVideoCard = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [channelData, setChannelData] = useState({});

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.get("search_query");

    const getSearchResults = async (query) => {
      if (query.trim() === "") return;
      const data = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&maxResults=20&key=` +
          process.env.REACT_APP_GOOGLE_API_KEY
      );
      const json = await data.json();
      console.log(json);
      setSearchResults(json.items);

      // Channel image data for each result vid.
      const channelIds = json.items
        .map((item) => item.snippet.channelId)
        .join(",");

      const data1 = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelIds}&key=` +
          process.env.REACT_APP_GOOGLE_API_KEY
      );
      const json1 = await data1.json();
      setChannelData(
        json1.items.reduce((acc, item) => {
          acc[item.id] = item;
          return acc;
        }, {})
      );
    };

    getSearchResults(query);
  }, [searchParams.get("search_query")]);

  return (
    <div>
      {searchResults.map((result, index) => (
        <Link key={index} to={"/watch?v=" + result?.id?.videoId}>
          <div className="flex m-2 py-2 cursor-pointer" key={index}>
            <img
              className="h-44 rounded-xl border hover:rounded-none"
              src={result?.snippet?.thumbnails?.medium?.url}
              alt="thumbnail"
            />

            <div className="ml-4 mr-8 pr-5 flex flex-col">
              <span>{result?.snippet?.title}</span>
              <span className="text-[12px] text-gray-500">
                2.5M views • {timeAgo(result?.snippet?.publishedAt)}
              </span>

              <div className="flex my-2 items-center">
                <img
                  className="h-5 rounded-full"
                  src={
                    channelData[result?.snippet?.channelId]?.snippet?.thumbnails
                      ?.medium?.url
                  }
                  alt="channel-logo"
                />
                <span className="pl-2 text-xs text-gray-600 font-medium">
                  {result?.snippet?.channelTitle}
                </span>
              </div>

              <p className="text-[14px] text-gray-800 my-2">
                {result?.snippet?.description}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SearchVideoCard;

import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  if (!isMenuOpen) return null;
  return (
    <div className="p-5 mr-10 text-sm w-48">
      <ul className="mb-4">
        <Link to="/">
          <li className="py-1">Home</li>
        </Link>
        <li className="py-1">Shorts</li>
        <li className="pt-1">Subscriptions</li>
      </ul>
      <hr className="my-4 border-t border-gray-300" />
      <h1 className="font-bold text-lg mb-2">Explore</h1>
      <ul className="mb-4">
        <li className="py-1">Music</li>
        <li className="py-1">Sports</li>
        <li className="py-1">Gaming</li>
        <li className="pt-1">Movies</li>
      </ul>
      <hr className="my-4 border-t border-gray-300" />
      <h1 className="font-bold text-lg mb-2">More</h1>
      <ul className="mb-4">
        <li className="py-1">Your channel</li>
        <li className="py-1">History</li>
        <li className="py-1">Watch later</li>
        <li className="py-1">YouTube Premium</li>
      </ul>
    </div>
  );
};

export default Sidebar;

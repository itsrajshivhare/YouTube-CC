import React from "react";
import Comment from "./Comment";

const commentData = [
  {
    name: "Raj aryaman",
    text: "I dont think you should have feel that way lmao!",
    replies: [
      {
        name: "Prakhar gupta",
        text: "Amazing video!",
        replies: [],
      },
    ],
  },
  {
    name: "Rishabh gupta",
    text: "Nice",
    replies: [],
  },
  {
    name: "Naya",
    text: "I dont think you should have feel that way lmao!",
    replies: [
      {
        name: "Ishaan",
        text: "Amazing video!",
        replies: [
          {
            name: "Kanan",
            text: "Thanks, glad you liked it!",
            replies: [
              {
                name: "Atharv",
                text: "Absolutely!",
                replies: [],
              },
              {
                name: "Navi",
                text: "Awesome!",
                replies: [],
              },
            ],
          },
          {
            name: "Dhruv",
            text: "Great stuff!",
            replies: [
              {
                name: "Aarna",
                text: "I agree, this is awesome!",
                replies: [],
              },
              {
                name: "Jai",
                text: "Not bad, keep it up!",
                replies: [
                  {
                    name: "Amar",
                    text: "Meh, seen better.",
                    replies: [],
                  },
                  {
                    name: "Agastya",
                    text: "I'm impressed!",
                    replies: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Nila",
        text: "This is hilarious!",
        replies: [],
      },
    ],
  },
  {
    name: "Tenzin",
    text: "Could use some improvement.",
    replies: [],
  },
  {
    name: "Aditi",
    text: "So-so.",
    replies: [
      {
        name: "Tamia",
        text: "Loved it!",
        replies: [],
      },
      {
        name: "Anjali",
        text: "Not my cup of tea.",
        replies: [
          {
            name: "Ajay",
            text: "I expected more.",
            replies: [],
          },
          {
            name: "Ambar",
            text: "Incredible!",
            replies: [],
          },
        ],
      },
    ],
  },
  {
    name: "Ananya",
    text: "This made my day!",
    replies: [],
  },
];

const CommentsList = ({ comments }) => {
  return comments.map((comment, id) => (
    <div key={id}>
      <Comment data={comment} />
      <div className="pl-5 ml-5 border-l-2 border-black !important">
        <CommentsList comments={comment.replies} />
      </div>
    </div>
  ));
};

const CommentsContainer = () => {
  return (
    <div className="ml-[4.5rem] pr-4 py-4 max-w-[888px]">
      <p className="font-bold text-lg">Comments: </p>
      <CommentsList comments={commentData} />
    </div>
  );
};

export default CommentsContainer;

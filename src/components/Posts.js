import React from 'react';

const Posts = ({ setData }) => {
  return (
    <>
    <ul>
      { setData.map(post=>(
        <li>
          {post.answer}
        </li>
      ))}
    </ul>
  </>
  );
};
export default Posts;
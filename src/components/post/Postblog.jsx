import React, { useState } from 'react';

export default function BlogForm({blogs, setBlogs}) {
  const [newPost, setNewPost] = useState('')
  
  const handleChange = (e) =>{
   setNewPost(e.target.value)
  }


  const handleSubmit = async (e) => {
  e.preventDefault();



  try {
    const response = await fetch('http://localhost:3000/api/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "blogs": `${newPost}` 
        })
    });

    if (response.ok) {
      const data = await response.json();
      setBlogs(data);
      console.log(data)
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

  return (
    <div className="flex justify-center items-center">
      <div className="card w-96 bg-neutral text-neutral-content m-4">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Create Post</h2>
          <form onSubmit={handleSubmit}>
            <input
              id='inputbox'
              type="text"
              className="input input-bordered"
              placeholder="Enter your post"
              value={newPost}
              onChange={handleChange}
            />
            <button type="submit" className="btn btn-primary mt-2">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

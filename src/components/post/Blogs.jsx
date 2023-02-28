import React, { useState } from 'react';

// Define a functional component called Blogs that takes in two props: blogs and handleDelete
const Blogs = ({blogs, handleDelete, setBlogs}) => {

  // Declare two state variables called selectedBlog and editedBlog, and initialize them to null
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [editedBlog, setEditedBlog] = useState(null);

  // Declare an asynchronous function called handleUpdate
  const handleUpdate = async () => {

    // Check if editedBlog is falsy, and return if it is
    if (!editedBlog) return;

    try {
      // Send a PATCH request to the server to update the blog post with the ID of selectedBlog.blogs_id
      const response = await fetch(`/api/blogs/${selectedBlog.blogs_id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedBlog),
      });

      // Check if the HTTP response status code is not OK, and throw an error with a descriptive message if it is not
      if (!response.ok) {
        throw new Error(`Failed to update blog post: ${response.status} ${response.statusText}`);
      }

      // Create a new array of blog posts called updatedBlogs
      const updatedBlogs = blogs.map((blog) =>
        blog.blogs_id === selectedBlog.blogs_id ? editedBlog : blog
        );
        setBlogs(updatedBlogs)
        console.log(updatedBlogs)



        // const filteredPost = blogs.filter((blog)=> id !== blog.blogs_id);
    // setBlogs(filteredPost);





      // Set editedBlog back to an empty array
      setEditedBlog([]);

    } catch (error) {
      console.error(error);
      // Handle any errors that may occur during the HTTP request and log the error to the console
    }

    // Set selectedBlog back to null
    setSelectedBlog(null);
  };


  
  return (
    <div className="flex flex-wrap justify-center">
      {blogs.map((current) => (
        <div key={current.blogs_id} className="card w-96 bg-neutral text-neutral-content m-4">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Blog</h2>
            {selectedBlog?.blogs_id === current.blogs_id ? (
              <input
              id='textinput'
                className="input input-bordered mb-3"
                value={editedBlog?.blogs || ''}
                onChange={(e) => setEditedBlog({ ...selectedBlog, blogs: e.target.value })}
              />
            ) : (
              <p className="text-center" onClick={() => setSelectedBlog(current)}>
                {current.blogs}
              </p>
            )}
            <div className="card-actions justify-end">
              {selectedBlog?.blogs_id === current.blogs_id ? (
                <button className="btn btn-primary bg-green-500" onClick={handleUpdate}>
                  Save
                </button>
              ) : (
                <button className="btn btn-primary bg-green-500" onClick={() => setSelectedBlog(current)}>
                  Update
                </button>
              )}
              <button className="btn btn-ghost bg-red-500" onClick={() => handleDelete(current.blogs_id)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Blogs;

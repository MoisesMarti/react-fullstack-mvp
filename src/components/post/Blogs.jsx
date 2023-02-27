import React, { useState } from 'react'

const Blogs = ({blogs, handleDelete}) => {
  const [selectedBlog, setSelectedBlog] = useState([]);
  const [editedBlog, setEditedBlog] = useState([]);
  

  const handleUpdate = async () => {
    if (!editedBlog) return;
    try {
      const response = await fetch(`http://localhost:3000/api/blogs/${selectedBlog.blogs_id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedBlog),
      });
      if (!response.ok) {
        throw new Error(`Failed to update blog post: ${response.status} ${response.statusText}`);
      }
      const updatedBlogs = blogs.map((blog) =>
        blog.blogs_id === selectedBlog.blogs_id ? editedBlog : blog
      );
      setEditedBlog(null);
    } catch (error) {
      console.error(error);
      // display an error message to the user
    }
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

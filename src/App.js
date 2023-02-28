import { useState, useEffect } from 'react';
import Blogs from "./components/post/Blogs"
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import Singleblogs from './components/post/Postblog';

function App() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('https://myblogs-9xed.onrender.com/api/blogs')
      const data = await response.json()
      setBlogs(data)
    }

    getData()
  }, []);
  
 
  const handleDelete = async (id) => {
     await fetch(`/api/blogs/${id}`, {
      method: 'DELETE'
    });
    const filteredPost = blogs.filter((blog)=> id !== blog.blogs_id);
    setBlogs(filteredPost);
  }
  

  return (
    <>
      <div className=' bg-gray-700 text-red-50'>
        <Header />
      </div>
      <div className='mt-10' >
        <Singleblogs setBlogs={setBlogs} blogs={blogs}  />
      </div>
      <div className='mt-14'>
        <Blogs blogs={blogs} handleDelete={handleDelete}  setBlogs={setBlogs} />
      </div>
      <Footer />
    </>
  )
}

export default App;

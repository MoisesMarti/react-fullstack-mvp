import { useState, useEffect } from 'react';
import Blogs from "./components/post/Blogs"
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import Singleblogs from './components/post/Postblog';

function App() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('http://localhost:3000/api/blogs')
      const data = await response.json()
      setBlogs(data)
    }

    getData()
  }, []);
  
 
  const handleDelete = async (id) => {
     await fetch(`http://localhost:3000/api/blogs/${id}`, {
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
        <Singleblogs setblogs={setBlogs} blog={blogs}  />
      </div>
      <div className='mt-14'>
        <Blogs blogs={blogs} handleDelete={handleDelete} />
      </div>
      <Footer />
    </>
  )
}

export default App;

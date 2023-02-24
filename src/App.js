import {useState, useEffect} from 'react';
import Blogs from "./components/Blogs"
import './App.css';


function App() {

    const [blogs,setblogs] = useState([])
  
  useEffect(() => {

    const getData = async () => {
      const response = await fetch('http://localhost:3000/api/blogs')
      const data = await response.json()
      console.log(data)
      setblogs(data)
    }

    getData()
  }, []) 

  return (
    <div>
    <Blogs blogs={blogs} />
    </div>
    )
    
}

export default App;

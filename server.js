const express = require('express')
const {Pool} = require('pg')
const app = express();
const cors = require ('cors')
app.use(express.json())
app.use(cors())
dotenv.config()
app.use(express.static('src'))
app.use(express.static(path.join(__dirname, "build")))
const pool = new Pool({
  // user: 'moisesmartinez',
  // host: 'localhost',
  // database: 'blogsdatabase',
  // port: 5432

  connectionString: process.env.DATABASE_URL
});

  app.get('/', (req,res) => {
    try {
      res.senfFile(path.join(__dirname, "build", "index.html"))
    } catch (error) {
      res.status(500).send(error)
    }
  })


app.route('/api/blogs')
  .get(async (req,res)=>{
    try {
      const blogs = await pool.query(`SELECT * FROM blog_table`)
      res.status(200).json(blogs.rows)
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  })

  app.get('/api/blogs/:id', async (req, res) => {
    const {id} = req.params;
    try {
      const { rows } = await pool.query(`SELECT * FROM blog_table WHERE blogs_id = '${id}'`);
      if (rows.length === 0) {
        res.status(404).json({ message: `Blog post with id ${id} not found` });
      } else {
        res.status(200).json(rows[0]);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

  app.post('/api/blogs', async (req,res) =>{
    try {
      const {blogs} = req.body
      await pool.query(`INSERT INTO blog_table (blogs) VALUES ('${blogs}')`)
      const {rows} = await pool.query(`SELECT * FROM blog_table`)
      res.status(201).json(rows)
    } catch (error) {
      res.status(500).json({message: error.message})
    }
   
  })
 
app.route('/api/blogs/:id')
  .patch(async (req, res) => {
    try {
      const {id} = req.params
      const {blogs} = req.body
      await pool.query(`UPDATE blog_table SET blogs = '${blogs}' WHERE blogs_id = ${id}`)
      res.status(200).json({validation: true})
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  })

  app.delete('/api/blogs/:id', async (req, res) => {
    const {id} = req.params
    try {
      await pool.query(`DELETE FROM blog_table WHERE blogs_id = ${id}`)
      res.status(204).send();
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  })


app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

import pg from 'pg'
import dotenv from 'dotenv'
const {Pool} = pg
dotenv.config()
const pool = new Pool({
  host:'localhost',
  user:'postgres',
  password: process.env.DB_PASSWORD,
  database: 'taskapi',
  port:5432
})

export const getTasks = async(req,res) => {
  const response = await pool.query('select * from task')
  res.status(200).json(response.rows)
}

export const getTask = async(req,res) => {
  const id = req.params.id
  const response = await pool.query('select * from task where id = $1',[id])
  res.status(200).send(response.rows[0])
}

export const createTask = async(req,res) => {
  const { titulo , descripcion} = req.body
  await pool.query('insert into task (titulo,descripcion) values ($1,$2)',[titulo,descripcion])
  res.status(201).json({
    message: 'Task created successfully',
    body : {titulo,descripcion}
  })
}

export const deleteTask = async(req,res) => {
  const id = req.params.id
  await pool.query('delete from task where id = $1',[id])
  res.status(202).json({messahe : 'Task deleted successfully'})
}

export const updateTask = async(req,res) => {
  const id = req.params.id
  const {titulo,descripcion} = req.body
  await pool.query('update task set titulo=$1 , descripcion=$2 where id =$3', [titulo,descripcion,id])
  res.status(202).json({message :'Updated successfully' })
}
import { Router } from "express"
import { createTask, deleteTask, getTask, getTasks, updateTask } from "../controller/index.controller.js"

const router = Router()

router.get('/', getTasks)
router.get('/:id', getTask)
router.post('/', createTask)
router.delete('/:id',deleteTask)
router.put('/:id', updateTask)
export default router
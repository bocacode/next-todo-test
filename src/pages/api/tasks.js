
const tasks = [
  { task: 'Buy sugar' },
  { task: 'Pickup meds' },
]

export default function handler(req, res) {
  if(req.method === 'POST') {
    const newTask = req.body
    tasks.push(newTask)
  }
  res.status(200).json(tasks)
}

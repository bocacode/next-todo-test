import { useState, useEffect } from 'react'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

const TodoCard = ({ task }) => {
  return (
    <a href='#' className={styles.card}>
      <h2 className={inter.className}>
        {task.task} <span>-&gt;</span>
      </h2>
    </a>
  )
}

export default function Home() {
  const [tasks, setTasks] = useState()
  const [newTask, setNewTask] = useState('')
  useEffect(() => {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(setTasks)
      .catch(alert)
  }, [])
  const handleNewTask = e => {
    e.preventDefault()
    fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: newTask })
    })
      .then(res => res.json())
      .then(setTasks)
      .catch(alert)
      .finally(() => setNewTask(''))
  }
  return (
    <>
      <Head>
        <title>Todo 10</title>
        <meta name='description' content='v10 Todo App bootstrapped with create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <div>
          <h1>Todo 10</h1>
        </div>

        <div className={styles.flex}>
          {!tasks ? (
            <h2>Loading...</h2>
          ) : (
            tasks.map(task => (
              <TodoCard task={task} key={task.task} />
            ))
          )}
          <form onSubmit={handleNewTask}>
            <input value={newTask} onChange={e => setNewTask(e.target.value)} />
          </form>
        </div>
      </main>
    </>
  )
}

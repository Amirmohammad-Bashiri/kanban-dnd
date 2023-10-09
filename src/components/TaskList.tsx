import TaskItem from "./TaskItem";

import { type Id, type Task } from "@/types";

type TaskListProps = {
  tasks: Task[];
  deleteTask: (taskId: Id) => void;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

function TaskList({ tasks, setTasks, deleteTask }: TaskListProps) {
  function updateTasks(taskId: Id, content: string) {
    const newTasks = tasks.map(task => {
      if (task.id !== taskId) return task;
      return { ...task, content };
    });

    setTasks(newTasks);
  }

  return (
    <ul>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          updateTasks={updateTasks}
          deleteTask={deleteTask}
        />
      ))}
    </ul>
  );
}

export default TaskList;

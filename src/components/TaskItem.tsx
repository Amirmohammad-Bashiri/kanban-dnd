import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import TrashIcon from "@/icons/TrashIcon";
import EditIcon from "@/icons/EditIcon";
import OptionsIcon from "@/icons/OptionsIcon";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
// import { Textarea } from "./ui/textarea";

import { type Id, type Task } from "@/types";

type TaskItemProps = {
  task: Task;
  updateTasks: (taskId: Id, content: string) => void;
  deleteTask: (taskId: Id) => void;
};

function TaskItem({ task, updateTasks, deleteTask }: TaskItemProps) {
  const [isEditingTask, setIsEditingTask] = useState(false);
  // const [taskContent, setTaskContent] = useState(task.content);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    // isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: isEditingTask,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card className="bg-mainBackgroundColor px-2.5 my-3 h-[100px] min-h-[100px] items-center flex rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab text-white border-none">
        <CardContent className="flex items-center justify-between flex-grow p-0 px-2">
          {!isEditingTask ? (
            <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-auto whitespace-pre-wrap">
              {task.content}
            </p>
          ) : (
            // <Textarea
            //   autoFocus
            //   value={task.content}
            //   onChange={e => updateTasks(task.id, e.target.value)}
            //   onKeyDown={e => {
            //     if (e.key === "Enter" && e.shiftKey) {
            //       setIsEditingTask(false);
            //     }
            //   }}
            //   onBlur={() => setIsEditingTask(false)}
            //   className="px-2 bg-transparent border-none rounded outline-none resize-none ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            //   placeholder="Type your message here."
            // />

            <Input
              autoFocus
              value={task.content}
              onChange={e => updateTasks(task.id, e.target.value)}
              onKeyDown={e => {
                if (e.key !== "Enter") return;
                setIsEditingTask(false);
              }}
              onBlur={() => setIsEditingTask(false)}
              className="px-2 bg-black border-2 rounded outline-none ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-rose-500"
            />
          )}
          {!isEditingTask ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-6 h-6 rounded bg-columnBackgroundColor active:opacity-100 opacity-60 hover:opacity-100 stroke-white">
                  <OptionsIcon />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="border-2 border-gray-800 bg-columnBackgroundColor"
                side="left">
                <DropdownMenuItem
                  onClick={() => setIsEditingTask(true)}
                  className="text-white cursor-pointer focus:bg-gray-800 bg-columnBackgroundColor">
                  <button className="flex items-center text-xs text-gray-300 gap-x-1 stroke-indigo-500">
                    <div className="w-5 h-5">
                      <EditIcon />
                    </div>
                    Edit task
                  </button>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="mx-2 my-2 bg-gray-600" />
                <DropdownMenuItem
                  onClick={() => deleteTask(task.id)}
                  className="text-white cursor-pointer focus:bg-gray-800 bg-columnBackgroundColor">
                  <button className="flex items-center text-xs text-gray-300 gap-x-1 stroke-rose-500">
                    <div className="w-5 h-5">
                      <TrashIcon />
                    </div>
                    Delete task
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </CardContent>
      </Card>
    </li>
  );
}

export default TaskItem;

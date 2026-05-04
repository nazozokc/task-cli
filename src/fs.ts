import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { homedir } from "os";
import { dirname } from "path";

export type Task = {
  id: number;
  text: string;
  done: boolean;
};

const FILE_PATH = `${homedir()}/.task-cli/task.json`;

export const load = (): Task[] => {
  if (existsSync(FILE_PATH)) {
    const result = readFileSync(FILE_PATH, "utf-8");
    return JSON.parse(result);
  } else {
    return [];
  }
};

export const save = (task: Task[]): void => {
  try {
    const dir = dirname(FILE_PATH);
    mkdirSync(dir, { recursive: true });

    writeFileSync(FILE_PATH, JSON.stringify(task, null, 2));
  } catch (err) {
    console.error("failed to save task:", err);
  }
};

export const deletetask = (id: number): void => {
  const task = load();
  const deletetask = task.filter((i) => i.id !== id);
  save(deletetask);
};

export const doneTask = (id: number): void => {
  const tasks = load();

  // mapで配列を書き換え
  // ...はオブジェクトの中身を全部コピーする
  const newTasks = tasks.map((task) => {
    if (task.id === id) {
      return { ...task, done: true };
    }
    return task;
  });

  save(newTasks);
};

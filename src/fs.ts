import { homedir } from "os";
import { dirname } from "path";

export type Task = {
  id: number;
  text: string;
  done: boolean;
};

const FILE_PATH = `${homedir()}/.task-cli/task.json`;

export const load = async (): Promise<Task[]> => {
  try {
    const file = Bun.file(FILE_PATH);
    if (await file.exists()) {
      return await file.json();
    }
    return [];
  } catch {
    return [];
  }
};

export const save = async (tasks: Task[]): Promise<void> => {
  try {
    const dir = dirname(FILE_PATH);
    await Bun.mkdir(dir, { recursive: true });
    await Bun.write(FILE_PATH, JSON.stringify(tasks, null, 2));
  } catch (err) {
    console.error("failed to save task:", err);
  }
};

export const deleteTask = async (id: number): Promise<void> => {
  const tasks = await load();
  const filtered = tasks.filter((task) => task.id !== id);
  await save(filtered);
};

export const doneTask = async (id: number): Promise<void> => {
  const tasks = await load();
  const updated = tasks.map((task) =>
    task.id === id ? { ...task, done: true } : task
  );
  await save(updated);
};

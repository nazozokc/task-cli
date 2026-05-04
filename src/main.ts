#!/usr/bin/env node

import { consola } from "consola";
import { Command } from "commander";
import { load, save, deleteTask, doneTask, type Task } from "./fs";

const runCLI = () => {
  const program = new Command();

  program.name("task").description("task management cli tool").version("0.1.0");

  program
    .command("add")
    .argument("<text>")
    .action((text) => {
      const newTask: Task = {
        id: Date.now(),
        text,
        done: false,
      };

      const tasks = load();
      tasks.push(newTask);
      save(tasks);
    });

  program
    .command("list")
    .argument("<text>")
    .action((text) => {
      consola.log(load());
    });

  program
    .command("delete")
    .argument("<id>")
    .action((id: number) => {
      deletetask(id);
    });

  program
    .command("done")
    .argument("<id>")
    .action((id: number) => {
      doneTask(id);
    });

  program.parse();
};

runCLI();

#!/usr/bin/env node

import { consola } from "consola";
import { Command } from "commander";
import { load, save, deleteTask, type Task, deletetask } from "./fs";

const runCLI = () => {
  const program = new Command();

  program.name("task").description("task management cli tool").version("0.1.0");

  program
    .command("add")
    .argument("<text>")
    .action((text) => {
      save(text);
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

  program.parse();
};

runCLI();

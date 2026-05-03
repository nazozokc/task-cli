import { consola } from "consola";
import * as fs from "fs";
import { Command } from "commander";
import { load, save, deleteTask, type Task } from "./fs";

const runCLI = () => {
  const program = new Command();

  program.name("task").description("task management cli tool").version("0.1.0");

  program
    .command("add")
    .argument("<text>")
    .action((text) => {
      save(text);
    });
};

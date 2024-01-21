#!/usr/bin/env node
import { Command, program } from "commander";

const test = new Command("test");
test.action(() => console.log("test"));

program.version("0.0.1");

program.addCommand(test);


program.parse(process.argv);
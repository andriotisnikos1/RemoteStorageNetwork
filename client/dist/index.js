#!/usr/bin/env node
import { program } from "commander";
import validateConfig from "./util/validateConfig.js";
import "./util/commandGrouper.js";
program.version("0.0.1")
    .description("Remote Network Storage CLI");
export const basePath = await validateConfig();
program.parse(process.argv);

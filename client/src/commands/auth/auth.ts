import { Command } from "commander";
import login from "./login.js";

const auth = new Command("auth")
    .description("Authentication commands")
    .addCommand(login)


export default auth;
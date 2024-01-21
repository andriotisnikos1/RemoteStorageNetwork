import { spinner, text } from "@clack/prompts";
import axios from "axios";
import { Command } from "commander";

interface Ping {
    authAcceptable: boolean
}

const command = new Command("login")
    .description("Login to a Remote Storage Network server")
    .action(action)



async function action() {
    try {
        const networkHost = await text({
            message: "What's the network host? (e.g. rsn.andriotis.me or 192.168.1.255)",
            validate: (input: string) => {
                if (!input || input.includes("://") || input.includes("/")) return "Please provide a valid network host";
                return;
            }   
        })
        const pingSpinner = spinner()
        pingSpinner.start(`Pinging ${String(networkHost)}...`)
        const {data: {authAcceptable}} = await axios.get<Ping>(`http://${String(networkHost)}/auth/ping`)
        if (!authAcceptable) {
            pingSpinner.stop("This server has disabled authentication", 1)
            return;
        }
        pingSpinner.stop("Authentication is enabled! Proceeding as usual...", 0)
        const username = String(await text({
            message: "What's your username?",
            validate: (input: string) => {
                if (!input) return "Please provide a valid username";
                return;
            },
            placeholder: "username",
        }))
        const password = String(await text({
            message: `Hello ${username}! What's your password?`,
            validate: (input: string) => {
                if (!input) return "Please provide a valid password";
                return;
            },
            placeholder: "********",
        }))
        
        const loginSpinner = spinner()
        loginSpinner.start("Attempting to login...")
        const {data: {token}} = await axios.get<{token: string}>(`http://${String(networkHost)}/auth/login`, {
            headers: {
                Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`
            }
        })
        loginSpinner.stop("Logged in!", 0)
        console.log(token)
    } catch (error) {
        console.log("Error:", error)
    }
}

export default command
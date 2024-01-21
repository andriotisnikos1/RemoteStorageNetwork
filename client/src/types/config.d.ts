export namespace Config {
    interface Node {
        alias: string
        host: string
        token: string
    }

    interface Config {
        nodes: Node[]
    }
}
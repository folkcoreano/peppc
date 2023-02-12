import Server from "lume/core/server.ts";

const server = new Server({
	port: 8000,
	root: `${Deno.cwd()}/dist`,
});

console.log("http://localhost:8000");

server.start();

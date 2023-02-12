import Server from "server";

const server = new Server({
	port: 8000,
	root: `${Deno.cwd()}/dist`,
});

server.start();

console.log("http://localhost:8000");

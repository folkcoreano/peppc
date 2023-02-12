import Server from "https://deno.land/x/lume@v1.15.2/core/server.ts";

const server = new Server({
	port: 8000,
	root: `${Deno.cwd()}/dist`,
});

console.log("http://localhost:8000");

server.start();

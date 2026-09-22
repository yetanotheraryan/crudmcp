import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio";
import z from "zod";


const server = new McpServer({
  name: "crudmcp",
  version: "1.0.0",
})


// server.tool("create-user", "")

server.tool(
  "create-user",
  "Creates a new user",
  {
    name: z.string(),
    phone: z.string()
  },
  {
    title: "Create User",
    readOnlyHint: false,
    destructiveHint: false,
    idempotentHint: false,
    openWorldHint: true
  },
  async ({ name, phone }) => {
    try{
      // return format should be this only, as expected this makes basically MCP unified and not like rest where response type can be anything.
      return {
        content: [
          {
            type: "text",
            text: `User created successfully: ${name}, ${phone}`
          }
        ]
      }
    }catch(error: any){
      return {
        content: [
          {
            type: "text",
            text: `Error creating user: ${error}`
          }
        ]
      }

    }
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error("Error starting server:", err);
});
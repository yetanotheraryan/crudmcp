import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio";
import z from "zod";
import * as fs from "fs/promises";


const server = new McpServer({
  name: "crudmcp",
  version: "1.0.0",
})


server.resource(
  "fetch-users", 
  "users://all",
  {
    description: "Users information",
    title: "Users",
    mimeType: "application/json",
  },
  async uri => {
    const { default: users } = await import("../data/user.json", {
      with: { type: "json" }
    });
    return {
      contents: [
        {
          uri: uri.href,
          text: JSON.stringify(users),
          mimeType: "application/json"
        }
      ]
    }
  }
)

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
    try {
      // return format should be this only, as expected this makes basically MCP unified and not like rest where response type can be anything.
      await createUser({ name, phone });
      return {
        content: [
          {
            type: "text",
            text: `User created successfully: ${name}, ${phone}`
          }
        ]
      }
    } catch (error: any) {
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

async function createUser({ name, phone }: { name: string; phone: string }): Promise<void> {
  const { default: users } = await import("../data/user.json", {
  with: { type: "json" }
});
  console.log("existing user data found for adding a new user: ", users)
  users.push({ name, phone });
  await fs.writeFile(new URL("../data/user.json", import.meta.url), JSON.stringify(users, null, 2));
  console.log("user data updated successfully")
}

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error("Error starting server:", err);
});
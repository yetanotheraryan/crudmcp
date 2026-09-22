# TypeScript CRUD MCP Server

A simple **Model Context Protocol (MCP)** server built with TypeScript that demonstrates CRUD operations using **MCP Tools** and data access using **MCP Resources**.

## Features

* Create, read, update, and delete users
* MCP Tools for CRUD operations
* MCP Resource for reading user data
* In-memory data storage
* STDIO transport

## Setup

```bash
npm install
npm run dev
```

## MCP Tools

* `create_user` - Create a user
* `fetch_user` - fetches the list of users present.
## MCP Resource

```text
users://list
```

Returns the current list of users.

## Example

```text
create_user
{
  "name": "Aryan",
  "email": "aryan@example.com"
}
```

The created user can then be retrieved, updated, or deleted using the corresponding MCP tools.

## Tech Stack

TypeScript • Node.js • MCP SDK • Zod

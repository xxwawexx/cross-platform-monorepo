# ⚛️ Cross-Platform Monorepo Boilerplate 🚀

This is a production-ready boilerplate for building full-stack, offline-first applications with a shared codebase. It's designed for projects that need a web presence, mobile access via a Progressive Web App (PWA), and a powerful desktop application with offline capabilities, all supported by a robust backend API.

The core philosophy is to maximize code reuse through a `pnpm` workspace, shared UI components, and common type definitions.

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed on your system:

-   **Node.js**: `v22.x` or higher is required.
-   **pnpm**: This monorepo is managed with `pnpm`. If you don't have it, install it globally:
    ```bash
    npm install -g pnpm
    ```
-   **Docker**: Docker Desktop must be installed and running to manage the local PostgreSQL database.

---

## 🚀 Tech Stack & Versions

This boilerplate is built with a modern, type-safe stack.

-   **Monorepo:**
    -   pnpm: `^9.x`
-   **Frontend (Web, Mobile & Desktop):**
    -   Next.js: `v15.x`
    -   Electron: `^31.x`
    -   Vite: `^5.x`
    -   React: `v19.x`
-   **Backend:**
    -   NestJS: `v11.x`
-   **Database & ORM:**
    -   Prisma: `v6.x`
    -   PostgreSQL: `15`
    -   SQLite
-   **UI & Styling:**
    -   Material-UI (MUI): `v5.x`
    -   Tailwind CSS: `v3.x`

---

## ✨ Core Features

-   🔗 **Unified Monorepo:** A single `pnpm` workspace to manage all your applications and shared packages.
-   💻 **Cross-Platform UI:** Write your components once with the shared `ui-components` package. They automatically render as optimized Next.js components on the web and as standard elements in the Electron app.
-   🌐 **Web & Mobile (PWA):** A Next.js application built with the App Router, ready to be deployed as a Progressive Web App for a native-like mobile experience.
-   🔌 **Offline-First Desktop App:** The Electron and Vite setup is pre-configured with a separate SQLite database via Prisma, allowing your desktop application to work completely offline.
-   ☁️ **Scalable Backend:** A powerful and extensible NestJS API to serve all your clients.
-   🔒 **Type-Safe Database Layer:** End-to-end type safety with Prisma, configured for both PostgreSQL (server) and SQLite (desktop).
-   🐳 **Local Development Ready:** Includes a `docker-compose.yml` file to instantly spin up a local PostgreSQL database.

---

## 🏁 Getting Started: Setting Up a New Project

Follow these steps to configure this boilerplate for your new project.

### Step 1: Create the Project from the Template

The best way is to use this repository as a GitHub Template.

1.  Click the **"Use this template"** button on the [repository page](https://github.com/xxwawexx/cross-platform-monorepo).
2.  Give your new repository a name (e.g., `my-new-app`).
3.  Clone your new repository to your local machine:
    ```bash
    git clone https://github.com/your-username/my-new-app.git
    cd my-new-app
    ```

### Step 2: Configure Your Project Name ✏️

You will need to replace `[project-name]` in several key files and directories. **`[project-name]`** should be a short, lowercase, URL-friendly name (e.g., `evently`, `medflow`, `tracker-app`).

**A. Rename Directories**

In the `apps/` directory, rename the project-specific folders:
1.  Rename `apps/[project-name]-api`
2.  Rename `apps/[project-name]-desktop`
3.  Rename `apps/[project-name]-next`

**B. Update Configuration Files**

Use your code editor's "Find and Replace in Files" feature for the following changes. **Search for `[project-name]` and replace it with your actual project name.**

-   **`package.json`** (in the root directory)
    -   Update the `"name"` field.
-   **`docker-compose.yml`**
    -   Update `container_name: [project-name]-db`.
    -   Update `POSTGRES_DB: [project-name]_db`.
-   **`apps/[project-name]-api/package.json`**
    -   Update the `"name"` field.
-   **`apps/[project-name]-desktop/package.json`**
    -   Update the `"name"` field.
-   **`apps/[project-name]-next/package.json`**
    -   Update the `"name"` field.
-   **`apps/[project-name]-desktop/electron.cjs`**
    -   Update any paths or window titles that may contain the project name.

### Step 3: Install Dependencies 📦

After renaming, you must run a fresh install. A single `pnpm install` command from the root will read all `package.json` files, install all dependencies for all apps and packages, and correctly link everything in the workspace.

```bash
# Run from the project root
pnpm install
```

### Step 4: Set Up Local Environment 🗄️

1.  **Configure Environment Variables for the API:**
    -   Navigate to the API directory: `cd apps/[project-name]-api`.
    -   Create a new `.env` file by copying the example: `cp .env.example .env`.
    -   Open the new `.env` file and ensure the `DATABASE_URL` matches your PostgreSQL setup from `docker-compose.yml`. It should look like this:
        ```env
        DATABASE_URL="postgresql://admin:admin@localhost:5432/[project-name]_db?schema=public"
        ```
    -   **Important:** Replace `[project-name]_db` with the actual database name you set in `docker-compose.yml`.

2.  **Start the Database with Docker:**
    -   Make sure Docker Desktop is running.
    -   From the project root, start the PostgreSQL container:
        ```bash
        docker-compose up -d
        ```

3.  **Run Initial Database Migration:**
    -   The `migrate:dev` command is a convenient script that runs two migrations in sequence: one for the PostgreSQL database (for the web) and one for the SQLite database (for the offline desktop app).
        ```bash
        # Make sure to replace `[project-name]-api` with your actual API package name
        pnpm --filter [project-name]-api migrate:dev
        ```
    -   **Important:** You will be prompted to enter a migration name **twice**. It is safe to use the same name (e.g., `init`) for both prompts.

    -   **For more granular control**, you can also run each migration individually:
        -   To migrate only the PostgreSQL database:
            ```bash
            pnpm --filter [project-name]-api migrate:dev:postgres
            ```
        -   To migrate only the SQLite database:
            ```bash
            pnpm --filter [project-name]-api migrate:dev:sqlite
            ```

### Step 5: Run the Development Servers ⚡

You can run all applications at once or start them individually.

#### Run All Services Concurrently

This is the easiest way to get started. It will start the web app, desktop app, and the backend API at the same time.

```bash
# Run from the project root
pnpm dev
```

#### Running Applications Individually

If you only need to work on one part of the stack, you can run each application separately to save system resources. Use the `pnpm --filter` command.

-   **To start only the Next.js web app:**
    ```bash
    pnpm --filter [project-name]-next dev
    ```

-   **To start only the Electron desktop app:**
    ```bash
    pnpm --filter [project-name]-desktop dev
    ```

-   **To start only the NestJS API (in watch mode):**
    ```bash
    pnpm --filter [project-name]-api start:dev
    ```

Your new project is fully set up and ready for development!

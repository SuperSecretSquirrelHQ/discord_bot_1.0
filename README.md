<p align="center">
  <img src="Red-E_Bot_Banner.png" alt="Red-E Bot Banner" width="100%">
</p>

# 🤖 Red-E Bot (Docker Multi-Deployer)

A streamlined PowerShell utility for Windows users to rapidly deploy and manage multiple Discord bot instances using Docker Desktop. This script automates the directory structure, environment configuration, and container orchestration for two distinct bot architectures under the "Red-E Bot" suite.

## 🚀 Features

* **One-Click Deployment:** Automates the creation of folders, `.env` files, and `docker-compose` configurations.
* **Multi-Bot Support:** Choose between an extensible Python-based bot or a visual flow-based platform.
* **Persistent Storage:** All bot data and configurations are mapped to `C:\DiscordBots\` to ensure data persists across container restarts.
* **Isolated Environments:** Each bot instance runs in its own container with a unique name to prevent conflicts.

---

## 🛠️ Prerequisites

Before running the script, ensure you have the following installed and configured:

1.  **Windows 10/11** with PowerShell enabled.
2.  **Docker Desktop:** Must be installed and **running**.
3.  **Directory Structure:** Ensure the path `C:\DiscordBots` exists on your machine (create it if it doesn't).
4.  **Discord Bot Token:** Create an application and grab your token from the Discord Developer Portal.

---

## 📦 Supported Bot Types

### 1. Red-DiscordBot (Python Framework)
A highly customizable, feature-rich bot written in Python.
* **Best for:** Users who want a powerful, command-driven bot with a massive library of community modules ("cogs").
* **Setup:** The script handles the complex environment setup internally via Docker.

### 2. Node-RED (Visual Flow Platform)
A visual programming tool for wiring together hardware devices, APIs, and online services.
* **Best for:** Users who want to build custom logic visually using flow-based nodes.
* **Setup:** Once deployed, access the UI at `http://localhost:1880` to install the specific Discord palette (e.g., `node-red-contrib-discord-advanced`).

---

## 📖 How to Use

1.  **Download:** Save the `deploy.ps1` script to your computer.
2.  **Execute:** Right-click `deploy.ps1` and select **Run with PowerShell**.
3.  **Follow Prompts:**
    * Select your Bot Type (**1** or **2**).
    * Enter an **Instance Name** (this becomes your folder name in `C:\DiscordBots\`).
    * Enter a **Container Name** (for Docker tracking).
    * (If choosing Type 1) Provide your **Token** and **Prefix**.
4.  **Manage:**
    * Navigate to your bot's folder: `cd C:\DiscordBots\<InstanceName>`
    * View logs: `docker-compose logs -f`
    * Stop bot: `docker-compose down`
    * Start bot: `docker-compose up -d`

---

## 📂 Directory Layout

The script organizes your bots as follows:
```text
C:\DiscordBots/
├── MyPythonBot/
│   ├── .env
│   ├── docker-compose.yml
│   └── data/             <-- Persistent Settings & Modules
└── MyFlowBot/
    ├── docker-compose.yml
    └── data/             <-- Flow JSON & Configuration
```
---

## 💾 Backups

Since all persistent data is stored outside the Docker containers, backing up your bots is straightforward.

1.  **Stop the bot:** Navigate to the instance folder and run `docker-compose down`.
2.  **Copy the Data:** Copy the `data/` folder within your instance directory (e.g., `C:\DiscordBots\MyBot\data`) to a secure location or cloud storage.
3.  **Entire Directory:** For a full recovery backup, copy the `.env` and `docker-compose.yml` files along with the `data/` folder.

---

## 🛠️ Troubleshooting

### Docker Connection Errors
* **Issue:** Script reports "Docker does not appear to be running."
* **Fix:** Ensure Docker Desktop is open and the engine has started (green status icon).

### Bot Fails to Connect (Python Framework)
* **Issue:** Container runs but the bot remains offline.
* **Fix 1 (Intents):** Ensure **Message Content Intent**, **Server Members Intent**, and **Presence Intent** are all toggled **ON** in the [Discord Developer Portal](https://discord.com/developers/applications).
* **Fix 2 (Token):** Check your `.env` file to ensure there are no extra spaces or quotes around your token.

### Port Conflicts (Visual Flow Platform)
* **Issue:** The platform fails to start because port `1880` is already in use.
* **Fix:** If running multiple instances of the visual flow platform, you must edit the `docker-compose.yml` of the second instance to use a different host port (e.g., `"1881:1880"`).

### Permission Errors
* **Issue:** Script fails to create directories on the `C:` drive.
* **Fix:** Run PowerShell as Administrator and verify that the `C:\DiscordBots` base directory exists and is not read-only.

---

## 🤝 Contributing
Feel free to submit issues or pull requests if you'd like to see more bot types added to the deployer!
    

# Clone Sheet

![Selldone](https://img.shields.io/badge/type-Clone--Sheet-f39f37?style=flat&label=Selldone&labelColor=%23567&color=%23000)
[![GitHub](https://img.shields.io/badge/GitHub-clone--sheet-blue?style=flat&logo=github)](https://github.com/selldone/clone-sheet)
[![npm version](https://img.shields.io/npm/v/@selldone/clone-sheet.svg?style=flat-square)](https://www.npmjs.com/package/@selldone/clone-sheet)
[![npm downloads](https://img.shields.io/npm/dm/@selldone/clone-sheet.svg?style=flat-square)](https://www.npmjs.com/package/@selldone/clone-sheet)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

Clone Sheet is a tool that allows you to create a clone of your store's data from [Selldone](https://selldone.com) into an SQL database (MariaDB or MySQL). This data can then be used for AI automation, accounting migrations, or integration with other software solutions.

## Features
- Clones store data from Selldone into a structured SQL database.
- Supports MariaDB and MySQL.
- Can be used for AI automation, data migration, or business analytics.
- Provides a simple setup and user-friendly interface.

---

## Database Setup
To use Clone Sheet, you need to set up a MariaDB or MySQL database. You can install MariaDB on Windows, macOS, or Linux by following this link:

[Download MariaDB](https://mariadb.org/download/?t=mariadb)

---

## Installation & Setup
### 1. Configure the Database
Define the database host (local or remote). The setup process will create the necessary database (if it does not already exist) and update the `.env` configuration file.

Run the setup script:
```bash
node setup.js
```

![Setup Run](_doc/setup-run.png)

---

### 2. Start the Server
The server will run on `http://localhost:3010` or another available port, providing access to the cloned data.

Start the server:
```bash
npm start
```

---

## Usage
### 1. Create Access Token
Click on the **Create Access Token** button, which will redirect you to Selldone. Select your shop, copy the **Access Token** and **Shop ID**, and enter them in the form.

Click **Save & Connect**.

![Access Token Setup](_doc/setup.png)

### 2. Sync Data
You can view available data sources and sync data accordingly.

![Sync Data](_doc/sync.png)

### 3. Explore Data
Access and explore cloned data in the **Explorer** tab.

![Explorer View](_doc/explorer.png)

---

## Visualizing Data with NocoDB
To visualize the cloned data, you can use [NocoDB](https://www.nocodb.com/), an open-source database browser.

### Setup NocoDB via Docker:
```bash
docker run -d \
  --name noco \
  -v "$(pwd)"/nocodb:/usr/app/data/ \
  -p 8080:8080 \
  nocodb/nocodb:latest
```
![img.png](_doc/docker-nocodb.png)
Now you can open NocoDB in your browser at `http://localhost:8080`.

Once running, set the SQL host to `host.docker.internal` and port `3306` (or the correct port for your database).
![img.png](_doc/nocodb-view.png)

---

## Done!
Your store data is now cloned, and you can use it for your automation, reporting, or integrations.
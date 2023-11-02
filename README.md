# Idea Task Management System

Project Description: This a task management application that aims for simplicity and a high user experience. It's made with react for better performance and efficiency.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [License](#license)

## Introduction

The web-app is designed to help you organize your tasks and to-do lists efficiently. It provides a straightforward and intuitive interface for adding, updating, and managing your tasks. View live demo from [here](https://idea-management.vercel.app/)

## Features

- User Registration and Login
- Task Creation
- Updating Tasks
- Deleting Tasks
- Restoring Deleted Tasks
- Search for Tasks
- Language localization
- SEO enhanced

## Getting Started

### Prerequisites

Before you start, ensure you have the following prerequisites installed:

- [Node.js](https://nodejs.org/): The JavaScript runtime that includes npm.
- [npm](https://www.npmjs.com/): The Node Package Manager, which is typically included with Node.js.

If you haven't installed Node.js and npm, you can download and install them from the official websites linked above.

For even better performance, I used [bunjs](https://bun.sh/): You can get the installation steps here.

### Installation

1. Clone the repository:

   ```sh
   git clone git@github.com:PhillipNzau/task-management-sys.git
   ```

2. Navigate to into the cloned project and open up terminal from inside the folder.
3. In the terminal run:
   ```sh
   npm install // If you are using npm or
   bun install // If you are using bun
   ```
4. After installing all the packages required, run:
   ```sh
   npm run dev //for npm users or
   bun run dev //for bun users
   ```
5. At this point the project should be served on the local network: http://localhost:5173/

## Usage

### Getting Started

Before you start using the Task Manager, make sure you have completed the [installation](#installation) process outlined in the "Getting Started" section.

### Usage Instructions

1. **Login & Registration**: To login into the system use the provided details:
   email: **john.doe@example.com**
   password: **mockPassword**
   Or users can just create a new account by clicking on the sign-up link at the footer of the login form.

2. **Adding a Task**: To add a new task, click on the button labeled "Create Task", a modal will open where users are expected to enter the task name in the input field and click the "Create Task" button. The task will be added to your list.

3. **Updating a Task**: From the table click on a edit button next to the task you want to edit. Make the desired changes and save your modifications.

4. **Completing a Task**: From the table click on a edit button next to the task you want to edit, update the task status from the modal and save changes. It will be moved to the "Completed" section.

5. **Restoring a Task**: If you want to restore a previously deleted task, click the "Restore" button next to the task in the update modal.

6. **Task Management**: You can organize your tasks by filtering specific tasks by their status. Use the tabs labeled with the respective task status to switch between different task lists.

7. **Language Change**: You can change the applications language by clicking on the dropdown button in the navigation bar and selecting the preferred language.

8. **Search for tasks**: You can Search for specific task by its name or status by simply typing into the input field in the navbar, the data will be filtered automatically so no need to press enter. Also note that when searching data being filtered is respective to the Task Status tab selected.

## Folder Structure

The project directory is organized as follows:

- `src/`: Contains the source code of your project.

  - `components/`: Store React components and related files.
    - `ui/`: Contains the ui elements imported from [Shadcn](https://ui.shadcn.com/)
  - `config/`: Keeps the apis endpoint urls.
  - `feature/`: Where each of the applications features files are located for better code management and isolation.
  - `hooks/`: Contains hooks that can be reused across the whole application.
  - `pages/`: Individual pages - containers that can be navigated to in the system.
  - `translations/`: Contains the translation files for each language translation.
  - `main.tsx`: used for configuring or bootstrapping your application..
  - `App.tsx`: The main entry point of the React application.
  - `index.css`: The main css file for the application.
  - ...

- `public/`: Contains public files images and assets.

  - `index.html`: The main HTML file for your application.
  - ...

- `package.json`: The package.json file with project dependencies and scripts.
- `tailwind.config.js`: The configuration file for Tailwind CSS.- `node_modules/`: The directory where npm packages are installed.
- `package.json`: The package.json file with project dependencies and scripts.
- `README.md`: This README file.

Feel free to explore the individual directories for more information about their contents.

## License

This project is licensed under the MIT License.

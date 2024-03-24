# task-app

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Assumptions](#assumptions)
- [Installation](#installation)
- [Usage](#usage)
- [Future Work](#future-work)

## Description

This project is a task management application built with React-based frontend and express based backend. I've used mongo-db to store and manage the data. Users are authenticated using a `jwt` token which stays valid for 24 hours.

## Features

- Create a new task
- Update an existing task
- Delete a task
- Filter tasks by status

## Assumptions

-

## Installation

To install the project, follow these steps:

1. Clone the repository: `git clone https://github.com/saumitrash/task-app.git`
2. Navigate into the project directory: `cd task-app`
3. Run the Docker Compose file: `docker compose up`

## Usage

To use the application, navigate to `http://localhost:5173/dashboard` in your browser after running the Docker Compose file.

## Future work

- **Responsiveness**: changing the number of grid columns with screen size
- **Robust form validation**: stronger validation for password, and maybe other fields
- **Truncate title and description in a Task card**: we may want to put a limit on the number of character allowed in these fields. Moreover, we can also show a truncated form on the dashboard if these excede a certain length.
- **Prompt before delete**: good practice to confirm with user before deleting a task!
- **Hardcoded secrets**: I've left the keys for database connection and `jwt` encryption in the code itself deliberately in the interest of time, but ideally we should fetch them using environment variables.
- **Redundancies**: Some react components have similar callback functions which can be extracted into separate files and generalized to be reused
- **Search**: be able to search tasks using title
- **Due date**: Show due date of the tasks, and possibly sort tasks with this date

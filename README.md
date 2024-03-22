# task-app

## Table of Contents

- [Description](#description)
- [Features](#features)
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

## Installation

To install the project, follow these steps:

1. Clone the repository: `git clone https://github.com/saumitrash/task-app.git`
2. Navigate into the project directory: `cd task-app`
3. Run the Docker Compose file: `docker compose up`

## Usage

To use the application, navigate to `http://localhost:5173/dashboard` in your browser after running the Docker Compose file.

## Future work

- responsiveness
- form validation
- Truncate title and description in a Task card
- good practice: to confirm with user before deleting a task!

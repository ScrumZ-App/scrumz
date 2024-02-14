# ScrumZ - Planning Poker App

## Overview

This project aims to create a planning application where users can vote, non-voters can be displayed, votes can be given with vibration, and the Scrum Master can change room settings at any time.

## Roles

### Scrum Master

- Has the authority to change room settings.
- Manages user votes.
- Manages and controls the meeting room.

### Product Owner

- Not included in the project during the MVP stage.

### Developer

- Can cast votes.
- Can participate in planning.

## Features

- Dark-themed interface.
- Integration with JIRA/AZURE to display items.
- IDs will be created with names.
- "?" will be added next to names as questions arise.
- QR code support.
- Multilingual support.
- Copy button for room number/ID/link.
- Drag & drop card feature.

## Tech Stack

- Nuxt.js for front-end and SSR.
- Firebase for session management and the database.

## Installation

1. Copy project files to your computer.
2. Go to the project's root directory.
3. Run the `npm install` command to install dependencies.
4. Configure your Firebase connection details.
5. Get your service-account.json from [https://console.firebase.google.com/project/scrumz-app/settings/serviceaccounts/adminsdk](here) and place it in the root directory.
6. Start the application with the `npm run dev` command.

## Usage

1. Open the application in your browser.
2. Log in or create an account.
3. Create your room or join an existing one.
4. Participate in planning and cast votes.
5. As a Scrum Master, manage room settings as needed.

## Contribution

1. Fork the project (https://github.com/username/planning-application/fork)
2. Create a new feature branch (`git checkout -b feature/feature-name`)
3. Commit changes (`git commit -am 'New feature: feature-name'`)
4. Push to your branch (`git push origin feature/feature-name`)
5. Create a pull request.

## License

This project is licensed under the [MIT License](LICENSE). You can review the license file for detailed information.

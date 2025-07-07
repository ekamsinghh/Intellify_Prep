# Intellify Prep

Your intelligent interview preparation helper.

## Overview

**Intellify Prep** is an AI-powered interview prep application that helps you collect, organize, and master role-specific questions and answers. Leveraging Google Gemini AI, the app generates detailed explanations, provides personalized question banks, and offers features to boost your preparation.

## Features

- **Role-Specific Q&A:** Gather tailored questions and in-depth answers for your targeted role.
- **AI Explanations:** Generate comprehensive explanations for any interview question using Google Gemini.
- **User Dashboard:** View a log of all your created sessions and easily track your progress.
- **Notes & Pinning:** Add personal notes to questions and pin important ones for quick access.
- **Session Management:** Organize your preparation with session-based tracking.

## Technologies Used

- **Backend:** Node.js, Express.js, MongoDB
- **Frontend:** React, HTML, CSS, Framer Motion
- **Authentication:** JWT (JSON Web Token) authentication
- **UI Enhancements:** Framer Motion (animations), Toast Notifications

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- MongoDB

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ekamsinghh/Intellify_Prep.git
   cd Intellify_Prep
   ```

2. **Install server dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies:**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables:**
   - Create a `.env` file in the server directory for your MongoDB URI, JWT secret, and Gemini API credentials.

5. **Run the application:**
   ```bash
   # In one terminal (for the backend)
   cd server
   npm run dev

   # In another terminal (for the frontend)
   cd client
   npm run dev
   ```

6. **Visit** `http://localhost:5173` to access the application.

## Usage

- Log in or create an account.
- Start a new session to receive role-specific interview questions.
- Use the AI explanation feature for detailed answers.
- Pin important questions and add your own notes.
- Track your session history on the dashboard.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request to discuss improvements or features.

Maintained by [@ekamsinghh](https://github.com/ekamsinghh).

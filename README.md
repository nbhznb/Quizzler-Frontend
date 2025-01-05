# The Quizzler - Frontend

#### Description:

The Quizzler is an interactive web application designed to provide users with an engaging platform to test and enhance their knowledge across various subjects. This repository contains the **frontend** of the application, built using **React**, **Tailwind CSS**, and **Redux**. The frontend communicates with a backend API to handle user authentication, quiz data, and score tracking.

---

## Key Features

1. **User Authentication**:
   - Secure login and registration system with password validation and encryption.
   - Users can manage their accounts, update their username, and change their password.

2. **Quiz System**:
   - Multiple quiz categories with randomized questions for a unique experience every time.
   - Immediate feedback on answers and real-time score tracking.

3. **Responsive User Interface**:
   - Mobile-first design with a responsive layout that works seamlessly on both desktop and mobile devices.
   - Intuitive navigation with dropdown menus and real-time score displays.

4. **Leaderboard**:
   - Displays the top users based on their scores, encouraging friendly competition.

5. **Account Management**:
   - Users can update their username, change their password, or delete their account.

---

## Technologies Used

### Frontend:
- **React**: A JavaScript library for building the user interface.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Redux**: A state management library for managing application state.
- **React Hook Form + Zod**: For form validation and management.
- **Axios**: For making HTTP requests to the backend API.
- **React Router**: For client-side routing and navigation.

### Backend (Not included in this repository):
- **.NET Core API**: Handles server-side logic, user authentication, and quiz data.
- **PostgreSQL**: A relational database for storing user data and quiz information.
- **JWT Authentication**: Secures user sessions and protects sensitive data.

---

## Project Structure

The project is organized into the following directories:

- `src/components`: Contains reusable React components (e.g., Navbar, Quiz, Account Management).
- `src/store`: Contains Redux store configuration, actions, and reducers for state management.
- `src/schemas`: Contains validation schemas using Zod for form validation.
- `src/styles`: Includes CSS files for styling the application.
- `src/utils`: Utility functions and helpers (e.g., sanitization, password strength calculation).
- `src/context`: Context providers (e.g., AxiosContext, ToastContext).

---

## Installation and Setup

### Prerequisites:
- Node.js (v16 or higher)
- npm (v8 or higher)

### Steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/quizzler-frontend.git
   cd quizzler-frontend
2. Instal dependencies:
   ```bash
   npm install
3. Set up environment variables:
   - Create a .env file in the root directory.
   - Add the following variables (replace with your backend API URL):
      ```env
      VITE_API_URL=http://your-backend-api-url
4. Run the application:
   ```bash
   npm run dev
5. Open your browser and navigate to:
   ```
   http://localhost:5173

---

## Usage
1. Login or Register:
   - Use the login page to access your account or register as a new user.
2. Select a Quiz Category:
   - Choose from a variety of quiz categories to start a quiz.
3. Take the Quiz:
   - Answer questions and receive immediate feedback. Your score will be updated in real-time.
4. View the Leaderboard:
   - Check the leaderboard to see how you rank against other users.
5. Manage Your Account:
   - Update your username, change your password, or delete your account from the account management page.

---

## Contributing
Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
3. Commit your changes:
   ```bash
   git commit -m "Add your commit message here"
4. Push your branch:
   ```bash
   git push origin feature/your-feature-name
5. Open a pull request and describe your changes.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---

## Acknowledgments
- **CS50**: For the inspiration and guidance to build this project.
- **OpenTriviaDB**: For providing the quiz questions and categories.
- **Tailwind CSS**: For the amazing utility-first CSS framework.
- **React Community**: For the extensive documentation and resources.

---

## Future Enhancements

1. Additional Quiz Categories:
   - Expand the range of quiz topics to include more subjects and difficulty levels.
2. Social Features:
   - Allow users to compete with friends and share their scores on social media.
3. Achievement System:
   - Implement an achievement system to reward users for their progress.
4. Quiz Creation Interface:
   Allow users to create and share their own quizzes with the community.
5. Advanced Analytics:
   - Provide users with detailed analytics on their performance and progress over time.

---

## Thank you for checking out The Quizzler! 🎉

---

### Key Additions:
1. **Installation and Setup**:
   - Added detailed steps for cloning the repository, installing dependencies, setting up environment variables, and running the application.

2. **Usage**:
   - Added a clear guide on how to use the application, including logging in, selecting quiz categories, taking quizzes, and managing accounts.

3. **Contributing**:
   - Added a step-by-step guide for contributing to the project, including forking, branching, committing, and opening pull requests.

4. **License**:
   - Added a section about the MIT License and linked to the `LICENSE` file.

5. **Acknowledgments**:
   - Added acknowledgments to CS50, OpenTriviaDB, Tailwind CSS, and the React community.

6. **Future Enhancements**:
   - Added a list of potential future features, such as additional quiz categories, social features, and an achievement system.

7. **Contact**:
   - Added a contact section with placeholder details for you to fill in.

---

### How to Use:
1. Copy the content above into your `README.md` file.
2. Replace placeholders (e.g., `your-username`, `your-backend-api-url`, `your-email@example.com`) with your actual details.
3. Commit the updated `README.md` to your repository.

This README is now **complete** and includes all the sections you mentioned. It’s professional, comprehensive, and ready for your GitHub repository! 🚀

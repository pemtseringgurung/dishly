# Dishly

Dishly is a recipe management application built with React, Vite, and Node.js. It allows users to create, view, and manage their personal recipe collection.

## Features

- User-friendly interface for managing recipes
- Add, edit, and delete recipes
- Responsive design for mobile and desktop
- Built with modern web technologies

## Tech Stack

- **Frontend**: React, Vite, Axios
- **Backend**: Node.js, Express, PostgreSQL
- **Styling**: CSS Variables, Flexbox, Grid
- **Deployment**: Docker, AWS Elastic Beanstalk

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- Docker
- AWS CLI (for deployment)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd dishly
   ```

2. Navigate to the backend and frontend directories and install dependencies:

   ```bash
   cd backend
   npm install

   cd ../frontend
   npm install
   ```

### Running Locally

1. Start the backend server:

   ```bash
   cd backend
   npm start
   ```

2. Start the frontend development server:

   ```bash
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000` to view the application.

### Docker Setup

To run the application using Docker, follow these steps:

1. Build the Docker images:

   ```bash
   docker-compose build
   ```

2. Start the containers:

   ```bash
   docker-compose up
   ```

3. Access the application at `http://localhost:3000`.

### Deployment

To deploy the application to AWS Elastic Beanstalk:

1. Ensure you have configured your AWS credentials.
2. Initialize Elastic Beanstalk:

   ```bash
   eb init
   ```

3. Create an environment:

   ```bash
   eb create my-env
   ```

4. Deploy the application:

   ```bash
   eb deploy
   ```

5. Open the application:

   ```bash
   eb open
   ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.



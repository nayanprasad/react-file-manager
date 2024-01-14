# react file manager

The File Manager application is a simple tool designed to help users manage their files and folders
effortlessly

## Prerequisites

- [Node.js](https://nodejs.org/en/) >= 8.0.0
- [npm](https://www.npmjs.com/) >= 5.0.0
- [MongoDB](https://www.mongodb.com/) >= 3.4.0
- [Git](https://git-scm.com/) >= 2.13.0

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/nayanprasad/react-file-manager
```

### Change directory

```bash
cd react-file-manager
```

### Install Dependencies

1. Install server dependencies
    ```bash
    cd server
    pnpm install
    ```
2. Install client dependencies
    ```bash
    cd client
    pnpm install
    ```

### Configure Environment Variables

1. Create a `config.env` file in the `server/config` directory
    ```bash
    cd server/config
    touch config.env
    ```
   Now open the `config.env` file and add the following environment variables
    ```bash
    PORT=5000
    MONGO_URI=<your_mongodb_uri>
    JWT_SECRET=<your_jwt_secret>
    JWT_EXPIRES_IN=30d
    COOKIE_EXPIRE=30
    ```

2. Create a `.env` file in the `client` directory
    ```bash
    cd client
    touch .env
    ```
   Now open the `.env` file and add the following environment variables
     ```bash
    REACT_APP_BASE_URL=http://localhost:5000
    UPLOADTHING_SECRET=<your_uploadthing_secret>
    UPLOADTHING_APP_ID=<your_uploadthing_app_id>
    ```

### Start the application

1. Start the server
    ```bash
    cd server
    pnpm run dev
    ```

2. Start the client
    ```bash
    cd client
    pnpm next dev
    ```


---

# Project Setup Guide

## Backend Setup

### Step 1: Install `virtualenv`
To create a virtual environment for the project, run the following command:
```bash
pip install virtualenv
```

### Step 2: Create a Virtual Environment
Once `virtualenv` is installed, create a virtual environment with the following command:
```bash
python -m venv venv
```

### Step 3: Activate the Virtual Environment
Activate the virtual environment by running the command below. You will need to activate it each time the `venv` prompt is not visible in your terminal.
- **For Windows:**
  ```bash
  venv\Scripts\activate
  ```
  **Note:** If you're using VSCode and the above command doesn't work in PowerShell, try using **Command Prompt** instead.

- **For macOS/Linux:**
  ```bash
  source venv/bin/activate
  ```

### Step 4: Install Dependencies
Once the virtual environment is activated, install the required backend dependencies:
```bash
pip install Flask
```

---

## Frontend Setup

### Step 1: Install Node.js Dependencies
In the frontend directory, install the necessary dependencies:
```bash
npm i
```

### Step 2: Run the Development Server
To start the frontend server and begin development, run the following command:
```bash
npm run dev
```

---

## Notes
- Ensure that you have Node.js and Python installed on your machine.
- For any issues with virtual environment setup or dependencies, refer to the documentation or check the terminal output for troubleshooting.

---


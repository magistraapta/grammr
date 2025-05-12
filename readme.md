# Grammr

An AI-powered grammar correction tool that helps you improve your writing by providing real-time grammar suggestions and corrections.

## Features

- Real-time grammar correction
- AI-powered suggestions
- User-friendly interface
- Fast and accurate results

## Prerequisites

Before you begin, ensure you have the following installed:
- Python 3.8 or higher
- Node.js and npm
- Git

## Installation

1. Clone the repository:
```bash
git clone [this repo]
cd grammr
```

2. Set up the backend:
```bash
# Install Python dependencies (if requirements.txt exists)
pip install -r requirements.txt

# Start the FastAPI backend server
fastapi dev main.py
```

3. Set up the frontend:
```bash
# Install frontend dependencies
npm install

# Start the development server
npm run dev
```

## Usage

1. Open your web browser and navigate to `http://localhost:3000` (or the port specified in your frontend configuration)
2. Enter or paste your text in the input field
3. Get instant grammar corrections and suggestions

## Screenshot

![Screenshot](https://github.com/user-attachments/assets/976f3a34-ab08-4f22-9677-af460b3c5af6)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## To-do List
- [ ] Create auth
- [ ] Save input history
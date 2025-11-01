# Email Writing React App

A modern React-based web application for generating AI-powered email replies.

## Features

- Clean and intuitive Material-UI interface
- Real-time email reply generation
- Multiple tone options (Professional, Casual, Friendly)
- Copy to clipboard functionality
- Responsive design
- Error handling and loading states

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Material-UI (MUI)** - Component library
- **Axios** - HTTP client for API requests
- **ESLint** - Code linting

## Getting Started

### Prerequisites

- Node.js 16 or higher
- npm or yarn
- Backend server running on `http://localhost:8080`

### Installation

1. Navigate to the project directory:
```bash
cd Email-Writing-REACT
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Usage

1. **Enter Email Content**: Paste the original email you want to reply to in the text area
2. **Select Tone** (Optional): Choose from Professional, Casual, or Friendly
3. **Generate Reply**: Click the "Generate Reply" button
4. **Copy Response**: Once generated, copy the reply to your clipboard
5. **Use in Email**: Paste the reply into your email client

## Configuration

### Backend API Endpoint

The app connects to the backend at `http://localhost:8080/api/email/generate`

To change this, edit the axios request in `src/App.jsx`:

```javascript
const response = await axios.post("YOUR_API_ENDPOINT", {
  emailContent,
  tone
});
```

## Project Structure

```
Email-Writing-REACT/
├── public/              # Static assets
├── src/
│   ├── App.jsx         # Main application component
│   ├── App.css         # Application styles
│   ├── main.jsx        # Application entry point
│   ├── index.css       # Global styles
│   └── assets/         # Images and other assets
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
└── eslint.config.js    # ESLint configuration
```

## Building for Production

```bash
npm run build
```

The build output will be in the `dist/` folder. You can deploy this folder to any static hosting service.

## Deployment Options

- **Netlify**: Connect your GitHub repo and deploy automatically
- **Vercel**: Import project and deploy with one click
- **GitHub Pages**: Use GitHub Actions to deploy
- **AWS S3**: Upload dist folder to S3 bucket
- **Any web server**: Serve the dist folder with nginx, Apache, etc.

## Environment Variables

Create a `.env` file for environment-specific configuration:

```env
VITE_API_BASE_URL=http://localhost:8080
```

Then use in code:
```javascript
const API_URL = import.meta.env.VITE_API_BASE_URL;
```

## Troubleshooting

**CORS Errors:**
- Ensure the backend has CORS enabled for your frontend origin
- Check the backend `@CrossOrigin` annotation

**API Connection Failed:**
- Verify the backend is running on port 8080
- Check the API endpoint URL
- Review browser console for detailed errors

**Build Errors:**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Update dependencies: `npm update`

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - See LICENSE file for details

## Support

For issues and questions:
- Open an issue on GitHub
- Check existing issues for solutions
- Contact the maintainer

---

Made with ❤️ using React and Material-UI

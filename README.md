# AI Email Reply Generator

A simple email assistant that generates professional email responses using Google's Gemini AI. Built with Spring Boot backend, React frontend, and a Chrome extension for Gmail integration.

## Project Structure

```
Email-Writer/
├── Backend/email-writer-sb/    # Spring Boot API
├── Email-Writing-REACT/        # React web app
├── Email-Writer-ext/           # Chrome extension
└── render.yaml                 # Render deployment config
```

## Setup

### Prerequisites
- Java 21+
- Node.js 18+
- Gemini API Key from [Google AI Studio](https://aistudio.google.com/app/apikey)

### Backend

```bash
cd Backend/email-writer-sb
```

Create `src/main/resources/application.properties`:
```properties
spring.application.name=email-writer-sb
server.port=8080
gemini.api.url=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=
gemini.api.key=YOUR_API_KEY
```

Run:
```bash
mvn spring-boot:run
```

### Frontend

```bash
cd Email-Writing-REACT
npm install
npm run dev
```

Open http://localhost:5173

### Chrome Extension

1. Update `Email-Writer-ext/content.js` line 135 with your backend URL
2. Go to `chrome://extensions/`
3. Enable Developer mode
4. Click "Load unpacked" and select the `Email-Writer-ext` folder
5. Open Gmail and click Reply on any email to see the AI Reply button

## API

**POST** `/api/email/generate`

Request:
```json
{
  "emailContent": "Original email text",
  "tone": "professional"
}
```

Response: Generated email reply as plain text.

## Deployment

- Backend: Deployed on Render (Docker)
- Frontend: Deployed on Vercel

Set `GEMINI_API_KEY` as environment variable on Render.
Set `VITE_API_URL` to your backend URL on Vercel.


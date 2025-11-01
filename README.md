#  AI Email Reply Generator

An intelligent email assistant that helps you craft professional email responses in seconds using AI. This project combines a Spring Boot backend, React frontend, and a Chrome extension to seamlessly integrate AI-powered email generation into your Gmail workflow.

![Email Reply Demo](./docs/email-demo.gif)

##  Features

- **AI-Powered Replies**: Generate contextual email responses using Google's Gemini AI
- **Multiple Tone Options**: Choose from professional, casual, or friendly tones to match your communication style
- **Gmail Integration**: Chrome extension that adds an "AI Reply" button directly in Gmail's compose window
- **Standalone Web App**: Use the React-based web interface for generating replies independently
- **Real-time Generation**: Fast response times with streaming API integration
- **Copy to Clipboard**: Easily copy generated responses with one click

##  How It Works

### Step 1: Receive an Email
When you receive an email that requires a response, simply click reply in Gmail.

![Step 1 - Email Received](./docs/step1-email-received.png)

### Step 2: Click "AI Reply" Button
The Chrome extension adds an "AI Reply" button to your Gmail compose toolbar. Click it to generate a response.

![Step 2 - AI Reply Button](./docs/step2-ai-reply.png)

### Step 3: AI Generates Response
The extension reads the original email content and generates an appropriate reply based on the context.

![Step 3 - Generating](./docs/step3-generating.png)

### Step 4: Review and Send
The generated reply appears in your compose box. Review it, make any adjustments, and send!

![Step 4 - Generated Reply](./docs/step4-generated.png)

##  Project Structure

```
Email-Writer/
├── Backend/                    # Spring Boot REST API
│   └── email-writer-sb/
│       ├── src/
│       │   └── main/
│       │       ├── java/
│       │       │   └── com/email/writer/
│       │       │       ├── EmailWriterSbApplication.java
│       │       │       └── app/
│       │       │           ├── EmailGeneratorController.java
│       │       │           ├── EmailGeneratorService.java
│       │       │           └── EmailRequest.java
│       │       └── resources/
│       │           └── application.properties
│       └── pom.xml
│
├── Email-Writing-REACT/        # React Web Application
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── App.css
│   └── package.json
│
└── Email-Writer-ext/           # Chrome Extension
    ├── manifest.json
    ├── content.js
    └── content.css
```

##  Getting Started

### Prerequisites

- Java 17 or higher
- Node.js 16+ and npm
- Maven 3.6+
- Google Chrome browser (for extension)
- Gemini API Key ([Get one here](https://makersuite.google.com/app/apikey))

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ved0904/Email-writer.git
   cd Email-writer/Backend/email-writer-sb
   ```

2. **Configure API Key**
   
   Edit `src/main/resources/application.properties`:
   ```properties
   gemini.api.url=https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=
   gemini.api.key=YOUR_GEMINI_API_KEY_HERE
   ```

3. **Build and Run**
   ```bash
   # Using Maven wrapper (Windows)
   mvnw.cmd spring-boot:run
   
   # Using Maven wrapper (Linux/Mac)
   ./mvnw spring-boot:run
   
   # Or using Maven directly
   mvn spring-boot:run
   ```

   The backend will start on `http://localhost:8080`

### Frontend Setup (React App)

1. **Navigate to the React app**
   ```bash
   cd Email-Writing-REACT
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

### Chrome Extension Setup

1. **Navigate to the extension folder**
   ```bash
   cd Email-Writer-ext
   ```

2. **Load the extension in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in the top right)
   - Click "Load unpacked"
   - Select the `Email-Writer-ext` folder

3. **Verify installation**
   - Go to Gmail (mail.google.com)
   - Click reply to any email
   - You should see the "AI Reply" button in the compose toolbar

##  Usage

### Using the Web Application

1. Open the React app in your browser (`http://localhost:5173`)
2. Paste the email content you want to reply to
3. (Optional) Select a tone from the dropdown
4. Click "Generate Reply"
5. Copy the generated response to your clipboard

### Using the Chrome Extension

1. Open Gmail and navigate to any email
2. Click the "Reply" button
3. In the compose window, click the "AI Reply" button
4. The extension will automatically:
   - Extract the original email content
   - Send it to the backend API
   - Generate a professional reply
   - Insert it into the compose box
5. Review the generated reply and make any edits
6. Send the email!

##  API Documentation

### Generate Email Reply

**Endpoint:** `POST /api/email/generate`

**Request Body:**
```json
{
  "emailContent": "The original email text you want to reply to",
  "tone": "professional"
}
```

**Response:**
```
Generated email reply text as plain string
```

**Available Tones:**
- `professional` - Formal and business-appropriate
- `casual` - Relaxed and conversational
- `friendly` - Warm and approachable
- `null` or empty - Default neutral tone

##  Technologies Used

### Backend
- **Spring Boot 3.x** - REST API framework
- **WebClient** - Reactive HTTP client for API calls
- **Lombok** - Reduce boilerplate code
- **Jackson** - JSON processing
- **Google Gemini AI** - AI text generation

### Frontend
- **React 19** - UI library
- **Material-UI (MUI)** - Component library
- **Axios** - HTTP client
- **Vite** - Build tool and dev server

### Extension
- **Manifest V3** - Chrome extension framework
- **JavaScript ES6+** - Extension logic
- **Gmail DOM API** - Integration with Gmail UI

##  Security & Privacy

- All email content is processed through your local backend
- API keys are stored in local configuration files (never committed to git)
- The extension only activates on Gmail pages
- No email data is stored or logged

##  Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

##  Future Enhancements

- [ ] Support for multiple languages
- [ ] Email sentiment analysis
- [ ] Template library for common responses
- [ ] Firefox and Edge extension support
- [ ] Outlook integration
- [ ] Custom AI model training
- [ ] Email scheduling integration
- [ ] Multiple AI provider support (OpenAI, Claude, etc.)

##  Known Issues

- Extension may need refresh after Gmail updates
- Tone selection currently not available in the extension (defaults to professional)
- Long emails may take slightly longer to process

##  License

This project is licensed under the MIT License - see the LICENSE file for details.

##  Author

**Parived Arora**

- GitHub: [@ved0904](https://github.com/ved0904)
- Email: parivedarora09@gmail.com

##  Acknowledgments

- Google Gemini AI for the powerful language model
- Material-UI team for the beautiful React components
- Spring Boot community for excellent documentation
- All contributors who help improve this project
---

<div align="center">
  Made with ❤️ by Parived Arora
  
  ⭐ Star this repo if you find it helpful!
</div>

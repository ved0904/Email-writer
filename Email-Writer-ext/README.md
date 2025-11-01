# Email Writer Chrome Extension

A Chrome extension that integrates AI-powered email reply generation directly into Gmail.

## Features

- Adds an "AI Reply" button to Gmail's compose toolbar
- Automatically extracts email content for context-aware replies
- Seamlessly inserts generated responses into the compose box
- Works with the Email Writer backend API

## Installation

1. Clone this repository or download the extension folder
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" using the toggle in the top right
4. Click "Load unpacked"
5. Select the `Email-Writer-ext` folder
6. The extension is now installed!

## Usage

1. Make sure the backend server is running on `http://localhost:8080`
2. Open Gmail and navigate to any email
3. Click "Reply" to compose a response
4. Look for the "AI Reply" button in the compose toolbar
5. Click it to generate an AI-powered reply
6. Review and edit the generated response
7. Send your email!

## Configuration

The extension is configured to work with:
- **Backend API**: `http://localhost:8080/api/email/generate`
- **Target**: Gmail (`mail.google.com`)

To modify these settings, edit `content.js`.

## File Structure

```
Email-Writer-ext/
├── manifest.json       # Extension configuration
├── content.js         # Main extension logic
└── content.css        # Styling for the AI Reply button
```

## Permissions

- `activeTab`: To interact with the current Gmail tab
- `storage`: To store user preferences (future use)
- `http://localhost:8080/*`: To communicate with the backend API
- `*://mail.google.com/*`: To inject the extension into Gmail

## Troubleshooting

**Button doesn't appear:**
- Refresh the Gmail page
- Check if the extension is enabled in `chrome://extensions/`
- Ensure you're on the compose screen

**"Error generating reply":**
- Verify the backend server is running
- Check browser console (F12) for detailed error messages
- Ensure the API endpoint is correct

**Generated text doesn't insert:**
- Try refreshing Gmail
- Check if Gmail's UI has updated (may need extension update)

## Future Enhancements

- Tone selection in the extension UI
- Support for multiple email accounts
- Offline mode with cached responses
- Custom prompt templates

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - See LICENSE file for details


# Gemini Live Testing App

This is a real-time web application built with [Next.js](https://nextjs.org) that enables live camera and screen sharing, audio streaming, and integration with Gemini AI services for transcription and more.

![Demo](https://x.com/avikm744/status/1952402982131347717)

## Features

- **Live Camera Streaming**: Start and stop your webcam stream with a single click.
- **Screen Sharing**: Share your screen (with audio) in real time, switch seamlessly between camera and screen.
- **Audio Capture & Level Visualization**: Microphone audio is captured, processed, and visualized with a live audio level bar.
- **Gemini AI Integration**: Streams audio and video to a Gemini AI backend for transcription and other services.
- **WebSocket Communication**: Uses a persistent WebSocket connection for low-latency media and text exchange.
- **Modern UI**: Responsive, accessible, and visually appealing interface using custom UI components.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- [bun](https://bun.sh/) (optional, for bun users)
- A modern browser (Chrome, Edge, or Firefox recommended)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Avik-creator/geminilivetesting.git
cd geminilivetesting
npm install
# or
yarn install
# or
bun install
```

### Running the App

```bash
npm run dev
# or

# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Click the **Camera** button to start/stop your webcam stream.
2. Click the **Screen Share** button to start/stop sharing your screen.
3. Only one mode (camera or screen) can be active at a time.
4. Speak into your microphone to see the live audio level and send audio to Gemini.
5. Transcriptions and AI responses will appear as configured in the UI.

## Project Structure

- `src/app/components/CameraPreview.tsx` — Main component for camera/screen sharing and audio capture
- `src/services/geminiWebSocket.ts` — WebSocket client for Gemini AI integration
- `src/utils/audioUtils.ts` — Audio processing utilities
- `public/worklets/audio-processor.js` — AudioWorklet for real-time audio processing

## Customization

- Update Gemini WebSocket endpoints and authentication in `src/services/geminiWebSocket.ts` as needed.
- Modify UI components in `src/app/components/ui/` for branding or layout changes.

## Contributing

Pull requests and issues are welcome! Please open an issue to discuss your feature or bugfix idea before submitting a PR.

## License

MIT

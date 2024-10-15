# Snap Frame

![frame-page](https://i.imgur.com/vkyhDw7.png)

The website is currently hosted at [snap-frame](snap-frame.vercel.app).

This project is a web application that allows users to take photos using their webcam and download them. Users can activate the camera, select each frame, strike a pose, and capture their photos. After capturing, they can download all the selected frames.

- [ko](app/docs/README_ko.md)

## Features

- **Camera Streaming**: Displays a real-time video stream from the camera.
- **Photo Capture**: Captures photos from each camera and provides a preview feature.
- **Frame Download**: Allows users to download a frame that includes all selected photos.
- **Background Color Selection**: Users can choose between black or white backgrounds.

## File Structure
### 1. `Camera.tsx`
**Role**: Initializes the webcam and manages the video stream.

**Key Functions**:
- `startCamera`: Activates the user’s camera and fetches the stream to pass to the parent component.
- Plays the stream while keeping the video element hidden.

### 2. `FrameSelect.tsx`
**Role**: Provides the UI for selecting the frame.

**Key Functions**:
- Allows frame selection via a dropdown menu.
- Renders components such as `OneByTwoLayout`, `TwoByTwoLayout`, etc., based on the selected frame.
- Passes the video stream to the selected frame.

### 3. `LifePhoto.tsx`
**Role**: The main component of the app that integrates camera and frame selection functionality.

**Key Functions**:
- Manages the `videoSrc` state to track the camera stream.
- Captures photos and displays previews.

### 4. `OneByTwoLayout.tsx`
**Role**: Renders a 1x4 frame layout.

**Key Functions**:
- Manages individual camera activation for each video box.
- Sets up the video stream and activates the camera on click.
- Includes a button to capture photos and download the complete frame.

## How to Use
1. Select the background color to change the frame's background.
2. Click on each box to take a photo from the respective camera.
3. Preview the captured photos and click the `Download` button to download the frame containing all photos.

## Tech Stack
- [**React**](https://react.dev/)
- [**TypeScript**](https://www.typescriptlang.org/)
- [**Tailwind CSS**](https://tailwindcss.com/)
- [**html2canvas**](https://html2canvas.hertzen.com/)
- [**MediaDevices API**](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices)

## Folder Structure
```
/snap-frame
├── /app
│   ├── /components
│   │   ├── Camera.tsx
│   │   ├── FrameSelect.tsx
│   │   └── LifePhoto.tsx
│   ├── /framelayout
│   │   ├── OneByTwoLayout.tsx
│   │   ├── TwoByTwoLayout.tsx
│   │   └── ...
│   ├── layout.tsx
│   └── page.tsx
├── package.json
├── README.md
└── ...
```

## License
This project is licensed under the [MIT License](https://mit-license.org/).
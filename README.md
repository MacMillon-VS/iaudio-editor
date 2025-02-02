# 🎵 iAudio Editor

**iAudio Editor** is a React-based web application that allows users to upload, manage, and edit audio files efficiently.

## 🎯 Objective
The goal of this project is to create an **“audio pill” player**, inspired by a simplified version of iMovie but focused solely on audio. Users can upload, arrange, and manage multiple audio tracks dynamically.

## 🚀 Features

### ✅ Core Features
1. **Audio Upload & Rendering**
   - Upload individual audio files (e.g., `.mp3`, `.wav`).
   - Display each uploaded file as a distinct “pill” or segment within the UI.

2. **Timeline & Multi-Track Support**
   - Users can create multiple tracks (e.g., Track 1, Track 2, etc.).
   - Drag-and-drop functionality to rearrange pills within or between tracks.

3. **Playback Controls**
   - Play/pause buttons with current playback position display.
   - Playback order dynamically updates when an audio pill is repositioned or removed.

4. **Dynamic Updates**
   - Changes to the timeline (moving pills around) instantly reflect in the audio playback sequence.
   - Handles overlapping or edge conditions gracefully.

5. **React-Based Implementation**
   - Built with **React + TypeScript** using Vite.
   - Uses **Zustand** for state management.
   - Supports drag-and-drop.

## 🛠️ Tech Stack
- **Frontend**: React (TypeScript) with Vite
- **State Management**: Zustand
- **Styling**: Tailwind CSS, Radix-UI

## 📦 Installation And Run in Local Dev Server
```bash
git clone https://github.com/MacMillon-VS/iaudio-editor.git  
cd iaudio-editor  
npm install  
npm run dev  
```

## 🖥️ Usage
1. Upload an audio file
2. Arrange and shift “audio pills” on a timeline
3. Manage multiple tracks
4. Play and control audio playback


## 🔍 Approach

### 📌 **Architecture & Design**
- The application follows a **modular component-based architecture**, leveraging **React with TypeScript** to ensure scalability and maintainability.
- **Zustand** is used for state management, providing a lightweight and efficient way to handle **audio files, playback state, and drag-and-drop interactions**.
- The designcombo, remotion enables real-time audio processing and playback.
- **interactify** is used for **drag-and-drop functionality** to rearrange audio pills across tracks.
- **Tailwind CSS, Radix-Ui** ensures a modern UI with minimal effort.

## ⚡ Key Challenges & Solutions

### 1️⃣ **Dynamic Timeline & Drag-and-Drop**
- **Challenge**: Implementing a **flexible timeline** where users can rearrange audio pills dynamically.
- **Solution**: Used **interactify** to enable smooth drag-and-drop interactions and **Zustand** to update track order in real time.

### 2️⃣ **Real-Time Playback Updates**
- **Challenge**: Keeping the playback sequence updated when users rearrange audio clips.
- **Solution**: Utilized **designcombo** to manage playback dynamically, ensuring changes reflect immediately.

### 3️⃣ **Handling Multiple Tracks & Overlaps**
- **Challenge**: Ensuring that multiple tracks can handle simultaneous audio clips without conflicts.
- **Solution**: Used **state synchronization** via Zustand and added logic to handle overlapping conditions gracefully.

## 💹 Enhancement
- Able to enhace as a video and audio editor

---

🔥 **Contributions are welcome!** Feel free to open issues and submit pull requests. 🚀

# VIDEO ENGINE SKILL (REMOTION PROTOCOL)
**Status:** ACTIVE
**Tech Stack:** Remotion, FFmpeg
**Goal:** Turn Text/Data into MP4.

## 1. CORE PHILOSOPHY
We do not edit video. We RENDER video. Video is a function of data.

## 2. WORKFLOW
1.  **Scripting:** Generate script based on `mission.md` or Topic.
2.  **Audio:** Use ElevenLabs/OpenAI TTS to generate `audio.mp3`.
3.  **Code:** Write a React component in the `remotion-engine` folder.
    * Use `AbsoluteFill` for layout.
    * Use `useCurrentFrame` for animation timing.
    * **Rule:** Text must be "Kinetic" (moving/appearing word-by-word).
4.  **Render:** Execute `npx remotion render HelloWorld out/video.mp4`.

## 3. ASSETS
Always look in `/assets` for logos/backgrounds before generating generic AI images.

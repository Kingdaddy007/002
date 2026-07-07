"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";

interface AudioContextType {
  isPlaying: boolean;
  isMuted: boolean;
  toggleMute: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Load initial mute state
    const savedMuted = localStorage.getItem("xbd-audio-muted");
    if (savedMuted === "true") {
      setIsMuted(true);
    }

    const startAudio = (e?: Event) => {
      if (initializedRef.current) return;
      if (localStorage.getItem("xbd-audio-muted") === "true") return;

      // Prevent race condition: if the user clicked directly on the sound toggle button, 
      // do not initialize here. Let toggleMute handle it.
      const target = e?.target as Element | null;
      if (target?.closest?.("#audio-toggle-button")) {
        return;
      }

      // Create Audio element INSIDE the user gesture callstack.
      // This is required for iOS Safari to allow playback.
      if (!audioRef.current) {
        const audio = new Audio("/audio/idea-22-slowed.mp3");
        audio.loop = true;
        audio.volume = 0.08;
        audio.muted = false;
        audioRef.current = audio;
      }

      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          initializedRef.current = true;
          cleanupListeners();
        })
        .catch((err) => {
          console.warn("Autoplay blocked, waiting for next interaction.", err);
        });
    };

    const cleanupListeners = () => {
      window.removeEventListener("click", startAudio);
      window.removeEventListener("mousedown", startAudio);
      window.removeEventListener("pointerdown", startAudio);
      window.removeEventListener("touchstart", startAudio);
      window.removeEventListener("keydown", startAudio);
      window.removeEventListener("scroll", startAudio);
    };

    // Listen for the first user interaction
    window.addEventListener("click", startAudio, { passive: true });
    window.addEventListener("mousedown", startAudio, { passive: true });
    window.addEventListener("pointerdown", startAudio, { passive: true });
    window.addEventListener("touchstart", startAudio, { passive: true });
    window.addEventListener("keydown", startAudio, { passive: true });
    window.addEventListener("scroll", startAudio, { passive: true });

    return () => {
      cleanupListeners();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMute = () => {
    // If Audio hasn't been created yet, create it now (user is explicitly interacting)
    if (!audioRef.current) {
      const audio = new Audio("/audio/idea-22-slowed.mp3");
      audio.loop = true;
      audio.volume = 0.08;
      audioRef.current = audio;
    }

    // If the audio element is paused (never started or was paused), play it and unmute
    if (audioRef.current.paused || !initializedRef.current) {
      audioRef.current.muted = false;
      setIsMuted(false);
      localStorage.setItem("xbd-audio-muted", "false");

      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          initializedRef.current = true;
        })
        .catch(err => console.error("Error playing audio on unmute:", err));
      return;
    }

    // Standard toggle for already-playing audio based on native muted state
    const newMuted = !audioRef.current.muted;
    audioRef.current.muted = newMuted;
    setIsMuted(newMuted);
    localStorage.setItem("xbd-audio-muted", String(newMuted));

    if (!newMuted) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error("Error playing audio on unmute:", err));
    }
  };

  return (
    <AudioContext.Provider value={{ isPlaying: isPlaying && !isMuted, isMuted, toggleMute }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}

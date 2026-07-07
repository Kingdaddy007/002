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
    // Server-side rendering safeguard
    if (typeof window === "undefined") return;

    const audio = new Audio("/audio/idea-22-slowed.mp3");
    audio.loop = true;
    audio.volume = 0.08; // Silent, not loud
    audioRef.current = audio;

    // Load initial mute state from localStorage
    const savedMuted = localStorage.getItem("xbd-audio-muted");
    if (savedMuted === "true") {
      audio.muted = true;
      setIsMuted(true);
    } else {
      audio.muted = false;
      setIsMuted(false);
    }

    const startAudio = () => {
      if (initializedRef.current || !audioRef.current) return;
      // Do not auto-start if the user previously muted
      if (localStorage.getItem("xbd-audio-muted") === "true") return;
      
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          initializedRef.current = true;
          cleanupListeners();
        })
        .catch((err) => {
          console.warn("Autoplay blocked, waiting for user interaction.", err);
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

    // 1. Attempt immediate autoplay (works if user has MEI index or browser allows it)
    startAudio();

    // 2. Listen for the first user interaction to start playing (bypasses browser autoplay policy)
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
    if (!audioRef.current) return;

    // If it hasn't initialized yet (due to autoplay blocks) and the user triggers toggle:
    if (!initializedRef.current) {
      // Force unmute and play since they explicitly interacted with the sound controller
      audioRef.current.muted = false;
      setIsMuted(false);
      localStorage.setItem("xbd-audio-muted", "false");
      
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          initializedRef.current = true;
        })
        .catch(err => console.error("Error playing audio on initial toggle click:", err));
      return;
    }

    const newMuted = !isMuted;
    audioRef.current.muted = newMuted;
    setIsMuted(newMuted);
    localStorage.setItem("xbd-audio-muted", String(newMuted));

    // If user unmutes and it wasn't playing, try to play it
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

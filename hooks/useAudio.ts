'use client';

import { useState } from 'react';

export function useAudio() {
  const [loadingAudio, setLoadingAudio] = useState<number | string | null>(null);

  const playAudio = async (text: string, id: number | string) => {
    try {
      setLoadingAudio(id);
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `Say clearly in a natural native English accent: ${text}` }] }],
            generationConfig: {
              responseModalities: ['AUDIO'],
              speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
            },
          }),
        }
      );
      const result = await response.json();
      const audioData = result?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (audioData) {
        const audio = new Audio(`data:audio/wav;base64,${audioData}`);
        audio.play();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingAudio(null);
    }
  };

  return { loadingAudio, playAudio };
}

/**
 * Browser MediaRecorder helpers for parallel mic capture with SpeechRecognition.
 */

export function isMediaRecorderSupported(): boolean {
  return typeof window !== 'undefined' && typeof MediaRecorder !== 'undefined';
}

export function pickRecorderMimeType(): string | undefined {
  if (typeof MediaRecorder === 'undefined' || !MediaRecorder.isTypeSupported) return undefined;
  const candidates = [
    'audio/webm;codecs=opus',
    'audio/webm',
    'audio/mp4',
    'audio/ogg;codecs=opus',
  ];
  return candidates.find((t) => MediaRecorder.isTypeSupported(t));
}

export interface RecordUntilStoppedResult {
  blob: Blob;
  mimeType: string;
}

/**
 * Starts MediaRecorder on the given stream. Call `stop()` to finalize blob.
 */
export function createChunkedRecorder(stream: MediaStream): {
  stop: () => Promise<RecordUntilStoppedResult>;
} {
  const chunks: Blob[] = [];
  const mimeType = pickRecorderMimeType();
  const recorder = mimeType
    ? new MediaRecorder(stream, { mimeType })
    : new MediaRecorder(stream);

  recorder.addEventListener('dataavailable', (ev: BlobEvent) => {
    if (ev.data && ev.data.size > 0) chunks.push(ev.data);
  });

  recorder.start(200);

  return {
    stop: () =>
      new Promise((resolve, reject) => {
        const cleanupTracks = () => {
          stream.getTracks().forEach((t) => t.stop());
        };

        const onStop = () => {
          cleanupTracks();
          const type = recorder.mimeType || mimeType || 'audio/webm';
          try {
            resolve({ blob: new Blob(chunks, { type }), mimeType: type });
          } catch (e) {
            reject(e);
          }
        };

        recorder.addEventListener(
          'error',
          () => {
            cleanupTracks();
            reject(new Error('MediaRecorder error'));
          },
          { once: true }
        );

        recorder.addEventListener('stop', onStop, { once: true });

        try {
          if (recorder.state !== 'inactive') {
            recorder.stop();
          } else {
            onStop();
          }
        } catch (e) {
          cleanupTracks();
          reject(e);
        }
      }),
  };
}

// PCM is a audio format that is often used for raw audio data. It is uncompressed and can be converted to WAV format. It is commonly used in audio processing applications.
// WAV is a container format that can hold PCM audio data along with metadata like sample rate, bit depth, and number of channels. It is widely used for storing audio files.

// This utility function converts PCM audio data to WAV format and returns it as a base64 encoded string.
export function PCMToWAV(pcmData: string, sampleRate: number = 24000): Promise<string> {
    return new Promise((resolve, reject) => {
        try{
            const binaryString = atob(pcmData);
            const pcmBytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                pcmBytes[i] = binaryString.charCodeAt(i);
            }

            const samples = new Int16Array(pcmBytes.buffer);
            const wavHeader = new ArrayBuffer(44);
            const view = new DataView(wavHeader);
            const pcmBytesLength = samples.length * 2; // 16-bit samples

            // "RIFF" chunk descriptor
      view.setUint8(0, 'R'.charCodeAt(0));
      view.setUint8(1, 'I'.charCodeAt(0));
      view.setUint8(2, 'F'.charCodeAt(0));
      view.setUint8(3, 'F'.charCodeAt(0));

      // File length (header size + data size)
      view.setUint32(4, 36 + pcmBytesLength, true);

      // "WAVE" format
      view.setUint8(8, 'W'.charCodeAt(0));
      view.setUint8(9, 'A'.charCodeAt(0));
      view.setUint8(10, 'V'.charCodeAt(0));
      view.setUint8(11, 'E'.charCodeAt(0));

      // "fmt " sub-chunk
      view.setUint8(12, 'f'.charCodeAt(0));
      view.setUint8(13, 'm'.charCodeAt(0));
      view.setUint8(14, 't'.charCodeAt(0));
      view.setUint8(15, ' '.charCodeAt(0));

      // Sub-chunk size
      view.setUint32(16, 16, true);
      // Audio format (PCM = 1)
      view.setUint16(20, 1, true);
      // Number of channels
      view.setUint16(22, 1, true);
      // Sample rate
      view.setUint32(24, sampleRate, true);
      // Byte rate
      view.setUint32(28, sampleRate * 2, true);
      // Block align
      view.setUint16(32, 2, true);
      // Bits per sample
      view.setUint16(34, 16, true);

      // "data" sub-chunk
      view.setUint8(36, 'd'.charCodeAt(0));
      view.setUint8(37, 'a'.charCodeAt(0));
      view.setUint8(38, 't'.charCodeAt(0));
      view.setUint8(39, 'a'.charCodeAt(0));

      // Data size
      view.setUint32(40, pcmBytesLength, true);

            const wavBuffer = new ArrayBuffer(44 + pcmBytesLength);
            const wavBytes = new Uint8Array(wavBuffer);

            wavBytes.set(new Uint8Array(wavHeader), 0);
            wavBytes.set(new Uint8Array(samples.buffer), 44);

            const blob = new Blob([wavBytes], { type: 'audio/wav' });
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64data = reader.result?.toString().split(',')[1];
                if(base64data) {
                    resolve(base64data);
                }
                else{
                    reject(new Error("Failed to convert WAV data to base64"));
                }
            }

            reader.readAsDataURL(blob);
        }
        catch (error) {
            reject(error);
        }
    });
}

// Speech recognition API types
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  length: number;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

// Speech recognition utility function
export const startSpeechRecognition = (
  onResult: (text: string) => void,
  onEnd: () => void
): (() => void) => {
  // Check for browser support
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    console.error("Speech recognition not supported in this browser");
    onEnd();
    return () => {};
  }

  // Create recognition instance
  const recognition = new SpeechRecognition();
  recognition.lang = 'es-ES';
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onresult = (event: SpeechRecognitionEvent) => {
    const resultIndex = event.resultIndex;
    const transcript = event.results[resultIndex][0].transcript;
    
    if (event.results[resultIndex].isFinal) {
      onResult(transcript);
    }
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error", event);
    onEnd();
  };

  recognition.onend = () => {
    onEnd();
  };

  // Start recognition
  recognition.start();

  // Return function to stop recognition
  return () => {
    recognition.stop();
  };
};

// Speech synthesis utility function
export const speakText = (text: string): void => {
  // Check for browser support
  if (!window.speechSynthesis) {
    console.error("Speech synthesis not supported in this browser");
    return;
  }

  // Create utterance
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'es-ES';
  
  // Optional: customize voice
  const voices = window.speechSynthesis.getVoices();
  const spanishVoice = voices.find(voice => voice.lang.includes('es'));
  if (spanishVoice) {
    utterance.voice = spanishVoice;
  }

  // Speak
  window.speechSynthesis.speak(utterance);
};

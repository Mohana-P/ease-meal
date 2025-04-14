
import { useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VoicePlaybackProps {
  instructions: string[];
}

const VoicePlayback: React.FC<VoicePlaybackProps> = ({ instructions }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  
  // Combine all instructions into a single text for voice playback
  const allInstructions = instructions.map((instruction, index) => 
    `Step ${index + 1}: ${instruction}`
  ).join('. ');
  
  const togglePlayback = () => {
    if (!isPlaying) {
      // Start text-to-speech
      const utterance = new SpeechSynthesisUtterance(allInstructions);
      utterance.rate = 0.9; // Slightly slower rate for clarity
      utterance.onend = () => setIsPlaying(false);
      utterance.onboundary = (event) => {
        // This is a simple way to track progress - not perfect, but provides feedback
        const progress = Math.floor((event.charIndex / allInstructions.length) * instructions.length);
        if (progress !== currentStep && progress < instructions.length) {
          setCurrentStep(progress);
        }
      };
      
      if (isMuted) {
        utterance.volume = 0;
      }
      
      window.speechSynthesis.cancel(); // Cancel any existing speech
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    } else {
      // Stop text-to-speech
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
    
    // If currently playing, update the mute state of the active speech
    if (isPlaying) {
      window.speechSynthesis.cancel();
      if (!isMuted) { // We're muting now
        const utterance = new SpeechSynthesisUtterance(allInstructions);
        utterance.volume = 0;
        utterance.rate = 0.9;
        utterance.onend = () => setIsPlaying(false);
        window.speechSynthesis.speak(utterance);
      } else { // We're unmuting
        const utterance = new SpeechSynthesisUtterance(allInstructions);
        utterance.rate = 0.9;
        utterance.onend = () => setIsPlaying(false);
        window.speechSynthesis.speak(utterance);
      }
    }
  };
  
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-2 bg-recipe-50 p-3 rounded-lg">
        <Button
          variant="outline"
          size="icon"
          onClick={togglePlayback}
          className={`${isPlaying ? 'bg-recipe-100 text-recipe-700' : 'bg-white'}`}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5" />
          )}
        </Button>
        <div className="flex-1">
          <div className="text-sm font-medium">
            {isPlaying ? 'Now reading recipe instructions' : 'Listen to recipe instructions'}
          </div>
          {isPlaying && (
            <div className="text-xs text-gray-500">
              Step {currentStep + 1} of {instructions.length}
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMute}
          className="text-gray-500"
        >
          {isMuted ? (
            <VolumeX className="h-5 w-5" />
          ) : (
            <Volume2 className="h-5 w-5" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default VoicePlayback;

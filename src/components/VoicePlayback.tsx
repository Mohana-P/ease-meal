
import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/sonner';

interface VoicePlaybackProps {
  instructions: string[];
}

interface ConversationMessage {
  type: 'system' | 'user';
  text: string;
}

const VoicePlayback: React.FC<VoicePlaybackProps> = ({ instructions }) => {
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [conversation, setConversation] = useState<ConversationMessage[]>([
    { type: 'system', text: 'Hi! I can help you with the recipe instructions. Ask me anything about the cooking process.' }
  ]);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);
  
  // Set up speech recognition
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';
      
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript.trim();
        if (transcript) {
          handleUserInput(transcript);
        }
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        toast.error('Speech recognition error. Please try again.');
        setIsListening(false);
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);
  
  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
    } else {
      if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        if (recognitionRef.current) {
          recognitionRef.current.start();
          setIsListening(true);
        }
      } else {
        toast.error('Speech recognition is not supported in your browser');
      }
    }
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const speakResponse = (text: string) => {
    if (isMuted) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };
  
  const getStepResponse = (query: string): string => {
    query = query.toLowerCase();
    
    // Check for step navigation commands
    if (query.includes('next step') || query.includes('next instruction')) {
      if (currentStep < instructions.length - 1) {
        setCurrentStep(currentStep + 1);
        return `Step ${currentStep + 2}: ${instructions[currentStep + 1]}`;
      } else {
        return "That was the last step! Your dish should be ready now.";
      }
    } else if (query.includes('previous step') || query.includes('back')) {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
        return `Step ${currentStep}: ${instructions[currentStep - 1]}`;
      } else {
        return "You're already at the first step.";
      }
    } else if (query.includes('repeat') || query.includes('again')) {
      return `Step ${currentStep + 1}: ${instructions[currentStep]}`;
    } else if (query.includes('current step') || query.includes('what step')) {
      return `You're on step ${currentStep + 1}: ${instructions[currentStep]}`;
    } else if (query.includes('how many steps')) {
      return `This recipe has ${instructions.length} steps.`;
    } else if (query.includes('read all steps') || query.includes('all instructions')) {
      return instructions.map((step, i) => `Step ${i + 1}: ${step}`).join('. ');
    } else if (query.includes('first step')) {
      setCurrentStep(0);
      return `Step 1: ${instructions[0]}`;
    } else if (query.includes('last step')) {
      setCurrentStep(instructions.length - 1);
      return `Step ${instructions.length}: ${instructions[instructions.length - 1]}`;
    }
    
    // General queries
    if (query.includes('how') || query.includes('what') || query.includes('when')) {
      // Simple keyword matching from current instruction
      const currentInstruction = instructions[currentStep].toLowerCase();
      
      for (const word of query.split(' ')) {
        if (word.length > 3 && currentInstruction.includes(word)) {
          return `Regarding "${word}": ${instructions[currentStep]}`;
        }
      }
      
      return `I don't have specific information about that. The current step is: ${instructions[currentStep]}`;
    }
    
    return `I'm not sure how to help with that. The current step is: ${instructions[currentStep]}`;
  };
  
  const handleUserInput = (text: string) => {
    // Add user message to conversation
    setConversation(prev => [...prev, { type: 'user', text }]);
    
    // Generate response
    const response = getStepResponse(text);
    
    // Add system response to conversation after a short delay
    setTimeout(() => {
      setConversation(prev => [...prev, { type: 'system', text: response }]);
      speakResponse(response);
    }, 500);
    
    setUserInput('');
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim()) {
      handleUserInput(userInput.trim());
    }
  };
  
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-2 bg-recipe-50 p-3 rounded-lg">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowChat(!showChat)}
          className={`${showChat ? 'bg-recipe-100 text-recipe-700' : 'bg-white'}`}
        >
          {isListening ? (
            <Mic className="h-5 w-5 text-red-500" />
          ) : (
            <MicOff className="h-5 w-5" />
          )}
        </Button>
        <div className="flex-1">
          <div className="text-sm font-medium">
            {showChat ? 'Recipe Assistant' : 'Voice Recipe Assistant'}
          </div>
          <div className="text-xs text-gray-500">
            Step {currentStep + 1} of {instructions.length}
          </div>
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
      
      {showChat && (
        <div className="border rounded-lg bg-white">
          <div className="h-64 overflow-y-auto p-4 space-y-3">
            {conversation.map((message, index) => (
              <div 
                key={index} 
                className={`${
                  message.type === 'system' 
                    ? 'bg-gray-100 text-gray-800 rounded-tr-lg rounded-bl-lg rounded-br-lg ml-0 mr-auto' 
                    : 'bg-recipe-100 text-recipe-800 rounded-tl-lg rounded-bl-lg rounded-br-lg ml-auto mr-0'
                } p-3 max-w-[80%] break-words`}
              >
                {message.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-2 border-t">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <Button 
                type="button" 
                variant="outline" 
                size="icon" 
                onClick={toggleListening}
                className={isListening ? "bg-red-100 text-red-600" : ""}
              >
                {isListening ? (
                  <Mic className="h-5 w-5" />
                ) : (
                  <MicOff className="h-5 w-5" />
                )}
              </Button>
              <Input
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ask about the recipe..."
                className="flex-1"
              />
              <Button type="submit" variant="default">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoicePlayback;

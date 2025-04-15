
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

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const VoicePlayback: React.FC<VoicePlaybackProps> = ({ instructions }) => {
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [conversation, setConversation] = useState<ConversationMessage[]>([
    { type: 'system', text: 'Hi! I\'m Rachel, your cooking assistant. I can help you with the recipe instructions. Ask me anything about the cooking process or ingredients!' }
  ]);
  
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);
  
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognitionAPI();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[event.results.length - 1][0].transcript.trim();
        if (transcript) {
          handleUserInput(transcript);
        }
      };
      
      recognitionRef.current.onerror = (event: any) => {
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
          toast.success("I'm listening! Ask me about the recipe.");
        }
      } else {
        toast.error('Speech recognition is not supported in your browser');
      }
    }
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      toast.info("Voice responses muted");
    } else {
      toast.info("Voice responses enabled");
    }
  };
  
  const speakResponse = (text: string) => {
    if (isMuted) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    
    // Set a female voice
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice => 
      voice.name.includes('female') || 
      voice.name.includes('Female') ||
      voice.name.includes('Google US English Female') ||
      voice.name.includes('Samantha') ||
      voice.name.toLowerCase().includes('woman')
    );
    
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }
    
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };
  
  // Load voices as soon as possible
  useEffect(() => {
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };
    
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      loadVoices();
      
      // Chrome requires this event to load voices
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);
  
  const getStepResponse = (query: string): string => {
    query = query.toLowerCase();
    
    // Check for common cooking assistant triggers
    if (query.includes('hi chef') || query.includes('hey chef')) {
      if (currentStep < instructions.length) {
        return `Hello! For this step, you need to: ${instructions[currentStep]}`;
      } else {
        return "Hello! You've completed all the steps. The dish should be ready now!";
      }
    }
    
    // Handle questions about what to do next after specific actions
    if (query.includes('what should i do next') || query.includes('what next')) {
      // Check for specific cooking actions the user might have just done
      if (query.includes('marinated') || query.includes('marinate')) {
        for (let i = 0; i < instructions.length; i++) {
          const step = instructions[i].toLowerCase();
          if (step.includes('marinate')) {
            if (i + 1 < instructions.length) {
              setCurrentStep(i + 1);
              return `Now that you've marinated, the next step is to: ${instructions[i + 1]}`;
            }
          }
        }
      }
      
      if (query.includes('chopped') || query.includes('cut') || query.includes('sliced')) {
        for (let i = 0; i < instructions.length; i++) {
          const step = instructions[i].toLowerCase();
          if (step.includes('chop') || step.includes('cut') || step.includes('slice')) {
            if (i + 1 < instructions.length) {
              setCurrentStep(i + 1);
              return `Now that you've prepared the ingredients, the next step is to: ${instructions[i + 1]}`;
            }
          }
        }
      }
      
      if (query.includes('mixed') || query.includes('combine') || query.includes('combined')) {
        for (let i = 0; i < instructions.length; i++) {
          const step = instructions[i].toLowerCase();
          if (step.includes('mix') || step.includes('combine')) {
            if (i + 1 < instructions.length) {
              setCurrentStep(i + 1);
              return `Now that you've mixed everything, the next step is to: ${instructions[i + 1]}`;
            }
          }
        }
      }
      
      if (query.includes('heated') || query.includes('pan is hot')) {
        for (let i = 0; i < instructions.length; i++) {
          const step = instructions[i].toLowerCase();
          if (step.includes('heat')) {
            if (i + 1 < instructions.length) {
              setCurrentStep(i + 1);
              return `Now that the pan is hot, the next step is to: ${instructions[i + 1]}`;
            }
          }
        }
      }
      
      // Generic next step if no specific action is recognized
      if (currentStep < instructions.length - 1) {
        setCurrentStep(currentStep + 1);
        return `Let's move to the next step. ${instructions[currentStep]}`;
      } else {
        return "That's all the steps! Your dish should be ready now. Enjoy!";
      }
    }
    
    // Personalized responses
    const greetings = ['hi', 'hello', 'hey'];
    if (greetings.some(greeting => query.includes(greeting)) && !query.includes('chef')) {
      return "Hello! I'm Rachel, your cooking assistant. How can I help you with your cooking today?";
    }
    
    if (query.includes('thank you') || query.includes('thanks')) {
      return "You're welcome! I'm happy to help with your cooking. Anything else you'd like to know?";
    }
    
    if (query.includes('who are you')) {
      return "I'm Rachel, your cooking assistant. I can guide you through recipes, answer cooking questions, and help you make delicious meals!";
    }
    
    if (query.includes('next step') || query.includes('next instruction')) {
      if (currentStep < instructions.length - 1) {
        setCurrentStep(currentStep + 1);
        return `Let me move to the next step. Step ${currentStep + 2}: ${instructions[currentStep + 1]}`;
      } else {
        return "That was the last step! Your dish should be ready now. Enjoy your meal!";
      }
    } else if (query.includes('previous step') || query.includes('back')) {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
        return `Going back to the previous step. Step ${currentStep}: ${instructions[currentStep - 1]}`;
      } else {
        return "We're already at the first step. Would you like me to explain it again?";
      }
    } else if (query.includes('repeat') || query.includes('again')) {
      return `Let me repeat that for you. Step ${currentStep + 1}: ${instructions[currentStep]}`;
    } else if (query.includes('current step') || query.includes('what step')) {
      return `You're on step ${currentStep + 1} of ${instructions.length}: ${instructions[currentStep]}`;
    } else if (query.includes('how many steps')) {
      return `This recipe has ${instructions.length} steps in total. We're currently on step ${currentStep + 1}.`;
    } else if (query.includes('read all steps') || query.includes('all instructions')) {
      return `Here are all the steps: ${instructions.map((step, i) => `Step ${i + 1}: ${step}`).join('. ')}`;
    } else if (query.includes('first step')) {
      setCurrentStep(0);
      return `Going to the first step. Step 1: ${instructions[0]}`;
    } else if (query.includes('last step')) {
      setCurrentStep(instructions.length - 1);
      return `Jumping to the last step. Step ${instructions.length}: ${instructions[instructions.length - 1]}`;
    }
    
    // Check for questions about current step
    if (query.includes('how') || query.includes('what') || query.includes('when')) {
      const currentInstruction = instructions[currentStep].toLowerCase();
      
      // Check for ingredient questions
      if (query.includes('ingredient') || query.includes('add') || query.includes('use')) {
        for (const word of query.split(' ')) {
          if (word.length > 3 && currentInstruction.includes(word)) {
            return `In this step, we're using ${word}. ${instructions[currentStep]}`;
          }
        }
      }
      
      // Check for time-related questions
      if (query.includes('long') || query.includes('time') || query.includes('minutes')) {
        const timeMatch = currentInstruction.match(/(\d+)\s*(minute|min|hour|hr|second|sec)/i);
        if (timeMatch) {
          return `You should allow ${timeMatch[0]} for this step. ${instructions[currentStep]}`;
        }
      }
      
      // Check for temperature questions
      if (query.includes('temperature') || query.includes('hot') || query.includes('heat')) {
        const tempMatch = currentInstruction.match(/(\d+)\s*(degree|°|celsius|fahrenheit|c\b|f\b)/i);
        if (tempMatch) {
          return `The temperature should be set to ${tempMatch[0]} for this step. ${instructions[currentStep]}`;
        }
      }
      
      for (const word of query.split(' ')) {
        if (word.length > 3 && currentInstruction.includes(word)) {
          return `Regarding "${word}": ${instructions[currentStep]}`;
        }
      }
      
      return `I'm not entirely sure about that specific detail. The current step says: ${instructions[currentStep]}. Can you ask me in a different way?`;
    }
    
    // Default response for unrecognized queries
    return `I'm not sure how to help with that specific question. For the current step (${currentStep + 1}), you need to: ${instructions[currentStep]}. Is there anything specific about this step you'd like to know?`;
  };
  
  const handleUserInput = (text: string) => {
    setConversation(prev => [...prev, { type: 'user', text }]);
    
    const response = getStepResponse(text);
    
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
          onClick={toggleListening}
          className={`${isListening ? 'bg-recipe-100 text-recipe-700' : 'bg-white'}`}
        >
          {isListening ? (
            <Mic className="h-5 w-5 text-red-500" />
          ) : (
            <MicOff className="h-5 w-5" />
          )}
        </Button>
        <div className="flex-1">
          <div className="text-sm font-medium">
            {showChat ? 'Rachel - Recipe Assistant' : 'Voice Recipe Assistant'}
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
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowChat(!showChat)}
          className="text-recipe-600"
        >
          {showChat ? "Hide Chat" : "Show Chat"}
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
                placeholder="Ask Rachel about the recipe..."
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

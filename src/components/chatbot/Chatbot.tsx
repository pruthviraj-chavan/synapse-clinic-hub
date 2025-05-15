
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, X, Send, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! I'm Synapse AI. How can I help you today?", isUser: false }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial responses based on keywords
  const responses: Record<string, string> = {
    'appointment': "You can book an appointment from the 'Appointments' section of your dashboard, or I can guide you there. Would you like to book an appointment now?",
    'service': "We offer various neurological and astrological services including consultations, diagnostics, and personalized treatment plans. You can view all our services in the Services section.",
    'payment': "We accept UPI, net banking, and cash payments at the clinic. All payments are secure and receipts are provided automatically.",
    'report': "Your reports can be accessed from your dashboard under the 'Reports' section once they're uploaded by Dr. Sharma.",
    'headache': "Recurring headaches could be due to various factors including stress, dehydration, or other neurological conditions. It's best to book a consultation with Dr. Sharma for proper diagnosis.",
    'birth chart': "A birth chart analysis examines the positions of celestial bodies at the time of your birth to provide insights into your personality, strengths, and life path. Would you like to book an astrology session?",
    'astrology': "Our astrology services include birth chart analysis, transit forecasts, compatibility readings, and career guidance based on celestial influences.",
    'neurology': "Our neurology services include consultations, diagnostic tests, treatment plans, and follow-ups for various neurological conditions.",
    'reschedule': "To reschedule an appointment, please go to the Appointments section in your dashboard and select the reschedule option next to your appointment.",
    'fee': "Our consultation fees range from ₹2,000 to ₹5,000 depending on the service. You can find detailed pricing on the Services page.",
    'doctor': "Dr. Sharma is a board-certified neurologist with over 15 years of experience, specializing in neurological disorders and integrative medicine that incorporates astrological insights.",
    'help': "I can help you with information about our services, appointment booking, payments, and general queries about neurology and astrology. What would you like to know?"
  };

  // Add a default response
  const defaultResponse = "I'm not sure about that. For specific questions about your health or astrology reading, it's best to consult with Dr. Sharma directly through an appointment.";

  useEffect(() => {
    // Scroll to bottom when messages change
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    const userMessage = { id: messages.length + 1, text: message, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    
    // Find a response based on keywords in the message
    setTimeout(() => {
      const lowerCaseMessage = message.toLowerCase();
      let responded = false;
      
      // Check for keywords in the message
      for (const [keyword, response] of Object.entries(responses)) {
        if (lowerCaseMessage.includes(keyword.toLowerCase())) {
          setMessages(prev => [...prev, { 
            id: prev.length + 1, 
            text: response, 
            isUser: false 
          }]);
          responded = true;
          break;
        }
      }
      
      // If no keyword was matched, use the default response
      if (!responded) {
        setMessages(prev => [...prev, { 
          id: prev.length + 1, 
          text: defaultResponse, 
          isUser: false 
        }]);
      }
    }, 800);
    
    setMessage('');
  };

  return (
    <>
      {/* Chatbot toggle button (fixed at bottom right) */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(prev => !prev)}
          className={cn(
            "h-14 w-14 rounded-full shadow-lg",
            isOpen ? "bg-gray-600 hover:bg-gray-700" : "bg-synapse-purple hover:bg-synapse-deep-purple"
          )}
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        </Button>
      </div>
      
      {/* Chatbot window */}
      <div
        className={cn(
          "fixed bottom-24 right-6 z-50 w-80 md:w-96 transition-all duration-300 transform",
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        )}
      >
        <Card className="border-synapse-purple/20 shadow-lg">
          <CardHeader className="bg-synapse-purple text-white py-3 px-4 flex flex-row items-center justify-between rounded-t-lg">
            <CardTitle className="text-base flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Synapse Assistant
            </CardTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-white hover:bg-synapse-purple/20 rounded-full p-0"
            >
              <ChevronDown className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent className="p-3 h-[350px] overflow-y-auto">
            <div className="space-y-3">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={cn(
                    "max-w-[80%] rounded-lg p-3 text-sm",
                    msg.isUser 
                      ? "bg-synapse-purple text-white ml-auto" 
                      : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  )}
                >
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <CardFooter className="p-3 border-t">
            <form onSubmit={handleSubmit} className="flex w-full gap-2">
              <Input
                placeholder="Type your question..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon" className="bg-synapse-purple hover:bg-synapse-deep-purple">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Chatbot;

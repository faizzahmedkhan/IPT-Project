import React, { useState, useRef, useEffect, useCallback } from "react";
import { Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

// The API endpoint should be a relative path for deployment flexibility
const CHAT_API_ENDPOINT = 'http://127.0.0.1:8000/chat'; 
const SESSION_ID = Math.random().toString(36).substring(2);

// --- Utility Function to replicate original JavaScript logic ---

const parseMarkdownToHTML = (text: string): string => {
    let html = text;
    
    // 1. Inline formatting first
    // Convert **bold** to <strong>
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convert *italic* to <em>
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // 2. Prepare for block-level parsing
    
    // Convert ### Heading 3 to <h3> (using Tailwind classes for styling)
    html = html.replace(/^### (.*?)$/gm, '<h3 class="text-lg font-bold mt-2 mb-1 text-foreground">$1</h3>');
    
    // Convert ## Heading 2 to <h2>
    html = html.replace(/^## (.*?)$/gm, '<h2 class="text-xl font-bold mt-3 mb-1 text-foreground">$1</h2>');
    
    // Convert # Heading 1 to <h1>
    html = html.replace(/^# (.*?)$/gm, '<h1 class="text-2xl font-bold mt-4 mb-2 text-foreground">$1</h1>');
    
    // 3. List processing (Re-implementing the state machine logic from index.html)
    const lines = html.split('\n');
    let inList = false;
    let listType: 'ul' | 'ol' | null = null;
    let result: string[] = [];
    
    const closeList = () => {
        if (inList && listType) {
            result.push(`</${listType}>`);
            inList = false;
            listType = null;
        }
    };

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const isBulletPoint = /^\s*\*\s+/.test(line);
        const isNumberedPoint = /^\s*\d+\.\s+/.test(line);
        
        if (isBulletPoint || isNumberedPoint) {
            const currentType: 'ul' | 'ol' = isBulletPoint ? 'ul' : 'ol';
            const listClasses = `list-inside space-y-0.5 my-1 ml-4 text-sm ${currentType === 'ol' ? 'list-decimal' : 'list-disc'}`;
            
            if (!inList) {
                listType = currentType;
                result.push(`<${listType} class="${listClasses}">`);
                inList = true;
            } else if (currentType !== listType) {
                // Type change: close old list, open new one
                closeList();
                listType = currentType;
                result.push(`<${listType} class="${listClasses}">`);
                inList = true;
            }
            
            // Extract item text and push the <li>
            const itemText = line.replace(/^\s*[\*\d+\.]\s+/, '').trim();
            result.push(`<li>${itemText}</li>`);

        } else {
            // Not a list item
            closeList();
            
            if (line.trim()) {
                // Only wrap in <p> if it's plain text and not already a block-level element (h1/h2/h3).
                if (!/^<(h|ul|ol)/i.test(line.trim())) {
                    result.push(`<p class="my-1 leading-relaxed text-sm text-foreground/90">${line}</p>`);
                } else {
                    // Preserve existing headings (which were already replaced in step 2)
                    result.push(line);
                }
            }
        }
    }
    
    closeList();
    
    return result.join('\n');
};


// --- Chat Message Interface and Component ---

interface ChatMessage {
  id: number;
  sender: 'user' | 'bot';
  content: string;
  streaming: boolean;
}

interface ChatBubbleProps {
  message: ChatMessage;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  // Use existing Tailwind color variables (`bg-primary`, `bg-muted`, `text-primary-foreground`, `text-foreground`)
  const bubbleClasses = cn(
    "p-3 rounded-xl max-w-[85%] shadow-md",
    isUser
      ? "bg-primary text-primary-foreground rounded-br-none self-end whitespace-pre-wrap"
      : "bg-muted/50 text-muted-foreground rounded-tl-none self-start overflow-hidden",
  );
  const containerClasses = cn("flex flex-col", isUser ? "items-end" : "items-start");

  const content = message.content;

  return (
    <div className={containerClasses}>
      <p className="font-semibold text-xs mb-1 text-foreground/70">
        {isUser ? 'You:' : 'Bot:'}
      </p>
      <div className={bubbleClasses}>
        {isUser || message.streaming
          ? content // Render raw content if user or currently streaming (to show partial text)
          : <div dangerouslySetInnerHTML={{ __html: parseMarkdownToHTML(content) }} /> // Inject parsed HTML for final bot response
        }
      </div>
    </div>
  );
};


// --- Main Chatbot Widget Component ---

const ChatbotWidget: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initial message and scroll to bottom
  useEffect(() => {
    setMessages([
      {
        id: 0,
        sender: 'bot',
        content: "Hello! I am a chatbot assistant providing information about Tauqeer Ali Khan's Professional Services. How can I assist you?",
        streaming: false,
      },
    ]);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const streamBotResponse = useCallback(async (query: string) => {
    setIsLoading(true);
    
    // 1. Add User Message immediately
    const userMessage: ChatMessage = { id: Date.now(), sender: 'user', content: query, streaming: false };
    setMessages((prev) => [...prev, userMessage]); 
    
    let botMessageId = Date.now() + 1;
    let streamedContent = '';
    
    try {
      const response = await fetch(CHAT_API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, session_id: SESSION_ID }),
      });

      if (!response.ok || !response.body) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let botMessageAppended = false;

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        if (chunk) {
          streamedContent += chunk;
          
          setMessages(prevMessages => {
            // 2. Append the bot message only on the first chunk
            if (!botMessageAppended) {
                botMessageAppended = true;
                // Add the new bot message to the end of the list
                return [
                    ...prevMessages, 
                    { id: botMessageId, sender: 'bot', content: streamedContent, streaming: true }
                ];
            }
            
            // 3. Update the existing bot message on subsequent chunks
            return prevMessages.map(msg => 
                msg.id === botMessageId ? { ...msg, content: streamedContent } : msg
            );
          });
        }
      }

      // 4. Finalize the message (set streaming: false)
      setMessages(prevMessages => 
        prevMessages.map(msg => 
            msg.id === botMessageId ? { ...msg, streaming: false } : msg
        )
      );

    } catch (error) {
      console.error('Streaming error:', error);
      setMessages((prev) => 
        [...prev, { 
            id: botMessageId, // Use the same ID for the error message
            sender: 'bot', 
            content: `Error: Could not connect to the backend server. Is the Flask app running at ${CHAT_API_ENDPOINT}?`, 
            streaming: false 
        }]
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSend = () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    setInput('');
    streamBotResponse(trimmedInput);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <Card className="h-full max-h-[80vh] min-h-[500px] flex flex-col bg-card/70 backdrop-blur-sm border-border/50 shadow-card">
        <CardHeader className="p-4 border-b border-border">
            <CardTitle className="text-xl font-bold text-foreground">AI Assistant</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">Ask me about Tauqeer Ali Khan's services and skills.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 p-4 pb-0 overflow-hidden">
            <ScrollArea className="h-full" ref={scrollRef as any}>
                <div className="flex flex-col space-y-4 pr-4 pb-4">
                    {messages.map((message) => (
                        <ChatBubble key={message.id} message={message} />
                    ))}
                    {/* THIS IS THE SINGLE, CORRECT LOADING INDICATOR */}
                    {isLoading && (
                      <div className="flex flex-col items-start text-sm italic text-muted-foreground">
                        <p className="font-semibold text-foreground/70 text-xs mb-1">Bot:</p>
                        <div className="p-3 bg-muted/50 rounded-xl rounded-tl-none shadow-sm">
                            <span>... is generating response</span>
                        </div>
                      </div>
                    )}
                </div>
            </ScrollArea>
        </CardContent>
        <div className="p-4 border-t border-border flex space-x-3">
            <Input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={isLoading}
                className="flex-grow bg-background text-foreground border-input focus-visible:ring-primary"
            />
            <Button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
            >
                <Send className="h-4 w-4" />
                <span className="ml-2 hidden sm:inline">Send</span>
            </Button>
        </div>
    </Card>
  );
};

export default ChatbotWidget;
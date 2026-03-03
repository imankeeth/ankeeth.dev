import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
import { X, Terminal, GripVertical, ChevronRight, ChevronDown, Activity, Send, Plus, MessageSquare, Trash2, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { streamAuraResponse, type AuraMessage } from '../../services/auraService';
import { useAtom } from 'jotai';
import { auraPositionAtom, auraIntentAtom, auraSessionsAtom, auraActiveSessionIdAtom, type ExtendedAuraMessage } from '../../store/atoms';
import { SYSTEM_PROMPT } from '../../constants';
import Panel from './Panel';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import BracketLink from './BracketLink';

interface AuraProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUGGESTIONS = [
  "Who is Ankeeth?",
  "What is the Agentic Accelerator?",
  "Summarize engineering philosophy",
  "Show me recent experiments",
];

// --- Sub-Components ---

const CollapsibleSection = memo(({ title, children, defaultOpen = false, icon, statusColor = "text-gray-500" }: { title: string, children: React.ReactNode, defaultOpen?: boolean, icon?: React.ReactNode, statusColor?: string }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 rounded-sm overflow-hidden mb-2 shadow-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2 px-3 py-2 bg-gray-100/50 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-left"
      >
        <span className="text-gray-400">
          {isOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
        </span>
        {icon && <span className={`${statusColor} opacity-80`}>{icon}</span>}
        <span className="text-[10px] font-mono uppercase tracking-wider text-gray-600 dark:text-gray-300 font-semibold">{title}</span>
      </button>
      {isOpen && (
        <div className="p-3 text-xs font-mono text-gray-600 dark:text-gray-400 bg-white/50 dark:bg-black/20 border-t border-gray-200 dark:border-white/5 overflow-x-auto relative">
          <div className="absolute top-0 left-0 w-1 h-full bg-accent-teal/20"></div>
          <div className="pl-2">
             {children}
          </div>
        </div>
      )}
    </div>
  );
});

const MessageItem = memo(({ msg }: { msg: ExtendedAuraMessage }) => {
  return (
    <div className="flex flex-col gap-1 group">
        {/* Header Line */}
        <div className="flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity mb-1">
            <span className={`text-[10px] uppercase font-bold tracking-widest ${msg.role === 'user' ? 'text-accent-blue' : 'text-accent-teal'}`}>
                {msg.role === 'user' ? '> YOU' : '> AURA'}
            </span>
            <span className="text-[10px] text-gray-500 dark:text-gray-600 font-mono">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
        </div>

        {/* Content */}
        <div className="pl-0 text-gray-700 dark:text-gray-300">
            {msg.type === 'text' && (
                <div className="leading-relaxed relative min-h-[20px]">
                    {(!msg.content && msg.isStreaming) ? (
                         <div className="flex items-center gap-2 text-accent-teal/70 italic text-xs font-mono h-6 animate-pulse">
                            <span className="w-1.5 h-1.5 bg-accent-teal rounded-full"></span>
                            <span>Aura is thinking...</span>
                         </div>
                    ) : (
                        <>
                            <div className="markdown-content markdown-content--sm break-words">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeSanitize]}
                                    components={{
                                        p: ({children}) => <p className="mb-2 last:mb-0 leading-relaxed break-words">{children}</p>,
                                        a: ({href, children}) => <BracketLink href={href}>{children}</BracketLink>,
                                        ul: ({children}) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
                                        ol: ({children}) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
                                        li: ({children}) => <li className="pl-1">{children}</li>,
                                        code: ({className, children, ...props}) => (
                                            <code className={`${className} font-mono text-xs bg-gray-200 dark:bg-white/10 px-1 py-0.5 rounded-[1px] text-accent-teal dark:text-accent-teal border border-gray-300 dark:border-white/10`} {...props}>
                                                {children}
                                            </code>
                                        ),
                                        pre: ({children}) => (
                                            <pre className="overflow-x-auto my-2 p-3 bg-gray-100 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-sm text-gray-600 dark:text-gray-300 [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-inherit [&>code]:border-0 shadow-inner">
                                                {children}
                                            </pre>
                                        ),
                                        blockquote: ({children}) => <blockquote className="border-l-2 border-accent-teal pl-3 italic text-gray-500 my-2">{children}</blockquote>,
                                    }}
                                >
                                    {msg.content}
                                </ReactMarkdown>
                            </div>
                            {msg.isStreaming && <span className="inline-block w-1.5 h-3 bg-accent-teal animate-pulse align-middle ml-1" />}
                        </>
                    )}
                </div>
            )}

            {msg.type === 'tool_call' && (
                <CollapsibleSection 
                    title={`EXECUTING: ${msg.toolName}`} 
                    icon={<Activity size={12} />}
                    defaultOpen={true}
                    statusColor="text-accent-orange"
                >
                    <div className="flex flex-col gap-1">
                        <div className="text-[9px] text-gray-400 uppercase tracking-widest mb-1">Arguments</div>
                        <pre className="text-[10px] text-accent-orange/90 whitespace-pre-wrap font-mono bg-black/5 dark:bg-black/20 p-2 rounded-sm border border-black/5 dark:border-white/5">
                            {JSON.stringify(msg.toolArgs, null, 2)}
                        </pre>
                    </div>
                </CollapsibleSection>
            )}

             {msg.type === 'tool_result' && (
                <CollapsibleSection 
                    title={`RESULT: ${msg.toolName}`} 
                    defaultOpen={false}
                    statusColor="text-accent-green"
                    icon={<Terminal size={12} />}
                >
                    <pre className="text-[10px] text-gray-600 dark:text-gray-400 whitespace-pre-wrap font-mono">
                        {JSON.stringify(msg.toolResult, null, 2)}
                    </pre>
                </CollapsibleSection>
            )}
        </div>
    </div>
  );
});

const MessageList = memo(({ messages, onSuggestionClick }: { messages: ExtendedAuraMessage[], onSuggestionClick: (text: string) => void }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto min-h-0 p-4 space-y-6 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent font-mono text-sm">
      {messages.length === 0 && (
         <div className="h-full flex flex-col items-center justify-center">
             <div className="text-center mb-8 text-gray-400 dark:text-gray-600 opacity-50">
                 <Terminal size={24} className="mx-auto mb-2" />
                 <span className="text-xs font-mono">Aura System Ready</span>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full max-w-md px-4">
                {SUGGESTIONS.map((text) => (
                    <button 
                        key={text}
                        onClick={() => onSuggestionClick(text)}
                        className="text-left px-4 py-3 bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-accent-teal hover:bg-accent-teal/5 transition-all rounded-sm text-xs font-mono text-gray-600 dark:text-gray-300 group"
                    >
                        <span className="opacity-50 group-hover:text-accent-teal mr-2">&gt;</span>
                        {text}
                    </button>
                ))}
             </div>
         </div>
      )}
      {messages.map((msg) => (
        <MessageItem key={msg.id} msg={msg} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
});

const InputArea = memo(({ onSend, isThinking }: { onSend: (val: string) => void, isThinking: boolean }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const resizeInput = useCallback(() => {
    const el = inputRef.current;
    if (!el) return;

    // Autosize from 1 line up to a capped height, then scroll.
    el.style.height = '0px';
    const maxHeight = 160;
    const nextHeight = Math.min(el.scrollHeight, maxHeight);
    el.style.height = `${nextHeight}px`;
    el.style.overflowY = el.scrollHeight > maxHeight ? 'auto' : 'hidden';
  }, []);

  // Focus on mount (when Aura opens)
  useEffect(() => {
    inputRef.current?.focus();
    resizeInput();
  }, [resizeInput]);

  useEffect(() => {
    resizeInput();
  }, [query, resizeInput]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (!query.trim() || isThinking) return;
    onSend(query);
    setQuery('');
  };

  const hasContent = query.trim().length > 0;

  return (
    <div className="shrink-0 p-4 border-t border-gray-200 dark:border-white/10 bg-gray-50/90 dark:bg-black/40 backdrop-blur-sm">
        <div className="relative flex items-center gap-3">
            <span className="text-accent-teal animate-pulse"><Terminal size={16} /></span>
            <textarea
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onInput={resizeInput}
                onKeyDown={handleKeyDown}
                placeholder="Enter command or query..."
                rows={1}
                className="w-full bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 font-mono tracking-tight resize-none border-0 outline-none focus:outline-none focus-visible:outline-none active:outline-none ring-0 focus:ring-0 focus-visible:ring-0 shadow-none focus:shadow-none focus:border-0"
                style={{ outline: 'none', boxShadow: 'none', border: 'none' }}
                autoComplete="off"
            />
             <button 
                onClick={handleSend}
                disabled={isThinking || !hasContent}
                className="text-gray-400 dark:text-gray-500 hover:text-accent-teal disabled:opacity-30 transition-colors"
            >
                <Send size={16} />
            </button>
        </div>
    </div>
  );
});

const SessionList = ({ 
  sessions, 
  activeId, 
  onSelect, 
  onNew,
  onDelete 
}: { 
  sessions: any[], 
  activeId: string | null, 
  onSelect: (id: string) => void,
  onNew: () => void,
  onDelete: (id: string, e: React.MouseEvent) => void
}) => {
    return (
        <div className="flex flex-col h-full bg-gray-50 dark:bg-black/20 w-full shrink-0">
             <button 
                onClick={onNew}
                className="flex items-center gap-2 p-3 text-xs font-mono text-gray-500 hover:text-accent-teal hover:bg-black/5 dark:hover:bg-white/5 transition-colors border-b border-gray-200 dark:border-white/10 group uppercase tracking-wider"
             >
                <Plus size={12} className="group-hover:rotate-90 transition-transform" />
                <span>NEW_THREAD</span>
             </button>
             
             <div className="flex-1 overflow-y-auto min-h-0 divide-y divide-gray-200 dark:divide-white/5">
                 {sessions.length === 0 && (
                     <div className="p-4 text-[10px] text-gray-400 italic text-center">No active logs.</div>
                 )}
                 {sessions.map(s => (
                     <div 
                        key={s.id}
                        className={`group relative flex items-center gap-2 p-3 cursor-pointer text-xs font-mono transition-colors
                            ${activeId === s.id 
                              ? 'bg-white dark:bg-white/5 text-accent-teal border-l-2 border-l-accent-teal' 
                              : 'text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5 border-l-2 border-l-transparent'
                            }
                        `}
                        onClick={() => onSelect(s.id)}
                     >
                         <MessageSquare size={12} className={activeId === s.id ? 'opacity-100' : 'opacity-50'} />
                         <span className="truncate flex-1 font-medium">{s.title || 'Untitled_Log'}</span>
                         
                         <button 
                            onClick={(e) => onDelete(s.id, e)}
                            className="opacity-0 group-hover:opacity-100 p-1.5 hover:text-red-500 hover:bg-red-500/10 rounded-sm transition-all"
                            title="Delete Thread"
                         >
                             <Trash2 size={12} />
                         </button>
                     </div>
                 ))}
             </div>
        </div>
    );
};

// --- Main Component ---

const Aura: React.FC<AuraProps> = ({ isOpen, onClose }) => {
  // Global State
  const [sessions, setSessions] = useAtom(auraSessionsAtom);
  const [activeSessionId, setActiveSessionId] = useAtom(auraActiveSessionIdAtom);
  const [position, setPosition] = useAtom(auraPositionAtom);
  const [intent, setIntent] = useAtom(auraIntentAtom);
  
  // Local State
  const [isThinking, setIsThinking] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false); // Mobile toggle or collapsible
  const dragControls = useDragControls();

  // Ensure there is always a session active if open
  useEffect(() => {
     if (isOpen && sessions.length === 0) {
         handleNewSession();
     } else if (isOpen && !activeSessionId && sessions.length > 0) {
         setActiveSessionId(sessions[0].id);
     }
  }, [isOpen]);

  const activeSession = sessions.find(s => s.id === activeSessionId);
  const messages = activeSession?.messages || [];

  const handleNewSession = useCallback(() => {
     const newSession = {
         id: Date.now().toString(),
         title: 'New Session',
         messages: [], // Empty messages to show suggestions
         createdAt: Date.now(),
         lastActiveAt: Date.now()
     };
     setSessions(prev => [newSession, ...prev]);
     setActiveSessionId(newSession.id);
     if (window.innerWidth < 768) setShowSidebar(false);
  }, [setSessions, setActiveSessionId]);

  const handleDeleteSession = useCallback((id: string, e: React.MouseEvent) => {
      e.stopPropagation();
      setSessions(prev => {
          const filtered = prev.filter(s => s.id !== id);
          if (activeSessionId === id) {
              setActiveSessionId(filtered.length > 0 ? filtered[0].id : null);
          }
          return filtered;
      });
  }, [activeSessionId, setActiveSessionId, setSessions]);

  const handleSend = useCallback(async (text: string) => {
    if (!activeSessionId) return;

    const userMsg: ExtendedAuraMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: Date.now(),
      type: 'text'
    };

    // Optimistic Update
    setSessions(prev => prev.map(s => {
        if (s.id === activeSessionId) {
            // Auto-title on first user message
            const isFirstUserMsg = s.messages.length === 0; // Check if empty
            const newTitle = isFirstUserMsg ? (text.length > 20 ? text.substring(0, 20) + '...' : text) : s.title;
            
            return {
                ...s,
                title: newTitle,
                messages: [...s.messages, userMsg],
                lastActiveAt: Date.now()
            };
        }
        return s;
    }));

    setIsThinking(true);

    const modelMsgId = (Date.now() + 1).toString();
    const loadingMsg: ExtendedAuraMessage = {
        id: modelMsgId,
        role: 'model',
        content: '',
        timestamp: Date.now(),
        isStreaming: true,
        type: 'text'
    };

    setSessions(prev => prev.map(s => 
        s.id === activeSessionId 
        ? { ...s, messages: [...s.messages, loadingMsg] }
        : s
    ));

    try {
        // We pass the CURRENT messages (excluding the loading one) as history
        // We must re-fetch the session to get the latest state including the user message we just added
        // Since setSessions is async, we can't trust 'messages' var here fully, but for logic flow:
        // The service needs the history BEFORE the new model generation.
        // We can just construct it: [...currentMessages, userMsg]
        const historyForContext = [...messages, userMsg];

        const auraHistory: AuraMessage[] = historyForContext.map(m => ({
            id: m.id,
            role: m.role,
            content: m.content,
            timestamp: m.timestamp
        }));
        const stream = streamAuraResponse(auraHistory, SYSTEM_PROMPT);
        let fullContent = '';
        
        for await (const response of stream) {
            fullContent = response.text;
            setSessions(prev => prev.map(s => {
                if (s.id === activeSessionId) {
                     return {
                         ...s,
                         messages: s.messages.map(m => m.id === modelMsgId ? { ...m, content: fullContent } : m)
                     };
                }
                return s;
            }));
        }

        setSessions(prev => prev.map(s => {
             if (s.id === activeSessionId) {
                 return {
                     ...s,
                     messages: s.messages.map(m => m.id === modelMsgId ? { ...m, isStreaming: false } : m)
                 };
             }
             return s;
        }));

    } catch (e) {
        console.error("Aura stream error:", e);
        setSessions(prev => prev.map(s => {
            if (s.id === activeSessionId) {
                return {
                    ...s,
                    messages: s.messages.map(m => m.id === modelMsgId ? { 
                        ...m, 
                        isStreaming: false, 
                        content: `**ERROR:** Communication interrupted.\n\n\`${e instanceof Error ? e.message : 'Unknown system error.'}\`\n\nPlease try again.` 
                    } : m)
                };
            }
            return s;
        }));
    } finally {
        setIsThinking(false);
    }
  }, [activeSessionId, setSessions, messages]); 

  // Handle Incoming Intent (from other parts of the app)
  useEffect(() => {
    if (isOpen && intent && !isThinking) {
      // Create a new session for the intent to avoid polluting context
      handleNewSession();
      // Small delay to ensure state update propagates
      setTimeout(() => {
          handleSend(intent);
          setIntent(null);
      }, 100);
    }
  }, [isOpen, intent, isThinking, handleNewSession, handleSend, setIntent]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4 md:p-0">
          <motion.div 
            className="pointer-events-auto w-full max-w-[800px]" // Widened for sidebar
            initial={{ opacity: 0, scale: 0.95, x: position.x, y: position.y }}
            animate={{ opacity: 1, scale: 1, x: position.x, y: position.y }}
            exit={{ opacity: 0, scale: 0.95, x: position.x, y: position.y }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            drag
            dragListener={false}
            dragControls={dragControls}
            dragMomentum={false}
            whileDrag={{ scale: 1.02 }}
            onDragEnd={(e, info) => {
               const newPos = {
                 x: position.x + info.offset.x,
                 y: position.y + info.offset.y
               };
               setPosition(newPos);
            }}
          >
            {/* Living System: Idle Halo Animation */}
            <motion.div
              className="absolute -inset-1 bg-accent-teal rounded-sm blur-2xl -z-10"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: isThinking ? [0.2, 0.5, 0.2] : [0.1, 0.3, 0.1],
                scale: isThinking ? [0.98, 1.05, 0.98] : [0.98, 1.02, 0.98]
              }}
              transition={{ 
                duration: isThinking ? 2 : 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />

            <Panel 
              title="AURA // NEURAL_INTERFACE" 
              className="h-[80vh] md:h-[600px] border-accent-teal/30 cursor-default shadow-2xl bg-surface-light/95 dark:bg-surface/95 backdrop-blur-md overflow-hidden"
              noPadding
              showMenu={false}
              dragHandle={
                 <div 
                    className="mr-2 cursor-grab active:cursor-grabbing text-accent-teal/50 hover:text-accent-teal transition-colors"
                    onPointerDown={(e) => dragControls.start(e)}
                 >
                    <GripVertical size={14} />
                 </div>
              }
              action={
                 <div className="flex items-center gap-3">
                     <button 
                        onClick={() => setShowSidebar(!showSidebar)}
                        className={`text-gray-400 hover:text-black dark:hover:text-white transition-colors ${showSidebar ? 'text-accent-teal' : ''}`}
                        title={showSidebar ? "Close Sidebar" : "Open Sidebar"}
                     >
                        {showSidebar ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}
                     </button>
                     <button onClick={onClose} className="text-gray-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer">
                        <X size={16} />
                     </button>
                 </div>
              }
            >
              <div className="flex h-full w-full overflow-hidden">
                {/* Sidebar - Conditional on Mobile, Flex on Desktop if expanded? No, let's keep it collapsible */}
                <motion.div 
                    initial={false}
                    animate={{ width: showSidebar ? 200 : 0, opacity: showSidebar ? 1 : 0 }}
                    className="overflow-hidden flex-shrink-0 border-r border-gray-200 dark:border-white/10 hidden md:block"
                >
                    <div className="w-[200px] h-full">
                       <SessionList 
                           sessions={sessions} 
                           activeId={activeSessionId} 
                           onSelect={setActiveSessionId} 
                           onNew={handleNewSession}
                           onDelete={handleDeleteSession}
                        />
                    </div>
                </motion.div>
                
                {/* Mobile Overlay Sidebar */}
                <AnimatePresence>
                    {showSidebar && (
                        <motion.div 
                            initial={{ x: -250 }}
                            animate={{ x: 0 }}
                            exit={{ x: -250 }}
                            className="absolute top-0 bottom-0 left-0 w-[250px] z-20 bg-surface-light dark:bg-surface border-r border-accent-teal/30 shadow-2xl md:hidden"
                        >
                            <div className="h-full flex flex-col pt-12"> {/* pt-12 to clear header */}
                                <SessionList 
                                    sessions={sessions} 
                                    activeId={activeSessionId} 
                                    onSelect={(id) => { setActiveSessionId(id); setShowSidebar(false); }} 
                                    onNew={handleNewSession}
                                    onDelete={handleDeleteSession}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>


                {/* Main Chat Area */}
                <div className="flex flex-col flex-1 h-full min-w-0 bg-white/50 dark:bg-black/10">
                    <MessageList messages={messages} onSuggestionClick={handleSend} />
                    <InputArea onSend={handleSend} isThinking={isThinking} />
                </div>
              </div>
            </Panel>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Aura;

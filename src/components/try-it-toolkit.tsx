"use client";

import { useState, useReducer, useEffect, useCallback } from "react";
import {
  Copy,
  History,
  Loader,
  Send,
  Trash2,
  Check,
  ChevronRight,
} from "lucide-react";
import { useInteractions } from "@/hooks/use-interactions";
import type { Interaction } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";

const PRESET_PROMPTS = [
  "Explain quantum computing in simple terms",
  "Write a short story about a robot who discovers music",
  "Summarize the plot of 'Moby Dick'",
  "Suggest three names for a new brand of coffee",
];

export function TryItToolkit() {
  const { state: interactionsState, dispatch } = useInteractions();
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isHistorySheetOpen, setIsHistorySheetOpen] = useState(false);

  const handlePresetClick = (preset: string) => {
    setPrompt(preset);
  };

  const handleClear = () => {
    setPrompt("");
    setOutput("");
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent, currentPrompt: string, preset?: string) => {
    e.preventDefault();
    if (!currentPrompt.trim() || isLoading) return;

    setIsLoading(true);
    setOutput("");

    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const mockOutput = `This is a mock response for: "${currentPrompt}". In a real application, an AI model would provide a meaningful answer here.`;
    setOutput(mockOutput);
    dispatch({
      type: "ADD_INTERACTION",
      payload: { input: currentPrompt, output: mockOutput, preset },
    });
    setIsLoading(false);
  };
  
  const restoreInteraction = (interaction: Interaction) => {
    setPrompt(interaction.input);
    setOutput(interaction.output);
    setIsHistorySheetOpen(false);
  };

  return (
    <Card className="w-full shadow-2xl shadow-primary/10">
      <CardHeader className="flex-row items-start justify-between">
        <div>
          <CardTitle className="font-headline text-2xl">Try-It Toolkit</CardTitle>
          <CardDescription>An interactive AI demo widget</CardDescription>
        </div>
        <div className="flex items-center gap-2">
           <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={handleCopy} disabled={!output}>
                        {isCopied ? <Check className="size-4 text-accent" /> : <Copy className="size-4" />}
                        <span className="sr-only">Copy Output</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Copy output</p>
                </TooltipContent>
            </Tooltip>

            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={handleClear} disabled={!prompt && !output}>
                        <Trash2 className="size-4" />
                        <span className="sr-only">Clear</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Clear input & output</p>
                </TooltipContent>
            </Tooltip>
            
            <Sheet open={isHistorySheetOpen} onOpenChange={setIsHistorySheetOpen}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <History className="size-4" />
                                <span className="sr-only">View History</span>
                            </Button>
                        </SheetTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>View history</p>
                    </TooltipContent>
                </Tooltip>
                <SheetContent className="flex flex-col">
                    <SheetHeader>
                        <SheetTitle>Interaction History</SheetTitle>
                    </SheetHeader>
                    <ScrollArea className="flex-grow">
                        <div className="space-y-4 pr-6">
                            {interactionsState.history.length > 0 ? (
                                interactionsState.history.map((interaction) => (
                                    <button key={interaction.id} onClick={() => restoreInteraction(interaction)} className="block w-full text-left">
                                    <Card className="hover:bg-secondary transition-colors">
                                        <CardContent className="p-4">
                                            <p className="text-sm font-medium truncate">{interaction.input}</p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {formatDistanceToNow(new Date(interaction.timestamp), { addSuffix: true })}
                                            </p>
                                        </CardContent>
                                    </Card>
                                    </button>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground text-center py-8">No history yet.</p>
                            )}
                        </div>
                    </ScrollArea>
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button variant="outline">Close</Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
           </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="min-h-[120px] rounded-md border bg-muted/50 p-4">
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ) : output ? (
            <p className="text-sm whitespace-pre-wrap">{output}</p>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-sm text-muted-foreground">AI output will appear here</p>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground px-1">Or try a preset...</p>
            <div className="flex flex-wrap gap-2">
                {PRESET_PROMPTS.map((p) => (
                    <Button key={p} variant="outline" size="sm" onClick={() => handlePresetClick(p)} className="text-xs sm:text-sm">
                        {p}
                        <ChevronRight className="size-3 ml-1" />
                    </Button>
                ))}
            </div>
        </div>

        <form onSubmit={(e) => handleSubmit(e, prompt)} className="relative">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here..."
            className="pr-12 min-h-[80px]"
            onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e, prompt);
                }
            }}
          />
          <Button type="submit" size="icon" className="absolute bottom-2.5 right-2.5" disabled={isLoading || !prompt.trim()}>
            {isLoading ? <Loader className="size-4 animate-spin" /> : <Send className="size-4" />}
            <span className="sr-only">Submit</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

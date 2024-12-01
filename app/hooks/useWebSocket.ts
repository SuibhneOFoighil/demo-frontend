import { useState, useEffect } from "react";
import type { FormData, LoadingStage, Paper, WebSocketMessage } from "~/types";

export function useWebSocket() {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [loadingStage, setLoadingStage] = useState<LoadingStage>("idle");
  const [papers, setPapers] = useState<Paper[]>([]);

  useEffect(() => {
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [ws]);

  const connect = (data: FormData) => {
    setLoadingStage("connecting");
    setPapers([]);

    // Simulate WebSocket connection for production
    setTimeout(() => {
      setLoadingStage("researching");
      
      // Simulate paper generation
      const totalPapers = data.numSearches * data.numPapersPerSearch;
      let paperCount = 0;

      const interval = setInterval(() => {
        if (paperCount >= totalPapers) {
          clearInterval(interval);
          setLoadingStage("completed");
          return;
        }

        const paper: Paper = {
          id: `${paperCount}`,
          title: `Research Paper ${paperCount + 1}`,
          authors: `Author Group ${paperCount + 1}`,
          year: 2020 + Math.floor(paperCount / 5),
          citations: Math.floor(Math.random() * 100),
          relevance: (Math.random() * 100).toFixed(2)
        };

        setPapers(prev => [...prev, paper]);
        paperCount++;
      }, 1000);
    }, 2000);
  };

  const disconnect = () => {
    if (ws) {
      ws.close();
    }
    setLoadingStage("canceled");
  };

  return {
    loadingStage,
    papers,
    connect,
    disconnect,
    resetState: () => {
      setLoadingStage("idle");
      setPapers([]);
    }
  };
}
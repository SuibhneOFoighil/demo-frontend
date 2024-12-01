export type LoadingStage = "idle" | "connecting" | "researching" | "completed" | "canceled";

export interface FormData {
  pdbId: string;
  numSearches: number;
  numPapersPerSearch: number;
}

export interface Paper {
  id: string;
  title: string;
  authors: string;
  year: number;
  citations: number;
  relevance: string;
}

export interface WebSocketMessage {
  type: 'stage' | 'paper';
  stage?: LoadingStage;
  id?: string;
  title?: string;
  authors?: string;
  year?: number;
  citations?: number;
  relevance?: string;
}
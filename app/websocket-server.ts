import { WebSocketServer } from 'ws';
import type { FormData } from './types';

const wss = new WebSocketServer({ port: 8080 });

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

wss.on('connection', async (ws) => {
  console.log('Client connected');

  ws.on('message', async (message) => {
    const data: FormData = JSON.parse(message.toString());
    console.log('Received:', data);

    // Simulate connecting stage
    await sleep(2000);
    ws.send(JSON.stringify({ type: 'stage', stage: 'researching' }));

    // Simulate streaming research results
    for (let i = 0; i < data.numSearches; i++) {
      for (let j = 0; j < data.numPapersPerSearch; j++) {
        await sleep(1000);
        const paper = {
          type: 'paper',
          id: `${i}-${j}`,
          title: `Research Paper ${i + 1}.${j + 1}`,
          authors: `Author ${i + 1}`,
          year: 2020 + i,
          citations: Math.floor(Math.random() * 100),
          relevance: (Math.random() * 100).toFixed(2)
        };
        ws.send(JSON.stringify(paper));
      }
    }

    // Simulate completion
    await sleep(1000);
    ws.send(JSON.stringify({ type: 'stage', stage: 'completed' }));
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
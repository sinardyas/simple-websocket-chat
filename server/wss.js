import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const data = message;
        console.log('> data | wss.js line 9', { data })

        for (const client of wss.clients) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log("WebSocket server running on ws://localhost:8080");
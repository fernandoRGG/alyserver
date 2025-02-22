const WebSocket = require('ws');
const port = process.env.PORT || 8081;  // Usa el puerto de Render o 8080 si estás en localprocess.env.PORT ||
const wss = new WebSocket.Server({ port });
let clients = [];
wss.on('connection', (ws) => {
    console.log('Nuevo cliente conectado');
    clients.push(ws);
    ws.on('message', (message) => {
        console.log('Mensaje recibido:', message);
        // Reenviar el mensaje a todos los clientes conectados
        clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
    ws.on('close', () => {
        console.log('Cliente desconectado');
        clients = clients.filter(client => client !== ws);
    });
});
console.log(`Servidor WebSocket iniciado en ws://localhost:${port}`);

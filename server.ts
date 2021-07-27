import express, { Application } from "express";
import socketIO, { Server as SocketIOServer, Socket } from "socket.io";
import { createServer, Server as HTTPServer } from "http";


export class Server {
    private httpServer: HTTPServer;
    private app: Application;
    private io: SocketIOServer;

    private readonly DEFAULT_PORT = 5300;

    constructor() {
        this.initialize();
        this.handleRoutes();
        this.handleSocketConnection();

    }
    private handleSocketConnection(): void {
        this.io.on("connection", socket => {
            console.log("Socket connected.");
        });
    }
    private handleRoutes(): void {
        this.app.get("/", (req, res) => {
            res.send(`<h1>Hello World</h1>`);
        });
    }
    private initialize(): void {
        this.app = express();
        this.httpServer = createServer(this.app);
        this.io = socketIO(this.httpServer);
    }
    public listen(callback: (port: number) => void): void {
        this.httpServer.listen(this.DEFAULT_PORT, () =>
            callback(this.DEFAULT_PORT)
        );
    }

}
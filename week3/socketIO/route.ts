import {Request, Response} from "express";

export class Routes {
    public routes(app): void {
        app.get("/", (req: Request, res: Response) => {
            res.sendFile(__dirname + "/index.html");
        })
    }
}

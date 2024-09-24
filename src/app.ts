import cors from "cors";
import express, {
  Application,
  Request,
  Response,
  json,
  urlencoded,
} from "express";
import fileUpload from "express-fileupload";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import db from "./config/database";
import { addressAuthentication } from "./middlewares/authorization.middleware";
import userRoute from "./routes/user.route";
class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.setupDB();
    this.setupRoutes();
  }

  private config(): void {
    this.app.use(morgan("dev"));
    this.app.use(json({ limit: "10mb" }));
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(urlencoded({ extended: false }));
    this.app.use(
      fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
      })
    );
    this.app.use(addressAuthentication);
  }

  private async setupDB() {
    const mongoURI = db.mongodbURI;
    mongoose
      .connect(mongoURI, {})
      .then(() => console.log("Connected to MongoDB"))
      .catch((err) => console.error("Failed to connect to MongoDB:", err));
  }

  private setupRoutes(): void {
    this.app.get("/", (request: Request, response: Response) => {
      response.send("Welcome to VOA");
    });
    this.app.use("/api/user", userRoute);
  }
}

export default new App().app;

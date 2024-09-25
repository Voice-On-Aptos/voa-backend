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
import {
  addressAuthentication,
  verifyIfUserIsInCommunity,
} from "./middlewares/authorization.middleware";
import commentRoute from "./routes/comment.route";
import communityRoute from "./routes/community.route";
import pollRoute from "./routes/poll.route";
import postRoute from "./routes/post.route";
import proposalRoute from "./routes/proposal.route";
import uploadRoute from "./routes/upload.route";
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
    this.app.use(`/api/${process.env.API_VERSION}/user`, userRoute);
    this.app.use(`/api/${process.env.API_VERSION}/community`, communityRoute);
    this.app.use(
      `/api/${process.env.API_VERSION}/post`,
      verifyIfUserIsInCommunity,
      postRoute
    );
    this.app.use(
      `/api/${process.env.API_VERSION}/proposal`,
      verifyIfUserIsInCommunity,
      proposalRoute
    );
    this.app.use(
      `/api/${process.env.API_VERSION}/poll`,
      verifyIfUserIsInCommunity,
      pollRoute
    );
    this.app.use(`/api/${process.env.API_VERSION}/comment`, commentRoute);
    this.app.use(`/api/${process.env.API_VERSION}/upload`, uploadRoute);
  }
}

export default new App().app;

import { Request } from "express";

export interface ExtendedRequest extends Request {
  address?: string;
  fileUploaded?: { url: string; id: string };
}

import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";

async function addressAuthentication(
  request: Request | any,
  response: Response,
  next: NextFunction
) {
  const address = request.header("Authorization")?.replace("Bearer ", "");
  //add address validation function
  if (!address) {
    return response.status(401).json("Unauthorized. Please a valid address");
  }
  try {
    request.address = address;
    return next();
  } catch (error: any) {
    return response.status(401).json("Invalid address");
  }
}

async function userVerification(
  request: Request | any,
  response: Response,
  next: NextFunction
) {
  const _id = request.header("Authorization")?.replace("Bearer ", "");
  //add address validation function
  if (!_id) {
    return response.status(401).json("Unauthorized. Please a valid id");
  }
  try {
    const user = await User.findById(_id);
    if (!user)
      return response.status(403).json("Missing Profile: User not found");
    request.user = user;
    return next();
  } catch (error: any) {
    return response.status(401).json("Invalid");
  }
}

export { addressAuthentication, userVerification };

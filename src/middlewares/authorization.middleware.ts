import { NextFunction, Request, Response } from "express";

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

export { addressAuthentication };

import express, { Request, Response, Router, NextFunction } from 'express';

import jwt from "jsonwebtoken";

const verifyToken = (request: Request, response: Response, next: NextFunction) => {
    const token = request.body.token || request.query.token || request.header["x-access-token"];
    console.log(request.header["x-access-token"]);
    if(!token) {
      return response.status(403).send("A token is required for authentication");
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      request.user = decoded; // user point to the object of the body
    } catch (error) {
      return response.status(401).send("Invalid Token");
    }
    return next();
};

module.exports = verifyToken;
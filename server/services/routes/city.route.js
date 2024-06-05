import { Router } from "express";
import City from "../models/city.model.js"

export const cityRoute = Router();

cityRoute.get("/", async (req, res, next) => {
    try {
      const cities = await City.find();
      return res.status(200).json(cities);
    } catch (err) {
      next(err);
    }
  });

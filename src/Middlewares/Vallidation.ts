import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const handleVallidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
export const validateMyUserRequest = [
  body("name").isString().notEmpty().withMessage("Name Must Be a String"),
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("AddressLine1 must Be a String"),
  body("country").isString().notEmpty().withMessage("Country Must Be a String"),
  body("city").isString().notEmpty().withMessage("City Must Be a String"),
  handleVallidationErrors,
];

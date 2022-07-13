import { Request, Response } from "express";
import { getReportsByDenounced, reportOwner } from "../helpers/flagHelpers";

async function getReportsByOwner(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const contact = await getReportsByDenounced(id);
    res.status(201).json(contact);
  } catch (error: any) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(404).json(error);
    } else {
      console.log("Unexpected Error", error);
    }
  }
}

async function postReport(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    const report = await reportOwner(id, reason);
    res.status(201).json(report);
  } catch (error: any) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(404).json(error);
    } else {
      console.log("Unexpected Error", error);
    }
  }
}

export { getReportsByOwner, postReport };

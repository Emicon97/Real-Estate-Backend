import flagModel, { Flag, FlagType } from "../models/flags";
import { getOwnersId } from "./propertyHelpers";

async function reportOwner(id: string, reason: string): Promise<Flag> {
  const denounced = await getOwnersId(id);
  const report: FlagType = await flagModel.create({ denounced, reason });

  const savedReport: Flag = await report.save();
  return savedReport;
}

async function getReportsByDenounced(denounced: string): Promise<Flag[]> {
  const report: Flag[] = await flagModel.find({ denounced });

  if (report.length) {
    return report;
  }

  throw new Error("No hay contactos para esta propiedad.");
}

export { reportOwner, getReportsByDenounced };

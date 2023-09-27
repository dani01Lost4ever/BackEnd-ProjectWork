import { Log, LogSchema } from "./log.model";

export class LogService {
  async newLog(ip: string, date: Date, result: string) {
    const log = new Log({
      ip: ip,
      date: date,
      result: result,
    });
    await log.save();
  }
}
export default new LogService();

export default function checkIfExpired(
  date: Date,
  completed: boolean
): boolean {
  if (!completed) {
    return date < new Date();
  }
  return false;
}

// export default function checkIfExpired(
//   date: Date,
//   completed: boolean
// ): boolean {
//   if (completed != true) {
//     const now = new Date();
//     return date.getTime() < now.getTime();
//   }
//   return false;
// }

// export default function checkIfExpired(
//   date: Date,
//   completed: boolean
// ): boolean {
//   if (completed != true) {
//     const itTime = date.toLocaleString("it-IT", { timeZone: "Europe/Rome" });
//     console.log(itTime);
//     const formatted = new Date(itTime);
//     console.log(formatted);
//     const now = new Date();
//     return formatted.getTime() < now.getTime();
//   }
//   return false;
// }
// import { utcToZonedTime, format } from "date-fns-tz";

// export default function checkIfExpired(
//   date: Date,
//   completed: boolean
// ): boolean {
//   if (!completed) {
//     const italyTimeZone = "Europe/Rome";
//     const formatStr = "yyyy/MM/dd HH:mm:ss";
//     const dateInItalian = utcToZonedTime(date, italyTimeZone);
//     const dateStringInItalian = format(dateInItalian, formatStr, {
//       timeZone: italyTimeZone,
//     });
//     const now = new Date();
//     const nowInItalian = utcToZonedTime(now, italyTimeZone);
//     const nowStringInItalian = format(nowInItalian, formatStr, {
//       timeZone: italyTimeZone,
//     });
//     return dateStringInItalian < nowStringInItalian;

//   }
//   return false;
// }

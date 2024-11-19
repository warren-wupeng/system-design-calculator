export const UNITS = {
  BYTE: 1,
  KB: 1024,
  MB: 1024 * 1024,
  GB: 1024 * 1024 * 1024,
  TB: 1024 * 1024 * 1024 * 1024,
  PB: 1024 * 1024 * 1024 * 1024 * 1024,
};

export const TIME_UNITS = {
  SECOND: 1,
  MINUTE: 60,
  HOUR: 3600,
  DAY: 86400,
  MONTH: 2592000, // 30 days
  YEAR: 31536000, // 365 days
};

export function calculateStorage(
  dataSize: number,
  unit: keyof typeof UNITS,
  quantity: number,
  timespan: number,
  timeUnit: keyof typeof TIME_UNITS,
  requestsPerUserPerDay: number, // 新增参数
  dailyActiveUserUnit: "million" | "thousand" // 新增参数
): number {
  const bytesPerItem = dataSize * UNITS[unit];
  const userMultiplier = dailyActiveUserUnit === "million" ? 1_000_000 : 1_000;
  const totalItems =
    (quantity *
      userMultiplier *
      requestsPerUserPerDay *
      (timespan * TIME_UNITS[timeUnit])) /
    TIME_UNITS.DAY; // 更新计算
  return (bytesPerItem * totalItems) / UNITS.PB; // 返回 TB
}

export function calculateThroughput(
  requestsPerSecond: number,
  dataSize: number,
  unit: keyof typeof UNITS
): number {
  return (requestsPerSecond * dataSize * UNITS[unit]) / UNITS.MB; // Return in MB/s
}

export function estimateQPS(
  users: number,
  requestsPerUser: number,
  timespan: number = 1,
  timeUnit: keyof typeof TIME_UNITS = "DAY",
  dailyActiveUserUnit: "million" | "thousand" // 新增参数
): number {
  const userMultiplier = dailyActiveUserUnit === "million" ? 1_000_000 : 1_000;
  const adjustedUsers = users * userMultiplier;
  const seconds = timespan * TIME_UNITS[timeUnit];

  return (adjustedUsers * requestsPerUser) / seconds;
}

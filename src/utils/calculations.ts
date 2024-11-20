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

export interface PowerOf2Result {
  power: number;
  approximateValue: string;
  fullName: string;
  shortName: string;
}

export function powerOf2Conversion(power: number): PowerOf2Result {
  const mapping: {
    [key: number]: { approximate: string; full: string; short: string };
  } = {
    10: { approximate: "1 Thousand", full: "1 Kilobyte", short: "1 KB" },
    20: { approximate: "1 Million", full: "1 Megabyte", short: "1 MB" },
    30: { approximate: "1 Billion", full: "1 Gigabyte", short: "1 GB" },
    40: { approximate: "1 Trillion", full: "1 Terabyte", short: "1 TB" },
    50: { approximate: "1 Quadrillion", full: "1 Petabyte", short: "1 PB" },
  };

  const result = mapping[power];
  if (!result) {
    throw new Error(
      "Unsupported power value. Allowed values are 10, 20, 30, 40, 50."
    );
  }

  return {
    power,
    approximateValue: result.approximate,
    fullName: result.full,
    shortName: result.short,
  };
}

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

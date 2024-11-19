import React, { useState } from "react";
import {
  calculateStorage,
  calculateThroughput,
  estimateQPS,
  UNITS,
  TIME_UNITS,
} from "../utils/calculations";
import { StorageCalculator } from "./StorageCalculator";
import { ThroughputCalculator } from "./ThroughputCalculator";
import { QPSCalculator } from "./QPSCalculator";

function Calculator() {
  const [calculationType, setCalculationType] = useState<
    "storage" | "throughput" | "qps"
  >("storage");
  const [result, setResult] = useState<number | null>(null);

  const [storageInputs, setStorageInputs] = useState({
    dataSize: 1,
    unit: "KB" as keyof typeof UNITS,
    quantity: 150,
    timespan: 1,
    timeUnit: "DAY" as keyof typeof TIME_UNITS,
    requestsPerUserPerDay: 10, // 新增字段
    dailyActiveUserUnit: "million" as "million" | "thousand", // 新增字段
  });

  const [throughputInputs, setThroughputInputs] = useState({
    requestsPerSecond: 100,
    dataSize: 1,
    unit: "KB" as keyof typeof UNITS,
  });

  const [qpsInputs, setQpsInputs] = useState({
    users: 1000,
    requestsPerUser: 10,
    timespan: 1,
    timeUnit: "DAY" as keyof typeof TIME_UNITS,
    dailyActiveUserUnit: "million" as "million" | "thousand", // 新增字段
  });

  const calculateResult = () => {
    switch (calculationType) {
      case "storage":
        const storageResult = calculateStorage(
          storageInputs.dataSize,
          storageInputs.unit,
          storageInputs.quantity,
          storageInputs.timespan,
          storageInputs.timeUnit,
          storageInputs.requestsPerUserPerDay,
          storageInputs.dailyActiveUserUnit // 传入新参数
        );
        setResult(Number(storageResult.toFixed(2)));
        break;

      case "throughput":
        const throughputResult = calculateThroughput(
          throughputInputs.requestsPerSecond,
          throughputInputs.dataSize,
          throughputInputs.unit
        );
        setResult(Number(throughputResult.toFixed(2)));
        break;

      case "qps":
        const qpsResult = estimateQPS(
          qpsInputs.users,
          qpsInputs.requestsPerUser,
          qpsInputs.timespan,
          qpsInputs.timeUnit,
          qpsInputs.dailyActiveUserUnit // 传入新参数
        );
        setResult(Number(qpsResult.toFixed(2)));
        break;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">System Design Calculator</h1>

      <div className="mb-6">
        <select
          className="w-full p-2 border rounded"
          value={calculationType}
          onChange={(e) => {
            setCalculationType(e.target.value as any);
            setResult(null);
          }}
        >
          <option value="storage">Storage Estimation</option>
          <option value="throughput">Throughput Calculation</option>
          <option value="qps">QPS Estimation</option>
        </select>
      </div>

      {calculationType === "storage" && (
        <StorageCalculator
          inputs={storageInputs}
          setInputs={setStorageInputs}
        />
      )}

      {calculationType === "throughput" && (
        <ThroughputCalculator
          inputs={throughputInputs}
          setInputs={setThroughputInputs}
        />
      )}

      {calculationType === "qps" && (
        <QPSCalculator inputs={qpsInputs} setInputs={setQpsInputs} />
      )}

      <button
        className="w-full mt-6 bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
        onClick={calculateResult}
      >
        Calculate
      </button>

      {result !== null && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h2 className="text-xl font-semibold mb-2">Result:</h2>
          <p className="text-lg">
            {calculationType === "storage" && `${result} PB`}
            {calculationType === "throughput" && `${result} MB/s`}
            {calculationType === "qps" && `${result} requests/second`}
          </p>
        </div>
      )}
    </div>
  );
}

export default Calculator;

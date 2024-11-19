import React from "react";
import { UNITS, TIME_UNITS } from "../utils/calculations";

interface StorageCalculatorProps {
  inputs: {
    dataSize: number;
    unit: keyof typeof UNITS;
    quantity: number;
    timespan: number;
    timeUnit: keyof typeof TIME_UNITS;
    requestsPerUserPerDay: number;
    dailyActiveUserUnit: "million" | "thousand";
  };
  setInputs: (inputs: any) => void;
}

export function StorageCalculator({
  inputs,
  setInputs,
}: StorageCalculatorProps) {
  return (
    <div className="space-y-4">
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <p className="text-sm text-blue-800">
          Storage = Daily Active Users × Requests per Day × Data Size per
          Request × Retention Period
        </p>
      </div>
      <div>
        <label className="block mb-2">Daily Active Users</label>
        <div className="flex gap-2">
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={inputs.quantity}
            onChange={(e) =>
              setInputs({ ...inputs, quantity: Number(e.target.value) })
            }
          />
          <select
            className="w-32 p-2 border rounded"
            value={inputs.dailyActiveUserUnit}
            onChange={(e) =>
              setInputs({
                ...inputs,
                dailyActiveUserUnit: e.target.value as "million" | "thousand",
              })
            }
          >
            <option value="million">Million</option>
            <option value="thousand">Thousand</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block mb-2">Requests per User per Day</label>
        <input
          type="number"
          className="w-full p-2 border rounded"
          value={inputs.requestsPerUserPerDay}
          onChange={(e) =>
            setInputs({
              ...inputs,
              requestsPerUserPerDay: Number(e.target.value),
            })
          }
        />
      </div>
      <div>
        <label className="block mb-2">Data Size per Request</label>
        <div className="flex gap-2">
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={inputs.dataSize}
            onChange={(e) =>
              setInputs({ ...inputs, dataSize: Number(e.target.value) })
            }
          />
          <select
            className="w-32 p-2 border rounded"
            value={inputs.unit}
            onChange={(e) =>
              setInputs({
                ...inputs,
                unit: e.target.value as keyof typeof UNITS,
              })
            }
          >
            {Object.keys(UNITS).map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block mb-2">Retention Period</label>
        <div className="flex gap-2">
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={inputs.timespan}
            onChange={(e) =>
              setInputs({ ...inputs, timespan: Number(e.target.value) })
            }
          />
          <select
            className="w-32 p-2 border rounded"
            value={inputs.timeUnit}
            onChange={(e) =>
              setInputs({
                ...inputs,
                timeUnit: e.target.value as keyof typeof TIME_UNITS,
              })
            }
          >
            {Object.keys(TIME_UNITS).map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

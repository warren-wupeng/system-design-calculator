import React from "react";
import { TIME_UNITS } from "../utils/calculations";

interface QPSCalculatorProps {
  inputs: {
    users: number;
    requestsPerUser: number;
    timespan: number;
    timeUnit: keyof typeof TIME_UNITS;
    dailyActiveUserUnit: "million" | "thousand";
  };
  setInputs: (inputs: any) => void;
}

export function QPSCalculator({ inputs, setInputs }: QPSCalculatorProps) {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="users" className="block mb-2 text-gray-900">
          Daily Active Users
        </label>
        <div className="flex gap-2">
          <input
            id="users"
            type="number"
            className="w-full p-2 border rounded"
            value={inputs.users}
            onChange={(e) =>
              setInputs({ ...inputs, users: Number(e.target.value) })
            }
          />
          <label htmlFor="qpsDailyActiveUserUnit" className="sr-only">
            User Unit
          </label>
          <select
            id="qpsDailyActiveUserUnit"
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
        <label htmlFor="requestsPerUser" className="block mb-2 text-gray-900">
          Requests per User
        </label>
        <input
          id="requestsPerUser"
          type="number"
          className="w-full p-2 border rounded"
          value={inputs.requestsPerUser}
          onChange={(e) =>
            setInputs({ ...inputs, requestsPerUser: Number(e.target.value) })
          }
        />
      </div>

      <div>
        <label htmlFor="timespan" className="block mb-2 text-gray-900">
          Time Period
        </label>
        <div className="flex gap-2">
          <input
            id="timespan"
            type="number"
            className="w-full p-2 border rounded"
            value={inputs.timespan}
            onChange={(e) =>
              setInputs({ ...inputs, timespan: Number(e.target.value) })
            }
          />
          <label htmlFor="timeUnit" className="sr-only">
            Time Unit
          </label>
          <select
            id="timeUnit"
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

import React, { useState } from "react";
import { powerOf2Conversion, PowerOf2Result } from "../utils/calculations";

export function PowerOf2Calculator() {
  const [power, setPower] = useState<number>(10);
  const [result, setResult] = useState<PowerOf2Result | null>(null);

  const handleCalculate = () => {
    try {
      const conversionResult = powerOf2Conversion(power);
      setResult(conversionResult);
    } catch (error) {
      alert((error as Error).message);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="powerOf2" className="block mb-2">
          Power of 2
        </label>
        <select
          id="powerOf2"
          className="w-full p-2 border rounded"
          value={power}
          onChange={(e) => setPower(Number(e.target.value))}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={40}>40</option>
          <option value={50}>50</option>
        </select>
      </div>

      <button
        className="w-full bg-green-700 text-white p-2 rounded hover:bg-green-800"
        onClick={handleCalculate}
      >
        Convert
      </button>

      {result && (
        <div className="mt-4 p-4 bg-gray-200 rounded">
          <h3 className="text-xl font-semibold mb-2 text-gray-900">
            Conversion Result:
          </h3>
          <p className="text-gray-800">Power: {result.power}</p>
          <p className="text-gray-800">
            Approximate Value: {result.approximateValue}
          </p>
          <p className="text-gray-800">Full Name: {result.fullName}</p>
          <p className="text-gray-800">Short Name: {result.shortName}</p>
        </div>
      )}
    </div>
  );
}

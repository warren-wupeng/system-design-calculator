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
        <label className="block mb-2">Power of 2</label>
        <select
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
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        onClick={handleCalculate}
      >
        Convert
      </button>

      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="text-xl font-semibold mb-2">Conversion Result:</h3>
          <p>Power: {result.power}</p>
          <p>Approximate Value: {result.approximateValue}</p>
          <p>Full Name: {result.fullName}</p>
          <p>Full Name: {result.fullName}</p>
          <p>Short Name: {result.shortName}</p>
        </div>
      )}
    </div>
  );
}

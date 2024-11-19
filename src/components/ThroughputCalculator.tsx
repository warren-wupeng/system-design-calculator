import React from 'react';
import { UNITS } from '../utils/calculations';

interface ThroughputCalculatorProps {
  inputs: {
    requestsPerSecond: number;
    dataSize: number;
    unit: keyof typeof UNITS;
  };
  setInputs: (inputs: any) => void;
}

export function ThroughputCalculator({ inputs, setInputs }: ThroughputCalculatorProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block mb-2">Requests per Second</label>
        <input
          type="number"
          className="w-full p-2 border rounded"
          value={inputs.requestsPerSecond}
          onChange={(e) => setInputs({...inputs, requestsPerSecond: Number(e.target.value)})}
        />
      </div>

      <div>
        <label className="block mb-2">Data Size per Request</label>
        <div className="flex gap-2">
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={inputs.dataSize}
            onChange={(e) => setInputs({...inputs, dataSize: Number(e.target.value)})}
          />
          <select
            className="w-32 p-2 border rounded"
            value={inputs.unit}
            onChange={(e) => setInputs({...inputs, unit: e.target.value as keyof typeof UNITS})}
          >
            {Object.keys(UNITS).map(unit => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
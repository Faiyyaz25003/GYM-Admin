'use client';
import React, { useState } from 'react';

export default function CalculatorPage() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState('0'); // default sample value
  const [status, setStatus] = useState(''); // default sample status

  const calculateBMI = () => {
    if (!height || !weight) return;
    const h = height / 100;
    const calculatedBmi = (weight / (h * h)).toFixed(1);
    setBmi(calculatedBmi);

    if (calculatedBmi < 18.5) setStatus('Underweight');
    else if (calculatedBmi < 25) setStatus('Healthy');
    else if (calculatedBmi < 30) setStatus('Overweight');
    else setStatus('Obese');
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6 md:p-5">
      <div className="mb-10">
        <h2 className="text-orange-500 font-semibold text-sm uppercase mb-2">Check Your Body</h2>
        <h1 className="text-4xl font-bold">BMI Calculator</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* BMI Chart */}
        <div className="w-full border border-gray-300 rounded-md shadow-sm">
          <div className="bg-gray-100 p-4 font-semibold grid grid-cols-2 border-b border-gray-300">
            <span>BMI</span>
            <span>Weight Status</span>
          </div>
          {[
            { bmi: 'Below 18.5', status: 'Underweight' },
            { bmi: '18.5 - 24.9', status: 'Healthy' },
            { bmi: '25.0 - 29.9', status: 'Overweight' },
            { bmi: '30.0 and Above', status: 'Obese' }
          ].map((item, i) => (
            <div key={i} className="grid grid-cols-2 p-4 border-b border-gray-200 hover:bg-gray-50">
              <span>{item.bmi}</span>
              <span>{item.status}</span>
            </div>
          ))}
        </div>

        {/* BMI Calculator */}
        <div className="border border-gray-300 rounded-md shadow-sm p-6">
          <h2 className="text-orange-500 font-semibold text-sm uppercase mb-2">Check Your Body</h2>
          <h1 className="text-2xl font-bold mb-4">Calculate Your BMI</h1>
          <p className="text-gray-600 mb-6">
            Enter your height, weight, age and sex to calculate your Body Mass Index and know your health status.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input
              type="number"
              placeholder="Height / cm"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="p-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="number"
              placeholder="Weight / kg"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="p-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="number"
              placeholder="Age"
              className="p-3 bg-gray-100 border border-gray-300 rounded-md"
            />
            <select className="p-3 bg-gray-100 border border-gray-300 rounded-md">
              <option value="">Sex</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <button
            onClick={calculateBMI}
            className="w-full mt-2 bg-orange-500 text-white font-semibold py-3 rounded-md hover:bg-orange-600 transition"
          >
            CALCULATE
          </button>

          {bmi && (
            <div className="mt-6 p-4 bg-orange-100 border border-orange-300 text-orange-800 rounded-md">
              <h3 className="text-lg font-semibold mb-2">
                Your BMI: <span className="text-orange-600">{bmi}</span>
              </h3>
              <p>
                You are categorized as: <strong>{status}</strong>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

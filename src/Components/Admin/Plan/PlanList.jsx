
'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import PlanCard from "./PlanCard";

export default function PlanList() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/plans");
        setPlans(res.data);
      } catch (err) {
        console.error("Error fetching plans:", err);
      }
    };
    fetchPlans();
  }, []);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <PlanCard key={plan._id} plan={plan} />
      ))}
    </div>
  );
}
  
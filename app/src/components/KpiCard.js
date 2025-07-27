import React from 'react';

export default function KpiCard({ label, value }) {
  return (
    <div className="card">
      <h3>{label}</h3>
      <p>{value}</p>
    </div>
  );
}
import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

export default function StatusPie({ apps }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const counts = apps.reduce((acc, a) => {
      acc[a.status] = (acc[a.status] || 0) + 1;
      return acc;
    }, {});
    const labels = Object.keys(counts);
    const data = Object.values(counts);

    const ctx = canvasRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: { labels, datasets: [{ data }] },
      options: { responsive: true }
    });
  }, [apps]);

  return <canvas ref={canvasRef} />;
}
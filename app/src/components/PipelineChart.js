import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

export default function PipelineChart({ data }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Applied', 'Responses', 'Interviews', 'Offers'],
        datasets: [{
          label: 'Pipeline',
          data: [data.applied, data.responses, data.interviews, data.offers]
        }]
      },
      options: { responsive: true }
    });
  }, [data]);

  return <canvas ref={canvasRef} />;
}
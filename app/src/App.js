import React, { useEffect, useState } from 'react';
import './styles.css';
import KpiCard from './components/KpiCard';
import PipelineChart from './components/PipelineChart';
import StatusPie from './components/StatusPie';
import ApplicationTable from './components/ApplicationTable';
import { fetchData } from './api';

function App() {
  const [data, setData] = useState({ kpi: {}, apps: [] });

  useEffect(() => {
    fetchData(process.env.REACT_APP_DATA_ENDPOINT || 'public/data/data.json')
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <div className="App">
      <h1>Clinical Dashboard</h1>
      <div className="grid cards">
        <KpiCard label="Applied" value={data.kpi.applied} />
        <KpiCard label="Responses" value={data.kpi.responses} />
        <KpiCard label="Interviews" value={data.kpi.interviews} />
        <KpiCard label="Offers" value={data.kpi.offers} />
      </div>
      <section>
        <h2>Pipeline</h2>
        <PipelineChart data={data.kpi} />
      </section>
      <section>
        <h2>Status Distribution</h2>
        <StatusPie apps={data.apps} />
      </section>
      <section>
        <h2>Applications</h2>
        <ApplicationTable apps={data.apps} />
      </section>
    </div>
  );
}

export default App;
import React from 'react';

export default function ApplicationTable({ apps }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th><th>Company</th><th>Role</th><th>Status</th><th>Follow-up</th><th>Keywords</th>
        </tr>
      </thead>
      <tbody>
        {apps.map((r, i) => (
          <tr key={i}>
            <td>{r.date}</td>
            <td>{r.company}</td>
            <td>{r.role}</td>
            <td>{r.status}</td>
            <td>{r.fup}</td>
            <td>{r.kw.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
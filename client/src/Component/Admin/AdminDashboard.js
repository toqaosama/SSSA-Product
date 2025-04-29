import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
// import Sidebar from './Sidebar';
import './AdminSetting/Style/Dashboard.css'; // Create this CSS file for styling

Chart.register(...registerables);

const Dashboard = () => {
  // Sample data for stats blocks
  const [stats, setStats] = useState([
    { title: 'Total Visits', value: '12,345', change: '+12%', trend: 'up' },
    { title: 'Active Users', value: '1,234', change: '+5%', trend: 'up' },
    { title: 'Page Views', value: '45,678', change: '-3%', trend: 'down' },
    { title: 'Avg. Session', value: '4m 23s', change: '+8%', trend: 'up' }
  ]);

  // Graph data
  const [graphData, setGraphData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Website Interactions',
        data: [1250, 1900, 2100, 2800, 1900, 2300],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        tension: 0.4
      }
    ]
  });

  // Admin activity log
  const [activityLog, setActivityLog] = useState([
    { id: 1, email: 'admin@example.com', action: 'Updated product pricing', timestamp: '2023-05-15 14:30' },
    { id: 2, email: 'superadmin@example.com', action: 'Deleted user #4521', timestamp: '2023-05-15 11:15' },
    { id: 3, email: 'admin@example.com', action: 'Added new product', timestamp: '2023-05-14 09:45' },
    { id: 4, email: 'moderator@example.com', action: 'Edited homepage content', timestamp: '2023-05-13 16:20' }
  ]);

  // Fetch real data in a real application
  useEffect(() => {
    // You would typically fetch this data from your API
    // fetchDashboardData().then(data => {
    //   setStats(data.stats);
    //   setGraphData(data.graphData);
    //   setActivityLog(data.activityLog);
    // });
  }, []);

  return (
    <div className='admin-dashboard-container'>
      {/* <Sidebar /> */}
      
      <div className="dashboard-content">
        <h1>Admin Dashboard</h1>
        
        {/* Stats Blocks */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <h3>{stat.title}</h3>
              <div className="stat-value">{stat.value}</div>
              <div className={`stat-change ${stat.trend}`}>
                {stat.change} {stat.trend === 'up' ? '↑' : '↓'}
              </div>
            </div>
          ))}
        </div>

        {/* Interaction Graph */}
        <div className="graph-container">
          <h2>Website Interactions</h2>
          <div className="graph-wrapper">
            <Line
              data={graphData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Admin Activity Log */}
        <div className="activity-log">
          <h2>Admin Activity History</h2>
          <table>
            <thead>
              <tr>
                <th>Admin Email</th>
                <th>Action</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {activityLog.map(log => (
                <tr key={log.id}>
                  <td>{log.email}</td>
                  <td>{log.action}</td>
                  <td>{log.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
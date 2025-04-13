import React, { useEffect, useState } from "react";
import { RadialBarChart, RadialBar, Legend, Tooltip } from "recharts";
import { Col } from "react-bootstrap";

const TeamEfficiency = () => {
  const [productivityData, setProductivityData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/teamproductivity")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProductivityData(data[0]);
        } else {
          console.error("No valid data received");
        }
      })
      .catch((error) => console.error("Error fetching team productivity data", error));
  }, []);

  if (!productivityData) {
    return <p>Loading data...</p>;
  }

  const chartData = [
    { name: "Efficiency", value: productivityData.teamEfficiency, fill: "#8884d8" },
    { name: "Attendance", value: productivityData.attendanceRate, fill: "#82ca9d" },
    { name: "Tasks Completed", value: productivityData.totalTasksCompleted / 10, fill: "#ffc658" },
  ];

  return (
    
     
      <Col md={6} sm={12}>
        <h5>
              Team Productivity Overview
        </h5>
        <RadialBarChart
          width={400} 
          height={350}
          cx="50%"
          cy="50%"
          innerRadius="20%"
          outerRadius="90%"
          barSize={15}
          data={chartData}
        >
          <RadialBar minAngle={40} background clockWise dataKey="value" />
          <Legend iconSize={20} layout="horizontal" verticalAlign="bottom" align="center" />
          <Tooltip />
        </RadialBarChart>
      </Col>
    
  );
};

export default TeamEfficiency;

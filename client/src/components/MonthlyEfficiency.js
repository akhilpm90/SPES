import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Col } from "react-bootstrap";
const MonthlyEfficiency = () => {
    const [efficiencyData, setEfficiencyData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/teamproductivity/monthly-efficiency") 
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched Data:", data);
                if (Array.isArray(data)) {
                    console.log(data)
                    setEfficiencyData(data);
                } else {
                    console.error("Invalid data format");
                }
            })
            .catch((error) => console.error("Error fetching monthly efficiency data", error));
    }, []); 

    if (efficiencyData.length === 0) {
        return <p>Loading data...</p>;
    }
    
  return (
    
            <Col sm={12} md={6}>
                <h5 className="text-center">Monthly Team Efficiency</h5>
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={efficiencyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="month" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Line type="monotone" dataKey="efficiency" stroke="#8884d8" strokeWidth={3} dot={{ r: 5 }} />
                    </LineChart>
                </ResponsiveContainer>
            </Col>
        
  )
}

export default MonthlyEfficiency;
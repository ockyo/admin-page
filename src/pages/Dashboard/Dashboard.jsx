import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import ActionService from "../../services/ActionService/ActionServices";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F"];

const Home = () => {
  const { name } = useAuth();
  const [data, setData] = useState({ TotalUser: 0, TotalAction: 0 });

  const fetchDataDashboard = async () => {
    try {
      const info = await ActionService.getInfoDashboar();
      setData(info);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataDashboard();
  }, []);

  const chartData = [
    { name: "Users", value: data.totalUser },
    { name: "Actions", value: data.totalAction },
  ];
  return (
    <div className="flex flex-col items-center p-10 min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Hi, {name}!</h1>
      <p className="text-xl text-gray-400 mb-6">Welcome to web control Action APP.</p>

      <div className="flex justify-center w-full max-w-5xl bg-gray-800 p-10 rounded-lg shadow-lg">
        <ResponsiveContainer width="100%" height={600}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={140}
              outerRadius={250}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              stroke="none" // XÓA VIỀN ĐEN
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};


export default Home;

import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart(props) {
  let loading = props.loadingChart;
  let checkerData = props.checkerData;

  let dataPT = props.dataCoin.prices?.map((time) => {
    let date = new Date(time[0]);
    return (
      date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes()
    );
  });

  let dataP = props.dataCoin.prices?.map((market) => {
    return market[1];
  });

  const [database, setDatabase] = useState(dataP);
  const [databaseTime, setDatabaseTime] = useState(dataPT);
  const [labelInChart, setLabelInChart] = useState("Precio");

  let uploadData = () => {
    setDatabaseTime(
      props.dataCoin.prices.map((time) => {
        let date = new Date(time[0]);
        return (
          date.getDate() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getFullYear() +
          " " +
          date.getHours() +
          ":" +
          date.getMinutes()
        );
      })
    );

    if (checkerData === "precio") {
      setDatabase(dataP);
      setLabelInChart("Precio");
    } else if (checkerData === "mercado") {
      let dataM = props.dataCoin.market_caps.map((market) => {
        return market[1];
      });
      setDatabase(dataM);
      setLabelInChart("Mercado capitalizado");
    } else if (checkerData === "volume") {
      let dataV = props.dataCoin.total_volumes.map((volumen) => {
        return volumen[1];
      });
      setDatabase(dataV);
      setLabelInChart("Volumen en mercado");
    }
  };

  useEffect(() => {
    uploadData();
  }, [checkerData]);

  useEffect(() => {
    uploadData();
  }, [loading]);

  return (
    <div>
      <Line
        data={{
          labels: databaseTime,
          datasets: [
            {
              label: labelInChart,
              backgroundColor: [
                database[0] > database[database?.length - 1]
                  ? "#dc2626"
                  : "rgba(40,255,51,1)",
              ],
              data: database,
              borderWidth: 1.5,
              borderColor: [
                database[0] > database[database?.length - 1]
                  ? "#dc2626"
                  : "rgba(40,255,51,1)",
              ],
            },
          ],
        }}
        height={400}
        width={1000}
        options={{
          scales: {
            xAxis: {
              grid: {
                color: "rgba(255,255,255,0.3)",
              },
            },
            yAxis: {
              grid: {
                color: "rgba(255,255,255,0.3)",
              },
            },
          },
          maintainAspectRatio: false,
          elements: {
            point: {
              radius: 0,
            },
          },
          plugins: {
            legend: {
              labels: {
                color: "rgba(255,255,255,1)",
              },
            },
            title: {
              color: "rgba(255,255,255,1)",
              display: true,
              text:
                `${props.name.charAt(0).toUpperCase()}` +
                `${props.name.slice(1)}`,
            },
          },
        }}
      />
    </div>
  );
}
export default LineChart;

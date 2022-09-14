import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

const labels = ['a', 'b', 'c'];

export const data = {
  labels,
  datasets: [
    {
      type: 'bar',
      label: 'הציונים שלי',
      backgroundColor: 'rgb(75, 192, 192)',
      data: [9,8,10],
      borderColor: 'white',
      borderWidth: 2,
    },
    {
      type: 'bar' ,
      label: 'הממוצע בגילי',
      backgroundColor: 'rgb(53, 162, 235)',
      data: [8, 9, 10],
    },
  ],
};

export function Graph() {
  return <Chart type='bar' data={data} />;
}

import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { selectOrderHistory } from '../../redux/Slice/orderSlice';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Order Status Bar Chart',
      
    },
  },
};

const Chart = () => {
  const orders = useSelector(selectOrderHistory);
  let arr: string[] = [];
  orders?.map((item: any) => arr.push(item.orderStatus));

  const [s1, s2, s3, s4] = ["Order Placed", "Processing", "Shipped", "Delivered"];
  const getOrderStatusCount = (arr: string[] | undefined, val: string) => {
    return arr?.filter((item) => item === val).length
  }

  const placed = getOrderStatusCount(arr, s1);
  const shipped= getOrderStatusCount(arr, s3);
  const delivered = getOrderStatusCount(arr, s4);
  const processing = getOrderStatusCount(arr, s2);


  const data = {
    labels: ["Placed Order", "Processing", "Shipped", "Delivered"],
    datasets: [
      {
        label: 'Order Count',
        data: [placed, processing, shipped, delivered],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

  
  return (
    <div><Bar options={options} data={data} /></div>
  )
}

export default Chart
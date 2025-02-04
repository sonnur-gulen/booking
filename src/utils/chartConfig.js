import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const getLineColor = (index, alpha = 1) => {
  const colors = [
    `rgba(255, 99, 132, ${alpha})`,   
    `rgba(54, 162, 235, ${alpha})`,    
    `rgba(255, 206, 86, ${alpha})`,    
    `rgba(75, 192, 192, ${alpha})`,    
    `rgba(153, 102, 255, ${alpha})`,   
    `rgba(255, 159, 64, ${alpha})`,    
    `rgba(199, 199, 199, ${alpha})`,   
    `rgba(83, 102, 255, ${alpha})`,    
    `rgba(255, 99, 255, ${alpha})`,    
    `rgba(99, 255, 132, ${alpha})`,    
    `rgba(255, 178, 102, ${alpha})`    
  ];
  return colors[index % colors.length];
};
  
  export const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { boxWidth: 20, padding: 20 }
      },
      title: {
        display: true,
        text: 'Aylık Check-in Dağılımı (2014-2024)',
        padding: { top: 10, bottom: 30 }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
        title: { display: true, text: 'Check-in Sayısı' }
      },
      x: {
        title: { display: true, text: 'Aylar' }
      }
    }
  };
  
  export const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: { boxWidth: 20, padding: 20 }
      },
      title: {
        display: true,
        text: 'Yıllara Göre Check-in Dağılımı (%)',
        padding: { top: 10, bottom: 30 }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.parsed} check-in`;
          }
        }
      }
    }
  };
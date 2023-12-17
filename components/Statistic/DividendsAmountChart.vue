<template>
  <canvas ref="monthlyDividendsCanvas"></canvas>
</template>
<script setup>
import Chart from "chart.js/auto";

const props = defineProps({
  periodStatisticData: {
    type: Array,
    required: false,
    default: []
  },
  chartTitle: {
    type: String,
    required: false,
    default: ''
  }
});

watch(() => props.periodStatisticData, () => {
  drawChart(props.periodStatisticData);
});

onMounted(() => {
  initChart();
  drawChart(props.periodStatisticData);
});

const monthlyDividendsCanvas = ref(null);
let monthlyDividendsChart = null;

const initChart = (labels = [], data = []) => {
  monthlyDividendsChart = new Chart(
      monthlyDividendsCanvas.value,
      {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Total amount',
              data: data
            },
            {
              label: 'Taxes',
              data: data
            },
            {
              label: 'Amount after taxes',
              data: data
            }
          ]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: props.chartTitle
            }
          },
          scales: {
            y: {
              ticks: {
                callback: function(value, index, ticks) {
                  return value + ' Eur';
                }
              }
            }
          }
        }
      }
  );
}

const drawChart = (data) => {
  const chartData = prepareMonthlyDividendsChartData(data);
  monthlyDividendsChart.data.datasets[0].data = chartData.amountData;
  monthlyDividendsChart.data.datasets[1].data = chartData.taxesAmountData;
  monthlyDividendsChart.data.datasets[2].data = chartData.amountAfterTaxesData;
  monthlyDividendsChart.data.labels = chartData.labels;
  monthlyDividendsChart.update();
}

const prepareMonthlyDividendsChartData = (chartData) => {
  const labels = [];
  const amountData = [];
  const taxesAmountData = [];
  const amountAfterTaxesData = [];

  Object.keys(chartData).forEach((key) => {
    labels.push(chartData[key].label);
    amountData.push(chartData[key].amount);
    taxesAmountData.push(chartData[key].taxes_amount);
    amountAfterTaxesData.push(chartData[key].amount_after_taxes);
  });

  return {labels, amountData, taxesAmountData, amountAfterTaxesData};
}
</script>

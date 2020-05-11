<script>
import { Line } from 'vue-chartjs';

export default {
  name: 'ActivityChart',
  extends: Line,

  props: ['data', 'labels'],

  data() {
    return {
      bgColor: undefined,
      options: {
        responsive: true,
        aspectRatio: 0.5,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
        elements: {
          point: {
            radius: 0,
          },
        },

        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
              ticks: {
                display: true,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
      },
    };
  },

  computed: {
    chartData() {
      return {
        labels: this.labels,
        datasets: [
          {
            fill: 'start',
            backgroundColor: this.bgColor,
            borderColor: 'rgba(50, 115, 220, 1)',
            borderWidth: '3',
            data: this.data,
          },
        ],
      };
    },
  },

  methods: {
    renderLineChart() {
      var ctx = this.$refs.canvas.getContext('2d');
      var gradient = ctx.createLinearGradient(0, 0, 0, 200);
      gradient.addColorStop(0, '#CDE3F8');
      gradient.addColorStop(0.8, '#eef6fd');
      gradient.addColorStop(1, '#FEFFFF');

      this.chartData.datasets[0].backgroundColor = gradient;
      this.renderChart(this.chartData, this.options);
    },
  },

  mounted() {
    this.renderLineChart();
  },

  watch: {
    data: function() {
      this.renderLineChart();
    },
  },
};
</script>

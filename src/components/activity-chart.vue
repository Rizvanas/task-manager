<script>
import { Line } from 'vue-chartjs';

export default {
  name: 'ActivityChart',
  extends: Line,

  data() {
    return {
      bgColor: undefined,
      chartData: {
        labels: [
          '2020-04-01',
          '2020-04-02',
          '2020-04-03',
          '2020-04-04',
          '2020-04-05',
          '2020-04-06',
          '2020-04-07',
          '2020-04-08',
          '2020-04-09',
          '2020-04-10',
          '2020-04-11',
          '2020-04-12',
          '2020-04-13',
        ],
        datasets: [
          {
            fill: 'start',
            backgroundColor: this.bgColor,
            // backgroundColor: this.gradient,
            borderColor: 'rgba(50, 115, 220, 1)',
            borderWidth: '3',
            data: [8, 12, 9, 10, 2, 19, 3, 10, 3, 10, 10, 10, 10],
          },
        ],
      },
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
                display: false,
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

  mounted() {
    var ctx = this.$refs.canvas.getContext('2d');
    var gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, '#CDE3F8');
    gradient.addColorStop(0.8, '#eef6fd');
    gradient.addColorStop(1, '#FEFFFF');

    this.chartData.datasets[0].backgroundColor = gradient;
    this.renderChart(this.chartData, this.options);
  },
};
</script>

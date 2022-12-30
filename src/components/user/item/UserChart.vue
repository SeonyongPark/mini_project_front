<template>
    <LineChartGenerator
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    />
  </template>
  
  <script>
import { Line as LineChartGenerator } from 'vue-chartjs/legacy';
import http from "@/api/http.js";

import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    CategoryScale,
    PointElement
} from 'chart.js';
  
  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    CategoryScale,
    PointElement
  )
  
  export default {
    name: 'LineChart',
    components: {
      LineChartGenerator
    },
    props: {
        aptCode:String,
      chartId: {
        type: String,
        default: 'line-chart'
      },
      datasetIdKey: {
        type: String,
        default: 'label'
      },
      width: {
        type: Number,
        default: 400
      },
      height: {
        type: Number,
        default: 400
      },
      cssClasses: {
        default: '',
        type: String
      },
      styles: {
        type: Object,
        default: () => {}
      },
      plugins: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        chartData: {
          labels: [],
          datasets: [
            {
              label: '거래가 추이',
              backgroundColor: '#f87979',
              data: [],
            }
          ]
        },
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    mounted() {
        this.init();
    },  
    methods: {
        init() {
            console.log("userChart aptCode");
            console.log(this.aptCode);
            http.get(`/aparts/history/${this.aptCode}`)
                .then(({ data }) => {
                    console.log(data);
                    console.log(data.list);
                    if (data.msg == "success") {
                        console.log("차트 데이터 불러오기 완료");
                        console.log(data.list[0]);

                        for (let chart in data.list) {

                            // console.log("완료" + data.list[parseInt(chart)].date);
                            // console.log("완료" + data.list[parseInt(chart)].dealAmount);

                            this.chartData.labels.push(data.list[parseInt(chart)].date);
                            this.chartData.datasets[0].data.push(data.list[parseInt(chart)].dealAmount);
                        }
                    }
                }
                )
        },
    },
    watch: {
    aptCode() {
      // this.deleteMap();
            this.chartData.labels = [];
            this.chartData.datasets[0].data = [];
      this.init();
    }
  },
  }
  </script>
  

<style scoped>

</style>
<template>
  <div style="padding-left: 60px;padding-right: 60px;">
    <el-row :gutter="30">
      <el-col :span="12">
        <div style="margin-bottom: 10px">Query in Single Mode</div>
        <div id="querySingleContainer"></div>
        <div style="margin-top: 10px">
          <label>Version</label>
          <el-select
            style="margin-left: 10px"
            v-model="querySingleVersions"
            size="medium"
            multiple
            filterable
            placeholder="Please select Version"
          >
            <el-option
              v-for="data in versions"
              :key="data"
              :label="data"
              :value="data"
            ></el-option>
          </el-select>
          <label style="margin-left: 30px">Platform</label>
          <el-select
            style="margin-left: 10px"
            v-model="querySinglePlatforms"
            size="medium"
            multiple
            filterable
            placeholder="Please select Platform"
          >
            <el-option
              v-for="data in platforms"
              :key="data"
              :label="data"
              :value="data"
            ></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="12">
        <div style="margin-bottom: 10px">Query in Cluster Mode</div>
        <div id="queryClusterContainer"></div>
        <div style="margin-top: 10px">
          <label>Version</label>
          <el-select
            style="margin-left: 10px"
            v-model="queryClusterVersions"
            size="medium"
            multiple
            filterable
            placeholder="Please select Version"
          >
            <el-option
              v-for="data in versions"
              :key="data"
              :label="data"
              :value="data"
            ></el-option>
          </el-select>
          <label style="margin-left: 30px">Platform</label>
          <el-select
            style="margin-left: 10px"
            v-model="queryClusterPlatforms"
            size="medium"
            multiple
            filterable
            placeholder="Please select Platform"
          >
            <el-option
              v-for="data in platforms"
              :key="data"
              :label="data"
              :value="data"
            ></el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
 
<script>
import { Line } from '@antv/g2plot';

export default {
  name: "Forms",
  components: {},
  data () {
    return {
      datas: [],
      versions: [],
      platforms: [],
      querySingleVersions: [],
      querySinglePlatforms: [],
      queryClusterVersions: [],
      queryClusterPlatforms: [],
    }
  },
  mounted () {
    fetch('http://192.168.55.21:8000/datashow/perf_data?node=single&kind=batch_query&platform%5B%5D=GCP&version=all&query%5B%5D=bi_1',
      {
        headers: {
          'Accept': 'application/json, text/javascript, */*; q=0.01',
          "Referer": 'http://192.168.55.21:8000/datashow/performance_test',
          'Cookie': 'jenkins-timestamper-offset=-28800000; jenkins-timestamper=system; jenkins-timestamper-local=true; screenResolution=2560x1440; JSESSIONID.f5dfd93f=node0lxzu2zuftj37vsyzqxuaplua7718.node0; TigerGraphApp=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk0OTZjOTA4LTI4ZDgtNDZmZi1hMTE4LWQxYjRjMTI0MjM3MyIsInVzZXJuYW1lIjoidGlnZXJncmFwaCIsInBhc3N3b3JkIjoiNGJlOTNiMzAzNjBiNGEwODc3NWNhYWNmMzk5YmFiMjY0YTgzNWJjYmIxMGVkMjFmYWVkOTkxMDNiMzg3MmMzYyIsImV4cCI6MTYzNjAyMDI1MCwiaWF0IjoxNjM1OTMzODUwfQ.vuxxcRxmYcyoxulEFWjISK9FARj1Zzp8ZtlCFv4ea5I; zrCookie=818409048'
        }
      }
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        let json = JSON.parse(data);
        let xa = json["xa"]
        let datas = json["data"]
        let querySingleDatas = [];
        for (let i = 0; i < datas.length; i++) {
          let querySingleData = [];
          for (let j = 0; j < datas[i].length; j++) {
            let queryData = {
              "name": i,
              "version": xa[j],
              "time_cost": datas[i][j]
            }
            querySingleData.push(queryData)
          }
          querySingleDatas.push(querySingleData);
        }
        console.log(querySingleDatas);
        let querySingleContainer = new Line('querySingleContainer', {
          querySingleDatas,
          xField: 'version',
          yField: 'time_cost',
          seriesField: 'name',
          xAxis: {
            label: {
              formatter: (v) => `${v.split("_")[1]}`
            }
          }
        });
        querySingleContainer.render();
      });

    fetch('https://gw.alipayobjects.com/os/bmw-prod/e00d52f4-2fa6-47ee-a0d7-105dd95bde20.json')
      .then((res) => res.json())
      .then((data) => {
        // let querySingleContainer = new Line('querySingleContainer', {
        //   data,
        //   xField: 'year',
        //   yField: 'gdp',
        //   // 数据分组字段
        //   seriesField: 'name',
        //   legend: {
        //     // 图例位置
        //     position: 'top',
        //   },
        //   smooth: true,
        //   // @TODO 后续会换一种动画方式
        //   animation: {
        //     appear: {
        //       animation: 'path-in',
        //       duration: 5000,
        //     },
        //   },
        // });

        let queryClusterContainer = new Line('queryClusterContainer', {
          data,
          xField: 'year',
          yField: 'gdp',
          seriesField: 'name',
          yAxis: {
            label: {
              formatter: (v) => `${(v / 10e8).toFixed(1)} B`,
            },
          },
          legend: {
            position: 'top',
          },
          smooth: true,
          // @TODO 后续会换一种动画方式
          animation: {
            appear: {
              animation: 'path-in',
              duration: 5000,
            },
          },
        });

        // querySingleContainer.render();
        queryClusterContainer.render();
      });
  },
  methods: {}
};
</script>
 
<style lang="scss" scoped>
.el-form {
  margin: 50px auto;
  padding: 50px;
  width: 580px;
  border: 1px solid gray;
  border-radius: 8px;
}
</style>
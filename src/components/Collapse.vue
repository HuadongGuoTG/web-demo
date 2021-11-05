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
            @change="singleVersion"
            placeholder="Please select Version"
          >
            <el-option
              v-for="data in versions"
              :key="data"
              :label="data"
              :value="data"
            ></el-option>
          </el-select>
          <!-- <label style="margin-left: 30px">Platform</label>
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
          </el-select> -->
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
            @change="clusterVersion"
            placeholder="Please select Version"
          >
            <el-option
              v-for="data in versions"
              :key="data"
              :label="data"
              :value="data"
            ></el-option>
          </el-select>
          <!-- <label style="margin-left: 30px">Platform</label>
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
          </el-select> -->
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
    let result = {
      "error": false,
      "message": "",
      "results": [
        {
          "@@result": [
            {
              "build_date": "2021-11-04 00:00:00",
              "load_speed": 585633,
              "version": "3.4.0",
              "name": "load_data1"
            },
            {
              "build_date": "2021-11-04 00:00:00",
              "load_speed": 1185633,
              "version": "3.4.0",
              "name": "load_data2"
            },
            {
              "build_date": "2021-11-05 00:00:00",
              "load_speed": 1585643,
              "version": "3.5.0",
              "name": "load_data1"
            },
            {
              "build_date": "2021-11-07 00:00:00",
              "load_speed": 1585663,
              "version": "3.5.0",
              "name": "load_data2"
            }
          ]
        }
      ]
    };
    this.draw_table(result, 'querySingleContainer');
    this.draw_table(result, 'queryClusterContainer');

    this.singleVersion([]);
    this.clusterVersion([]);
  },
  methods: {
    draw_table (data, tag) {
      if (!data['error']) {
        let datas = []
        for (let k = 0; k < data["results"].length; k++) {
          let results = data["results"][k]["@@result"];
          for (let i = 0; i < results.length; i++) {
            let result = results[i];
            datas.push({
              "version": result["version"] + "_" + result["build_date"],
              "load_speed": result["load_speed"],
              "name": result["name"]
            });
            if (this.versions.indexOf(result["version"]) < 0) {
              this.versions.push(result["version"])
            }
          }
        }
        let querySingleContainer = new Line(tag, {
          data: datas,
          xField: 'version',
          yField: 'load_speed',
          seriesField: 'name',
          xAxis: {
            label: {
              formatter: (v) => `${v.split("_")[0]}`
            }
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
          }
        });
        querySingleContainer.render();
      } else {
        this.$message.error(data["message"]);
      }
    },
    singleVersion (val) {
      console.log(val + " : " + val.length);
      // TODO version版本筛选条件发生变化，调用后端接口请求数据，然后重新渲染图表
      // this.draw_table(result, 'querySingleContainer');
    },
    clusterVersion (val) {
      console.log(val + " : " + val.length);
      // TODO version版本筛选条件发生变化，调用后端接口请求数据，然后重新渲染图表
      // this.draw_table(result, 'queryClusterContainer');
    }
  }
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
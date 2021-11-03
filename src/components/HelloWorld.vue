<template>
  <div class="app-container">
    <el-form
      :model="plan"
      label-width="160px"
      label-position="rigth"
    >
      <el-form-item
        label="TEST PLAN"
        size="medium"
      >
        <el-select
          v-model="plan.test_plan"
          placeholder="Please select test plan"
        >
          <el-option
            v-for="item in plan.pipelines"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-tabs
        value="ec2"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="CREATE GCP INSTANCES"
          name="gcp"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="MACHINE COUNT"
                size="medium"
              >
                <el-input
                  v-model="plan.machine_count"
                  placeholder="Please input machine count"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="OS"
                size="medium"
              >
                <el-input
                  v-model="plan.os"
                  placeholder="Please input OS of machine"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item
                label="VCPU Count"
                size="medium"
              >
                <el-input
                  v-model="plan.vcpu"
                  placeholder="Please input VCPU count"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="MEMORY SIZE"
                size="medium"
              >
                <el-input
                  v-model="plan.memory_size"
                  placeholder="Please input memory size(GB)"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="DISK SIZE">
                <el-input
                  v-model="plan.disk_size"
                  placeholder="Please input disk size(GB)"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane
          label="CREATE EC2 INSTANCES"
          name="ec2"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="MACHINE COUNT"
                size="medium"
              >
                <el-input
                  v-model="plan.machine_count"
                  placeholder="Please input machine count"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="OS"
                size="medium"
              >
                <el-input
                  v-model="plan.os"
                  placeholder="Please input OS of machine"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item
                label="VCPU Count"
                size="medium"
              >
                <el-input
                  v-model="plan.vcpu"
                  placeholder="Please input VCPU count"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="MEMORY SIZE"
                size="medium"
              >
                <el-input
                  v-model="plan.memory_size"
                  placeholder="Please input memory size(GB)"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="DISK SIZE">
                <el-input
                  v-model="plan.disk_size"
                  placeholder="Please input disk size(GB)"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane
          label="USE EXISTING MACHINE"
          name="exists"
        >
          <el-form-item label="IP LIST">
            <el-input
              v-model="plan.ip_list"
              placeholder="IP_LIST=private_ip1,private_ip2,...,private_ipn;SUDO_USER=graphsql"
            ></el-input>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>

      <el-form-item label="MODULE TESTS">
        <el-select
          v-model="modules"
          multiple
          filterable
          placeholder="请选择"
          @change="moduleListChanged"
        >
          <el-option
            v-for="item in test_list"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <form-create
        v-model="dynamic"
        :rule="rule"
        :option="options"
        :value.sync="parameters"
      ></form-create>
      <el-form-item label="">
        <el-button
          @click="submit"
          round
        >提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { deepCopy } from '@/tools/json'

export default {
  name: 'HelloWorld',
  data () {
    return {
      plan: {
        pipelines: ["release", "test"],
        test_plan: '',
        machine_count: 1,
        os: 'centos7',
        vcpu: 8,
        memory_size: 32,
        disk_size: 200,
        ip_list: '',
        url: '',
        tag: '',
      },
      parameters: {},
      modules: [],
      test_list: [],
      module_tests: [],
      doms: [],
      dynamic: {
        skip: true,
        data_set: 'tpch',
        data_size: 1,
        drop_all: false,
        data_url: ''
      },
      rule: [],
      options: {
        submitBtn: false,
        resetBtn: false,
        form: {
          labelWidth: '160px',
          size: 'medium'
        }
      }
    }
  },
  props: {
    msg: String
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.module_tests = [
        {
          title: 'create_schema',
          envs: {
            "SKIP": "false",
            "DATA_SET": "tpch",
            "SKIP_DROP_ALL": "false",
            "SCHEMA_URL": ''
          }
        },
        {
          title: 'load_data',
          envs: {
            "SKIP": "false",
            "DOWNLOAD_PATH": "",
            "DATA_SIZE": 10,
            "DATA_PATH": '',
            "DATA_URL": '',
            "SKIP_DELETE_DATA": 'false',
            "LOAD_SCRIPT_URL": ''
          }
        }
      ]

      let options = [];
      for (let i = 0; i < this.plan.pipelines.length; i++) {
        options.push(
          {
            value: this.plan.pipelines[i],
            label: this.plan.pipelines[i],
            disabled: false
          }
        );
      }

      for (let i = 0; i < this.module_tests.length; i++) {
        this.test_list.push(
          {
            value: this.module_tests[i].title,
            label: this.module_tests[i].title,
          }
        )
      }
      // console.log("init");
    },
    submit () {
      console.log(this.plan);
      console.log(this.parameters);
    },
    generateDom (data) {
      var push_elment = {
        type: 'el-col',
        children: []
      }
      var collapse_element = {
        type: 'el-collapse',
        children: [
          {
            type: 'el-collapse-item',
            style: "padding-left: 50px; font-size: 1em; flex: 1 0 90%; order: 1",
            props: {
              title: ''
            },
            children: []
          }
        ]
      }
      var row_element = {
        type: 'el-row',
        children: []
      }
      var col_element = {
        type: 'el-col',
        props: {
          span: 12
        },
        children: [
          {
            type: 'el-form-item',
            props: {
              label: 'SKIP DELETE DATA',
              size: 'medium'
            },
            children: [
              {
                type: 'input',
                field: 'data_set',
              }
            ]
          }
        ]
      }
      let list = JSON.parse(data)
      let collapses = []
      for (let i = 0; i < list.length; i++) {
        let collapse = deepCopy(collapse_element)
        collapse.children[0].props.title = list[i].title.toUpperCase().replaceAll("_", " ")
        let rows = []
        let row = deepCopy(row_element)
        let k = 0
        for (let key in list[i].envs) {
          let col = deepCopy(col_element)
          col.children[0].props.label = key.toUpperCase().replaceAll("_", " ")
          col.children[0].children[0].field = list[i].title.toLowerCase() + "." + key.toLowerCase()
          col.children[0].children[0].value = list[i].envs[key]
          row.children.push(col)
          if (k == 1) {
            k = 0
            rows.push(row)
            row = deepCopy(row_element)
          } else {
            k = k + 1
          }
        }
        for (let j = 0; j < rows.length; j++) {
          collapse.children[0].children.push(rows[j])
        }
        collapses.push(collapse)
      }
      let root = deepCopy(push_elment)
      for (let m = 0; m < collapses.length; m++) {
        root.children.push(collapses[m])
      }
      this.rule.push(root)
    },
    moduleListChanged (val) {
      // 移除被删除的组件
      let removeList = []
      for (let i = 0; i < this.doms.length; i++) {
        let title = this.doms[i].title
        if (val.indexOf(title) < 0) {
          removeList.push(i)
        }
      }
      let tmpDoms = this.doms;
      let tmpRule = this.rule;
      this.doms = []
      this.rule = []
      for (let i = 0; i < tmpDoms.length; i++) {
        if (removeList.indexOf(i) < 0) {
          this.doms.push(tmpDoms[i])
          this.rule.push(tmpRule[i])
        } else {
          for (let env in tmpDoms[i].envs) {
            let key = tmpDoms[i].title.toLowerCase() + "." + env.toLowerCase()
            delete this.parameters[key]
          }
        }
      }

      let exists = []
      for (let i = 0; i < this.doms.length; i++) {
        exists.push(this.doms[i].title)
      }

      let newDoms = []
      for (let i = 0; i < this.module_tests.length; i++) {
        let title = this.module_tests[i].title
        if (val.indexOf(title) > -1 && exists.indexOf(title) < 0) {
          newDoms.push(this.module_tests[i])
          this.doms.push(this.module_tests[i])
        }
      }
      for (let i = 0; i < newDoms.length; i++) {
        for (let env in newDoms[i].envs) {
          let key = newDoms[i].title.toLowerCase() + "." + env.toLowerCase()
          this.parameters[key] = newDoms[i].envs[env]
        }
      }
      // console.log(this.parameters)
      this.generateDom(JSON.stringify(newDoms))
    },
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.app-container {
  width: 60%;
  text-align: left;
}
.collapse-title {
  flex: 1 0 90%;
  order: 1;
}
</style>

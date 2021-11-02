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
        <el-col :span="12">
          <el-form-item label="TAG">
            <el-input
              v-model="plan.tag"
              placeholder="Please input tag"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="IP LIST">
        <el-input
          v-model="plan.ip_list"
          placeholder="Please input machine IPs"
        ></el-input>
      </el-form-item>

      <form-create
        v-model="dynamic"
        :rule="rule"
        :option="options"
      ></form-create>
      <el-form-item label="">
        <el-button
          @click="generateCreate"
          round
        >生成Create Schema表单</el-button>
        <el-button
          @click="generateLoad"
          round
        >生成Load Data表单</el-button>
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
      },
      rules: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' },
          { pattern: /^[\u4e00-\u9fa5]{2,5}$/, message: '姓名必须是2-5个汉字', trigger: 'blur' }
        ],
        gender: [{ required: true, message: '性别不能为空', trigger: 'change' }],
        birthday: [{ required: true, message: '出生日期不能为空', trigger: 'change' }],
        mobile: [
          { required: true, message: '手机号码不能为空', triggler: 'blur' },
          { pattern: /^[1][35789]\d{9}$/, message: '手机号码必须要符合规范', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱地址不能为空', trigger: 'blur' },
          {
            pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            message: '邮箱地址必须要符合规范',
            trigger: 'blur'
          }
        ],
        address: [{ required: true, message: '家庭住址不能为空', trigger: 'blur' }]
      }
    }
  },
  props: {
    msg: String
  },
  created () {
    // this.init()
  },
  methods: {
    init () {
      let options = [];
      for (var i = 0; i < this.plan.pipelines.length; i++) {
        options.push(
          {
            value: this.plan.pipelines[i],
            label: this.plan.pipelines[i],
            disabled: false
          }
        )
      }

      console.log("init");
      // this.rule.push(
      //   {
      //     type: 'div',
      //     className: 'app-container',
      //     style: "margin-left: 35px",
      //     children: [
      //       {
      //         type: 'el-form-item',
      //         props: {
      //           label: 'TEST PLAN',
      //           size: 'medium'
      //         },
      //         children: [
      //           {
      //             type: 'select',
      //             field: 'test_plan',
      //             value: this.plan.pipelines,
      //             options: options
      //           }
      //         ]
      //       }
      //     ]
      //   }
      // )
    },
    generateCreate () {
      console.log("generate Create Schema");
      let modules = [
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
      this.generateDom(JSON.stringify(modules))
    },
    generateLoad () {
      console.log("generate Load Data")
    },
    submit () {
      console.log(this.plan);
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
            style: "padding-left: 50px; font-size: 1em;",
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
                type: 'el-input',
                field: 'data_set',
                value: ''
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
          // console.log(key + " : " + list[i].envs[key] + " : " + k + " : " + (k == 1))
          let col = deepCopy(col_element)
          col.children[0].props.label = key.toUpperCase().replaceAll("_", " ")
          col.children[0].children[0].field = key
          col.children[0].children[0].value = list[i].envs[key]
          row.children.push(col)
          // console.log(col.children[0].field)
          if (k == 1) {
            k = 0
            rows.push(row)
            row = deepCopy(row_element)
            // row.children.push(col)
          } else {
            // row.children.push(col)
            // rows.push(row)
            k = k + 1
          }
        }
        // console.log("row length: " + rows.length)
        for (let j = 0; j < rows.length; j++) {
          collapse.children[0].children.push(rows[j])
        }
        collapses.push(collapse)
      }
      for (let m = 0; m < collapses.length; m++) {
        push_elment.children.push(collapses[m])
      }
      this.rule.push(push_elment)
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
</style>

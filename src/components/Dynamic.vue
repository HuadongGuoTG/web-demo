
<template>
  <section>
    <h1>组件模式：使用&lt;form-create>&lt;/form-create> 或 &lt;FormCreate /> 标签来创建（生成）表单</h1>

    <br />
    <a
      href="http://www.form-create.com/v2/guide/rule.html"
      target="_blank"
    >表单 rule[] 生成规则</a>

    <br />
    <br />
    <el-row>
      <el-button
        type="success"
        @click="generateFormFn"
        icon="el-icon-setting"
      >根据JSON生成表单</el-button>
      <el-button
        type="primary"
        @click="ajaxSetDataFn"
        icon="el-icon-edit"
      >Ajax请求初始化表单</el-button>
      <el-button
        type="danger"
        @click="getFormModelFn"
        icon="el-icon-s-promotion"
      >获取表单Model对象</el-button>
    </el-row>

    <br />
    <h3>使用&lt;form-create>&lt;/form-create>标签来创建（生成）表单：</h3>
    <form-create
      v-model="fApi"
      :rule="rule"
      :option="option"
    ></form-create>

    <br />
    <!-- <h3>使用&lt;FormCreate /> 标签来创建（生成）表单：</h3> -->
    <!-- <FormCreate v-model="fApi" :rule="rule" :option="option" /> -->
  </section>
</template>
 
<script>
export default {
  name: "Forms",
  components: {},
  data () {
    return {
      // 实例对象
      fApi: {},

      // 表单生成规则数组对象  生成规则：http://www.form-create.com/v2/guide/rule.html
      // 生成规则数组中一个对象就是一个表单项（是一个json对象），在里面可以对应的表单名称、类型、属性、值、样式、类名、是否必填、错误提示等。
      rule: [],

      // 组件参数配置
      option: {
        // 显示重置表单按扭
        resetBtn: true,

        // 表单提交按扭事件
        onSubmit: formData => {
          alert(JSON.stringify(formData));

          console.log("获取表单中的数据：", formData);

          //按钮进入提交状态
          //   this.fApi.btn.loading();

          //重置按钮禁用
          //   this.fApi.resetBtn.disabled();

          //按钮进入可点击状态
          //   this.fApi.btn.finish();
        }
      }
    };
  },
  mounted () {
    // 这里模拟ajax从后端返回数据后，如果渲染表单数据
    window.setTimeout(() => {
      //   this.ajaxSetDataFn();
    }, 5000);
  },
  methods: {
    // 设置表单数据
    ajaxSetDataFn () {
      this.fApi.setValue({
        userName: "沐枫",
        password: "123456",
        summary: "我是请后端返回来的个人简介",
        sex: 1,
        hobby: [3, 4],
        address: 5,
        address2: [1, 4, 7],
        volume: 35,
        jiajie: 56,
        color: "#000DFF",
        dateTime: ["2020-02-01", "2020-02-30"],
        rateNumber: 4,
        offon: false,
        imgFile: [
          "https://inews.gtimg.com/newsapp_ls/0/11673675668_295195/0",
          "https://inews.gtimg.com/newsapp_ls/0/11673508745_295195/0"
        ]
      });
    },

    // 生成表单
    generateFormFn () {
      //   this.rule = [{}];
      this.rule.push(
        {
          type: 'el-col',
          children: [
            {
              type: 'el-collapse',
              className: "user-name-dom",
              style: "margin-left: 40px;",
              children: [
                {
                  type: 'el-collapse-item',
                  props: {
                    title: 'item1',
                    name: 'item1'
                  },
                  children: ['item1 content']
                },
                {
                  type: 'el-collapse-item',
                  props: {
                    title: 'item2',
                    name: 'item2'
                  },
                  col: {
                    md: { span: 24 }
                  },
                  children: ['item2 content']
                },
                {
                  type: 'el-collapse-item',
                  props: {
                    title: 'item3',
                    name: 'item3'
                  },
                  col: {
                    md: { span: 24 }
                  },
                  children: ['item3 content']
                },
              ]
            }
          ]
        },

        {
          type: "slider",
          field: "volume",
          title: "音量大小：",
          value: 60,
          //value: [25, 80],  // 和range: true 时一起使用
          props: {
            min: 0,
            max: 100,
            showTip: "always",
            range: false // 起始分段
          }
        },

        {
          type: "InputNumber",
          field: "jiajie",
          title: "商品增减：",
          value: 0,
          col: {
            md: { span: 12 }
          },
          validate: [
            {
              required: true,
              //   min: 1,
              message: "商品数里至少为1",
              trigger: "change"
            }
          ]
        },

        {
          type: "ColorPicker",
          field: "color",
          title: "喜欢颜色：",
          value: "#00b102",
          col: {
            md: { span: 12 }
          },
          props: {
            alpha: true
          }
        },

        // {
        //   type: "DatePicker",
        //   field: "dateTime",
        //   title: "起止日期：",
        //   value: ["2020-04-20", new Date()],
        //   props: {
        //     type: "daterange",
        //     // format: "yyyy-MM-dd HH:mm:ss",
        //     format: "yyyy-MM-dd",
        //     placeholder: "请选择起止日期"
        //   }
        // },

        {
          type: "rate",
          field: "rateNumber",
          title: "评分效果：",
          value: 3,
          props: {
            count: 8,
            allowHalf: true // 是否可选半星
          },
          validate: [
            {
              required: true,
              type: "number",
              min: 4,
              message: "请大于3颗星",
              trigger: "change"
            }
          ],
          control: [
            {
              handle: function (val) {
                console.log(val + "颗星");
              }
            }
          ]
        },

        {
          type: "switch",
          field: "offon",
          title: "打开关闭：",
          value: true,
          col: {
            md: { span: 6 }
          },
          props: {
            trueValue: true,
            falseValue: false,
            slot: {
              open: "开启",
              close: "关闭"
            }
          }
        },

        {
          type: "upload",
          field: "imgFile",
          title: "图片上传：",
          value: [
            "https://inews.gtimg.com/newsapp_ls/0/11673471712_295195/0",
            "http://file.lotkk.com/form-create.png",
            "https://inews.gtimg.com/newsapp_ls/0/11673643537_295195/0"
          ],
          col: {
            md: { span: 18 }
          },
          validate: [
            {
              required: true,
              type: "array",
              min: 1,
              message: "请上传1张图片",
              trigger: "change"
            }
          ],
          props: {
            type: "select",
            uploadType: "image", // file
            name: "userPhoto", // name属性
            multiple: true, // 是否可多选
            allowRemove: true,
            accept: "image/*", // 上传文件类型
            format: ["jpg", "jpeg", "png", "gif"], // 上传文件格式
            maxSize: 2048, // 上传文件大小最大值
            maxLength: 5, // 上传文件数量最大值
            action: "http://www.upimage.com/imguploadApi", // 上传后端接收API接口
            onSuccess: function (res) {
              console.log(res)
              return ""; // 上传成功回调函数
            }
          }
        }
      );
    },

    //获取Form表单 model对象
    getFormModelFn () {
      console.log("Form表单 model对象：", this.fApi.model());
    },

    getUserNameChange (e) {
      console.log(e)
      this.$nextTick(() => {
        this.rule[2].value = this.rule[0].value;
      });
      console.log(this.fApi.getValue("userName"));
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
  // /deep/.el-collapse-item__header {
  //   width: 100%;
  // }
}
.col {
  padding-inline-start: 20px;
  padding-inline-end: 20px;
}
</style>
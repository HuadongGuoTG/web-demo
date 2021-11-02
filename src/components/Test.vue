<template>
  <div>
    <el-switch
      v-model="value"
      @change="onChanged"
      active-value="true"
      inactive-value="false"
      active-color="#13ce66"
      inactive-color="#ff4949"
    ></el-switch>
    <el-collapse v-show="value">
      <el-collapse-item
        name="1"
        ref="test"
        class="is-active"
        v-show="value==='true'"
        :disabled="value==='false'"
      >
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>

export default {
  name: 'test',
  data () {
    return {
      collapseTitle: "查看更多",
      value: true
    }
  },
  methods: {
    onChanged (val) {
      console.log(val)
    }
  }
}
</script>
<style lang="scss" scoped>
// 使得标题与箭头位于中间
.collapse-title {
  // flex: 0 1 54%; // 位于中间
  flex: 1 0 90%; //位于左侧
  order: 1;
  text-align: left;
}
// .el-collapse-item__header {
//   flex: 1 0 auto;
//   order: -1;
// }
</style>
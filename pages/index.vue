<template>
  <no-ssr>
    <el-main>
      <el-row type="flex" justify="center" align="middle">
        <el-col :span="16">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>路由总表</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <el-row v-for="(item,index) in $router.options.routes" :key="index" justify="center">
              <el-button class="text item" @click="$router.push({path:item.path})">
                {{ item.name }}
                <i class="el-icon-upload el-icon--right"></i>
              </el-button>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </no-ssr>
</template>

<script>
export default {
  created() {
    console.log(this.$router.options.routes)
  },
  components: {}
}
</script>

<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}
</style>

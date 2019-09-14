<template>
  <basic-container>
    <form class="el-form el-form--inline avue-crud-search__search">
      <div class="el-form-item">
        <label for="jobId" class="el-form-item__label">任务列表</label>
        <div class="el-form-item__content">
          <div class="el-tooltip" aria-describedby tabindex="0">
            <div class="el-input el-input--small el-input--suffix">
              <el-select
                v-model="jobId"
                class="el-form-item"
                @change="jobChange"
                @clear="jobClear"
              >
                <el-option
                  v-for="item in pluginList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </div>
          </div>
        </div>

        <el-button
          class="el-button--small"
          type="primary"
          icon="el-icon-refresh"
          @click="runJob"
        >启动任务</el-button>

        <el-button
          class="el-button--small"
          type="primary"
          icon="el-icon-refresh"
          @click="getJobList"
        >刷新任务</el-button>
        <el-button
          class="el-button--small"
          type="primary"
          icon="el-icon-trash"
          @click="jobClear"
        >清空</el-button>

        <el-button
          v-show="jobId"
          class="el-button--small"
          type="primary"
          icon="el-icon-document"
          @click="jobLogView"
        >查看日志</el-button>
      </div>

      <div class="el-tooltip" aria-describedby tabindex="0">
        <div class="el-input el-input--small el-input--suffix">
          <el-input v-model="templateJsonParam" placeholder="变量参数(json格式)" />
        </div>
      </div>

      <br />

      <div class="editor-container">
        <json-editor ref="jsonEditor" v-model="templateJson" />
      </div>

      <el-dialog title="日志查看" :visible.sync="logShow">
        <div class="log-container">
          <pre :loading="logLoading" v-text="logContent" />
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="loadLog()">刷新日志</el-button>
        </div>
      </el-dialog>
    </form>
  </basic-container>
</template>

<script>
import { runJob, runJobLog } from "@/api/datax/datax-job";
import {
  paged as jobConfigPaged,
  viewJobLog
} from "@/api/datax/datax-job-config";
import JsonEditor from "@/components/json-editor";

export default {
  components: { JsonEditor },
  data() {
    return {
      templateJson: {},
      templateJsonParam: undefined,
      listQuery: {
        current: 1,
        size: 200
      },
      pluginList: [1, 2],
      jobId: undefined,
      // 日志查询参数
      jobLogQuery: {
        id: undefined,
        fromLineNum: 0
      },
      // 日志内容
      logContent: undefined,
      // 显示日志
      logShow: false,
      // 日志显示加载中效果
      logLoading: false
    };
  },
  created() {
    this.getJobList();
  },
  methods: {
    getJobList() {
      this.jobClear();
      jobConfigPaged(this.listQuery).then(response => {
        this.jobId = undefined;
        this.jobLogQuery.fromLineNum = 0;
        this.logContent = undefined;
        const { records } = response.data.data;
        this.pluginList = records;
      });
    },
    runJob() {
      const obj = {
        jobConfigId: this.jobId,
        jobJson: this.templateJson,
        param: this.templateJsonParam
      };
      // 根据是否有 jobId 调不同的接口
      if (this.jobId === undefined) {
        runJob(this.templateJson).then(() => {
          this.$notify({
            title: "Success",
            message: "启动成功",
            type: "success",
            duration: 2000
          });
          // 显示日志
          this.jobLogView();
        });
      } else {
        runJobLog(obj).then(() => {
          this.$notify({
            title: "Success",
            message: "启动成功",
            type: "success",
            duration: 2000
          });
        });
      }
    },
    // 查看日志
    jobLogView() {
      if (this.jobId === undefined) {
        return;
      }
      this.jobLogQuery.id = this.jobId;
      if (this.logShow === false) {
        this.logShow = true;
      }
      this.loadLog();
    },
    // 加载日志
    loadLog() {
      this.logLoading = true;
      viewJobLog(this.jobLogQuery).then(response => {
        // console.log(response)
        // 判断是否是 '\n'，如果是表示显示完成，不重新加载
        if (response.logContent === "\n") {
          // this.jobLogQuery.fromLineNum = response.toLineNum - 20;
          // 重新加载
          // setTimeout(() => {
          //   this.loadLog()
          // }, 2000);
        } else {
          // 后续改进
          // this.jobLogQuery.fromLineNum = response.toLineNum
          this.logContent = response.data.data.logContent;
        }
        this.logLoading = false;
      });
    },
    // 选择任务事件
    jobChange(e) {
      this.jobId = e;
      this.jobLogQuery.fromLineNum = 0;
      for (const v of this.pluginList) {
        if (v.id === this.jobId) {
          this.templateJsonParam = v.configJsonParam;
          this.templateJson = JSON.parse(v.configJson);
          break;
        }
      }
    },
    jobClear() {
      this.jobId = undefined;
      this.logShow = false;
      this.logContent = undefined;
      this.templateJson={};
      this.templateJsonParam = undefined;
    }
  }
};
</script>

<style lang="scss" scoped>
.log-container {
  margin-bottom: 20px;
  background: #f5f5f5;
  width: 100%;
  height: 500px;
  overflow: scroll;
  pre {
    display: block;
    padding: 10px;
    margin: 0 0 10.5px;
    word-break: break-all;
    word-wrap: break-word;
    color: #334851;
    background-color: #f5f5f5;
    // border: 1px solid #ccd1d3;
    border-radius: 1px;
  }
}
</style>

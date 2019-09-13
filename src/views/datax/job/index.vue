<template>
<basic-container>
   <div class="app-container">
    <div class="filter-container">
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-refresh"
        @click="handleRunJob"
      >启动任务</el-button>
      <el-select
        v-model="jobId"
        placeholder="Type"
        class="filter-item"
        style="width: 200px"
        clearable
        @change="handleJobChange"
        @clear="handleJobClear"
      >
        <el-option v-for="item in pluginList" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-refresh" @click="getJobList">刷新任务</el-button>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-trash"
        @click="templateJson={}"
      >清空json</el-button>
      <el-button
        v-show="jobId"
        class="filter-item"
        type="primary"
        icon="el-icon-document"
        @click="handleViewJobLog"
      >查看日志</el-button>
    </div>

    <div class="editor-container">
      <el-input v-model="templateJsonParam" placeholder="变量参数(json格式)" />
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
  </div> 

  
    <avue-form ref="form" v-model="obj" :option="option" @reset-change="emptytChange"  @submit="submit">
      <!-- 
      <template slot-scope="scope" slot="menuForm">
        <el-button @click="tip">自定义按钮</el-button>
      </template> 
      -->
    </avue-form>
  </basic-container>
</template>

<script>
import {mapGetters} from "vuex";
import website from '@/config/website';
import { runJob, runJobLog } from "@/api/datax/datax-job";
import {
  paged as jobConfigPaged,
  viewJobLog
} from "@/api/datax/datax-job-config";
import JsonEditor from "@/components/json-editor";

var DIC = {
    VAILD: [{
        label: '真',
        value: 'true'
    }, {
        label: '假',
        value: 'false'
    }],
    SEX: [{
        label: '男',
        value: 0
    }, {
        label: '女',
        value: 1
    }]
}
export default {
  components: { JsonEditor },
  computed: {
    option() {
      return {
        size: this.sizeValue,
        mock: true,
        submitText: "完成",
        column: [
          {
            label: "用户名",
            prop: "username",
            tip: "这是信息提示",
            span: 8,
            maxlength: 3,
            suffixIcon: "el-icon-tickets",
            prefixIcon: "el-icon-tickets",
            minlength: 2,
            mock: {
              type: "name",
              en: true
            },
            rules: [
              {
                required: true,
                message: "请输入用户名",
                trigger: "blur"
              }
            ],
            change: ({ value, column }) => {
              this.obj.address = value;
              this.$message.success("address change");
            },
            click: ({ value, column }) => {
              this.$message.success("click");
            }
          },
          {
            label: "姓名",
            prop: "name",
            mock: {
              type: "name"
            },
            span: 8
          },
          {
            label: "类型",
            prop: "type",
            type: "select",
            dicData: DIC.VAILD,
            span: 6,
            mock: {
              type: "dic"
            }
          },
          {
            label: "权限",
            prop: "grade",
            span: 6,
            type: "checkbox",
            dicData: DIC.VAILD,
            mock: {
              type: "dic"
            }
          },
          {
            label: "开关",
            prop: "switch",
            span: 6,
            type: "switch",
            dicData: DIC.SEX,
            mock: {
              type: "dic"
            },
            hide: true,
            row: true
          },
          {
            label: "性别",
            prop: "sex",
            span: 6,
            type: "radio",
            dicData: DIC.SEX,
            mock: {
              type: "dic"
            },
            valueDefault: 0,
            change: ({ value, column }) => {
              this.$message.success("change");
            }
          },
          {
            label: "数字",
            prop: "number",
            type: "number",
            span: 6,
            precision: 2,
            mock: {
              type: "number",
              max: 1,
              min: 2,
              precision: 2
            },
            valueDefault: 3,
            minRows: 0,
            maxRows: 3,
            row: true
          },
          {
            label: "网站",
            span: 12,
            prop: "url",
            prepend: "http://",
            mock: {
              type: "url",
              header: false
            },
            append: "com",
            row: true
          },
          {
            label: "日期",
            prop: "date",
            type: "date",
            span: 8,
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd",
            mock: {
              type: "datetime",
              format: "yyyy-MM-dd"
            }
          },
          {
            label: "日期时间",
            prop: "datetime",
            type: "datetime",
            span: 8,
            format: "yyyy-MM-dd hh:mm:ss",
            valueFormat: "yyyy-MM-dd hh:mm:ss",
            mock: {
              type: "datetime",
              format: "yyyy-MM-dd hh:mm:ss",
              now: true
            }
          },
          {
            label: "时间",
            prop: "time",
            type: "time",
            span: 8,
            format: "hh:mm:ss",
            valueFormat: "hh:mm:ss",
            mock: {
              type: "datetime",
              format: "hh:mm:ss"
            }
          },
          {
            label: "地址",
            span: 24,
            prop: "address",
            mock: {
              type: "county"
            }
          },
          {
            label: "建议",
            span: 24,
            prop: "adit",
            mock: {
              type: "word",
              min: 10,
              max: 30
            }
          },
          {
            label: "手机号",
            mock: {
              type: "phone"
            },
            span: 12,
            prop: "phone"
          }
        ]
      };
    }
  },
  data() {
    return {
      obj: {},
      templateJson: {},
      templateJsonParam: undefined,
      // 查询参数
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
    // 获取模板
    getJobList() {
      jobConfigPaged(this.listQuery).then(response => {
        this.jobId = undefined;
        this.jobLogQuery.fromLineNum = 0;
        this.logContent = undefined;
        const { records } = response.data.data;
        this.pluginList = records;
      });
    },
    // 启动任务
    handleRunJob() {
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
          this.handleViewJobLog();
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
    handleViewJobLog() {
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
          this.logContent = response.logContent;
        }
        this.logLoading = false;
      });
    },
    // 选择任务事件
    handleJobChange(e) {
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
    // 清空选项事件
    handleJobClear() {
      this.jobId = undefined;
      this.logShow = false;
      this.logContent = undefined;
    },

    emptytChange() {
      this.$message.success("清空方法回调");
    },
    submit() {
      this.$message.success("当前数据" + JSON.stringify(this.obj));
    }
  }
};
</script>

<style lang="scss" scoped>
.editor-container {
  position: relative;
  height: 100%;
}
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

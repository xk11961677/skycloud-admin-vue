<template>
  <basic-container>
    <avue-crud
      :option="option"
      :table-loading="loading"
      :data="data"
      ref="crud"
      v-model="form"
      :permission="permissionList"
      :page="page"
      @row-del="rowDel"
      @row-update="rowUpdate"
      @row-save="rowSave"
      :before-open="beforeOpen"
      @search-change="searchChange"
      @search-reset="searchReset"
      @selection-change="selectionChange"
      @current-change="currentChange"
      @size-change="sizeChange"
      @on-load="onLoad"
    >
      <template slot="menuLeft">
        <el-button
          type="danger"
          size="small"
          icon="el-icon-delete"
          plain
          @click="handleDelete"
          v-if="permission.elt_manager_jobConfig_btn_del"
        >删 除</el-button>
      </template>
      <template slot-scope="scope" slot="menu">
        <el-button
          type="text"
          size="small"
          icon="el-icon-document-copy"
          v-if="permission.elt_manager_jobConfig_btn_edit"
          plain
          class="none-border"
          @click.stop="handleCopy(scope.row)"
        >复制</el-button>
      </template>

      <template slot-scope="scope" slot="configJsonForm">
        <json-editor ref="jsonEditor" v-model="configJson" />
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import {
  getList,
  getOne,
  update,
  add,
  remove,
  copy
} from "@/api/datax/datax-job-config";
import { mapGetters } from "vuex";
import JsonEditor from "@/components/json-editor";

export default {
  components: { JsonEditor },
  data() {
    return {
      configJson: {},
      form: {},
      selectionList: [],
      loading: true,
      query: {},
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      option: {
        dialogWidth: 400,
        dialogHeight: 300,
        tip: false,
        border: true,
        index: true,
        selection: true,
        labelWidth: 120,
        viewBtn: true,
        column: [
          {
            label: "作业名称",
            prop: "name",
            search: true,
            overHidden: true,
            span: 100,
            rules: [
              {
                required: true,
                message: "请输入作业名称",
                trigger: "blur"
              }
            ]
          },
          {
            label: "作业分组",
            prop: "jobGroup",
            search: true,
            span: 100,
            rules: [
              {
                required: true,
                message: "请输入作业分组",
                trigger: "blur"
              }
            ]
          },
          {
            label: "JSON配置变量值",
            prop: "configJsonParam",
            overHidden: true,
            span: 100,
            rules: [
              {
                required: false
              }
            ]
          },
          {
            label: "JSON配置",
            prop: "configJson",
            overHidden: true,
            formslot: true,
            span: 100
          }
        ]
      },
      data: []
    };
  },
  computed: {
    ...mapGetters(["permission"]),
    permissionList() {
      return {
        addBtn: this.vaildData(this.permission.elt_manager_jobConfig_btn_add, false),
        viewBtn: this.vaildData(this.permission.elt_manager_jobConfig_btn_view, false),
        delBtn: this.vaildData(this.permission.elt_manager_jobConfig_btn_del, false),
        editBtn: this.vaildData(this.permission.elt_manager_jobConfig_btn_edit, false)
      };
    },
    ids() {
      let ids = [];
      this.selectionList.forEach(ele => {
        ids.push(ele.id);
      });
      return ids.join(",");
    }
  },
  methods: {
    rowSave(row, loading, done) {
      // row.configJson = JSON.stringify(this.configJson || {});
      row.configJson = this.configJson || {};
      add(row).then(
        () => {
          loading();
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        },
        error => {
          done();
          console.log(error);
        }
      );
    },
    rowUpdate(row, index, loading, done) {
      //row.configJson = JSON.stringify(this.configJson || {});
      row.configJson = this.configJson || {};
      update(row).then(
        () => {
          loading();
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        },
        error => {
          done();
          console.log(error);
        }
      );
    },
    rowDel(row) {
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return remove(row.id);
        })
        .then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        });
    },

    searchReset() {
      this.query = {};
      this.onLoad(this.page);
    },
    searchChange(params) {
      this.query = params;
      this.onLoad(this.page, params);
    },
    selectionChange(list) {
      this.selectionList = list;
    },
    selectionClear() {
      this.selectionList = [];
      this.$refs.crud.toggleSelection();
    },
    handleDelete() {
      if (this.selectionList.length === 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      }
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return remove(this.ids);
        })
        .then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          this.$refs.crud.toggleSelection();
        });
    },
    handleCopy(row) {
      copy(row.id).then(() => {
        this.onLoad(this.page);
        this.$message({
          type: "success",
          message: "复制成功!"
        });
      });
    },
    beforeOpen(done, type) {
      if (["add"].includes(type)) {
        this.configJson = {};
      }
      if (["edit", "view"].includes(type)) {
        this.configJson = JSON.parse(this.form.configJson || "{}");
        getOne(this.form.id).then(res => {
          this.form = res.data.data;
        });
      }
      done();
    },
    currentChange(currentPage) {
      this.page.currentPage = currentPage;
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
    },
    onLoad(page, params = {}) {
      this.loading = true;
      getList(
        page.currentPage,
        page.pageSize,
        Object.assign(params, this.query)
      ).then(res => {
        const data = res.data.data;
        this.page.total = data.total;
        this.data = data.records;
        this.loading = false;
        this.selectionClear();
      });
    }
  }
};
</script>

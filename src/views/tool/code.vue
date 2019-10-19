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
        <el-button type="danger" size="small" icon="el-icon-delete" plain @click="handleDelete">删 除</el-button>
        <el-button
          type="primary"
          size="small"
          plain
          icon="el-icon-refresh"
          @click="handleBuild"
        >代码生成</el-button>
      </template>
      <template slot-scope="scope" slot="menu">
        <el-button
          type="text"
          size="small"
          icon="el-icon-document-copy"
          plain
          class="none-border"
          @click.stop="handleCopy(scope.row)"
        >复制</el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import {
  getList,
  getCode,
  build,
  remove,
  add,
  update,
  copy
} from "@/api/tool/code";
import { mapGetters } from "vuex";
import { saveAs } from "file-saver";
import { baseUrl } from "@/config/env";

export default {
  data() {
    return {
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
        dialogHeight: 500,
        tip: false,
        border: true,
        index: true,
        viewBtn: true,
        selection: true,
        labelWidth: 120,
        column: [
          {
            label: "数据源",
            prop: "datasourceId",
            search: true,
            span: 24,
            type: "select",
            dicUrl: baseUrl + "/codegen/datasource/select",
            props: {
              label: "name",
              value: "id"
            },
            rules: [
              {
                required: true,
                message: "请选择数据源",
                trigger: "blur"
              }
            ]
          },
          {
            label: "持久化层类型",
            prop: "dalType",
            search: true,
            span: 24,
            type: "select",
            dicData: [
              {
                label: "tk-mybatis",
                value: 0
              },
              {
                label: "mybatis-plus",
                value: 1
              }
            ],
            rules: [
              {
                required: true,
                message: "请选择持久化类型",
                trigger: "blur"
              }
            ]
          },
          {
            label: "模块名",
            prop: "moduleName",
            search: true,
            rules: [
              {
                required: true,
                message: "请输入模块名",
                trigger: "blur"
              }
            ]
          },
          {
            label: "服务名",
            prop: "serviceName",
            search: true,
            overHidden: true,
            rules: [
              {
                required: true,
                message: "请输入服务名",
                trigger: "blur"
              }
            ]
          },
          {
            label: "表名",
            prop: "tableName",
            rules: [
              {
                required: true,
                message: "请输入表名",
                trigger: "blur"
              }
            ]
          },
          {
            label: "表前缀",
            prop: "tablePrefix",
            rules: [
              {
                required: true,
                message: "请输入表前缀",
                trigger: "blur"
              }
            ]
          },
          {
            label: "包名",
            prop: "packageName",
            overHidden: true,
            span: 24,
            rules: [
              {
                required: true,
                message: "请输入包名",
                trigger: "blur"
              }
            ]
          },
          {
            label: "作者",
            prop: "author",
            hide: true
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
        addBtn: true,
        viewBtn: true,
        delBtn: true,
        editBtn: true
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
    b64toFile(b64Data, filename, contentType) {
      let sliceSize = 512;
      let byteCharacters = atob(b64Data);
      let byteArrays = [];

      for (
        let offset = 0;
        offset < byteCharacters.length;
        offset += sliceSize
      ) {
        let slice = byteCharacters.slice(offset, offset + sliceSize);
        let byteNumbers = new Array(slice.length);

        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        let byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }
      let file = new File(byteArrays, filename, { type: contentType });
      return file;
    },
    rowSave(row, loading, done) {
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
    handleBuild() {
      if (this.selectionList.length === 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      }
      this.$confirm("是否生成选中模块的代码?", {
        title: "代码生成确认",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return build(this.ids);
        })
        .then(res => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          this.$refs.crud.toggleSelection();
          res.data.data.forEach(data => {
            let file = this.b64toFile(
              data.base64,
              "code",
              "application/zip;charset=utf-8"
            );
            let filename =
              data.serviceName +
              "_" +
              data.moduleName +
              "_" +
              data.tableName +
              "_" +
              data.id;
            saveAs(file, "code_" + filename + ".zip");
          });
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
      if (["edit", "view"].includes(type)) {
        getCode(this.form.id).then(res => {
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



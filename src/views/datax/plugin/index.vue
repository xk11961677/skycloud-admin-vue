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
          v-if="permission.elt_manager_btn_del"
        >删 除</el-button>
      </template>
      <template slot-scope="scope" slot="menu">
        <el-button
          type="text"
          size="small"
          icon="el-icon-document-copy"
          v-if="permission.elt_manager_btn_edit"
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
  getOne,
  add,
  update,
  remove,
  copy
} from "@/api/datax/datax-plugin";
import { mapGetters } from "vuex";

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
        dialogHeight: 300,
        tip: false,
        border: true,
        index: true,
        selection: true,
        labelWidth: 120,
        viewBtn: true,
        column: [
          {
            label: "插件类型",
            prop: "pluginType",
            search: true,
            span: 24,
            type: "select",
            dicData: [
              {
                id: "reader",
                name: "reader"
              },
              {
                id: "writer",
                name: "writer"
              }
            ],
            props: {
              label: "name",
              value: "id"
            },
            rules: [
              {
                required: true,
                message: "请选择插件类型",
                trigger: "blur"
              }
            ]
          },
          {
            label: "插件名称",
            prop: "pluginName",
            search: true,
            rules: [
              {
                required: true,
                message: "请输入插件名称",
                trigger: "blur"
              }
            ]
          },
          {
            label: "JSON模板",
            prop: "templateJson",
            rules: [
              {
                required: false
              }
            ]
          },
          {
            label: "备注",
            prop: "comments",
            rules: [
              {
                required: false
              }
            ]
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
        addBtn: this.vaildData(this.permission.elt_manager_btn_add, false),
        viewBtn: this.vaildData(this.permission.elt_manager_btn_view, false),
        delBtn: this.vaildData(this.permission.elt_manager_btn_del, false),
        editBtn: this.vaildData(this.permission.elt_manager_btn_edit, false)
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

<style>
.none-border {
  border: 0;
  background-color: transparent !important;
}
</style>

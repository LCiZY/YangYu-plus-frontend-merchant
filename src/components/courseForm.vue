
<!-- 课程的表单，新增课程、修改课程时可以复用 -->
<template>
  <div>
    <Form
      :model="course"
      ref="courseForm"
      :rules="courseValidate"
      :label-width="120"
    >
      <FormItem
        label="课程封面图"
        prop="courseCoverPicUrl"
        style="text-align: center"
      >
        <img
          v-show="course.courseCoverPicUrl && course.courseCoverPicUrl != ''"
          :src="course.courseCoverPicUrl"
          style="width: 20%"
        />
        <Upload
          ref="uploadCoverPic"
          action="https://api.mumuzi.site/image/upload"
          name="image"
          :on-success="uploadCoverSuccess"
          :on-remove="handleRemoveCoverPic"
          :show-upload-list="true"
          :on-error="uploadFail"
          :format="['jpg', 'jpeg', 'png']"
        >
          <Button icon="ios-cloud-upload-outline">上传封面图</Button>
        </Upload>
      </FormItem>
      <FormItem
        v-if="
          course.courseId != null &&
          course.courseId != undefined &&
          course.courseId != ''
        "
        label="课程ID"
      >
        <Input id="course-id" v-model="course.courseId" disabled></Input>
      </FormItem>
      <FormItem label="课程名" prop="courseName">
        <Input
          v-model="course.courseName"
          maxlength="128"
          show-word-limit
          placeholder="输入课程名称（最长128字）"
        ></Input>
      </FormItem>
      <FormItem label="课程类型" prop="courseType">
        <treeSelect
          style="width: 300px"
          :optionList="typeOptionList"
          :value="course.courseType"
          @change="
            (s) => {
              course.courseType = s;
            }
          "
          :operateVisiable="false"
        ></treeSelect>
      </FormItem>
      <FormItem label="课程对象" prop="courseObject">
        <treeSelect
          style="width: 300px"
          :optionList="courseObjectOptionList"
          :value="course.courseObject"
          @change="
            (s) => {
              course.courseObject = s;
            }
          "
          :operateVisiable="false"
        ></treeSelect>
      </FormItem>
      <FormItem label="课程对象描述" prop="courseSuitableCrowd">
        <Input
          v-model="course.courseSuitableCrowd"
          type="textarea"
          maxlength="256"
          show-word-limit
          placeholder="课程适合人群描述"
        ></Input>
      </FormItem>
      <FormItem label="课程地点" prop="coursePlace">
        <Input
          v-model="course.coursePlace"
          type="textarea"
          maxlength="256"
          show-word-limit
          placeholder="课程地点"
        ></Input>
      </FormItem>
      <FormItem label="课程简介" prop="courseBriefIntro">
        <Input
          v-model="course.courseBriefIntro"
          type="textarea"
          maxlength="2048"
          show-word-limit
          placeholder="输入课程简介（最长2048字）"
        ></Input>
      </FormItem>

      <FormItem label="课程售价" prop="courseSalePrice">
        <Input
          v-model="course.courseSalePrice"
          maxlength="10"
          placeholder="课程售价（精确到两位小数）"
        ></Input>
      </FormItem>
      <FormItem label="课程拼团价" prop="courseGroupSalePrice">
        <Input
          v-model="course.courseGroupSalePrice"
          maxlength="10"
          placeholder="课程拼团价（精确到两位小数）"
        ></Input>
      </FormItem>
      <FormItem label="课程总名额" prop="courseMaxNum">
        <Row>
          <Col span="18">
            <Input
              v-model="course.courseMaxNum"
              :disabled="course.courseNumNotLimit"
              maxlength="6"
              placeholder="输入-1表示无限量"
            ></Input>
          </Col>
          <Col span="4" offset="1">
            <i-switch
              v-model="course.courseNumNotLimit"
              size="large"
              @on-change="changeCourseLimit"
            >
              <span slot="open">不限量</span>
              <span slot="close">限量</span>
            </i-switch>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="课程剩余名额" prop="courseRemainNum">
        <Row>
          <Col span="18">
            <Input
              v-model="course.courseRemainNum"
              :disabled="course.courseNumNotLimit"
              maxlength="6"
              placeholder="输入-1表示无限量"
            ></Input>
          </Col>
          <Col span="4" offset="1"> </Col>
        </Row>
      </FormItem>
      <FormItem label="课程报名时间" prop="courseApplyDate">
        <DatePicker
          type="datetimerange"
          format="yyyy-MM-dd HH:mm"
          placeholder="选择报名时间段"
          style="width: 300px"
          v-model="course.applyTimes"
          @on-change="changeApplyDate"
        ></DatePicker>
      </FormItem>

      <FormItem label="授课时间" prop="courseDate">
        <DatePicker
          type="datetimerange"
          format="yyyy-MM-dd HH:mm"
          placeholder="选择授课时间段"
          style="width: 300px"
          v-model="course.courseTimes"
          @on-change="changeCourseDate"
        ></DatePicker>
      </FormItem>

      <FormItem label="课程图片">
        <div
          class="demo-upload-list"
          v-for="item in course.courseImageUrls"
          :key="item.index"
        >
          <template>
            <img :src="item" />
            <div class="demo-upload-list-cover">
              <Icon
                type="md-arrow-round-back"
                title="左移"
                @click.native="shiftLeft(item)"
              ></Icon>
              <Icon
                type="md-trash"
                title="删除"
                @click.native="handleRemoveImage(item)"
              ></Icon>
              <Icon
                type="md-eye"
                title="查看"
                @click.native="handleViewImage(item)"
              ></Icon>
              <Icon
                type="md-arrow-round-forward"
                title="右移"
                @click.native="shiftRight(item)"
              ></Icon>
            </div>
          </template>
        </div>
        <Upload
          multiple
          ref="upload"
          type="drag"
          action="https://api.mumuzi.site/image/upload"
          name="image"
          :show-upload-list="true"
          :format="['jpg', 'jpeg', 'png']"
          :on-success="uploadSuccess"
          :on-error="uploadFail"
        >
          <div style="padding: 20px 0">
            <Icon
              type="ios-cloud-upload"
              size="52"
              style="color: #3399ff"
            ></Icon>
            <p>点击或将图片拖动到此处上传</p>
          </div>
        </Upload>
      </FormItem>

      <FormItem
        v-for="(item, index) in course.courseSaleProperty"
        :key="index"
        :label="'课程属性' + (1 + index)"
        :prop="'courseSaleProperty.' + index + '.name'"
        :rules="{ required: true, message: '属性值不能为空', trigger: 'blur' }"
      >
        <Row>
          <Col span="9">
            <Input
              type="text"
              v-model="item.name"
              placeholder="输入属性名"
            ></Input>
          </Col>
          <Col span="9" offset="1">
            <Input
              type="text"
              v-model="item.value"
              placeholder="输入属性值"
            ></Input>
          </Col>
          <Col span="4" offset="1">
            <Button @click="handleRemoveProperty(index)">删除</Button>
          </Col>
        </Row>
      </FormItem>
      <FormItem>
        <Row>
          <Col span="4">
            <Button type="dashed" long @click="handleAddProperty" icon="md-add"
              >增加课程属性</Button
            >
          </Col>
        </Row>
      </FormItem>

      <FormItem style="text-align: center">
        <Button
          type="primary"
          :loading="submitLoading"
          :disabled="submitDraftLoading"
          @click="validateFormAndSubmit()"
        >
          <span v-if="!submitLoading">提交</span>
          <span v-else>Loading...</span>
        </Button>
        <Button
          v-if="isCreate || course.courseStatus === 0"
          :loading="submitDraftLoading"
          :disabled="submitLoading"
          @click="validateFormAndSubmit('draft')"
          style="margin-left: 8px"
        >
          <span v-if="!submitDraftLoading">存草稿</span>
          <span v-else>Loading...</span>
        </Button>
      </FormItem>
    </Form>

    <Modal
      fullscreen
      v-model="imagesModal"
      title="课程图片"
      @on-ok="closeModal"
      cancelText=""
    >
      <viewer :images="this.course.courseImageUrls" class="center">
        <img
          style="width: 51%; cursor: pointer"
          title="点击查看大图"
          v-for="src in course.courseImageUrls"
          :src="src"
          :key="src.index"
        />
      </viewer>
    </Modal>
  </div>
</template>


<script>
import { get, post } from "@/api";
import Vue from "vue";
import treeSelect from "./treeSelect.vue";
import { instance } from "./Index.vue";

//价格校验器
const priceValidator = (rule, value, callback) => {
  if (value === 0 || value === "0") {
    callback();
    return;
  }
  value = value + "";
  let reg = /^[1-9]{1}\d*\.\d{1,2}$/;
  let reg1 = /^[1-9]{1}\d*$/;
  if (reg.test(value) || reg1.test(value)) {
    callback();
  } else {
    return callback(new Error("价格格式错误"));
  }
};
//课程总名额、剩余名额校验器
const courseNumberValidator = (rule, value, callback) => {
  if ("-1" == value || "0" == value || 0 == value || -1 == value) {
    callback();
    return;
  }
  value = value + "";
  let reg = /^\d{0,5}$/;
  if (reg.test(value)) {
    callback();
  } else {
    return callback(new Error("格式错误"));
  }
};

export default {
  props: {
    isCreate: {
      // 当前表单是否用于新增课程
      type: Boolean,
      default: true,
    },
    courseId: {
      // 当表单用于修改课程时，外部传入的课程id，用于从数据库查询已有课程并填充到表单中
      type: String,
      default: "",
    },
  },
  components: {
    treeSelect,
  },
  name: "courseForm",
  data() {
    return {
      // 表单绑定的课程
      course: {
        courseId: "",
        merchantId: "",
        courseName: "",
        courseType: "",
        coursePlace: "",
        courseObject: "",
        courseSuitableCrowd: "",
        courseBriefIntro: "",
        courseImageUrls: [],
        courseCoverPicUrl: "",
        courseVideoUrl: "",
        courseSalePrice: "",
        courseGroupSalePrice: "",
        courseApplyDate: 0,
        courseApplyDDLDate: 0,
        courseDate: 0,
        courseDDLDate: 0,
        courseMaxNum: "",
        courseRemainNum: "",
        courseSaleProperty: [],

        //以下变量仅做展示使用
        applyTimes: [],
        courseTimes: [],
        courseNumNotLimit: false, // 课程名额是否不限量
      },

      // 表单校验规则
      courseValidate: {
        courseCoverPicUrl: [
          { required: true, message: "课程封面图不能为空", trigger: "change" },
        ],
        courseName: [
          { required: true, message: "课程名不能为空", trigger: "blur" },
          { type: "string", min: 6, message: "长度不足", trigger: "blur" },
          {
            type: "string",
            max: 128,
            message: "长度超过限制",
            trigger: "blur",
          },
        ],
        courseType: [
          { required: true, message: "课程类型不能为空", trigger: "blur" },
        ],
        courseObject: [
          { required: true, message: "课程对象不能为空", trigger: "blur" },
        ],
        coursePlace: [
          { required: true, message: "课程地点不能为空", trigger: "blur" },
          { type: "string", min: 2, message: "长度不足", trigger: "blur" },
          {
            type: "string",
            max: 256,
            message: "长度超过限制",
            trigger: "blur",
          },
        ],
        courseSuitableCrowd: [
          {
            required: true,
            message: "课程适合人群描述不能为空",
            trigger: "blur",
          },
          { type: "string", min: 2, message: "长度不足", trigger: "blur" },
          {
            type: "string",
            max: 256,
            message: "长度超过限制",
            trigger: "blur",
          },
        ],
        courseBriefIntro: [
          { required: true, message: "课程简介不能为空", trigger: "blur" },
          { type: "string", min: 2, message: "长度不足", trigger: "blur" },
          {
            type: "string",
            max: 2048,
            message: "长度超过限制",
            trigger: "blur",
          },
        ],
        courseSalePrice: [
          {
            required: true,
            type: "number",
            message: "课程售价不能为空",
            trigger: "blur",
          },
          {
            validator: priceValidator,
            message: "价格格式错误",
            trigger: "blur",
          },
        ],
        courseGroupSalePrice: [
          {
            required: true,
            type: "number",
            message: "课程拼团价不能为空",
            trigger: "blur",
          },
          {
            validator: priceValidator,
            message: "价格格式错误",
            trigger: "blur",
          },
        ],
        courseApplyDate: [
          {
            required: true,
            type: "number",
            message: "课程报名时间不能为空",
            trigger: "blur",
          },
        ],
        courseApplyDDLDate: [
          {
            required: true,
            type: "number",
            message: "课程报名时间不能为空",
            trigger: "blur",
          },
        ],
        courseDate: [
          {
            required: true,
            type: "number",
            message: "课程授课时间不能为空",
            trigger: "blur",
          },
        ],
        courseDDLDate: [
          {
            required: true,
            type: "number",
            message: "课程授课时间不能为空",
            trigger: "blur",
          },
        ],
        courseMaxNum: [
          {
            required: true,
            type: "number",
            message: "课程最大名额不能为空",
            trigger: "blur",
          },
          {
            validator: courseNumberValidator,
            message: "格式错误",
            trigger: "blur",
          },
        ],
        courseRemainNum: [
          {
            required: true,
            type: "number",
            message: "课程剩余名额不能为空",
            trigger: "blur",
          },
          {
            validator: courseNumberValidator,
            message: "格式错误",
            trigger: "blur",
          },
        ],
      },
      imagesModal: false,

      typeOptionList: [], // 课程的类型
      courseObjectOptionList: [], //课程对象的类型
      submitLoading: false,
      submitDraftLoading: false,
    };
  },
  watch: {
    courseId: {
      handler: function (val, oldVal) {
        if (!this.isCreate) {
          this.queryCourseById(this.courseId);
        }
      },
    },
  },
  mounted() {
    this.queryCourseCatalog();
    this.queryCourseObject();
    if (this.isCreate) {
      this.setCourseTimeToNow();
    }
  },
  methods: {
    queryCourseById(id) {
      let self = this;
      get("/course4b/queryCourseById", {
        params: { courseId: id },
      })
        .then((res) => {
          // console.log(res);
          res.courseImageUrls = JSON.parse(res.courseImageUrls);
          res.courseSaleProperty = JSON.parse(res.courseSaleProperty);
          self.course = res;
          self.course.applyTimes = [
            new Date(res.courseApplyDate),
            new Date(res.courseApplyDDLDate),
          ];
          self.course.courseTimes = [
            new Date(res.courseDate),
            new Date(res.courseDDLDate),
          ];
          self.course.courseNumNotLimit = res.courseMaxNum == -1;
          console.log(self.course);
        })
        .catch((error) => {
          self.$Message.error("获取课程信息失败。请刷新页面重试！");
        });
    },
    queryCourseCatalog() {
      let self = this;
      get("/course4c/queryCourseCatalog")
        .then((res) => {
          self.typeOptionList = res;
        })
        .catch((error) => {
          console.log("获取课程类目");
        });
    },
    queryCourseObject() {
      let self = this;
      get("/course4c/queryCourseObject")
        .then((res) => {
          self.courseObjectOptionList = res;
        })
        .catch((error) => {
          console.log("获取课程类目");
        });
    },
    validateFormAndSubmit(type) {
      this.$refs["courseForm"].validate((valid) => {
        if (valid || type === "draft") {
          this.submit(type);
        } else {
          this.$Message.error("请检查信息是否填写正确或完整！");
        }
      });
    },

    submit(type) {
      let url = "";
      let self = this;
      if (type === "draft") {
        if (this.isCreate) url = "/course4b/add/draft";
        else url = "/course4b/update/draft";
        this.submitDraftLoading = true;
      } else {
        if (this.isCreate) url = "/course4b/add/audit";
        else url = "/course4b/update/audit";
        this.submitLoading = true;
      }
      let form = new FormData();
      if (!this.isCreate) form.append("courseId", this.course.courseId);
      form.append("merchantId", localStorage.getItem("merchantId"));
      form.append("courseName", this.course.courseName);
      form.append("courseType", this.course.courseType);
      form.append("coursePlace", this.course.coursePlace);
      form.append("courseObject", this.course.courseObject);
      form.append("courseSuitableCrowd", this.course.courseSuitableCrowd);
      form.append("courseBriefIntro", this.course.courseBriefIntro);
      form.append(
        "courseImageUrls",
        JSON.stringify(this.course.courseImageUrls)
      );
      form.append("courseCoverPicUrl", this.course.courseCoverPicUrl);
      form.append("courseVideoUrl", this.course.courseVideoUrl);
      form.append(
        "courseSalePrice",
        this.course.courseSalePrice == "" ? "0" : this.course.courseSalePrice
      );
      form.append(
        "courseGroupSalePrice",
        this.course.courseGroupSalePrice == ""
          ? "0"
          : this.course.courseGroupSalePrice
      );
      form.append("courseApplyDate", this.course.courseApplyDate);
      form.append("courseApplyDDLDate", this.course.courseApplyDDLDate);
      form.append("courseDate", this.course.courseDate);
      form.append("courseDDLDate", this.course.courseDDLDate);
      form.append(
        "courseMaxNum",
        this.course.courseMaxNum == "" ? "0" : this.course.courseMaxNum
      );
      form.append(
        "courseRemainNum",
        this.course.courseRemainNum == "" ? "0" : this.course.courseRemainNum
      );
      form.append(
        "courseSaleProperty",
        JSON.stringify(this.course.courseSaleProperty)
      );
      post(url, form, { headers: { "Content-Type": "multipart/form-data" } })
        .then((res) => {
          console.log("提交结果:", res);
          if (res && res != "" && res.code == 0) {
            self.$Message.success("提交成功");
            self.submitDraftLoading = false;
            self.submitLoading = false;
            console.log("courseId:", res.data);
            let query = { courseId: res.data };
            if (self.isCreate) instance.closeName("addCourse");
            else instance.closeName("updateCourse");
            // instance.gotoPage("courseTable", { courseId: res.data });
            this.$router.push({
              // name: "courseTable",
              path: "courses",
              query: query,
            });
          } else {
            self.$Message.error("提交失败");
          }
        })
        .catch((error) => {
          self.$Message.error("提交失败");
          self.submitDraftLoading = false;
          self.submitLoading = false;
        });
    },

    changeCourseLimit(is) {
      if (is) {
        this.course.courseMaxNum = "-1";
        this.course.courseRemainNum = "-1";
      } else {
        this.course.courseMaxNum = "";
        this.course.courseRemainNum = "";
      }
    },
    changeApplyDate(dates, type) {
      let date0 = new Date(dates[0]);
      this.course.courseApplyDate = date0.valueOf();
      let date1 = new Date(dates[1]);
      this.course.courseApplyDDLDate = date1.valueOf();
      console.log("this.applyTime", this.applyTime);
    },
    changeCourseDate(dates, type) {
      let date0 = new Date(dates[0]);
      this.course.courseDate = date0.valueOf();
      let date1 = new Date(dates[1]);
      this.course.courseDDLDate = date1.valueOf();
      console.log("this.courseTime", this.courseTime);
    },

    handleRemoveCoverPic(file, fileList) {
      //删除封面图的回调
      Vue.set(this.course, "courseCoverPicUrl", "");
    },
    uploadCoverSuccess(response, file, fileList) {
      //上传封面图成功的回调
      if (this.$refs.uploadCoverPic.fileList.length > 1)
        this.$refs.uploadCoverPic.fileList.shift(1);
      Vue.set(this.course, "courseCoverPicUrl", response);
    },
    closeModal() {
      this.imagesModal = false;
    },
    handleViewImage(src) {
      // 查看课程图片，弹出窗口
      this.imagesModal = true;
    },
    handleRemoveImage(src) {
      // 删除某课程图片
      this.course.courseImageUrls.splice(
        this.course.courseImageUrls.indexOf(src),
        1
      );
    },
    uploadSuccess(response, file, fileList) {
      // 某课程图片上传成功
      if (
        response != null &&
        response != undefined &&
        response.startsWith("http")
      ) {
        this.course.courseImageUrls =
          this.course.courseImageUrls.concat(response);
        setTimeout(() => {
          const fileList = this.$refs.upload.fileList;
          this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        }, 1000);
        return;
      }
      console.error("upload failed:", response);
    },
    uploadFail() {
      this.$Message.error("上传失败");
    },
    shiftLeft(src) {
      //将课程图片左移
      let currIndex = this.course.courseImageUrls.indexOf(src);
      if (currIndex == 0) return;
      let temp = this.course.courseImageUrls[currIndex - 1];
      Vue.set(this.course.courseImageUrls, currIndex - 1, src);
      Vue.set(this.course.courseImageUrls, currIndex, temp);
    },
    shiftRight(src) {
      // 将课程图片右移
      let currIndex = this.course.courseImageUrls.indexOf(src);
      if (currIndex == this.course.courseImageUrls.length - 1) return;
      let temp = this.course.courseImageUrls[currIndex + 1];
      Vue.set(this.course.courseImageUrls, currIndex + 1, src);
      Vue.set(this.course.courseImageUrls, currIndex, temp);
    },

    handleAddProperty() {
      this.course.courseSaleProperty.push({
        name: "",
        value: "",
      });
    },
    handleRemoveProperty(index) {
      this.course.courseSaleProperty.splice(index, 1);
      console.log(this.course.courseSaleProperty);
    },
    setCourseTimeToNow() {
      let now = new Date().setHours(0, 0, 0, 0).valueOf();
      this.course.courseApplyDate = now;
      this.course.courseApplyDDLDate = now;
      this.course.courseDate = now;
      this.course.courseDDLDate = now;
    },
  },
};
</script>

<style scoped>
#course-id > input,
#course-id > input[disabled],
#course-id > input:hover {
  cursor: default !important;
  color: #000000 !important;
}
.img-list {
  display: flex;
  height: 100px;
  overflow-x: scroll;
}
.course-img {
  height: 100%;
}
.center {
  text-align: center;
}

.demo-upload-list {
  display: inline-block;
  width: 160px;
  height: 160px;
  text-align: center;
  line-height: 160px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>

"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      list: [{
        number: "\u6D59A1234567"
      }, {
        number: "\u6D59A1234567"
      }]
    };
  },
  computed: {
    showHistory() {
      var _a;
      return ((_a = this.list) == null ? void 0 : _a.length) > 0;
    }
  },
  methods: {
    doScan() {
      common_vendor.index.chooseImage({
        count: 6,
        sizeType: ["original", "compressed"],
        sourceType: ["album"],
        success: function(res) {
          console.log(JSON.stringify(res.tempFilePaths));
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.phoneNumber,
    b: common_vendor.o(($event) => _ctx.phoneNumber = $event.detail.value),
    c: common_vendor.o((...args) => $options.doScan && $options.doScan(...args)),
    d: $options.showHistory
  }, $options.showHistory ? {
    e: common_vendor.f($data.list, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.number)
      };
    })
  } : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5008080e"], ["__file", "C:/Users/zhuyue/Desktop/project/demo/pages/scan/index.vue"]]);
wx.createPage(MiniProgramPage);

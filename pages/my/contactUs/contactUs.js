// contactUs.js
var Bmob = require('../../../utils/bmob.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fankuiData:''
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  bindFankui:function(e){
    var that = this;
    if (e.detail.value != '') {
      that.setData({
        fankuiData: e.detail.value
      })
    }

  },
  bindSubmit: function (){
    var nickName = app.globalData.userInfo.nickName
    console.log(this.data.fankuiData + nickName)
    var fanKui = Bmob.Object.extend("fan_kui");
    var post = new fanKui();
    post.set("content", this.data.fankuiData);
    post.set("nickName", nickName);
    //添加数据，第一个入口参数是null
    post.save(null, {
      success: function (result) {
        // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
        console.log("创建post成功, objectId:" + result.id);
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 3000
        })
      },
      error: function (result, error) {
        // 添加失败
        console.log('创建post失败', result, error);
        wx.showToast({
          title: '提交失败',
          icon: 'error',
          duration: 3000
        })
      }
    });
  }
})
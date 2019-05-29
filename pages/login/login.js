// pages/login/login.js
var Bmob = require('../../utils/bmob.js');
//Bmob.initialize("59c6af950c7ae5ae07df0e5291cdf708", "1be7b1ea080e159e483a330dba10cd07");
Bmob.initialize("9d1199a6c812197a868e08451f475e35", "deab790c4e87f9dcbd9dada8a67f77d4");
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              app.globalData.userInfo = res.userInfo;
              console.log(app.globalData.userInfo)
              wx.login({
                success: function (res) {
                  var user = new Bmob.User();//实例化          
                  user.loginWithWeapp(res.code).then(function (user) {
                    if (user.get("nickName")) {
                      //更新缓存中的openid
                      wx.setStorageSync('openid', user.get("openid"))
                    } else {
                      //*************保存用户其他信息，比如昵称头像之类的*****************
                      wx.getUserInfo({
                        success: function (result) {
                          var nickName = result.userInfo.nickName;
                          var avatarUrl = result.userInfo.avatarUrl;
                          var u = Bmob.Object.extend("_User");
                          var query = new Bmob.Query(u);
                          // 这个 id 是要修改条目的 id，你在生成这个存储并成功时可以获取到，请看前面的文档
                          query.get(user.id, {
                            success: function (result) {
                              // 自动绑定之前的账号
                              result.set('nickName', nickName);
                              result.set("userPic", avatarUrl);
                              result.set("openid", openid);
                              result.save();
                            }
                          });
                        }
                      });
                      //*************保存用户其他信息，比如昵称头像之类的end*****************
                    }
                  }, function (err) {
                    console.log(err, 'errr');
                  });
                }
              });
              wx.switchTab({
                url: '/pages/index/index'
              })
            }
          })
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      console.log(app.globalData.userInfo)
      var newOpenid = wx.getStorageSync('openid')
      if (!newOpenid) {
      var user = new Bmob.User();//开始注册用户
      wx.login({
        success: function (res) {
          user.loginWithWeapp(res.code).then(function (user) {
            var openid = user.get("authData").weapp.openid;
            console.log(user, 'user', user.id, res);

            if (user.get("nickName")) {
              // 第二次访问
              console.log(user.get("nickName"), 'res.get("nickName")');

              wx.setStorageSync('openid', openid)
            } else {
              //保存用户其他信息
              var result = e.detail.userInfo;
                  var userInfo = result;
                  var nickName = userInfo.nickName;
                  var avatarUrl = userInfo.avatarUrl;
                  var gender = userInfo.gender;
                  var u = Bmob.Object.extend("_User");
                  var query = new Bmob.Query(u);
                  // 这个 id 是要修改条目的 id，你在生成这个存储并成功时可以获取到，请看前面的文档
                  query.get(user.id, {
                    success: function (result) {
                      // 自动绑定之前的账号
                      result.set('nickName', nickName);
                      result.set("userPic", avatarUrl);
                      result.set("openid", openid);
                      result.set("gender", gender);
                      result.save();

                    }
                  });        
            }
            wx.switchTab({
              url: '/pages/index/index'
            })

          }, function (err) {
            console.log(err, 'errr');
          });

        }
      });
    } else {
      this.showZanTopTips('很遗憾，您拒绝了微信授权，宝宝很伤心');
      }
    }
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

  }
})
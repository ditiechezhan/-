//index.js
var Bmob = require('../../utils/bmob.js')
var util = require('../../utils/util.js')
var common = require('../../utils/common.js')
var that
Page({
  data: {
    limit: 2,
    skip: 0,
    postList: [],
    imgUrls: [
      'http://hbimg.b0.upaiyun.com/69c1e587729088bf34d7bd5fa6b56d78c572334d42b1-Jk8qA5_fw658',
      'http://hbimg.b0.upaiyun.com/69c1e587729088bf34d7bd5fa6b56d78c572334d42b1-Jk8qA5_fw658',
      'http://hbimg.b0.upaiyun.com/69c1e587729088bf34d7bd5fa6b56d78c572334d42b1-Jk8qA5_fw658'
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 800
  },

  onLoad: function () {
    that = this;
    var Post = Bmob.Object.extend("post");
    var query = new Bmob.Query(Post);
    query.descending('updatedAt');
    query.limit(this.data.limit);
    query.find({
      success: function (results) {
        that.setData({
          postList: results,
          skip: results.length
        })
      },
      error: function (error) {
        console.log("onLoad查询post失败: " + error.code + " " + error.message);
      }
    })

  },

  onPullDownRefresh: function () {
    var Post = Bmob.Object.extend("post");
    var query = new Bmob.Query(Post);
    query.descending('updatedAt');
    query.limit(this.data.limit);
    query.find({
      success: function (results) {
        that.setData({
          postList: results,
          skip: results.length
        })
      },
      error: function (error) {
        console.log("onLoad查询post失败: " + error.code + " " + error.message);
      }
    })

  },

  onReachBottom: function () {
    var Post = Bmob.Object.extend("post");
    var query = new Bmob.Query(Post);
    query.descending('updatedAt');
    query.skip(this.data.skip);
    query.limit(this.data.limit);
    query.find({
      success: function (results) {
        if (results.length > 0) {
          var nl = that.data.postList.concat(results);
          that.setData({
            skip: that.data.skip + results.length,
            postList: nl
          })
        }
        else {
          wx.showToast({
            title: '已全部加载',
            icon: 'success',
            duration: 3000
          })
        }
        wx.stopPullDownRefresh()
      },
      error: function (error) {
        console.log("onReachBottom查询post失败: " + error.code + " " + error.message);
      }
    })
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
    var Post = Bmob.Object.extend("post");
    var query = new Bmob.Query(Post);
    query.descending('updatedAt');
    query.limit(this.data.limit);
    query.find({
      success: function (results) {
        that.setData({
          postList: results,
          skip: results.length
        })
      },
      error: function (error) {
        console.log("hideInput查询post失败: " + error.code + " " + error.message);
      }
    })
  },

  clearInput: function () {
    this.setData({
      inputVal: ""
    });
    var Post = Bmob.Object.extend("post");
    var query = new Bmob.Query(Post);
    query.descending('updatedAt');
    query.limit(this.data.limit);
    query.find({
      success: function (results) {
        that.setData({
          postList: results,
          skip: results.length
        })
      },
      error: function (error) {
        console.log("clearInput查询post失败: " + error.code + " " + error.message);
      }
    })
  },

  bindSearch: function (e) {
    this.getList(e.detail.value);
    console.log(e.detail.value)
    this.setData({
      inputVal: e.detail.value
    });
  },

  getList: function (k) {
    var Post = Bmob.Object.extend("post");
    var queryBookName = new Bmob.Query(Post);
    var queryISBN = new Bmob.Query(Post);
    var queryCourseName = new Bmob.Query(Post);
    queryBookName.equalTo("bookName", k);
    queryISBN.equalTo("bookISBN",k)
    queryCourseName.equalTo("courseName", k)
    var mainQuery = Bmob.Query.or(queryBookName, queryISBN,queryCourseName);
    mainQuery.descending('updatedAt');
    //mainQuery.limit(this.data.limit);
    mainQuery.find({
      success: function (results) {
        console.log(results)
        that.setData({
          postList: results
        })
      },
      error: function (error) {
        console.log("getList查询pos失败: " + error.code + " " + error.message);
      }
    });
  },
  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
    this.onLoad();
  },

})

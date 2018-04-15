//跨浏览器事件绑定
function addEventHandler (ele, type, handler) {
  if (ele.addEventListener) {
    ele.addEventListener(type, handler, false);
  } else if (ele.attachEvent) {
    ele.attachEvent('on' + type, handler);
  } else {
    ele['on' + type] = handler;
  }
}

//焦点轮播图
(function () {
  var container = document.getElementById('bannerContainer');
  var imgContainer = document.getElementById('imgContainer');
  var btns = document.querySelector('.banner-btns').getElementsByTagName('span');//小圆点按钮
  var prev = document.getElementById('prev');
  var next = document.getElementById('next');
  var btnIndex = 1;//小圆点按钮索引
  var imgWidth = 1240;//图片宽度，即轮播区宽度
  var timer;//定时器

 /**
  * 滚动控制
  * @param {number} offset 偏移量
  */
  function animate (offset) {
    var newLeft = parseInt(imgContainer.style.left) + offset;
    //判断偏移量
    if (newLeft > 0) {
      newLeft = -3720;
    }
    if (newLeft < -3720) {
      newLeft = 0;
    }
    imgContainer.style.left = newLeft + 'px';
  }

  function play () {
    //轮播定时器
    timer = setInterval(function () {
      next.click();
    }, 3000);
  }

  function stop () {
    //停止轮播
    clearInterval(timer);
  }

  function buttonShow () {
    //清除之前的小圆点样式
    for (var i = 0; i < btns.length; i++) {
      if (btns[i].className == 'on') {
        btns[i].className = '';
      }
    }
    btns[btnIndex-1].className = 'on';
  }

  //前后图片控制按钮事件绑定
  addEventHandler(prev, 'click', function () {
    btnIndex -= 1;
    if (btnIndex < 1) {
      btnIndex = 4;
    }
    buttonShow();
    animate(imgWidth);
  });
  addEventHandler(next, 'click', function () {
    btnIndex += 1;
    if (btnIndex > 4) {
      btnIndex = 1;
    }
    buttonShow();
    animate(-imgWidth);
  });

  //鼠标悬停轮播区时停止轮播、鼠标移出后继续开始
  addEventHandler(container, 'mouseover', stop);
  addEventHandler(container, 'mouseout', play);

  //点击小圆点时跳转到对应图片
  Array.prototype.forEach.call(btns,function (item, index) {
    addEventHandler(item, 'click', function () {
      var clickIndex = parseInt(item.getAttribute('index'));//当前点击的小圆点按钮索引
      var offset = (btnIndex - clickIndex) * 1240;
      animate(offset);
      btnIndex = clickIndex;
      buttonShow();
    });
  });

  play();
})();

//按钮控制内容显示
(function () {
  var list = document.querySelector('.star-list');
  var btns = document.querySelectorAll('.ctrl-btn');
  var prevBtn = btns[0];
  var nextBtn = btns[1];

  addEventHandler(prevBtn, 'click', function () {
    list.style.marginLeft = 0;
    prevBtn.disabled = true;//按钮解除禁用
    nextBtn.disabled = false;//按钮禁用
  });

  addEventHandler(nextBtn, 'click', function () {
    list.style.marginLeft = -1250 + 'px';
    prevBtn.disabled = false;//按钮禁用
    nextBtn.disabled = true;//按钮解除禁用
  });
})();

/**
 * @class 鼠标悬停选项页标题时切换到相应选项页内容
 * @param {string} id 选项页容器的id
 */
var Tab = function (id) {
  this.container =  document.getElementById(id);
  this.tabList = this.container.querySelector('.tab-list');//选项页标题列表
  this.tabs = this.tabList.getElementsByTagName('li');//选项页标题
  this.tabContent = this.container.querySelector('.tab-content');//选项页容器
  this.tabItems = this.tabContent.getElementsByTagName('ul');//选项页

  this.init();
};

Tab.prototype = {
  init: function () {
    var self = this;

    Array.prototype.forEach.call(this.tabs, function (item, index) {
      //选项页标题事件绑定
      addEventHandler(item, 'mouseover', function () {
        for (var i = 0; i < 4; i++) {//清除之前样式
          self.tabs[i].className = self.tabs[i].className.replace(/\s*on/, '');
          self.tabItems[i].className = self.tabItems[i].className.replace(/\s*show/, '');
        }
        self.tabs[index].className += ' on';
        self.tabItems[index].className += ' show';
      });
    });
  }
};

var tab1 = new Tab('match');//页面搭配区选项页
var tab3 = new Tab('comment');//页面热评产品区选项页
/**
 * Created by Administrator on 2017/2/19.
 */
var rollObj = {
    data: [
        {src: 'images/carousel_01.jpg', href: '#1', title: 'First picture balabala...'},
        {src: 'images/carousel_02.jpg', href: '#2', title: 'Second picture balabala...'},
        {src: 'images/carousel_03.jpg', href: '#3', title: 'Third picture balabala...'},
        {src: 'images/carousel_04.jpg', href: '#4', title: 'Fourth picture balabala...'},
        {src: 'images/carousel_05.jpg', href: '#5', title: 'Fifth picture balabala...'},
    ],
    imgNum: 3,
    rolling: function () {
        var carousel = document.getElementsByClassName('carousel')[0];
        var prevBtn = document.getElementsByClassName('prevBtn')[0];
        var nextBtn = document.getElementsByClassName('nextBtn')[0];
        var imgWrap = document.getElementsByClassName('imgWrap')[0];
        var txtWrap = document.getElementsByClassName('txtWrap')[0];
        var smallBtnWrap = document.getElementsByClassName('smallBtnWrap')[0];
        var w = carousel.scrollWidth || carousel.clientWidth;

        //首次加载预设
        var imgStr = '', txtStr = '', smallBtnStr = '', isCurrent = '';
        for (var i = 0; i < this.imgNum; i++) {
            imgStr += '<li style="left:' + (i - 1) * w + 'px"><a href="' + this.data[i].href + '" ><img src="' + this.data[i].src + '"></a></li>';//创建图片li组同时设定每个图片li初始位置
            isCurrent = (i == 0 ? 'txtCurrent' : '');//给第一个标题li增加选中样式
            txtStr += '<li class="' + isCurrent + '"><h5>' + this.data[i].title + '</h5></li>';//创建标题li组
            isCurrent = (i == 0 ? 'smallBtnCurrent' : '');//给第一个小圆圈按钮增加选中样式
            smallBtnStr += '<b class="' + isCurrent + '"></b>';//创建小圆圈按钮li组
        }
        imgWrap.innerHTML = imgStr;
        txtWrap.innerHTML = txtStr;
        smallBtnWrap.innerHTML = smallBtnStr;

        var imgArr = imgWrap.getElementsByTagName('li');
        var txtArr = txtWrap.getElementsByTagName('li');
        var smallBtnArr = smallBtnWrap.getElementsByTagName('b');

        //左向滚动
        function goL() {
            for (i = 0; i < imgArr.length; i++) {
                imgArr[i].className = '';//首先移除lowIndex类
                var lf = parseInt(imgArr[i].style.left);
                lf -= w;
                imgArr[i].style.left = lf + 'px';
                if (parseInt(imgArr[i].style.left) < -w) {//判断一旦某个li移动到了父元素左侧预设的距离极限
                    imgArr[i].className = 'lowIndex';//首先增加lowIndex类降低z-index
                    imgArr[i].style.left = imgArr.length * w - 2 * w + 'px';//然后移动到最右端
                }
            }
            btnTxtToggle();//调用小圆圈按钮样式与标题切换函数
        }

        //右向滚动
        function goR() {
            for (i = 0; i < imgArr.length; i++) {
                imgArr[i].className = '';
                var lf = parseInt(imgArr[i].style.left);
                lf += w;
                imgArr[i].style.left = lf + 'px';
                if (parseInt(imgArr[i].style.left) > (imgArr.length - 2) * w) {//判断移动到最右端极限位置的li
                    imgArr[i].className = 'lowIndex';
                    imgArr[i].style.left = -w + 'px';//将其移动到允许的最左侧
                }
            }
            btnTxtToggle();//调用小圆圈按钮样式与标题切换函数
        }

        //小圆圈按钮样式与标题切换函数
        function btnTxtToggle() {
            for (var i = 0; i < smallBtnArr.length; i++) {
                smallBtnArr[i].className = '';
                txtArr[i].className = '';
                if (parseInt(imgArr[0].style.left) == 0) {//首先判断当移动至视窗（left值为0）的是第一个li即下标为0的li时
                    smallBtnArr[smallBtnArr.length - 1].className = 'smallBtnCurrent';//最后一个按钮显示选中样式
                    txtArr[txtArr.length - 1].className = 'txtCurrent';//最后一个标题li显现
                }
                else if (parseInt(imgArr[i].style.left) == 0 && i != 0) {//其他情况即只要该li移动到了视窗（left值为0）里并且下标非0
                    smallBtnArr[i - 1].className = 'smallBtnCurrent';//设定对应按钮为选中样式
                    txtArr[i - 1].className = 'txtCurrent';//设定对应按钮的标题li显现
                }
            }
        }

        //小圆圈按钮点击轮播事件
        for (var i = 0; i < smallBtnArr.length; i++) {
            smallBtnArr[i].index = i;
            smallBtnArr[i].onclick = function () {
                for (var i = 0; i < smallBtnArr.length; i++) {
                    smallBtnArr[i].className = '';
                    txtArr[i].className = '';
                }
                this.className = 'smallBtnCurrent';
                txtArr[this.index].className = 'txtCurrent';
                //以上为小圆圈按钮样式控制，下面为小圆圈控制图片变换
                if (this.index == smallBtnArr.length - 1) {//首先判断点击最后一个按钮的情况，因为它对应的是第一个li
                    imgArr[0].style.left = '0';//将第一个li移动至显示窗口
                    imgArr[imgArr.length - 1].className = 'lowIndex';
                    imgArr[imgArr.length - 1].style.left = -w + 'px';//最后一个li移动到视窗左侧
                    var m = 0;//声明值为0的变量准备储存累加的距离值
                    for (var i = 0; i < imgArr.length; i++) {
                        if (i != 0 && i != imgArr.length - 1) {//找出已经确定好位置的之外的li
                            m += w;
                            imgArr[i].style.left = m + 'px';//给其依次设置等加的left距离
                        }
                    }
                }
                else {
                    imgArr[this.index + 1].style.left = '0';//将对应被点中按钮的下标+1的li移动至显示窗口
                    imgArr[this.index].className='';
                    imgArr[this.index].style.left = -w + 'px';//其前面的li移动至视窗左侧
                    var n = 0;
                    for (var i = 0; i < imgArr.length; i++) {
                        if (i > this.index + 1) {//找出已确定位置的两个li的后面的li
                            n += w;
                            imgArr[i].style.left = n + 'px';//给符合条件者设定累加的距离
                        }
                        if (i < this.index) {//找出已确定位置的两个li前面的li
                            imgArr[i].className='lowIndex';
                            imgArr[i].style.left = (imgArr.length - this.index - 1) * w + i * w + 'px';//给其设定预定的left距离
                        }
                    }
                }
            }
        }
        prevBtn.onclick = function () {
            goL();//点击左向按钮，调用左向函数
        }
        nextBtn.onclick = function () {
            goR();//点击右向按钮，调用右向函数
        }
        var myMar = window.setInterval(goL, 3000);//设定计时器
        carousel.onmouseover = function () {//鼠标滑过轮播容器
            window.clearInterval(myMar);
            myMar = null;
        }
        carousel.onmouseout = function () {//鼠标离开轮播容器
            myMar = window.setInterval(goL, 3000);
        }
    }
}
rollObj.rolling();
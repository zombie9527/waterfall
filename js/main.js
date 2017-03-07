(function(window,document){
    var Waterfall = function(){};
    Waterfall.prototype = {
        bindEvent:function(){
            var _this = this;
            window.onscroll = function(){
                if(_this.checkscrollside()){
                    var oParent = document.getElementById('main'),
                        oPin = document.createElement('div'),
                        oBox = document.createElement('div'),
                        oImg = document.createElement('img');
                    oPin.className='pin';
                    oBox.className='box';
                    oImg.src='./images/'+Math.floor(Math.random()*_this.param.imgLength)+'.jpg';
                    oBox.appendChild(oImg);
                    oPin.appendChild(oBox);
                    oParent.appendChild(oPin);
                    _this.flow('main','pin');
                }
            }
            
        },
        /**
         * 判断滚动到的位置
         */
        checkscrollside:function(){
            var _this = this,
                oParent = document.getElementById("main"),
                aPin = _this.getClassObj(oParent,'pin'),
                lastPinH=aPin[aPin.length-1].offsetTop+Math.floor(aPin[aPin.length-1].offsetHeight/2),
                scrollTop=document.documentElement.scrollTop||document.body.scrollTop,
                documentH=document.documentElement.clientHeight;
            return (lastPinH<scrollTop+documentH)?true:false;
        },
        /**
         * 获取 pin高度 最小值的索引index
         */
        getminHIndex:function(arr,minH){
            for(var i in arr){
                if(arr[i]==minH){
                    return i;
        }
    }
        },
        getClassObj:function(parent,className){
            var pinS=[],
                obj=parent.getElementsByTagName('*');
            for (var i=0;i<obj.length;i++) {//遍历子元素、判断类别、压入数组
                if (obj[i].className==className){
                    pinS.push(obj[i]);
                }
            };
            return pinS;
        },
        flow:function(parent,pin){
            var _this = this,
                oParent=document.getElementById(parent),
                aPin=_this.getClassObj(oParent,pin),
                iPinW=aPin[0].offsetWidth,
                num=Math.floor(document.documentElement.clientWidth/iPinW),
                pinHArr=[];
            oParent.style.cssText='width:'+iPinW*num+'px;ma rgin:0 auto;';
            for(var i=0;i<aPin.length;i++){
                var pinH=aPin[i].offsetHeight;
                if(i<num){
                    pinHArr[i]=pinH; 
                }else{
                    var minH=Math.min.apply(null,pinHArr);
                    var minHIndex=_this.getminHIndex(pinHArr,minH);
                    aPin[i].style.position='absolute';
                    aPin[i].style.top=minH+'px';
                    aPin[i].style.left=aPin[minHIndex].offsetLeft+'px';
                    pinHArr[minHIndex]+=aPin[i].offsetHeight;
                }
            }
        }
    }

    Waterfall.init = function(initParam){
        var _this = new this;
        _this.param = initParam;
        _this.flow('main','pin');
        _this.bindEvent();
    }
    window.Waterfall = Waterfall;
})(window,document);
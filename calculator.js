var calcu={
    clsnum:0,//清零的默认值
    num1:0,
    num2:0,//第二次的有效输入数字
    result:0,// 第一次记录的有效数字及 运输后的结果
    plusF:false,//防止重复点击运算符
    n:0,//判断预算符点击的次数
    flag:null,//判断点击的是什么运算符
    b:null,//运算符重新赋值给
    init:function(){
        this.showNum();//在显示框中显示数字；
        this.events();//事件
        this.ys();//点击运算符后运行这个

    },

    showNum:function(){
      var numL=getClassName('num');
      var This=this;
      for(var i=0;i<numL.length;i++){
          numL[i].onclick=function(ev){//点击数字0-9 和.
              var ev=ev||window.event;
              getId('int').value='';
              This.num1+=this.innerHTML;
              This.plusF=true;
              getId('int').value=parseFloat(This.num1);

              if(This.n==0){
                  This.result=parseFloat(getId('int').value);//第一次记录数字；
              }
              //console.log(This.n )
              if(This.n>=1){
                  This.num2=parseFloat(getId('int').value);//第一次记录数字；
                  This.showTxt();
                  //console.log(This.result,This.flag,This.num2)
                  This.b=This.flag;


              }
             // console.log(This.result,This.num2)

          }
      }

    },///把输入的数字显示在input中 ，字符类型


    clsInt:function(){
        getId('int').value=this.clsnum;
        this.num1='';

    },//清零操作

     plus:function(){//加法运算
         if(this.plusF){
             //this.showNum();
             if(this.n>1){
                 this.result+=this.num2;
             }
             //this.clsInt();
             getId('int').value=this.result;
         }
         //console.log(this.result,this.num2)
         this.plusF=false;

     },
    minus:function(){//减法运算
        if(this.plusF){
            //this.n++;
           // console.log('n:'+this.n)
           // this.showNum();
            if(this.n>1){
                this.result-=this.num2;
            }

            //this.clsInt();

            getId('int').value=this.result;

        }
        //console.log(this.result,this.num2)
        this.plusF=false;

    },
    ride:function(){//乘法运算
        if(this.plusF){
            //this.n++;
            //console.log('n:'+this.n)
            //this.showNum();
            //console.log(this.result,this.num2)
            if(this.n>1){
                this.result*=this.num2;
            }
           // this.clsInt();
            getId('int').value=this.result;
        }
        this.plusF=false;

    },
    except:function(){//除法运算
        if(this.plusF){
           // this.n++;
           // console.log('n:'+this.n)
            //this.showNum();
            if(this.n>1){
                this.result/=this.num2;
            }
            //this.clsInt();
            getId('int').value=this.result;
        }
        //console.log(this.result,this.num2)
        this.plusF=false;
    },
    events:function(){//事件操作
        var This=this;
        getId('cls').onclick=function(){
            This.n=0;
            This.clsInt();
            This.result = 0;
            This.num2=0;
            This.showTxt()

        };//清零
        getId('backspace').onclick=function () {
            var l=getId('int').value;
            if(l.length>1){
                This.sliceInt();
            }else{   //删除只剩下一位的时候，在删除就是0
                getId('int').value=0;
                This.num1=0;
            }//删除
        };



    },//事件操作
    showTxt:function(){
      var showT=getId('showId');
      var r=eval(this.result+this.flag+this.num2)
      showT.innerHTML=this.result+this.flag+this.num2+'<br>'+r
    },
    ys:function(){
         var This=this;
         var ays=getClassName('ys');
         for(var i=0;i<ays.length;i++) {

             ays[i].onclick = function () {
                 This.n++;
                 This.flag = this.getAttribute('_p');
                  //  console.log(This.b)
                 if(This.b=='+'){


                     This.plus();


                 }else if(This.b=='-'){
                     //console.log(2)
                     This.minus();

                 }else if(This.b=='*'){
                     //console.log(3)
                     This.ride();

                 }else if(This.b=='/'){
                     //console.log(4)
                     This.except();

                 }
                 This.clsInt();
                 getId('int').value=This.result;

             }
         }

    },

    sliceInt:function(){
        var l=getId('int').value;
        console.log(l.length)
        getId('int').value=getId('int').value.substring(0,l.length-1);
        this.num1=getId('int').value.substring(0,l.length-1);
    }, //每次删除最后一位


}
calcu.init();

function getId(id){//获取id
    return document.getElementById(id)

}

function getClassName(name){
    return document.getElementsByClassName(name)
}

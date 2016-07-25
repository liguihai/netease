(function(){
	//顶部通知条
	var indexHeader_module = (function(){
		var header = $('m-header'),
				close = $('closeTop');

				//刷新页面后通过判断cookie值是否显示提示栏
				header.style.display=MainCookie.getCookie("header");

				MainUtil.addEvent(close,'click',function(){
					header.style.display='none';
					MainCookie.setCookie('header','none',7);
				});
	})();

	

	var indexFollowLogin_module = (function(){
		var uFollow=$('u-follow'),                     //关注按钮
				cancelFollow=$('cancel-follow'),       // 取消关注按钮
				oPop=$('m-pop'),                           //遮罩层块
				oLogin=$('login'),												 //登陆窗口
				oCloseLog=$('closeLogin'),								 //登陆窗关闭标签
				oLoginBtn=$('logBtn'),											//登陆按钮
				aInput=oLogin.getElementsByTagName('input');

				if(MainCookie.getCookie('followSuc') == 1){
					uFollow.style.display='none';
					cancelFollow.style.display='inline-block';
				}

				//点击关注按钮，弹出登录框和遮罩层
				MainUtil.addEvent(uFollow,'click',function(){
					
					if(MainCookie.getCookie("loginSuc") == "studyOnline"){
						uFollow.style.display="none";
						cancelFollow.style.display="inline-block";
					}
					else{
						MainPublic.popUpBox(oPop,oLogin);
					}

				});

				var loginUrl="http://study.163.com/webDev/login.htm",
						oCancelBtn=$('cancelBtn');

				//点击关闭登陆窗按钮
				MainUtil.addEvent(oCloseLog,'click',function(){
					oPop.style.display='none';
					oLogin.style.display='none';
				});

				//点击登陆按钮，登陆账号
				MainUtil.addEvent(oLoginBtn,'click',function(){
					var user=hex_md5(aInput[0].value);
							password=hex_md5(aInput[1].value);
					MainUtil.ajax("GET",loginUrl,MainUtil.getLogin(user,password),LoginSuccess);
				});

				function LoginSuccess(data){
					if(data == 1){
						alert('登陆成功');
						MainCookie.setCookie("loginSuc","studyOnline",1);
						oPop.style.display='none';
						oLogin.style.display='none';
						uFollow.style.display='none';
						cancelFollow.style.display='inline-block';		
						//登陆成功设置关注成功的cookie

						var followUrl="http://study.163.com/webDev/attention.htm";
						MainUtil.ajax("GET",followUrl,"",followSuc);
					}
					else{
						alert("账号密码错误！");
						aInput[1].value=' ';
					}
				};

				function followSuc(data){
					if(data == 1){
						MainCookie.setCookie('followSuc','1',1);
					}
				};
				//点击取消关注按钮
				MainUtil.addEvent(oCancelBtn,'click',function(){
						uFollow.style.display="inline-block";
						cancelFollow.style.display="none";
						MainCookie.removeCookie('followSuc');
				})

	})();


	var indexSlide_module = (function(){
			var oSlideImg=$('slideImg'),
					oImageList=oSlideImg.getElementsByTagName('li'),
					oBtnList=$('btnList'),
					oPrev=$('prev'),
					oNext=$('next'),
					index = 1 ;


			MainUtil.addEvent(oPrev,'click',function(event){
				slideTab(-1);
				showImg(index);
			});
			MainUtil.addEvent(oNext,'click',function(event){
				slideTab(1);
				showImg(index);
			});
			MainUtil.addEvent(oSlideImg,'mouseover',function(){
				clearInterval(timer);
			});
			MainUtil.addEvent(oSlideImg,'mouseout',function(){
				autoPlay();
			});
			MainUtil.addEvent(oBtnList,'click',function(event){
				var event=MainUtil.getEvent(event),
						target=MainUtil.getTarget(event);
					if(target.getAttribute('index') == index && target.nodeName != 'li'){
						return ;
					}
					else{
						index=parseInt(target.getAttribute('index'));
						showImg(index);
					}
			});
			/*图片点击切换函数*/
			function slideTab(i){
				if (i > 0) {
					index++;
					if(index > oImageList.length){
						index=1;
					}
				}
				else{
					index-- ;
					if(index < 1){
						index = oImageList.length;
					}
				}
			};

			/*显示图片函数*/
			function showImg(index){
				var aLi = oBtnList.getElementsByTagName('li');       //获取小圆点点击标签
				
				for(var i=0; i<aLi.length;i++){
					aLi[i].className='';
					oImageList[i].style.opacity = 0;
					oImageList[i].style.transition = 0;
					if(i == index-1){
						oImageList[i].style.display='block';
					}
					else{
						oImageList[i].style.display='none';
					}
					
				}

				aLi[index-1].className='on';
				// oImageList[index-1].style.display='block';	

					setTimeout( function  () {
					oImageList[index-1].style.transition = '0.7s';
					oImageList[index-1].style.opacity = 1;
				},30);
			};
			function autoPlay(){
				timer=setInterval(function(){
				slideTab(1);
				showImg(index);
				},5000);
			};

			autoPlay();

	})();

	var intruduceVideo_module = (function(){
			var oPlayBtn=$('playBtn'),
					oCloseVideo=$('closeVideo'),
					oPop=$('m-pop'),
					oVideoBtn=$('videoBtn');
					oIntroduce=$('m-introduce');

			MainUtil.addEvent(oPlayBtn,'click',function(){
				MainPublic.popUpBox(oPop,oIntroduce);
			});
			MainUtil.addEvent(oCloseVideo,'click',function(){
				if (oVideoBtn.play) {
					oVideoBtn.pause();
				}
				oIntroduce.style.display='none';
				oPop.style.display='none';
			});

			if(navigator.userAgent.indexOf("FireFox")>0){
				return ;
			}
			else
			{
				MainUtil.addEvent(oVideoBtn,'click',function(){
			        if(this.paused){
			          this.play();
			        }else{
			          this.pause();
			        }
			      });
			}		
		})();

	var courseList_module = (function(){
		var oPageNum=$('pageNum');
					oTab = $('tabList'),
					pageNum = 1 ,
					courListURL="https://study.163.com/webDev/couresByCategory.htm",
					aPageList = oPageNum.getElementsByTagName("a");

				 obj = {
						oTab:oTab,
						url:courListURL,
						pageNum: 1
					};
					pageData(obj); 

				//产品，设计切换
				MainUtil.addEvent(oTab,'click',function(event){
					
					var event = MainUtil.getEvent(event),
							target = MainUtil.getTarget(event);

					if(target.className === 'active'){
						return ;
					}
					else{
		        MainUtil.getElementsByClassName(this,'active')[0].className = '';
		        target.className = 'active';                  // 给当前点击标签添加active类名
		        // 下面代码用于去掉页码标签的current样式,无论原来在第几页，点击切换后都是显示页码1
		        pageNum = 1;
		        // 去掉页码<箭头样式及页码的样式
		        MainUtil.getElementsByClassName(oPageNum,'direction')[0].className = '';
		        MainUtil.getElementsByClassName(oPageNum,'current')[0].className = '';
		        aPageList[1].className = 'current';

		        var obj = {
		          oTab: oTab,
		          url: courListURL,
		          pageNum: 1
		        };
		        // 执行pageDate函数获取课程数据并创建列表
						console.log('biancheng');
		        pageData(obj);					
				

					}

				});

			//返回课程数据函数


			/*读取服务器数据返回函数*/
			function courseList(data){
				var data=JSON.parse(data).list,
						oCourse=$('course'),
						courLen = MainUtil.getElementsByClassName(oCourse,'cour-list').length,
						dataLen=data.length;

						
				//当切换的课程数量小于返回的课程数量时，创建新的课程节点
				if (courLen < dataLen) {
					for(var i = courLen; i < dataLen ; i++){
						var div=document.createElement('div'),
								a=document.createElement('a'),
								img1=document.createElement('img'),
								// img2=document.createElement('img')
								h1=document.createElement('h1'),
								h2=document.createElement('h1'),
								span1=document.createElement('span'),
								// span2=document.createElement('span'),
								p=document.createElement('p');
								div.className = 'cour-list',
								a.target='_blank',
								div.appendChild(a);
								a.appendChild(img1),
								a.appendChild(h1);
								div.appendChild(h2);

								div.appendChild(span1);
								p.className = 'money',
								div.appendChild(p);
								oCourse.appendChild(div);
					}
				}
					else if(courLen > dataLen){
						var len = courLen - dataLen;
						for(var i = 0;i < len;i++){
							oCourse.removeChild(oCourse.children[0]);
						}
					}

					//获取列表节点
						courLen = MainUtil.getElementsByClassName(oCourse,'cour-list').length;
						console.log("is " + courLen);
					var oCourseList = MainUtil.getElementsByClassName(oCourse,'cour-list');

					for(var i = 0; i<courLen; i++){
						oCourseList[i].index = i;
		        oCourseList[i].getElementsByTagName('a')[0].href = data[i].providerLink;
		        oCourseList[i].getElementsByTagName('img')[0].src = data[i].middlePhotoUrl;
		        MainUtil.setInnerText(oCourseList[i].getElementsByTagName('h1')[0],data[i].name);
		        MainUtil.setInnerText(oCourseList[i].getElementsByTagName('h1')[1],data[i].provider);
		        MainUtil.setInnerText(oCourseList[i].getElementsByTagName('span')[0],data[i].learnerCount);
		        MainUtil.setInnerText(oCourseList[i].getElementsByTagName('p')[0],"￥" + data[i].price);	
				  }	
					//为每一个添加鼠标移入移出事件
					for(var i = 0; i < courLen; i++){
						oCourseList[i].index = i ;
				oCourseList[i].onmouseenter = function(event){
          // 创建课程浮层显示详细信息
          var oDivF = document.createElement('div');
          oDivF.className = "cour-f-list";                    //给新建浮动层添加cou-f样式
          oDivF.innerHTML = "<a href="+data[this.index].providerLink+" target='_blank'>"+
                      "<div>"+
                        "<img src="+data[this.index].middlePhotoUrl+">"+
                        "<h1>"+data[this.index].name+"</h1>"+
                        "<i></i>"+
                        "<span>"+data[this.index].learnerCount+"人在学"+"</span>"+
                        "<p>"+"发布者:"+data[this.index].provider+"</p>"+
                        "<p>"+"分类：无"+"</p>"+
                      	"</div>"+
                    		"</a>"+
                    		"<p>"+data[this.index].description+"</p>";
          this.appendChild(oDivF);   //将新创建的浮动框添加到该鼠标移入课程中
        		};						
				

        oCourseList[i].onmouseleave = function(){
        	this.removeChild(this.lastChild);
					};
      	}

				
			};

			function pageData(obj){
				var oTab = obj.oTab,
						url = obj.url,
						pageNum = obj.pageNum;

						console.log(MainUtil.getElementsByClassName(oTab,'active')[0].innerHTML);

						//根据窗口宽度来调整每页显示数据多少
					if (MainUtil.getElementsByClassName(oTab,'active')[0].innerHTML === '产品设计') {
								if (MainUtil.getViewport().clientWidth >= 1205) {
									MainUtil.ajax("GET",url,MainUtil.getData(pageNum,20,10),courseList);
									
								}
								else{
									MainUtil.ajax("GET",url,MainUtil.getData(pageNum,15,10),courseList);
								}
					}
					else{
									if (MainUtil.getViewport().clientWidth >= 1205) {
										MainUtil.ajax("GET",url,MainUtil.getData(pageNum,20,20),courseList);
										
									}
									else{
										MainUtil.ajax("GET",url,MainUtil.getData(pageNum,15,20),courseList);
									}
							}
						var oPageNum = $('pageNum');
						var objPage={
								oPage: oPageNum,
								currentPage: pageNum
							};
					MainPublic.page(objPage);
					      
			};			

			//页码切换函数
			function pageFun(){
				MainUtil.getElementsByClassName(oPageNum,'current')[0].className = '';// 去掉页码current样式
	      var obj = {
	        oTab: oTab,
	        url: courListURL,
	        pageNum: pageNum
	      };
				pageData(obj);				   	
	   	};

					//点击页码切换
					MainUtil.addEvent(oPageNum,'click',function(event) {
			      var event = MainUtil.getEvent(event),            // 获取事件对象
			          target = MainUtil.getTarget(event);          // 获取当前点击的元素对象

					      // 如果点击当前页则退出不执行下面操作,避免重复刷新
					      if(target.innerHTML == pageNum){
					        return;
					      }
					      // 点击页码才执行下面赋值及页码变化函数 避免将左右箭头赋值给pageNum
					      if(!isNaN(target.innerHTML)) {
					        pageNum = target.innerHTML;                    // 将当前页码赋值给pageNum
					        pageFun();                                     // 执行页码变化函数
					      }
					});
						

						
    				// 上一页
				    MainUtil.addEvent(aPageList[0],'click',function() {
				   
				      if(pageNum === 1){
				        return;
				      }
				      else{
				      	pageNum --;
				      	pageFun();                                      // 执行页码变化函数
				      }
				    });

				    // // 下一页
				    MainUtil.addEvent(aPageList[9],'click',function() {
				      pageNum++;
				      pageFun();                                      // 执行页码变化函数
				    });
	})();	

	var popular_module = (function(){
		var oPopuList = $('popu-course'),
				popuUrl = "https://study.163.com/webDev/hotcouresByCategory.htm";

		MainUtil.ajax("GET",popuUrl,"",popuData);

		function popuData(results){
			var arrData = JSON.parse(results),
					text = "";
			for(var i = 0;i < arrData.length; i ++){
				text 	+= "<li class='f-clear'>"
							+ "<a href="+arrData[i].providerLink+" target='_blank'>" 
							+ "<img src="+arrData[i].smallPhotoUrl+">"
							+ "<p>"+arrData[i].name+"</p>"
							+ "</a>"
							+ "<div class='Icon'>"
							+"<img src='images/peopleIcon.png'>"
							+ "<span>"+arrData[i].learnerCount+"</span>"
							+"</div>"
							+"</li>" ;
			}

			oPopuList .innerHTML = text ;
		};
		function popuScroll(){
			var oPopuList = $('popu-course');
			// var aLi = oPopuList.getElementsByTagName("li")
			var	timer;
			console.log(oPopuList);
					console.log(oPopuList.style.top);
					// console.log(aLi.length);

			function autoScroll(){
				timer = setInterval(function(){
					if(oPopuList.style.top == '-700px'){
						oPopuList.style.top = 0;
					}
					else{
						oPopuList.style.top = parseFloat(MainUtil.getStyle(oPopuList,'top')) - 70 + 'px' ;
						oPopuList.style.transition = '0.5s';
					}
				},5000);
			};

			autoScroll();
			oPopuList.onmouseover = function(){
				clearInterval( timer );
			};
			oPopuList.onmouseout = function(){
				autoScroll();
			};
		};
		popuScroll();
	})()

})();





























				function $(selector){
					return document.getElementById(selector);
				};

				var MainUtil = {
					
					getEvent: function(event){
						return event?event:window.event ;
					},	

					addEvent: function(element, type, handler){
						if(element.addEventListener){
							element.addEventListener(type, handler, false);
						}
						else if(element.attachEvent){
							element.attachEvent("on"+type, handler);
						}
						else{
							element["on"+type]=handler;
						}
					},
					


					
					getTarget:function(event){
						return event.target || event.srcElement ;
					},

					
					getStyle:function(obj,name){
						if(obj.currentStyle){
							return obj.currentStyle[name];
						}
						else{
							return getComputedStyle(obj,null)[name];
						}
					},

					getElementsByClassName:function(element,names){
						if(element.getElementsByClassName){
							return element.getElementsByClassName(names);
						}
						else{
							var elements=element.getElementsByTagName('*') ,
									result=[],
									flag=false;
									classNameStr;
							names=names.split(' ');
							for( var i=0;i<elements.length;i++){
								classNameStr=' ' + elements[i].className + ' ';
								flag =true ;
								for(var j=0;j<names.length;j++){
									if (classNameStr.indexOf(' '+names[j] + ' ') == -1) {
										break;
										flag=false;
									}
								}
								if(flag){
									result.push(elements[i]);
								}
							}
							return result;	
						}
					},

					getInnerText:function(element){
						return (typeof element.innerText == "string") ? element.innerText : element.textContent;
					},

					setInnerText:function(element,text){
						if(typeof element.innerText == "string"){
							element.innerText=text;
						}
						else{
							element.textContent=text;
						}
					},
				  /**
				   * 获取元素客户区大小函数
				   * document.body：IE7之前版本
				   */
				  getViewport: function() {
				    return {
				      clientWidth: document.documentElement.clientWidth || document.body.clientWidth,
				      clientHeight: document.documentElement.clientHeight || document.body.clientHeight,
				      scrollTop: document.documentElement.scrollTop || document.body.scrollTop,
				      scrollWidth: document.documentElement.scrollWidth || document.body.scrollWidth
				    };
				  },
					preventDefalut:function(event){
						if(event.preventDefalut){
							event.preventDefault();
						}
						else{
							event.returnValue =false;
						}
					},

					stopPropagation:function(event){
						if(event.stopPropagation){
							event.stopPropagation();
						}
						else{
							event.cancelBubble = true ;
						}
					},

					getLogin:function(user,password){
						return "userName=" + user + "&password=" + password + "";  
					},

					getData:function(num,size,typeNum){
						return "pageNo=" + num + "&psize=" + size + "&type=" + typeNum +"";
					},


					ajax:function(method,url,data,success){
						var xhr=null;

						xhr = new XMLHttpRequest();
						xhr.onreadystatechange =function(){
							if(xhr.readyState == 4){
								if((xhr.status >= 200 && xhr.status < 300) || xhr.status==304){
									success && success(xhr.responseText);
								}
								else{
									console.log('Request was unsuccessful: ' + xhr.status);
								}
							}
						}

						if(method == 'GET' && data){
							url += '?' + data;
						}

						xhr.open(method,url,true);

						if (method ==  'GET') {
							xhr.send();
						}
						else{
							xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
							xhr.send(data);
						}
					}
				};

				var MainCookie={
					setCookie:function(name,value,iDay){
						var oDate = new Date();
						oDate.setDate(oDate.getDate() + iDay);
						document.cookie=name + "=" + value +";expires=" + oDate ;
						console.log(name+':cookie设置成功');
					},

					getCookie:function(name){
						var arrs = document.cookie.split("; ");
						for(var i= 0; i<arrs.length; i++ ){
							var arr=arrs[i].split("=");
							if(arr[0] == name){
								console.log(name+':cookie获取成功');
								return arr[1];
							}
						}
					},

					removeCookie:function(name){
						MainCookie.setCookie(name,'',-1);
						console.log(name+':cookie删除成功');
					},

				};

				var MainPublic = {
					page:function(opt){
						if(!opt.oPage){
							return false ;
						}

						var oPage = opt.oPage,
								currentPage = opt.currentPage || 1 ,
								aPageList = oPage.getElementsByTagName('a'),
								totalPage = 8;

								// console.log(opt.oPage.getElementsByTagName('a').length);

							if (aPageList.length === 0){
								var oA1=document.createElement('a');
										oA1.innerHTML='&lt',
										oPage.appendChild(oA1);

										for(var i = 1; i <= totalPage; i++){
											var  oA=document.createElement('a');
														if(i == currentPage){
															oA.className = 'current';
														}
														oA.innerHTML = i;
														oPage.appendChild(oA);
										}
										//创建下一页箭头 >
								var oA2=document.createElement('a');
										oA2.innerHTML='&gt',
										oA2.className = 'direction',
										oPage.appendChild(oA2);
							}
							else{

								aPageList = oPage.getElementsByTagName('a');

								if(currentPage > 1){
									aPageList[0].className = 'direction';
								}
								else{
									aPageList[0].className = '';
								}

								if(currentPage < totalPage -2){
									for(var i = 1;i <= totalPage;i++){
										if(i == currentPage){
											aPageList[i].className = 'current'
										}
										aPageList[i].innerHTML = i;
									}
								}
								else{
									var start = currentPage -4,
											j=1;
											totalPage = start + 7 ;
											for(var i=start;i<=totalPage;i++){

												if(currentPage == i){
													aPageList[j].className='current';
												}
												else{
													aPageList[j].className='';
												}
												aPageList[j].innerHTML=i ;
												j++;
											}
								}

								if(currentPage < totalPage){
									aPageList[aPageList.length - 1].className='direction';
								}
								else{
									aPageList[aPageList.length - 1].className='';
								}
							} 
					},

					popUpBox:function(pop,obj){
						pop.style.display='block';
						obj.style.display="block";

					}
				};

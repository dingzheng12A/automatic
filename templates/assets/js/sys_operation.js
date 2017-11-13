$(document).ready(function(){
	$("#quit").click(function(){
		 $.ajax({
                                type: 'get',
                                url:'/logout',
                                //data:{'username':username,'pwd':pwd},
                                //cache:false,
                                //dataType: 'json',
								success: function(data){
								window.location.href = "/";
                                }
                             
		});
	});
	$("#settings").click(function(){
		$(".top").css({"display":"block","opacity":"0.5"});
		$(".resetpass").css("display","block");
		$(".resetpass #oldpass").bind("input propertychange change",function(event){
				var oldpass=$(".resetpass #oldpass").val();
				var newpass=$(".resetpass #newpass").val();
				var reptpass=$(".resetpass #reptpass").val();
						
				if (oldpass.length!=0&&newpass.length!=0&&(newpass==reptpass)){
					$(".resetpass #modify").attr("disabled",false);
				}else{
					//	alert('xxxx');
						$(".resetpass #modify").attr("disabled",true);
				};
		});
		
		$(".resetpass #newpass").bind("input propertychange change",function(event){
				var oldpass=$(".resetpass #oldpass").val();
				var newpass=$(".resetpass #newpass").val();
				var reptpass=$(".resetpass #reptpass").val();
						
				if (oldpass.length!=0&&newpass.length!=0&&(newpass==reptpass)){
					$(".resetpass #modify").attr("disabled",false);
				}else{
					//	alert('xxxx');
						$(".resetpass #modify").attr("disabled",true);
				};
		});
		
		
		$(".resetpass #reptpass").bind("input propertychange change",function(event){
				var oldpass=$(".resetpass #oldpass").val();
				var newpass=$(".resetpass #newpass").val();
				var reptpass=$(".resetpass #reptpass").val();
						
				if (reptpass.length!=0){
					$(".resetpass #modify").attr("disabled",false);
				}else{
					//	alert('xxxx');
						$(".resetpass #modify").attr("disabled",true);
				};
		});
		
		$(".resetpass #reptpass").blur(function(event){
				var oldpass=$(".resetpass #oldpass").val();
				var newpass=$(".resetpass #newpass").val();
				var reptpass=$(".resetpass #reptpass").val();
						
				if (newpass==reptpass){
					$(".resetpass #modify").attr("disabled",false);
				}else{
						alert('两次输入的密码不一致！');
						$(".resetpass #reptpass").val('');
						$(".reptpass #reptpass").focus();
						$(".resetpass #modify").attr("disabled",true);
				};
		});
		
		$(".resetpass #modify").click(function(event){
				var username=$("#username").val();
				var oldpass=$(".resetpass #oldpass").val();
				var newpass=$(".resetpass #newpass").val();
				$.ajax({
                                type: 'post',
                                url:'/resetpass',
                                data:{'username':username,'oldpass':oldpass,'password':newpass},
                                cache:false,
                                dataType: 'json',
								success: function(data){
									if (data.result==0){
										alert("原始密码不正确!");
										$(".resetpass #oldpass").val('');
										$(".resetpass #oldpass").focus();
										$(".resetpass #modify").attr("disabled",true);
									}else{
										alert("密码修改成功,请重新登录.");
										window.location.href='/';
									}
                                }
                             
				});	
		});
		$(".resetpass #cancle").click(function(event){
				$(".top").hide();
				$(".resetpass").hide();
		});
	
	
	});
	//删除用户
	$("#deluser").click(function(){
		// $(".col-xs-12").html("添加用户");
		var index=$("div .row #deluser").index(this);
		$("div #deluser").eq(index).show()
		.siblings().hide();
	
	});
	
	//添加用户
	$("#adduser").click(function(){
		// $(".col-xs-12").html("添加用户");
		var index=$("div .row #adduser").index(this);
		$("div #adduser").eq(index).show()
		.siblings().hide();
	
	});

	$("#add_btn").click(function(){
		$(".top").css({"display":"block","opacity":"0.5"});
		$("#Layer2").css("display","block");
		$("#Layer2 #cancle").click(function(){
			$(".top").hide();
			$("#Layer2").hide();
		});
		
		$("#Layer2 #username").bind("input propertychange change",function(event){
				var username=$("#Layer2 #username").val();
				var nicename=$("#Layer2 #nicename").val();
				var passwd=$("#Layer2 #passwd").val();
				var reptpass=$("#Layer2 #reptpass").val();
				var email=$("#Layer2 #email").val();
		
				if (username.length!=0&& nicename.length!=0&&passwd.length!=0&&reptpass.length!=0&&email.length!=0&&(passwd==reptpass)){
					$("#Layer2 #add").attr("disabled",false);
				}else{
					//	alert('xxxx');
						$("#Layer2 #add").attr("disabled",true);
				};
		});
		$("#Layer2 #nicename").bind("input propertychange change",function(event){
				var username=$("#Layer2 #username").val();
				var nicename=$("#Layer2 #nicename").val();
				var passwd=$("#Layer2 #passwd").val();
				var reptpass=$("#Layer2 #reptpass").val();
				var email=$("#Layer2 #email").val();
		
				if (username.length!=0&& nicename.length!=0&&passwd.length!=0&&reptpass.length!=0&&email.length!=0&&(passwd==reptpass)){
					$("#Layer2 #add").attr("disabled",false);
				}else{
					//	alert('xxxx');
						$("#Layer2 #add").attr("disabled",true);
				};
		});
		$("#Layer2 #passwd").bind("input propertychange change",function(event){
				var username=$("#Layer2 #username").val();
				var nicename=$("#Layer2 #nicename").val();
				var passwd=$("#Layer2 #passwd").val();
				var reptpass=$("#Layer2 #reptpass").val();
				var email=$("#Layer2 #email").val();
		
				if (username.length!=0&& nicename.length!=0&&passwd.length!=0&&reptpass.length!=0&&email.length!=0&&(passwd==reptpass)){
					$("#Layer2 #add").attr("disabled",false);
				}else{
					//	alert('xxxx');
						$("#Layer2 #add").attr("disabled",true);
				};
		});
		
		$("#Layer2 #reptpass").blur(function(event){
					var username=$("#Layer2 #username").val();
					var nicename=$("#Layer2 #nicename").val();
					var passwd=$("#Layer2 #passwd").val();
					var reptpass=$("#Layer2 #reptpass").val();
					var email=$("#Layer2 #email").val();
		
					/* if (username.length!=0&& nicename.length!=0&&passwd.length!=0&&reptpass.length!=0&&email.length!=0&&(passwd==reptpass)){
						$("#Layer2 #add").attr("disabled",false);
					}else{
							alert("两次输入的密码不一致!");
							$("#Layer2 #reptpass").focus();
							$("#Layer2 #add").attr("disabled",true);
					}; */
					if(reptpass!=passwd){
						alert("两次输入的密码不一致!");
						$("#Layer2 #reptpass").focus();
						
						$("#Layer2 #add").attr("disabled",true);
					}else{
						$("#Layer2 #add").attr("disabled",false);
					}
			
		});
		
		$("#Layer2 #email").bind("input propertychange change",function(event){
				var username=$("#Layer2 #username").val();
				var nicename=$("#Layer2 #nicename").val();
				var passwd=$("#Layer2 #passwd").val();
				var reptpass=$("#Layer2 #reptpass").val();
				var email=$("#Layer2 #email").val();
		
				if (username.length!=0&& nicename.length!=0&&passwd.length!=0&&reptpass.length!=0&&email.length!=0&&(passwd==reptpass)){
					$("#Layer2 #add").attr("disabled",false);
				}else{
					//	alert('xxxx');
						$("#Layer2 #add").attr("disabled",true);
				};
		});
		$("#Layer2 #add").click(function(){
			var username=$("#Layer2 #username").val();
			var nicename=$("#Layer2 #nicename").val();
			var passwd=$("#Layer2 #passwd").val();
			var reptpass=$("#Layer2 #reptpass").val();
			var email=$("#Layer2 #email").val();
			if (username.length==0|| nicename.length==0||passwd.length==0||reptpass.length==0||email.length==0){
				alert("用户名和密码不能为空!");
				$("#Layer2 #add").attr("disabled",true);
			}else{
				if(passwd!=reptpass)
				{alert("两次输入的密码不一致");$("#reptpass").focus();$("#Layer2 #add").attr("disabled",true);}
				else{$("#Layer2 #add").attr("disabled",false);}
			};
			
			
		
			$.ajax({
                                type: 'post',
                                url:'/adduser',
                                data:{'username':username,'nickname':nicename,'passwd':passwd,'email':email,},
                                cache:false,
                                dataType: 'json',
                                success: function(data){
										if (data['result']==1){
											alert("添加用户成功！");
											$(".top").hide();
											$("#Layer2").hide();
											$("#userarea").append("<tr border='1'><td width='6%' align='center' bgcolor='#F0F0F0'></td><td width='6%' align='center' bgcolor='#F0F0F0'>"+username+"</td><td width='14%' align='center' bgcolor='#F0F0F0'>"+email+"</td><td width='21%' align='center' bgcolor='#F0F0F0'>启用</td><td width='53%' align='center' bgcolor='#F0F0F0'>修改密码:<input type='password' id='resetpass' name='resetpass' placeholder='重置密码'/>启用/禁用:<input type='checkbox' checked id='enable'>&nbsp;&nbsp;&nbsp;&nbsp;<input type='button' id='commit' name='commit' value='修改'></td></tr>");
											//window.location.href='/main';
											
											
										}else {
											alert("用户已经存在！");
											$("#username").val('');
											$("#nickname").val('');
											$("#passwd").val('');
											$("#reptpass").val('');
											$("#email").val('');
											$("#username").focus();
											$("#Login").attr("disabled",true);
										}
                                        //window.location.href = msg.url;

                                }
			});
		});
		
	
	
		});
		
		
		
		// 表格处理
/*		 $("table tr").each(function(){
			var id=$(this).children('td:eq(0)').text();
			$(this).click(function(){
				 $(this).addClass("selected")
				 .siblings().removeClass('selected');
				 $(this).find("#commit").attr("disabled",false)
				 .siblings().find("#resetpass").attr("disabled",true);
				 $(this).siblings().attr("disabled","disabled");
				 console.log($(this).html());
			})
		});
*/
		//删除用户
		
		$("#deluser table tr").click(function(){
			var $siblings = $(this).siblings('tr');
			$siblings.removeClass("selected").find('input[id="del_single"]').prop('disabled', true);
			$(this).addClass('selected').find('input[id="del_single"]').prop('disabled', false);
			
			
		})
		
		$("#deluser table tr").find("#del_single").click(function(){
			var request=confirm("是否删除用户?");
			var $position=$(this).parent().parent();
			var userId=$(this).parent().siblings().find("#id").val();
			if(request==true){
				$.ajax({
                        type: 'post',
                        url:'/deluser',
                        data:{'userlist':userId},
                        cache:false,
                        dataType: 'json',
						success: function(data){
							$position.hide();
							alert("用户已经删除!");
						
                        }
                     
				});
			};
			
			
		});
		var num=0;
		var userarray=new Array();
		$("#deluser table tr").each(function(){
			var $id=$(this).children("td:eq(0)").find("input");
			$(this).click(function(){
			if ($id.is(":checked")){
				num+=1;
				userarray[num]=$id.val();
				console.log('点击次数:'+num);
				
			
			}else{
				num-=1;
				userarray.splice(num,1);
				console.log('点击次数:'+num);
						
			}
			if(num>0){
				$("#deluser #del_btn").attr("disabled",false);
			}else{
				$("#deluser #del_btn").attr("disabled",true);
			}
			
				
			});
			
			
		})
		//批量删除用户
		$("#deluser #del_btn").click(function(){
			console.log(userarray);
			console.log('点击次数:'+num);
			var request=confirm("是否删除用户?");
			if(request==true){
			$.ajax({
                type: 'post',
                url:'/deluser',
                data:{'userlist':userarray.join(',')},
                cache:false,
                dataType: 'json',
				success: function(data){
				//	$position.hide();
					alert("用户已经删除!");
					$("#deluser table tr").each(function(){
						var $id=$(this).children("td:eq(0)").find("input");
						if ($id.is(":checked")){
							$id.parent().parent().hide();
						}
			
					
			
			
					})
				
                }
                     
			});
			}
			
		});
		
		//删除角色
		
		$("#delrole table tr").click(function(){
			var $siblings = $(this).siblings('tr');
			$siblings.removeClass("selected").find('input[id="delrole_commit"]').prop('disabled', true);
			$(this).addClass('selected').find('input[id="delrole_commit"]').prop('disabled', false);
			
			
		})
		
		$("#delrole table tr").find("#delrole_commit").click(function(){
			var container_users=$(this).parent().parent().children("td:eq(3)").text();
			var $position=$(this).parent().parent();
			var roleId=$(this).parent().siblings().find("#role_id").val();
			if(container_users.length>0){
				alert("角色中包含用户，不能删除!");}
			else{	
			var request=confirm("是否删除角色?");
			
			
			if(request==true){
					$.ajax({
                        type: 'post',
                        url:'/delrole',
                        data:{'rolelist':roleId},
                        cache:false,
                        dataType: 'json',
						success: function(data){
							$position.hide();
							alert("角色已经删除!");
						
                        }
                     
					});
			};
			};
			
			
		});
		var click_num=0;
		var rolearray=new Array();
		$("#delrole table tr").each(function(){
		
			var $id=$(this).children("td:eq(0)").find("input");
			$(this).click(function(){
			if ($id.is(":checked")){
				click_num+=1;
				rolearray[click_num]=$id.val();
				console.log('点击次数:'+click_num);
				
				
			
			}else{
				click_num-=1;
				userarray.splice(click_num,1);
				console.log('点击次数:'+click_num);
						
			}
			if(click_num>0){
				$("#delrole #del_btn").attr("disabled",false);
			}else{
				$("#delrole #del_btn").attr("disabled",true);
			}
			
				
			});
			
			
		})
		//批量删除角色
		$("#delrole #del_btn").click(function(){
			console.log(rolearray);
			console.log('点击次数:'+click_num);
			var request=confirm("是否删除角色?");
			if(request==true){
			$.ajax({
                type: 'post',
                url:'/delrole',
                data:{'rolelist':rolearray.join(',')},
                cache:false,
                dataType: 'json',
				success: function(data){
				//	$position.hide();
					alert("角色已经删除!");
					$("#delrole table tr").each(function(){
						var $id=$(this).children("td:eq(0)").find("input");
						if ($id.is(":checked")){
							$id.parent().parent().hide();
						}
						click_num=0;
			
					
			
			
					})
				
                }
                     
			});
			}
			
		});
		
		
		
		//添加用户
		$("#adduser table tr").click(function(){
			var $siblings = $(this).siblings('tr');
			$siblings.removeClass("selected").find('input').prop('disabled', true);
			$(this).addClass('selected').find('input').prop('disabled', false);
	
			
		})
		
		
		
		$("#adduser table tr").find("#commit").click(function(){
			var $position=$(this).parent().parent();
			var $newpass=$(this).parent().find("#resetpass").val();
			var $status=$(this).parent().find("#enable");
			var $username=$(this).parent().parent().children("td:eq(1)").text();
			console.log("username:"+$username);
			if($status.is(":checked")){
				var enable=1;
				var status="启用";
			}else{
				var enable=0;
				var status="禁用";
			}
			if($newpass.length==0){
					$.ajax({
                        type: 'post',
                        url:'/setpass',
                        data:{'username':$username,'status':enable},
                        cache:false,
                        dataType: 'json',
						success: function(data){
							alert("用户修改成功!");
							
							$position.children("td:eq(3)").text(status);
                        }
                     
					});
			
			}else{
			
				$.ajax({
                        type: 'post',
                        url:'/setpass',
                        data:{'username':$username,'pwd':$newpass,'status':enable},
                        cache:false,
                        dataType: 'json',
						success: function(data){
							alert("用户修改成功!");
							$position.children("td:eq(3)").text(status);
                        }
                     
				});
		
					
			}
		});
		
	//添加角色
	$("#addrole").click(function(){
		// $(".col-xs-12").html("添加用户");
		var index=$("div .row #addrole").index(this);
		$("div #addrole").eq(index).show()
		.siblings().hide();
	
	});
	$("#addrole_btn").click(function(){
		$(".top").css({"display":"block","opacity":"0.5"});
		$("#Layer_role").css("display","block");
		$("#Layer_role #cancle").click(function(){
			$(".top").hide();
			$("#Layer_role").hide();
		});
		$("#Layer_role #rolename").bind("input propertychange change",function(event){
				var rolename=$("#Layer_role #rolename").val();
				var role_desc=$("#Layer_role #role_desc").val();
			
		
				if (rolename.length!=0&& role_desc.length!=0){
					$("#Layer_role #add").attr("disabled",false);
				}else{
					//	alert('xxxx');
					$("#Layer_role #add").attr("disabled",true);
				};
		});
		
		$("#Layer_role #role_desc").bind("input propertychange change",function(event){
				var rolename=$("#Layer_role #rolename").val();
				var role_desc=$("#Layer_role #role_desc").val();
			
		
				if (rolename.length!=0&& role_desc.length!=0){
					$("#Layer_role #add").attr("disabled",false);
				}else{
					//	alert('xxxx');
					$("#Layer_role #add").attr("disabled",true);
				};
		});
		$("#Layer_role #add").click(function(){
			var rolename=$("#Layer_role #rolename").val();
			var role_desc=$("#Layer_role #role_desc").val();
			if (rolename.length==0||role_desc.length==0){
				alert("角色和描述信息都不能为空!");
				$("#Layer_role #add").attr("disabled",true);
			}
			
		
			$.ajax({
                                type: 'post',
                                url:'/addrole',
                                data:{'rolename':rolename,'role_desc':role_desc},
                                cache:false,
                                dataType: 'json',
                                success: function(data){
										if (data['result']==1){
											alert("添加用户成功！");
											$(".top").hide();
											$("#Layer_role").hide();
											$("#rolearea").append("<tr border='1'><td width='6%' align='center' bgcolor='#F0F0F0'></td><td width='6%' align='center' bgcolor='#F0F0F0'>"+rolename+"</td><td width='14%' align='center' bgcolor='#F0F0F0'>"+role_desc+"</td><td width='21%' align='center' bgcolor='#F0F0F0'>没有任何用户</td><td width='53%' align='center' bgcolor='#F0F0F0'><img  src='/images/add_btn.jpg' id='assign' name='assign' height='20' width='20'>&nbsp;&nbsp;&nbsp;<img src='/images/remove.jpg' id='remove' name='remove' height='20' width='20'></td></tr>");
											//window.location.href='/main';
											
											
										}else {
											alert("用户已经存在！");
											$("#username").val('');
											$("#nickname").val('');
											$("#passwd").val('');
											$("#reptpass").val('');
											$("#email").val('');
											$("#username").focus();
											$("#Login").attr("disabled",true);
										}
                                        //window.location.href = msg.url;

                                }
			});
		});
	
		
	});	
	$("table tr").each(function(){
		var $position=$(this);
		var $assign=$(this).find("#assign");
		var $remove=$(this).find("#remove")
		$assign.mouseover(function(e){
			$assign.css({"height":22,'width':22,'border':'1px solid'});
			var $tooltip="<div id='tooltip'>将用户添加到角色。</div>"
			var xx = e.originalEvent.x || e.originalEvent.layerX || 0; 
			var yy = e.originalEvent.y || e.originalEvent.layerY || 0;
			$("body").append($tooltip);
			$("#tooltip").show();
			$("#tooltip").css({'top':yy+2+'px','left':xx+1+'px'})
		}).mouseout(function(e){
			$("#tooltip").hide();
			$assign.css({"height":20,'width':20,'border':0});
		});
		
		
		
		//remove function
		$remove.mouseover(function(e){
			$remove.css({"height":22,'width':22,'border':'1px solid'});
			
			var $tooltip1="<div id='tooltip1'>将用户从角色中移除。</div>"
			var xx = e.originalEvent.x || e.originalEvent.layerX || 0; 
			var yy = e.originalEvent.y || e.originalEvent.layerY || 0;
			$("body").append($tooltip1);
			$("#tooltip1").show();
			$("#tooltip1").css({'top':yy+2+'px','left':xx+1+'px'})
		}).mouseout(function(e){
			$("#tooltip1").hide();
			$remove.css({"height":20,'width':20,'border':0});
		});
		
		
		//关联用户
		var container_users=$position.children("td:eq(3)").text();
		//var current_user='';
		var current_user=container_users;
		$assign.click(function(){
			//alert(current_user);
			$("#userassign tbody").find("#current_user").val(current_user);
			//var $rolename=$assign.parent().parent().children("td:eq(1)").text();
			$(".top").css({"display":"block","opacity":"0.5"});
			$("#Layer_assign").css("display","block");
			$("#Layer_assign #cancle").click(function(){
				$(".top").hide();
			//	$("#userassign tbody").children("tr:eq(0)").children("td:eq(1)").text($rolename);
				$("#Layer_assign").hide();
			});
			$("#Layer_assign #add").click(function(){
			//	$(".top").hide();
			//	$("#userassign tbody").children("tr:eq(0)").children("td:eq(1)").text($rolename);
				var select_user=$("#userassign tbody").find("#select_user").val();
				//if(current_user.indexOf(select_user)<0){
				//	current_user+=select_user+',';
				//}
				if(current_user.indexOf(select_user)<0){
					current_user+=select_user;
					current_user+=',';
				}
				
				$("#userassign tbody").find("#current_user").val(current_user);
				//$("#Layer_assign").hide(current_user);
			});
			var rolename=$position.children("td:eq(1)").text();
			var roleid=$position.children("td:eq(0)").text();
			//var userlist=$("#userassign tbody").find("#current_user").val();
			$("#Layer_assign #confirm").click(function(){
					var userlist=$("#userassign tbody").find("#current_user").val();
					console.log(userlist);
					$.ajax({
                                type: 'post',
                                url:'/assign',
                                data:{'userlist':userlist,'roleid':roleid,'rolename':rolename},
                                cache:false,
                                dataType: 'json',
								success: function(data){
									alert('success!');
									if(data.result==1){
										$(".top").hide();
										$("#Layer_assign").hide();
										var selected=$("table tr[class='selected']");
										var index=selected.index();
										$("table[id='rolearea'] tr:eq("+index+")").children("td:eq(3)").text(userlist);
										
									}
								}
                             
					});
			});
			
		})
		
		
		//移除关联
		
		
		
		$remove.click(function(){
			//$("#userassign tbody").find("#current_user").val(current_user);
			//var $rolename=$assign.parent().parent().children("td:eq(1)").text();
			var selected=$("table tr[class='selected']");
			var index=selected.index();
			var spare_users=$("table[id='rolearea'] tr:eq("+index+")").children("td:eq(3)").text();
			console.log(spare_users.length);
			if(spare_users.length>0){
			$(".top").css({"display":"block","opacity":"0.5"});
			$("#Layer_remove").css("display","block");
			var selected=$("table tr[class='selected']");
			var index=selected.index();
			var spare_users=$("table[id='rolearea'] tr:eq("+index+")").children("td:eq(3)").text();
			$("#userassign tbody").find("#rm_current_user").val(spare_users);
			$("#Layer_remove #cancle").click(function(){
				$(".top").hide();
			//	$("#userassign tbody").children("tr:eq(0)").children("td:eq(1)").text($rolename);
				$("#Layer_remove").hide();
			});
			$("#Layer_remove #remove_assign").click(function(){
			
				var currentUser = $("#userassign tbody").find("#rm_current_user");
				var spare_user=currentUser.val();
				var select_user=$("#userassign tbody").find("#rm_select_user").val();
				// 从当前用户中删除选择的用户
				var newItemStr = removeSelectItem(select_user, spare_user.split(','));
				
				currentUser.val(newItemStr);
				
				
				
				$("#Layer_remove #confirm").click(function(){
					var currentUser=newItemStr;
					var rolename=$position.children("td:eq(1)").text();
					var roleid=$position.children("td:eq(0)").text();
					var request=confirm("确定要移除用户吗?")
					if(request==true){
						$.ajax({
                                type: 'post',
                                url:'/remove_assign',
                                data:{'current_user':currentUser,'roleid':roleid},
                                cache:false,
                                dataType: 'json',
								success: function(data){
									alert('success!');
									$(".top").hide();
									$("#Layer_remove").hide();
									var selected=$("table tr[class='selected']");
									var index=selected.index();
									$("table[id='rolearea'] tr:eq("+index+")").children("td:eq(3)").text(currentUser);
								}
                             
						});
					}
			});
				
			});
			}
			
		})
		
		// 从当前用户中删除选择的用户
		function removeSelectItem(item, itemArr){
			var i,len= itemArr.length,index;
			for(i=0;i<len;i++){
				if(item == itemArr[i]){
					index = i;break;
				}
			}
			if(index !== undefined){
				itemArr.splice(index,1);
			}
			
			return itemArr.join(',');
		}
		
		$("table[id='rolearea'] tr").mouseover(function(){
			var $siblings = $(this).siblings('tr');
			$siblings.removeClass("selected").find('input[id="del_single"]').prop('disabled', true);
			$(this).addClass('selected').find('input[id="del_single"]').prop('disabled', false);
			
			
		})
		
		
		
		
		
			
	});
	
	
	//删除角色
	$("#delrole").click(function(){
		// $(".col-xs-12").html("添加用户");
		var index=$("div .row #delrole").index(this);
		$("div #delrole").eq(index).show()
		.siblings().hide();
	
	});


	//添加菜单
	$("#Add_Menu").click(function(){
                // $(".col-xs-12").html("添加用户");
                var index=$("div .row #add_menu").index(this);
                $("div #add_menu").eq(index).show()
                .siblings().hide();
				
				
				

        });
	$("#add_menu #menu_name").focus();	
	$("#add_menu #menu_name").bind("input propertychange change",function(event){	
		if($("#menu_name").val().length==0){
			$("#add_menu #confirm").attr("disabled",true);
		}else{
			$("#add_menu #confirm").attr("disabled",false);
		}
	});
	$("#add_menu #confirm").click(function(){
		var menu_name=$("#menu_name").val();
		var parent_menu=$("#add_parent_menu").val();
		console.log('parent_id'+parent_menu);
		 $.ajax({
            type: 'post',
            url:'/addmenu',
            data:{'parent_menu':parent_menu,'menu_name':menu_name},
            cache:false,
            dataType: 'json',
			success: function(data){
			alert('菜单添加成功');
			$("select[id='add_parent_menu']").append('<option>'+menu_name+'</option>');
			$("#add_a_menu").append('<li><a href="#" class="dropdown-toggle"><i class="icon-list"></i><span class="menu-text">'+ menu_name+ '</span><b class="arrow icon-angle-down"></b>							</a></li>');
			$("#memu_name").val('');
			$("#menu_name").focus();
			window.location.reload()
         }
                             
});
		
		
	});
	
	
	
	$("#Del_Menu").click(function(){
		$("#Layer_DelMenu").show()
		.siblings().hide();
	});
	//获取子菜单
	$("#parent_menu").click(function(){
			var id=$(this).val();
				$.ajax({
                                type: 'post',
                                url:'/submenu',
                                data:{'menuid':id},
                                cache:false,
                                dataType: 'json',
								success: function(data){
								/*	$.each(data,function(key,value){
										console.log(key+":"+value);
									
									}); */
								$("#child_menu").html('');	
								for ( i = 0, len = data.length; i < len; i++ ) {
									item = data[ i ];
									//console.info( item[ "id" ] , item[ "name" ] ); // 按F12，查看打印到控制台的信息
									$("#child_menu").append("<option value='"+item[ "id" ]+"'>"+item['name']+"</option>" );
									if($("#child_menu").val()===null){
										console.log($("#child_menu").val());
										$("#del_c_menu").attr('disabled',true);
									}else{
										$("#del_c_menu").attr('disabled',false);
									}
    }
                                }
                             
				});
	});
		
	
	//删除子菜单
	$("#del_c_menu").click(function(){
		var parent_id=$("#parent_menu").val();
		var submenu_id=$("#child_menu").val();
		console.log("submenu:"+submenu_id);
		
		var request=confirm("确定要删除子菜单吗？");
		if(request==true){
			$.ajax({
                                type: 'post',
                                url:'/delmenu',
                                data:{'menuid':submenu_id,'pid':parent_id},
                                cache:false,
                                dataType: 'json',
								success: function(data){
								/*	$.each(data,function(key,value){
										console.log(key+":"+value);
									
									}); */
								$("#child_menu").html('');	
									for ( i = 0, len = data.length; i < len; i++ ) {
										item = data[ i ];
									//console.info( item[ "id" ] , item[ "name" ] ); // 按F12，查看打印到控制台的信息
										$("#child_menu").append("<option value='"+item[ "id" ]+"'>"+item['name']+"</option>" );
									}
                                }
                             
			});
			
		}
	});
	$("#child_menu").bind("change propertychange change",function(event){
		alert('xxxx');
		if($(this).val()==null){
			$("#del_c_menu").attr("disabled",true);
		}else{
			$("#del_c_menu").attr("disabled",false);
		}
	})
	//删除父菜单
		$("#del_p_menu").click(function(){
		var parent_id=$("#parent_menu").val();
		var submenu_id=$("#child_menu").val();
		console.log("submenu:"+submenu_id);
		if(submenu_id!=null){alert("菜单中包含有子菜单，不能删除！");}else{
		var request=confirm("确定要删除该菜单吗？");
		if(request==true){
			$.ajax({
                                type: 'post',
                                url:'/delmenu',
                                data:{'menuid':submenu_id,'pid':parent_id},
                                cache:false,
                                dataType: 'json',
								success: function(data){
								/*	$.each(data,function(key,value){
										console.log(key+":"+value);
									
									}); */
								$("#child_menu").html('');	
									for ( i = 0, len = data.length; i < len; i++ ) {
										item = data[ i ];
									//console.info( item[ "id" ] , item[ "name" ] ); // 按F12，查看打印到控制台的信息
										$("#child_menu").append("<option value='"+item[ "id" ]+"'>"+item['name']+"</option>" );
									}
                                }
                             
			});
		}
		}
			
		
		});
		
		
	//分配权限
	$("#alloc_auth").click(function(){
		$("#Layer_auth").show()
		.siblings().hide();
		
	});
	
	$("#alloc_auth_btn").click(function(){
		$(".top").css({"display":"block","opacity":"0.5"});
		$("#authlist").css("display","block");
		$("#autharea").find("#Cancle").click(function(){
			$(".top").hide();
			$("#authlist").hide();
		});
		
		
	})
	
	$("input[id^='p_menu']").click(function(){
		if($(this).is(":checked")==false){
			$(this).parent().siblings().hide();
		}else{
			$(this).parent().siblings().show();
		}
	});
	

})


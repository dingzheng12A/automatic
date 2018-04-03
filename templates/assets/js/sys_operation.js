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
		//增加历史数据查询功能，2018-1-23 10:10
		$("#userlist").html("<table  id='userlist' width='1661' border='1'><tr><td width='6%' align='center' bgcolor='#66b3ff'>id</td><td width='6%' align='center' bgcolor='#66b3ff'>用户名</td><td width='14%' align='center' bgcolor='#66b3ff'>邮箱地址</td><td width='21%' align='center' bgcolor='#66b3ff'>用户状态</td><td width='53%' align='center' bgcolor='#66b3ff'>修改</td></tr></table>");
		var index=$("div .row #deluser").index(this);
		$("div #deluser").eq(index).show()
		.siblings().hide();
		$.getJSON("/queryUser",function(result){
			$.each(result, function(i, data){
				var $status;
				if (data['status']==1){
					$status="启用";
				}else{
					$status="禁用";
				}
				$("#userlist").append("<tr border='1'><td width='6%' align='center'><input type='checkbox' id='id' value='"+data['id']+"'></td><td width='6%' align='center'>"+data['username']+"</td><td width='14%' align='center' >"+data['email']+"</td><td width='21%' align='center' >"+$status+"</td><td width='53%' align='center' ><input type='button' id='del_single' name='del_single' value='删除' disabled></td></tr>");
			});
		});
	
	});
	
	//添加用户
	$("#adduser").click(function(){
		// $(".col-xs-12").html("添加用户");
		//增加历史数据查询功能，2018-1-23 10:10
		$("#userarea").html("<table  id='userarea' width='1661' border='1'><tr><td width='6%' align='center' bgcolor='#66b3ff'>id</td><td width='6%' align='center' bgcolor='#66b3ff'>用户名</td><td width='14%' align='center' bgcolor='#66b3ff'>描述信息</td><td width='21%' align='center' bgcolor='#66b3ff'>用户管理</td><td width='53%' align='center' bgcolor='#66b3ff'>修改用户信息</td></tr>");
		var index=$("div .row #adduser").index(this);
		$("div #adduser").eq(index).show()
		.siblings().hide();
		$.getJSON("/queryUser",function(result){
			$.each(result, function(i, data){
				var $status;
				var $checked;
				if (data['status']==1){
					$status="启用";
					$checked="checked";
					
				}else{
					$status="禁用";
				}
				$("#userarea").append("<tr border='1'><td width='6%' align='center'>"+data['id']+"</td><td width='6%' align='center'>"+data['username']+"</td><td width='14%' align='center' >"+data['email']+"</td><td width='21%' align='center' >"+$status+"</td><td width='53%' align='center' >修改密码:<input type='password' id='resetpass' name='resetpass' placeholder='重置密码'/>启用/禁用:<input type='checkbox'"+$checked+"   id='enable'>&nbsp;&nbsp;&nbsp;&nbsp;<input type='button' id='commit' name='commit' value='修改' disabled></td></tr>");
			});
		});
	
	});

	$("#add_btn").click(function(){
		$(".top").css({"display":"block","opacity":"0.5"});
		$("#Layer2").css("display","block");
		$("#Layer2 input[type='text']").val('');
		$("#Layer2 input[type='password']").val('');
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
											//$("#userarea").append("<tr border='1'><td width='6%' align='center' bgcolor='#F0F0F0'></td><td width='6%' align='center' bgcolor='#F0F0F0'>"+username+"</td><td width='14%' align='center' bgcolor='#F0F0F0'>"+email+"</td><td width='21%' align='center' bgcolor='#F0F0F0'>启用</td><td width='53%' align='center' bgcolor='#F0F0F0'>修改密码:<input type='password' id='resetpass' name='resetpass' placeholder='重置密码'/>启用/禁用:<input type='checkbox' checked id='enable'>&nbsp;&nbsp;&nbsp;&nbsp;<input type='button' id='commit' name='commit' value='修改'></td></tr>");
											//window.location.href='/main';
											$("#userarea").append("<tr border='1'><td width='6%' align='center' bgcolor='#F0F0F0'>"+data['id']+"</td><td width='6%' align='center' bgcolor='#F0F0F0'>"+data['username']+"</td><td width='14%' align='center' bgcolor='#F0F0F0'>"+data['email']+"</td><td width='21%' align='center' bgcolor='#F0F0F0'>启用</td><td width='53%' align='center' bgcolor='#F0F0F0'>修改密码:<input type='password' id='resetpass' name='resetpass' placeholder='重置密码'/>启用/禁用:<input type='checkbox' checked id='enable'>&nbsp;&nbsp;&nbsp;&nbsp;<input type='button' id='commit' name='commit' value='修改'></td></tr>");
											
											
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
		/* $("table tr").each(function(){
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
		
		/*$("#deluser table tr").click(function(){
			var $siblings = $(this).siblings('tr');
			$siblings.removeClass("selected").find('input[id="del_single"]').prop('disabled', true);
			$(this).addClass('selected').find('input[id="del_single"]').prop('disabled', false);
			
			
		})*/
		
		
		$("#deluser table").on("click","tr",function(){
			var $siblings = $(this).siblings('tr');
			$siblings.removeClass("selected").find('input[id="del_single"]').prop('disabled', true);
			$(this).addClass('selected').find('input[id="del_single"]').prop('disabled', false);
		})
		
		
		$("#deluser table").on("click","tr #del_single",function(){
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
		//$("#deluser table tr").each(function(){
		$("#deluser table").on("click","tr  input",function(){
			//var $id=$(this).children("td:eq(0)").find("input");
			//$(this).click(function(){
			//$(this)
			//if ($id.is(":checked")){
			if ($(this).is(":checked")){
				num+=1;
				userarray[num]=$(this).val();
				console.log('点击次数:'+num+"userarray:"+userarray);
				
			
			}else{
				num-=1;
				userarray.splice(num,1);
				console.log('点击次数:'+num+"userarray:"+userarray);
						
			}
			if(num>0){
				$("#deluser #del_btn").attr("disabled",false);
			}else{
				$("#deluser #del_btn").attr("disabled",true);
			}
			
				
			//});
			
			
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
		
		$("#delrole table").on("click","tr",function(){
			var $siblings = $(this).siblings('tr');
			$siblings.removeClass("selected").find('input[id="delrole_commit"]').prop('disabled', true);
			$(this).addClass('selected').find('input[id="delrole_commit"]').prop('disabled', false);
			
			
		})
		
		$("#delrole table").on("click","tr #delrole_commit",function(){
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
/*		var click_num=0;
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
			
			
		}) */
		
		var click_num=0;
		var rolearray=new Array();
		$("#delrole table").on("click","tr input",function(){
			if ($(this).is(":checked")){
				click_num+=1;
				rolearray[click_num]=$(this).val();
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
			
			
		
		//})
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
		$("#adduser table").on("click","tr",function(){
		//	console.log($(this).html());
			var $siblings = $(this).siblings('tr');
			$siblings.removeClass("selected").find('input').prop('disabled', true);
			$(this).addClass('selected').find('input').prop('disabled', false);
	
			
		})
		
		
		
		$("#adduser table").on("click","tr #commit",function(){
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
		$("#rolearea").html("<table  id='rolearea' width='1661' border='1'><tr><td width='6%' align='center' bgcolor='#66b3ff'>id</td><td width='6%' align='center' bgcolor='#66b3ff'>组名</td><td width='14%' align='center' bgcolor='#66b3ff'>描述信息</td><td width='21%' align='center' bgcolor='#66b3ff'>所有用户</td><td width='53%' align='center' bgcolor='#66b3ff'>关联用户</td></tr></table>");
		var index=$("div .row #addrole").index(this);
		$("div #addrole").eq(index).show()
		.siblings().hide();
		$.getJSON("/queryRole",function(result){
			$.each(result, function(i, data){
				if (data['userlist'] == null){
					data['userlist']='';
				};
				$("#rolearea").append("<tr border='1'><td width='6%' align='center'>"+data['id']+"</td><td width='6%' align='center'>"+data['rolename']+"</td><td width='14%' align='center' >"+data['roledesc']+"</td><td width='21%' align='center' >"+data['userlist']+"</td><td width='53%' align='center' ><img  src='/images/add_btn.jpg' id='assign' name='assign' height='20' width='20'>&nbsp;&nbsp;&nbsp;<img src='/images/remove.jpg' id='remove' name='remove' height='20' width='20'></td></td></tr>");
			});
		});
	
	});
	$("#addrole_btn").click(function(){
		$(".top").css({"display":"block","opacity":"0.5"});
		$("#Layer_role").css("display","block");
		$("#Layer_role input[type='text']").val('');
		$("#Layer_role input[type='textarea']").val('');
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
				
					$("#Layer_role #add").attr("disabled",true);
				};
		});
		
		$("#Layer_role #role_desc").bind("input propertychange change",function(event){
				var rolename=$("#Layer_role #rolename").val();
				var role_desc=$("#Layer_role #role_desc").val();
			
		
				if (rolename.length!=0&& role_desc.length!=0){
					$("#Layer_role #add").attr("disabled",false);
				}else{
		
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
//	$("table[id='rolearea'] tr").each(function(){
		var $position=$(this);
		var $assign=$(this).find("#assign");
		var $remove=$(this).find("#remove")
		$("table[id='rolearea']").on("mouseover","tr",function(){
			var $siblings = $(this).siblings('tr');
			$siblings.removeClass("selected").find('input[id="del_single"]').prop('disabled', true);
			$(this).addClass('selected').find('input[id="del_single"]').prop('disabled', false);
		});
		$("table[id='rolearea']").on("mouseover","tr #assign",function(e){
			$(this).children("tr #assign").css({"height":22,'width':22,'border':'1px solid'});
			var $tooltip="<div id='tooltip'>将用户添加到角色。</div>"
			var xx = e.originalEvent.x || e.originalEvent.layerX || 0; 
			var yy = e.originalEvent.y || e.originalEvent.layerY || 0;
			$("body").append($tooltip);
			$("#tooltip").show();
			$("#tooltip").css({'top':yy+2+'px','left':xx+1+'px'})
		}).on("mouseout",function(e){
			$("#tooltip").hide();
			$(this).find("#assign").css({"height":20,'width':20,'border':0});
		});
		
		
		
		//remove function
		$("table[id='rolearea']").on("mouseover","tr #remove",function(e){
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
	
		
		//console.log(333);
		$("table[id='rolearea']").on("click","tr #assign",function(e){
			var $selected=$("table[id='rolearea'] tr[class='selected']");
			var index=$selected.index();
			var container_users=$("table[id='rolearea'] tr:eq("+index+")").children("td:eq(3)").text();;
			var current_user;
		//var current_user='';
			if(container_users.length==0){
				current_user=container_users;
			}else{
				current_user=container_users;
				current_user+=',';
			}
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
			var rolename=$selected.children("td:eq(1)").text();
			var roleid=$selected.children("td:eq(0)").text();
			
			$("#Layer_assign #confirm").off('click').on('click',function(){
				console.log("rolename:"+rolename);
				var userlist=$("#userassign tbody").find("#current_user").val();
				console.log(userlist);
				$.ajax({
							type: 'post',
							url:'/assign',
							data:{'userlist':userlist,'roleid':roleid,'rolename':rolename},
							cache:false,
							dataType: 'json',
							success: function(data){
									if(data.result==1){
									alert('success!');
									$(".top").hide();
									$("#Layer_assign").hide();
									//$(this).parent().parent().hide();
									var selected=$("table tr[class='selected']");
									var index=selected.index();
									$("table[id='rolearea'] tr:eq("+index+")").children("td:eq(3)").text(userlist);
									
								}
							}
						 
				});
			})
		
			
})

	
//新增加关联用户和角色的写法	
			
		
		
		//移除关联
		
		
		
		$("table[id='rolearea']").on("click","tr #remove",function(e){
			console.log("rolearea remove!");
			//$("#userassign tbody").find("#current_user").val(current_user);
			//var $rolename=$assign.parent().parent().children("td:eq(1)").text();
			var $selected=$("table[id='rolearea'] tr[class='selected']");
			var index=$selected.index();
			var spare_users=$("table[id='rolearea'] tr:eq("+index+")").children("td:eq(3)").text();
			console.log("spare_users:");
			if(spare_users.length>0){
			$(".top").css({"display":"block","opacity":"0.5"});
			$("#Layer_remove").css("display","block");
			//var selected=$("table tr[class='selected']");
			var index=$selected.index();
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
				
				
				
				$("#Layer_remove #confirm").off('click').on('click',function(){
					var currentUser=newItemStr;
					var rolename=$selected.children("td:eq(1)").text();
					var roleid=$selected.children("td:eq(0)").text();
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

				})										
				
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
		
		
		
		
		
			
	
	
	
	//删除角色
	$("#delrole").click(function(){
		// $(".col-xs-12").html("添加用户");
		var index=$("div .row #delrole").index(this);
		$("#delrole table[id='rolelist']").html("<table  id='rolelist' width='1661' border='1'><tr><td width='6%' align='center' bgcolor='#66b3ff'>id</td><td width='6%' align='center' bgcolor='#66b3ff'>角色</td><td width='14%' align='center' bgcolor='#66b3ff'>描述信息</td><td width='21%' align='center' bgcolor='#66b3ff'>所有用户</td><td width='53%' align='center' bgcolor='#66b3ff'>删除</td></tr>");
		$("div #delrole").eq(index).show()
		.siblings().hide();
	
		$.getJSON("/queryRole",function(result){
				$.each(result, function(i, data){
					var $userlist;
					var $status;
					if (data['userlist']!=null){
						$status="disabled";
						$userlist=data['userlist'];
					}else{
						$status="";
						$userlist="";
					}
					$("#delrole table[id='rolelist']").append("<tr border='1'><td width='6%' align='center'><input type='checkbox' id='role_id' value='"+data['id']+"' "+$status+"></td>"+"<td width='6%' align='center'>"+data['rolename']+"</td>"+"<td width='14%' align='center' >"+data['roledesc']+"</td><td width='21%' align='center' >"+$userlist+"</td><td width='53%' align='center' >&nbsp;&nbsp;&nbsp;&nbsp;<input type='button' id='delrole_commit' name='delrole_commit' value='删除' disabled></td></td></tr>");
				});
		});
		
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
		var menu_id=$("#menu_id").val();
		console.log('parent_id'+parent_menu);
		 $.ajax({
            type: 'post',
            url:'/addmenu',
            data:{'parent_menu':parent_menu,'menu_name':menu_name,'menu_id':menu_id},
            cache:false,
            dataType: 'json',
			success: function(data){
			alert('菜单添加成功');
			$("select[id='add_parent_menu']").append('<option>'+menu_name+'</option>');
			$("#add_a_menu").append('<li><a href="#" class="dropdown-toggle"><i class="icon-list"></i><span class="menu-text">'+ menu_name+ '</span><b class="arrow icon-angle-down"></b>							</a></li>');
			$("#memu_name").val('');
			$("#menu_name").focus();
			window.location.reload();
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
								$("#parent_menu").html('');	
								for ( i = 0, len = data.length; i < len; i++ ) {
									item = data[ i ];
									//console.info( item[ "id" ] , item[ "name" ] ); // 按F12，查看打印到控制台的信息
										$("#parent_menu").append("<option value='"+item[ "id" ]+"'>"+item['name']+"</option>" );
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
		$.getJSON("/queryRole",function(result){
			$("select[id='rolelist']").empty();
			$("select[id='rolelist']").html('<select name="rolelist" id="rolelist"></select>');
			$.each(result, function(i, data){
				$("select[id='rolelist']").append("<option value='"+data['id']+"'>"+data['rolename']+"</option>");
			});
		});
	});
	
	
	$("#alloc_auth_btn").click(function(){
	/*	$(".top").css({"display":"block","opacity":"0.5"});
		$("#authlist").css("display","block");
		$("#autharea").find("#Cancle").click(function(){
			$(".top").hide();
			$("#authlist").hide();
		});
	*/	
	
		
		$.ajax({
                                type: 'post',
                                url:'/getids',
                                data:{'roleid':$("#rolelist").val()},
                                cache:false,
                                dataType: 'json',
								success: function(data){
									var i=0;len=data.idslist.length;
									var unchecked=new Array(),j=0;
									$(".top").css({"display":"block","opacity":"0.5"});
									$("#autharea").css("display","block");
									$("#authlist").css("display","block");
									console.log(data.idslist);
									$("#authlist input[type='checkbox']").prop('checked', false);
									for(i=0;i<len;i++){
										$("#authlist input[type='checkbox'][value='"+data.idslist[i]+"']").prop('checked', true);
										
									}
									
									
									
								/*if(data.result==1){
										alert("权限修改成功!");
										$("#autharea").hide();
										$(".top").hide();
									}else{
										alert("出现错误，请联系管理员!");
									}
								*/
                                }
                             
		});
		
		

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
	
	$("#autharea #Confirm").click(function(){
		var Autharray=new Array();
		var select_num=0;
		var request=confirm("确定提交修改吗?");
		if(request==true){
			$("#authlist table input[type='checkbox']").each(function(){
			//var CheckBox=$(this).find("input[type='checkbox']");
			//$(CheckBox).attr("checked",true);
			
			
			if($(this).is(":checked")){
				if($(this).val().length>0){
					Autharray[select_num]=$(this).val();
					select_num+=1;
				}
			}
			});

				$.ajax({
                                type: 'post',
                                url:'/modifyauth',
                                data:{'ids':Autharray.join(','),'roleid':$("#rolelist").val()},
                                cache:false,
                                dataType: 'json',
								success: function(data){
									
								if(data.result==1){
										alert("权限修改成功!");
										$("#autharea").hide();
										$("#authlist").hide();
										$(".top").hide();
									}else{
										alert("出现错误，请联系管理员!");
									}
                                }
                             
				});
				
		
			
		
		};
	});
	
	//添加主机
	$("#add_host").click(function(){
		// $(".col-xs-12").html("添加主机");
		$("div .row #addhost #hostarea").html("<table  id='hostarea' width='1661' border='1'><tr><td width='6%' align='center' bgcolor='#66b3ff'>id</td><td width='6%' align='center' bgcolor='#66b3ff'>HostName</td><td width='6%' align='center' bgcolor='#66b3ff'>ip地址</td><td width='14%' align='center' bgcolor='#66b3ff'>ssh端口</td><td width='21%' align='center' bgcolor='#66b3ff'>远端用户</td><td width='53%' align='center' bgcolor='#66b3ff'>主机描述信息</td></tr></table>");
		var index=$("div .row #addhost").index(this);
		$("div #addhost").eq(index).show()
		.siblings().hide();
		$.getJSON("/queryHost",function(result){
			$.each(result, function(i, data){
				
				$("div .row #addhost #hostarea").append("<tr border='1'><td width='6%' align='center'>"+data['id']+"</td><td width='6%' align='center'>"+data['hostname']+"</td><td width='6%' align='center'>"+data['ipaddr']+"</td><td width='14%' align='center' >"+data['sshport']+"</td><td width='21%' align='center' >"+data['remote_user']+"</td><td width='53%' align='center' >"+data['host_desc']+"</td></tr>");
			});
		});
	
	});
	

	$("#add_host_btn").click(function(){
		$(".top").css({"display":"block","opacity":"0.5"});
		$("#Layer_host").css("display","block");
		$("#Layer_host input[type='text']").val('');
		$("#Layer_host input[type='text']").val('');
		$.getJSON("/queryHostGroup",function(result){
			$("#Layer_host select").empty();
			$("#Layer_host select").html('<select><option value ="" selected></option></select>');
			$.each(result, function(i, data){
				$("#Layer_host select").append("<option value='"+data['id']+"'>"+data['group_name']+"</option>");
			});
		});
	
		$("#Layer_host #cancle").click(function(){
			$(".top").hide();
			$("#Layer_host").hide();
		});
	});
	
	$("#Layer_host #ipaddr").bind("input propertychange change",function(event){
		var $ipaddr=$("#Layer_host #ipaddr").val();
		var $sshport=$("#Layer_host #sshport").val();
		var $remote_user=$("#Layer_host #remote_user").val();
		var $host_desc=$("#Layer_host #host_desc").val();
		var $hostgroup=$("#Layer_host select").find("option:selected").text();
		if($ipaddr.length>0 && $sshport.length>0 && $remote_user.length>0 && $host_desc.length>0  && $hostgroup.length>0){
			console.log("sshport length:"+$sshport.length);
			$("#Layer_host #add").attr("disabled",false);
		}else{
			$("#Layer_host #add").attr("disabled",true);
		}
	});

	$("#Layer_host #sshport").bind("input propertychange change",function(event){
		var $ipaddr=$("#Layer_host #ipaddr").val();
		var $sshport=$("#Layer_host #sshport").val();
		var $remote_user=$("#Layer_host #remote_user").val();
		var $host_desc=$("#Layer_host #host_desc").val();
		var $hostgroup=$("#Layer_host select").find("option:selected").text();
		if($ipaddr.length>0 && $sshport.length>0 && $remote_user.length>0 && $host_desc.length>0 && $hostgroup.length>0){
			$("#Layer_host #add").attr("disabled",false);
		}else{
			$("#Layer_host #add").attr("disabled",true);
		}
	});
	
	$("#Layer_host #remote_user").bind("input propertychange change",function(event){
		var $ipaddr=$("#Layer_host #ipaddr").val();
		var $sshport=$("#Layer_host #sshport").val();
		var $remote_user=$("#Layer_host #remote_user").val();
		var $host_desc=$("#Layer_host #host_desc").val();
		var $hostgroup=$("#Layer_host select").find("option:selected").text();
		if($ipaddr.length>0 && $sshport.length>0 && $remote_user.length>0 && $host_desc.length>0 && $hostgroup.length>0){
			$("#Layer_host #add").attr("disabled",false);
		}else{
			$("#Layer_host #add").attr("disabled",true);
		}
	});
	
	
	$("#Layer_host #host_desc").bind("input propertychange change",function(event){
		var $ipaddr=$("#Layer_host #ipaddr").val();
		var $sshport=$("#Layer_host #sshport").val();
		var $remote_user=$("#Layer_host #remote_user").val();
		var $host_desc=$("#Layer_host #host_desc").val();
		var $hostgroup=$("#Layer_host select").find("option:selected").text();
		if($ipaddr.length>0 && $sshport.length>0 && $remote_user.length>0 && $host_desc.length>0  && $hostgroup.length>0){
			$("#Layer_host #add").attr("disabled",false);
		}else{
			$("#Layer_host #add").attr("disabled",true);
		}
	});
	
	$("#Layer_host select").bind("change propertychange change",function(event){
		var $ipaddr=$("#Layer_host #ipaddr").val();
		var $sshport=$("#Layer_host #sshport").val();
		var $remote_user=$("#Layer_host #remote_user").val();
		var $host_desc=$("#Layer_host #host_desc").val();
		var $hostgroup=$("#Layer_host select").find("option:selected").text();
		if($ipaddr.length>0 && $sshport.length>0 && $remote_user.length>0 && $host_desc.length>0  && $hostgroup.length>0){
			$("#Layer_host #add").attr("disabled",false);
		}else{
			$("#Layer_host #add").attr("disabled",true);
		}
	});
	
	$("#Layer_host #add").click(function(){
		var $sshport=$("#Layer_host #sshport").val();
		var $ipaddr=$("#Layer_host #ipaddr").val();
		var $hostname=$("#Layer_host #hostname").val();
		var $remote_user=$("#Layer_host #remote_user").val();
		var $host_desc=$("#Layer_host #host_desc").val();
		var $hostgroup=$("#Layer_host select").find("option:selected").text();
		var $hostgroupId=$("#Layer_host select").find("option:selected").val();
		if(isInteger($sshport)==false){
			alert("ssh端口必须是数字！");
			$("#Layer_host #sshport").val('');
			$("#Layer_host #add").attr("disabled",true);
			$("#Layer_host #sshport").focus();
		}else{
			$.ajax({
                                type: 'post',
                                url:'/addhost',
                                data:{'host_ip':$ipaddr,'hostname':$hostname,'sshport':$sshport,'remote_user':$remote_user,'host_desc':$host_desc,'hostgroup':$hostgroup,'hostgroupId':$hostgroupId},
                                cache:false,
                                dataType: 'json',
								success: function(data){
									if (data.result==1){
										alert("主机信息添加成功!");
										$(".top").hide();
										$("#Layer_host").hide();
										$("#hostarea").append("<tr border='1'><td width='6%' align='center'></td><td width='6%' align='center'>"+$ipaddr+"</td><td width='6%' align='center'>"+$hostname+"</td><td width='14%' align='center' >"+$sshport+"</td><td width='21%' align='center' >"+$remote_user+"</td><td width='53%' align='center' >"+$host_desc+"</td></tr>")
									}else if (data.result==2){
										alert("主机信息已经存在，添加失败");
										$("#Layer_host #ipaddr").val('');
										$("#Layer_host #ipaddr").focus();
									
									}
									else{
										alert("主机信息添加失败，请联系管理员！");
									
									}
                                }
                             
			});
		}
	});

	//删除主机
	$("#del_host").click(function(){
		// $(".col-xs-12").html("添加用户");
		//window.location.href='/main#';
		$("div .row #delhost #hostlist").html("<table  id='hostlist' width='1661' border='1'><tr><td width='6%' align='center' bgcolor='#66b3ff'>主机ID</td><td width='6%' align='center' bgcolor='#66b3ff'>HostName</td><td width='6%' align='center' bgcolor='#66b3ff'>主机IP<</td><td width='14%' align='center' bgcolor='#66b3ff'>SSH端口</td><td width='21%' align='center' bgcolor='#66b3ff'>远端用户</td><td width='53%' align='center' bgcolor='#66b3ff'>删除操作</td></tr></table>");
		var index=$("div .row #delhost").index(this);
		$("div #delhost").eq(index).show()
		.siblings().hide();
		$.getJSON("/queryHost",function(result){
			$.each(result, function(i, data){
				
				$("div .row #delhost #hostlist").append("<tr border='1'><td width='6%' align='center'><input type='checkbox' id='id' value='"+data['id']+"'></td><td width='6%' align='center'>"+data['hostname']+"</td><td width='6%' align='center'>"+data['ipaddr']+"</td><td width='14%' align='center' >"+data['sshport']+"</td><td width='21%' align='center' >"+data['remote_user']+"</td><td width='53%' align='center' ><input type='button' id='del_single' name='del_single' value='删除' disabled></td></tr>");
			});
		});
	});
	
	
	//删除主机
		
		$("#delhost table").on("click","tr",function(){
			var $siblings = $(this).siblings('tr');
			$siblings.removeClass("selected").find('input[id="del_single"]').prop('disabled', true);
			$(this).addClass('selected').find('input[id="del_single"]').prop('disabled', false);
			
			
		})
		
		$("#delhost table").on("click","tr #del_single",function(){
			var request=confirm("是否删除主机?");
			var $position=$(this).parent().parent();
			var hostId=$(this).parent().siblings().find("#id").val();
			if(request==true){
				$.ajax({
                        type: 'post',
                        url:'/delhost',
                        data:{'hostId':hostId},
                        cache:false,
                        dataType: 'json',
						success: function(data){
							$position.hide();
							alert("主机已经删除!");
						
                        }
                     
				});
			};
			
			
		});
		var host_c_num=0;
		var hostarray=new Array();
	//	$("#delhost table tr").each(function(){
		$("#delhost table").on("click","tr  input",function(){
			//var $id=$(this).children("td:eq(0)").find("input");
			//$(this).click(function(){
			if ($(this).is(":checked")){
				host_c_num+=1;
				hostarray[host_c_num]=$(this).val();
				console.log('点击次数:'+host_c_num);
				
			
			}else{
				host_c_num-=1;
				hostarray.splice(host_c_num,1);
				console.log('点击次数:'+host_c_num);
						
			}
			if(host_c_num>0){
				$("#delhost #del_host_btn").attr("disabled",false);
			}else{
				$("#delhost #del_host_btn").attr("disabled",true);
			}
			
				
			//});
			
			
		})
		
		//批量删除主机
		$("#delhost #del_host_btn").click(function(){
			console.log(hostarray);
			console.log('点击次数:'+num);
			var request=confirm("是否删除主机?");
			if(request==true){
			$.ajax({
                type: 'post',
                url:'/delhost',
                data:{'hostId':hostarray.join(',')},
                cache:false,
                dataType: 'json',
				success: function(data){
				//	$position.hide();
					alert("主机已经删除!");
					$("#delhost table tr").each(function(){
						var $id=$(this).children("td:eq(0)").find("input");
						if ($id.is(":checked")){
							$id.parent().parent().hide();
						}
			
					
			
			
					})
				
                }
                     
			});
			}
			
		});
	
	//添加主机组
	$("#add_hostgroup").click(function(){
		// $(".col-xs-12").html("添加用户");
		$("div .row #addhostgroup #grouparea").html("<table  id='grouparea' width='1661' border='1'><tr><td width='6%' align='center' bgcolor='#66b3ff'>GroupId</td><td width='6%' align='center' bgcolor='#66b3ff'>主机组</td><td width='14%' align='center' bgcolor='#66b3ff'>主机组描述信息</td><td width='21%' align='center' bgcolor='#66b3ff'>主机组中的主机</td><td width='53%' align='center' bgcolor='#66b3ff'>关联主机</td></tr></table>");
		var index=$("div .row #addhostgroup").index(this);
		$("div #addhostgroup").eq(index).show()
		.siblings().hide();
		$.getJSON("/queryHostGroup",function(result){
			$.each(result, function(i, data){
				var $hostlist;
				if(data['hostlist']!=null){
					$hostlist=data['hostlist'];
				}else{
				$hostlist='';
				}
				$("div .row #addhostgroup #grouparea").append("<tr border='1'><td width='6%' align='center'>"+data['id']+"</td><td width='6%' align='center'>"+data['group_name']+"</td><td width='14%' align='center' >"+data['group_desc']+"</td><td width='21%' align='center' >"+$hostlist+"</td><td width='53%' align='center' ><img  src='/images/add_btn.jpg' id='assign' name='assign' height='20' width='20'>&nbsp;&nbsp;&nbsp;<img src='/images/remove.jpg' id='remove' name='remove' height='20' width='20'></td></td></tr>");
			});
		});
	});
	
	$("#addhostgroup_btn").click(function(){
		$(".top").css({"display":"block","opacity":"0.5"});
		$("#Layer_hostgroup").css("display","block");
		$("#Layer_hostgroup input[type='text']").val('');
		$("#Layer_hostgroup input[type='textarea']").val('');
		$("#Layer_hostgroup #cancle").click(function(){
			$(".top").hide();
			$("#Layer_hostgroup").hide();
		});
		$("#Layer_hostgroup #hostgroup_name").bind("input propertychange change",function(event){
				var hostgroup_name=$("#Layer_hostgroup #hostgroup_name").val();
				var hostgroup_desc=$("#Layer_hostgroup #hostgroup_desc").val();
			
		
				if (hostgroup_name.length!=0&& hostgroup_desc.length!=0){
					$("#Layer_hostgroup #add").attr("disabled",false);
				}else{
				
					$("#Layer_hostgroup #add").attr("disabled",true);
				};
		});
		
		$("#Layer_hostgroup #hostgroup_desc").bind("input propertychange change",function(event){
				var hostgroup_name=$("#Layer_hostgroup #hostgroup_name").val();
				var hostgroup_desc=$("#Layer_hostgroup #hostgroup_desc").val();
			
		
				if (hostgroup_name.length!=0&& hostgroup_desc.length!=0){
					$("#Layer_hostgroup #add").attr("disabled",false);
				}else{
		
					$("#Layer_hostgroup #add").attr("disabled",true);
				};
		});
		$("#Layer_hostgroup #add").off().click(function(){
			var hostgroup_name=$("#Layer_hostgroup #hostgroup_name").val();
			var hostgroup_desc=$("#Layer_hostgroup #hostgroup_desc").val();
			if (hostgroup_name.length==0||hostgroup_desc.length==0){
				alert("角色和描述信息都不能为空!");
				$("#Layer_hostgroup #add").attr("disabled",true);
			}
			
		
			$.ajax({
                                type: 'post',
                                url:'/addhostgroup',
                                data:{'hostgroup_name':hostgroup_name,'hostgroup_desc':hostgroup_desc},
                                cache:false,
                                dataType: 'json',
                                success: function(data){
										if (data['result']==1){
											alert("添加主机组成功！");
											$(".top").hide();
											$("#Layer_hostgroup").hide();
											$("#grouparea").append("<tr border='1'><td width='6%' align='center' bgcolor='#F0F0F0'></td><td width='6%' align='center' bgcolor='#F0F0F0'>"+hostgroup_name+"</td><td width='14%' align='center' bgcolor='#F0F0F0'>"+hostgroup_desc+"</td><td width='21%' align='center' bgcolor='#F0F0F0'>没有任何主机信息</td><td width='53%' align='center' bgcolor='#F0F0F0'><img  src='/images/add_btn.jpg' id='assign' name='assign' height='20' width='20'>&nbsp;&nbsp;&nbsp;<img src='/images/remove.jpg' id='remove' name='remove' height='20' width='20'></td></tr>");
											//window.location.href='/main';
											
											
										}else {
											alert("主机组已经存在！");
											$("#Layer_hostgroup #hostgroup_name").val('');
											$("#Layer_hostgroup #hostgroup_desc").val('');
											$("#Layer_hostgroup #hostgroup_name").focus();
											
											$("#Layer_hostgroup #add").attr("disabled",true);
										}
                                        //window.location.href = msg.url;

                                }
			});
		});
	
		
	});	
		$("table[id='grouparea']").on("mouseover","tr",function(){
			var $siblings = $(this).siblings('tr');
			$siblings.removeClass("selected").find('input[id="del_single"]').prop('disabled', true);
			$(this).addClass('selected').find('input[id="del_single"]').prop('disabled', false);
		});
		//关联主机和主机组
		/*$("table[id='grouparea']").on("mouseover","tr #assign",function(e){
			$(this).children("tr #assign").css({"height":22,'width':22,'border':'1px solid'});
			var $tooltip1="<div id='tooltip2'>将主机添加到主机组。</div>"
			var xx = e.originalEvent.x || e.originalEvent.layerX || 0; 
			var yy = e.originalEvent.y || e.originalEvent.layerY || 0;
			$("body").append($tooltip1);
			$("#tooltip2").show();
			$("#tooltip2").css({'top':yy+2+'px','left':xx+1+'px'})
		}).on("mouseout",function(e){
			$("#tooltip2").hide();
			$(this).find("#assign").css({"height":20,'width':20,'border':0});
		});*/
		
		$("table[id='grouparea']").on("mouseover","tr #assign",function(e){
			$(this).children("tr #assign").css({"height":22,'width':22,'border':'1px solid'});
			var $tooltip1="<div id='tooltip2'>将主机添加到主机组。</div>"
			var xx = e.originalEvent.x || e.originalEvent.layerX || 0; 
			var yy = e.originalEvent.y || e.originalEvent.layerY || 0;
			$("body").append($tooltip1);
			$("#tooltip2").show();
			$("#tooltip2").css({'top':yy+2+'px','left':xx+1+'px'})
		}).on("mouseout",function(e){
			$("#tooltip2").hide();
			$(this).find("#assign").css({"height":20,'width':20,'border':0});
		});
		
		
		$("table[id='grouparea").on("click","tr #assign",function(){
			var selected=$("table[id='grouparea'] tr[class='selected']");
			var index=selected.index();
			
			var container_hosts=$("table[id='grouparea'] tr:eq("+index+")").children("td:eq(3)").text();;
			var current_host;
			console.log("当前包包含主机:"+container_hosts);
			if(container_hosts.length==0){
				current_host=container_hosts;
			}else{
				current_host=container_hosts;
				current_host+=',';
			}
			//alert(current_host);
			$("#Layerhost_assign tbody").find("#current_host").val(current_host);
			//var $rolename=$assign.parent().parent().children("td:eq(1)").text();
			$(".top").css({"display":"block","opacity":"0.5"});
			$("#Layerhost_assign").css("display","block");
			$("#select_host").empty();
			$.getJSON("/queryHost",function(result){
				$.each(result, function(i, data){
					$("#select_host").append("<option value='"+data['ipaddr']+"'>"+data['ipaddr']+"</option>");
			});
		});
			$("#Layerhost_assign #cancle").click(function(){
				$(".top").hide();
			//	$("#userassign tbody").children("tr:eq(0)").children("td:eq(1)").text($rolename);
				$("#Layerhost_assign").hide();
			});
			$("#Layerhost_assign #add").click(function(){
			
				var select_host=$("#hostassign tbody").find("#select_host").val();
				
				if(current_host.indexOf(select_host)<0){
					current_host+=select_host;
					current_host+=',';
				}
				
				$("#hostassign tbody").find("#current_host").val(current_host);
				//$("#Layer_assign").hide(current_user);
			});
			var groupname=selected.children("td:eq(1)").text();
			var groupid=selected.children("td:eq(0)").text();
			
			$("#Layerhost_assign #confirm").off('click').on('click',function(){
				var hostlist=$("#hostassign tbody").find("#current_host").val();
				console.log(hostlist);
				$.ajax({
							type: 'post',
							url:'/hostassign',
							data:{'hostlist':hostlist,'groupid':groupid,'groupname':groupname},
							cache:false,
							dataType: 'json',
							success: function(data){
									if(data.result==1){
									alert('success!');
									$(".top").hide();
									$("#Layerhost_assign").hide();
									//$(this).parent().parent().hide();
									//var selected=$("table[id='grouparea'] tr[class='selected']");
									//var index=selected.index();
									$("table[id='grouparea'] tr:eq("+index+")").children("td:eq(3)").text(hostlist);
									
								}
							}
						 
				});
			})
		
			
		})
		
		//移除主机和主机组关联
	
		$("table[id='grouparea']").on("mouseover","tr #remove",function(e){
			$(this).children("tr #assign").css({"height":22,'width':22,'border':'1px solid'});
			var $tooltip1="<div id='tooltip2'>将主机从主机组中移除。</div>"
			var xx = e.originalEvent.x || e.originalEvent.layerX || 0; 
			var yy = e.originalEvent.y || e.originalEvent.layerY || 0;
			$("body").append($tooltip1);
			$("#tooltip2").show();
			$("#tooltip2").css({'top':yy+2+'px','left':xx+1+'px'})
		}).on("mouseout",function(e){
			$("#tooltip2").hide();
			$(this).find("#assign").css({"height":20,'width':20,'border':0});
		});
		$("table[id='grouparea").on("click","tr #remove",function(){
			var selected=$("table[id='grouparea'] tr[class='selected']");
			var index=selected.index();
			var spare_hosts=$("table[id='grouparea'] tr:eq("+index+")").children("td:eq(3)").text();
			var groupname=selected.children("td:eq(1)").text();
			var groupid=$("table[id='grouparea'] tr:eq("+index+")").children("td:eq(0)").text();
			console.log("剩余主机数量:"+spare_hosts.length);
			console.log("当前主机组:"+groupname);
			if(spare_hosts.length>0){
			$(".top").css({"display":"block","opacity":"0.5"});
			$("#Layerhost_remove").css("display","block");
			var selected=$("table[id='grouparea'] tr[class='selected']");
			var index=selected.index();
			var spare_hosts=$("table[id='grouparea'] tr:eq("+index+")").children("td:eq(3)").text();
			$("#hostassign tbody").find("#rm_current_host").val(spare_hosts);
			$("#Layerhost_remove #cancle").click(function(){
				$(".top").hide();
		
				$("#Layerhost_remove").hide();
			});
			$("#Layerhost_remove #remove_assign").click(function(){
			
				var currentHost = $("#hostassign tbody").find("#rm_current_host");
				var spare_host=currentHost.val();
				var select_host=$("#hostassign tbody").find("#rm_select_host").val();
				// 从当前用户中删除选择的用户
				var newItemStr = removeSelectItem(select_host, spare_host.split(','));
				
				currentHost.val(newItemStr);
				
				
				//var $position=$("table[id='grouparea'] tr[class='selected']");
				$("#Layerhost_remove #confirm").off('click').on('click',function(){
					var currentHost=newItemStr;
					
					console.log("当前主机组:"+groupname+"当前剩余主机:"+currentHost);
					//var groupid=$position.children("td:eq(0)").text();
					var request=confirm("确定要移除主机吗?")
					if(request==true){
						$.ajax({
                                type: 'post',
                                url:'/removehost_assign',
                                data:{'current_host':currentHost,'groupid':groupid},
                                cache:false,
                                dataType: 'json',
								success: function(data){
									alert('success!');
									$(".top").hide();
									$("#Layerhost_remove").hide();
									var selected=$("table[id='grouparea'] tr[class='selected']");
									var index=selected.index();
									$("table[id='grouparea'] tr:eq("+index+")").children("td:eq(3)").text(currentHost);
								}
                             
						});
					}

				})										
				
			});
			}
			
		})
/*	$("table[id='grouparea'] tr").each(function(){
		var $group_position=$(this);
		var $assign=$(this).find("#assign");
		var $remove=$(this).find("#remove")
		$assign.mouseover(function(e){
			$assign.css({"height":22,'width':22,'border':'1px solid'});
			var $tooltip1="<div id='tooltip2'>将主机添加到主机组。</div>"
			var xx = e.originalEvent.x || e.originalEvent.layerX || 0; 
			var yy = e.originalEvent.y || e.originalEvent.layerY || 0;
			$("body").append($tooltip1);
			$("#tooltip2").show();
			$("#tooltip2").css({'top':yy+2+'px','left':xx+1+'px'})
		}).mouseout(function(e){
			$("#tooltip2").hide();
			$assign.css({"height":20,'width':20,'border':0});
		});
		
		
		
		//remove function
		$remove.mouseover(function(e){
			$remove.css({"height":22,'width':22,'border':'1px solid'});
			
			var $tooltip2="<div id='tooltip2'>将主机从主机组中移除。</div>"
			var xx = e.originalEvent.x || e.originalEvent.layerX || 0; 
			var yy = e.originalEvent.y || e.originalEvent.layerY || 0;
			$("body").append($tooltip2);
			$("#tooltip2").show();
			$("#tooltip2").css({'top':yy+2+'px','left':xx+1+'px'})
		}).mouseout(function(e){
			$("#tooltip2").hide();
			$remove.css({"height":20,'width':20,'border':0});
		});
		
		
		
		//关联主机和主机组
			$assign.click(function(){
			var selected=$("table[id='grouparea'] tr[class='selected']");
			var index=selected.index();
			
			var container_hosts=$("table[id='grouparea'] tr:eq("+index+")").children("td:eq(3)").text();;
			var current_host;
			console.log("当前包包含主机:"+container_hosts);
			if(container_hosts.length==0){
				current_host=container_hosts;
			}else{
				current_host=container_hosts;
				current_host+=',';
			}
			//alert(current_host);
			$("#Layerhost_assign tbody").find("#current_host").val(current_host);
			//var $rolename=$assign.parent().parent().children("td:eq(1)").text();
			$(".top").css({"display":"block","opacity":"0.5"});
			$("#Layerhost_assign").css("display","block");
			$("#Layerhost_assign #cancle").click(function(){
				$(".top").hide();
			//	$("#userassign tbody").children("tr:eq(0)").children("td:eq(1)").text($rolename);
				$("#Layerhost_assign").hide();
			});
			$("#Layerhost_assign #add").click(function(){
			
				var select_host=$("#hostassign tbody").find("#select_host").val();
				
				if(current_host.indexOf(select_host)<0){
					current_host+=select_host;
					current_host+=',';
				}
				
				$("#hostassign tbody").find("#current_host").val(current_host);
				//$("#Layer_assign").hide(current_user);
			});
			var groupname=$group_position.children("td:eq(1)").text();
			var groupid=$group_position.children("td:eq(0)").text();
			
			$("#Layerhost_assign #confirm").off('click').on('click',function(){
				var hostlist=$("#hostassign tbody").find("#current_host").val();
				console.log(hostlist);
				$.ajax({
							type: 'post',
							url:'/hostassign',
							data:{'hostlist':hostlist,'groupid':groupid,'groupname':groupname},
							cache:false,
							dataType: 'json',
							success: function(data){
									if(data.result==1){
									alert('success!');
									$(".top").hide();
									$("#Layerhost_assign").hide();
									//$(this).parent().parent().hide();
									//var selected=$("table[id='grouparea'] tr[class='selected']");
									//var index=selected.index();
									$("table[id='grouparea'] tr:eq("+index+")").children("td:eq(3)").text(hostlist);
									
								}
							}
						 
				});
			})
		
			
		})
		
		
		//把主机从主机组中移除
		$remove.click(function(){
			var selected=$("table[id='grouparea'] tr[class='selected']");
			var index=selected.index();
			var spare_hosts=$("table[id='grouparea'] tr:eq("+index+")").children("td:eq(3)").text();
			var groupname=selected.children("td:eq(1)").text();
			var groupid=$("table[id='grouparea'] tr:eq("+index+")").children("td:eq(0)").text();
			console.log("剩余主机数量:"+spare_hosts.length);
			console.log("当前主机组:"+groupname);
			if(spare_hosts.length>0){
			$(".top").css({"display":"block","opacity":"0.5"});
			$("#Layerhost_remove").css("display","block");
			var selected=$("table[id='grouparea'] tr[class='selected']");
			var index=selected.index();
			var spare_hosts=$("table[id='grouparea'] tr:eq("+index+")").children("td:eq(3)").text();
			$("#hostassign tbody").find("#rm_current_host").val(spare_hosts);
			$("#Layerhost_remove #cancle").click(function(){
				$(".top").hide();
		
				$("#Layerhost_remove").hide();
			});
			$("#Layerhost_remove #remove_assign").click(function(){
			
				var currentHost = $("#hostassign tbody").find("#rm_current_host");
				var spare_host=currentHost.val();
				var select_host=$("#hostassign tbody").find("#rm_select_host").val();
				// 从当前用户中删除选择的用户
				var newItemStr = removeSelectItem(select_host, spare_host.split(','));
				
				currentHost.val(newItemStr);
				
				
				//var $position=$("table[id='grouparea'] tr[class='selected']");
				$("#Layerhost_remove #confirm").off('click').on('click',function(){
					var currentHost=newItemStr;
					
					console.log("当前主机组:"+groupname+"当前剩余主机:"+currentHost);
					//var groupid=$position.children("td:eq(0)").text();
					var request=confirm("确定要移除主机吗?")
					if(request==true){
						$.ajax({
                                type: 'post',
                                url:'/removehost_assign',
                                data:{'current_host':currentHost,'groupid':groupid},
                                cache:false,
                                dataType: 'json',
								success: function(data){
									alert('success!');
									$(".top").hide();
									$("#Layerhost_remove").hide();
									var selected=$("table[id='grouparea'] tr[class='selected']");
									var index=selected.index();
									$("table[id='grouparea'] tr:eq("+index+")").children("td:eq(3)").text(currentHost);
								}
                             
						});
					}

				})										
				
			});
			}
			
		})
		
		
	}); */

		
	$("table[id='grouparea'] tr").mouseover(function(){
		var $siblings = $(this).siblings('tr');
		$siblings.removeClass("selected");
		$(this).addClass('selected');
			
			
		}).mouseout(function(){
			$(this).removeClass("selected");
		})
		
	//删除主机组
	$("#del_hostgroup").click(function(){
		// $(".col-xs-12").html("添加用户");
		$("div .row #delhostgroup #rolelist").html("<table  id='rolelist' width='1661' border='1'><tr><td width='6%' align='center' bgcolor='#66b3ff'>主机组Id</td><td width='6%' align='center' bgcolor='#66b3ff'>主机组</td><td width='14%' align='center' bgcolor='#66b3ff'>描述信息</td><td width='21%' align='center' bgcolor='#66b3ff'>组内含有的主机</td><td width='53%' align='center' bgcolor='#66b3ff'>删除</td></tr></table>");
		var index=$("div .row #delhostgroup").index(this);
		$("div #delhostgroup").eq(index).show()
		.siblings().hide();
		$.getJSON("/queryHostGroup",function(result){
			$.each(result, function(i, data){
				var $hostlist;
				var $host_status;
				if (data['hostlist']!=null){
					$host_status="disabled";
					$hostlist=data['hostlist'];
				}else{
					$host_status="";
					$hostlist="";
				}
				
				$("div .row #delhostgroup #rolelist").append("<tr border='1'><td width='6%' align='center'><input type='checkbox' id='group_id' value='"+data['id']+"' "+$host_status+"></td><td width='6%' align='center'>"+data['group_name']+"</td><td width='14%' align='center' >"+data['group_desc']+"</td><td width='21%' align='center' >"+$hostlist+"</td><td width='53%' align='center' >&nbsp;&nbsp;&nbsp;&nbsp;<input type='button' id='delhostgroup_commit' name='delhostgroup_commit' value='删除' disabled></td></td></tr>");
			});
		});
	});
	//删除主机组
		
		$("#delhostgroup table").on("click","tr",function(){
			var $siblings = $(this).siblings('tr');
			$siblings.removeClass("selected").find('input[id="delhostgroup_commit"]').prop('disabled', true);
			$(this).addClass('selected').find('input[id="delhostgroup_commit"]').prop('disabled', false);
			
			
		})
		
		$("#delhostgroup table").on("click","tr #delhostgroup_commit",function(){
			var container_hosts=$(this).parent().parent().children("td:eq(3)").text();
			var $position=$(this).parent().parent();
			var groupId=$(this).parent().siblings().find("#group_id").val();
			if(container_hosts.length>0){
				alert("组中包含主机，不能删除!");}
			else{	
			var request=confirm("是否删除主机组?");
			
			
			if(request==true){
					$.ajax({
                        type: 'post',
                        url:'/delhostgroup',
                        data:{'grouplist':groupId},
                        cache:false,
                        dataType: 'json',
						success: function(data){
							$position.hide();
							alert("主机组已经删除!");
						
                        }
                     
					});
			};
			};
			
			
		});
		var click_hostgroup_num=0;
		var grouparray=new Array();
		//$("#delhostgroup table tr").each(function(){
		$("#delhostgroup table").on("click","tr input",function(){
		
			//var $id=$(this).children("td:eq(0)").find("input");
			//$(this).click(function(){
			if ($(this).is(":checked")){
				click_hostgroup_num+=1;
				grouparray[click_hostgroup_num]=$(this).val();
				console.log('点击次数:'+click_hostgroup_num);
				
				
			
			}else{
				click_hostgroup_num-=1;
				grouparray.splice(click_hostgroup_num,1);
				console.log('点击次数:'+click_hostgroup_num);
						
			}
			if(click_hostgroup_num>0){
				$("#delhostgroup #delhostgroup_btn").attr("disabled",false);
			}else{
				$("#delhostgroup #delhostgroup_btn").attr("disabled",true);
			}
			
				
			//});
			
			
		})
		//批量删除主机组
		$("#delhostgroup #delhostgroup_btn").click(function(){
			console.log(grouparray);
			console.log('点击次数:'+click_hostgroup_num);
			var request=confirm("是否删除主机组?");
			if(request==true){
			$.ajax({
                type: 'post',
                url:'/delhostgroup',
                data:{'grouplist':grouparray.join(',')},
                cache:false,
                dataType: 'json',
				success: function(data){
				//	$position.hide();
					alert("主机组已经删除!");
					$("#delhostgroup table tr").each(function(){
						var $id=$(this).children("td:eq(0)").find("input");
						if ($id.is(":checked")){
							$id.parent().parent().hide();
						}
						click_hostgroup_num=0;
			
					
			
			
					})
				
                }
                     
			});
			}
			
		});
		
		
		$("#change_root_passwd").click(function(){
			$('#myModal').modal('show');

			
			
			//$(".top").css({"display":"block","opacity":"0.5"});
			$("#select_all").click(function(){
				//$("#myModal").find("input").each(function(){
					$('#myModal').find("input").prop("checked",true);
				//});
			});
			
			$("#select_invert").click(function(){
				$("#myModal").find("input").each(function(){
					if ($(this).is(":checked")){
						$(this).attr("checked",false);
					}else{
						$(this).attr("checked",true);
					};
					
				});
			});
			
			$('#change_password').off("click").click(function(){
			var iparray=new Array();
			var $iplist='';
			$("#myModal").find("input").each(function(){
				// debugger
				if ($(this).is(":checked")){
					var hostIdsObj = {}
					hostIdsObj.hostName =  $(this)[0].id;
					hostIdsObj.ip = $(this)[0].defaultValue;
					iparray.push(hostIdsObj);
				};
			});
			
			//	console.log('点击次数:'+num);
			console.log("iparray:"+iparray);
			$('#myModal').modal('hide');
			$('#ajaxResult').modal('show');
			
			//alert("Iplist:"+$iplist);
			$.ajax({
                                type: 'post',
                                url:'/change_root_passwd',
                                data:{'iplist[]':JSON.stringify(iparray)},
								// data:iparray,
                                cache:false,
                                dataType: 'json',
								success: function(data){
					
									if(data.result==1){
										//window.location.href = /
										//window.open('/passfile.txt', '_blank')
										$('#ajaxResultContent').html('<a href="/passfile.txt" download>下载</a>');
										
										
									}else{
										$('#ajaxResultContent').html('修改成功<a href="/passfile.txt" download>下载</a></br><span>'+data.result+'</span>');
									}
								//window.location.href = "/";
									$('#myModal').modal('hide');
                                },
                             
			});
			//$('#myModal').modal('hide');
			//});
			$("#myModal").find("input").each(function(){
					if ($(this).is(":checked")){
						$(this).attr("checked",false);
					};
			});	
			 
			});
			
			$("#close_change_password").click(function(){
				window.location.href = '/main#';
			});
				
					
			
			
		});
		//添加监控源
		$("#monitor_source").click(function(){
			var index=$("div .row #add_monitor_source").index(this);
			$("div #add_monitor_source").eq(index).show()
			.siblings().hide();
		})
		
		//点击按钮新增监控源
		$("#add_monitor_source #add_btn").click(function(){
			$(".top").css({"display":"block","opacity":"0.5"});
		    $("#Layer2_monitor_source").css("display","block");
		    $("#Layer2_monitor_source input[type='text']").val('');
		    $("#Layer2_monitor_source input[type='password']").val('');
		    $("#Layer2_monitor_source #cancle").click(function(){
				$(".top").hide();
				$("#Layer2_monitor_source").hide();
			});
			
			
			
			
		});
			//检查服务器IP是否为空
			$("#Layer2_monitor_source #server_name").bind("input propertychange change",function(event){
				var server_name=$("#Layer2_monitor_source #server_name").val();
				var nicename=$("#Layer2_monitor_source #nicename").val();
				var passwd=$("#Layer2_monitor_source #passwd").val();	
				if (username.length!=0&& nicename.length!=0&&passwd.length!=0){
						$("#Layer2_monitor_source #add").attr("disabled",false);
						$("#Layer2_monitor_source #Test_connect").attr("disabled",false);
				}else{
				
						$("#Layer2_monitor_source #add").attr("disabled",true);
						$("#Layer2_monitor_source #Test_connect").attr("disabled",true);
				};
			});
			
			//检查账号是否为空
			$("#Layer2_monitor_source #nicename").bind("input propertychange change",function(event){
				var server_name=$("#Layer2_monitor_source #server_name").val();
				var nicename=$("#Layer2_monitor_source #nicename").val();
				var passwd=$("#Layer2_monitor_source #passwd").val();	
				if (server_name.length!=0&& nicename.length!=0&&passwd.length!=0){
					$("#Layer2_monitor_source #add").attr("disabled",false);
					$("#Layer2_monitor_source #Test_connect").attr("disabled",false);
				}else{
				
						$("#Layer2_monitor_source #add").attr("disabled",true);
						$("#Layer2_monitor_source #Test_connect").attr("disabled",true);
				};
			});
			
			
			//检查密码是否为空
			$("#Layer2_monitor_source #passwd").bind("input propertychange change",function(event){
				var server_name=$("#Layer2_monitor_source #server_name").val();
				var nicename=$("#Layer2_monitor_source #nicename").val();
				var passwd=$("#Layer2_monitor_source #passwd").val();	
				if (server_name.length!=0&& nicename.length!=0&&passwd.length!=0){
					$("#Layer2_monitor_source #add").attr("disabled",false);
					$("#Layer2_monitor_source #Test_connect").attr("disabled",false);
				}else{
				
						$("#Layer2_monitor_source #add").attr("disabled",true);
						$("#Layer2_monitor_source #Test_connect").attr("disabled",true);
				};
			});
			
			$("#Layer2_monitor_source #server_name").blur(function(event){
			    var server_name=$("#Layer2_monitor_source #server_name").val();
				if(isDataurl(server_name)==false){
					alert("配置信息不正确!");
					$("#Layer2_monitor_source #server_name").val('');
					$("#Layer2_monitor_source #server_name").css("border","1px solid red");
				}
				
			});
			
			
			//测试连接是否成功
			$("#Layer2_monitor_source #Test_connect").click(function(){
				$.ajax({
                                type: 'post',
                                url:'/ConnectCheck',
                                data:{'server_info':$("#Layer2_monitor_source #server_name").val(),'account':$("#Layer2_monitor_source #nicename").val(),'passwd':$("#Layer2_monitor_source #passwd").val()},
								// data:iparray,
                                cache:false,
                                dataType: 'json',
								success: function(data){
					
									if(data.result==1){
										//window.location.href = /
										//window.open('/passfile.txt', '_blank')
										alert("测试数据库连接成功!");
									}else{
										alert("测试数据库连接失败!");
										$("#Layer2_monitor_source #server_name").val('');
										$("#Layer2_monitor_source #server_name").css("border","1px solid red");
										$("#Layer2_monitor_source #add").attr("disabled",false);
										$("#Layer2_monitor_source #Test_connect").attr("disabled",false);
									}
                                },
                             
				});
				
				
			});
			
	
})

function isInteger(obj) {
	var re=new RegExp('["^\\d+$"]',"g");
	return re.test(obj);
}


function isDataurl(obj) {
	var re=new RegExp("^[a-zA-Z0-9][a-zA-Z1-9.]+:[1-9][0-9]{0,4}/[a-zA-Z]+$","g");
	return re.test(obj);
}




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


$(function () { $("[data-toggle='tooltip']").tooltip(); });
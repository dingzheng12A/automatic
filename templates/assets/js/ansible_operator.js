$(document).ready(function(){
	$("#add_remote_user").click(function(){
		var index=$("div .row #remote_user_add").index(this);
        $("div #remote_user_add").eq(index).show()
        .siblings().hide();
	
    });
	$("#remote_user_add #cancle").click(function(){
		$("#remote_user_add input[type='text']").val('');
		$("#remote_user_add input[type='password']").val('');
		$("#remote_user_add select[id='remote_hosts']").val('');
	});
	$("#remote_user_add #username").bind("input propertychange change",function(event){
			var username=$(this).val();
			var passwd=$("#remote_user_add #passwd").val();
			var remote_host=$("#remote_user_add #remote_hosts").val();
			console.log("password:"+passwd);
			if(username.length==0||passwd.length==0||remote_host==0){
					$("#remote_user_add	#confirm").attr("disabled",true);
			}else{
				$("#remote_user_add	#confirm").attr("disabled",false);
			}
	});
	$("#remote_user_add #passwd").bind("input propertychange change",function(event){
			var username=$("#remote_user_add #username").val();
			var passwd=$(this).val();
			var remote_host=$("#remote_user_add #remote_hosts").val();
			if(username.length==0||passwd.length==0||remote_host==0){
					$("#remote_user_add	#confirm").attr("disabled",true);
			}else{
				$("#remote_user_add	#confirm").attr("disabled",false);
			}
	});
	
	$("#remote_user_add #confirm").click(function(event){
		var username=$("#remote_user_add #username").val();
		var passwd=$("#remote_user_add #passwd").val();
		var remote_host=$("#remote_user_add #remote_hosts").val();
			$.ajax({
				type: 'post',
				url:'/remote_user_manager',
				data:{'remote_host':remote_host,'username':username,'passwd':passwd,operateId:1},
				cache:false,
				dataType: 'json',
				success: function(data){
					console.log(data.result);
					$("#return_msg").html(data.result);
				}
           
		});
	});
	
	
	$("#del_remote_user").click(function(){
		var index=$("div .row #remote_user_del").index(this);
        $("div #remote_user_del").eq(index).show()
        .siblings().hide();
	
    });
	
	
	$("#remote_user_del #remote_hosts").change(function(){
			$.ajax({
							type: 'post',
							url:'/list_remote_user',
							data:{'remote_host':$(this).val()},
							cache:false,
							dataType: 'json',
							success: function(data){
								$("#remote_user_del #remote_user").html("<select name='remote_user' id='remote_user'></select>")
								$.each(data,function(key,value){
										console.log("user_data:"+value['user']);
										$("#remote_user_del #remote_user").append("<option value="+value['user']+">"+value['user']+"</option>");
								});
							}
						 
			});
			
	})
	
	$("#remote_user_del #remote_user").change(function(){
		if($(this).val().length>0){
			$("#remote_user_del #confirm").attr("disabled",false);
		}else{
			$("#remote_user_del #confirm").attr("disabled",false);
		}
	});
	
	$("#remote_user_del #confirm").click(function(event){
		var username=$("#remote_user_del #remote_user").val();
		var remote_host=$("#remote_user_del #remote_hosts").val();
		var request=confirm("是否在远程主机:"+remote_host+"上删除用户:"+username+" ?");
		if(request){
		    console.log('username:'+username+'remote_host:'+remote_host);
		    	$.ajax({
		    		type: 'post',
		    		url:'/remote_user_manager',
		    		data:{'remote_host':remote_host,'username':username,operateId:2},
		    		cache:false,
		    		dataType: 'json',
		    		success: function(data){
		    			console.log(data.result);
		    			$("#remote_user_del #return_msg").html(data.result);
						$("#remote_user_del select option[value='"+username+"']").remove();
						
		    		}
               
		    });
		};
	});

});
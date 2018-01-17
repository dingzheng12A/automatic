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

});
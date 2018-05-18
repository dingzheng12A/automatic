$(document).ready(function(){
	
	var index=$("div .row #application_deploy").index(this);
	$("#custom_service").click(function(){
		$("div #application_deploy").eq(index).show()
		.siblings().hide();
		$.getJSON("/getProduct",function(result){
			$("div .row table[id='productarea']").html("<table  id='productarea' width='1221' border='1'><tr><td align='center' bgcolor='#66b3ff'>id</td><td align='center' bgcolor='#66b3ff'>产品名称</td></tr></table>");
			$("div .row select[id='Belonged_products']").html("<select id='products' width='28px';></select>");
			$.each(result, function(i, data){
				$("div .row table[id='productarea']").append("<tr border='1'><td width='6%' align='center'>"+data['id']+"</td><td width='6%' align='center'>"+data['proname']+"</td></tr>");
				
				$("select[id='Belonged_products']").append("<option value='"+data['id']+"'>"+data['proname']+"</option>");
				
		
			});
		});
		
		$.getJSON("/appList",function(result){
			$("div .row table[id='application_list']").html("<table id='application_list' class='table table-bordered table-striped' style='border:none'><tr align='center'><td>	</td><td></td><td></td>	<td></td></tr><tr align='center'><td>所属产品</td><td>应用名称</td><td>版本号</td><td>软件包下载</td></tr></p></table>");
			$.each(result, function(i, data){
				$("div .row table[id='application_list']").append("<tr align='center'><td>"+data['product']+"</td><td>"+data['appname']+"</td><td>"+data['version']+"</td><td><a href='"+data['downloadPath']+"'>下载<a/></td></tr>");
				
				
		
			});
		});
	});
	
	
	$("#addproduct_btn").click(function(){
		$("#productModal").css({'margin-top': Math.max(0, ($(window).height() - $(this).height()) / 2) });
		$("#productModal").modal("show");
	});
	$("#product_manager").find("#cancle").click(function(){
		$("#productModal").modal("hide");
	});
	
	$("#product").bind("input propertychange change",function(event){
		var productName=$("#product").val();
		if(productName.length>0){
			$("#product_manager #add_product").attr("disabled",false);
		}else{
			$("#product_manager #add_product").attr("disabled",true);
		}
	});
	
	$("#product_manager").find("#add_product").click(function(){
		var productName=$("#product").val();
		if(productName.length>0){
		$.ajax({
                    type: 'post',
                    url:'/addProduct',
                    data:{'productName':productName},
                    cache:false,
                    dataType: 'json',
					success: function(data){
						if (data.result==0){
							alert("信息已经存在!");
							$("#product").val('');
							$("#product").focus();
							$("#product_manager #add_product").attr("disabled",true);
						}else{
							alert("产品信息添加成功!");
							$("#product").val('');
							$("#productModal").modal("hide");
									$.getJSON("/getProduct",function(result){
									$("div .row table[id='productarea']").html("<table  id='productarea' width='1221' border='1'><tr><td align='center' bgcolor='#66b3ff'>id</td><td align='center' bgcolor='#66b3ff'>产品名称</td></tr></table>");
									$("div .row select[id='Belonged_products']").html("<select id='products'></select>");
									$.each(result, function(i, data){
										$("div .row table[id='productarea']").append("<tr border='1'><td width='6%' align='center'>"+data['id']+"</td><td width='6%' align='center'>"+data['proname']+"</td></tr>");
										$("select[id='Belonged_products']").append("<option value='"+data['id']+"'>"+data['proname']+"</option>");
									});
									});
						}
                    }
                 
		});
		}
	});
	

	
	$("#upload_package").click(function(){
			$("#processUpload").modal("show");
			var product=$("#Belonged_products").find("option:selected").text();
			var appName=$("#appName").val();
			var version=$("#appVersion").val();
			var unzipPath=$("#unzip_path").val();
			var runCommand=$("#runCommand").val();
			var formData=new FormData();
			formData.append('packetFile',$("#packetFile")[0].files[0]);
			formData.append('product',product);
			formData.append('appName',appName);
			formData.append('version',version);
			formData.append('unzipPath',unzipPath);
			formData.append('runCommand',runCommand);
			
			$.ajax({
                        type:'POST',
                        url:'/upload',
                        data:formData,
                        async:true,
                        processData: false,
                        contentType:false,
                        success:function(data){
								if(data.result==1){
									$("#processUpload").modal("hide");
									$.getJSON("/appList",function(result){
										$("div .row table[id='application_list']").html("<table id='application_list' class='table table-bordered table-striped' style='border:none'><tr align='center'><td>	</td><td></td><td></td>	<td></td></tr><tr align='center'><td>所属产品</td><td>应用名称</td><td>版本号</td><td>软件包下载</td></tr></p></table>");
										$.each(result, function(i, data){
											$("div .row table[id='application_list']").append("<tr align='center'><td>"+data['product']+"</td><td>"+data['appname']+"</td><td>"+data['version']+"</td><td><a href='"+data['downloadPath']+"'>下载<a/></td></tr>");
				
		
										});
									});
								}else{
									alert("上传失败!");
								}
								
                        }
            });
	});
	


});



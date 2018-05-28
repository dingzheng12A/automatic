$(document).ready(function(){
	
	var index=$("div .row #application_deploy").index(this);
	$("#custom_service").click(function(){
		
		$("div #application_deploy").eq(index).show()
		.siblings().hide();
		$.getJSON("/getProduct",function(result){
			$("div .row table[id='productarea']").html("<table  id='productarea' width='1221' border='1'><tr><td align='center' bgcolor='#66b3ff'>id</td><td align='center' bgcolor='#66b3ff'>产品名称</td></tr></table>");
			$("div .row select[id='Belonged_products']").html("<select id='products' width='28px';><option>......</option></select>");
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
	$("#app_deploy input[id='Deploy']").attr("disabled",true);
	
	
	$("#addproduct_btn").click(function(){
		$("#productModal").css({'margin-top': Math.max(0, ($(window).height() - $(this).height()) / 2) });
		//点击空白区域不关闭
		$("#productModal").modal({"show":true,backdrop: 'static', keyboard: false});
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
			$("#processUpload").modal({"show":true,backdrop: 'static', keyboard: false});
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
								
                        },
						error:function(data){
							$("#processUpload").modal("hide");
							alert("上传失败!");
						}
            });
	});
	
	
	$("#app_deploy #Belonged_products").change(function(){
		var product=$("#app_deploy #Belonged_products").find("option:selected").text();
		$.ajax({
			type:'POST',
            url:'/appQuery',
            data:{"product":product},
			async:true,
			success:function(result){
				$("#app_deploy select[id='selectApp']").html('<select id="selectApp" width="28px;"></select>');
				if(result.length>0){
				$.each(result, function(i, data){
					$("#app_deploy select[id='selectApp']").append('<option><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">'+data['appname']+'_'+data['version']+'</font></font></option>');
				
		
				});
				$("#app_deploy button[id='Deploy']").attr("disabled",false);
				}else{
					$("#app_deploy button[id='Deploy']").attr("disabled",true);
				}
			}
			
		});
	})
	
	

	
	$("button[id='Deploy']").click(function(){
		$("#remoteDeploy").find("input").each(function(){
			$(this).attr("checked",false);
		});
		var product=$("#app_deploy #Belonged_products").find("option:selected").text();
		var selectApp=$("#app_deploy #selectApp").find("option:selected").text();
		$.ajax({
			type:'POST',
            url:'/appInfo',
            data:{"product":product,'selectApp':selectApp},
			async:true,
			success:function(data){
				$.each(data, function(i,result){
					$("#remoteDeploy input[id='package_path']").val(result.package_path);
					$("#remoteDeploy input[id='unzippath']").val(result.unzippath);
					$("#remoteDeploy input[id='runCommand']").val(result.runCommand);
					$("#deployProcess input[id='productName']").val(result.product);
					$("#deployProcess input[id='appName']").val(result.appname);
					$("#deployProcess input[id='appVersion']").val(result.version);
				})
			}
		});
		$("#remoteDeploy").modal({"show":true,backdrop: 'static', keyboard: false});
		
	});
	
	var Timer = null;
	var ProgressValue = 0;
	function onProgress(value, max, times, callback) {
		console.log(value, max)
		$("#progressMain").css({"width": value + '%'}).text(value + '%');
		if (Timer) clearInterval(Timer);
		Timer = setInterval(function () {
			if (value <= max && value<=100) {
				value++
				ProgressValue = value;
				$("#progressMain").css({"width": value + '%'}).text(value + '%');
				if(value==100){
						$("#progressMain").removeClass("progress-bar-info").addClass("progress-bar-success");
						clearInterval(Timer)
				}
			} 
			else {
				clearInterval(Timer)
				callback && callback();
			}	
		}, times || 100)
	}
	
	
	$('#startDeploy').off("click").click(function(){
			var ipArray=new Array();
			var $iplist='';
			if($("#progressMain").hasClass("progress-bar-success")){
					$("#progressMain").removeClass("progress-bar-success")
			}
			if($("#progressMain").hasClass("progress-bar-danger")){
					$("#progressMain").removeClass("progress-bar-danger")
			}
			$("#progressMain").css({"width":"0%"}).text("0%").removeClass("progress-bar-success").addClass("progress-bar-info active");
			$(".modal-footer #processMessage").html("<span id='processMessage'></span>");
			$("#remoteDeploy").find("input").each(function(){
				// debugger
				if ($(this).is(":checked")){
					var hostIdsObj = {}
					hostIdsObj.hostName =  $(this)[0].id;
					hostIdsObj.ip = $(this)[0].defaultValue;
					ipArray.push(hostIdsObj);
				};
			});
			
			//	console.log('点击次数:'+num);
			console.log("iparray:"+JSON.stringify(ipArray)+"length:"+ipArray.length);
			if(ipArray.length>0){
				$('#deployProcess').modal({"show":true,backdrop: 'static', keyboard: false});
				$('#remoteDeploy').modal('hide');
				$.ajax({
                                type: 'post',
                                url:'/syncPacket',
                                data:{'iplist[]':JSON.stringify(ipArray),'package_path':$("input[id='package_path']").val(),'unzippath':$("input[id='unzippath']").val(),'runCommand':$("input[id='runCommand']").val()},
								// data:iparray,
                                cache:false,
                                dataType: 'json',
								success: function(data){
									$(".modal-footer #processMessage").append(data.message);
									$('.modal-footer').scrollTop($('#processMessage').height());
									if(data.result==1){
										onProgress(0, 25);
										//for(var value=0;value<=25;value++){
										//	$("#progressMain").delay("2000");
										//	$("#progressMain").attr("aria-valuenow",value);
										//	//$("#progressMain").css("width",value+"%").text(value + "%");
										//	console.log("value:"+value);
										//}
										
											$.ajax({
													type: 'post',
													url:'/unzipPacket',
													data:{'iplist[]':JSON.stringify(ipArray),'package_path':$("input[id='package_path']").val(),'unzippath':$("input[id='unzippath']").val(),'runCommand':$("input[id='runCommand']").val()},
													// data:iparray,
													cache:false,
													dataType: 'json',
													success: function(data){
														$(".modal-footer #processMessage").append(data.message);
														$('.modal-footer').scrollTop($('#processMessage').height());
														if(data.result==1){
															onProgress(25, 50, null, function () {
																//onProgress(50, 90, 10000)
																onProgress(50, 90, 50000)
															});
														
															
																$.ajax({
																	type: 'post',
																	url:'/runDeploy',
																	data:{'iplist[]':JSON.stringify(ipArray),'package_path':$("input[id='package_path']").val(),'unzippath':$("input[id='unzippath']").val(),'runCommand':$("input[id='runCommand']").val()},
																	// data:iparray,
																	cache:false,
																	dataType: 'json',
																	success: function(data){
																		$(".modal-footer #processMessage").append(data.message);
																		$('.modal-footer').scrollTop($('#processMessage').height());
																		if(data.result==1){
																			onProgress(ProgressValue, 100);
																			
														
										
																		}else{
																			$("#progressMain").removeClass("progress-bar-info")
																			$("#progressMain").addClass("progress-bar-danger");
																			$("#progressMain")
																			clearInterval(Timer);
																		
																		}
																	},
                             
																}); 
										
										
														}else{
															$("#progressMain").removeClass("progress-bar-info")
															$("#progressMain").addClass("progress-bar-danger");
															clearInterval(Timer);
														
														}
													},
                             
											});
										
										
									}else{
										$("#progressMain").removeClass("progress-bar-info")
										$("#progressMain").addClass("progress-bar-danger");
										clearInterval(Timer);
										//$("#progressMain").css({"width":'0%'}).text('0%');
									}
                                },
                             
				});

			}else{
				alert("没有选择任何主机");
			}
	});

	


});


function increment(start,end) {
		 for(var value=start;value>=end;value++){
			$("#progressMain").css("width",value + "%").text(value + "%");
			st = setTimeout(increment,2);
			console.log("value:"+value);
		 }
 }


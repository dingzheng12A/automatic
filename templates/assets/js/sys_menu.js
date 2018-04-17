$(document).ready(function(){
	
	var index=$("div .row #application_deploy").index(this);
	$("#custom_service").click(function(){
		$("div #application_deploy").eq(index).show()
		.siblings().hide();
	});
	
	
	$("#addproduct_btn").click(function(){
		$("#productModal").css({'margin-top': Math.max(0, ($(window).height() - $(this).height()) / 2) });
		$("#productModal").modal("show");
	});
	$("#product_manager").find("#cancle").click(function(){
		$("#productModal").modal("hide");
	});
});
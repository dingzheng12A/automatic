$("#Add_Menu").click(function(){
                // $(".col-xs-12").html("添加用户");
                var index=$("div .row #add_menu").index(this);
                $("div #add_menu").eq(index).show()
                .siblings().hide();
				
				
				

        });
		
$("#add_menu").find("#confirm").click(function(){
	alert('aaaa');
});
$("#add_menu").find("#cancle").click(function(){
	alert('aaaa');
});

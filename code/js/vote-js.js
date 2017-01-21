// 头菜单的下划线
window.onload = act();
function act(){
	$('.start_man').addClass("active");
	$('.joined').click(function(){
		$('.start_man').removeClass("active");
		$(".vote_way li").click(function(){
        $(this).addClass("active").siblings().removeClass("active");
    });
	});  
}
// 勾选匿名投票
$('.vote_square').click(function () {
        var radic = '<span class="radic">&radic;</span>';
        $(this).html(radic);
});
$('.vote_square').on('click','.radic',function () {
    $('span .radic').toggle();
});
$('.vote_square').click(function () {
    $(this).css({"padding-left":"0px","padding-right":"0px"});
    $('.see_noname').css("padding-left","0px");
});

// 日历框
$(".form_datetime").datetimepicker({
    format: "yyyy-mm-dd-hh:ii",
    autoclose: true,
    todayBtn: true,
    todayHighlight: true,
    startDate: new Date(),
    pickerPosition: "bottom-left"
});

// 点击发布输出新建投票
$('.btn-primary').click(function () {
    var _len = $('.row').children('.a_row').length;
    var corl = document.getElementById("input_content");   // 取得输入框对象
    var val = corl.value;                          // 取得输入的内容
    //判断是否输入为空，如果为空则弹出窗口警示，否则继续执行
    if(val == ''){
    	alert("投票名称不能为空哦!");
    }
    else{
    	$('img').remove("#image1");
    	$('span').remove("#task_none");
    	var time_close = new Date(document.getElementById("timeset").value);     //取得截止时间的值
    	//当未选择时间时输出‘未选择时间’
    	if(document.getElementById("timeset").value == 0){
    		var time1_now = '未选择时间';
    	}
    	else{
    	//去除时间的秒
    		var year1 = time_close.getFullYear();
    		var month1 = time_close.getMonth()+1;
    		if(month1 > 0 && month1 < 10){
        		month1 = '0'+ month1;
    		}
    		var day1 = time_close.getDate();
    		if(day1 > 0 && day1 < 10){
       		 	day1 = '0'+ day1;
    		}
    		var hours1 = time_close.getHours();
    		var minutes1 = time_close.getMinutes();
    		var time1_now = year1+'-'+month1+'-'+day1+' '+hours1+':'+minutes1;
   		}
   	 	//获取当前时间
    	var date = new Date();
    	var year = date.getFullYear();
    	var month = date.getMonth()+1;
    	if(month > 0 && month < 10){
        	month = '0'+ month;
    	}
    	var day = date.getDate();
    	if(day > 0 && day < 10){
        	day = '0'+ day;
    	}
    	var hours = date.getHours();
   	 	var minutes = date.getMinutes();
    	var time1 = year+'-'+month+'-'+day+' '+hours+':'+minutes;   //time1为当前时间输出
    
    	//判断截止时间是否大于当前时间
    	if(time1_now>=time1){
    		var time_write = '进行中';
    	}
    	else{
    		var time_write = '已逾期';
    	}
    	var dv = document.getElementById("content");
    	var tag = $('<div class="a_row" id='+_len+' data-target="#vote_details" data-toggle="details"  onclick="writeName('+_len+')">'+
    			'<div class="col-sm-6 _name">'+val+'</div>'+
            	'<div class="col-sm-2 _num">'+time1_now+'</div>'+
            	'<div class="col-sm-2 _status">'+time_write+'</div> '+
           		'<div class="col-sm-2 _operation"><a href="#" class="delete_row" onclick="deletestr('+_len+')">删除</a></div></div> ');
    	$('#content').append(tag);      //将内容添加至主页面中的#content div中
    	$('.title_input').val('');      //点发布时清空上一次输入的
    	var rem = 60;                   //input中可以输入的字数
   	 	$('._red').css("color","grey");
    	document.getElementById("cost_title_length").innerHTML = "还可以输入" + rem + "字数";
    
		//分页
		var pageNo = 1;
    	var pagi = '';
        var pageNO=Number(pageNo);
        pagi+='<li><a href="#" aria-label="Previous" class="previous"></a></li>';
        if(pageNO-2>0){
            pagi += '<li><a href="'+Number(pageNO-2)+'">'+Number(pageNO-2)+'</a></li>';
        }
        if(pageNO-1>0){
            pagi += '<li><a href="'+Number(pageNO-1)+'">'+Number(pageNO-1)+'</a></li>';
        }

        pagi +='<li class="active"><a href="#">'+pageNO+'</a></li>';

        if(pageNO+1<=pageNO){
            pagi +='<li><a href="'+Number(pageNO+1)+'">'+Number(pageNO+1)+'</a></li>';
        }
        if(pageNO+2<=pageNO){
            pagi += '<li><a href="'+Number(pageNO+2)+'">'+Number(pageNO+2)+'</a></li>';
        }
        pagi+='<li> <a href="#" aria-label="Next" class="next"></a> </li>'
            + '<li> <a href="#" class="last"></a> </li>';
    	$('.pagination-sm').html(pagi);
      	
    	//点发布后匿名投票默认为否
    	var chos = document.getElementsByClassName("choose");
   		if(chos == "是"){           //判断是否匿名投票，只是当前这个判断有误，不能执行if里面的代码
    		$('.if_or_not').remove();
    		$('.choose').html('否');
    		$('._voteroot').html('匿名投票');
    	}
    	else{
    		$('._voteroot').html('投票人可见');
    	}
   	}
});

//鼠标经过新建投票
$('#no_content').on('mouseover','.a_row',function(){
	$(this).css({"background-color":"#F3FAFE","border":"1px solid #30B2F4"});
});
$('#no_content').on('mouseout','.a_row',function(){
	$(this).css({"background-color":"white","border":"none"});
});
//弹出投票详情框
$('#no_content').on('click','.a_row',function(){
    $("#vote_details").modal({'show':true,'backdrop':true});
});
//删除投票
var deletestr = function (index) {
    var _len = $('.row').children('.a_row').length;
    $("div[id='"+ index +"']").remove();
}
$('.add_vote').click(function () {
    $('.title_input').attr("value","");
});

// 是否匿名投票
$('.choose').click(function () {
    var html2 = '<div class="if_noname"><input id="yes_name" type="radio" name="_choose" value="" />否'+
        '<input id="yes_name" type="radio" name="_choose" value="" checked/>是' +'</div>';
    $('.if_or_not').append(html2);
});
$('.if_or_not').on('click','.if_noname',function () {
    $('.choose').html('是');
});

//点取消清空输入
$('.btn-default').click(function () {
    $('.fade').toggle();     //模态框消失
    $('.title_input').val('');     //清空input中输入的文字
    $('.if_or_not').remove();       
    $('.choose').html('否');
    var rem = 60;
    $('._red').css("color","grey");
    document.getElementById("cost_title_length").innerHTML = "还可以输入" + rem + "字数";
})

//限制输入字数
function setShowLength(obj, maxlength, id)
{
    var rem = maxlength - obj.value.length;
    var wid = id;
    if (rem < 0){
        rem = 0;
        $('._red').css("color","red");
    }
    document.getElementById(wid).innerHTML = "还可以输入" + rem + "字数";
}
//投票详情显示
var writeName = function(index){
	var _len = $('.row').children('.a_row').length;
	//显示投票名称
	$('#vote_details .modal-body ._votename').html($("div[id='"+ index +"']").children("div:first").html());
	//显示投票截止时间
	var time_close = document.getElementById("timeset").value;
	$('#vote_details .modal-body ._votetime').html($("div[id='"+ index +"']").children().eq(1).html());   //选择第二个子元素并输出这个值
}


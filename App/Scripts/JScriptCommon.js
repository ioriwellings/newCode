//index页面的dataTable扩展
  $.extend($.fn.dataTable.defaults, {
        dom: "<'row'<'col-sm-12'tr>>" +
                "<'row'<'col-sm-5'i><'col-sm-7'p>>",//默认是lfrtip
        processing: true,//加载中
        responsive: true,
        serverSide: true,//服务器模式
        searching: false,//datatables自带的搜索
        pagingType: "full_numbers",//分页模式        
        language: {
            "processing": "努力加载中...",
            "lengthMenu": "每页显示 _MENU_ 条数据",
            "zeroRecords": "没有匹配数据",
            "info": "显示第 _START_ 至 _END_ 项，共 _TOTAL_ 项",
            "infoEmpty": "努力了，但没找到数据",
            "infoFiltered": "",
            "infoPostFix": "",
            "emptyTable": "没有匹配结果",
            "loadingRecords": "载入中...",
            "thousands": ",",
            "paginate": {
                "first": "首页",
                "previous": "上一页",
                "next": "下一页",
                "last": "末页"
            },
            "aria": {
                "sortAscending": ": 以升序排列此列",
                "sortDescending": ": 以降序排列此列"
            }
        }
    });
  function daterangepicker2(id, datepicker) {
      var options = {};
      options.ranges = {
          '今天': [moment(), moment()],
          '昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
          '最近7天': [moment().subtract(6, 'days'), moment()],
          '最近30天': [moment().subtract(29, 'days'), moment()],
          //'This Month': [moment().startOf('month'), moment().endOf('month')],//这个月
          //'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]//上个月
      };
      options.opens = 'right';//日期选择框的弹出位置
      options.singleDatePicker = datepicker;//选择单个时间
      options.buttonClasses = 'btn btn-default';
      options.applyClass = 'btn-small btn-primary blue';
      options.cancelClass = 'btn-small';
      options.locale = {
          separator: ' - ',//时间分割符
          format: 'YYYY-MM-DD',//时间格式
          applyLabel: '确定',
          cancelLabel: '取消',
          fromLabel: '起始时间',
          toLabel: '结束时间',
          customRangeLabel: '自定义',
          daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
          monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
                  '七月', '八月', '九月', '十月', '十一月', '十二月'],
          firstDay: 1
      };
      options.dateFormat = 'YYYY-MM-DD';
      options.showDropdowns = true;//年月加下拉框
      $(id).daterangepicker(options, function (start, end, label) { console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')'); });
  }
function returnParent(value) {//获取子窗体返回值
    var parent = window.dialogArguments; //获取父页面
    //parent.location.reload(); //刷新父页面
    if (parent != null && parent != "undefined") {
        window.returnValue = value; //返回值
        window.close(); //关闭子页面
    }
    return;
}
 function isNumber(id) {

    if (isNaN(Number(id.value))) {

        alert("非法数字");
        id.value = "";

    }
}
//多级联动
function bindDropDownList(id, parentid) {

    if ($(parentid).val() != "") {

        var url = "/Home/GetSysFieldByParent";
        $.ajaxSetup({ cache: false });
        $.getJSON(url, { id: id.substring(1), parentid: parentid.substring(1), value: $(parentid).val() }, function (data) {
            if (data == null) {
                return;
            }
            $.each(data, function (i, item) {
                if (item == null) {
                    return;
                }
                $("<option></option>")
                        .val(item["Value"])
                        .text(item["Text"])
                        .appendTo($(id));
            });
        });
    }
} 

function deleteTable(table, hidden) { //删除table和隐藏的值
    var tableId = document.getElementById(table); //获取表格
    tableId.parentNode.removeChild(tableId); //删除table
    // tableId.style.display = "none";//table隐藏isNaN(Number())
    var hiddenValue = document.getElementById(hidden); //获取隐藏的控件

    //  hiddenValue.value+="";

    if (hiddenValue.value.indexOf(table) > -1) {
        hiddenValue.value = hiddenValue.value.replace(table, ""); //为隐藏控件赋值
    }
}
function showModalMany(me, url, dialogWidth,callback) { //弹出窗体，多选   
    if (dialogWidth == null || dialogWidth == "undefined" || dialogWidth == "") {
        dialogWidth = 968;
    }
    var reValue = window.showModalDialog(url, window, "dialogHeight:500px; dialogWidth:" + dialogWidth + "px;  status:off; scroll:auto");

    if (reValue == null || reValue == "undefined" || reValue == "") {
        return; //如果返回值为空，就返回
    }
	
    var index = reValue.split("^"); //分割符 ^ 的位置
    if (index[0] == null || index[0] == "undefined" || index[0].length < 1) {
        return;
    }
    var hid = index[0].split('&'); //为隐藏控件赋值
    var view = index[1].split('&'); //显示值
    var content = ""; //需要添加到check中的内容
    var h = "";
    for (var i = 0; i < hid.length - 1; i++) {
        if (hid[i] != "undefined" && hid[i] != "" && view[i + 1] != "undefined" && view[i + 1] != "") {
            
			var tableId = document.getElementById(hid[i] + "&" + view[i + 1]); //获取表格
			if(tableId==null)
			{
			h += "^" + hid[i] + "&" + view[i + 1];
            content += '<table  id="' + hid[i] + "&" + view[i + 1] + '" class="deleteStyle"><tr><td><img src="../../../Images/deleteimge.png" title="点击删除"  alt="删除" onclick=" deleteTable(' + "'" + hid[i] + "&" + view[i + 1] + "'," + "'" + me + "'" + ');" /></td><td>' + view[i + 1] + '</td></tr></table>';
			}
        }
    }
    var hidden = document.getElementById(me); //获取隐藏的控件
    hidden.value += h; //为隐藏控件赋值
    var c = document.getElementById("check" + me);
    c.innerHTML += content;
	if(callback!=null)
	{
		callback()
	}
}

function showTreeOnlyEdit(me, url) { //弹出窗体 ,单选
    var hidden = document.getElementById(me); //获取隐藏的控件
    if (hidden.value != null && hidden.value.length > 0) {
        alert("此处为单选，请先删除已有的选项，再次尝试选择。");
        return;
    }
    var reValue = window.showModalDialog(url, window, "dialogHeight:500px; dialogWidth:987px;  status:off; scroll:auto");

    if (reValue == null || reValue == "undefined" || reValue == "") {
        return; //如果返回值为空，就返回
    }
    var index = reValue.split("&"); //分割符 ^ 的位置
    if (index[0] == null || index[0] == "undefined" || index[0].length < 1) {
        return;
    }
    if (index[1] == null || index[1] == "undefined" || index[1].length < 1) {
        return;
    }
    var hid = index[0]; //为隐藏控件赋值
    var view = index[1]; //显示值
    var content = ""; //需要添加到check中的内容

    var href = window.location.href;
    var ref = href.substr(href.lastIndexOf('/') + 1);

    if (hid != null) {
        if (ref == hid) {
            alert("请不要选择同一条数据。");
            return;
        }
        if (hid != "undefined" && hid != "" && view != "undefined" && view != "") {

            content += '<table  id="' + hid + "&" + view
            + '" class="deleteStyle"><tr><td><img src="../../../Images/deleteimge.png" title="点击删除"  alt="删除" onclick=" deleteTable('
            + "'" + hid + "&" + view
             + "'," + "'" + me + "'" + ');" /></td><td>' + view
              + '</td></tr></table>';

            hidden.value = hid; //为隐藏控件赋值
            var c = document.getElementById("check" + me);
            c.innerHTML += content;
            return;
        }
    }
    alert("请只选择一条数据。");
    return;
}

function showModalOnly(me, url) { //弹出窗体 ,单选
    var hidden = document.getElementById(me); //获取隐藏的控件
    if (hidden != null && hidden.value != null && hidden.value.length > 0) {
        alert("此处为单选，请先删除已有的选项，再次尝试选择。");
        return;
    }
    var reValue = window.showModalDialog(url, window, "dialogHeight:500px; dialogWidth:987px;  status:off; scroll:auto");

    if (reValue == null || reValue == "undefined" || reValue == "") {
        return; //如果返回值为空，就返回
    }
    var index = reValue.split("^"); //分割符 ^ 的位置
    if (index[0] == null || index[0] == "undefined" || index[0].length < 1) {
        return;
    }
    var hid = index[0].split('&'); //为隐藏控件赋值
    var view = index[1].split('&'); //显示值
    var content = ""; //需要添加到check中的内容

    if (hid != null && hid.length == 2) {
        var i = 0;

        if (hid[i] != "undefined" && hid[i] != "" && view[i + 1] != "undefined" && view[i + 1] != "") {

            content += '<table  id="' + hid[i]
            + '" class="deleteStyle"><tr><td><img src="../../../Images/deleteimge.png" title="点击删除"  alt="删除" onclick=" deleteTable('
            + "'" + hid[i] + "'," + "'" + me + "'" + ');" /></td><td>' + view[i + 1] + '</td></tr></table>';

            hidden.value = hid[i]; //为隐藏控件赋值
            var c = document.getElementById("check" + me);
            c.innerHTML += content;
            return;
        }
    }
    alert("请只选择一条数据。");
    return;
}

function isInt(t) {
    t.value = t.value.replace(/[^0-9]/g, '')
}
function dia() {
    if ($("#dialo").dialog("isOpen")) {
        $("#dialo").dialog({
            autoOpen: true,

            buttons: {
                "确定": function () {
                    $("#dialo").dialog("close");
                }
            }
        });
    }
}
function BackList(url) {
    $("#contentBody").load(url, function () {

    });
   // window.location.href = '../../' + url;
}
function manyTreeChecked(node, checked, hidControl, treeId) {
    var hidArr = $('#' + hidControl).val().split(',');
    //debugger;
    //alert(hidArr.join(','));
    if (checked) {
        hidArr.push(node.id);
        var nodeChildren = $('#' + treeId).tree("getChildren", node.target);
        if (nodeChildren != null) {
            for (var i = 0; i < nodeChildren.length; i++) {
                treeChecked(nodeChildren[i].id,treeId,"tree-checkbox1");
                hidArr.push(nodeChildren[i].id);
            }
        }
    }
    else {
        //debugger;
        for (var i = 0; i < hidArr.length; i++) {
            if (hidArr[i] == node.id) {
                hidArr.splice(i, 1);
            }
        }
        var nodeChildren = $('#' + treeId).tree("getChildren", node.target);
        if (nodeChildren != null) {
            for (var i = 0; i < nodeChildren.length; i++) {
                treeChecked(nodeChildren[i].id, treeId, "tree-checkbox0");
                for (var j = 0; j < hidArr.length; j++) {
                    if (hidArr[j] == nodeChildren[i].id) {
                        hidArr.splice(j, 1);
                    }
                }
            }
        }
    }
    $('#' + hidControl).val(hidArr.join(','));
}
function bindmanyTreeChecked(checkData, hidControl, treeId) {
    if (checkData == null || checkData == "" || checkData == "undefined") {
        return;
    }
    var menuids = checkData.split(',');
    var hidArr = $('#' + hidControl).val().split(',');
    for (i = 0; i < menuids.length; i++) {
        treeChecked(menuids[i], treeId, "tree-checkbox1");
        hidArr.push(menuids[i]);
    }
    $('#' + hidControl).val(hidArr.join(','));
}
function bindSonTreeChecked(oldData, newData, treeId) {
    if (oldData == null || oldData == "" || oldData == "undefined") {
        return;
    }
    var menuids = oldData.split(',');
    var sonids = newData.split(',');
    for (i = 0; i < menuids.length; i++) {
        for (j = 0; j < sonids.length; j++) {
            if (menuids[i] == sonids[j]) {
                treeChecked(menuids[i], treeId, "tree-checkbox1");
                break;
            }
        }
    }
}
function treeChecked(node, treeId, className) {
    var nodeid = $("#" + treeId).tree("find", node);
    if (nodeid) {
        var ck = $(nodeid.target).find('.tree-checkbox');
        ck.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
        ck.addClass(className);
    }
}
function dateConvert(value) {
    if (value == null) return '';
    var reg = new RegExp('/', 'g');
    var d = eval('new ' + value.replace(reg, ''));
    return new Date(d).format('yyyy-MM-dd')
}

function isInt(t) {
    t.value = t.value.replace(/[^0-9]/g, '')
}
$(function () {
    //时间格式化
    Date.prototype.format = function (format) {
        /*
        * eg:format="yyyy-MM-dd hh:mm:ss";
        */
        if (!format) {
            format = "yyyy-MM-dd hh:mm:ss";
        }

        var o = {
            "M+": this.getMonth() + 1, // month
            "d+": this.getDate(), // day
            "h+": this.getHours(), // hour
            "m+": this.getMinutes(), // minute
            "s+": this.getSeconds(), // second
            "q+": Math.floor((this.getMonth() + 3) / 3), // quarter
            "S": this.getMilliseconds()
            // millisecond
        };

        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    };

     

})
  
//提交表单
function SubmitForm() {
   $("form").submit();

}

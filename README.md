version: v1.0.0

该组件使用requirejs做为模块加载器

dialog的输出为一个对象{Modal:Modal}

调用方式如下

	define(['dialog'],function(dialog){
	var modal = new dialog.Modal();//初始化该模块
	modal.alert({
		width:500,  //模态框的宽度
        height:300,  //模态框的高度
        title:'系统消息',  //提示文字
        content:"",  //模态框内容
        hasCloseBtn:false,  //是否需要关闭按钮
        hasMask:true,  //是否需要遮罩
        isDraggable:true,  //是否可拖拽
        dragHandle:null,  //拖拽把手
        skinClassName:null,  //皮肤
        text4AlertBtn:'确定',  //alert按钮文案
        handler4AlertBtn:null,  //alert按钮事件回调
        handler4CloseBtn:null  //close 事件回调
	   })；
	modal.confirm({
		width:500,  //模态框的宽度
        height:300,  //模态框的高度
        title:'系统消息',  //提示文字
        content:"",  //模态框内容
        hasCloseBtn:false,  //是否需要关闭按钮
        hasMask:true,  //是否需要遮罩
        isDraggable:true,  //是否可拖拽
        dragHandle:null,  //拖拽把手
        skinClassName:null,  //皮肤
		text4ConfirmBtn: "是",  //confirm按钮文案
        text4CancelBtn: "否",  //cancel按钮文案
        handler4ConfirmBtn: null,  //confirm按钮事件处理程序
        handler4CancelBtn: null  //cancel按钮事件处理程序
		})；	
	modal.prompt({
		width:500,  //模态框的宽度
        height:300,  //模态框的高度
        title:'系统消息',  //提示文字
        content:"",  //模态框内容
        hasCloseBtn:false,  //是否需要关闭按钮
        hasMask:true,  //是否需要遮罩
        isDraggable:true,  //是否可拖拽
        dragHandle:null,  //拖拽把手
        skinClassName:null,  //皮肤
		isPromptInputPassword: true, //输入框是否是密码框，否则是文本框
        text4PromptBtn: "输入",  //prompt按钮文案
        handler4PromptBtn: null,  //prompt按钮事件处理程序
        defaultValuePromptInput: "请输入",  //默认prompt输入文字
        promptMaxlength: 20  //输入最大长度
		});
	})
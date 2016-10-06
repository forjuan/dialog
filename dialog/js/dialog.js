define(['widget', 'jquery', 'jqueryUI'],function(widget,$, $UI) {
    function Modal() {
      this.opts = {
        width:500,
        height:300,
        title:'系统消息',
        content:"",
        hasCloseBtn:false,
        hasMask:true,
        isDraggable:true,
        dragHandle:null,
        skinClassName:null,
        text4AlertBtn:'确定',
        handler4AlertBtn:null,
        handler4CloseBtn:null,
        text4ConfirmBtn: "是",
        text4CancelBtn: "否",
        handler4ConfirmBtn: null,
        handler4CancelBtn: null,
        isPromptInputPassword: true,
        text4PromptBtn: "输入",
        handler4PromptBtn: null,
        defaultValuePromptInput: "请输入",
        promptMaxlength: 20
     };
    };
    Modal.prototype = $.extend({}, new widget.Widget(), {
        renderUI: function() {
            var footerContent = "";
            switch (this.opts.modalType){
                case "alert": footerContent = "<input class='modal-alertBtn' type='button' value='" + this.opts.text4AlertBtn + "'>";
                              break;
                case "confirm": footerContent = "<input class='modal-confirmBtn' type='button' value ='" + this.opts.text4ConfirmBtn+"'>"+
                                "<input class='modal-cancelBtn' type='button' value='" + this.opts.text4CancelBtn + "'>";
                              break;
                case "prompt": this.opts.content += "<p class='modal-promptInputWrapper'><input type="+
                                (this.opts.isPromptInputPassword? "password" : "text")+"' value='" + this.opts.defaultValuePromptInput + "' maxlength='"+
                                this.opts.promptMaxlength + "' class='modal-promptInput'></p>";
                                footerContent = "<input class='modal-promptBtn' type='button' value ='" + this.opts.text4PromptBtn+"'>"+
                                "<input class='modal-cancelBtn' type='button' value='" + this.opts.text4CancelBtn + "'>";
                                break;

            } 
            this.modalBox = $("<div class='modal'>" +
                "<div class = 'modal-header'>" + this.opts.title + "</div>"+
                "<div class='modal-body'>" + this.opts.content + "</div>" +
                "<div class='modal-footer'>" + footerContent + "</div>" +
                "</div>");
            // mask
            if (this.opts.hasMask) {
                this._mask = $("<div class='modal-mask'></div>");
                this._mask.appendTo("body");
            }
            // if hasclosebtn 
            if(this.opts.hasCloseBtn){
                this.modalBox.append("<span class='modal-close'>X</span>");
            }
            // 禁止背景滚动
            $("body").addClass("modal-open");
            this.modalBox.appendTo(document.body);
            this.promptInput = this.modalBox.find(".modal-promptInput");
        },
        bindUI: function() {
            var _this = this;
            this.modalBox.delegate(".modal-alertBtn", "click", function() {
                _this.fire("alert");
                _this.destroy(); //destroy  what things?
            });
            this.modalBox.delegate(".modal-close", "click", function() {
                _this.fire("close");
                _this.destroy();
            });
            this.modalBox.delegate(".modal-confirmBtn","click",function(){
                _this.fire("confirm");
                _this.destroy();
            });
            this.modalBox.delegate(".modal-cancelBtn","click",function(){
                _this.fire("cancel");
                _this.destroy();
            });
            this.modalBox.delegate(".modal-promptBtn","click",function(){
                _this.fire("prompt",_this.promptInput.val());
                _this.destroy();
            });
            if (this.opts.handler4AlertBtn) {
                this.on("alert", this.opts.handler4AlertBtn);
            }

            if (this.opts.hasCloseBtn) {
                this.on("close",this.opts.handler4CloseBtn);
            }
            if (this.opts.handler4ConfirmBtn){
                this.on("confirm",this.opts.handler4ConfirmBtn);
            }
            if (this.opts.handler4CancelBtn){
                this.on("cancel",this.opts.handler4CancelBtn);
            }
            if (this.opts.handler4PromptBtn){
                this.on("prompt",this.opts.handler4PromptBtn);
            }
        },
        syncUI: function() {
            this.modalBox.css({
                width: this.opts.width + 'px',
                height: this.opts.height + 'px',
                left: (this.opts.x || (window.innerWidth - this.opts.width) / 2) + 'px',
                top: (this.opts.y || (window.innerHeight - this.opts.height) / 2) + 'px'
            });
            if (this.opts.skinClassName) {
                this.modalBox.addClass(this.opts.skinClassName);
            };
            if (this.opts.isDraggable) {
                if (this.opts.dragHandle) {
                    this.modalBox.draggable({ handle: this.opts.dragHandle });
                } else {
                    this.modalBox.draggable();
                }
            };
        },
        distructor: function(){
          this._mask && this._mask.remove();
          $(".modal-open").removeClass("modal-open");
        },
        alert: function(options) {
             this.opts = $.extend(this.opts, options || {}, {modalType: "alert"});
             this.render();
            // 实现连缀语法
            return this;
        },
        confirm: function(options){
            this.opts = $.extend(this.opts, options || {}, {modalType: "confirm"});
            this.render();
            return this;
        },
        prompt: function(options){
            this.opts = $.extend(this.opts, options || {}, {modalType: "prompt"});
            this.render();
            this.promptInput.focus();
            return this;
        }
    });

    return {
        Modal: Modal
    };
});


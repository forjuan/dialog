define(['jquery'],function($){
	function Widget(){
		this.modalBox = null;
	}
	
	Widget.prototype = {
		on: function(type,handler){
				 if(this.handlers[type] == undefined){
              this.handlers[type] = [];
          }
          if(typeof handler == "function"){
            this.handlers[type].push(handler);
          }
          return this;
		},
		fire: function(type,data){
			 if(this.handlers[type] instanceof Array){
           var handlers = this.handlers[type];
           for(var i= 0,len = handlers.length;i<len;i++){
               if(typeof handlers[i] == "function") {
                  handlers[i](data);
               } 
           }
        }
		},
		renderUI: function(){},
		bindUI: function(){},
		syncUI: function(){},
		render:function(container){
				this.renderUI();
				this.handlers = {};
				this.bindUI();
				this.syncUI();
				$(container || document.body).append(this.modalBox);
		},
		distructor: function(){},
		destroy: function(){
			this.distructor();
			this.modalBox.off();//清除该元素上绑定的handler
			this.modalBox.remove();//从dom tree清除
		}
	}

	return {
		Widget:Widget
	}
});
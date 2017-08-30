/*
 * @Author: 姚林纲
 * @Date:   2017-03-14 15:53:17
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-07-24 15:02:23
 */
(function(jQuery){
	
	/**
	 * 移除数组指定位置的元素
	 */

	Array.prototype.remove=function(dx){
		if(isNaN(dx)||dx>this.length){
			return false;
		}
		for(var i=0,n=0;i<this.length;i++){
			if(this[i]!=this[dx]){
				this[n++]=this[i];
			}
		}
		this.length-=1;
	}

	/**
	 * 移除指定值的元素
	 */
	Array.prototype.removeVal=function(dx){
		var isremove = false;
		if((this.length==1)&&(this[0]==dx)){
			this.length=0;
			this[0] == "";
			return;
		}
		for(var i=0,n=0;i<this.length;i++){
			if(this[i]!=dx){
				this[n++]=this[i];
			}else{
				isremove = true;
			}
		}
		if(isremove){
			this.length-=1;
		}
	}
	
	var bindWindowClick = function(){
		$(document).click(function(events){
			var targetCls = events.target.getAttribute('class');
			if(!targetCls || targetCls.indexOf('b-selectOption') < 0){
				$(".b-allOptions").addClass('noElement');
			}
    	});
	}
	
	
	/**
	 * 下拉框方法
	 */
	$.fn.triber_select = function(option){
		var definedOption = {
			data:[],
			onselect:function(){
				
			}
		};
		$.extend(definedOption,option);
		var _this = this;
		var li_str = "";
		if(!definedOption){
			return null;
		}
		if(definedOption.data){
			li_data = definedOption.data;
			for(var i = 0; i< li_data.length;i++){
				li_str = li_str + '<li value = "'+li_data[i].key+'"><a href="javascript:;" title="'+li_data[i].text+'">'+li_data[i].text+'</a></li>';
			}
		}
		_this.addClass("select_box");
		_this.html('<span class="b-selectOption">--请选择--</span>'
			+'<ul class="b-allOptions noElement">'
			+li_str
			+'</ul>');
		_this.find(".b-selectOption").click(function() {
	        var option_this = $(this);
	        var topDistance=option_this.offset().top;
	        var documentHeight=$(document).height();
	        var bottomDistance=documentHeight-topDistance;
	        if(bottomDistance<260){
	  	    	   _this.find(".b-allOptions").addClass("turnUp");
	  	       }
	        var allOptionsClass = _this.find(".b-allOptions").attr('class');
	        if(allOptionsClass && allOptionsClass.indexOf('noElement') >= 0){
	        	$(".b-allOptions").addClass('noElement');
	        	_this.find(".b-allOptions").removeClass('noElement');
	        }else{
	        	_this.find(".b-allOptions").addClass('noElement');
	        }
	        _this.find(".b-allOptions li").each(function() {
	            var li_this = $(this);
	            li_this.unbind("click").click(function() {
	            	_this.find(".b-allOptions").removeClass("turnUp");
	                var select_value = li_this.text();
	                _this.selectValue = li_this.attr("value");
	                _this.selectText=li_this.text();
	                option_this.text(select_value);
	                _this.find(".b-allOptions").addClass('noElement');
	                definedOption.onselect.call(_this,_this.selectValue);
	            });
	        });
	    });
		bindWindowClick();
	    function setSelectVal(tag,key){
			tag.selectValue = key;
			var  i = 0;
			for(i=0;i<option.data.length;i++){
				if(option.data[i].key == key){
					$(tag).find(".b-selectOption").text(option.data[i].text);
					tag.selectText=option.data[i].text;
				}
			}
		}

		$.fn.extend(_this,{
			/**
			 * 获取数值方法
			 */
			getValue:function(){
				return this.selectValue;
			},
			getText:function(){
				return this.selectText;
			},
			setValue:function(key){
				setSelectVal(this,key);
				definedOption.onselect.call(_this,_this.selectValue);
			}
		});
		
		return _this;
	}
	
	/**
	 * 复选框方法
	 */
	$.fn.triber_checkbox = function(option){
		var definedOption = {
			data:[],
			onclick:function(){
				
			}
		};
		$.extend(definedOption,option);
		this.selectValue = [];
		this.selectText=[];
		var _this = this;
		if(!definedOption){
			return null;
		}
		var a_str = "";
		if(definedOption.data){
			li_data = definedOption.data;
			for(var i = 0; i< li_data.length;i++){
				if(li_data[i].selected){
					_this.selectValue.push(li_data[i].key);
					_this.selectText.push(li_data[i].text);
					a_str = a_str 
					+'<a href="javascript:;" value="'+li_data[i].key+'"  class="check active only_select">'
					+'<i class="check-img"></i><span>'+li_data[i].text+'</span>'
					+'</a>';
				}else{
					a_str = a_str 
					+'<a href="javascript:;" value="'+li_data[i].key+'"  class="check only_select">'
					+'<i class="check-img"></i><span>'+li_data[i].text+'</span>'
					+'</a>';
				}
			}
		}
		_this.addClass("self-checkbox");
		_this.html(a_str);
		_this.find(".only_select").click(function(){
			var $this=$(this);
       		$this.toggleClass('active');
       		var exist = false;
       		for(var i=0;i<_this.selectValue.length;i++){
       			if(_this.selectValue[i]==$this.attr('value')){
       				exist = true;
       				_this.selectValue.removeVal($this.attr('value')); 
       				_this.selectText.removeVal($this.find('span').text());
       			}
       		}
       		if(!exist){
       			_this.selectValue.push($this.attr('value'));
       			_this.selectText.push($this.find('span').text());
       		}
       		definedOption.onclick.call(_this,_this.selectValue);
		});
		
		function isArray(o){
			return Object.prototype.toString.call(o)=='[object Array]';
		}
		
		function clearAllValue(tag){
	    	$(tag).find(".only_select").each(function(){
	    		$(this).removeClass('active');
	    		tag.selectValue = [];
	    	});
	    }
		
		function judgePushSelectVal(tag,key){
			var hasStore = false;
			for(var i=0; i<tag.selectValue.length;i++){
				if(tag.selectValue[i] == key){
					hasStore = true;
				}
			}
			if(!hasStore){
				tag.selectValue.push(key);
			}
		}
		
	    function setCheckBoxVal(tag,key){
	    	if(isArray(key)){
	    		$(tag).find(".only_select").each(function(){
	    			var isCheck = true;
	    			var val = $(this).attr('value');
	    			for(var i = 0; i < key.length; i++){
	    				if(key[i] == val){
	    					isCheck = false;
	    					$(this).addClass('active');
	    					judgePushSelectVal(tag,key[i]);
	    				}
	    			}
	    			if(isCheck){
	    				$(this).removeClass('active');
	    				tag.selectValue.removeVal(val);
	    			}
	    		});
	    	}else{
				$(tag).find(".only_select").each(function(){
	    			var val = $(this).attr('value');
    				if(key == val){
    					$(this).addClass('active');
    					judgePushSelectVal(tag,key);
    				}
	    		});
	    	}
	    }
		$.fn.extend(_this,{
			/**
			 * 获取数值方法
			 */
			getValue:function(){
				return this.selectValue;
			},
			getText:function(){
				return this.selectText;
			},
			setValue:function(key){
				setCheckBoxVal(this,key);
			},
			clearValue:function(){
				clearAllValue(this);
			}
		});
		
		return _this;
	}
	
	/**
	 * 初始化单选框方法
	 */
	$.fn.triber_radiobox = function(option){
		var definedOption = {
			data:[],
			onclick:function(){
				
			}
		};
		$.extend(definedOption,option);
		var _this = this;
		if(!definedOption){
			return null;
		}
		var a_str = "";
		if(definedOption.data){
			li_data = definedOption.data;
			for(var i = 0; i< li_data.length;i++){
				if(li_data[i].selected){
					_this.selectValue = li_data[i].key;
					_this.selectText=li_data[i].text;
					a_str = a_str 
					+'<a href="javascript:;" value="'+li_data[i].key+'"  class="radio active only_select">'
					+'<i class="radio-img"></i><span>'+li_data[i].text+'</span>'
					+'</a>';
				}else{
					a_str = a_str 
					+'<a href="javascript:;" value="'+li_data[i].key+'"  class="radio only_select">'
					+'<i class="radio-img"></i><span>'+li_data[i].text+'</span>'
					+'</a>';
				}
			}
		}
		_this.addClass("self-radio");
		_this.html(a_str);
		_this.find(".only_select").click(function(){
			var $this=$(this);
       		$this.addClass('active').siblings().removeClass('active');
       		_this.selectValue = $this.attr('value');
       		_this.selectText=$this.find("span").text();
       		definedOption.onclick.call(_this,_this.selectValue);
		});
		
		function setRadioVal(tag, key){
			var reasult = false;
			$(tag).find(".only_select").each(function(){
				var val = $(this).attr('value');
				if(val == key){
					tag.selectValue = val;
					tag.selectText = $(this).find("span").text();
					$(this).addClass('active').siblings().removeClass('active');
					reasult = true;
				}
			});
			return reasult;

		}
		/**
		 * 获取数值方法
		 */
		$.fn.extend(_this,{
			getValue:function(){
				return this.selectValue;
			},
			setValue:function(key){
				return setRadioVal(this,key);
			},
			getText:function(){
				return this.selectText;
			}
		});
		
		return _this;
	}
})(jQuery);
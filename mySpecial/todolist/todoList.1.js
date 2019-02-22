window.onload = function(){
	var oTaskType = document.getElementsByClassName('taskType')[0];
	var taskTypeList = oTaskType.getElementsByTagName('li');
	var oTaskList = document.getElementsByClassName('taskList');
	var oForm = document.getElementById('oForm');
	var oUnfinishedList = document.getElementsByClassName('unfinishedList')[0];//未完成列表
	var oFinishedList = document.getElementsByClassName('finishedList')[0];//完成列表
	var oAllList = document.getElementsByClassName('allList')[0];//全部列表
	
	var oNoTask = document.getElementsByClassName('noTask')[0]//无任务
	var oCont = document.getElementsByClassName('cont')[0]//任务
	var unfinshedNum = document.getElementsByClassName('unfinshedNum')[0];//未完成数量
	
	unfinshedNum.innerHTML = (oUnfinishedList.children.length+1)+'个任务未完成';
	
	//判断已完成未完成任务数量
	judgeList();
	function judgeList(){
		var nextSiblingFinshed = oFinishedList.nextElementSibling || oFinishedList.nextSibling;
		var nextSiblingUnfinshed = oUnfinishedList.nextElementSibling || oUnfinishedList.nextSibling;
		oFinishedList.children.length == 0 ? nextSiblingFinshed.style.display = 'block' : 
											nextSiblingFinshed.style.display = 'none';
		oUnfinishedList.children.length == 0 ? nextSiblingUnfinshed.style.display = 'block' :
											  nextSiblingUnfinshed.style.display = 'none';
	}
	
	// 判断当前是否有任务
	noTask();
	function noTask(){
		if(oAllList.children.length == 0){
			oNoTask.style.display = 'block';
			oCont.style.display = 'none';
		}
	}
	// 添加
	function addTask(){
		var taskVal, = oForm.addText.value;
		if(taskVal==''){
			alert('请输入任务')
		}else{
			oNoTask.style.display = 'none';
			oCont.style.display = 'block';
			var htmlItem = '';
			htmlItem += '<li class="unfinishedCont"><input type="checkbox" class="setFinish"/><span class="taskCont">'+taskVal+'</span>';
			htmlItem += '<span class="removeTask">x</span></li>';
			
			
			var todo = {"title":taskVal,"done":false}
			oAllList.innerHTML += htmlItem;
			oForm.addText.value = '';
			removeFn();
			doFinished(); //设置已完成
			unfinishedCont()
		}
		
	}
	function loadData(){
		var collection=localStorage.getItem("todo");
		if(collection!=null){
			return JSON.parse(collection);
		}
		else return [];
	}
	
	// unfinished内容
	function unfinishedCont(){
		// finishedCont
		// oAllList
		var taskData = [];
		var taskCont = '';
		var taskChild = oAllList.children
		for(let i = 0; i<taskChild.length; i++){
			taskCont = taskChild[i].getElementsByClassName('taskCont')[0].innerHTML;
			taskData.push(taskChild[i].className+'-'+taskCont);
		}
		console.log('taskChild.length==='+taskChild.length)
		var html = '';
		for(let i = 0; i<taskData.length; i++){
			if(taskChild[i].className == 'unfinishedCont'){
				html += '<li class="unfinishedCont"><input type="checkbox" class="setFinish"/><span class="taskCont">'+taskCont+'</span>';
				html += '<span class="removeTask">x</span></li>';
				oUnfinishedList.innerHTML += html;
			}
		}
		doFinished(taskData)
	}
	oForm.addBtn.onclick = addTask;
	document.onkeydown = function(ev) {
		var ev = ev || event;
		if(ev.keyCode == 13){
			addTask();
			return false;
		}
	}
	// 设置已完成
	function doFinished(taskData){
		var setFinish = oAllList.getElementsByClassName('setFinish');
		for(var i = 0 ; i<setFinish.length; i++){
			setFinish[i].index = i;
			setFinish[i].onclick = function(){ 
				if(this.checked == true){
					var finishedState = this.nextElementSibling || this.nextSibling;
					finishedState.className = 'taskCont finshedTask';
					this.parentNode.className = 'finishedCont';
					
					console.log(taskData)
					for(let j = 0; j < taskData.length; j++){
						var cla = taskData[j].substring(0,14);
						if(cla == 'unfinishedCont'){
							unfinishedCont();
						}
					}
				}
			}
			
		}
	}
	// 删除
	function removeFn(){
		var oRemoveBtn = document.getElementsByClassName('removeTask');
		for(let i = 0; i<oRemoveBtn.length; i++){
			oRemoveBtn[i].onclick = function(){
				// 要删除的子节点父元素.removeChild(要删除的子节点) 
				let grandParent = this.parentNode.parentNode;
				grandParent.removeChild(this.parentNode);
				noTask()
			}
		}
	}

	// 选项卡			
	for( var i = 0; i<taskTypeList.length; i++){
		taskTypeList[i].index = i;
		taskTypeList[i].onclick = function(){
			if(this.className = ' '){
				for( var j = 0; j<taskTypeList.length; j++){
					taskTypeList[j].className = '';
					oTaskList[j].className = 'taskList';
				};
				this.className = 'on';
				oTaskList[this.index].className = 'taskList show';
				judgeList();
			}
		}
	};
}

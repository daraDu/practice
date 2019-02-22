window.onload = function(){
	load();
	tabFn();
}

function postAction(){
	var oForm = document.getElementById('oForm');
	if(oForm.addText.value == ''){
		alert('请输入任务')
	}else{
		let taskData = loadData();
		let todoData = {"title": oForm.addText.value, 'todo': true};
		taskData.push(todoData);
		savaData(taskData)
		oForm.reset();
	}
}
function loadData(){
	var collection = localStorage.getItem("todo");
	if(collection!=null){
		return JSON.parse(collection);
	}else{
		return [];
	}
}
function savaData(data){
	localStorage.setItem("todo", JSON.stringify(data))
}

function load(){
	let allList = document.getElementById('allList');
	let todoList = document.getElementById('todoList');
	let finishedList = document.getElementById('finishedList');
	let taskData = JSON.parse(localStorage.getItem("todo"))
	
	console.log(taskData)
	var allHtml = ''
	var todoHtml = '';
	var doHtml = '';
	for(let i = 0; i<taskData.length; i++){
		
		allHtml += '<li><input type="checkbox" class="setFinish"/>';
		if(taskData[i].todo){	
			
			allHtml += '<span class="taskCont" taskTodo = "'+taskData[i].todo+'">'+taskData[i].title+'</span>';
		
			todoHtml += '<li><input type="checkbox" class="setFinish"/>';
			todoHtml += '<span class="taskCont" taskTodo = "'+taskData[i].todo+'">'+taskData[i].title+'</span>';
			todoHtml += '<span class="removeTask">x</span></li>';
		}else{	
			
			allHtml += '<span class="taskCont finshedTask" taskTodo = "'+taskData[i].todo+'">'+taskData[i].title+'</span>';
		
			doHtml += '<li><input type="checkbox" class="setFinish" checked="checked"/>';
			doHtml += '<span class="taskCont finshedTask" taskTodo = "'+taskData[i].todo+'">'+taskData[i].title+'</span>';
			doHtml += '<span class="removeTask">x</span></li>';
		}
		allHtml += '<span class="removeTask">x</span></li>';
		
		
	}
	allList.innerHTML = allHtml;
	todoList.innerHTML = todoHtml;
	finishedList.innerHTML = doHtml;
};

// 选项卡
function tabFn(){			
	var oTaskType = document.getElementsByClassName('taskType')[0];
	var taskTypeList = oTaskType.getElementsByTagName('li');
	var oTaskList = document.getElementsByClassName('taskList');
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
			}
		}
	};
}
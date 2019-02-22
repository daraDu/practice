var list = [
	{ 
		"cont": '11111',
		"todo": false, //未完成false
	},
	{ 
		"cont": '22222',
		"todo": true, //完成true
	},
]
var vm = new Vue({
	el: '.box',
	data: {
		list: [],
		tabId: 0,
		taskVal: "",
		editVal:"",
	},
	methods: {
		// 添加任务
		addTask(){
			var _this = this;
			if(this.taskVal == ""){
				alert('请输入任务')
			}else{
				var listData = _this.loadData();
				listData.push({
					"cont": _this.taskVal,
					"todo": false,
				})
				_this.upData(listData)
				_this.taskVal = "";
			}
		},
		// 删除任务
		removeTask(index){
			var listData = this.loadData();
			listData.splice(index,1);
			this.upData(listData)
		},
		// 修改任务
		edit(item){
			this.editVal = item;
		},
		// 确认修改
		sureEdit(index){
			var listData = this.loadData();
			this.editVal.todo = false;
			listData[index] = this.editVal;
			this.upData(listData)
		},
		// 取消修改
		cancelEdit(index){
			this.editVal = "";
			var listData = this.loadData();
			listData[index].cont = listData[index].cont;
			this.upData(listData)
		},
		//已完成未完成切换
		todoTab(index){
			var listData = this.loadData();
			listData[index].todo = !listData[index].todo;
			this.upData(listData)
		},
		// 将数据储存到localstorage
		savaData(data){
			localStorage.setItem("list",JSON.stringify(data))
		},
		// 更新数据
		upData(listData){
			this.savaData(listData);
			this.list = JSON.parse(localStorage.getItem("list"));
		},
		loadData(){
			var collection = localStorage.getItem("list");
			if(collection != null){
				return JSON.parse(collection)
			}else{
				return []
			};
		}
	},
	computed:{
		unfinshedNum(){
			
		}
	},
	created() {
		this.loadData();
		this.list = this.loadData();
	}
})
function add(){
	let display=document.getElementById("display").value;
	let task=document.getElementById("tasks");
	
	if(display===""){
		alert("Write task in display");
	}else{
		let li=document.createElement('li');
		
		//create div
		let div=document.createElement('div');
		div.style.display="flex";
		div.style.alignItems="center";
		div.style.gap= "5px";
		
		//Create checkbox
		let check=document.createElement('input');
		check.type="checkbox";
		check.onclick = function(){
			if(check.checked){
				text.style.textDecoration="line-through";
				text.style.color="gray";
			}else{
				text.style.textDecoration="none";
				text.style.color="black";
			}
			saveData(); // ✅ NEW
		}
		
		//task text
		let text=document.createElement('span');
		text.innerText=display;
		
		//li.style
		li.style.border="1px solid black";
		li.style.background="white";
		li.style.borderRadius="8px";
		li.style.padding="10px";
		li.style.margin="5px 0";
		li.style.display="flex";
		li.style.alignItems="center";
		li.style.justifyContent="space-between";
		
		//add delete task btn
		let del_btn=document.createElement('button');
		del_btn.innerText="Delete";
		del_btn.style.background= "linear-gradient(45deg, #b721ff, #0047ab)";
		del_btn.style.color= "white";
		del_btn.style.borderRadius="8px";
		del_btn.style.border="none";
		del_btn.style.padding="5px 10px";
		del_btn.style.fontWeight="bold";
		del_btn.onclick = function(){
			li.remove();
			saveData(); // ✅ NEW
		}
		
		//append elements
		div.appendChild(check);
		div.appendChild(text);
		li.appendChild(div);
		li.appendChild(del_btn);
		task.appendChild(li);
		
		//Clear display text
		document.getElementById("display").value="";
		
		saveData(); // ✅ NEW (after adding)
	}
}


// ✅ SAVE FUNCTION
function saveData(){
	let allTasks = [];
	
	document.querySelectorAll("#tasks li").forEach(li => {
		let text = li.querySelector("span").innerText;
		let checked = li.querySelector("input").checked;
		
		allTasks.push({text: text, checked: checked});
	});
	
	localStorage.setItem("tasks", JSON.stringify(allTasks));
}


// ✅ LOAD DATA WHEN PAGE OPENS
window.onload = function(){
	let data = localStorage.getItem("tasks");
	
	if(data){
		let tasks = JSON.parse(data);
		
		tasks.forEach(t => {
			// recreate task
			let li=document.createElement('li');
			
			let div=document.createElement('div');
			div.style.display="flex";
			div.style.alignItems="center";
			div.style.gap= "5px";
			
			let check=document.createElement('input');
			check.type="checkbox";
			check.checked = t.checked;
			
			let text=document.createElement('span');
			text.innerText=t.text;
			
			// apply style if checked
			if(t.checked){
				text.style.textDecoration="line-through";
				text.style.color="gray";
			}
			
			check.onclick = function(){
				if(check.checked){
					text.style.textDecoration="line-through";
					text.style.color="gray";
				}else{
					text.style.textDecoration="none";
					text.style.color="black";
				}
				saveData();
			}
			
			let del_btn=document.createElement('button');
			del_btn.innerText="Delete";
			del_btn.style.background= "linear-gradient(45deg, #b721ff, #0047ab)";
			del_btn.style.color= "white";
			del_btn.style.borderRadius="8px";
			del_btn.style.border="none";
			del_btn.style.padding="5px 10px";
			del_btn.style.fontWeight="bold";
			del_btn.onclick = function(){
				li.remove();
				saveData();
			}
			
			li.style.border="1px solid black";
			li.style.background="white";
			li.style.borderRadius="8px";
			li.style.padding="10px";
			li.style.margin="5px 0";
			li.style.display="flex";
			li.style.alignItems="center";
			li.style.justifyContent="space-between";
			
			div.appendChild(check);
			div.appendChild(text);
			li.appendChild(div);
			li.appendChild(del_btn);
			
			document.getElementById("tasks").appendChild(li);
		});
	}
}
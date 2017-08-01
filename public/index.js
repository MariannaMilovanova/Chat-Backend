var elements = {
	getUserButton: document.querySelector('#get-user'),
	deleteUserButton: document.querySelector('#delete-user'),
	getUsersButton: document.querySelector('#get-users'),
	userIdInput: document.querySelector('#user-id'),
	usersContainer: document.querySelector('#users-container'),
	getInteraction: document.querySelector('#get-interaction'),
	createUserButton: document.querySelector('#create-user'),
	userName: document.querySelector('#user-name'),
	userEmail: document.querySelector('#user-email'),
	getMessages: document.querySelector('#get-messages')
};

let userId = 4;
(function(){
	bindListeners();
})();

var currentUsers = [];

function bindListeners(){
	elements.getUsersButton.addEventListener('click', function(event){
		getUsers(null, function(err, users){
			renderUsers(users);
		});
	});

	elements.getUserButton.addEventListener('click', function(event){
	
		var userId = Number(elements.userIdInput.value);
		if (!isNaN(userId)){
			getUsers(userId, function(err, users){
				renderUsers(users);
			});
		}
	});

	elements.deleteUserButton.addEventListener('click', function(event){
		var userId = Number(elements.userIdInput.value);
		if (!isNaN(userId)){
			deleteUser(userId, function(isSuccess){
				if (isSuccess){
					renderUsers
				}
			});
		}
	});

	elements.createUserButton.addEventListener('click', function(event){
		var userNameInp = String(elements.userName.value);
		var userEmailInp = String(elements.userEmail.value);
		let newUser = {
			id: ++userId,
			name: `${userNameInp}`,
			email: `${userEmailInp}`
		}

		if ( userNameInp != "" && userEmailInp != ""){
			
				addUser(newUser, function(){
					console.log('done');
				});
					
		} else {
			elements.usersContainer.innerHTML = "Please enter BOTH user name and user email!";
		}
	});	
}

function renderUsers(users){
	if (!users){
		users = currentUsers;
	}
	elements.usersContainer.innerHTML = '';

	for (var i = 0; i < users.length; i++) {
		var user = users[i];
		var userContainer = document.createElement('div');
		userContainer.className = 'user-container';

		var userId = document.createElement('div');
		userId.innerText = user.id;
		userContainer.appendChild(userId);

		var userName = document.createElement('div');
		userName.innerText = user.name;
		userName.className = 'user-name';
		userContainer.appendChild(userName);

		var userEmail = document.createElement('div');
		userEmail.innerText = user.email;
		userContainer.appendChild(userEmail);

		elements.usersContainer.appendChild(userContainer);
	}
}

function deleteUser(id, callback){
	var connection = new XMLHttpRequest();
	connection.addEventListener('load', reqListener);
	connection.open('DELETE', '/api/user/' + id);
	connection.send();

	function reqListener(event){
		callback(this.status === 200);		
	}
}


function getUsers(id, callback){
	var idString = '';
	var isOneUser = false;
	if (id !== null){
		idString = '/' + id;
		isOneUser = true;
	}
	var connection = new XMLHttpRequest();
	connection.addEventListener('load', reqListener);
	connection.open('GET', '/api/user' + idString);
	connection.send();

	function reqListener(event){
		try {
			var resp = JSON.parse(this.responseText);
			if (isOneUser){
				resp = [resp];
			} else {
				currentUsers = resp;
			}
		} catch(e){
			return callback(new Error('error parsing response'));
		}
		callback(null, resp);
	}
}



function addUser(newUser, callback){
 	var NewNewUser = JSON.stringify(newUser);
	var xhr = new XMLHttpRequest(),
    	method = "POST";
    	url = "/api/user";
		xhr.open(method, url, true);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.onreadystatechange = function () {
  			if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
    			console.log(NewNewUser);
  			}
		};
		xhr.send(NewNewUser);
	

	function reqListener() {
		callback("sdsd");
	}
}

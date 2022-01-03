let userTable = document.getElementById('userTable');

 async function generetaUserTable(config) {
  let table = document.createElement('table');
  table.classList.add('table');
  let tHead = document.createElement('thead');
  let row = document.createElement('tr');

  table.appendChild(tHead);
  tHead.appendChild(row);

  for(let i = 0;i < config.columns.length;i++){
      let cellTh = document.createElement('th');
      cellTh.innerHTML = config.columns[i].title;
      row.appendChild(cellTh);
      cellTh.classList.add('Th');
    }

  let tBody = document.createElement('tbody');

  table.insertAdjacentElement('beforeend', tBody);

  if(config.apiUrl != undefined){
    const urlApi = config.apiUrl;
    let response = await fetch(urlApi);
    const data = await response.json();
    
    for(let i = 0; i < Object.keys(data.data).length; i++ ){
        let btnDel = document.createElement('button');
        btnDel.innerHTML = 'delete';
        btnDel.classList.add('del');
        btnDel.id = Object.keys(data.data)[i];
        let btnId = btnDel.id;
        btnDel.addEventListener('click',() =>{
          deleteUser(btnId)
        });

        let rows = document.createElement('tr');
        rows.classList.add('rows');
        let objValue = Object.values(data.data)
       for(let j = 0; j < Object.values(objValue[i]).length; j++){
           let cell = document.createElement('td');
           cell.innerHTML = Object.values(objValue[i])[j];
           rows.appendChild(cell);
           cell.classList.add('bord');
       }
       rows.appendChild(btnDel);
       tBody.appendChild(rows);
    }

    let btnAdd = document.querySelector('.addUser');

    btnAdd.addEventListener('click',() =>{

        let rowAdd = document.createElement('tr');
        let btnUser = document.createElement('button');
        btnUser.innerHTML = 'adds';
        btnUser.classList.add('add');

        for( let el of config.columns ){
        let cellAdd = document.createElement('td');
        let input = document.createElement('input');
        input.classList.add('inputs');

        input.placeholder = el.value;
        input.name = el.value;

        if(el.value === 'birthday'){
          input.type = 'date'
        }
        cellAdd.appendChild(input);
        rowAdd.classList.add('row');
        rowAdd.appendChild(cellAdd);
        cellAdd.classList.add('bord');

        input.addEventListener('input',() =>{
          input.classList.add('filed');
          input.classList.remove('empty');
        });
        if(!input.classList.contains('filed')){
          input.classList.add('empty');
        }
        }
        btnUser.addEventListener('click',() =>{
          let newUser = {}
          let inputs = document.querySelectorAll('.inputs');
          for(let inp of inputs){
            if(inp.classList.contains('empty')){
              inp.placeholder = 'Enter data';
            }else{
            newUser[inp.name] = inp.value
          
          addNewUser(config.apiUrl, newUser).then(()=>{
            window.location.reload()
          });
        
      }
    }

        });           
        rowAdd.appendChild(btnUser)
        tBody.insertAdjacentElement('beforebegin', rowAdd)
    });

  }
  userTable.appendChild(table)
 }

const config1 = {
   parent: '#usersTable',
   columns: [
     {title: 'name', value: 'name'},
     {title: 'surname', value: 'surname'},
     {title: 'avatar', value: 'avatar'},
     {title: 'birthday', value: 'birthday'},
     
   ],
   apiUrl: 'https://mock-api.shpp.me/vproshachenko/users'
};


async function addNewUser(url, user) {
  const response = await fetch(url, {
      method: 'POST',
      headers: {"Content-type": "application/json"},
      body: JSON.stringify(user)
  })
  if (response.ok) {
      return false;
  }
}

async function deleteUser(id){
  let userUrl = `${config1.apiUrl}/${id}`;
  let response = await fetch(userUrl, {method: "DELETE"});
  window.location.reload()
  if (response.ok) {
    return false
}
}

generetaUserTable(config1)
let userTable = document.getElementById('userTable');


 async function DataTable(config) {
  let Table = document.createElement('table');
  Table.classList.add('table')
  let thead = document.createElement('thead')
  let Row = document.createElement('tr');

  Table.appendChild(thead);
  thead.appendChild(Row);

  for(let i = 0;i < config.columns.length;i++){
      let cellTH = document.createElement('th');
      cellTH.innerHTML = config.columns[i].title;
      Row.appendChild(cellTH);
      cellTH.classList.add('Th')
    }

  let tbody = document.createElement('tbody');

  Table.insertAdjacentElement('beforeend', tbody);

  if(config.apiUrl != undefined){
    const apiurl = config.apiUrl;
    let responce = await fetch(apiurl);
    const data = await responce.json();

    
      console.log(data)
    
  //  console.log(Object.values(data.data[643])[0])
  async function deleteUser(id){
    let userUrl = `${config.apiUrl}/${id}`;
    let respt = await fetch(userUrl, {method: "DELETE"}).then(()=>{
      window.location.reload()
    })
    if (respt.ok) {
      return false;
  }
  }
 
  for(i in Object.values(data.data)){
    //console.log(Object.values(data.data)[i])
  }
    
    for(i =0;i <Object.keys(data.data).length;i++ ){
      if(Object.keys(data.data)[i]== undefined || null){
      break
      }
        let btn_del = document.createElement('button');
        btn_del.innerHTML = 'delete';
        btn_del.classList.add('del');
        btn_del.id = Object.keys(data.data)[i];
        let btn_id = btn_del.id
        btn_del.addEventListener('click',function(){
          deleteUser(btn_id)
        })
       // console.log(Object.values(data.data[i])[0])


        let Rows = document.createElement('tr');
        Rows.classList.add('rows');
       for(j = 0;j<Object.values(Object.values(data.data)[i]).length;j++){
           let cell = document.createElement('td');
           cell.innerHTML = Object.values(Object.values(data.data)[i])[j];
           Rows.appendChild(cell);
           cell.classList.add('bord');
       }
       Rows.appendChild(btn_del)
       tbody.appendChild(Rows)
    }
    console.log(config.columns)

    let btn_add = document.querySelector('.addUser');

    btn_add.addEventListener('click',function(){

        let row = document.createElement('tr');
        let btn_user = document.createElement('button');
        btn_user.innerHTML = 'adds';
        btn_user.classList.add('add')

        for(el of config.columns ){
        let cell_add = document.createElement('td');
        let input = document.createElement('input');
        input.classList.add('inputs');

        input.placeholder = el.value
        input.name = el.value;

        if(el.value == 'birthday'){
          input.type = 'date'
        }
        cell_add.appendChild(input)
        row.classList.add('row');
        row.appendChild(cell_add)
        cell_add.classList.add('bord')

        input.addEventListener('input',function(){
          input.classList.add('filed');
          input.classList.remove('empty')
        });
        if(!input.classList.contains('filed')){
          input.classList.add('empty');
        }
        }
        btn_user.addEventListener('click',function(){
          let newUser = {}
          let inputs = document.querySelectorAll('.inputs');
          for(let inp of inputs){
            if(inp.classList.contains('empty')){
              inp.placeholder = 'Enter data';
             // window.location.reload()
            }else{
            newUser[inp.name] = inp.value
          
          console.log(newUser)
          addNewUser(config.apiUrl, newUser).then(()=>{
            window.location.reload()
          })
        
      }
    }
          //window.location.reload()

        })

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
      
        row.appendChild(btn_user)
        tbody.insertAdjacentElement('beforebegin', row)



      
    })
  

  }
userTable.appendChild(Table)
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
 

DataTable(config1)
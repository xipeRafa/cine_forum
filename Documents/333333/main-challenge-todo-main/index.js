      ID("all").addEventListener("click", ()=> { todoApp.filter() })
   ID("remove").addEventListener("click", ()=> { todoApp.cleanCompleted() })
   ID("active").addEventListener("click", ()=> { todoApp.filter('isActive', true) })
ID("completed").addEventListener("click", ()=> { todoApp.filter('isActive', false) })


const api = {

    data: [{'id': Date.now(),"isActive": false,"content": "To do List Ready to Use!!!"},
           {'id': Date.now()+1,"isActive": true,"content": "aaaaaa"},
           {'id': Date.now()+2,"isActive": false,"content": "bbbbbb"},
           {'id': Date.now()+3,"isActive": false,"content": "cccccc"}],

    /* editData:[], */

    get: function() { return new Promise((resolve) => { setTimeout(() => { resolve(this.data) }, 160) }) },

    set: function() {
      this.data.push({'id':Date.now(),'isActive': true,'content': event.target.value})

     api.insert()

     return new Promise((resolve) => { console.log('data:', this.data), setTimeout(() => { resolve(this.data) }, 150) })
      
    },

    toggle: function() {
      this.data.map( el => {if(el.content === event.target.innerText){ el.isActive = (!el.isActive) }} )
      return new Promise((resolve) => { setTimeout(() => { resolve(this.data) }, 100) } ) 
    },

    search: function(key, value) {
      return new Promise((resolve) => {
          typeof value === 'string' // or boolean
             ? search = this.data.filter(el => el[key].indexOf(value) > -1)  
             : search = this.data.filter(el => el[key] === value) 
          resolve(search)
      })
    },

    completed: function() {
      this.data = this.data.filter( el => { return el.isActive === true })
      return new Promise((resolve) => { setTimeout(() => { resolve(this.data) }, 60) })
    },

    edited: function(){
      

      /*let txt = event.target.previousElementSibling.previousElementSibling.id = Date.now() set id when clicked */ 
      let dis = document.getElementsByClassName("disabled")
      for (const el of dis) {
        el.setAttribute("disabled", "true");
      /*   el.style.backgroundColor='lightgray';
        el.style.color='gray'; */
        el.style.cursor='none'
      }

    /*   let x = document.getElementsByClassName("disabled");
      for (let i=0; i<x.length; i++) {
      x[i].style.color = "blue"; 
    }*/


      let btnEdit = event.target

      let txt  = btnEdit.previousElementSibling.previousElementSibling.innerText //get text of element clicked 

      let idElementClicked = this.data.find(el => el.content === txt).id // find id of element with text gotted clicking
        console.log('id of element clicked:', idElementClicked) 

      ID('textId').value = txt // move the text to input text
      ID('textId').style.border='2px solid lightblue'
      ID('textId').focus()

      let ind = this.data.findIndex(el => el.id === idElementClicked)
      console.log('index of Element clicked:', ind)

      this.data.slice(ind)[0].content='';
      this.data.splice(0,1,{'id':idElementClicked,'index': ind,'content': ''})   
      console.log(this.data)
      

      return new Promise((resolve) => { setTimeout(() => { resolve(this.data) }, 100000) })   
    
    },
    insert: function(){
     let newContent = this.data.slice(-1)[0].content // get the content to insert

     let indexClicked = this.data.slice(0)[0].index //index of element clicked

     let lengthClicked = this.data.slice(0)[0].content.length  //last element clicked (length)

     let idClicked = this.data.slice(0)[0].id //id of element clicked
        
     if(lengthClicked===0){
      
        console.log('if', lengthClicked)
        this.data.splice(indexClicked,1,{'id': idClicked,"isActive": true,"content": newContent}) 
        this.data.pop()
        this.data.shift()
        this.data.unshift({'id': Date.now(),"isActive": false,"content": "To do List Ready to Use!!!"})

     }else{
        console.log('else', lengthClicked)
      }

     
    },

    deleted: function(){
      let txt = event.target.previousElementSibling.innerText 
      let ind = this.data.findIndex(el => el.content === txt)
      this.data.splice(ind,1)
      return new Promise((resolve) => { setTimeout(() => { resolve(this.data) }, 10) } )  
    }
}



class App {
  constructor(lists, left) {
    api.get().then(resolve => { this.data = resolve; this.render() }) 
    this.lists = ID(lists)
    this.left = ID(left) 
  }

  render() {
      let count = this.data.length //index
      let listItems = " "
      while (count--) {
        listItems += `
          <a class="panel-block disabled ${( this.data[count].isActive ? '' : 'is-active' )}" onClick="todoApp.toggle()">
            <span class="panel-icon">  <i class="fa fa-check"></i>  </span>  ${this.data[count].content}
          </a> 
          <button class="delet disabled" onClick="todoApp.delet()">Delete</button>
          <button class="edit disabled"  onClick="todoApp.edit()">Edit</button> 
        `
      }  
      const list = `
        <input  type="text" 
                class="input-text" 
                placeholder="New todo..." 
                id='textId'
                onkeydown="javascript: if(event.keyCode == 13){todoApp.add(this.value); this.value = null }">

        <div class="list-tasks">${listItems}</div>`

      this.lists.innerHTML = list
      this.left.innerHTML = `<h3>Items Active: ${ this.data.filter(i => i.isActive).length }</h3>`
  }
    
    add(value){  
                let rep = this.data.map(el => el.content).includes(value)

                    rep === true
                      ? alert('are you repeating the note?')
                      : api.set(value).then(resolve => { this.data = resolve; this.render() }) 
    }

    toggle() { api.toggle().then(resolve => { this.data = resolve; this.render() }) }

    filter(key, val) { key ? api.search(key, val).then(resolve => { this.data = resolve; this.render() })
                           : api.get().then(resolve => { this.data = resolve; this.render() }) } // All
  
    cleanCompleted() { api.completed().then(resolve => { this.data = resolve; this.render() }) }

    delet(){ api.deleted().then(resolve => { this.data = resolve; this.render() }) }
    
    edit(){ api.edited().then(resolve => { this.data = resolve; this.render() }) }

}

const todoApp = new App('lists', 'left') 



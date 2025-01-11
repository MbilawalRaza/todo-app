const supabaseurl = "https://czuxqdqsnxwsxetouevt.supabase.co"
const supabasekey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6dXhxZHFzbnh3c3hldG91ZXZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxNTY4NDcsImV4cCI6MjA1MTczMjg0N30.3DPsYJC4PX8E_-xlzYCyNZgjmWWtoykWIB9M3GUWQ3I"

const supabaseclient = supabase.createClient(supabaseurl,supabasekey)



const input = document.getElementById('inp')
const ul = document.getElementById('todo-list')





async function createtodo() {
    const task = input.value
   console.log(input.value)
    const { error } = await supabaseclient
  .from('todos')
  .insert({ task:task })
const li = document.createElement('li')
const span = document.createElement('span')
li.classList.add('list-item')
span.innerHTML=task
const delbtn= document.createElement('button')
delbtn.innerHTML = "&#10006;"
const donebtn= document.createElement('button')
donebtn.innerHTML = "&#10003;"
 

li.appendChild(span)
li.appendChild(delbtn)
li.appendChild(donebtn)
ul.appendChild(li)

 }
async function fetchTodos() {
  const { data, error } = await supabaseclient
  .from('todos')
  .select()
  for (var i=0; i<data.length;i++){
    const todo = data[i]
    console.log(data[i].task)

    const li = document.createElement('li')
const span = document.createElement('span')
li.classList.add('list-item')
span.innerHTML=data[i].task

const donebtn= document.createElement('button')
donebtn.innerHTML = "&#10003;"
donebtn.addEventListener('click',()=>{
  span.classList.add('complete')
  doneTodos(todo.id,true)

  })
  const delbtn= document.createElement('button')
delbtn.innerHTML = "&#10006;"

delbtn.addEventListener('click',()=>{
  delTodos(todo.id)

})

li.appendChild(span)
li.appendChild(donebtn)
li.appendChild(delbtn)

ul.appendChild(li)
  }
}


async function delTodos(id) {
  const response = await supabaseclient
  .from('todos')
  .delete()
  .eq('id',id)
  window.location.reload()
}


async function doneTodos(id, is_Done){
  const { error } = await supabaseclient
  .from('todos')
  .update({ complete: is_Done})
  .eq('id', id)

}

fetchTodos()
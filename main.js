let renderer = new Renderer()
let manager = new APIManager()

let userIdCounter = 0

$('#load-data').click(function(){
    manager.loadData()
})

$('#display-data').click(function(){
    emptyFields()
    renderer.renderAll(manager.data)
})

function emptyFields() {
    $('.user-container').empty()
    $('.pokemon-container').empty()
    $('.quote-container').empty()
    $('.meat-container').empty()
    $('.friends-container').empty() 
}

$('#save-user-page').click(function(){
    localStorage[`user${userIdCounter++}`] =JSON.stringify(manager.data[0])
})

$('#load-user-page').hover(function(){
    $('.dropdown-content').empty()
    renderer.renderDropDownList()
})

$('.dropdown-content').on('click','.dropdown-user',function(){
    emptyFields()
    renderer.renderLoadedUsers($(this).text())
})


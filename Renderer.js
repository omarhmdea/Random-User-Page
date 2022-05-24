class Renderer {
    constructor(){
        this.data = []
    }
    renderAll(data){
        this.data = data
        this.renderQuote()
        this.renderUserInfo()
        this.renderPokemon()
        this.renderAboutMe()
        this.renderFriends()
    }
    renderQuote(){
        $('.quote-container').append(`
            <p>Favorite quote:</p>
            <div>"${this.data[0].quote}"</div>
            <div>- Kanye West</div>
        `)
    }
    renderUserInfo(){
        $('.user-container').append(`
        <img id=profile-pic src="${this.data[0].picture}" alt="user picture"> 
        <div class=user-info >
        <div>${this.data[0].name}</div>
        <div>${this.data[0].state}, ${this.data[0].city}</div>
        </div>
    `)  
    }
    renderPokemon(){
        $('.pokemon-container').append(`
        <img id=pokemon-image src="${this.data[0].pokemonImg}" alt="user picture"> 
        <div id=pokemon-text >Favorite Pokemon: ${this.data[0].pokemonName}</div>

    `)  
    }
    renderAboutMe(){
        $('.meat-container').append(`<div id=meat-text >About me: </br>${this.data[0].aboutMe}</div>`)  
    }
    renderFriends(){
        const source = $('#friends-template').html()
        const template = Handlebars.compile(source);
        const newHTML = template({friend:this.data[0].friends})
        $('.friends-container').append(newHTML)  
    }
    renderDropDownList(){
        const source = $('#loadUsers-template').html()
        const template = Handlebars.compile(source);

        let localStorageValues = Object.values(localStorage);
        let users = localStorageValues.map(element => JSON.parse(element) );

        const newHTML = template({users:users})
        $('.dropdown-content').append(newHTML) 
    }
    renderLoadedUsers(userName){
        let localStorageValues = Object.values(localStorage);
        for (const user of localStorageValues) {
            if (JSON.parse(user).name === userName){
                this.renderAll([JSON.parse(user)])            
            }
            
        }
    }
    
}
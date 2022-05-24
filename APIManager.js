const NUM_OF_USERS = 7

class APIManager {
    constructor() {
        this.data = [] 
    }
    static get NUM_OF_USERS(){
        return NUM_OF_USERS
    }
    loadData(){
        this.data = [] 
        $.ajax({
            context: this,
            url: `https://randomuser.me/api/?results=${APIManager.NUM_OF_USERS}`, 
            dataType: 'json',
            success: function(ApiData) {
                    for (const user of ApiData.results) {
                        const newUser = {}
                        newUser.name = user.name.first + " " + user.name.last
                        newUser.city = user.location.city
                        newUser.state = user.location.state
                        newUser.picture = user.picture.large
                        this.data.push(newUser)
                    }
                    this.data[0].friends = this.data.slice(1)
                    this.loadQuote()
                    this.loadPokemon()
                    this.loadAbout()    
            }
        });
    }
    loadQuote(){
        $.ajax({
            context: this,
            url: 'https://api.kanye.rest',
            dataType: 'json',
            success: function(ApiData) {
                this.data[0].quote = ApiData.quote
            }
        });
    }
    loadPokemon(){
        $.ajax({
            context: this,
            url: `https://pokeapi.co/api/v2/pokemon/${this.generateRandomNumber()}`,
            dataType: 'json',
            success: function(ApiData) {
                this.data[0].pokemonImg = ApiData.sprites.front_default
                this.data[0].pokemonName = this.capitalize(ApiData.forms[0].name)
            }
        });
    }
    loadAbout(){
        $.ajax({
            context: this,
            url:'https://baconipsum.com/api/?type=meat-and-filler',
            dataType: 'json',
            success: function(ApiData) {
                this.data[0].aboutMe = ApiData[0]  
            }
        });
    }
    generateRandomNumber(){
        return Math.floor(Math.random() * 1125 + 1)
    }
    capitalize(str){
        return str.slice(0,1).toUpperCase() + str.slice(1);
    }
}


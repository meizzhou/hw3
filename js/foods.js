$("document").ready( function(){
    var idx;
    var pizza;
    for (idx = 0; idx < com.dawgpizza.menu.pizzas.length; ++idx) {
        pizza = com.dawgpizza.menu.pizzas[idx];
        var name = document.createElement("dt");
        $(name).html(pizza.name+ " $:" + pizza.prices[0] + "/" + pizza.prices[1] + "/" + pizza.prices[2]);
        var description = document.createElement("dl");
        $(description).html(pizza.description);
        if(pizza.vegetarian){
            $(name).appendTo(".vegpizzas");
            $(description).appendTo(".vegpizzas");
        } else {
            $(name).appendTo(".pizzaMenu");
            $(description).appendTo(".pizzaMenu");        
        }
    }

    var idx;
    var drink;
    for (idx = 0; idx < com.dawgpizza.menu.drinks.length; ++idx) {
        drink = com.dawgpizza.menu.drinks[idx];
        var name = document.createElement("ul");
        $(name).html(drink.name + " $" + drink.price);
        $(name).appendTo(".drinks");
    } 

    var idx;
    var desserts;
    for (idx = 0; idx < com.dawgpizza.menu.desserts.length; ++idx) {
        desserts = com.dawgpizza.menu.desserts[idx];
        var name = document.createElement("ul");
        $(name).html(desserts.name + " $" + desserts.price);
        $(name).appendTo(".desserts");
    } 
});// document ready
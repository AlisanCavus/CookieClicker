(() => {
    //check if there is a 'score' variable already in local storage, creates one if not. Displays the score.
    localStorage.hasOwnProperty("score") ? true : localStorage.setItem("score", 0); 
/*     document.getElementById("score").innerHTML = localStorage.score; */

    //setting the multiplier factor. Default is one, increases when player buys an upgrade
    var mult = 1;

    //set number of autoclickers and displays them
    const team = {
        0: 0,
        1: 0,
        2: 0
    }

/*     document.getElementById("alisan").innerHTML = `Alisan(s) making cookies: ${team[0]}`;
    document.getElementById("daniel").innerHTML = `Daniel(s) making cookies: ${team[1]}`;
    document.getElementById("shivani").innerHTML = `Shivani(s) making cookies: ${team[2]}`; */

    //multiplier and autoclicker prices
    const multiplierPrices = {
        "x2": 1,
        "x3": 5,
        "x4": 10
    }

    const autoClickerPrices = {
        0 : 3,
        1 : 7,
        2 : 12
    }

    //multiplier and autoclicker status (1 used / 0 not used)
    const multiplierStatus = {
        "x2": 0,
        "x3": 0,
        "x4": 0
    }

    //cookie click event
    document.getElementById("cookie").addEventListener("click",() => {
        localStorage.score = parseInt(localStorage.score) + mult;
/*         document.getElementById("score").innerHTML = localStorage.score; */
        console.log(localStorage.score);
    });  

    //multiplier button click event
    document.querySelectorAll("button.multiplier").forEach(btn =>
        btn.addEventListener("click", () => {
                if (multiplierStatus[btn.id] === 0 && localStorage.score >= multiplierPrices[btn.id]) {
                    multiplierStatus[btn.id] = 1;
                    mult += 1;
                    localStorage.score -= multiplierPrices[btn.id];
                    //document.getElementById("score").innerHTML = localStorage.score;                   
                    console.log(localStorage.score); //test log, to be removed
                }
            }),
    );
    
    //autoclicker button click event
    document.querySelectorAll("button.autoclicker").forEach(btn =>
        btn.addEventListener(
            "click",
            () => {
                if (localStorage.score >= autoClickerPrices[btn.id]) {
                    localStorage.score -= autoClickerPrices[btn.id];
                    //document.getElementById("score").innerHTML = localStorage.score;
                    team[btn.id] += 1; 
                    autoclickerFunction(btn.id);
                    console.log(localStorage.score); //test log, to be removed
                    //document.getElementById("team").innerHTML; //refresh the div that contains the team's elements
                }
            }
        ),
    );

    //restart button click event
     document.getElementById("startAgain").addEventListener("click",() => {
        //set score back to 0
        var score = localStorage.setItem("score", 0); 
/*         document.getElementById("score").innerHTML = score; */

        //set statuses back to false
        for (var item in multiplierStatus) {
            multiplierStatus[item] = 0;
        }
    });   

    function autoclickerFunction(timer) {
        switch(timer) {
            case "0":
                setInterval(() => {
                    localStorage.score = parseInt(localStorage.score) + 2;
                    console.log(localStorage.score)
/*                     document.getElementById("score").innerHTML; */
                }, 2000)
                team[timer] += 1;
                break;
            
            case "1":
                setInterval(() => {
                    localStorage.score = parseInt(localStorage.score) + 4;
                    console.log(localStorage.score)
    /*                 document.getElementById("score").innerHTML; */
                    }, 4000)
                team[timer] += 1;
                break;

            case "2":
                setInterval(() => {
                    localStorage.score = parseInt(localStorage.score) + 6;
                    console.log(localStorage.score)
    /*                 document.getElementById("score").innerHTML; */
                    }, 6000)
                team[timer] += 1;
                break;
        }
    }

})();
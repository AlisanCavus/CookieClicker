(() => {
    //check if there is a 'score' variable already in local storage, creates one if not. Displays the score.
    localStorage.hasOwnProperty("score") ? true : localStorage.setItem("score", 0); 
    document.getElementById("score").innerHTML = localStorage.score;

    //setting the multiplier factor. Default is one, increases when player buys an upgrade
    localStorage.hasOwnProperty("mult") ? true : localStorage.setItem("mult", 1);

    //set number of autoclickers, check if there is a 'score' variable already in local storage, creates one if not
    const team = {
        0: 0,
        1: 0,
        2: 0
    }

    localStorage.hasOwnProperty("team") ? true : localStorage.setItem("team", JSON.stringify(team)); 
    var parseTeam = localStorage.getItem("team");
    console.log(JSON.parse(parseTeam))

    //display autoclickers
    document.getElementById("alisan").innerHTML = `Alisan(s) making cookies: ${team[0]}`;
    document.getElementById("daniel").innerHTML = `Daniel(s) making cookies: ${team[1]}`;
    document.getElementById("shivani").innerHTML = `Shivani(s) making cookies: ${team[2]}`;

    //create an array to keep the intervals
    const interval = [];

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

    localStorage.hasOwnProperty("multiplierStatus") ? true : localStorage.setItem("multiplierStatus", JSON.stringify(multiplierStatus)); 

    //cookie click event
    document.getElementById("cookie").addEventListener("click",() => {
        localStorage.score = parseInt(localStorage.score) + parseInt(localStorage.mult);
        document.getElementById("score").innerHTML = localStorage.score;
        console.log(localStorage.score);
    });

    //multiplier button click event
    document.querySelectorAll("button.multiplier").forEach(btn =>
        btn.addEventListener("click", () => {
                if (multiplierStatus[btn.id] === 0 && localStorage.score >= multiplierPrices[btn.id]) {
                    multiplierStatus[btn.id] = 1;
                    mult += 1;
                    localStorage.score -= multiplierPrices[btn.id];
                    document.getElementById("score").innerHTML = localStorage.score;                   
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
                    document.getElementById("score").innerHTML = localStorage.score;
                    team[btn.id] += 1; 
                    autoclickerFunction(btn.id);
                    console.log(localStorage.score); //test log, to be removed
                }
            }
        ),
    );

    //restart button click event
     document.getElementById("startAgain").addEventListener("click",() => {
        //set score back to 0
        localStorage.setItem("score", 0); 
        document.getElementById("score").innerHTML = localStorage.score;

        //set statuses back to false
        for (var item in multiplierStatus) {
            multiplierStatus[item] = 0;
        }

        //set autoclickers back to 0 and display them
        for (var item in team) {
            team[item] = 0;
        }

        document.getElementById("alisan").innerHTML = `Alisan(s) baking cookies: ${team[0]}`;
        document.getElementById("daniel").innerHTML = `Daniel(s) baking cookies: ${team[1]}`;
        document.getElementById("shivani").innerHTML = `Shivani(s) baking cookies: ${team[2]}`;

        //clear all intervals
        interval.map(i => clearInterval(i));

        //remove all localStorage items
        localStorage.clear();
    });   

    function autoclickerFunction(timer) {
        interval.push(setInterval(() => {
            localStorage.score = parseInt(localStorage.score) + (parseInt(timer) + 3);
            document.getElementById("score").innerHTML = localStorage.score;
        }, 2000 * (timer +1)))

        document.getElementById("alisan").innerHTML = `Alisan(s) baking cookies: ${team[0]}`;
        document.getElementById("daniel").innerHTML = `Daniel(s) baking cookies: ${team[1]}`;
        document.getElementById("shivani").innerHTML = `Shivani(s) baking cookies: ${team[2]}`;
    }

/* 
    let buttonCookie = document.getElementsByClassName("click")[0];
    // let tranform = false;
    buttonCookie.addEventListener("click", () => {
        buttonCookie.style.transform = "scale(1.1)";
    setTimeout(cookie,10);
       // buttonCookie.style.transform = "scale(1.0)";
       // buttonCookie.style.transition = "scale(1.0) 1s";
    //    transform = true;
    })
    function cookie () {
        buttonCookie.addEventListener("focusout", ()=>{
            buttonCookie.style.transform = "scale(1.0)";
        });
    } */
   
    // buttonCookie.addEventListener("change",()=> {
    //     if(tranform === true){
    //         buttonCookie.style.transition = "scale(1.0) 1s";
    //         tranform = false;
    //     }
    // })
})();
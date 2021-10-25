(() => {
    //check if there is a 'score' variable already in local storage, creates one if not. Displays the score.
    localStorage.hasOwnProperty("score") ? true : localStorage.setItem("score", 0); 
    document.getElementById("score").innerHTML = localStorage.score;

    //setting the multiplier factor. Default is one, increases when player buys an upgrade
    localStorage.hasOwnProperty("mult") ? true : localStorage.setItem("mult", 1);

    //set number of autoclickers, check if there is a 'team' variable already in local storage, creates one if not
    //localStorage can't hold objects, so we need to use JSON.stringify to save them, and parse them back when we need to use them
    var team = {
        0: 0,
        1: 0,
        2: 0
    }

    localStorage.hasOwnProperty("team") ? team = JSON.parse(localStorage.getItem("team")) : localStorage.setItem("team", JSON.stringify(team));
    //var parseTeam = JSON.parse(localStorage.getItem("team")); //not needed atm

    //display autoclickers
    document.getElementById("alisan").innerHTML = `Alisan(s) baking cookies: ${team[0]}`;
    document.getElementById("daniel").innerHTML = `Daniel(s) baking cookies: ${team[1]}`;
    document.getElementById("shivani").innerHTML = `Shivani(s) baking cookies: ${team[2]}`;

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

    //set multiplier status --max 1 of each multiplier can be bought
    var multiplierStatus = {
        "x2": 0,
        "x3": 0,
        "x4": 0
    }

    //check if there is a 'multiplierStatus' variable already in local storage, create one if not
    localStorage.hasOwnProperty("multiplierStatus") ? multiplierStatus = JSON.parse(localStorage.getItem("multiplierStatus")) : localStorage.setItem("multiplierStatus", JSON.stringify(multiplierStatus)); 
   //var parseMultiplierStatus = JSON.parse(localStorage.getItem("multiplierStatus")); //not needed atm

    //bonus timer
    var bonus = 1;
    var timerId; //setting a global scope variable that can be accesed by the onclick event and countdown()
    var bonusOn = false; //switch to prevent user from creating more than one setInterval bonus
    var bonusTimer = 5;
    document.getElementById("bonus").addEventListener("click",() => {
            if (!bonusOn) {
                bonusOn = true;
                bonus = 2;
                timerId = setInterval(countdown, 1000);
            }
        }
    )

    function countdown() {
        if (bonusTimer == -1) {
          clearTimeout(timerId);
          bonus = 1;
          bonusOn = false;
          bonusTimer = 30;
          document.getElementById("bonus").innerHTML = "Bonus"
        } else {
            document.getElementById("bonus").innerHTML = bonusTimer + " seconds"
            bonusTimer--;
        }
    }     

    //cookie click event
    document.getElementById("cookie").addEventListener("click",() => {
        localStorage.score = parseInt(localStorage.score) + (parseInt(localStorage.mult) * bonus);
        document.getElementById("score").innerHTML = localStorage.score;
        console.log(localStorage.score);
    });

    //multiplier button click event
    document.querySelectorAll("button.multiplier").forEach(btn =>
        btn.addEventListener("click", () => {
            if (multiplierStatus[btn.id] === 0 && localStorage.score >= multiplierPrices[btn.id]) {
                multiplierStatus[btn.id] = 1;
                localStorage.setItem("multiplierStatus", JSON.stringify(multiplierStatus));
                localStorage.mult = parseInt(localStorage.mult) + 1; //if we chose this option, buttons must unlock in order
                //localStorage.mult = parseInt(localStorage.mult) + parseInt(btn.id.charAt(1)) - 1;
                localStorage.score -= multiplierPrices[btn.id];
                document.getElementById("score").innerHTML = localStorage.score;                   
                console.log(localStorage.score); //test log, to be removed
            }
        }),
    );

    //autoclicker button click event
    document.querySelectorAll("button.autoclicker").forEach(btn =>
        btn.addEventListener("click", () => {
            if (localStorage.score >= autoClickerPrices[btn.id]) {
                localStorage.score -= autoClickerPrices[btn.id];
                document.getElementById("score").innerHTML = localStorage.score;
                team[btn.id] += 1; 
                localStorage.setItem("team", JSON.stringify(team))
                autoclickerFunction(btn.id);
                console.log(localStorage.score); //test log, to be removed
            }
        }
        ),
    );

    function autoclickerFunction(timer) {
        interval.push(setInterval(() => {
            localStorage.score = parseInt(localStorage.score) + (parseInt(timer) + 3);
            document.getElementById("score").innerHTML = localStorage.score;
            console.log(localStorage.score)
        }, 2000 * (timer)))

        document.getElementById("alisan").innerHTML = `Alisan(s) baking cookies: ${team[0]}`;
        document.getElementById("daniel").innerHTML = `Daniel(s) baking cookies: ${team[1]}`;
        document.getElementById("shivani").innerHTML = `Shivani(s) baking cookies: ${team[2]}`;
    };

    //restart button click event
     document.getElementById("startAgain").addEventListener("click",() => {
        //clear all intervals
        interval.map(i => clearInterval(i));

        //remove all localStorage items
        localStorage.clear();

        //refresh page to trigger script from the beginning
        window.location.reload();
    });   

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

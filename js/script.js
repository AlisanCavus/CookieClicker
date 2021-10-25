(() => {
    //check if there is a 'score' variable already in local storage, creates one if not. Displays the score.
    localStorage.hasOwnProperty("score") ? true : localStorage.setItem("score", 0);
    /*     document.getElementById("score").innerHTML = score; */

    //setting the multiplier factor. Default is one, increases when player buys an upgrade
    var mult = 1;

    //set number of autoclickers and displays them
    const team = {
        1: 0,
        2: 0,
        3: 0
    }
    /*     var Alisan = 0;
        var Daniel = 0 ;
        var Shivani = 0 */
    /*     document.getElementById("alisan").innerHTML = `Alisan(s) making cookies for you: ${team[0]}`;
        document.getElementById("daniel").innerHTML = `Daniel(s) making cookies for you: ${team[1]}`;
        document.getElementById("shivani").innerHTML = `Shivani(s) making cookies for you: ${team[2]}`; */

    //multiplier and autoclicker prices
    const multiplierPrices = {
        "x2": 10,
        "x3": 50,
        "x4": 100
    }

    const autoClickerPrices = {
        0: 30,
        1: 70,
        2: 120
    }

    //multiplier and autoclicker status (1 used / 0 not used)
    const multiplierStatus = {
        "x2": 0,
        "x3": 0,
        "x4": 0
    }

    //cookie click event
    document.getElementById("cookie").addEventListener("click", () => {
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
    /*     document.querySelectorAll("button.autoclicker").forEach(btn =>
            btn.addEventListener(
                "click",
                () => {
                    if (score >= autoClickerPrices[btn.id]) {
                        autoClickerStatus[btn.id] = 1;
                        score -= autoClickerPrices[btn.id];
                        //document.getElementById("score").innerHTML = localStorage.score;
                        team[btn.id] += 1; 
                        autoclickerFunction(btn.id);
                        console.log(localStorage.score); //test log, to be removed
                        //document.getElementById("team").innerHTML; //refresh the div that contains the team's elements
                    }
                }
            ),
        ); */

    //restart button click event
    /*      document.getElementById("restart").addEventListener("click",() => {
            //set score back to 0
            var score = localStorage.setItem("score", 0); 
            document.getElementById("score").innerHTML = score;
    
            //set statuses back to false
            for (var item in multiplierStatus) {
                multiplierStatus[item] = 0;
            }
            for (var item in autoClickerStatus) {
                multiplierStatus[item] = 0;
            }
        });    */

    // function autoclickerFunction(timer) {


    // }
    let buttonCookie = document.getElementsByClassName("click")[0];
    // let tranform = false;
    buttonCookie.addEventListener("click", () => {
        buttonCookie.style.transform = "scale(1.1)";
    //setTimeout(cookie,10);
       // buttonCookie.style.transform = "scale(1.0)";
       // buttonCookie.style.transition = "scale(1.0) 1s";
    //    transform = true;
    })
    // function cookie () {
    //     buttonCookie.addEventListener("focusout", ()=>{
    //         buttonCookie.style.transform = "scale(1.0)";
    //     });
    // }
   
    // buttonCookie.addEventListener("change",()=> {
    //     if(tranform === true){
    //         buttonCookie.style.transition = "scale(1.0) 1s";
    //         tranform = false;
    //     }
    // })
})();
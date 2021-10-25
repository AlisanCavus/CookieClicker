(() => {
    //check if there is a 'score' variable already in local storage, creates one if not. Displays the score.
    var score = localStorage.hasOwnProperty("score") ? true : localStorage.setItem("score", 0); 
/*     document.getElementById("score").innerHTML = score; */

    //setting the multiplier factor. Default is one, increases when player buys an upgrade
    var mult = 1;

    //multiplier and autoclicker prices
    const multiplierPrices = {
        1: 100,
        2: 500,
        3: 1000
    }

    const autoClickerPrices = {
        1: 300,
        2: 700,
        3: 1200
    }

    //multiplier and autoclicker status (1 used / 0 not used)
    const multiplierStatus = {
        1: 100,
        2: 10000,
        3: 10
    }

    const autoClickerStatus = {
        1: 0,
        2: 0,
        3: 0
    }
    //cookie click event
    document.getElementById("cookie").addEventListener("click",() => {
        localStorage.score = parseInt(localStorage.score) + mult;
/*         document.getElementById("target").innerHTML = localStorage.clicker; */
        console.log(localStorage.score);
    });  

    //multiplier button click event
/*      document.querySelectorAll("button.bonus").forEach($btn =>
        $btn.addEventListener(
            "click",
            () => (performOperation($btn.id), false),
        ),
    ); 
    
    //autoclicker button click event
     document.querySelectorAll("button.multiplier").forEach($btn =>
        $btn.addEventListener(
            "click",
            () => {

            }
        ),
    );

    //restart button click event
    document.getElementById("restart").addEventListener("click",() => {
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
    });   */

})();
(() => {
    //check if there is a 'score' variable already in local storage, creates one if not. Displays the score.
    localStorage.hasOwnProperty("score") ? true : localStorage.setItem("score", 0); 
    document.getElementById("score").innerHTML = localStorage.score;

    //setting the multiplier factor. Default is one, increases when player buys an upgrade
    localStorage.hasOwnProperty("mult") ? true : localStorage.setItem("mult", 1);

    //create an array to keep the intervals. This way we can loop through the array to clear all intervals on restart
    const interval = [];

    //set click sound effect
    var crunch = new Audio("./audio/crunch1.wav")
    //set mute event
    var mute = false;
    document.getElementById("mute").addEventListener("click",() => {
        mute = mute ? false : true;
    }
)

    //set number of autoclickers, check if there is a 'autoclicker' variable already in local storage, creates one if not
    //localStorage can't hold objects, so we need to use JSON.stringify to save them, and parse them back when we need to use them
    var autoclicker = {
        0: 0,
        1: 0,
        2: 0
    }

    localStorage.hasOwnProperty("autoclicker") ? autoclicker = JSON.parse(localStorage.getItem("autoclicker")) : localStorage.setItem("autoclicker", JSON.stringify(autoclicker));

    //autoclicker restart function. Iterates through the autoclicker object and creates setIntervals if needed.
    function autoclickerRestart() {
        for (key in autoclicker) {
            if (autoclicker[key] > 0) {
                for (i = 0; i < autoclicker[key]; i++) {
                    autoclickerFunction(key);
                }
            }
        }
    }

    autoclickerRestart();

    //display autoclickers
    document.getElementById("alisan").innerHTML = `Alisan(s) baking cookies: ${autoclicker[0]}`;
    document.getElementById("daniel").innerHTML = `Daniel(s) baking cookies: ${autoclicker[1]}`;
    document.getElementById("shivani").innerHTML = `Shivani(s) baking cookies: ${autoclicker[2]}`;

    //multiplier and autoclicker prices
    const multiplierPrices = {
        "x2": 1,
        "x3": 5,
        "x4": 10
    }

/////change this to var and add it to localStorage    
    const autoClickerPrices = {
        0 : 3,
        1 : 7,
        2 : 12
    }

    //set number of multipliers in play
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
    var bonusTimer = 5; //testing value, should be 30
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
            bonusTimer = 5; //testing value, should be 30
            document.getElementById("bonus").innerHTML = "Bonus"
        } else {
            document.getElementById("bonus").innerHTML = bonusTimer + " seconds"
            bonusTimer--;
        }
    }     

    //cookie click events
    //score up
    document.getElementById("cookie").addEventListener("click",() => {
        localStorage.score = parseInt(localStorage.score) + (parseInt(localStorage.mult) * bonus);
        document.getElementById("score").innerHTML = localStorage.score;
        mute ? true : crunch.play();
        console.log(localStorage.score); //test log, to be removed
    });
    
    //winky cookie image + size increase on mousedown
    document.getElementById("cookie").addEventListener("mousedown",() => {
        document.getElementById("cookie").src = "./images/cookie1.png";
        document.getElementById("cookie").style.transform = "scale(1.1)";
        document.getElementById("score").style.transform = "scale(1.5)"
    });

    //winky cookie image + size increase on touchstart for mobile
    document.getElementById("cookie").addEventListener("touchstart",() => {
        document.getElementById("cookie").src = "./images/cookie1.png";
        document.getElementById("cookie").style.transform = "scale(1.1)";
        document.getElementById("score").style.transform = "scale(1.5)"
    });

    //normal cookie image + size decrease on mouseup
    document.getElementById("cookie").addEventListener("mouseup",() => {
        document.getElementById("cookie").src = "./images/cookie.png";
        document.getElementById("cookie").style.transform = "scale(1.0)";
        document.getElementById("score").style.transform = "scale(1.0)"
    });

    //normal cookie image + size decrease on touchend for mobile
    document.getElementById("cookie").addEventListener("touchend",() => {
        document.getElementById("cookie").src = "./images/cookie.png";
        document.getElementById("cookie").style.transform = "scale(1.0)";
        document.getElementById("score").style.transform = "scale(1.0)"
    });

    //multiplier button click event
    document.querySelectorAll("button.multiplier").forEach(btn =>
        btn.addEventListener("click", () => {
            if (localStorage.score >= (multiplierPrices[btn.id] + (multiplierStatus[btn.id] * 100))) {
                multiplierStatus[btn.id] += 1;
                localStorage.setItem("multiplierStatus", JSON.stringify(multiplierStatus));
                localStorage.mult = parseInt(localStorage.mult) * parseInt(btn.id.charAt(1));
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
                autoclicker[btn.id] += 1; 
                localStorage.setItem("autoclicker", JSON.stringify(autoclicker))
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
            console.log(localStorage.score) //test log, to be removed
        }, 2000 * (parseInt(timer) + 2)));

        localStorage.interval = interval;
        document.getElementById("alisan").innerHTML = `Alisan(s) baking cookies: ${autoclicker[0]}`;
        document.getElementById("daniel").innerHTML = `Daniel(s) baking cookies: ${autoclicker[1]}`;
        document.getElementById("shivani").innerHTML = `Shivani(s) baking cookies: ${autoclicker[2]}`;
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
    
    //cookie rain
    const cookieDrop = document.querySelector(".flake");
    const container = document.querySelector(".cookieRain");

    function createCookie() {
        // cloning the flake node
        const clone = cookieDrop.cloneNode(true);

        // creating left padding
        clone.style.paddingLeft = Math.random() * 20 + "%";

        // animation duration between 3-5
        clone.style.animationDuration = Math.random() * 7 + 6 + "s";
        clone.style.opacity = Math.random() * 1;
        
        //adding cloned cookie to container
        container.append(clone);
    }

    //interval for cookie creation
    const s = setInterval(createCookie, 50);

    setTimeout(() => {
        clearInterval(s);
    }, 3000); // flake creation stops after 3s
})();

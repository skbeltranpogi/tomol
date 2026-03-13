particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: ['#e94560', '#533483', '#0f3460'] },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#ffffff',
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: true,
            out_mode: 'out'
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: { enable: true, mode: 'repulse' },
            onclick: { enable: true, mode: 'push' }
        },
        modes: {
            repulse: { distance: 100, duration: 0.4 },
            push: { particles_nb: 4 }
        }
    },
    retina_detect: true
});

function toggleLike(element) {
    if (element.classList.contains('liked')) {
        element.classList.remove('liked');
    } else {
        element.classList.add('liked');
    }
}

function addComment(button) {
    let commentInput = button.previousElementSibling;
    let commentText = commentInput.value.trim();
    
    if (commentText !== "") {
        let commentList = button.parentElement.querySelector(".comments-list");
        let newComment = document.createElement("li");
        newComment.textContent = commentText;
        commentList.appendChild(newComment);
        commentInput.value = "";
    }
}

function tempconverter() {
    let c = parseFloat(prompt("Celsius:"));
    
    if(isNaN(c)){
        alert("Invalid! Should be a number!");
    }
    else{alert(c + "°C is " +  ((c * 9/5) + 32).toFixed(2) + " °Fahrenheit");
    }
}

function longerword() {
    let word1 = prompt("Enter the first word:").trim();
    if (word1 === null || word1 === "" || !isNaN(word1)) {
        alert("INVALID! Please input a valid first word.");
        return;
    }
    let word2 = prompt("Enter the second word:").trim();
    if (word2 === null || word2 === "" || !isNaN(word2)) {
        alert("INVALID! Please input a valid second word.");
        return;
    }
    
    if (word1.length > word2.length) {
        alert(`The longer word is: ${word1}`);
    }   else if (word2.length > word1.length) {
        alert(`The longer word is: ${word2}`);
    } else {
        alert("Both words are of the same length!");
    }
}

function birthstone() {
    let birthmonth = prompt("Enter your birthmonth: ").toLowerCase().trim();
    if (birthmonth === null || birthmonth === "") {
        alert("INVALID! Please input a valid birth month.");
        return;
    }

    function showUserBirthStone(birthmonth){
        switch(birthmonth){
            case "january":
              alert("Garnet");
               break;

            case "february":
               alert("Amethyst");
                break;

            case "march":
                alert("Aquamarine");
                break;
            
            case "april":
                alert("Diamond");
                break;
            
            case "May":
                alert("Emerald");
                break;

            case "June":
                alert("Alexandrite & Pearl");
                break;

            case "July":
                alert("Ruby");
                break;

            case "August":
                alert("Peridot");
                break;

            case "September":
                alert("Sapphire");
                break;

            case "October":
                alert("Opal & Tourmaline");
                break;

            case "November":
                alert("Citrine & Topaz");
                break;

            case "December":
                alert("Blue Zircon, Turquoise, & Tanzanite");
                break;

            default:
                alert("INVALID");
        }
    }
    showUserBirthStone(birthmonth);
}

function computeacceleration() {
    let initialVelocity = prompt("Enter the initial velocity (m/s):");
    if (initialVelocity === null || initialVelocity.trim() === "" || isNaN(parseFloat(initialVelocity))) {
        alert("INVALID! Please input a valid number for initial velocity.");
        return;
    }
    initialVelocity = parseFloat(initialVelocity);

    let finalVelocity = prompt("Enter the final velocity (m/s):");
    if (finalVelocity === null || finalVelocity.trim() === "" || isNaN(parseFloat(finalVelocity))) {
        alert("INVALID! Please input a valid number for final velocity.");
        return;
    }
    finalVelocity = parseFloat(finalVelocity);

    let changeInTime = prompt("Enter the change in time (seconds):");
    if (changeInTime === null || changeInTime.trim() === "" || isNaN(parseFloat(changeInTime)) || parseFloat(changeInTime) === 0) {
        alert("INVALID! Please input a valid, non-zero number for time.");
        return;
    }
    changeInTime = parseFloat(changeInTime);

    let acceleration = (finalVelocity - initialVelocity) / changeInTime;
    alert("Acceleration: " + acceleration);
}

function basicOperators() {
    let num1 = parseFloat(prompt("Enter number 1: "));
    let num2 = parseFloat(prompt("Enter number 2: "));
    
    if (isNaN(num1) || isNaN(num2)) {
        alert("Invalid Input a real number!");
    } else {
        choice = prompt(
            "Enter your choice:" + "\n" +
            "A. Addition" + "\n" +
            "B. Subtraction" + "\n" +
            "C. Multiplication" + "\n" +
            "D. Division"
        ).toUpperCase().trim();

        function operators(num1, num2, choice) {
            switch (choice) {
                case "A":
                    total = num1 + num2;
                    alert("The Addition result is: " + total);
                    break;
            
                case "B":
                    total = num1 - num2;
                    alert("The Subtraction result is: " + total);
                    break;
            
                case "C":
                    total = num1 * num2;
                    alert("The Multiplication result is: " + total);
                    break;
                
                case "D":
                    total = num1 / num2;
                    alert("The Division result is: " + total);
                    break;
            }
        }

        operators(num1, num2, choice);
    }
}

    




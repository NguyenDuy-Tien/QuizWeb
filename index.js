const choices = Array.from(document.getElementsByClassName("sport-img"));

choices.forEach(choice => {
    choice.addEventListener('click', (e) => {
        localStorage.setItem('selectedChoice', e.target.alt);
        window.location.href = "./game.html";
    })
})
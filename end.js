load = () => {
    const selectedChoice = localStorage.getItem('selectedChoice');
    const lastScore = localStorage.getItem(`lastScore${selectedChoice}`);
    let highestScore = localStorage.getItem(`highestScore${selectedChoice}`);
    document.getElementById('score').innerHTML = lastScore;
    if (lastScore > highestScore) {
        highestScore = lastScore;
        localStorage.setItem(`highestScore${selectedChoice}`, highestScore);
    }
    document.getElementById('high-score').innerHTML = highestScore;
}

load();
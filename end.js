load = () => {
    const lastScore = localStorage.getItem('lastScore');
    let highestScore = localStorage.getItem('highestScore');
    document.getElementById('score').innerHTML = lastScore;
    if (lastScore > highestScore) {
        highestScore = lastScore;
        localStorage.setItem('highestScore', highestScore);
    }
    document.getElementById('high-score').innerHTML = highestScore;
}

load();
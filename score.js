load = () => {
    let results = ["football", "basketball", "tennis"];
    results.forEach(result => {
        const highestScore = localStorage.getItem(`highestScore${result}`);
        document.getElementById(`${result}-score`).innerHTML = highestScore;
    })
}

load();
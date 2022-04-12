function displayInstructions() {
    instructions = document.getElementById('popup__image');
    if (instructions.style.display == 'none') {
        instructions.style.display = 'block';
        document.getElementById('instructions__btn').style.backgroundColor="var(--darker-pink)";
        document.getElementById('instructions__btn').style.color="var(--pink)";

    }
    else if (instructions.style.display = 'block') {
        instructions.style.display = 'none';
        document.getElementById('instructions__btn').style.backgroundColor="var(--pink)";
        document.getElementById('instructions__btn').style.color="var(--darker-pink)";
    }
}

let socket = io();

window.addEventListener('load', () => {
    const joining = document.getElementById("join");
    const creating = document.getElementById("create");

    joining.addEventListener('click', () => {
        if (true) return;
    })

        
})
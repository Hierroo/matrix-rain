const main = document.querySelector(".div-letter")


const letters = [ "A", "B" ,"C", "D", "F", "G", "H", "I" ,"J" ,"K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ];






function spamLetter() {
    
    const letter = createLetter();
    const letter2 = createLetter();
    const letter3 = createLetter();
    const letter4 = createLetter();
    
    main.appendChild(letter)
    main.appendChild(letter2)
    main.appendChild(letter3)
    main.appendChild(letter4)
    
    const randomPosition = Math.floor(Math.random() * 100)
    const randomPosition2 = Math.floor(Math.random() * 100)
    const randomPosition3 = Math.floor(Math.random() * 100)
    const randomPosition4 = Math.floor(Math.random() * 100)
    
    letter.style.left = `${randomPosition}%`
    letter2.style.left = `${randomPosition2}%`
    letter3.style.left = `${randomPosition3}%`
    letter4.style.left = `${randomPosition4}%`
    letterAnimation(letter);
    letterAnimation(letter2);
    letterAnimation(letter3);
    letterAnimation(letter4);
}


function createLetter() {
    
    const letter = document.createElement("span")
    letter.setAttribute("class", "letter")
    letter.innerHTML = letters[ Math.floor(Math.random() * letters.length)]
    
    return letter;
}

function letterAnimation(letter) {
    const random = Math.floor(Math.random() * 90)
    const randomScale = Math.floor(Math.random() * (4 - 0.5) + 0.5)
    const randomVel = Math.floor(Math.random() * (30 - 5) + 5)
    let position = 0;
    
    letter.style.transform = `scale(${randomScale})`
    letter.style.top = `${position}%`
    
    //TEMPO DE ANIMAÇÃO DE CADA LETRA
    const interval = setInterval(animation, randomVel)
    
    function animation() {

        if (position === random) {
            clearInterval(interval)
            letter.style.opacity = "0"
            setInterval(() => {
                letter.remove()
            }, 200)
            
            
            
        } {
            position++
            letter.style.top = `${position}%`
        }
        
    }
    

}


//TEMPO DE GERAÇÃO DE CADA LETRA
setInterval( spamLetter, 50)


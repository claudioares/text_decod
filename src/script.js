const text = document.querySelector(".text_area textarea");
const cripty = document.querySelector(".cripty");
const descripty = document.querySelector(".descripty");
const divWordCripty = document.querySelector(".content_text_detected");
const contentNotFound = document.querySelector(".content_not_found");
const wordCripty = document.querySelector(".content_text_detected p");
const copy = document.querySelector(".copy");
const alertCopy = document.querySelector(".alert_copy");
const clean = document.querySelector(".clean");


cripty.addEventListener('click', (e)=>{
    e.preventDefault();
    
    const textValue = text.value;

    if(!textValue){
        alert("Campo vazio. Digite seu texto!");
        return
    }

    divWordCripty.classList.remove('deactivate');
    contentNotFound.classList.add('deactivate');

    let listLetter = textValue.split('');
    const lettersToCode = ["a", "e", "i", "o", "u"]


    listLetter.forEach((letter, index) =>{
        if(index >= 0 && index < listLetter.length){

            lettersToCode.forEach(search =>{
                if(letter === search){
                    if(search === "a"){listLetter[index] = "ai"}
                    if(search === "e"){listLetter[index] = "enter"}
                    if(search === "i"){listLetter[index] = "imes"}
                    if(search === "o"){listLetter[index] = "ober"}
                    if(search === "u"){listLetter[index] = "ufat"}
                }
            })
        }
    } );

    let newWordCripty = '';
    listLetter.forEach(letter => {
        newWordCripty += letter
    })

    wordCripty.innerHTML = newWordCripty

    text.value = ""
});

copy.addEventListener("click", (e)=>{
    e.preventDefault();

    const wordToCopy = wordCripty.innerHTML;
    navigator.clipboard.writeText(wordToCopy);
    alertCopy.classList.remove('deactivate');
    alertCopy.classList.add('activate');

    setTimeout(()=>{
        alertCopy.classList.remove('activate');
        alertCopy.classList.add('deactivate');
    }, 2000)

    wordCripty.innerHTML = ''
    divWordCripty.classList.add('deactivate');
    contentNotFound.classList.remove('deactivate');
});
clean.addEventListener("click", (e)=>{
    e.preventDefault();
    
    wordCripty.innerHTML = ''
    divWordCripty.classList.add('deactivate');
    contentNotFound.classList.remove('deactivate');
})
descripty.addEventListener('click', (e)=>{
    e.preventDefault();

    const textValue = text.value;

    if(!textValue){
        alert("Campo vazio. Digite seu texto!");
        return
    }

    divWordCripty.classList.remove('deactivate');
    contentNotFound.classList.add('deactivate');

    let newWords = textValue.replaceAll("ai", "a");
    newWords = newWords.replaceAll("enter", "e");
    newWords = newWords.replaceAll("imes", "i");
    newWords = newWords.replaceAll("ober", "o");
    newWords = newWords.replaceAll("ufat", "u");

    wordCripty.innerHTML = newWords;

    text.value = ""
})
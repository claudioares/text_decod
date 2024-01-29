const text = document.querySelector(".text_area textarea");
const cripty = document.querySelector(".cripty");
const descripty = document.querySelector(".descripty");
const divWordCripty = document.querySelector(".content_text_detected");
const contentNotFound = document.querySelector(".content_not_found");
const wordCripty = document.querySelector(".content_text_detected p");
const copy = document.querySelector(".copy");
const alertCopy = document.querySelector(".alert_copy");
const clean = document.querySelector(".clean");


function correctingCharacters (array) {
    const forbiddenCharacters = [
        'A', 'Á', 'À', 'Â', 'Ã', 'Ä',
        'B',
        'C', 'Ç',
        'D',
        'E' ,'É', 'È', 'Ê', 'Ë',
        'F', 'G', 'H',
        'Í', 'Ì', 'Î', 'Ï',
        'J', 'L', 'M', 'N',
        'Ó', 'Ò', 'Ô', 'Õ', 'Ö',
        'P', 'Q', 'R', 'S', 'T',
        'Ú', 'Ù', 'Û', 'Ü',
        'V', 'X', 'Z',
        'Y', 'W', 'K',
        'á', 'à', 'â', 'ã', 'ä',
        'ç',
        'é', 'è', 'ê', 'ë',
        'í', 'ì', 'î', 'ï',
        'ó', 'ò', 'ô', 'õ', 'ö',
        'ú', 'ù', 'û', 'ü',
        '!', '@', '#', '$', '%', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', ';', ':', '<', '>', ',', '.', '/', '?', '|', '\\', '`', '~', '^'
      ];

    let listOfSpecialTyped = [];

    array.forEach(element=>{
        forbiddenCharacters.forEach(char => {
            if(element === char) {
                listOfSpecialTyped.push(element)
            }
        })
    });


    listOfSpecialTyped && alert(`Voce digitou um ou mais caracters proibidos ${listOfSpecialTyped}. Deseja que o sistema corrija?`);

    const specCharacters = ['!', '@', '#', '$', '%', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', ';', ':', '<', '>', ',', '.', '/', '?', '|', '\\', '`', '~', '^'];
    let filterSpecialTyped = array.filter(char => !specCharacters.includes(char));

    let newTextLowerCase = '';
    filterSpecialTyped.forEach(letter => {
        newTextLowerCase += letter;
    })

    newTextLowerCase = newTextLowerCase.toLowerCase();

    return newTextLowerCase;
      
};


cripty.addEventListener('click', (e)=>{
    e.preventDefault();
    
    const textValue = text.value;

    if(!textValue){
        alert("Campo vazio. Digite seu texto!");
        return
    }

    divWordCripty.classList.remove('deactivate');
    contentNotFound.classList.add('deactivate');

    const listLetter = textValue.split('');
    const lettersToCode = ["a", "e", "i", "o", "u"]

    let result = correctingCharacters(listLetter);

    result = result.split('');


    result.forEach((letter, index) =>{
    
        if(index >= 0 && index < listLetter.length){

            lettersToCode.forEach(search =>{
                if(letter === search){
                    if(search === "a"){result[index] = "ai"}
                    if(search === "e"){result[index] = "enter"}
                    if(search === "i"){result[index] = "imes"}
                    if(search === "o"){result[index] = "ober"}
                    if(search === "u"){result[index] = "ufat"}
                }
            })
        }
    } );

    let newWordCripty = '';
    result.forEach(letter => {
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
    newWords = newWords.replaceAll("*", "á");
    newWords = newWords.replaceAll("enter", "e");
    newWords = newWords.replaceAll("imes", "i");
    newWords = newWords.replaceAll("ober", "o");
    newWords = newWords.replaceAll("ufat", "u");

    wordCripty.innerHTML = newWords;

    text.value = ""
})


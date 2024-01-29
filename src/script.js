const text = document.querySelector(".text_area textarea");
const cripty = document.querySelector(".cripty");
const descripty = document.querySelector(".descripty");
const divWordCripty = document.querySelector(".content_text_detected");
const contentNotFound = document.querySelector(".content_not_found");
const wordCripty = document.querySelector(".content_text_detected p");
const copy = document.querySelector(".copy");
const alertCopy = document.querySelector(".alert_copy");
const clean = document.querySelector(".clean");
const modal = document.querySelector(".div_modal");
const modalSpan = document.querySelector(".content_modal span");
const button_y = document.querySelector(".button_y");
const button_n = document.querySelector(".button_n");


function detectedCharacters (array) {
    const forbiddenCharacters = [
        'A', 'Á', 'À', 'Â', 'Ã', 'Ä',
        'B',
        'C', 'Ç',
        'D',
        'E' ,'É', 'È', 'Ê', 'Ë',
        'F', 'G', 'H',
        'I', 'Í', 'Ì', 'Î', 'Ï',
        'J', 'L', 'M', 'N',
        'O','Ó', 'Ò', 'Ô', 'Õ', 'Ö',
        'P', 'Q', 'R', 'S', 'T',
        'U', 'Ú', 'Ù', 'Û', 'Ü',
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


    return listOfSpecialTyped;
}


function correctingCharacters (array) {
   

    const specCharacters = ['!', '@', '#', '$', '%', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', ';', ':', '<', '>', ',', '.', '/', '?', '|', '\\', '`', '~', '^'];
    let filterSpecialTyped = array.filter(char => !specCharacters.includes(char));

    const special_A = ['Á', 'À', 'Â', 'Ã', 'Ä', 'á', 'à', 'â', 'ã', 'ä',];
    const special_C = ['Ç', 'ç'];
    const special_E = ['É', 'È', 'Ê', 'Ë', 'é', 'è', 'ê', 'ë'];
    const special_I = ['Í', 'Ì', 'Î', 'Ï', 'í', 'ì', 'î', 'ï'];
    const special_O = ['Ó', 'Ò', 'Ô', 'Õ', 'Ö', 'ó', 'ò', 'ô', 'õ', 'ö'];
    const special_U = ['Ù', 'Û', 'Ü', 'ú', 'ù', 'û', 'ü'];

    filterSpecialTyped.forEach((letter, index)=>{
        special_A.forEach(search=>{
            if(search === letter) {filterSpecialTyped[index] = "a"}
        });
        special_C.forEach(search=>{
            if(search === letter) {filterSpecialTyped[index] = "c"}
        });
        special_E.forEach(search=>{
            if(search === letter) {filterSpecialTyped[index] = "e"}
        });
        special_I.forEach(search=>{
            if(search === letter) {filterSpecialTyped[index] = "i"}
        });
        special_O.forEach(search=>{
            if(search === letter) {filterSpecialTyped[index] = "o"}
        });
        special_U.forEach(search=>{
            if(search === letter) {filterSpecialTyped[index] = "u"}
        });
    })
    
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


    const listLetter = textValue.split('');
    const lettersToCode = ["a", "e", "i", "o", "u"]

    const prohibitedCharacters = detectedCharacters(listLetter);


    if(prohibitedCharacters.length !== 0){
        modal.classList.remove("deactivate");
        modal.classList.add("activate");
        modalSpan.innerHTML = `Voce digitou um ou mais caracters proibidos ${prohibitedCharacters}. Deseja que o sistema corrija?`;

        button_y.addEventListener("click", (e)=>{
            e.preventDefault();

            modal.classList.remove("activate");
            modal.classList.add("deactivate");

            let result = correctingCharacters(listLetter);
            result = result.split('');
    
            result.forEach((letter, index) =>{
            
                if(index >= 0 && index < result.length){
        
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
    
                let newWordCripty = '';
                result.forEach(letter => {
                    newWordCripty += letter
                })
            
                wordCripty.innerHTML = newWordCripty
            
                text.value = ""
            } );

            divWordCripty.classList.remove('deactivate');
            contentNotFound.classList.add('deactivate');

            return;
        });

        button_n.addEventListener("click", (e)=>{
            e.preventDefault();

            modal.classList.remove("activate");
            modal.classList.add("deactivate");

            text.value = '';

            return;
        })
    } else {
        divWordCripty.classList.remove('deactivate');
        contentNotFound.classList.add('deactivate');
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

            let newWordCripty = '';
            listLetter.forEach(letter => {
                newWordCripty += letter
            })
        
            wordCripty.innerHTML = newWordCripty
        
            text.value = ""
        } );

        return;
    };
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


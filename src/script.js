export default class TextProcess {
  constructor() {
    this.text = document.querySelector(".text_area textarea");
    this.criptyButton = document.querySelector(".cripty");
    this.descriptyButton = document.querySelector(".descripty");
    this.divWordCripty = document.querySelector(".content_text_detected");
    this.contentNotFound = document.querySelector(".content_not_found");
    this.wordCripty = document.querySelector(".content_text_detected p");
    this.copyButton = document.querySelector(".copy");
    this.alertCopy = document.querySelector(".alert_copy");
    this.cleanButton = document.querySelector(".clean");
    this.modal = document.querySelector(".div_modal");
    this.modalSpan = document.querySelector(".content_modal span");
    this.button_y = document.querySelector(".button_y");
    this.button_n = document.querySelector(".button_n");

    this.inicialize();
  };

  inicialize() {
    this.criptyButton.addEventListener('click', this.handleCripty.bind(this));
    this.copyButton.addEventListener('click', this.handleCopy.bind(this));
    this.cleanButton.addEventListener('click', this.handleClean.bind(this));
    this.descriptyButton.addEventListener('click', this.handleDescripty.bind(this));
    this.button_y.addEventListener('click', this.handleYes.bind(this));
    this.button_n.addEventListener('click', this.handleNo.bind(this));
  };

  detectedCharacters(array) {
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
  };

  correctingCharacters(array) {
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
  }

  handleCripty (e) {
    e.preventDefault();

    const textValue = this.text.value;
    if(!textValue){
      alert("Campo vazio. Digite seu texto!");
      return
    };

    const listLetter = textValue.split('');
    const lettersToCode = ["a", "e", "i", "o", "u"];

    const prohibitedCharacters = this.detectedCharacters(listLetter);
    if(prohibitedCharacters.length !== 0) {
      this.modal.classList.remove("deactivate");
      this.modal.classList.add("activate");
      this.modalSpan.innerHTML = `Voce digitou um ou mais caracters proibidos ${prohibitedCharacters}. Deseja que o sistema corrija?`;
      
      
    } else {
      this.divWordCripty.classList.remove('deactivate');
      this.contentNotFound.classList.add('deactivate');

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
    
        this.wordCripty.innerHTML = newWordCripty
    
        this.text.value = ""
      } );

      return;
    };
  };

  handleCopy (e) {
    e.preventDefault();

    const wordToCopy = this.wordCripty.innerHTML;
    navigator.clipboard.writeText(wordToCopy);
    this.alertCopy.classList.remove('deactivate');
    this.alertCopy.classList.add('activate');

    setTimeout(()=>{
        this.alertCopy.classList.remove('activate');
        this.alertCopy.classList.add('deactivate');
    }, 2000)

    this.wordCripty.innerHTML = ''
    this.divWordCripty.classList.add('deactivate');
    this.contentNotFound.classList.remove('deactivate');
  };

  handleClean (e) {
      e.preventDefault();
      
      this.wordCripty.innerHTML = ''
      this.divWordCripty.classList.add('deactivate');
      this.contentNotFound.classList.remove('deactivate');
  }
  handleDescripty (e) {
    e.preventDefault();

    const textValue = this.text.value;

    if(!textValue){
      alert("Campo vazio. Digite seu texto!");
      return
    };

    this.divWordCripty.classList.remove('deactivate');
    this.contentNotFound.classList.add('deactivate');

    let newWords = textValue.replaceAll("ai", "a");
    newWords = newWords.replaceAll("*", "á");
    newWords = newWords.replaceAll("enter", "e");
    newWords = newWords.replaceAll("imes", "i");
    newWords = newWords.replaceAll("ober", "o");
    newWords = newWords.replaceAll("ufat", "u");

    this.wordCripty.innerHTML = newWords;

    this.text.value = ""

  };

  handleYes() {

    this.modal.classList.remove("activate");
    this.modal.classList.add("deactivate");

    const textValue = this.text.value;
    const listLetter = textValue.split('');

    let result = this.correctingCharacters(listLetter);
    result = result.split('');
    const lettersToCode = ["a", "e", "i", "o", "u"];

    result.forEach((letter, index)=>{
      if(index >= 0 && index < result.length){
    
        lettersToCode.forEach(search =>{
            if(letter === search){
                if(search === "a"){result[index] = "ai"}
                if(search === "e"){result[index] = "enter"}
                if(search === "i"){result[index] = "imes"}
                if(search === "o"){result[index] = "ober"}
                if(search === "u"){result[index] = "ufat"}
            };
        });
      };

      let newWordCripty = '';
      result.forEach(letter => {
        newWordCripty += letter
      })
        
      this.wordCripty.innerHTML = newWordCripty
        
      this.text.value = ""
    });


    this.divWordCripty.classList.remove('deactivate');
    this.contentNotFound.classList.add('deactivate');

    return;
  };

  handleNo(e) {
    e.preventDefault();

    this.modal.classList.remove("activate");
    this.modal.classList.add("deactivate");

    this.text.value = '';

    return;
  };
};

const textprocess = new TextProcess();

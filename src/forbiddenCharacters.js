function forbiddenCharacters (chatacter) {
    const forbiddenCharacters = [
        'Á', 'À', 'Â', 'Ã', 'Ä',
        'Ç',
        'É', 'È', 'Ê', 'Ë',
        'Í', 'Ì', 'Î', 'Ï',
        'Ó', 'Ò', 'Ô', 'Õ', 'Ö',
        'Ú', 'Ù', 'Û', 'Ü',
        'á', 'à', 'â', 'ã', 'ä',
        'ç',
        'é', 'è', 'ê', 'ë',
        'í', 'ì', 'î', 'ï',
        'ó', 'ò', 'ô', 'õ', 'ö',
        'ú', 'ù', 'û', 'ü',
        '!', '@', '#', '$', '%', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', ';', ':', '<', '>', ',', '.', '/', '?', '|', '\\', '`', '~', '^'
      ];


      forbiddenCharacters.forEach(special_character => {
        if(chatacter === special_character){
            console.log("proibido")
        }
      })
      
};


export{forbiddenCharacters}
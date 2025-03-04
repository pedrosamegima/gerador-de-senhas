function getChartTypes() { //Função para pegar os tipos de caractres selecionados pelo user
    const uppercase = document.querySelector('#incluide_uppercase').checked;
    const lowercase = document.querySelector('#incluide_lowercase').checked;
    const number = document.querySelector('#incluide_number').checked;
    const specialCharacter = document.querySelector('#incluide_special_character').checked;

    const charTypes = [];//arrays para armazenar os dados do user

    if (uppercase) {
        charTypes.push('ABCDEFGHJKLMNPQORSTUVWXYZ') // Adiciona os caracteres maiúsculos ao array
    }

    if (lowercase) {
        charTypes.push('abcdefghijklmnpqorstuvwxyz') // Adiciona os caracteres minúsculos ao array
    }
    if (number) {
        charTypes.push('0123456789')// Adiciona os números ao array
    }
    if (specialCharacter) {
        charTypes.push('!@#$%^&*()-_=+[]{}|;:,.<>?/'); // Adiciona caracteres especiais ao array
    }

    return charTypes;  // Retorna o array com os tipos de caracteres selecionados
}
function getPasswordSize() {//Função para pegar o tamanho da entrada
    const size = document.querySelector('#size').value;//pega o valor inserido pelo user

    if (isNaN(size) || size < 4 || size > 128) {//verfica se está no tamnho entre 4 a 128
        massage('Tamanho invalido, sua senha só sera criada a partir de 4 caracteres!', 'warning');//Exibe a mensagem de erro
    }
    return size;
}
function randomCharTypes(charTypes) {//função para escolher um caractere aleatório dos tipos selecionados
    const randomIndex = Math.floor(Math.random() * charTypes.length);//escolhe um dado aleatório no array dos caracteres

    return charTypes[randomIndex][Math.floor(Math.random() * charTypes[randomIndex].length)];//retorna um caractere aleatório da string
}

function generatePassword(size, charTypes) {  // Função para gerar a senha com o tamanho e tipos de caracteres fornecidos
    let passawordGenerated = ''; // Variável para armazenar a senha gerada

    // Gera a senha até atingir o tamanho desejado
    while (passawordGenerated.length < size) {
        passawordGenerated += randomCharTypes(charTypes)// Adiciona um caractere aleatório à senha
    }
    return passawordGenerated; // Retorna a senha gerada

}
function massage(text, status = 'sucsess') {//função de mensagem usando o Toastify
    Toastify({
        text: text,
        duration: 3000,
        style: {
            background: status === 'success' ? '#84cc16' : '#dc2626',
            boxShadow: 'none'
        }
    }).showToast();
}
// Evento que dispara a geração da senha ao clicar no botão de gerar
document.querySelector('#generate').addEventListener('click', function () {
    const size = getPasswordSize();//pega o tamanho da senha
    const charTypes = getChartTypes();//pega o tipo de caractere selecionado


    if (!size || !charTypes.length) {//verifica o tamanho, se ele não for válido não continua
        massage('Selecione pelo menos um tipo de caractere', 'warning');
        return;
    }
    const passwordGenerated = generatePassword(size, charTypes);//gera a senha de acordo com o tamnho e tipo de dados fornecidos
    document.querySelector('#password_container').classList.add('show');//torna o container da senha visível
    document.querySelector('#password').textContent = passwordGenerated;// exibe a senha gerada no container
});

// Evento que dispara ao clicar no botão de copiar a senha para a área de transferência
document.querySelector('#copy').addEventListener('click', function () {
    navigator.clipboard.writeText(document.querySelector('#password').textContent);// Copia a senha
    massage('Senha copida com sucesso', 'success');//exibe mensagem de sucesso
});

document.querySelector('#refresh').addEventListener('click', function(){//evento para atualizar a senha ao clicar no button de refresh
   const size = getPasswordSize();//pega o tamanho selecionado pelo user
   const charTypes = getChartTypes();//pega os tipos de caracteres selecionados

   if(!size || !charTypes.length){//verifica se o tamanho e os caracteres foram selecionados, se não for ele não continua
    return;
   }

   const passawordGenerated = generatePassword(size, charTypes);
   document.querySelector('#password').textContent = passawordGenerated;
})
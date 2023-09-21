document.addEventListener("DOMContentLoaded", function () {
    const cardCodeInput = document.getElementById("securityCode");
    const cepInput = document.getElementById("zipCode");
    const cardNumberInput = document.getElementById("cardNumber");
    const amountInput = document.getElementById("amount");



// Obtém o elemento de entrada de data de expiração
const expirationDateInput = document.getElementById("ExpirationDate");

// Adiciona um ouvinte de evento para o evento "input"
expirationDateInput.addEventListener("input", function () {
    // Obtém o valor atual do campo de entrada
    const inputValue = expirationDateInput.value;

    // Remove todos os caracteres que não são números
    const cleanedValue = inputValue.replace(/[^0-9]/g, "");

    // Verifica o comprimento do valor e formata conforme necessário
    if (cleanedValue.length === 2) {
        expirationDateInput.value = cleanedValue + "/";
    } else if (cleanedValue.length > 2) {
        const mm = cleanedValue.substring(0, 2);
        const yyyy = cleanedValue.substring(2, 6);
        expirationDateInput.value = mm + "/" + yyyy;
    }
});


    // Regra 1: Permitir apenas números e no máximo 3 dígitos no campo Código do Cartão
    cardCodeInput.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "").slice(0, 3);
    });

    // Regra 2: Permitir apenas números e no máximo 8 dígitos no campo CEP
    cepInput.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "").slice(0, 8);
    });

    // Regra 3: Permitir apenas números e no máximo 16 dígitos no campo Número do Cartão
    cardNumberInput.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "").slice(0, 16);
    });

    // Regra 5: Formatação de moeda no campo de valor
    amountInput.addEventListener("input", function () {
        // Remove qualquer caractere não numérico
        let value = this.value.replace(/\D/g, "");

        // Formata o valor como moeda (0,00)
        value = value.replace(/^0+/g, ""); // Remove zeros à esquerda
        if (value.length === 0) {
            value = "0";
        } else if (value.length === 1) {
            value = "0,0" + value;
        } else if (value.length === 2) {
            value = "0," + value;
        } else {
            value = value.replace(/^(\d+)(\d{2})$/, "$1,$2");
        }

        this.value = value;
    });
});

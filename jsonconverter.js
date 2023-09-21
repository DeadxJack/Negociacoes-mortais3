document.getElementById("payment-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Obtém os valores dos campos do formulário
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const birthdate = document.getElementById("birthdate").value;
    const street = document.getElementById("street").value;
    const number = document.getElementById("number").value;
    const complement = document.getElementById("complement").value;
    const zipCode = document.getElementById("zipCode").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const country = document.getElementById("country").value;
    const paymentType = document.getElementById("paymentType").value;
    const cardBrand = document.getElementById("cardBrand").value;
    const cardNumber = document.getElementById("cardNumber").value;
    const securityCode = document.getElementById("securityCode").value;
    const ExpirationDate = document.getElementById("ExpirationDate").value;
    
    
    const installments = document.getElementById("installments").value;
    const amountWithComma = document.getElementById("amount").value; // Valor com vírgula

    // Remova todas as vírgulas do valor
    const amount = amountWithComma.replace(/,/g, "");



// Função para gerar um ID de pedido único (pode ser implementado de forma diferente)
function generateMerchantOrderId() {
    const timestamp = new Date().getTime();
    const randomId = Math.floor(Math.random() * 1000);
    return `Order-${timestamp}-${randomId}`;
}
    // Gere um ID de pedido único (pode ser implementado de forma diferente)
    const merchantOrderId = generateMerchantOrderId();

    // Crie o objeto formData com os valores dos campos do formulário
    const formData = {
        "MerchantOrderId": merchantOrderId,
        "Customer": {
            "Name": name,
            "Email": email,
            "Birthdate": birthdate,
            "Address": {
                "Street": street,
                "Number": number,
                "Complement": complement,
                "ZipCode": zipCode,
                "City": city,
                "State": state,
                "Country": country
            }
        },
        "Payment": {
            "Type": paymentType,
            "Amount": amount, // Valor sem vírgula
            "Currency": "BRL",
            "Country": "BRA",
            "Installments": installments,
            "Interest": "ByMerchant",
            	"Capture": false,
           		"Authenticate": false,
           
            "CreditCard": {
			            "CardNumber": cardNumber,
			             "Holder": name,
			             "ExpirationDate": ExpirationDate,
			             "SecurityCode": securityCode,
		              	"SaveCard": "false",
			              "Brand": cardBrand, 
			              
            // ... outros campos do pagamento ...
        }
        }
      
    } 

fetch("https://apisandbox.cieloecommerce.cielo.com.br/1/sales/", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "MerchantId": "1bf6bac0-36ca-4b6c-80d9-4085e9c378b5",
        "MerchantKey": "DYABMHCXHZYTPDKYLIKFNYZSWSKKVGLUXAFFHDYU",
    },
    body: JSON.stringify(formData),
})
.then((response) => {
    if (!response.ok) {
        throw new Error("Erro na solicitação: " + response.status);
    }
    return response.json();
}) 
.then((data) => {
    console.log("Resposta da API Cielo:", data);

    if (data.Payment && (data.Payment.ReturnCode === "4" || data.Payment.ReturnCode === "6")) {
        Swal.fire({
            title: 'Transação Aprovada',
            text: 'Sua compra foi um Pacto irrecusável!!',
            imageUrl: 'https://media4.giphy.com/media/VIsVsTxJISANoOFeqo/giphy.webp?cid=6c09b952jwkm177bkfk19g6tu7xaad44s7qsoizs9lrgot7r&ep=v1_internal_gif_by_id&rid=giphy.webp&ct=g',
            imageWidth: 250,
            imageHeight: 200,
            imageAlt: 'Custom image',
            customClass: 'sweetalert-custom'
        });
    } else {
        console.log("Código de retorno:", data.Payment.ReturnCode);
        Swal.fire({
            title: 'Transação negada!',
            text: 'O inferno te espera na próxima tentativa. Mortal.”',
            imageUrl: 'https://i0.wp.com/38.media.tumblr.com/cd32f85dc70856b02ded3ac3b628201b/tumblr_nlydb8pHQL1r0xsulo4_540.gif',
            imageWidth: 200,
            imageHeight: 150,
            imageAlt: 'Custom image',
            customClass: 'sweetalert-custom'
        });
        };
        });
    });

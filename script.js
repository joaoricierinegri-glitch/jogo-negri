document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-cadastro');
    const inputCpf = document.getElementById('cpf');
    const inputTel = document.getElementById('telefone');

    // Máscara para CPF (000.000.000-00)
    inputCpf.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
        if (value.length <= 11) {
            value = value.replace(/(\Step1\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        }
        e.target.value = value;
    });

    // Máscara para Telefone ((00) 00000-0000)
    inputTel.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 11) {
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
            value = value.replace(/(\d{5})(\d)/, '$1-$2');
        }
        e.target.value = value;
    });

    // Simulação de Envio
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o recarregamento da página

        const nome = document.getElementById('nome').value;

        // Aqui você enviaria os dados para um banco de dados via Fetch API
        alert(`Sucesso! O cliente ${nome} foi cadastrado (simulação).`);
        
        form.reset(); // Limpa o formulário
    });
});
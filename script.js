document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-cadastro');
    const cepInput = document.getElementById('cep');
    
    // 1. BUSCA AUTOMÁTICA DE CEP
    cepInput.addEventListener('blur', async () => {
        let cep = cepInput.value.replace(/\D/g, '');
        if (cep.length !== 8) return;

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (!data.erro) {
                document.getElementById('logradouro').value = data.logradouro;
                document.getElementById('bairro').value = data.bairro;
                document.getElementById('cidade').value = data.localidade;
            } else {
                alert("CEP não encontrado.");
            }
        } catch (error) {
            console.error("Erro ao buscar CEP");
        }
    });

    // 2. SALVAR E PERSISTIR DADOS (LocalStorage)
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const novoCliente = {
            nome: document.getElementById('nome').value,
            cidade: document.getElementById('cidade').

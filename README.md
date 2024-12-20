# Vue Cards Frontend

Este repositório contém um projeto em Vue.js que implementa componentes de cards dinâmicos e customizáveis. Cada card possui título, texto, cor de fundo e um botão com link que redireciona para mais informações.

## Funcionalidades

- **Cards Customizáveis:**
  - Cada card exibe informações configuradas através de `props`.
  - As propriedades incluem:
    - **Título**: Texto principal do card.
    - **Texto**: Descrição ou conteúdo adicional.
    - **Cor de Fundo**: Define o estilo visual do card.
    - **Link**: URL associada ao botão "Saiba mais".

- **Design Responsivo:**
  - Interface adaptável para diferentes tamanhos de tela.

- **Botão Interativo:**
  - Cada card possui um botão "Saiba mais" que redireciona o usuário para o link configurado.

## Como Executar

### Pré-requisitos

- Node.js (versão 14 ou superior)
- Gerenciador de pacotes npm (instalado com o Node.js)

### Passos

1. **Clone o Repositório:**
   ```bash
   git clone https://github.com/JoaoVitorDiass/Vue-cardsFrontend.git
   ```

2. **Instale as Dependências:**
   Navegue até o diretório do projeto e execute:
   ```bash
   npm install
   ```

3. **Execute o Servidor de Desenvolvimento:**
   Inicie o servidor local com hot reload:
   ```bash
   npm run dev
   ```
   O projeto estará disponível em `http://localhost:8080`.

4. **Build para Produção:**
   Gere os arquivos otimizados para produção:
   ```bash
   npm run build
   ```

5. **Relatório de Análise do Bundle:**
   Para visualizar um relatório do bundle:
   ```bash
   npm run build --report
   ```

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).

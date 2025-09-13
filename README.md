# Gopy Connect

![Demo do Gopy Connect](src/assets/demo.gif)

Um clone do front-end do Facebook construído para consumir uma API em Go (`social_api`). Este projeto serve como a interface de usuário para uma aplicação de rede social, focando em uma experiência de usuário limpa e responsiva.

Este projeto foi desenvolvido com o auxílio de IA e utiliza uma stack moderna de tecnologias web.

## Tecnologias Utilizadas

- **React**: Biblioteca para construção de interfaces de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **SCSS**: Pré-processador CSS para estilos mais organizados e reutilizáveis.
- **Material-UI**: Biblioteca de componentes React para um design mais rápido e fácil.
- **Docker**: Plataforma de containerização para garantir um ambiente de desenvolvimento e produção consistente.

## Como Rodar o Projeto

Você pode rodar este projeto de duas maneiras: localmente com Node.js ou via Docker.

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [Yarn](https://yarnpkg.com/) (ou `npm`)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)

---

### 1. Rodando Localmente

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/gopy-connect.git](https://github.com/seu-usuario/gopy-connect.git)
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd gopy-connect
    ```

3.  **Instale as dependências:**
    ```bash
    yarn install
    ```
    *(ou `npm install`)*

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    yarn start
    ```
    *(ou `npm start`)*

5.  Abra seu navegador e acesse `http://localhost:3000`.

---

### 2. Rodando com Docker

Este é o método recomendado para garantir que o ambiente seja idêntico ao de produção.

1.  **Certifique-se de que o Docker está em execução** na sua máquina.

2.  **Na raiz do projeto, construa e suba o container:**
    ```bash
    docker-compose up --build
    ```

3.  Abra seu navegador e acesse `http://localhost:3000`.

## Estrutura de Commits

Este projeto segue o padrão de **Conventional Commits**. Isso ajuda a manter o histórico de commits limpo e legível.

**Formato:** `tipo(escopo): mensagem`

-   **Tipos válidos:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`.
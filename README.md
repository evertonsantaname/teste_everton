[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=melhorenvio_qa-v2&metric=alert_status&token=abaf954e0a3c56f02e00f3b9dda078fd93b4159c)](https://sonarcloud.io/summary/new_code?id=melhorenvio_qa-v2)
[![Release Regression schedule](https://github.com/melhorenvio/qa-v2/actions/workflows/Release-Regression.yml/badge.svg?branch=main)](https://github.com/melhorenvio/qa-v2/actions/workflows/Release-Regression.yml)
[![Crossbrowser Regression](https://github.com/melhorenvio/qa-v2/actions/workflows/crossbrowser.yml/badge.svg)](https://github.com/melhorenvio/qa-v2/actions/workflows/crossbrowser.yml)

---

QA - Melhor Envio

# Configuração do Projeto

    - Configurar arquivo de ambiente `cypress.env.json` , baseado no exemplo do repositório.
    - Instalação das dependencias do projeto com `npm install`

# Testes Funcionais

    Scripts de teste funcional utilizando a ferramenta :
    - Cypress
        - Interface : Fluxos e2e que utilizam a interface para realização e validação das operações.
        - Api : Scripts que validam o backend do sistema.

# Validações de interface CrossBrowser

    Scripts de validação visual da plataforma que são executados nas ferramentas :
        - Percy : Ferramenta de comparação de snapshots.
        - Nightwatch : Scripts automatizados de validação de interface que rodam em dispositivos e browsers diversos.
    Execução agendada semanalmente para Segunda Feira 20:30 , relatorio de execução no canal #percy-notification no slack.

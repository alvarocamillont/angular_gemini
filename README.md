# Workshop: Construindo uma Aplicação Web com Angular, Gemini e NestJS

Bem-vindo ao nosso workshop prático, onde você aprenderá a construir uma aplicação web completa integrando Angular, o poder da IA generativa do Gemini e um backend robusto com NestJS.

Neste workshop, vamos desenvolver uma aplicação que simula um chat usando a API do Google Gemini.

## Pré-requisitos

Antes de começarmos, certifique-se de que você possui os seguintes itens instalados em sua máquina:

1.  **Node.js e npm:**
    *   **Node.js:** A plataforma de execução JavaScript. Recomendamos a versão LTS (Long Term Support).
    *   **npm (Node Package Manager):** Vem instalado com o Node.js, usado para gerenciar pacotes.
    *   **Como verificar:** Abra o seu terminal e execute `node -v` e `npm -v`. Se os comandos retornarem a versão instalada, você está pronto.
    *   **Download:** [https://nodejs.org/](https://nodejs.org/)

2.  **Angular CLI:**
    *   A interface de linha de comando do Angular, essencial para criar e gerenciar projetos Angular.
    *   **Como instalar:** Após instalar o Node.js e npm, execute o seguinte comando no seu terminal: `npm install -g @angular/cli`.
    * **Como verificar:** `ng version`

3.  **NestJS CLI:**
    *   A interface de linha de comando do NestJS, fundamental para criar e gerenciar projetos em NestJS
    * **Como instalar:** Após instalar o Node.js e npm, execute o seguinte comando no seu terminal: `npm install -g @nestjs/cli`
    * **Como verificar:** `nest --version`

4.  **Editor de Código:**
    *   Recomendamos o **Visual Studio Code (VS Code)**, pois oferece excelente suporte para desenvolvimento JavaScript, TypeScript e Angular.
    * **Download:** [https://code.visualstudio.com/](https://code.visualstudio.com/)

5. **Git:**
    *  Sistema de controle de versão, recomendado para acompanhar o progresso do projeto
    * **Download:** [https://git-scm.com/downloads](https://git-scm.com/downloads)
    * **Como verificar:** `git --version`

6. **Conta Google:**
    * Necessária para criar uma chave Gemini.

## Obtendo sua API Key do Google Gemini

Para utilizar os recursos de IA do Gemini em sua aplicação, você precisará de uma API Key. Siga os passos abaixo para obtê-la:

1.  **Acesse o Google AI Studio:**
    *   Abra seu navegador e acesse o site do Google AI Studio: [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
    *   Faça login com sua **conta Google**.

2.  **Crie uma nova API Key:**
    *  Clique em "Create API Key" no canto superior direito da tela.
    *  Selecione um projeto existente no seu GCP (Google Cloud Platform), ou crie um novo.
      * **Caso você precise criar um novo projeto no GCP:** Siga os passos desse link: [https://cloud.google.com/resource-manager/docs/creating-managing-projects](https://cloud.google.com/resource-manager/docs/creating-managing-projects)
    * Clique em "Create API Key in existing project".

3.  **Copie a sua API Key:**
    *   A API Key será gerada e exibida na tela.
    *   **IMPORTANTE:** Copie essa chave e guarde-a em um local seguro. Você precisará dela para configurar sua aplicação.
    *   **NÃO** compartilhe sua chave com outras pessoas. Ela é pessoal e intransferível.

4. **Armazenando a API Key:**

    * Durante o desenvolvimento utilizaremos variaveis de ambiente.
    * Crie um arquivo `.env` na raiz do seu projeto NestJS
    * Adicione a seguinte linha, substituindo `SUA_API_KEY` pela sua chave:
    ```
    GEMINI_API_KEY=SUA_API_KEY
    ```
    * No arquivo `src/main.ts` insira a seguinte linha:
    ```ts
    config();
    ```
    * No arquivo `src/app.module.ts` insira as seguintes linhas:
    ```ts
    import { ConfigModule } from '@nestjs/config';

    @Module({
      imports: [ConfigModule.forRoot(), //... resto do seu codigo
    })
    ```
    * No local em que voce for utilizar a api, como por exemplo no seu service:
    ```ts
    import { ConfigService } from '@nestjs/config';

    @Injectable()
    export class SuaClasseService {
      private readonly apiKey: string;

      constructor(private readonly configService: ConfigService) {
        this.apiKey = this.configService.get<string>('GEMINI_API_KEY');
      }
      //... resto do codigo
    }
    ```
    * No arquivo `.gitignore` adicione a seguinte linha para que o seu arquivo de api key nao vá para o repositório:
    ```
    .env
    ```

## Próximos Passos

Após configurar o ambiente, no proximo passo iremos:
* Clonar o projeto base (se houver um).
* Criar os projetos angular e nestjs
* Iniciar o desenvolvimento da nossa aplicação!

## Suporte

Caso você tenha qualquer dúvida ou encontre algum problema durante a instalação, não hesite em perguntar ao instrutor ou aos outros participantes do workshop. Estamos aqui para ajudar!

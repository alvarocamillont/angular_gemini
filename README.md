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
    *   **Como verificar:** `ng version`

3.  **NestJS CLI:**
    *   A interface de linha de comando do NestJS, fundamental para criar e gerenciar projetos em NestJS
    *   **Como instalar:** Após instalar o Node.js e npm, execute o seguinte comando no seu terminal: `npm install -g @nestjs/cli`
    *   **Como verificar:** `nest --version`

4.  **Editor de Código:**
    *   Recomendamos o **Visual Studio Code (VS Code)**, pois oferece excelente suporte para desenvolvimento JavaScript, TypeScript e Angular.
    *   **Download:** [https://code.visualstudio.com/](https://code.visualstudio.com/)

5.  **Git:**
    *   Sistema de controle de versão, recomendado para acompanhar o progresso do projeto
    *   **Download:** [https://git-scm.com/downloads](https://git-scm.com/downloads)
    *   **Como verificar:** `git --version`

6.  **Conta Google:**
    *   Necessária para criar uma chave Gemini.

## Obtendo sua API Key do Google Gemini

Para utilizar os recursos de IA do Gemini em sua aplicação, você precisará de uma API Key. Siga os passos abaixo para obtê-la:

1.  **Acesse o Google AI Studio:**
    *   Abra seu navegador e acesse o site do Google AI Studio: [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
    *   Faça login com sua **conta Google**.

2.  **Crie uma nova API Key:**
    *   Clique em "Create API Key" no canto superior direito da tela.
    *   Selecione um projeto existente no seu GCP (Google Cloud Platform), ou crie um novo.
        *   **Caso você precise criar um novo projeto no GCP:** Siga os passos desse link: [https://cloud.google.com/resource-manager/docs/creating-managing-projects](https://cloud.google.com/resource-manager/docs/creating-managing-projects)
    *   Clique em "Create API Key in existing project".

3.  **Copie a sua API Key:**
    *   A API Key será gerada e exibida na tela.
    *   **IMPORTANTE:** Copie essa chave e guarde-a em um local seguro. Você precisará dela para configurar sua aplicação.
    *   **NÃO** compartilhe sua chave com outras pessoas. Ela é pessoal e intransferível.

## Iniciando o Projeto Backend (NestJS)

Agora que você já possui sua API key, vamos iniciar a configuração do nosso projeto backend:

1.  **Criando o Projeto:**
    *   Abra o seu terminal.
    *   Navegue até a pasta raiz do seu projeto.
    *   Execute o seguinte comando: `nest new backend --skip-git` (você pode substituir "backend" pelo nome desejado para seu projeto).
        *   O uso da flag `--skip-git` impede que o Nest crie uma nova pasta `.git` dentro da pasta do projeto backend, evitando assim, que haja mais de um controle de versão no mesmo projeto. Essa flag deve ser utilizada caso você for utilizar somente um repositorio para os projetos de backend e front end.
        *   Caso queira utilizar um repositório separado para o projeto backend, omita a flag `--skip-git`.
    *   Escolha `npm` como gerenciador de pacotes se perguntado.

2.  **Instalando o @nestjs/config:**
    *   Acesse a pasta do projeto backend: `cd backend`
    *   Execute o seguinte comando: `npm i @nestjs/config`
        * Esse pacote é necessário para utilizar as variaveis de ambiente.

3.  **Armazenando a API Key:**
    *   Durante o desenvolvimento utilizaremos variáveis de ambiente.
    *   Crie um arquivo `.env` na raiz do seu projeto NestJS (pasta "backend" se seguiu o passo acima).
    *   Adicione a seguinte linha ao arquivo `.env`, substituindo `SUA_API_KEY` pela sua chave:

    ```
    GEMINI_API_KEY=SUA_API_KEY
    ```

    *   No arquivo `src/app.module.ts` insira as seguintes linhas:

    ```ts
    import { ConfigModule } from '@nestjs/config';

    @Module({
      imports: [ConfigModule.forRoot()], //... resto do seu codigo
    })
    ```

    *   No local em que você for utilizar a api, como por exemplo no seu service (você pode criar um novo ou usar o padrão `app.service.ts`):

    ```ts
    import { ConfigService } from '@nestjs/config';
    import { Injectable } from '@nestjs/common';

    @Injectable()
    export class AppService { //ou o nome do seu service
      private readonly apiKey: string;

      constructor(private readonly configService: ConfigService) {
        this.apiKey = this.configService.get<string>('GEMINI_API_KEY');
      }
        getHello(): string {
            console.log(this.apiKey);
            return 'Hello World!';
        }
      //... resto do codigo
    }
    ```

    *   No arquivo `.gitignore` na raiz do projeto (pasta do projeto principal que possui o git) adicione a seguinte linha para que o seu arquivo de api key não vá para o repositório:

    ```
    backend/.env
    ```

4.  **Executando o Projeto**:
    *   Após concluir os passos acima, execute o seguinte comando para iniciar o projeto `npm run start:dev`.

5. **Instalando o SDK do Gemini:**
    * Agora vamos instalar o SDK do Gemini no projeto backend.
    * No terminal, ainda dentro da pasta `backend` do projeto, execute o seguinte comando:
        ```bash
        npm install @google/generative-ai
        ```
    * Este comando instala o pacote `@google/generative-ai`, que é o SDK oficial do Google para acessar as APIs do Gemini.

6. **Criando o Módulo Prompt:**
    *  Agora vamos criar um novo módulo chamado `prompt` dentro do projeto backend. Este módulo será responsável por conter a lógica de comunicação com o Gemini.
    * No terminal, ainda dentro da pasta `backend` do projeto, execute o seguinte comando:
    ```bash
        nest generate module prompt
    ```
    * Este comando irá criar uma nova pasta `prompt`, contendo o módulo, dentro de `src`.
    * **Importando o `ConfigModule` no `PromptModule`:**
        * Após criar o módulo, abra o arquivo `src/prompt/prompt.module.ts`.
        * Dentro do `imports` do `@Module`, adicione `ConfigModule`. Esse passo é **crucial** para que o `PromptService` possa injetar o `ConfigService` e acessar a API Key.
        * O arquivo `src/prompt/prompt.module.ts` deve ficar semelhante a:
        ```typescript
        import { Module } from '@nestjs/common';
        import { PromptService } from './prompt.service';
        import { PromptController } from './prompt.controller';
        import { ConfigModule } from '@nestjs/config'; // Importe o ConfigModule aqui

        @Module({
          imports: [ConfigModule], // Adicione o ConfigModule dentro do array de imports.
          controllers: [PromptController],
          providers: [PromptService],
        })
        export class PromptModule {}
        ```
        *  **Explicação:**
          *   O `ConfigModule` é necessário porque o `PromptService` precisa do `ConfigService` para ler a API key do arquivo `.env`. Ao importar `ConfigModule` dentro de `PromptModule`, nós estamos tornando o `ConfigService` disponível para injeção dentro deste módulo e seus providers (como o `PromptService`).
           * **Importante**: É necessário importar o `PromptModule` dentro do `AppModule` em `src/app.module.ts`. Abra o `src/app.module.ts` e adicione o `PromptModule` no array de `imports`:
            ```ts
                import { Module } from '@nestjs/common';
                import { AppController } from './app.controller';
                import { ConfigModule } from '@nestjs/config';
                import { PromptModule } from './prompt/prompt.module'; //Importe aqui

                @Module({
                  imports: [ConfigModule.forRoot(), PromptModule], // Adicione aqui
                })
                export class AppModule {}
            ```

7. **Criando o Serviço e o Controller no Módulo Prompt:**
    * Agora que o módulo `prompt` foi criado, vamos adicionar um serviço e um controller a ele.
    * **Criando o Serviço:**
        * No terminal, ainda dentro da pasta `backend` do projeto, execute o seguinte comando:
        ```bash
            nest generate service prompt/prompt
        ```
        * Este comando irá criar um arquivo `prompt.service.ts` e `prompt.service.spec.ts` dentro da pasta `src/prompt`.
    * **Criando o Controller:**
        * No terminal, ainda dentro da pasta `backend` do projeto, execute o seguinte comando:
        ```bash
            nest generate controller prompt/prompt
        ```
        * Este comando irá criar um arquivo `prompt.controller.ts` e `prompt.controller.spec.ts` dentro da pasta `src/prompt`.

8. **Criando o DTO `GenerateTextDto`:**
    *   Agora vamos criar um DTO (Data Transfer Object) para definir a estrutura de dados que será enviada pelo frontend para solicitar a geração de texto.
    *   **Criando o Arquivo:**
        *   Dentro da pasta `src/prompt`, crie um novo arquivo chamado `dto/generate-text.dto.ts`.
    *   **Adicionando o código do DTO:**
        *   Dentro do arquivo `generate-text.dto.ts`, adicione o seguinte código:

        ```typescript
        import { ApiProperty } from '@nestjs/swagger';

        export class GenerateTextDto {
          @ApiProperty({
            name: 'prompt',
            description: 'Texto da pergunta',
            type: 'string',
            required: true,
          })
          prompt: string;
        }
        ```
        * Este DTO terá uma propriedade, `prompt`, que é do tipo `string` e é `required` (obrigatória).

        *   **Instalando o `@nestjs/swagger`**:
            *   Para poder utilizar o `ApiProperty`, iremos instalar o `@nestjs/swagger`:
            ```bash
            npm install --save @nestjs/swagger swagger-ui-express
            ```
            * Importe e configure o swagger no `src/main.ts`:
            ```ts
            import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
            import { NestFactory } from '@nestjs/core';
            import { AppModule } from './app.module';

            async function bootstrap() {
              const app = await NestFactory.create(AppModule);

              // Configure Swagger
              const config = new DocumentBuilder()
                .setTitle('Gemini Backend')
                .setDescription('Gemini Example')
                .setVersion('1.0')
                .build();
              const document = SwaggerModule.createDocument(app, config);
              SwaggerModule.setup('api', app, document); // O endpoint para acessar o Swagger será: http://localhost:3000/api
              await app.listen(3000);
            }
            bootstrap();
            ```
            * Adicione `import { GenerateTextDto } from './dto/generate-text.dto';` em `src/prompt/prompt.controller.ts` e utilize-o como parâmetro para uma das requisições dentro do controller.

9.  **Criando a Interface `GenAiResponse`:**
    * Agora vamos criar uma interface para definir a estrutura da resposta que será enviada para o frontend após receber o texto gerado pelo Gemini.
    *   **Criando a Pasta:**
        * Dentro da pasta `src/prompt`, crie uma nova pasta chamada `interfaces`.
    * **Criando o Arquivo:**
        * Dentro da pasta `src/prompt/interfaces`, crie um novo arquivo chamado `gen-ai-response.interface.ts`.
    *   **Adicionando o código da Interface:**
        *   Dentro do arquivo `gen-ai-response.interface.ts`, adicione o seguinte código:
        ```typescript
            export interface GenAiResponse {
                text: string;
            }
        ```
    * Esta interface terá uma propriedade chamada `text`, que é do tipo `string`.

10. **Implementando o Serviço `PromptService`:**
    * Agora vamos implementar o serviço `PromptService`, que será responsável por interagir com o Gemini utilizando o SDK instalado.
    * **Abrindo o arquivo:**
        * Abra o arquivo `src/prompt/prompt.service.ts` no seu editor de código.
    * **Importando as Dependências:**
        * Adicione as seguintes importações no topo do arquivo:
        ```typescript
        import { Injectable } from '@nestjs/common';
        import { ConfigService } from '@nestjs/config';
        import { GoogleGenerativeAI } from '@google/generative-ai';
        import { GenAiResponse } from './interfaces/gen-ai-response.interface';
        ```
    * **Implementando a lógica do Serviço:**
        * Adicione o seguinte código dentro da classe `PromptService`:
        ```typescript
        @Injectable()
        export class PromptService {
            private readonly apiKey: string;
            private genAI: GoogleGenerativeAI;

            constructor(private readonly configService: ConfigService) {
                this.apiKey = this.configService.get<string>('GEMINI_API_KEY') || '';
                this.genAI = new GoogleGenerativeAI(this.apiKey);
            }
            async generateText(prompt: string): Promise<GenAiResponse> {
                const model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
                const result = await model.generateContent(prompt);
                const response = result.response; 
                const text = response.text();
                return { text };
            }
        }
        ```
        * Este código faz o seguinte:
            * Importa o `Injectable` para definir a classe como um Service.
            * Importa o `ConfigService` para poder pegar a `apiKey`.
            * Importa o `GoogleGenerativeAI` para poder utilizar o sdk.
            * Importa a interface `GenAiResponse` para o retorno do metodo.
            * Cria uma instancia do `GoogleGenerativeAI` no constructor.
            * Cria um metodo `generateText` que ira receber o prompt, chamar o gemini e retornar a mensagem.

11. **Implementando o Controller `PromptController`:**
    * Agora vamos implementar o controller `PromptController`, que será responsável por receber as requisições do frontend, utilizar o `PromptService` e retornar a resposta.
    * **Abrindo o arquivo:**
        * Abra o arquivo `src/prompt/prompt.controller.ts` no seu editor de código.
    * **Importando as Dependências:**
        * Adicione as seguintes importações no topo do arquivo:
        ```typescript
        import { Controller, Post, Body } from '@nestjs/common';
        import { PromptService } from './prompt.service';
        import { GenAiResponse } from './interfaces/gen-ai-response.interface';
        import { ApiTags, ApiOperation } from '@nestjs/swagger';
        import { GenerateTextDto } from './dto/generate-text.dto';
        ```
    * **Implementando a lógica do Controller:**
        * Adicione o seguinte código dentro da classe `PromptController`:
        ```typescript
        @ApiTags('prompt')
        @Controller('prompt')
        export class PromptController {
            constructor(private readonly promptService: PromptService) {}

            @Post()
            @ApiOperation({ summary: 'Generate text with Gemini' })
            async generateText(
                @Body() generateTextDto: GenerateTextDto,
            ): Promise<GenAiResponse> {
                return this.promptService.generateText(generateTextDto.prompt);
            }
        }
        ```
        * Este código faz o seguinte:
            * Importa o `Controller`, `Post` e `Body` do `@nestjs/common` para definir a classe como um Controller.
            * Importa o `GenerateTextDto` para receber o parametro da requisicao.
            * Importa o `PromptService` para utilizar o metodo.
            * Importa o `GenAiResponse` para definir o retorno do metodo.
            * Importa o `ApiTags` and `ApiOperation` from `@nestjs/swagger` to group the routes and define a description in the swagger.
            * Define o path do controller como `prompt`
            * Cria um metodo chamado `generateText` que ira receber o `GenerateTextDto`, enviar o `prompt` para o service e retornar a resposta.

12. **Limpando os Arquivos Padrão do NestJS:**
    * Agora que criamos a estrutura necessária para nossa aplicação, vamos remover os arquivos padrão de exemplo do NestJS que não serão utilizados.
    * **Removendo `app.controller.ts` e `app.controller.spec.ts`:**
        * Abra o arquivo `src/app.controller.ts` no seu editor de código.
        * Remova todo o conteúdo do arquivo e salve-o. Você pode deixa-lo vazio ou remover o arquivo.
        * Abra o arquivo `src/app.controller.spec.ts` no seu editor de código.
        * Remova todo o conteúdo do arquivo e salve-o. Você pode deixa-lo vazio ou remover o arquivo.
    * **Removendo `app.service.ts` e `app.service.spec.ts`:**
        * Abra o arquivo `src/app.service.ts` no seu editor de código.
        * Remova todo o conteúdo do arquivo e salve-o. Você pode deixa-lo vazio ou remover o arquivo.
    * **Corrigindo `app.module.ts`:**
        * Abra o arquivo `src/app.module.ts` no seu editor de código.
        * Remova a importacao do controllers e providers dos arquivos excluidos.

13. **Executando a Aplicação e Testando a API com Curl:**
    *   Agora que o backend está configurado, vamos executá-lo e testar a API usando o `curl`.
    *   **Iniciando a Aplicação:**
        *   Abra um terminal dentro da pasta `backend`.
        *   Execute o seguinte comando: `npm run start:dev`
        *   Isso iniciará o servidor NestJS em modo de desenvolvimento, geralmente na porta 3000 (http://localhost:3000).
        * Você pode abrir o swagger em `http://localhost:3000/api`

    *   **Testando a API com Curl:**
        *   Abra **outro** terminal (deixe o primeiro rodando o servidor).
        *   Execute o seguinte comando `curl` para enviar uma requisição POST para o endpoint `/prompt` e testar a integração com o Gemini:

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{"prompt": "Escreva uma frase sobre tecnologia."}' http://localhost:3000/prompt
        ```
        *   **Explicação do Comando:**
            *   `curl`: O comando para fazer requisições HTTP na linha de comando.
            *   `-X POST`: Especifica que é uma requisição POST.
            *   `-H "Content-Type: application/json"`: Define o cabeçalho para indicar que estamos enviando dados JSON.
            *   `-d '{"prompt": "Escreva uma frase sobre tecnologia."}'`: Envia os dados da requisição no formato JSON. Substitua `"Escreva uma frase sobre tecnologia."` pela pergunta que você deseja.
            *   `http://localhost:3000/prompt`: O URL do endpoint que estamos acessando.

        *   **Resposta Esperada:**
            *   Se tudo estiver configurado corretamente, você deverá receber uma resposta JSON semelhante a:

            ```json
            {"text": "A tecnologia está revolucionando a forma como vivemos, trabalhamos e nos comunicamos."}
            ```

            *   O texto real na resposta será gerado pelo Gemini com base no seu prompt.
        * Se ocorrer um erro, verifique no terminal que está rodando a aplicação se houve alguma mensagem de erro. Também certifique-se de que a api key no arquivo `.env` está correta.

## Iniciando o Projeto Frontend (Angular)

Agora que o backend está configurado e funcionando, vamos iniciar a criação do nosso projeto frontend com Angular.

1.  **Criando o Projeto Angular:**
    *   Abra um novo terminal (mantenha o terminal do backend rodando).
    *   Navegue até a pasta raiz do seu projeto principal, onde está a pasta `backend`. Você deve ficar na mesma raiz em que foi criado o projeto backend.
    *   Execute o seguinte comando:
        ```bash
        ng new frontend --skip-git --routing --style=scss
        ```
        *   **Explicação do comando:**
            *   `ng new frontend`: Este comando cria um novo projeto Angular chamado "frontend". Você pode substituir "frontend" pelo nome que desejar.
            *   `--skip-git`: Esta flag impede que o Angular CLI inicialize um novo repositório Git dentro da pasta do projeto frontend. Isso é importante porque estamos utilizando o mesmo repositório Git para o projeto completo (backend e frontend).
            * `--routing`: Esta flag adiciona o modulo de roteamento no projeto.
            * `--style=scss`: Essa flag define o uso de scss para os estilos do projeto.
        * **Importante:**  O projeto do frontend deve ser criado na raiz do projeto principal. Assim como o projeto do backend, em um nivel de hierarquia igual, para utilizar o mesmo controle de versao.
    *   Responda `Y` para usar o routting e selecione `SCSS` para o formato de estilo.

2. **Acessando a pasta do projeto:**
    * Use o seguinte comando para entrar dentro da pasta do projeto front end:
      ```bash
        cd frontend
      ```
3. **Executando o Projeto:**
    *   Para iniciar o projeto frontend, execute o seguinte comando:
        ```bash
        npm start
        ```
    * Isso ira iniciar a aplicacao na porta 4200 (http://localhost:4200).

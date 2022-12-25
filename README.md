## :camera: Demonstração
<h1 align="center"> <img alt="resultado" src="https://github.com/Samuel-Rodrigues/weather-builders/blob/master/buildersGif.gif"/>
</h1>

## :rocket: Sobre o desafio

1. Informar os dados climáticos de acordo com a localização do usuário
2. Mostrar informaçõs de endereço do usuário a partir de sua localização
2. É permitido atualizar os dados ao clicar no botão de `atualizar informações`

## :clipboard: Iniciando a aplicação React.Js

1. Clone o repositório com `https://github.com/Samuel-Rodrigues/weather-builders.git`
2. Abra um terminal e entre na pasta `cd weather-builders`
3. Instale todas as dependencias com o comando `yarn install` ou `npm install`
4. Digite `yarn start` ou `npm start`  para iniciar o projeto
5. Uma nova aba do navegador abrirá url http://localhost:3000
6. É preciso permitir que a aplicação tenha acesso a sua localização

## :clipboard: Algumas informações de arquitetura de arquivos
`./src` -- Arquivos `.tsx` de configuração de libs

`./src/assets` -- Arquivos que não são códigos subdivididos de acordo com sua funcionalidade

`./src/components` -- Arquivos `.tsx` de componentes React reutilizáveis em mais de um componente maior.

`./src/pages` -- Arquivos `tsx` que descrevem componentes React que representam uma página acessável

`./src/contexts` -- Arquivos `.tsx` arquivo responsável por armazenar informação global que pode ser compartilhada em algum outro componente

## :hammer: Ferramentas utilizadas

- 📄 **Type script** - Projeto criado com template typescript 
- ⚛️ **Styled Components** - Biblioteca Javascript pra estilizar componentes
- 📄 **Axios** - Biblioteca Javascript para fazer requisições http
- 📄 **leaflet react-leaflet** Lib para renderizar um mapa e mostrar o marcador com a localização atual do usuário
- 📄 **geolocation** Bibioteca nativa Js para pegar as coordenadas a partir do browser
- 📄 **react-geocode** Bibioteca utilizada para obter endereço a partir de coordenadas
- 📄 **date-fns** Lib utilizada para converter e formatar dadas

</h1>


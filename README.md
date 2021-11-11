## :fire: O projeto

Agenda Bot.

### :rocket: Tecnologias Usadas

O projeto foi feito com as seguintes tecnologias:

- [ReactJS](https://pt-br.reactjs.org/)
- [Yup](https://github.com/jquense/yup)
- [Ant Design](https://ant.design/components/overview/)
- [Styled-Components](https://styled-components.com/)

## :thinking: Como Contribuir?

```bash
# Clone o repositório
$ git clone https://github.com/DEV-TITAN/agenda-bot-front.git

# Crie uma branch a partir de develop com sua feature ou correção de bugs
$ git checkout develop
$ git checkout -b minha-branch

# Faça o commit das suas alterações (use commits semânticos)
$ git add *
$ git commit -m 'feat: minhas alterações'

# Faça o push para a sua branch
$ git push origin minha-branch

# Mude para develop e coloque sua branch lá
$ git checkout develop
$ git merge minha-branch
```

## :zap: Executando o Projeto

#### Clonando o projeto

```sh
$ git clone https://github.com/DEV-TITAN/agenda-bot-front.git
```

#### Instalando os módulos

```sh
$ yarn
```

#### Rode o eslint e prettier para checar e corrigir os erros de código, e corriga manualmente, se precisar. OBS: Se o código estiver com erros, não irá conseguir dá deploy. Rode antes de dá yarn start e antes de commitar.

```sh
$ yarn prettier:check
$ yarn prettier:fix
$ yarn eslint:check
$ yarn eslint:fix --fix
```

#### Iniciando o Frontend

```sh
$ yarn start
```

## :exclamation: Commits semânticos

#### Pequenas alterações que não são novas funcionalidades.

```sh
chore: add Oyster build script
```

#### Semelhante a uma wiki; documentações etc.

```sh
docs: explain hat wobble
```

#### Criação de Nova funcionalidade.

```sh
feat: add beta sequence
```

#### Correção de bugs.

```sh
fix: remove error message
```

#### Refatoração de um código.

```sh
refactor: share logic 4d3d3d3
```

#### Alteração em estilos, formatação de código etc.

```sh
style: convert tabs to spaces
```

#### Criação de testes da sua aplicação.

```sh
test: ensure that increment
```

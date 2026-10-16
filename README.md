# Raiar Estúdio

Site institucional da Raiar Estúdio, de Redenção–PA, desenvolvido em HTML, CSS e JavaScript, sem dependências de instalação.

## Executar localmente

Abra `index.html` no navegador ou execute na pasta do projeto:

```sh
python -m http.server 3000
```

Acesse http://localhost:3000.

## Estrutura

- `index.html`: estrutura principal e navegação.
- `styles.css`: identidade visual e layout responsivo.
- `app.js`: páginas, filtros, modais e formulário de orçamento.
- `content.js`: conteúdo público e configurações.
- `assets/`: identidade visual e imagens utilizadas.
- `ENTREGA.md`: instruções completas, limitações, testes e pendências de publicação.

## Publicação

Publique os arquivos estáticos juntos, preservando a estrutura de pastas. As rotas usam hash e não exigem configuração de redirecionamento. O site pode ser hospedado no GitHub Pages; enviar o código ao GitHub não ativa a hospedagem automaticamente.

O número oficial de WhatsApp ainda precisa ser confirmado em `content.js`. O site não tem backend, banco de dados ou painel administrativo. O feed do Instagram é uma incorporação externa carregada após clique, com link alternativo para o perfil.

### Vercel

O projeto está configurado em `vercel.json` para hospedagem estática, sem instalação de pacotes e sem compilação.

1. Envie as alterações deste projeto ao repositório `didefor/raiar-estudio` no GitHub.
2. Na Vercel, acesse **Add New → Project**, conecte o GitHub e importe esse repositório.
3. Use **Framework Preset: Other**, **Root Directory: .** e **Output Directory: .**. Não configure comandos de instalação ou build; o arquivo `vercel.json` já os deixa vazios.
4. Não são necessárias variáveis de ambiente nesta versão. Clique em **Deploy**.
5. Após o deploy, teste `/`, `/#/sobre`, `/#/portfolio`, `/#/conteudos` e `/#/contato`, imagens, formulário e o carregamento do Instagram.

As rotas usam `#` e não precisam de regras de rewrite. A Vercel oferece HTTPS; o número de WhatsApp e o backend continuam pendentes conforme `ENTREGA.md`.

Para publicar pelo terminal como alternativa à integração GitHub, instale/use a CLI oficial e execute `npx vercel` para uma prévia ou `npx vercel --prod` para produção. Será necessário entrar na sua conta e selecionar o projeto. Não há associação a uma conta Vercel salva neste repositório.

`.vercelignore` permite somente os arquivos públicos do site e as imagens de `assets/fotos/otimizadas/`; originais, documentos e arquivos antigos não são enviados pelo deploy local. Se adicionar novos arquivos públicos fora dessas pastas, atualize essa lista. A pasta local `.vercel/`, gerada pela CLI, não deve ser versionada. Não coloque credenciais nos arquivos públicos.

## Imagens e privacidade

Somente as cópias utilizadas em `assets/fotos/otimizadas/` são versionadas. Os arquivos originais e as fotos não publicadas ficam fora do Git, assim como os arquivos anteriores `novo-usuario-saas.*`. Confirme os direitos e as autorizações de imagem antes de publicar o repositório ou o site para terceiros. Nunca coloque credenciais em `content.js`.

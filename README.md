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

## Imagens e privacidade

Somente as cópias utilizadas em `assets/fotos/otimizadas/` são versionadas. Os arquivos originais e as fotos não publicadas ficam fora do Git, assim como os arquivos anteriores `novo-usuario-saas.*`. Confirme os direitos e as autorizações de imagem antes de publicar o repositório ou o site para terceiros. Nunca coloque credenciais em `content.js`.

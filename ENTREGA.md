# Raiar Estúdio — entrega e publicação

## Deploy na Vercel

Configuração estática em `vercel.json`, com framework desativado, instalação/build vazios e saída na raiz. Não é necessário backend, dependências ou rewrite para as rotas hash. Cabeçalhos de segurança básicos são enviados sem bloquear o iframe externo do Instagram. `.vercelignore` restringe o deploy aos arquivos públicos e às imagens otimizadas; originais e documentos internos ficam de fora. `.vercel/` é ignorado pelo Git. Importar `didefor/raiar-estudio` na Vercel conforme o README. A configuração não cria conta, não vincula domínio nem executa um deploy automaticamente; essas etapas exigem acesso à conta Vercel.

## Atualização da página Acontece

As três capas editoriais de Acontece e suas páginas internas agora usam as fotos locais enviadas: edição no celular, celebração de 15 anos e detalhes do casamento. As escolhas são compartilhadas com a home em `homeMedia.articleCovers`, inclusive após filtrar publicações. Textos alternativos descrevem as fotos e as referências a imagens de banco foram removidas dessas páginas. Capas da listagem e dos artigos preservam a imagem completa. Nenhuma atividade, data ou publicação de Instagram foi inventada; o conteúdo textual continua editorial. Feed e fallback do Instagram permanecem inalterados.

## Atualização do portfólio

A galeria pública agora usa sete imagens locais enviadas: conteúdo comercial, produção mobile, 15 anos, formatura, cerimônia, detalhes de casamento e bastidores. O aviso provisório e os cartões de banco foram retirados desta página. Os filtros usam `category` e `tags` em `portfolioMedia` (`content.js`); somente registros com `status: 'published'` aparecem. As imagens preservam o enquadramento e abrem inteiras em modal, com descrição visual e contato para o serviço relacionado. Não foram inventados clientes, depoimentos, objetivos de contratação ou resultados. A categoria Sites fica vazia até haver material correspondente — fotos de casamento não são apresentadas como sites entregues. Os antigos dados `references` não são exibidos no portfólio. A imagem infantil e a captura com mensagens de terceiros continuam fora da publicação. Confirmar e registrar autorizações antes do lançamento externo.

## Atualização de fotos da home

A página “A Raiar” também recebeu a foto enviada de bastidores em auditório em Redenção–PA. Original preservado: `assets/fotos/706464472_18050792627756755_7083982742352331983_n.jpg`. Cópia otimizada: `assets/fotos/otimizadas/bastidores-raiar.jpg` (aproximadamente 270 KB). Exibida em proporção vertical integral, sem filtro ou recorte; substitui a imagem de equipe do banco e sua legenda provisória. Não se atribuíram nome ou biografia à pessoa fotografada.

As imagens recebidas em `assets/fotos/` foram preservadas. Seis cópias JPEG otimizadas, sem ampliação e com lado máximo de 1280 px, estão em `assets/fotos/otimizadas/` (aproximadamente 606 KB no total). A home usa somente fotos locais: edição no celular na capa, quatro imagens na galeria, acessórios no bloco de casamento e capas editoriais nas novidades. `homeMedia` em `content.js` centraliza essas escolhas, textos alternativos e links de serviço. A galeria abre a imagem inteira em modal; não foram inventados nomes de clientes, resultados ou contextos de contratação.

O aniversário infantil e a captura com mensagens de terceiros não foram publicados. Confirmar autorizações de imagem antes de lançamento externo, inclusive de adolescentes retratadas. O envio dos arquivos para composição não constitui registro formal de consentimento. Os modelos de convite continuam demonstrativos: a foto usada como fundo não é apresentada como cliente de site de casamento. As demais páginas continuam com as referências anteriores; esta troca é restrita à home. A seleção visual não cadastra automaticamente estudos de caso no portfólio.

## Executar

Site estático em HTML, CSS e JavaScript, sem instalação de dependências. Abra `index.html` ou sirva esta pasta com um servidor estático (por exemplo, `python -m http.server 3000`). Publique `index.html`, `styles.css`, `content.js`, `app.js` e a pasta `assets/` juntos. Os arquivos `novo-usuario-saas.*` já existiam e não foram alterados; não fazem parte deste site.

Navegação completa com rotas hash: início, sobre, serviços, portfólio, casamentos, conteúdos, artigos, contato, privacidade e informações de gestão. Rotas hash dispensam configuração de redirecionamento no servidor. Títulos, descrições e metadados são atualizados no navegador. **Para SEO e compartilhamento individual por página em robôs que não executam JavaScript, é necessário gerar páginas HTML por rota ou adotar renderização no servidor.** O SVG social deve ser convertido em PNG/JPEG com URL absoluta no domínio definitivo para maior compatibilidade com redes sociais.

## Escopo real e limitações

- Não há backend, banco, autenticação, painel de administração, envio de e-mail nem armazenamento de pedidos. A página de gestão informa isso explicitamente. Não é um painel fictício.
- A atualização é manual, no código, por quem tem acesso ao projeto. Não há salvamento/revisão via interface. Um CMS autenticado é etapa adicional antes de prometer essa facilidade ao cliente.
- Nenhum número de WhatsApp foi inventado. Sem número, o formulário prepara um texto copiável e oferece o Instagram oficial. **Não é envio de orçamento.** O visitante é informado.
- Ao configurar um número válido, formulário e botão flutuante abrem `wa.me`. Não existe confirmação falsa de envio.
- Feed oficial do perfil incorporado nas páginas Início e Acontece, carregado apenas após clique explícito. A exibição depende de o Instagram e o perfil permitirem incorporação pública; pode exigir login ou ser bloqueada. Link alternativo permanece sempre disponível. Sem API, raspagem, tokens ou sincronização fictícia. `settings.instagramMode: 'manual'` registra o modo de atualização dos cards editoriais, separado da incorporação externa. Cards cadastrados manualmente também aparecem no início.
- Sem plataforma para noivos. Modelos são prévias visuais, não convites funcionais.
- As imagens externas são referências ilustrativas Unsplash; não se atribuem à agência. Não há materiais de clientes copiados, depoimentos, equipe ou números inventados.

## Pendências antes de lançamento definitivo

1. Símbolo aplicado a cabeçalho, rodapé e favicon a partir da referência enviada pelo usuário (sol terracota, círculo dourado e arco azul). `assets/raiar-simbolo.svg` é uma reconstrução geométrica da imagem anexada, não o vetor original. Validar proporções/cores com o arquivo oficial quando disponível. O nome “raiar” ao lado permanece uma composição tipográfica do site, não lettering oficial fornecido. A troca das fotos da home aguarda escolha das novas imagens ou confirmação de uso da arte como capa.
2. Confirmar número oficial de WhatsApp em formato internacional, apenas dígitos (Brasil: `55` + DDD + número). Preencher `settings.whatsapp` em `content.js`.
3. Receber fotos reais autorizadas da equipe, bastidores e trabalhos; substituir os bancos de imagem, confirmar direitos e textos alternativos.
4. Cadastrar equipe com nomes, funções, biografias e consentimentos. Não há registros fictícios.
5. Validar escopo dos serviços e os artigos editoriais de apresentação antes de publicar. São textos novos para este site, não publicações recuperadas do Instagram. Não se criaram datas passadas ou atividades fictícias.
6. Receber projetos, créditos, clientes autorizados, objetivos, entregas e provas de eventuais resultados.
7. Confirmar cada ferramenta de casamento, condições de hospedagem/manutenção e modelos. Tudo começa não confirmado/oculto. Não confundir a existência de uma flag com a implementação de uma ferramenta.
8. Confirmar tema, formato e disponibilidade de mentoria antes de implementar sua apresentação pública. Registro inicial oculto em `mentorship`; não há serviço anunciado.
9. Confirmar responsável pelo tratamento de dados e canal de privacidade, revisar a política com a operação definitiva.
10. Configurar domínio, HTTPS, URLs absolutas de compartilhamento, imagem social rasterizada e hospedar as imagens/fontes localmente caso se deseje reduzir dependências externas.
11. Integrar CMS/backend se administração por usuário não técnico for requisito de lançamento. Não publicar credenciais no frontend.

## Edição de conteúdo

`content.js` contém dados públicos: contatos, serviços, projetos, artigos, referências, modelos, ferramentas de casamento, equipe, depoimentos e publicações Instagram. Não inserir senhas, chaves privadas ou tokens.

- Serviços: `status: 'published'` e `visible: true` para aparecer. Use `status: 'draft'` ou `visible: false` para manter oculto. Campos: `id`, `group` (0, 1, 2), `name`, `description`, `audience`, `examples`.
- Artigos: `id`, `title`, `category`, `summary`, `image`, `imageAlt`, `body` (lista de parágrafos), `status`. O site só mostra `published`. Campos opcionais suportados: `publishedAt` (AAAA-MM-DD), `videoUrl` (link sob demanda), `images` (lista de objetos `url`, `alt`, `caption`) e `originalUrl`. A versão inicial não atribui datas fictícias.
- Projetos: `id`, `title`, `category`, `services` (IDs), `service` (descrição), `objective`, `description`, `images` (URLs), `videoUrl`, `url`, `client`, `clientAuthorized`, `testimonial`, `testimonialAuthorized`, `verifiedResults`, `authorized`, `status`. Só `published` + `authorized: true` aparecem. Resultados devem estar acompanhados de documentação interna de comprovação no CMS. URLs devem ser HTTPS. Os filtros aceitam as categorias exibidas na interface.
- Modelos: `id`, `name`, `tone`, `style`, `status`, `demo`. Os modelos deste projeto são sempre rotulados como demonstração.
- Ferramentas de casamento: `name`, `confirmed`, `visible`. Ambas as flags devem ser verdadeiras para anunciar. São apenas descrições comerciais; a plataforma para noivos não está implementada.
- Instagram: `id`, `title`, `summary`, `image`, `url`, `status`. A lista começa vazia. Preencher manualmente com materiais autorizados. Não simular integração.
- Equipe (`team`): `name`, `role`, `bio`, `image`, `authorized`, `status`. Depoimentos (`testimonials`): `name`, `role`, `text`, `authorized`, `status`. Renderizados em Sobre e Início, respectivamente, somente com `status: 'published'` e `authorized: true`. Começam vazios; jamais inserir identidades ou falas inventadas.
- Textos estruturais e imagens das seções são editáveis em `app.js`; apresentação em `styles.css`.

### Fluxo editorial nesta entrega

1. Copiar arquivo para uma revisão ou usar controle de versão.
2. Cadastrar registro como `draft` e verificar consentimentos.
3. Revisar em ambiente de homologação, incluindo celular.
4. Alterar para `published` (e demais flags exigidas), fazer nova publicação e verificar.

Não existe aprovação persistida em servidor nesta versão. Para um CMS futuro, criar coleções de configurações, serviços, profissionais, projetos, mídia, artigos, Instagram, modelos, ferramentas, depoimentos e, somente se necessário, orçamentos. Aplicar autenticação no servidor, RBAC, validação e sanitização, rascunho/revisão/publicação, histórico, uploads seguros e política de retenção. API oficial do Instagram apenas com consentimento e tokens no servidor, mantendo fallback manual.

## Privacidade e segurança

Sem analytics próprios, publicidade própria, cookies próprios ou localStorage. O formulário trabalha na memória; não envia dados a um servidor da agência. O texto pode seguir para WhatsApp/Instagram por ação explícita do visitante. Fontes e imagens externas recebem requisições técnicas, descritas na política. O feed externo só é carregado após clique, quando a Meta pode receber dados técnicos e usar cookies conforme suas políticas. A autorização não é persistida. Links externos usam `noopener noreferrer`. Texto dinâmico é escapado e URLs de conteúdo são restritas a HTTP(S) ou arquivos relativos. Ativar HTTPS e políticas de cabeçalhos na hospedagem; rever a política ao adicionar qualquer coleta ou backend.

## Verificação de publicação

### Verificações executadas nesta entrega

- Navegação pelas nove rotas principais/informativas e um artigo; título próprio e um H1 por página.
- Sete páginas principais verificadas em viewports de 320, 390 e 768 px, sem overflow horizontal; menu compacto abre e fecha na navegação. Desktop também verificado.
- Filtros de portfólio e conteúdo, estado sem resultados, abertura/fechamento de modal e prévias de computador/celular verificados.
- Formulário vazio inválido, telefone válido e rejeição de letras; data e tipo de site condicionais verificados. Geração do pedido sem WhatsApp confirmada, sem alegação de envio.
- Caminho `wa.me` testado com `window.open` interceptado e número apenas de teste em memória (não salvo): texto, acentos, data e link alternativo conferidos; nenhuma conversa enviada. O número real segue pendente para teste final em aparelho.
- Links do Instagram conferidos para o perfil oficial; sem integração ou requisição de dados ao Instagram.
- Auditoria Lighthouse da página inicial em ambiente local: 100 em acessibilidade, boas práticas e SEO. Isso não é medição de desempenho nem garantia de indexação das rotas hash. Ajustes adicionais de nomes acessíveis foram aplicados depois da auditoria.
- Correção aplicada à expressão de validação do telefone para compatibilidade com o modo `v` dos navegadores atuais e retestada.

### Checklist a repetir com os materiais e contatos definitivos

- Navegar por todas as rotas, filtros, artigos, modelos e modais; fechar por botão/Escape, testar teclado.
- Testar menu compacto, ausência de rolagem horizontal, legibilidade e botões em 390 px, tablet e desktop.
- Verificar campos condicionais: evento/casamento exigem data; sites/casamentos exibem tipo de projeto; cidade é obrigatória.
- Tentar campos vazios e telefone/e-mail inválidos; testar preparação, cópia e links externos.
- Após configurar WhatsApp, testar número real no celular e desktop e conferir texto e codificação; não interpretar abertura da conversa como envio.
- Confirmar que rascunhos, mentoria e funcionalidades não confirmadas não aparecem no público.
- Verificar Instagram manual, imagem alternativa e dependências externas. Uma falha do Instagram não impede o uso do site.
- Sem vídeos em autoplay; imagens abaixo da dobra usam lazy loading. Imagens externas usam tamanhos e qualidade via CDN, mas devem ser substituídas por mídia própria otimizada antes da entrega definitiva.
- Movimento reduzido respeitado; rótulos, foco visível, links de salto e modal nativo disponíveis.

(() => {
  'use strict';
  const data = window.RAIAR;
  const main = document.querySelector('main');
  const dialog = document.querySelector('#detail-dialog');
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeUrl = value => /^(https?:\/\/|\.\/)/.test(value || '') ? esc(value) : '';
  const arrow = '<span aria-hidden="true">↗</span>';
  const sun = '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="32" cy="32" r="12"/><path d="M32 3v11m0 36v11M3 32h11m36 0h11M11.5 11.5l8 8m25 25 8 8m-41 0 8-8m25-25 8-8M20.8 5l4.2 10m14 34 4.2 10M5 20.8 15 25m34 14 10 4.2M5 43.2 15 39m34-14 10-4.2M20.8 59 25 49m14-34 4.2-10"/></svg>';
  const icons = [
    '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="m5 13 18-7v20L5 19Z"/><path d="m9 21 3 7h4l-3-6M27 11l3-2m-3 8h4M3 13v6"/></svg>',
    '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><rect x="3" y="9" width="26" height="18" rx="3"/><circle cx="16" cy="18" r="6"/><path d="m9 9 2-4h9l2 4M24 13h2"/></svg>',
    '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><rect x="3" y="5" width="26" height="22" rx="2"/><path d="M3 11h26M7 8h1m2 0h1m2 0h1m-2 9-4 3 4 3m8-6 4 3-4 3m-2-9-4 12"/></svg>'
  ];
  const groupNames = ['Marketing e conteúdo para empresas', 'Produção audiovisual e eventos', 'Sites e experiências digitais'];
  const services = () => data.services.filter(s => s.visible && s.status === 'published');
  const whatsappNumber = () => /^\d{12,15}$/.test(data.settings.whatsapp) ? data.settings.whatsapp : '';
  function cta() {
    return `<section class="cta-section"><span class="cta-sun" aria-hidden="true">✳</span><div class="container cta-inner"><div><div class="eyebrow">O próximo capítulo pode ser nosso</div><h2>Vamos fazer a sua<br>próxima ideia <span style="font-family:'Playfair Display';font-style:italic">raiar?</span></h2><p>Conte o que você imagina. A gente encontra um caminho juntos.</p></div><a class="button button-dark" href="#/contato">Vamos conversar ${arrow}</a></div></section>`;
  }
  function pageHero(eyebrow, title, text) {
    return `<section class="page-hero"><div class="container"><div class="eyebrow">${eyebrow}</div><h1>${title}</h1>${text ? `<p>${text}</p>` : ''}</div></section>`;
  }
  function referenceCard(r) {
    return `<button class="reference-card" data-reference="${esc(r.id)}"><div class="image-wrap"><img src="${safeUrl(r.image)}" alt="${esc(r.alt)}" loading="lazy" width="700" height="500"><span class="reference-label">REFERÊNCIA VISUAL · NÃO É PROJETO DE CLIENTE</span></div><div class="card-meta"><div><small>${esc(r.label)}</small><h3>${esc(r.title)}</h3></div><span class="card-arrow" aria-hidden="true">↗</span></div></button>`;
  }
  function articleCard(a) {
    a = { ...a, ...data.homeMedia.articleCovers[a.id] };
    return `<a class="journal-card" href="#/conteudos/${esc(a.id)}"><img src="${safeUrl(a.image)}" alt="${esc(a.imageAlt || a.title + ' — imagem ilustrativa')}" loading="lazy" width="600" height="410"><span class="article-category">${esc(a.category)}</span>${articleDate(a)}<h3>${esc(a.title)}</h3><p>${esc(a.summary)}</p><span class="read-link">Ler conteúdo ${arrow}</span></a>`;
  }
  function articleDate(a) {
    if (!a.publishedAt || !/^\d{4}-\d{2}-\d{2}$/.test(a.publishedAt)) return '';
    const date = new Date(a.publishedAt + 'T12:00:00');
    return Number.isNaN(date.getTime()) ? '' : `<time class="article-date" datetime="${esc(a.publishedAt)}">${date.toLocaleDateString('pt-BR')}</time>`;
  }
  function teamSection() {
    const members = data.team.filter(p => p.status === 'published' && p.authorized);
    if (!members.length) return '';
    return `<div class="team-grid">${members.map(p => `<article>${p.image ? `<img src="${safeUrl(p.image)}" alt="${esc(p.name)}" loading="lazy" width="400" height="450">` : ''}<h3>${esc(p.name)}</h3><small>${esc(p.role)}</small><p>${esc(p.bio)}</p></article>`).join('')}</div>`;
  }
  function testimonialsSection() {
    const quotes = data.testimonials.filter(t => t.status === 'published' && t.authorized);
    if (!quotes.length) return '';
    return `<section class="container section"><div class="eyebrow">Conexões que ficam</div><h2>Nas palavras de quem<br>criou com a <span class="serif">Raiar.</span></h2><div class="testimonials-grid">${quotes.map(t => `<figure><blockquote>“${esc(t.text)}”</blockquote><figcaption>${esc(t.name)}${t.role ? ` · ${esc(t.role)}` : ''}</figcaption></figure>`).join('')}</div></section>`;
  }
  function instagram() {
    const posts = data.instagramPosts.filter(p => p.status === 'published');
    return `<section class="instagram-feed" aria-label="Instagram da Raiar"><div class="instagram-strip"><div class="instagram-intro"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.4" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.7" r=".8" fill="currentColor"/></svg><div><h3>Acompanhe a Raiar no Instagram</h3><p>Nosso dia a dia, novos olhares e histórias em movimento.</p></div></div><a class="text-link" href="${safeUrl(data.settings.instagram)}" target="_blank" rel="noopener noreferrer">@raiarestudio ${arrow}</a></div>${posts.length ? `<div class="journal-grid instagram-posts">${posts.map(p => `<a class="journal-card" href="${safeUrl(p.url)}" target="_blank" rel="noopener noreferrer"><img src="${safeUrl(p.image)}" alt="${esc(p.title)}" loading="lazy" width="500" height="500"><h3>${esc(p.title)}</h3><p>${esc(p.summary)}</p><span class="read-link">Ver no Instagram ${arrow}</span></a>`).join('')}</div>` : ''}<div class="instagram-feed-layout"><div class="instagram-feed-copy"><div class="eyebrow">Entre uma ideia e outra</div><h2>Tem mais Raiar<br>do lado de <span class="serif">lá.</span></h2><p>Conteúdos, encontros e novos projetos. Acompanhe as publicações direto do nosso perfil oficial.</p><a class="text-link" href="${safeUrl(data.settings.instagram)}" target="_blank" rel="noopener noreferrer">Seguir @raiarestudio ${arrow}</a><p class="instagram-privacy">O feed é uma incorporação oficial do Instagram, carregada somente ao clicar. A Meta poderá receber dados de navegação e usar cookies conforme suas políticas. <a href="#/privacidade">Saiba mais</a>.</p></div><div class="instagram-embed-area"><div class="instagram-embed-placeholder"><span class="instagram-feed-sun" aria-hidden="true">✳</span><span class="instagram-profile-name">@raiarestudio</span><p>Um novo olhar.<br>Uma história a cada publicação.</p><button class="button button-dark" type="button" data-load-instagram>Carregar feed do Instagram ${arrow}</button><small>Conteúdo externo · Instagram</small></div></div></div><p class="instagram-fallback">O feed não apareceu? O Instagram pode limitar a exibição por privacidade, login ou configuração do perfil. <a href="${safeUrl(data.settings.instagram)}" target="_blank" rel="noopener noreferrer">Veja as publicações no perfil oficial ↗</a></p></section>`;
  }
  function invitation(style = '') {
    return `<div class="invitation ${style}"><div class="flower" aria-hidden="true">❧</div><p class="invite-small">Uma história, um novo capítulo</p><p class="invite-names">Nome<br><em>&</em> Nome</p><div class="invite-line"></div><p class="invite-date">O NOSSO GRANDE DIA</p><p class="demo-label">DEMONSTRAÇÃO · NOMES ILUSTRATIVOS</p></div>`;
  }
  function weddingVisual(media) {
    const photo = media || { image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=900&q=80', alt: 'Flores e detalhes de uma celebração, imagem ilustrativa', width: 700, height: 600 };
    return `<div class="wedding-visual"><img src="${safeUrl(photo.image)}" alt="${esc(photo.alt)}" loading="lazy" width="${photo.width}" height="${photo.height}">${invitation()}<span class="wedding-sticker">Feito para contar a história de vocês ♡</span></div>`;
  }
  function homePhotoCard(photo) {
    return `<button class="reference-card home-photo-card" data-home-photo="${esc(photo.id)}"><div class="image-wrap ${photo.fit === 'contain' ? 'image-contain' : ''}"><img src="${safeUrl(photo.image)}" alt="${esc(photo.alt)}" loading="lazy" decoding="async"></div><div class="card-meta"><div><small>${esc(photo.label)}</small><h3>${esc(photo.title)}</h3></div><span class="card-arrow" aria-hidden="true">↗</span></div></button>`;
  }
  function home() {
    return `<section class="container hero"><div class="hero-copy"><div class="eyebrow">Criatividade com propósito. Histórias com alma.</div><h1>Boas histórias<br>merecem<br><span class="serif">brilhar.</span></h1><p class="hero-description">Sua marca, suas histórias e seus momentos merecem um novo olhar. Marketing, conteúdo e experiências digitais feitos para conectar.</p><div class="hero-actions"><a class="button button-dark" href="#/servicos">Conheça nossos serviços ${arrow}</a><a class="text-link" href="#/contato">Converse com a Raiar ${arrow}</a></div><div class="hero-location"><span class="location-dot"></span> De Redenção–PA para novas possibilidades.</div></div><div class="hero-visual hero-visual-local"><img class="hero-photo" src="${safeUrl(data.homeMedia.hero.image)}" alt="${esc(data.homeMedia.hero.alt)}" fetchpriority="high" width="${data.homeMedia.hero.width}" height="${data.homeMedia.hero.height}"><span class="image-tag"><i></i> CONTEÚDO QUE GANHA VIDA.</span><div class="sun-stamp">${sun}<small>IDEIAS QUE ILUMINAM</small></div><div class="hero-caption"><p>Um olhar atento.<br>Infinitas possibilidades.</p><span class="little-sun" aria-hidden="true">✳</span></div></div></section>
      <div class="container service-ribbon"><a class="ribbon-item" href="#/servicos">${icons[0]}<span>Marketing & conteúdo</span></a><a class="ribbon-item" href="#/servicos">${icons[1]}<span>Audiovisual & eventos</span></a><a class="ribbon-item" href="#/servicos">${icons[2]}<span>Sites & experiências digitais</span></a></div>
      <section class="container section about-intro"><div><div class="eyebrow">Muito prazer, somos a Raiar</div><h2>Ideias ganham vida.<br>Histórias ganham <span class="serif">luz.</span></h2><div class="small-star" aria-hidden="true">✳</div></div><div class="intro-copy"><p>Acreditamos no poder de um bom olhar. Da estratégia ao registro de um momento especial, combinamos criatividade, proximidade e cuidado para transformar ideias em conexões de verdade.</p><p style="margin-top:14px">Somos a Raiar Estúdio, de Redenção–PA. Por aqui, cada marca e cada história têm seu próprio jeito de brilhar.</p><a class="text-link" href="#/sobre">Conheça a Raiar ${arrow}</a></div></section>
      <section class="services-section section"><div class="container"><div class="section-heading"><div><div class="eyebrow">O que a gente faz</div><h2>Da primeira ideia<br>ao que fica na <span class="serif">memória.</span></h2></div><p class="section-intro">Soluções criativas para a sua marca, seu negócio e os momentos que merecem ser contados.</p></div><div class="service-groups">${[0,1,2].map((g) => `<article class="service-group"><div class="service-group-top">${icons[g]}<span>0${g+1}</span></div><h3>${['Marketing & conteúdo','Audiovisual & eventos','Sites & experiências digitais'][g]}</h3><p>${['Sua marca com voz, presença e conteúdo que faz sentido para quem importa.','Histórias que ganham movimento. Momentos que se tornam memória.','Presença digital com identidade, leveza e atenção a cada detalhe.'][g]}</p><ul class="service-tags">${[['Marketing digital','Social media','Conteúdo comercial'],['Vídeos mobile','Edição','Fotografia','Cobertura de eventos'],['Sites institucionais','Sites de casamento','Convites digitais']][g].map(t => `<li>${t}</li>`).join('')}</ul><a class="text-link" href="#/servicos?grupo=${g}">Explore as possibilidades ${arrow}</a></article>`).join('')}</div></div></section>
      <section class="container section"><div class="section-heading"><div><div class="eyebrow">Um pouco do nosso olhar</div><h2>Marcas, momentos<br>e boas <span class="serif">histórias.</span></h2></div><a class="text-link" href="#/portfolio">Conheça o portfólio ${arrow}</a></div><div class="reference-grid home-gallery">${data.homeMedia.gallery.map(homePhotoCard).join('')}</div></section>
      <section class="container wedding-band">${weddingVisual(data.homeMedia.wedding)}<div class="wedding-copy"><div class="eyebrow">Sites de casamento & convites digitais</div><h2>O grande dia começa<br>com um <span class="serif">sim.</span><br>E um convite especial.</h2><p>Um espaço digital para contar a história de vocês e apresentar esse momento com toda a personalidade que ele merece.</p><a class="button button-outline" href="#/casamentos">Conheça essa história ${arrow}</a></div></section>
      <section class="container section"><div class="section-heading"><div><div class="eyebrow">Acontece na Raiar</div><h2>Ideias, encontros<br>e novos <span class="serif">começos.</span></h2></div><a class="text-link" href="#/conteudos">Ver todos ${arrow}</a></div><div class="journal-grid">${data.articles.filter(a => a.status === 'published').slice(0,3).map(a => articleCard({...a, ...data.homeMedia.articleCovers[a.id]})).join('')}</div>${instagram()}</section>${cta()}`;
  }
  function about() {
    return pageHero('Sobre a Raiar', 'Criatividade que aproxima.<br>Um olhar que <span class="serif">transforma.</span>', 'Somos um estúdio de marketing, produção de conteúdo e experiências digitais em Redenção–PA. Nosso ponto de partida é sempre uma boa conversa.') + `
      <section class="container page-section">
        <div class="about-split">
          <div>
            <img class="about-photo" src="./assets/fotos/otimizadas/bastidores-raiar.jpg" alt="Bastidores de cobertura de evento em Redenção, Pará: profissional com celular em um auditório" loading="lazy" decoding="async" width="1022" height="1280">
            <p class="photo-caption">Bastidores de cobertura em Redenção–PA.</p>
          </div>
          <div>
            <div class="eyebrow">Por trás de cada entrega</div>
            <h2>Mais escuta.<br>Mais intenção.<br>Mais <span class="serif">conexão.</span></h2>
            <p>Uma marca tem um jeito de ser. Um evento tem uma energia própria. Um casal tem uma história que não se repete. Nosso trabalho começa ao perceber essas diferenças.</p>
            <p>Combinamos criatividade e produção de conteúdo para comunicar marcas e registrar histórias, com cuidado em cada etapa: da conversa inicial à forma como a entrega chega até você.</p>
            <p>De Redenção–PA, buscamos um trabalho próximo, com escolhas que respeitam a identidade de cada projeto.</p>
          </div>
        </div>
        <div class="values">${[['✳','Criar com propósito','Cada escolha visual e cada palavra precisam conversar com o que você quer comunicar.'],['↗','Construir por perto','Escutar, alinhar expectativas e encontrar um caminho que faça sentido para o seu projeto.'],['◌','Cuidar dos detalhes','Valorizar as pessoas e os pequenos elementos que tornam uma história única.']].map(v => `<article class="value"><span aria-hidden="true">${v[0]}</span><h3>${v[1]}</h3><p>${v[2]}</p></article>`).join('')}</div>
        <div class="team-note"><h3>Gente de verdade, por trás das ideias.</h3><p>As apresentações dos profissionais serão compartilhadas aqui com informações e imagens autorizadas. Enquanto isso, conheça mais do nosso dia a dia no Instagram.</p><a class="text-link" href="${safeUrl(data.settings.instagram)}" target="_blank" rel="noopener noreferrer">Encontre a Raiar ${arrow}</a></div>
      </section>${cta()}`;
  }
  function servicesPage(params) {
    const group = params.get('grupo');
    return pageHero('Nossos serviços', 'Um novo olhar.<br>Muitas <span class="serif">possibilidades.</span>', 'Marketing, produção e presença digital para dar forma às suas ideias. Cada proposta é construída a partir do que o seu projeto precisa.') + `<section class="container page-section">${[0,1,2].map(g => `<section class="service-category" id="grupo-${g}"><div class="category-heading"><span>0${g+1}</span><h2>${groupNames[g]}</h2></div><div class="service-list">${services().filter(s => s.group === g).map(s => `<article class="service-detail" id="servico-${esc(s.id)}"><div><h3>${esc(s.name)}</h3><a class="text-link" href="#/contato?servico=${esc(s.id)}">Quero esse serviço ${arrow}</a></div><div><p>${esc(s.description)}</p><strong>Para quem</strong><p>${esc(s.audience)}</p><strong>Na prática</strong><p>${esc(s.examples)}</p><div class="service-related">${data.projects.filter(p => p.status === 'published' && p.authorized && p.services?.includes(s.id)).length ? '<a href="#/portfolio" class="text-link">Ver trabalhos relacionados ↗</a>' : 'Trabalhos relacionados serão incluídos após autorização de publicação.'}</div>${s.id === 'casamentos' ? '<a class="text-link" href="#/casamentos">Conheça os sites de casamento ↗</a>' : ''}</div></article>`).join('')}</div></section>`).join('')}<p class="section-note">Escopo, formatos, disponibilidade e condições são definidos na proposta. Sem pacotes ou preços pré-estabelecidos nesta apresentação.</p></section>${cta()}`;
  }
  let portfolioFilter = 'Todos';
  const portfolioFilters = ['Todos','Empresas e marcas','Vídeos e conteúdo','Fotografia','Eventos','Sites','Casamentos'];
  function portfolio() {
    portfolioFilter = 'Todos';
    return pageHero('Portfólio & olhar criativo', 'Cada projeto,<br>uma nova <span class="serif">história.</span>', 'Conteúdo para marcas, registros de conquistas e momentos especiais. Explore a seleção de imagens e encontre novas possibilidades para a sua história.') + `
      <section class="container page-section">
        <div class="filter-bar" aria-label="Filtrar portfólio">${portfolioFilters.map(f => `<button class="filter-button ${f === 'Todos' ? 'active' : ''}" data-portfolio-filter="${f}" aria-pressed="${f === 'Todos'}">${f}</button>`).join('')}</div>
        <div class="portfolio-grid portfolio-gallery" id="portfolio-grid" aria-live="polite">${portfolioItems('Todos')}</div>
      </section>${cta()}`;
  }
  function portfolioPhotoCard(photo) {
    return `<button class="reference-card" data-portfolio-media="${esc(photo.id)}"><div class="image-wrap ${photo.fit === 'contain' ? 'image-contain' : ''}"><img src="${safeUrl(photo.image)}" alt="${esc(photo.alt)}" loading="lazy" decoding="async"></div><div class="card-meta"><div><small>${esc(photo.label)}</small><h3>${esc(photo.title)}</h3></div><span class="card-arrow" aria-hidden="true">↗</span></div></button>`;
  }
  function portfolioItems(filter) {
    const projects = data.projects.filter(p => p.status === 'published' && p.authorized && (filter === 'Todos' || p.category === filter));
    const photos = data.portfolioMedia.filter(p => p.status === 'published' && (filter === 'Todos' || p.category === filter || p.tags.includes(filter)));
    return projects.map(p => `<button class="reference-card" data-project="${esc(p.id)}"><div class="image-wrap"><img src="${safeUrl(p.images?.[0])}" alt="${esc(p.title)}" loading="lazy"></div><div class="card-meta"><h3>${esc(p.title)}</h3><span class="card-arrow">↗</span></div></button>`).join('') + photos.map(portfolioPhotoCard).join('') || '<div class="empty-state"><h3>Novas histórias vêm por aí.</h3><p>Ainda não há trabalhos publicados nesta categoria.</p><a href="#/contato" class="text-link">Vamos criar o próximo? ↗</a></div>';
  }
  function weddings() {
    const confirmed = data.weddingFeatures.filter(f => f.confirmed && f.visible);
    return `<section class="container wedding-page-hero"><div><div class="eyebrow">Sites de casamento & convites digitais</div><h1>O primeiro encontro<br>com o <span class="serif">grande dia.</span></h1><p>Antes do abraço, da música e da celebração, existe um convite. Criamos uma experiência digital personalizada para apresentar o casamento e acolher seus convidados.</p><a class="button button-dark" href="#/contato?servico=casamentos">Quero meu site de casamento ${arrow}</a></div>${weddingVisual()}</section><section class="services-section section"><div class="container"><div class="section-heading"><div><div class="eyebrow">Um pouco de inspiração</div><h2>Um convite com<br>o jeito de <span class="serif">vocês.</span></h2></div><p class="section-intro">Direções visuais para inspirar a conversa. Selecione um modelo para ver uma prévia no computador e no celular.</p></div><div class="model-grid">${data.weddingModels.filter(m => m.status === 'published').map(m => `<button class="model-card" data-model="${esc(m.id)}" aria-label="Ver demonstração do modelo ${esc(m.name)}"><div class="model-preview ${esc(m.style)}">${invitation(m.style)}</div><h3>${esc(m.name)} ${arrow}</h3><p>${esc(m.tone)}</p><span class="demo-badge">MODELO DEMONSTRATIVO · NÃO É PROJETO DE CLIENTE</span></button>`).join('')}</div></div></section><section class="container section"><div class="section-heading"><div><div class="eyebrow">Do primeiro oi ao convite</div><h2>Com carinho,<br>em cada <span class="serif">etapa.</span></h2></div></div><div class="steps-grid">${[['A gente conversa','Vocês contam a história, a ideia da celebração e o que precisam comunicar.'],['Definimos o caminho','Alinhamos identidade, informações, funcionalidades disponíveis e proposta.'],['Damos forma','Organizamos os materiais autorizados e criamos a apresentação do casamento.'],['Revisamos juntos','Vocês conferem as informações antes da aprovação e publicação.']].map((s,i) => `<article class="step"><span class="step-number">0${i+1}</span><h3>${s[0]}</h3><p>${s[1]}</p></article>`).join('')}</div><div class="features-confirmed"><h3>Ferramentas na medida da sua história.</h3>${confirmed.length ? `<ul>${confirmed.map(f => `<li>${esc(f.name)}</li>`).join('')}</ul>` : '<p>As ferramentas disponíveis serão confirmadas na conversa e detalhadas na proposta. Nenhuma funcionalidade adicional está anunciada como incluída antes dessa confirmação.</p>'}<p style="margin-top:12px">O visual é personalizado para o casal. Conteúdo, ferramentas, hospedagem e condições de manutenção são alinhados no escopo contratado.</p></div></section><section class="container page-section"><div class="faq"><div class="eyebrow">Antes de dizer sim</div><h2>Perguntas <span class="serif">frequentes.</span></h2>${[['Os modelos são sites de casais reais?','Não. São demonstrações visuais com nomes ilustrativos. Servem para apresentar direções criativas e não representam trabalhos de clientes.'],['O site pode seguir a identidade do casamento?','Essa é a proposta: conversar sobre o estilo da celebração e criar uma apresentação personalizada. Os materiais e o nível de personalização são alinhados na proposta.'],['Quais ferramentas estão incluídas?','As ferramentas precisam ser confirmadas individualmente pela Raiar. Não considere uma funcionalidade disponível até que ela esteja expressamente incluída na sua proposta.'],['Como funcionam valores e prazos?','Cada projeto recebe uma proposta com escopo, condições e prazo combinados. Envie as informações do casamento para iniciar essa conversa.'],['O que precisamos enviar?','As informações confirmadas do casamento, as referências visuais e os materiais que vocês autorizam usar. A lista específica é alinhada conforme a proposta.']].map(f => `<details><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join('')}</div></section>${cta()}`;
  }
  const articleCategories = ['Todos','Bastidores','Projetos entregues','Dicas de conteúdo e marketing','Eventos e coberturas','Novidades da agência','Sites e casamentos'];
  function contents() {
    return pageHero('Acontece na Raiar', 'Ideias que circulam.<br>Histórias em <span class="serif">movimento.</span>', 'Dicas, inspirações e um espaço para acompanhar os projetos, os bastidores e as novidades da Raiar.') + `<section class="container page-section"><div class="filter-bar" aria-label="Filtrar conteúdos">${articleCategories.map(c => `<button class="filter-button ${c === 'Todos' ? 'active' : ''}" data-article-filter="${esc(c)}" aria-pressed="${c === 'Todos'}">${c}</button>`).join('')}</div><div class="journal-grid" id="article-grid" aria-live="polite">${data.articles.filter(a => a.status === 'published').map(articleCard).join('')}</div><p class="section-note">Conteúdos editoriais da Raiar, com imagens selecionadas do acervo enviado.</p>${instagram()}${data.instagramPosts.filter(p => p.status === 'published').length ? `<div class="journal-grid" style="margin-top:35px">${data.instagramPosts.filter(p => p.status === 'published').map(p => `<a class="journal-card" href="${safeUrl(p.url)}" target="_blank" rel="noopener noreferrer"><img src="${safeUrl(p.image)}" alt="${esc(p.title)}" loading="lazy"><h3>${esc(p.title)}</h3><p>${esc(p.summary)}</p></a>`).join('')}</div>` : ''}</section>${cta()}`;
  }
  function article(id) {
    const entry = data.articles.find(a => a.id === id && a.status === 'published');
    if (!entry) return notFound();
    const a = { ...entry, ...data.homeMedia.articleCovers[entry.id] };
    return `<article class="container article-layout"><a class="text-link" href="#/conteudos">← Todos os conteúdos</a><div class="eyebrow">${esc(a.category)}</div><h1>${esc(a.title)}</h1><p style="margin-top:20px">${esc(a.summary)}</p><img class="article-cover" src="${safeUrl(a.image)}" alt="${esc(a.imageAlt || a.title)}" width="760" height="950"><div class="article-body">${a.body.map(p => `<p>${esc(p)}</p>`).join('')}</div><p class="section-note">Conteúdo editorial Raiar Estúdio.</p><a class="text-link" href="#/contato" style="margin-top:25px">Vamos conversar sobre o seu projeto ${arrow}</a></article>${cta()}`;
  }
  function contact(params) {
    const selected = params.get('servico') || '';
    return pageHero('Contato & orçamento', 'Toda boa ideia começa<br>com uma <span class="serif">conversa.</span>', 'Conte um pouco do que você imagina. Vamos entender seu momento e construir uma proposta para o seu projeto.') + `<section class="container page-section contact-layout"><aside class="contact-aside"><h2>O que vamos<br>criar <span class="serif">juntos?</span></h2><p>Preencha os detalhes ao lado para organizar seu pedido. As informações não são armazenadas neste site.</p><div class="contact-channel"><small>ESTAMOS EM</small><span>Redenção–PA</span></div><div class="contact-channel"><small>ACOMPANHE E CONVERSE</small><a href="${safeUrl(data.settings.instagram)}" target="_blank" rel="noopener noreferrer">@raiarestudio ↗</a></div><p>${whatsappNumber() ? 'Ao continuar, o WhatsApp será aberto com a mensagem preenchida. O envio é feito por você na conversa.' : 'Nosso link de WhatsApp está em configuração. Você pode preparar e copiar seu pedido e iniciar a conversa pelo Instagram.'}</p></aside><form class="contact-form" id="quote-form"><div class="field"><label for="name">Seu nome *</label><input id="name" name="name" autocomplete="name" maxlength="120" placeholder="Como podemos chamar você?" required></div><div class="field"><label for="company">Empresa ou nome do casal <span>(opcional)</span></label><input id="company" name="company" autocomplete="organization" maxlength="150" placeholder="Seu negócio ou sua história"></div><div class="field"><label for="phone">WhatsApp com DDD *</label><input id="phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" maxlength="22" placeholder="(94) 99999-9999" pattern="[+()0-9 .-]{10,22}" required></div><div class="field"><label for="email">E-mail <span>(opcional)</span></label><input id="email" name="email" type="email" autocomplete="email" maxlength="180" placeholder="voce@exemplo.com"></div><div class="field full"><label for="service">Serviço de interesse *</label><select id="service" name="service" required><option value="">Selecione uma possibilidade</option>${services().map(s => `<option value="${esc(s.id)}" ${selected === s.id ? 'selected' : ''}>${esc(s.name)}</option>`).join('')}<option value="outro">Quero conversar sobre uma ideia</option></select></div><div class="field" id="event-field" hidden><label for="event-date">Data do evento *</label><input id="event-date" name="date" type="date"></div><div class="field" id="city-field"><label for="city">Cidade *</label><input id="city" name="city" autocomplete="address-level2" maxlength="120" placeholder="Onde será o projeto?" required></div><div class="field full" id="project-field" hidden><label for="project-type">Tipo de projeto *</label><select id="project-type" name="project"><option value="">Selecione o tipo de site</option><option>Site institucional</option><option>Site profissional</option><option>Site de casamento</option><option>Convite digital</option><option>Outro projeto</option></select></div><div class="field full"><label for="message">Conte um pouco da sua ideia *</label><textarea id="message" name="message" required maxlength="3000" placeholder="O que você precisa, o que imagina e o que é importante para você..."></textarea></div><p class="form-note">* Campos obrigatórios. Seus dados são usados apenas para montar a mensagem no seu dispositivo. Leia a <a href="#/privacidade">Política de Privacidade</a>. Ao abrir o WhatsApp ou Instagram, aplicam-se também as políticas dessas plataformas.</p><div class="form-actions"><button class="button button-dark" type="submit">${whatsappNumber() ? 'Continuar no WhatsApp' : 'Preparar pedido de orçamento'} ${arrow}</button><span class="form-note">${whatsappNumber() ? 'Você revisa e envia a mensagem no WhatsApp.' : 'Nenhum pedido será enviado automaticamente.'}</span></div><div class="form-feedback" id="form-feedback" hidden aria-live="polite"></div></form></section>`;
  }
  function privacy() {
    return pageHero('Informação & cuidado', 'Sua privacidade<br><span class="serif">importa.</span>', 'Uma explicação simples sobre como esta versão do site funciona.') + `<div class="container"><div class="prose"><h2>O que o site coleta</h2><p>Esta versão não possui banco de dados de visitantes, cadastro, ferramentas de análise, cookies de publicidade ou armazenamento de pedidos. O formulário organiza as informações que você digita apenas na memória do navegador enquanto a página está aberta.</p><h2>Pedidos de orçamento</h2><p>Nome, WhatsApp, cidade, serviço de interesse e mensagem são solicitados para compor um pedido. Empresa ou nome do casal e e-mail são opcionais. Dependendo do serviço, também são solicitados data do evento e tipo de site. Não inclua dados sensíveis ou informações de terceiros sem autorização.</p><p>Com um número oficial configurado, o botão abre o WhatsApp com uma mensagem preenchida. A mensagem só é enviada quando você a envia no WhatsApp. Enquanto o número não for confirmado, é possível copiar o pedido e compartilhá-lo pelo Instagram. O site não recebe nem armazena esse conteúdo em servidor.</p><h2>Serviços externos</h2><p>As fontes são carregadas do Google Fonts e as imagens ilustrativas do Unsplash. Esses provedores podem receber informações técnicas, como IP e dados do navegador, ao carregar os recursos. Links para Instagram e WhatsApp levam a serviços da Meta, sujeitos às políticas deles. Não há raspagem ou sincronização automática do Instagram.</p><h2>Imagens e materiais</h2><p>As imagens de banco são referências visuais, não registros da equipe ou projetos de clientes. Projetos reais, nomes, imagens e depoimentos só devem ser publicados com as autorizações necessárias.</p><h2>Contato sobre privacidade</h2><p>Fale com a Raiar pelo <a href="${safeUrl(data.settings.instagram)}" target="_blank" rel="noopener noreferrer">Instagram oficial @raiarestudio</a>. A identificação formal do responsável e um canal específico de privacidade devem ser confirmados antes do lançamento definitivo.</p><h2>Mudanças nesta política</h2><p>Se forem adicionados formulários com envio, cookies, análise de acesso ou integrações, esta política deverá ser atualizada para refletir o tratamento efetivo dos dados.</p></div></div>`;
  }
  function administration() {
    return pageHero('Gestão de conteúdo', 'Uma base pronta<br>para <span class="serif">evoluir.</span>', 'Transparência sobre a edição e a publicação desta versão do site.') + `<div class="container"><div class="prose"><div class="notice"><h2 style="margin-top:0">Não há painel administrativo nesta versão.</h2><p>Esta entrega é um site estático, sem backend ou autenticação. Nenhum acesso administrativo ou armazenamento de pedidos é simulado.</p></div><h2>Como os conteúdos são atualizados</h2><p>Textos e cadastros são organizados no arquivo <code>content.js</code>. A edição exige acesso aos arquivos do projeto, revisão e nova publicação. Projetos, publicações, modelos e serviços podem ser mantidos como rascunho e só aparecem quando marcados para publicação.</p><h2>O que permanece oculto</h2><p>Mentoria e ferramentas de casamento estão cadastradas, mas não confirmadas e não visíveis. Projetos e depoimentos reais não são preenchidos com informações inventadas. O WhatsApp depende da configuração de um número confirmado.</p><h2>Próxima etapa: um CMS protegido</h2><p>Para oferecer edição por painel, será preciso integrar um CMS ou backend com autenticação no servidor, permissões, armazenamento de mídia, revisão e publicação. As instruções, o modelo de dados e as pendências estão em <code>ENTREGA.md</code>.</p><a class="button button-outline" href="#/contato" style="margin-top:25px">Fale com a Raiar ${arrow}</a></div></div>`;
  }
  function notFound() {
    return pageHero('Página não encontrada', 'Vamos encontrar<br>um novo <span class="serif">caminho?</span>', 'Esse conteúdo não está disponível. Você pode voltar ao início ou conhecer nossos serviços.') + '<div class="container page-section"><a class="button button-dark" href="#/">Voltar ao início ↗</a></div>';
  }
  function updateFields() {
    const select = document.querySelector('#service');
    if (!select) return;
    const events = ['eventos','casamentos'].includes(select.value);
    const sites = ['sites','casamentos'].includes(select.value);
    document.querySelector('#event-field').hidden = !events;
    document.querySelector('#event-date').required = events;
    document.querySelector('#event-date').disabled = !events;
    document.querySelector('#project-field').hidden = !sites;
    document.querySelector('#project-type').required = sites;
    document.querySelector('#project-type').disabled = !sites;
    if (select.value === 'casamentos') document.querySelector('#project-type').value = 'Site de casamento';
    const feedback = document.querySelector('#form-feedback');
    if (feedback) feedback.hidden = true;
  }
  function render() {
    const [path, query] = (location.hash.slice(1) || '/').split('?');
    const params = new URLSearchParams(query);
    const pages = {'/':home,'/sobre':about,'/servicos':servicesPage,'/portfolio':portfolio,'/casamentos':weddings,'/conteudos':contents,'/contato':contact,'/privacidade':privacy,'/administracao':administration};
    const titles = {'/':'Boas histórias merecem brilhar','/sobre':'Sobre a Raiar','/servicos':'Serviços','/portfolio':'Portfólio','/casamentos':'Sites de casamento e convites digitais','/conteudos':'Acontece na Raiar','/contato':'Contato e orçamento','/privacidade':'Política de Privacidade','/administracao':'Gestão de conteúdo'};
    const articleId = path.startsWith('/conteudos/') ? path.slice('/conteudos/'.length) : null;
    main.innerHTML = articleId ? article(articleId) : pages[path] ? pages[path](params) : notFound();
    main.querySelector('.instagram-feed + .journal-grid')?.remove();
    if (path === '/privacidade') main.querySelector('.prose').insertAdjacentHTML('beforeend', '<h2>Feed incorporado do Instagram</h2><p>O feed do perfil oficial é um conteúdo externo da Meta. Ele não é carregado até que você clique em “Carregar feed do Instagram”. Esse clique autoriza o carregamento nesta página; não salvamos a escolha entre visitas. Ao carregar a incorporação, a Meta pode receber seu IP e dados do navegador e usar cookies próprios ou de terceiros, conforme as políticas e configurações do Instagram. Não recebemos os dados de sua conta, não fazemos raspagem e não armazenamos tokens. Caso prefira, use apenas o link para abrir o perfil oficial. A disponibilidade da incorporação depende do Instagram e das configurações do perfil.</p>');
    if (path === '/') {
      const quotes = testimonialsSection();
      if (quotes) main.querySelector('.cta-section')?.insertAdjacentHTML('beforebegin',quotes);
    }
    if (path === '/sobre' && teamSection()) {
      const note = main.querySelector('.team-note');
      note.innerHTML = '<h3>Gente de verdade, por trás das ideias.</h3>' + teamSection();
    }
    if (articleId) {
      const entry = data.articles.find(a => a.id === articleId && a.status === 'published');
      const body = main.querySelector('.article-body');
      if (entry && body) {
        body.insertAdjacentHTML('beforebegin',articleDate(entry));
        body.insertAdjacentHTML('beforeend', (entry.images || []).map(image => `<figure><img src="${safeUrl(image.url)}" alt="${esc(image.alt)}" loading="lazy">${image.caption ? `<figcaption>${esc(image.caption)}</figcaption>` : ''}</figure>`).join(''));
        if (entry.videoUrl && safeUrl(entry.videoUrl)) body.insertAdjacentHTML('beforeend',`<a class="text-link" href="${safeUrl(entry.videoUrl)}" target="_blank" rel="noopener noreferrer">Assistir ao vídeo ↗</a>`);
        if (entry.originalUrl && safeUrl(entry.originalUrl)) body.insertAdjacentHTML('beforeend',`<p><a class="text-link" href="${safeUrl(entry.originalUrl)}" target="_blank" rel="noopener noreferrer">Ver publicação original ↗</a></p>`);
      }
    }
    const articleData = data.articles.find(a => a.id === articleId && a.status === 'published');
    const title = articleData?.title || titles[path] || 'Página não encontrada';
    const description = articleData?.summary || main.querySelector('.page-hero p,.hero-description,.wedding-page-hero p')?.textContent || 'Marketing, conteúdo e experiências digitais em Redenção–PA. Conheça a Raiar Estúdio.';
    document.title = `${title} | Raiar Estúdio`;
    document.querySelector('meta[name="description"]').content = description;
    document.querySelector('meta[property="og:title"]').content = document.title;
    document.querySelector('meta[property="og:description"]').content = description;
    document.querySelector('meta[property="og:image"]').content = data.settings.sharingImage;
    document.querySelectorAll('[data-nav]').forEach(a => {const active = a.dataset.nav === path || (a.dataset.nav === '/conteudos' && articleId);a.classList.toggle('active', !!active);if(active) a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
    document.querySelector('#navigation').classList.remove('open');
    document.querySelector('.menu-toggle').setAttribute('aria-expanded','false');
    if (dialog.open) dialog.close();
    updateFields();
    const phoneInput = document.querySelector('#phone');
    if (phoneInput) phoneInput.setAttribute('pattern', String.raw`[+\(\)0-9 .\-]{10,22}`);
    main.classList.remove('page-enter');
    requestAnimationFrame(() => main.classList.add('page-enter'));
    window.scrollTo({top:0, behavior:'instant'});
    if (path === '/servicos' && params.has('grupo')) requestAnimationFrame(() => document.getElementById(`grupo-${params.get('grupo')}`)?.scrollIntoView());
  }
  function showDialog(content) {
    document.querySelector('#dialog-content').innerHTML = content;
    dialog.showModal();
  }
  document.addEventListener('click', event => {
    const portfolioPhoto = event.target.closest('[data-portfolio-media]');
    if (portfolioPhoto) {
      const photo = data.portfolioMedia.find(p => p.id === portfolioPhoto.dataset.portfolioMedia && p.status === 'published');
      if (photo) showDialog(`<img class="dialog-image dialog-image-full" src="${safeUrl(photo.image)}" alt="${esc(photo.alt)}"><div class="dialog-copy"><div class="eyebrow">${esc(photo.label)}</div><h2>${esc(photo.title)}</h2><p>${esc(photo.description)}</p><a class="button button-dark" href="#/contato?servico=${esc(photo.service)}">Quero conversar sobre esse serviço ${arrow}</a></div>`);
    }
    const homePhoto = event.target.closest('[data-home-photo]');
    if (homePhoto) {
      const photo = data.homeMedia.gallery.find(p => p.id === homePhoto.dataset.homePhoto);
      if (photo) showDialog(`<img class="dialog-image dialog-image-full" src="${safeUrl(photo.image)}" alt="${esc(photo.alt)}"><div class="dialog-copy"><div class="eyebrow">${esc(photo.label)}</div><h2>${esc(photo.title)}</h2><a class="button button-dark" href="#/contato?servico=${esc(photo.service)}">Vamos conversar sobre seu projeto ${arrow}</a></div>`);
    }
    const loadInstagram = event.target.closest('[data-load-instagram]');
    if (loadInstagram) {
      const area = loadInstagram.closest('.instagram-embed-area');
      const frame = document.createElement('iframe');
      frame.title = 'Publicações do Instagram oficial da Raiar Estúdio';
      frame.src = 'https://www.instagram.com/raiarestudio/embed/';
      frame.className = 'instagram-profile-frame';
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      frame.setAttribute('loading', 'lazy');
      area.replaceChildren(frame);
      frame.focus();
    }
    const ref = event.target.closest('[data-reference]');
    if (ref) {
      const r = data.references.find(r => r.id === ref.dataset.reference);
      showDialog(`<img class="dialog-image" src="${safeUrl(r.image)}" alt="${esc(r.alt)}"><div class="dialog-copy"><div class="eyebrow">Referência visual · imagem de banco</div><h2>${esc(r.title)}</h2><p>${esc(r.description)}</p><p>Quer explorar uma direção como essa para a sua história? A proposta e a produção serão pensadas especialmente para você.</p><a class="button button-dark" href="#/contato">Vamos conversar ${arrow}</a></div>`);
    }
    const model = event.target.closest('[data-model]');
    if (model) {
      const m = data.weddingModels.find(m => m.id === model.dataset.model);
      showDialog(`<div class="demo-devices ${esc(m.style)}"><div class="desktop-demo">${invitation(m.style)}</div><div class="phone-demo">${invitation(m.style)}</div></div><div class="dialog-copy"><div class="eyebrow">Prévia visual · computador e celular</div><h2>${esc(m.name)}</h2><p>${esc(m.tone)} Esta é uma demonstração de direção visual, não um site de cliente nem uma plataforma funcional. Nomes são ilustrativos. Ferramentas e escopo precisam ser confirmados na proposta.</p><a class="button button-dark" href="#/contato?servico=casamentos">Quero conversar sobre esse estilo ${arrow}</a></div>`);
    }
    const project = event.target.closest('[data-project]');
    if (project) {
      const p = data.projects.find(p => p.id === project.dataset.project && p.status === 'published' && p.authorized);
      if (p) showDialog(`<div class="dialog-copy"><div class="eyebrow">${esc(p.category)}</div><h2>${esc(p.title)}</h2>${p.clientAuthorized && p.client ? `<p>Cliente: ${esc(p.client)}</p>` : ''}<p>${esc(p.service || '')}</p><h3>O objetivo</h3><p>${esc(p.objective)}</p><h3>A entrega</h3><p>${esc(p.description)}</p>${(p.images || []).map(src => `<img src="${safeUrl(src)}" alt="${esc(p.title)}" loading="lazy">`).join('')}${p.videoUrl && safeUrl(p.videoUrl) ? `<a class="text-link" href="${safeUrl(p.videoUrl)}" target="_blank" rel="noopener noreferrer">Assistir ao vídeo ↗</a>` : ''}${p.testimonialAuthorized && p.testimonial ? `<blockquote>${esc(p.testimonial)}</blockquote>` : ''}${p.verifiedResults ? `<h3>Resultados comprovados</h3><p>${esc(p.verifiedResults)}</p>` : ''}${p.url && safeUrl(p.url) ? `<a class="text-link" href="${safeUrl(p.url)}" target="_blank" rel="noopener noreferrer">Visitar projeto ↗</a>` : ''}</div>`);
    }
    const filter = event.target.closest('[data-portfolio-filter]');
    if (filter) {
      portfolioFilter = filter.dataset.portfolioFilter;
      document.querySelectorAll('[data-portfolio-filter]').forEach(b => {b.classList.toggle('active', b === filter);b.setAttribute('aria-pressed',String(b === filter));});
      document.querySelector('#portfolio-grid').innerHTML = portfolioItems(portfolioFilter);
    }
    const articleFilter = event.target.closest('[data-article-filter]');
    if (articleFilter) {
      document.querySelectorAll('[data-article-filter]').forEach(b => {b.classList.toggle('active', b === articleFilter);b.setAttribute('aria-pressed',String(b === articleFilter));});
      const filtered = data.articles.filter(a => a.status === 'published' && (articleFilter.dataset.articleFilter === 'Todos' || a.category === articleFilter.dataset.articleFilter));
      document.querySelector('#article-grid').innerHTML = filtered.length ? filtered.map(articleCard).join('') : '<div class="empty-state"><h3>Em breve, novas histórias por aqui.</h3><p>Não há publicações nesta categoria no momento. Acompanhe também o Instagram da Raiar.</p></div>';
    }
  });
  document.addEventListener('change', e => {if(e.target.id === 'service') updateFields();});
  document.addEventListener('input', e => {
    if(e.target.id === 'phone') e.target.setCustomValidity('');
    if(e.target.closest('#quote-form') && e.target.id !== 'quote-preview') {const feedback = document.querySelector('#form-feedback');if(feedback) feedback.hidden = true;}
  });
  document.addEventListener('submit', e => {
    if (e.target.id !== 'quote-form') return;
    e.preventDefault();
    const form = e.target;
    const values = new FormData(form);
    const digits = String(values.get('phone')).replace(/\D/g,'');
    if (digits.length < 10 || digits.length > 15) {form.phone.setCustomValidity('Informe um WhatsApp válido com DDD.');form.phone.reportValidity();return;}
    if (!String(values.get('name')).trim() || !String(values.get('message')).trim() || !String(values.get('city')).trim()) {document.querySelector('#form-feedback').hidden = false;document.querySelector('#form-feedback').textContent = 'Preencha nome, cidade e mensagem com informações válidas.';return;}
    const selected = data.services.find(s => s.id === values.get('service'));
    const date = values.get('date');
    const message = ['Olá, Raiar! Quero conversar sobre um projeto.','',`Nome: ${values.get('name').trim()}`,values.get('company') ? `Empresa ou casal: ${values.get('company').trim()}` : '',`WhatsApp: ${values.get('phone')}`, values.get('email') ? `E-mail: ${values.get('email')}` : '',`Serviço: ${selected?.name || 'Quero conversar sobre uma ideia'}`,date ? `Data do evento: ${date.split('-').reverse().join('/')}` : '',`Cidade: ${values.get('city').trim()}`,values.get('project') ? `Tipo de projeto: ${values.get('project')}` : '', '',`Minha ideia: ${values.get('message').trim()}`].filter((line,i,arr) => line || (i && arr[i-1])).join('\n');
    if (whatsappNumber()) {
      const link = `https://wa.me/${whatsappNumber()}?text=${encodeURIComponent(message)}`;
      window.open(link, '_blank', 'noopener,noreferrer');
      const feedback = document.querySelector('#form-feedback');
      feedback.hidden = false;
      feedback.innerHTML = `<p>Continue no WhatsApp e envie a mensagem para concluir o contato. Se a nova aba não abriu, use o link abaixo.</p><a class="text-link" href="${esc(link)}" target="_blank" rel="noopener noreferrer">Abrir conversa no WhatsApp ↗</a>`;
    } else {
      const feedback = document.querySelector('#form-feedback');
      feedback.hidden = false;
      feedback.innerHTML = `<p><strong>Seu pedido está preparado, mas não foi enviado.</strong><br>O número oficial do WhatsApp ainda não foi configurado. Copie a mensagem abaixo e envie para a Raiar pelo Instagram.</p><label for="quote-preview">Mensagem para copiar</label><textarea id="quote-preview" readonly>${esc(message)}</textarea><button class="button button-outline" type="button" id="copy-quote">Copiar pedido</button> <a class="button button-dark" href="${safeUrl(data.settings.instagram)}" target="_blank" rel="noopener noreferrer">Abrir Instagram ${arrow}</a><p id="copy-status" role="status" style="margin-top:12px"></p>`;
      document.querySelector('#copy-quote').addEventListener('click', async () => {
        try {await navigator.clipboard.writeText(message);document.querySelector('#copy-status').textContent = 'Pedido copiado. Cole e envie na conversa com a Raiar.';}
        catch {document.querySelector('#quote-preview').select();document.querySelector('#copy-status').textContent = 'Selecione o texto acima e use a opção Copiar do seu dispositivo.';}
      });
      feedback.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',block:'center'});
    }
  });
  document.querySelector('.menu-toggle').addEventListener('click', e => {
    const button = e.currentTarget;
    const open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded',String(open));
    document.querySelector('#navigation').classList.toggle('open', open);
  });
  document.addEventListener('keydown', e => {if(e.key === 'Escape') {document.querySelector('#navigation').classList.remove('open');document.querySelector('.menu-toggle').setAttribute('aria-expanded','false');}});
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => {if(e.target === dialog) {const rect = dialog.getBoundingClientRect();if(e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) dialog.close();}});
  document.querySelector('#year').textContent = new Date().getFullYear();
  const floating = document.querySelector('.floating-contact');
  if (whatsappNumber()) {floating.href = `https://wa.me/${whatsappNumber()}?text=${encodeURIComponent('Olá, Raiar! Quero conversar sobre um projeto.')}`;floating.target = '_blank';floating.rel = 'noopener noreferrer';floating.setAttribute('aria-label','Vamos conversar? WhatsApp da Raiar');}
  window.addEventListener('hashchange', () => {render();main.focus({preventScroll:true});});
  render();
})();

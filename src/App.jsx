import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown,
  Filter, MessageSquare, X,
} from 'lucide-react'

const A = `${import.meta.env.BASE_URL}assets/`
const route = (path = '/') => `#${path}`

const companyRoutes = [
  ['Карьера', '/career'],
  ['Поставщикам', '/suppliers'],
  ['Клуб Амбассадор', '/ambassadors'],
  ['Благотворительность', '/charity'],
  ['Документы', '/documents'],
]

const catalogGroups = [
  ['По основе', ['Акриловые ↗', 'Силиконовые', 'Битумные', 'Гибридные', 'Полиуретановые', 'Силокриловые', 'Силикатные']],
  ['По назначению', ['Для кровли', 'Для ванной и кухни', 'Для дымохода', 'Для автомобилей', 'Для труб', 'Универсальный']],
  ['По материалу', ['Для дерева', 'Для металла', 'Для пластика', 'Для стекла', 'Для бетона', 'Для плитки']],
  ['По цвету', ['Белый', 'Серый', 'Черный', 'Прозрачный']],
  ['Другое', ['Термостойкий', 'Влагостойкий', 'Для наружных работ', '1 компонентный', '2 компонентный', 'Резьбовой']],
]

const catalogSections = [
  'КЛЕЙ KLEIM PRO', 'ГЕРМЕТИК KLEIM PRO', 'ПЕНА МОНТАЖНАЯ',
  'ГИБРИДНЫЕ КЛЕИ И ГЕРМЕТИКИ KLEIM PRO',
  'ГЕРМЕТИКИ ДЛЯ КРОВЛИ ФАСАДОВ И ВОДОСТОКОВ', 'СПЕЦ ГЕРМЕТИКИ', 'ПИСТОЛЕТ',
]

const categories = [
  ['Клей', 'category-1.png', true], ['Герметики', 'category-2.png', true],
  ['Спец герметики', 'category-3.png', true], ['Гибридные клеи и герметики', 'category-4.png', true],
  ['Герметики для кровли, фасадов и водостоков', 'pages/catalog/2.png', false],
  ['Пена монтажная', 'figma/figma-category-product.png', false],
]

const products = [
  'Клей ПВА D3 столярный влагостойкий', 'Клей-гель моментальный цианокрилатный',
  'Клей каучуковый универсальный', 'Клей акриловый монтажный',
  'Клей ПВА профессиональный D2', 'Клей для зеркал и стекла',
  'Клей для напольных покрытий', 'Клей-герметик гибридный',
  'Клей для дерева быстросохнущий', 'Клей монтажный особопрочный',
  'Клей для ПВХ и пластика', 'Клей контактный профессиональный',
]

const articles = [
  ['Как выбрать герметик для фасада: 5 главных правил', 'Разбираем, какой герметик лучше выдержит мороз, УФ-излучение и деформацию. Сравниваем составы и даём рекомендации.'],
  ['Акриловый герметик A201: полное руководство по применению', 'Подготовка поверхности, оптимальные условия нанесения, время полимеризации и распространённые ошибки.'],
  ['Почему важно использовать профессиональные герметики', 'Срок службы, надёжность шва, экономия на переделках и отличие от товаров масс-маркета.'],
]

function useHashRoute() {
  const read = () => (window.location.hash.slice(1).split('?')[0] || '/').replace(/\/$/, '') || '/'
  const [path, setPath] = useState(read)
  useEffect(() => {
    const update = () => { setPath(read()); window.scrollTo({ top: 0 }) }
    window.addEventListener('hashchange', update)
    return () => window.removeEventListener('hashchange', update)
  }, [])
  return path
}

function Link({ to, children, ...props }) {
  return <a href={route(to)} {...props}>{children}</a>
}

function Button({ children, to = '/wholesale', dark = false, type = 'button', onClick }) {
  const content = <><span>{children}</span><img src={`${A}arrow-up-right.svg`} alt="" /></>
  if (type === 'submit') return <button className={`button ${dark ? 'button--dark' : ''}`} type="submit" onClick={onClick}>{content}</button>
  return <Link className={`button ${dark ? 'button--dark' : ''}`} to={to} onClick={onClick}>{content}</Link>
}

function CatalogMenu({ onClose }) {
  return <div className="mega-menu" role="dialog" aria-label="Каталог продукции">
    <aside className="mega-menu__sidebar">
      <nav>{catalogSections.map((item, i) => <Link className={i === 0 ? 'is-active' : ''} to="/catalog/glue" onClick={onClose} key={item}>{item}</Link>)}</nav>
      <Link className="mega-menu__client" to="/wholesale" onClick={onClose}>Оптовым клиентам <img src={`${A}arrow-up-right.svg`} alt="" /></Link>
    </aside>
    <div className="mega-menu__content">
      <div className="mega-menu__groups">{catalogGroups.map(([title, items]) => <section key={title}><h3>{title}</h3>{items.map(item => <Link to="/catalog/glue" onClick={onClose} key={item}>{item}</Link>)}</section>)}</div>
      <div className="mega-menu__side-promos">
        <Link className="mega-promo mega-promo--side" to="/packaging" onClick={onClose}><img src={`${A}menu-packaging.jpg`} alt=""/><strong>Производство<br/>упаковки</strong></Link>
        <Link className="mega-promo mega-promo--side" to="/advertising" onClick={onClose}><img src={`${A}menu-advertising.jpg`} alt=""/><strong>Рекламные<br/>материалы</strong></Link>
      </div>
      <div className="mega-menu__bottom-promos">
        <Link className="mega-promo mega-promo--wide" to="/selector" onClick={onClose}><img src={`${A}menu-sealant-guide.jpg`} alt=""/><strong>Какой герметик<br/>выбрать?</strong><span><img src={`${A}arrow-up-right.svg`} alt=""/></span></Link>
        <Link className="mega-promo mega-promo--wide" to="/selector#selector-table" onClick={onClose}><img src={`${A}menu-glue-table.jpg`} alt=""/><strong>Таблица<br/>подбора клеев</strong><span><img src={`${A}arrow-up-right.svg`} alt=""/></span></Link>
      </div>
      <nav className="mega-menu__mobile-links"><Link to="/wholesale" onClick={onClose}>Оптовым клиентам и дилерам</Link><Link to="/blog" onClick={onClose}>Блог</Link><Link to="/contacts" onClick={onClose}>Контакты</Link></nav>
    </div>
  </div>
}

function CompanyMenu({ onClose }) {
  return <nav className="company-menu" aria-label="О компании">{companyRoutes.map(([label, to]) => <Link to={to} onClick={onClose} key={to}>{label}</Link>)}</nav>
}

function Header({ overlay = false }) {
  const [catalogOpen, setCatalogOpen] = useState(false)
  const [companyOpen, setCompanyOpen] = useState(false)
  const closeMenus = () => { setCatalogOpen(false); setCompanyOpen(false) }
  useEffect(() => {
    const close = e => e.key === 'Escape' && closeMenus()
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [])
  return <>
    <header className={`header ${overlay ? '' : 'header--page'} ${catalogOpen ? 'header--menu-open' : ''}`}>
      <Link to="/" className="logo" aria-label="KLEIM PRO"><img src={`${A}logo.svg`} alt="KLEIM PRO" /></Link>
      <button className="catalog-button" onClick={() => { setCatalogOpen(!catalogOpen); setCompanyOpen(false) }} aria-expanded={catalogOpen}>
        {catalogOpen ? <X size={24} /> : <img src={`${A}menu.svg`} alt="" />}Каталог
      </button>
      <nav className="nav">
        <button className="nav__company" onClick={() => { setCompanyOpen(!companyOpen); setCatalogOpen(false) }}>О компании <ChevronDown className={companyOpen ? 'is-open' : ''} size={16} /></button>
        <Link to="/wholesale" onClick={closeMenus}>Оптовым клиентам и дилерам</Link>
        <Link to="/catalog" onClick={closeMenus}>Наша продукция</Link>
        <Link to="/blog" onClick={closeMenus}>Блог</Link><Link to="/contacts" onClick={closeMenus}>Контакты</Link>
      </nav>
      <label className="search"><img className="search__icon" src={`${A}search-new.png`} alt=""/><input aria-label="Поиск по каталогу" placeholder="Поиск по каталогу" /></label>
      <div className="header-contacts"><a href="mailto:info@kleimpro.ru">info@kleimpro.ru</a><a href="tel:+78000000000">8 (800) 000-00-00</a></div>
      <div className="messengers"><a href="https://t.me" target="_blank"><img src={`${A}telegram.svg`} alt="Telegram" />TG</a><i /><a href="https://max.ru" target="_blank"><img src={`${A}max.svg`} alt="MAX" />MAX</a></div>
      {catalogOpen && <div id="catalog-menu"><CatalogMenu onClose={closeMenus} /></div>}
      {companyOpen && <CompanyMenu onClose={closeMenus} />}
    </header>
    {catalogOpen && <button className="menu-backdrop" aria-label="Закрыть меню" onClick={closeMenus} />}
  </>
}

function Breadcrumbs({ items = [] }) {
  return <nav className="breadcrumbs"><Link to="/">Главная</Link>{items.map((item, i) => <span key={`${item}-${i}`}>/ {item}</span>)}</nav>
}

function PageIntro({ title, parent, kicker, children }) {
  return <section className="page-intro section"><Breadcrumbs items={[parent, title].filter(Boolean)} /><h1>{title}</h1>{kicker && <p className="page-intro__kicker">{kicker}</p>}{children}</section>
}

function LeadForm({ title = 'Остались вопросы?', text = 'Оставьте заявку — мы свяжемся с вами в ближайшее время', compact = false, decoration = false }) {
  const [sent, setSent] = useState(false)
  return <form className={`lead-form ${compact ? 'lead-form--compact' : ''}`} onSubmit={e => { e.preventDefault(); setSent(true) }}>
    {decoration && <div className="lead-form__media"><img src={`${A}faq-products-cutout.png`} alt="Герметики KLEIM PRO" /></div>}
    <h3>{title}</h3><p>{text}</p><input placeholder="ФИО" required /><input type="tel" placeholder="Телефон" required /><textarea placeholder="Ваш вопрос" rows="3" />
    <label className="consent"><span><Check size={16} /></span>Согласие на обработку персональных данных</label><a className="privacy" href="#privacy">Политика конфиденциальности</a>
    <button className="button form-button" type="submit">{sent ? 'Заявка отправлена' : 'Отправить заявку'}</button>
  </form>
}

function ContactSection() {
  return <section className="section contacts" id="contacts"><div className="contacts__map"><img src={`${A}figma/figma-contacts-map.png`} alt="Карта офиса KLEIM PRO" /></div><div className="contact-card"><h2>Контакты</h2><a href="tel:+78000000000">8 (800) 000-00-00</a><a href="mailto:info@kleimpro.ru">info@kleimpro.ru</a><p><img className="contact-card__marker" src={`${A}metka.png`} alt=""/>Россия, РТ, г. Бугульма,<br />ул. Нефтяников, д. 17, оф. 6</p><div className="messengers messengers--contact"><a href="https://t.me"><img src={`${A}telegram.svg`} alt="" />TG</a><i /><a href="https://max.ru"><img src={`${A}max.svg`} alt="" />MAX</a></div></div></section>
}

function Footer() {
  return <footer className="footer"><img className="footer__background" src={`${A}figma/figma-footer-background.png`} alt="" /><div className="footer__top section"><nav><Link className="footer__catalog" to="/catalog">Каталог <span>⌘</span></Link><Link to="/wholesale">Оптовым клиентам и дилерам</Link><Link to="/about">О компании</Link><Link to="/catalog">Наша продукция</Link><a href="#stores">Где нас купить</a><a href="#benefits">Преимущества</a><Link to="/blog">Блог</Link><a href="#faq">Вопросы</a><a href="#contacts">Контакты</a></nav><div className="footer__contacts"><img src={`${A}logo.svg`} alt="KLEIM PRO" /><a href="tel:+78000000000">8 (800) 000-00-00</a><a href="mailto:info@kleimpro.ru">info@kleimpro.ru</a><div className="messengers messengers--footer"><a href="https://t.me"><img src={`${A}telegram.svg`} alt="" />TG</a><i /><a href="https://max.ru"><img src={`${A}max.svg`} alt="" />MAX</a></div></div></div><div className="footer__visual"><img src={`${A}figma/figma-footer-product.png`} alt="Продукция KLEIM PRO" /></div><div className="footer__bottom section"><span>Copyright © 2026</span><a href="#rules">Правила обработки персональных данных</a><a href="#privacy">Политика конфиденциальности</a></div></footer>
}

function Shell({ children, noContacts = false, noFooter = false, className = '' }) {
  return <main id="top" className={`page ${className}`}><Header />{children}{!noContacts && <ContactSection />}{!noFooter && <Footer />}<button className="chat" aria-label="Написать нам"><MessageSquare fill="currentColor" /></button></main>
}

function ProductCard({ index = 0 }) {
  return <Link className="catalog-card" to="/product/pva-d3"><div className="catalog-card__image"><img src={`${A}pages/catalog/2.png`} alt="" /><span>{index % 3 === 0 ? 'Хит' : 'Новинка'}</span></div><div className="catalog-card__copy"><h3>{products[index % products.length]}</h3><p>Профессиональный состав для прочного и долговечного соединения.</p><b>Подробнее <ArrowRight size={16} /></b></div></Link>
}

const companySlides = [
  ['figma/figma-company-production.png', 'Производственный комплекс KLEIM PRO'],
  ['raw-08.jpg', 'Современные производственные линии'],
  ['raw-09.jpg', 'Контроль качества продукции'],
]

function CompanySection() {
  const [slide, setSlide] = useState(0)
  const move = direction => setSlide(current => (current + direction + companySlides.length) % companySlides.length)
  return <section className="section company">
    <div className="company__image">
      {companySlides.map(([src, alt], index) => <img className={index === slide ? 'is-active' : ''} src={`${A}${src}`} alt={alt} key={src} />)}
      <div className="company__arrows"><button onClick={() => move(-1)} aria-label="Предыдущий слайд"><ArrowLeft /></button><button onClick={() => move(1)} aria-label="Следующий слайд"><ArrowRight /></button></div>
    </div>
    <div className="company__copy"><h2>Собственные производственные мощности</h2><p>и передовые лаборатории, которые позволяют контролировать каждый этап создания продукции</p><div className="stats"><article><strong>2</strong><b>завода</b><span>Производят около 90% строительной химии.</span></article><article><strong>3</strong><b>лаборатории</b><span>Разрабатывают продукты и контролируют качество.</span></article></div></div>
  </section>
}

function Video({ src, poster, label, autoPlay = false }) {
  const ref = useRef(null)
  const [playing, setPlaying] = useState(false)
  const toggle = () => {
    const video = ref.current
    if (!video) return
    video.muted = true
    if (video.paused) video.play(); else video.pause()
  }
  return <div className={`video-frame ${playing ? 'is-playing' : ''} ${autoPlay ? 'video-frame--ambient' : ''}`} onClick={autoPlay ? undefined : toggle}>
    <video ref={ref} src={src} poster={poster} muted playsInline loop autoPlay={autoPlay} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
    {!autoPlay && <button className="video-play" type="button" aria-label={playing ? 'Поставить видео на паузу' : `Включить видео: ${label}`}><img src={`${A}play.png`} alt="" /></button>}
  </div>
}

function ProductionSection() {
  return <section className="section production"><div className="production__inner">
    <Video autoPlay src={`${A}production-capabilities.mp4`} poster={`${A}figma/figma-production-capabilities.png`} label="Производственные возможности" />
    <div className="production__intro"><h2>Производственные возможности</h2><p>Мы не просто выпускаем строительную химию, а предлагаем комплексные производственные решения для бизнеса.</p><Button>Оптовым клиентам</Button></div>
    <article className="glass-card"><header><b>Гибкие объёмы</b><img src={`${A}flexible-volumes.png`} alt=""/></header><p>Выпускаем как небольшие партии для запуска новых проектов, так и крупные объёмы для федеральных сетей, дилеров и промышленных предприятий.</p></article>
    <article className="glass-card glass-card--two"><header><b>Разработка и СТМ</b><img src={`${A}private-label.png`} alt=""/></header><p>Разрабатываем новые продукты, производим продукцию под собственной и частной торговой маркой.</p></article>
  </div></section>
}

const retailerImages = ['figma-retailer-01.png','figma-retailer-02.png','figma-retailer-03.png','figma-retailer-04.png','figma-retailer-05.png','figma-retailer-06.png']
function StoresSection() {
  return <section className="section stores" id="stores"><div className="retailers"><h2>Где нас<br />купить</h2>{retailerImages.map(name => <a className="retailer" href="#contacts" key={name}><img src={`${A}figma/${name}`} alt="Магазин-партнёр" /></a>)}<button>Смотреть все <ArrowRight size={18} /></button></div>
    <div className="map-visual"><img className="map-export" src={`${A}map.png`} alt="Карта присутствия KLEIM PRO" /><div className="map-stat map-stat--production"><strong>10 млн+</strong><span>Единиц<br />продукции в год</span></div><div className="map-stat map-stat--shops"><strong>5 700 +</strong><span>магазинов</span></div><div className="map-stat map-stat--regions"><strong>85</strong><span>Регионов</span></div><div className="map-stat map-stat--cities"><strong>300+</strong><span>Городов</span></div></div>
  </section>
}

function BenefitsSection() {
  return <section className="section benefits" id="benefits"><h2>Ключевые преимущества</h2><div className="benefits__layout"><div className="benefits__copy">
    <article><span>01</span><div><h3>Разнообразный ассортимент</h3><p>Для большого числа задач: под разные основы и материалы, под широкий диапазон климатических условий и, конечно же, большая палитра цветовых решений.</p></div></article>
    <article><span>02</span><div><h3>Доверие покупателей</h3><p>Обеспечивается нашими главными свойствами — стабильность, качество и объективная ценовая политика.</p></div></article>
    <article><span>03</span><div><h3>20 лет</h3><p>Производим высококачественную продукцию.</p></div></article>
  </div><div className="benefits__photo"><Video src={`${A}key-benefits.mp4`} poster={`${A}figma/figma-benefits-media.png`} label="Ключевые преимущества" /></div></div></section>
}

function BlogSection() {
  const ref = useRef(null)
  const [edge,setEdge]=useState({start:true,end:false})
  const images = ['raw-08.jpg', 'raw-09.jpg', 'raw-10.jpg', 'raw-17.jpg']
  const slides = articles.concat(articles)
  const scroll = direction => ref.current?.scrollBy({ left: direction * Math.min(ref.current.clientWidth, 620), behavior: 'smooth' })
  const updateEdges=()=>{const el=ref.current;if(!el)return;setEdge({start:el.scrollLeft<=2,end:el.scrollLeft+el.clientWidth>=el.scrollWidth-2})}
  useEffect(()=>{updateEdges();window.addEventListener('resize',updateEdges);return()=>window.removeEventListener('resize',updateEdges)},[])
  return <section className="section blog"><div className="section-heading"><h2>Наш блог</h2><Link to="/blog">Смотреть все <ArrowRight size={18} /></Link></div><div className="article-grid" ref={ref} onScroll={updateEdges}>{slides.map(([title,text], index) => <article key={`${title}-${index}`}><img src={`${A}${images[index % images.length]}`} alt="" /><div><h3>{title}</h3><p>{text}</p><span>02.07.2026</span></div></article>)}</div><div className="blog__arrows slider-buttons"><button className={edge.start?'is-inactive':''} disabled={edge.start} onClick={() => scroll(-1)} aria-label="Назад"><ArrowLeft /></button><button className={edge.end?'is-inactive':''} disabled={edge.end} onClick={() => scroll(1)} aria-label="Вперёд"><ArrowRight /></button></div></section>
}

const faqItems = [
  ['Для каких работ подходит акриловый герметик A201?', 'Акриловый герметик KLEIM PRO A201 — это универсальный морозостойкий герметик для внутренних и наружных работ.'],
  ['Можно ли использовать герметики KLEIM PRO при отрицательных температурах?', 'Да, отдельные составы рассчитаны на применение при отрицательных температурах. Условия указаны на упаковке продукта.'],
  ['Какой срок годности у герметиков и клеевых систем KLEIM PRO?', 'Срок годности зависит от продукта и указывается на упаковке. Храните продукцию в рекомендованных условиях.'],
  ['В чём отличие акриловых герметиков от силиконовых?', 'Акриловые составы можно окрашивать, а силиконовые лучше подходят для зон с постоянной влажностью.'],
  ['Нужно ли грунтовать поверхность перед нанесением герметика?', 'Пористые и сильно впитывающие поверхности рекомендуется предварительно подготовить.'],
  ['Как правильно хранить герметики KLEIM PRO?', 'В сухом помещении, вдали от прямого солнца и в температурном диапазоне, указанном на упаковке.'],
]
function FaqSection() {
  const [open, setOpen] = useState(0)
  return <section className="section faq" id="faq"><h2>Часто задаваемые вопросы</h2><div className="faq__layout"><div className="accordions">{faqItems.map(([question,answer], index) => <article className={open === index ? 'is-open' : ''} key={question}><button onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}>{question}<i /></button><div><p>{answer}</p></div></article>)}</div><LeadForm decoration title="Остались вопросы?" text="Оставьте заявку — мы свяжемся с вами в ближайшее время" /></div></section>
}

function Home() {
  return <main id="top"><section className="hero"><img className="hero__background" src={`${A}figma/figma-hero.png`} alt="" /><Header overlay /><div className="hero__shade" /><button className="hero__play" aria-label="Воспроизвести видео"><img src={`${A}play.png`} alt=""/></button><div className="hero__content"><div className="eyebrow"><span />Более 500 позиций в наличии</div><h1>Производство<br />профессиональных<br />герметиков<br />и клеевых систем</h1><p>Надежный производитель строительной химии для бизнеса. Стабильное качество, собственное производство и поставки по всей России.</p><Button>Оптовым клиентам и дилерам</Button></div></section>
    <CompanySection />
    <section className="section partners"><h2>Лучшие условия для партнёров</h2><div className="partner-grid">{[['figma-partner-full-cycle.png','Производитель полного цикла'],['figma-partner-stm.png','Производство под СТМ'],['figma-partner-stock.png','Постоянное наличие'],['figma-partner-wholesale.png','Оптовые цены'],['figma-partner-documents.png','Документы']].map(([img,title])=><Link className="partner-card" to="/wholesale" key={title}><img src={`${A}figma/${img}`} alt=""/><div><h3>{title}</h3><p>Собственные заводы, лаборатории и стабильные поставки.</p></div></Link>)}<LeadForm compact title="Лучшие условия" text="Оставьте заявку и мы предложим лучшие цены." /></div></section>
    <ProductionSection />
    <section className="section products"><div className="section-heading"><h2>Наша продукция</h2><Link to="/catalog">Смотреть все <ArrowRight size={18}/></Link></div><div className="product-grid">{[1,2,3,4].map(i=><Link to="/catalog" key={i}><img src={`${A}category-${i}.png`} alt="Категория продукции"/></Link>)}</div></section>
    <StoresSection /><BenefitsSection /><BlogSection /><FaqSection />
    <ContactSection /><Footer /><button className="chat"><MessageSquare fill="currentColor" /></button></main>
}

function CategoriesPage() {
  return <Shell className="categories-page"><PageIntro title="Все товары" /><section className="section category-list">{categories.map(([title,img,complete])=><Link className={`category-tile ${complete ? 'category-tile--complete' : ''}`} to="/catalog/glue" key={title}>{!complete && <h2>{title}</h2>}<img src={`${A}${img}`} alt={title}/></Link>)}</section></Shell>
}

const catalogFilterGroups = [
  ['Назначение', ['Монтажный', 'Универсальный', 'Кровельный']],
  ['Основа', ['Акриловый', 'Битумный', 'Гибридный', 'Каучуковый', 'Полиуретановый', 'Цианоакрилатный', 'Эпоксидный']],
  ['Цвет', ['Прозрачный', 'Белый', 'Бежевый', 'Черный']],
]

function CatalogProductCard({ index }) {
  const colors = index % 3 === 0 ? ['#fff'] : index % 3 === 1 ? ['#fff','#f3f3f3','#ffd8ba','#282828'] : ['#ffd8ba']
  return <Link className="catalog-product" to="/product/pva-d3"><div className="catalog-product__image"><img src={`${A}pages/catalog/2.png`} alt="Двухкомпонентный быстрый клей-спрей-активатор" /></div><div className="catalog-product__body"><h3>Двухкомпонентный быстрый<br />клей-спрей-активатор</h3><div className="catalog-product__sizes"><span>200 мл + 50 гр</span>{index % 3 !== 1 && <span>400 мл + 100 гр</span>}</div><div className="catalog-product__bottom"><div className="catalog-product__colors">{colors.map((color,i)=><i style={{background:color}} key={`${color}-${i}`} />)}</div>{index === 0 && <b><ArrowRight size={22}/></b>}</div></div></Link>
}

function CatalogPage() {
  const [filtersOpen,setFiltersOpen]=useState(false)
  return <Shell className="catalog-page"><section className="section catalog-head"><h1>Клей</h1><div className="catalog-head__row"><nav>{['Клей','Герметики','Спец герметики','Гибридные клеи и герметики','Герметики для кровли фасадов и водостоков','Пена монтажная'].map((item,i)=><button className={i===0?'is-active':''} key={item}>{item}</button>)}</nav><Link to="/selector">Подобрать герметик <ArrowRight size={16}/></Link></div></section><section className="section catalog-layout"><button className="filter-mobile" onClick={()=>setFiltersOpen(!filtersOpen)}><Filter size={18}/> Фильтр</button><aside className={`filters ${filtersOpen?'is-open':''}`}><h3><Filter size={17}/> Фильтр</h3>{catalogFilterGroups.map(([title,values],groupIndex)=><div className="filter-group" key={title}><h4>{title}</h4>{values.map((value,index)=><label key={value}><input type="checkbox" defaultChecked={index===0 && groupIndex!==1}/><span />{value}</label>)}</div>)}<div className="filter-group filter-tags"><h4>Компоненты</h4><button className="is-active">Двухкомпонентный</button><button>Однокомпонентный</button></div><div className="filter-group filter-tags"><h4>Серия</h4>{['Серия 1','Серия 2','Серия 23','Серия 333'].map((item,i)=><button className={i===0?'is-active':''} key={item}>{item}</button>)}</div><div className="filter-group filter-tags"><h4>Объем / Вес</h4>{['1000 мл','20 г','20 мл','200 мл','20 г','1000 мл','6 мл','3 г','200 мл','200 мл','1000 мл'].map((item,i)=><button className={i===0?'is-active':''} key={`${item}-${i}`}>{item}</button>)}</div><button className="filter-apply">Применить <Check size={16}/></button><button className="filter-reset">Сбросить фильтры <X size={16}/></button></aside><div className="catalog-products"><div className="catalog-grid">{Array.from({length:12},(_,i)=><CatalogProductCard index={i} key={i}/>)}</div><nav className="catalog-pagination"><button><ChevronDown size={15}/></button>{[1,2,3,4].map(n=><button className={n===2?'is-active':''} key={n}>{n}</button>)}<span>…</span><button>7</button><button className="catalog-pagination__next">Вперед <ChevronDown size={15}/></button></nav></div></section></Shell>
}

function ProductPage() {
  const [color,setColor]=useState('Белый')
  return <Shell><section className="section product-detail"><Breadcrumbs items={['Каталог','Герметики']} /><div className="product-detail__hero"><div className="product-gallery"><img src={`${A}pages/catalog/2.png`} alt="Клей KLEIM PRO" /></div><div className="product-summary"><span>Артикул: 2025-П38</span><h1>Клей ПВА D3 столярный влагостойкий</h1><p>Двухкомпонентный быстрый клей: спрей-активатор KLEI’M PRO и клей-гель моментальный цианокрилатный.</p><ul><li>Защита от плесени и грибка</li><li>Постоянная эластичность</li><li>Не трескается</li><li>Без запаха</li></ul><h4>Цвет</h4><div className="color-picker">{['Белый','Серый','Бежевый','Прозрачный'].map(c=><button className={color===c?'is-active':''} onClick={()=>setColor(c)} key={c}>{c}</button>)}</div><div className="buy-row"><Button to="/contacts">Купить оптом</Button><a className="button button--dark" href="https://www.vseinstrumenti.ru" target="_blank">ВсеИнструменты</a></div></div></div>
    <section className="product-block"><h2>Технические характеристики</h2><div className="spec-grid">{[['Плотность','не менее 0,95 г/см³'],['Время пленкообразования','3–15 минут'],['Скорость полимеризации','2 мм/сутки'],['Температура эксплуатации','от −40°С до +150°С'],['Водостойкость','100%'],['Срок годности','24 месяца']].map(([a,b])=><p key={a}><span>{a}</span><b>{b}</b></p>)}</div></section>
    <section className="product-block product-application"><div><h2>Применение</h2><p>Набор применяется для склеивания, ремонта и фиксации древесины, МДФ, ДСП, резины, кожи, стекла, металла и большинства пластмасс.</p></div><img src={`${A}pages/product/1.png`} alt="Применение клея"/></section>
    <section className="product-block"><h2>Документация</h2><DocumentGrid small /></section><section className="product-block question-block"><LeadForm title="Задайте ваш вопрос" text="Наш консультант ответит в течение 30 минут" /></section></section></Shell>
}

function SimilarProductsCarousel(){
  const trackRef=useRef(null)
  const [edge,setEdge]=useState({start:true,end:false})
  const updateEdges=()=>{const el=trackRef.current;if(!el)return;setEdge({start:el.scrollLeft<=2,end:el.scrollLeft+el.clientWidth>=el.scrollWidth-2})}
  const move=direction=>trackRef.current?.scrollBy({left:direction*Math.min(trackRef.current.clientWidth*.78,760),behavior:'smooth'})
  useEffect(()=>{updateEdges();window.addEventListener('resize',updateEdges);return()=>window.removeEventListener('resize',updateEdges)},[])
  return <section className="section similar-products"><div className="section-heading"><h2>Похожие товары</h2><div className="slider-buttons similar-products__arrows"><button className={edge.start?'is-inactive':''} disabled={edge.start} onClick={()=>move(-1)} aria-label="Назад"><ArrowLeft/></button><button className={edge.end?'is-inactive':''} disabled={edge.end} onClick={()=>move(1)} aria-label="Вперёд"><ArrowRight/></button></div></div><div className="similar-products__track" ref={trackRef} onScroll={updateEdges}>{[0,1,2,3,4].map(i=><CatalogProductCard index={i} key={i}/>)}</div></section>
}

function ProductPageV2() {
  const [seamLength,setSeamLength]=useState('1')
  const [depth,setDepth]=useState('10')
  const [width,setWidth]=useState('10')
  const [calculated,setCalculated]=useState(false)
  const consumption=Math.max(1,Math.ceil((Number(seamLength)||0)*(Number(depth)||0)*(Number(width)||0)/300))
  const specs=[['Плотность г/см³','не менее 0,95'],['Время пленкообразования','3–15 минут'],['Скорость полимеризации','2 мм/сутки'],['Твердость по ШОР А, усл. ед.','20±5'],['Условная прочность при разрыве, МПа','не менее 0,8'],['Возможность к деформации, %','до 25'],['Водостойкость, %','100'],['Расход 1 картриджа, полоса диаметром 5 мм','от 12 до 14 м/п'],['Температура эксплуатации','от −40°C до +150°C']]
    return <Shell className="product-page-v2"><section className="section product-overview"><div className="product-overview__visual"><img src={`${A}pages/catalog/2.png`} alt="Клей ПВА D3 столярный влагостойкий"/><span>В коробке<br/><b>12 штук</b></span></div><div className="product-overview__copy"><small>Артикул: 2025-П38</small><h1>Клей ПВА D3 столярный влагостойкий</h1><p>Двухкомпонентный быстрый клей: спрей-активатор KLEI’M PRO (прозрачный) + клей-гель моментальный цианоакрилатный KLEI’M PRO (прозрачный).</p><p>Набор предназначен для склеивания, ремонта и фиксации всех видов древесины и деревянных элементов (МДФ, ДСП и т.п.), а также резины, кожи, стекла, металла (в том числе алюминия) и большинства пластмасс. Клей бесцветный, не капает и не оседает, обладает высокой прочностью сцепления, легко наносится и даёт быстрый результат. Подходит для вертикальных поверхностей, идеален как для пористых, так и для гладких оснований. Активатор ускоряет схватывание. Термостойкость клеевого соединения — от −20 °C до +70 °C, температура нанесения и применения — от +5 °C до +35 °C.</p><div className="product-features">{['Защита от плесени и грибка','Постоянная эластичность','Тиксотропный — не трескается','Не токсичен, без запаха'].map((item,i)=><article key={item}><img src={`${A}product-feature-${i+1}.png`} alt=""/><span>{item}</span></article>)}</div><div className="product-life"><b>Срок годности</b><span>24 месяца / 18 месяцев</span></div><div className="product-colors"><b>Цвет</b><div>{[['#fff','Белый'],['repeating-linear-gradient(90deg,#fff 0 3px,#ddd 3px 4px)','Прозрачный'],['#d7d7d7','Серый'],['#ffe1b7','Бежевый']].map(([color,label])=><span key={label}><i style={{background:color}}/>{label}</span>)}</div></div><div className="product-buy"><a href="https://www.vseinstrumenti.ru" target="_blank" rel="noreferrer"><span>Купить на ВсеИнструменты</span><img src={`${A}vseinstrumenti.png`} alt="ВсеИнструменты"/></a><Link to="/contacts">Купить оптом <ArrowRight size={18}/></Link></div></div></section>
    <section className="section product-specs"><h2>Технические характеристики</h2><div>{specs.map(([name,value])=><p key={name}><span>{name}</span><b>{value}</b></p>)}</div></section>
    <section className="section product-use"><div className="product-tabs"><button className="is-active">Применение</button><button>Свойства</button><p>Двух-компонентный набор «Клей-Спрей-Активатор (аэрозоль)», состоящий из «Активатора» и «Клея-геля моментального цианоакрилатного». Высокой вязкости, применяется для склеивания, ремонта и фиксации всех видов древесины и деревянных элементов, а также резины, кожи, стекла, металла и пластмасс.</p></div><div className="storage-note"><img src={`${A}storage-icon.png`} alt=""/><p>Хранение и транспортировка<br/><b>Осуществляются в сухом прохладном месте при температуре от +5° до +25°C</b></p></div></section>
    <section className="section application-guide"><img src={`${A}product-application.png`} alt="Нанесение герметика"/><div><h2>Указания<br/>по применению</h2><p>Поверхность должна быть сухая и чистая, без пыли, грязи, ржавчины и жира. Распылите активатор ровным слоем на одну из поверхностей и дайте ему испариться. Нанесите клей на другую поверхность. Соедините детали и удерживайте их вместе в течение нескольких секунд.</p></div></section>
    <section className="section product-documents"><h2>Документация</h2><div>{['Лист технической информации','Отказное письмо / Декларация соответствия','Экспертное заключение','Паспорт безопасности','Свидетельство о государственной регистрации','Сертификат соответствия','Протокол испытаний'].map((item,i)=><a href={`${A}pages/documents/${(i%7)+1}.png`} download key={item}><img src={`${A}pdf-new.png`} alt="PDF"/><span>{item}</span><b><ArrowUpRight size={17}/></b></a>)}</div></section>
    <section className="section product-questions"><div className="questions-feed"><h2>Вопросы</h2><article className="question-author"><span>И</span><p><b>Иван В.</b><small>01.07.2026</small></p></article><p className="question-message">Важный вопрос. Какой клей подойдет для дерева?</p><div className="question-answer"><article><img src={`${A}kleim-avatar.png`} alt="KLEIM PRO"/><p><b>Мастер Кляйн</b><small>01.07.2026</small></p></article><p>Добрый день. Да, универсальный высококачественный клей на водной основе, предназначенный для надёжного склеивания древесины и других материалов. Он обеспечивает прочное и долговечное соединение, обладает быстрым начальным схватыванием и полностью высыхает за короткое время. После высыхания клей становится прозрачным и не оставляет видимых следов. Клей удобен в нанесении, легко распределяется кистью или шпателем, экологически безопасен и не содержит токсичных растворителей.</p></div><button>Показать еще 4</button></div><form className="question-form" onSubmit={e=>e.preventDefault()}><h3>Задайте ваш вопрос</h3><p>И наш консультант ответит в течение 30 минут</p><input placeholder="Ваше имя"/><input type="email" placeholder="E-mail"/><textarea placeholder="Ваш вопрос"/><label><input type="checkbox" defaultChecked/> Согласие на обработку персональных данных</label><button>Задать вопрос</button></form></section>
    <section className="section usage-calculator"><h2>Калькулятор<br/>расхода</h2><div className="calculator-fields"><label>Длина шва (мм)<input value={seamLength} onChange={e=>setSeamLength(e.target.value)}/></label><label>Толщина шва (мм)<input value={depth} onChange={e=>setDepth(e.target.value)}/></label><label>Ширина шва (мм)<input value={width} onChange={e=>setWidth(e.target.value)}/></label><button onClick={()=>setCalculated(true)}>Рассчитать</button></div><div className="calculator-results"><p>Нужно покупать при заданной толщине шва, шт <b>{calculated?consumption:1}</b></p><p>Нужно покупать при рекомендуемой толщине шва, шт <b>{calculated?Math.max(1,Math.ceil(consumption*.8)):1}</b></p><p>Рекомендуемая толщина заполнения шва (мм) <b>10</b></p></div></section>
    <SimilarProductsCarousel/>
    <section className="section individual"><h2>Индивидуальный<br/>подход</h2><div className="individual__visual"><img src={`${A}pages/product/1.png`} alt="Герметик KLEIM PRO"/><span>Подберём для вас продукт под конкретные условия применения</span></div><LeadForm decoration title="Оставьте заявку" text="На индивидуальное решение"/></section>
  </Shell>
}

function useHorizontalSlider(step=420){
  const ref=useRef(null)
  const [edge,setEdge]=useState({start:true,end:false})
  const update=()=>{const el=ref.current;if(!el)return;setEdge({start:el.scrollLeft<=2,end:el.scrollLeft+el.clientWidth>=el.scrollWidth-2})}
  const move=direction=>ref.current?.scrollBy({left:direction*Math.min(step,ref.current.clientWidth*.85),behavior:'smooth'})
  useEffect(()=>{update();window.addEventListener('resize',update);return()=>window.removeEventListener('resize',update)},[])
  return {ref,edge,move,update}
}

function AboutPage() {
  const [productionSlide,setProductionSlide]=useState(0)
  const contributionSlider=useHorizontalSlider(460)
  const teamSlider=useHorizontalSlider(420)
  const innovations=[['raw-08.jpg','Запатентованные составы'],['raw-19.png','Экологично, просто, продуманно'],['pages/about/4.png','Автоматизация процессов']]
  const contributions=[['raw-10.jpg','Продвижение инноваций'],['raw-19.png','Разработка отраслевых стандартов'],['raw-14.jpg','Повышение квалификации'],['raw-08.jpg','Развитие профессионального сообщества'],['pages/about/4.png','Новые технологии производства']]
  const team=[['about-team.jpg','Александр Александрович','Директор'],['about-team.jpg','Сергей Васильевич','Технолог'],['about-team.jpg','Валерия Сергеевна','Менеджер по продажам'],['about-team.jpg','Алексей Петрович','Менеджер']]
  return <Shell className="about-page"><section className="section about-intro"><h1>Производитель<br/>профессиональной<br/>строительной химии</h1><div className="about-intro__visual"><img src={`${A}about-hero.png`} alt="Герметик KLEIM PRO"/><article className="about-years"><strong>20+</strong><b>лет</b><p>Разрабатываем и производим герметики, клеи, монтажные пены и специализированные составы для строительства, промышленности и профессионального ремонта.</p></article><article className="about-product-note"><img src={`${A}logo.svg`} alt="KLEIM PRO"/><p>Профессиональная линейка компании Master Klein, объединяющая современные технологии, собственное производство и строгий контроль качества.</p><Link to="/wholesale">Оптовым клиентам и дилерам <span>↗</span></Link></article></div></section>
    <section className="section about-production"><div className="about-production__image">{companySlides.map(([src,alt],index)=><img className={index===productionSlide?'is-active':''} src={`${A}${src}`} alt={alt} key={src}/>)}<div className="company__arrows"><button onClick={()=>setProductionSlide(value=>(value-1+companySlides.length)%companySlides.length)}><ArrowLeft/></button><button onClick={()=>setProductionSlide(value=>(value+1)%companySlides.length)}><ArrowRight/></button></div></div><div className="about-production__stats">{[['2','завода в России','Производящие около 90% строительной химии, используемой в стройке и ремонте.'],['3','лаборатории','По разработке инновационных продуктов и контролю качества продукции.'],['2','логистических комплекса','Обеспечивающих удобную логистику для большей части наших клиентов.'],['1 000+','наименований продукции','Комплексные решения для строительства, производства и ремонта.']].map(([n,label,text])=><article key={label}><strong>{n}</strong><span>{label}</span><p>{text}</p></article>)}</div></section>
    <section className="section about-innovations"><h2>Инновации<br/>в производстве</h2><div>{innovations.map(([image,title])=><article key={title}><img src={`${A}${image}`} alt=""/><div><h3>{title}</h3><p>Современные разработки обеспечивают долговечность и надёжность продукции, выделяя компанию среди конкурентов.</p></div></article>)}</div></section>
    <section className="section about-quality"><div className="about-quality__media"><div className="about-quality__side"><h2>Система контроля<br/>качества</h2><div><img src={`${A}pages/documents/2.png`} alt="Сертификат ISO"/><img src={`${A}pages/documents/2.png`} alt="Сертификат ISO"/></div></div><figure><img src={`${A}about-quality.jpg`} alt="Контроль качества на производстве"/><figcaption><strong>680</strong><span>Аудитов</span></figcaption></figure></div><div className="about-quality__points">{[['01','Контроль над маршрутами','Является одним из ключевых факторов, усиливающих скорость доставки и повышающих эффективность логистических процессов.'],['02','Международные сертификаты','Наличие международных сертификатов ISO 9001 и ГОСТ Р подтверждает соответствие продукции строгим требованиям отрасли.'],['03','Надёжность продукции','В 2023 году проведено 680 аудитов, по итогам которых количество рекламаций не превысило 0,25%.']].map(([n,title,text])=><article key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="section about-fleet"><img src={`${A}about-fleet.jpg`} alt="Собственный автопарк KLEIM PRO"/><div className="about-fleet__intro"><h2>Собственный<br/>автопарк</h2><p>Является одним из ключевых факторов, усиливающих скорость доставки и повышающих эффективность логистических процессов.</p></div><div className="about-fleet__note"><header><b>Контроль перевозок</b><img src={`${A}transport-control.png`} alt=""/></header><p>Владение собственным парком транспортных средств предоставляет компании полный контроль над маршрутами и графиками отгрузок.</p></div></section>
    <section className="section about-map"><img src={`${A}map-section.png`} alt="5700 магазинов, 85 регионов и 300 городов присутствия KLEIM PRO"/></section>
    <section className="section about-contribution"><div className="section-heading"><h2>Вклад в развитие<br/>отрасли</h2><div className="slider-buttons about-slider-buttons"><button className={contributionSlider.edge.start?'is-inactive':''} disabled={contributionSlider.edge.start} onClick={()=>contributionSlider.move(-1)}><ArrowLeft/></button><button className={contributionSlider.edge.end?'is-inactive':''} disabled={contributionSlider.edge.end} onClick={()=>contributionSlider.move(1)}><ArrowRight/></button></div></div><div className="about-scroll-track" ref={contributionSlider.ref} onScroll={contributionSlider.update}>{contributions.map(([image,title])=><article key={title}><img src={`${A}${image}`} alt=""/><div><h3>{title}</h3><p>Активное участие в профессиональных инициативах способствует развитию инноваций и расширению профессиональных контактов.</p></div></article>)}</div></section>
    <BlogSection/>
    <section className="section about-team"><div className="about-team__side"><h2>Наша<br/>команда</h2><div className="slider-buttons about-slider-buttons"><button className={teamSlider.edge.start?'is-inactive':''} disabled={teamSlider.edge.start} onClick={()=>teamSlider.move(-1)}><ArrowLeft/></button><button className={teamSlider.edge.end?'is-inactive':''} disabled={teamSlider.edge.end} onClick={()=>teamSlider.move(1)}><ArrowRight/></button></div></div><div className="about-team__track" ref={teamSlider.ref} onScroll={teamSlider.update}>{team.map(([image,name,role],index)=><article key={`${name}-${index}`}><img src={`${A}${image}`} alt={name}/><div><h3>{name}</h3><span>{role}</span></div></article>)}</div></section>
  </Shell>
}

function WholesalePage() {
  const [sent,setSent]=useState(false)
  const productsRef=useRef(null)
  const conditions=[
    'Мы предлагаем выгодные условия для оптовых клиентов и дилеров: гибкую систему скидок, индивидуальные прайс-листы, отсрочку платежа и приоритетную отгрузку.',
    'Работаем напрямую с производства, без посредников.',
    'Обеспечиваем стабильные поставки, маркетинговую поддержку и обучение вашего персонала работе с продукцией KLEIM PRO.',
  ]
  const benefits=[
    ['figma/figma-partner-wholesale.png','Профессиональная продукция','Вы получаете доступ к линейке герметиков и клеевых систем европейского качества, разработанных для профессионального применения.'],
    ['figma/figma-partner-stm.png','Полная поддержка','Мы предоставляем рекламные материалы, образцы продукции и техническую поддержку на всех этапах сотрудничества.'],
    ['figma/figma-partner-stock.png','Развитие продаж','Помогаем увеличивать ваши продажи и выстраиваем долгосрочное взаимовыгодное партнёрство.'],
  ]
  const scrollProducts=direction=>productsRef.current?.scrollBy({left:direction*420,behavior:'smooth'})
  return <Shell className="wholesale-page">
    <section className="section wholesale-intro"><h1>Оптовым клиентам<br/>и дилерам</h1><div className="wholesale-badge"><span>Для<br/>оптовых<br/>партнёров</span><img src={`${A}wholesale-logo.jpg`} alt="KLEIM PRO"/></div><img className="wholesale-intro__image" src={`${A}wholesale-sales.jpg`} alt="Оптовые продажи KLEIM PRO"/></section>
    <section className="section wholesale-conditions"><h2>Условия<br/>сотрудничества</h2><div className="wholesale-condition-grid">{conditions.map((text,index)=><article key={text}><strong>0{index+1}</strong><p>{text}</p></article>)}</div></section>
    <section className="section wholesale-statement"><b>Развитие вместе с KLEIM PRO</b><p>Мы заинтересованы в долгосрочном сотрудничестве. Предоставляем всё необходимое для успешной работы: конкурентные цены, поддержку продаж, обучение и маркетинговые инструменты.</p></section>
    <section className="section wholesale-benefits"><h2>Преимущества<br/>партнёрства</h2><div>{benefits.map(([image,title,text])=><article key={title}><img src={`${A}${image}`} alt=""/><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>
    <section className="section wholesale-logistics"><div><h2>Логистика<br/>и поставки</h2><p>Отгружаем продукцию со склада в кратчайшие сроки. Доставляем по всей России транспортными компаниями или собственным транспортом. Возможна отгрузка в день заказа при наличии товара на складе. Мы берём на себя организацию логистики, чтобы вы могли сосредоточиться на продажах.</p></div><img src={`${A}wholesale-logistics.jpg`} alt="Логистика и поставки KLEIM PRO"/></section>
    <section className="section wholesale-request"><div className="wholesale-request__visual"><h2>Хотите стать оптовым<br/>клиентом?</h2><img src={`${A}pages/product/1.png`} alt="Герметик KLEIM PRO"/></div><form onSubmit={event=>{event.preventDefault();setSent(true)}}><img src={`${A}faq-products-cutout.png`} alt="Продукция KLEIM PRO"/><div><h3>Заполните форму</h3><p>И мы с вами свяжемся</p><input required placeholder="ФИО"/><input required type="tel" placeholder="Телефон"/><textarea rows="3" placeholder="Ваш вопрос"/><label><input type="checkbox" defaultChecked/> Согласие на обработку персональных данных</label><a href="#privacy">Политика конфиденциальности</a><button type="submit">{sent?'Заявка отправлена':'Отправить заявку'}</button></div></form></section>
    <section className="section wholesale-products"><div className="section-heading"><h2>Товары подходящие<br/>для вас</h2><div className="slider-buttons"><button onClick={()=>scrollProducts(-1)} aria-label="Назад"><ArrowLeft/></button><button onClick={()=>scrollProducts(1)} aria-label="Вперёд"><ArrowRight/></button></div></div><div className="wholesale-products__track" ref={productsRef}>{[0,1,2,3,4].map(index=><CatalogProductCard index={index} key={index}/>)}</div></section>
  </Shell>
}

function PackagingCard({ title, colors=['Белый','Чёрный'], compact=false }) {
  const bottleRows={
    'Бутылка купольная':[['0,25','22','145','55'],['0,5','34','190','65'],['1,0','58','235','80']],
    'Бутылка ПВА D36':[['0,33','24','125','65'],['1,0','58','230','80']],
    'Бутылка прозрачная':[['0,2','22','150','55'],['0,4','22','195','60'],['0,5','22','220','60'],['0,75','34','225','75'],['1,0','34','250','80']]
  }
  const bottleTable=bottleRows[title]
  const specs=compact?[["Материал","ПНД (HDPE)"],["Диаметр горла","28 мм"],["Вес","4 г"],["Высота","35 мм"]]:[["Материал","ПНД (HDPE)"],["Объём","310 мл"],["Вес","46 г"],["Высота","215 мм"],["Диаметр резьбы","15 мм"]]
  const visibleSpecs=bottleTable?[["Материал","ПНД (HDPE)"],["Диаметр горла","28 мм"],["Высота горла","16 мм"]]:specs
  return <article className="packaging-card"><div className="packaging-card__image"><img src={`${A}packaging-cartridges.jpg`} alt={title}/></div><div className="packaging-card__body"><h3>{title}</h3><div className="packaging-card__specs">{visibleSpecs.map(([name,value])=><p key={name}><span>{name}</span><b>{value}</b></p>)}</div>{bottleTable?<div className="packaging-card__volume"><div><b>Объём, л</b><b>Вес, г</b><b>Высота, мм</b><b>Диаметр, мм</b></div>{bottleTable.map((row,index)=><div key={index}>{row.map((value,i)=><span key={i}>{value}</span>)}</div>)}</div>:<div className="packaging-card__colors"><small>Доступные цвета</small><div>{colors.map((color,index)=><span key={color}><i className={`packaging-color packaging-color--${['white','black','red','blue'][index%4]}`}/>{color}</span>)}</div></div>}</div></article>
}

function PackagingPage(){
  const [sent,setSent]=useState(false)
  const sections=[
    {tag:'Картриджи и комплектующие',title:'Картриджи, носики, колпачки, поршни',text:'Стандартная комплектация картриджа 310 мл под герметики и клеевые составы.',items:['Картриджи','Носик-дозатор','Колпачки']},
    {tag:'Крышки с дозатором',title:'Колпачки-дозаторы «Пирамидка» и поршень',text:'Резьбовые дозирующие колпачки под разные диаметры горла бутылки.',items:['Пирамидка','Пирамидка ПВА D36','Поршень']},
    {tag:'Бутылки',title:'Три линейки бутылок под разные составы',text:'Купольная усиленная, ПВА D36 и прозрачная — с полной размерной сеткой.',items:['Бутылка купольная','Бутылка ПВА D36','Бутылка прозрачная']},
    {tag:'Завинчивающиеся крышки',title:'Крышка «Пуш-пулл»',text:'Финальный элемент упаковки для бутылок прозрачной и купольной линеек.',items:['Крышка «Пуш-пулл»']},
  ]
  return <Shell className="packaging-page"><section className="section packaging-hero"><div className="packaging-hero__heading"><h1>Упаковка под<br/>ваш продукт</h1><div className="wholesale-badge"><span>Для<br/>оптовых<br/>партнёров</span><img src={`${A}wholesale-logo.jpg`} alt="KLEIM PRO"/></div></div><div className="packaging-hero__visual"><img src={`${A}packaging-hero.jpg`} alt="Упаковка под ваш продукт"/><div className="packaging-hero__note">Картриджи, бутылки, носики-дозаторы, колпачки и крышки собственного производства — с точными характеристиками по весу, высоте и диаметру.</div><div className="packaging-manager"><img src={`${A}packaging-operator-2.png`} alt="Персональный менеджер"/><p>Полные тех. карты — у вашего персонального менеджера</p><Link to="/contacts">Оставить заявку <span>↗</span></Link></div></div></section>{sections.map((section,index)=><section className="section packaging-group" key={section.title}><span className="packaging-tag">⌁ {section.tag}</span><h2>{section.title}</h2><p>{section.text}</p><div className={`packaging-grid ${section.items.length===1?'packaging-grid--single':''}`}>{section.items.map(item=><PackagingCard title={item} compact={index===1||index===3} colors={index===2?['Белый','Прозрачный']:index===3?['Красно-белая','Сине-белая']:['Белый','Чёрный','Красный'] } key={item}/>)}</div></section>)}<section className="section packaging-request"><div><h2>Соберём для вас<br/>пакет рекламной<br/>продукции под ваш<br/>объём закупок</h2><img src={`${A}packaging-merch.jpg`} alt="Мерч KLEIM PRO"/></div><form onSubmit={event=>{event.preventDefault();setSent(true)}}><img src={`${A}faq-products-cutout.png`} alt="Продукция KLEIM PRO"/><div><h3>Оставьте контакты</h3><p>И персональный менеджер свяжется с вами, подберёт позиции и расскажет об условиях бонусной программы.</p><input required placeholder="ФИО"/><input required type="tel" placeholder="Телефон"/><textarea rows="3" placeholder="Ваш вопрос"/><label><input type="checkbox" defaultChecked/> Согласие на обработку персональных данных</label><a href="#privacy">Политика конфиденциальности</a><button type="submit">{sent?'Заявка отправлена':'Отправить заявку'}</button></div></form></section></Shell>
}

const promoConfigs={
  advertising:{title:'Рекламные материалы для продвижения продукции KLEI’M PRO',kicker:'Для оптовых партнёров',hero:'pages/advertising/2.png',intro:'Рекламные материалы помогают продвигать продажи, повышают комфорт сотрудников и подчёркивают корпоративную связь с маркой.',sections:['Одежда и мерч','Сувенирная продукция и полиграфия','Оборудование места продаж']},
  packaging:{title:'Упаковка под ваш продукт',kicker:'Для оптовых партнёров',hero:'pages/packaging/2.png',intro:'Картриджи, бутылки, носики-дозаторы, колпачки и крышки собственного производства — с точными характеристиками и стабильным качеством.',sections:['Картриджи и комплектующие','Крышки с дозатором','Бутылки']},
}

function PromoPage({ type }) {
  const c=promoConfigs[type]
  return <Shell><PageIntro title={c.title} parent="О компании" kicker={c.kicker} /><section className="section promo-hero"><img src={`${A}${c.hero}`} alt=""/><div><p>{c.intro}</p><Button to="/contacts">Оставить заявку</Button></div></section>{c.sections.map((title,i)=><section className={`section split-section ${i%2?'split-section--reverse':''}`} key={title}>{i%2===0&&<div><span className="section-index">0{i+1}</span><h2>{title}</h2><p>Продуманное решение для партнёров KLEIM PRO. Характеристики и комплектация обсуждаются с персональным менеджером.</p></div>}<img src={`${A}pages/${type}/${Math.min(i+3,8)}.png`} alt={title}/>{i%2===1&&<div><span className="section-index">0{i+1}</span><h2>{title}</h2><p>Продуманное решение для партнёров KLEIM PRO. Характеристики и комплектация обсуждаются с персональным менеджером.</p></div>}</section>)}<section className="section form-panel"><LeadForm title="Соберём решение для вас" text="Оставьте контакты — менеджер расскажет об условиях"/></section></Shell>
}

function SelectorPage(){
  const [mode,setMode]=useState('surface')
  const [surface,setSurface]=useState('Бетон')
  const surfaces=['Гладкие','Пористые','Стекло','Керамика','Камень','Бетон','Металл','ПВХ','Дерево','Аквариум']
  const markers=[['2',65,10],['4',67,40],['5',27,58],['6',30,82],['7',35,67],['8',59,72],['9',86,43],['10',70,51],['11',94,67],['12',82,72],['13',48,85]]
  const selectorProducts=[
    {tag:'Рекомендуется',tone:'green',chips:['Вибрации','Влажность','УФ-стойкость'],dots:'green'},
    {tag:'Применимо',tone:'soft',chips:['Вибрации'],dots:'yellow'},
    {tag:'Применимо',tone:'soft',chips:['Вибрации'],dots:'yellow'},
    {tag:'Применимо',tone:'soft',chips:['Влажность','УФ-стойкость'],dots:'yellow'},
  ]
  return <Shell className="selector-page">
    <section className="selector-hero">
      <div className="selector-hero__copy"><h1>Какой<br/>герметик<br/>выбрать?</h1><p>Схема подбора герметиков</p><div className="selector-hero__description">В каждом доме есть десятки мест, где нужна герметизация. От выбора состава зависит, будет ли сухо, тепло и без плесени. Смотрите схему — и выбирайте герметик под конкретную задачу.</div><div className="selector-hero__actions"><button className="button" onClick={()=>document.getElementById('selector-table')?.scrollIntoView({behavior:'smooth'})}>Подобрать герметик <img src={`${A}advertising-side-arrow.png`} alt=""/></button><button className="button button--dark" onClick={()=>document.getElementById('selector-table')?.scrollIntoView({behavior:'smooth'})}>Таблица подбора <img src={`${A}advertising-side-arrow.png`} alt=""/></button></div></div>
      <div className="selector-house"><img src={`${A}selector-house.jpg`} alt="Дом со схемой применения герметиков"/><article className="selector-product-popover"><button aria-label="Закрыть">×</button><img src={`${A}pages/catalog/2.png`} alt="Герметик KLEIM PRO"/><div><small>Крыша</small><b>Герметик силиконовый<br/>санитарный E301</b><i/><i/><Link to="/product/pva-d3">Выбрать герметик</Link></div></article>{markers.map(([n,x,y])=><button className="house-marker" style={{left:`${x}%`,top:`${y}%`}} key={n}>{n}<span>↗</span></button>)}</div>
    </section>
    <section className="section selector-table" id="selector-table"><h2>Таблица подбора</h2><div className="selector-tabs"><button className={mode==='purpose'?'is-active':''} onClick={()=>setMode('purpose')}>Назначение</button><button className={mode==='surface'?'is-active':''} onClick={()=>setMode('surface')}>Поверхность</button></div><p>Выберите поверхность</p><div className="surface-list">{surfaces.map(item=><button className={surface===item?'is-active':''} onClick={()=>setSurface(item)} key={item}>{item}</button>)}</div><div className="selector-results">{selectorProducts.map((item,index)=><article className="selector-result" key={index}><div className="selector-result__image"><img src={`${A}pages/catalog/2.png`} alt="Герметик KLEIM PRO"/></div><div className="selector-result__body"><span className={`selector-result__status selector-result__status--${item.tone}`}>{item.tag}</span><small>Санитарный</small><h3>KSK 14X</h3><p>Силиконовый нейтральный<br/>для кровли и водостоков</p><div className="selector-result__chips">{item.chips.map(chip=><b key={chip}>{chip}</b>)}</div><em>⊕ Очень стоек к ультрафиолету</em><div className="selector-result__smell"><span>Запах при нанесении</span><i className={item.dots}/><i className={item.dots}/><i/></div></div></article>)}</div></section>
  </Shell>
}

const infoData={
  career:['Карьера','Присоединяйтесь к команде KLEIM PRO','Мы развиваем производство и ищем специалистов, которым важны качество, ответственность и профессиональный рост.'],
  suppliers:['Поставщикам','Открыты к надёжному сотрудничеству','Приглашаем поставщиков сырья, упаковки, оборудования и логистических услуг к долгосрочному партнёрству.'],
  ambassadors:['Клуб Амбассадор','Станьте частью сообщества KLEIM PRO','Объединяем профессионалов отрасли, делимся опытом и поддерживаем авторов полезного экспертного контента.'],
  charity:['Благотворительность','Помогаем там, где это важно','Поддерживаем социальные инициативы в регионах присутствия и проекты, направленные на реальную помощь людям.'],
}

function InfoPage({ type }){
  const [title,headline,text]=infoData[type]
  return <Shell><PageIntro title={title} parent="О компании" /><section className="section info-hero"><div><h2>{headline}</h2><p>{text}</p></div><img src={`${A}pages/${type}/2.png`} alt=""/></section><section className="section info-copy"><article><span>01</span><h2>Важная информация</h2><p>{text} Мы ценим прозрачные процессы, открытый диалог и результат, который можно измерить.</p></article><article><span>02</span><h2>Как присоединиться</h2><p>Расскажите о себе и оставьте контакты. Ответственный специалист свяжется с вами и предложит следующий шаг.</p></article></section><section className="section form-panel"><LeadForm title="Хотите сотрудничать?" text="Заполните форму, и мы с вами свяжемся"/></section></Shell>
}

function DocumentGrid({ small=false }){
  const docs=['Лист технической информации','Отказное письмо / Декларация соответствия','Экспертное заключение','Паспорт безопасности','Свидетельство о государственной регистрации','Сертификат соответствия','Протокол испытаний']
  return <div className={`document-grid ${small?'document-grid--small':''}`}>{docs.map((d,i)=><a href={`${A}pages/documents/${(i%8)+1}.png`} download key={d}><img className="document-grid__pdf" src={`${A}pdf-new.png`} alt="PDF"/><span>{d}</span><ArrowUpRight/></a>)}</div>
}

function DocumentsPage(){return <Shell><PageIntro title="Документы" /><section className="section documents-content"><DocumentGrid/><h2 className="cert-title">Сертификаты продукции</h2><div className="certificate-grid">{Array.from({length:6},(_,i)=><a href={`${A}pages/documents/2.png`} target="_blank" rel="noreferrer" key={i}><img src={`${A}pages/documents/2.png`} alt={`Сертификат ${i+1}`}/></a>)}</div></section></Shell>}

function BlogPage(){
  const list=useMemo(()=>Array.from({length:12},(_,i)=>articles[i%3]),[])
  return <Shell><PageIntro title="Блог" /><section className="section blog-list">{list.map(([title,text],i)=><Link to="/blog/article" className="blog-card" key={i}><img src={`${A}pages/blog/${(i%8)+1}.png`} alt=""/><div><h2>{title}</h2><p>{text}</p><span>02.07.2026</span></div></Link>)}</section><nav className="pagination section"><button>1</button><button>2</button><button>3</button><span>…</span><button>20</button><button>Вперёд <ArrowRight size={16}/></button></nav></Shell>
}

function ArticlePage(){return <Shell><section className="section article-page"><Breadcrumbs items={['Блог','Акриловый герметик A201']} /><Link className="back-link" to="/blog"><ArrowLeft size={18}/> Назад</Link><h1>Акриловый герметик A201:<br/>полное руководство по применению</h1><img className="article-hero" src={`${A}pages/article/2.png`} alt="Акриловый герметик A201"/><article><h2>Для каких работ подходит A201</h2><p>Акриловый герметик A201 подходит для работы с бетоном, кирпичом, штукатуркой, древесиной и другими распространёнными строительными основаниями. Его применяют для заполнения небольших трещин, герметизации малоподвижных стыков и оформления примыканий.</p><p>После высыхания поверхность герметика можно окрашивать совместимыми лакокрасочными материалами, благодаря чему шов легко сделать практически незаметным.</p><h2>Подготовка инструментов</h2><p>Для работы понадобится картридж A201, монтажный пистолет, строительный нож и инструмент для выравнивания шва. Основание очищают от пыли, грязи, жира и старых материалов.</p><blockquote>Качество шва напрямую зависит от состояния основания и соблюдения технологии нанесения.</blockquote><h2>Порядок нанесения</h2><p>Срежьте наконечник, установите картридж в пистолет и равномерно заполните шов. Разровняйте состав до начала образования поверхностной плёнки.</p></article></section><section className="section recommended"><h2>Читайте также</h2><div className="blog-list blog-list--compact">{articles.map(([t,p],i)=><Link to="/blog/article" className="blog-card" key={t}><img src={`${A}pages/blog/${i+1}.png`} alt=""/><div><h2>{t}</h2><p>{p}</p></div></Link>)}</div></section></Shell>}

function ContactsPage(){return <Shell noContacts><section className="section contacts-page"><h1>Контакты</h1><div className="contacts-page__info"><div className="contacts-page__communication"><div><small>Телефон</small><a href="tel:+78000000000">8 (800) 000-00-00</a></div><div><small>Почта</small><a href="mailto:info@kleimpro.ru">info@kleimpro.ru</a></div></div><div className="contacts-page__addresses"><small>Адрес</small><article><img src={`${A}contact-marker.png`} alt=""/><div><p>Россия, РТ, г. Бугульма,<br/>ул. Нефтяников, д. 17, офис 6</p><a href="https://yandex.ru/maps/?text=Бугульма%2C%20улица%20Нефтяников%2C%2017" target="_blank" rel="noreferrer">Построить маршрут →</a></div></article><article><img src={`${A}contact-marker.png`} alt=""/><div><p>Россия, Московская область, г. Щёлково,<br/>ул. 3-я линия, д. 27 (секция №1).</p><a href="https://yandex.ru/maps/?text=Щёлково%2C%203-я%20линия%2C%2027" target="_blank" rel="noreferrer">Построить маршрут →</a></div></article></div><div className="contacts-page__messengers"><small>Мессенджеры</small><a href="https://t.me" target="_blank" rel="noreferrer"><img src={`${A}contact-telegram.png`} alt="Telegram"/></a><a href="https://max.ru" target="_blank" rel="noreferrer"><img src={`${A}contact-max.png`} alt="MAX"/></a></div></div><div className="contacts-page__map"><img src={`${A}map2.png`} alt="Заглушка карты офисов"/></div></section></Shell>}

function NotFound(){return <Shell><section className="section not-found"><strong>404</strong><h1>Страница не найдена</h1><Button to="/">Вернуться на главную</Button></section></Shell>}

function ArticlePageNew(){
  const workItems=[
    'Статья — жанр журналистики, в котором автор ставит задачу проанализировать общественные ситуации, процессы, явления, прежде всего с точки зрения закономерностей, лежащих в их основе.',
    'Статья — жанр журналистики, в котором автор ставит задачу проанализировать общественные ситуации, процессы, явления, прежде всего с точки зрения закономерностей, лежащих в их основе.',
    'Статья — жанр журналистики, в котором автор ставит задачу проанализировать общественные ситуации, процессы, явления, прежде всего с точки зрения закономерностей, лежащих в их основе.',
    'Статья — жанр журналистики, в котором автор ставит задачу проанализировать общественные ситуации, процессы, явления, прежде всего с точки зрения закономерностей, лежащих в их основе.',
    'Статья — жанр журналистики, в котором автор ставит задачу проанализировать общественные ситуации, процессы, явления, прежде всего с точки зрения закономерностей, лежащих в их основе.',
    'Статья — жанр журналистики, в котором автор ставит задачу проанализировать общественные ситуации, процессы, явления, прежде всего с точки зрения закономерностей, лежащих в их основе.'
  ]
  return <Shell><main className="article-redesign">
    <header className="section article-redesign__header"><Link className="article-redesign__back" to="/blog">‹ Назад</Link><h1>Акриловый герметик A201:<br/>полное руководство по применению</h1></header>
    <img className="article-redesign__hero" src={`${A}production-raw-1.jpg`} alt="Акриловый герметик A201 на производственной линии"/>
    <article className="section article-redesign__body">
      <section className="article-redesign__intro"><h2>Для каких работ подходит A201</h2><div><p>Акриловый герметик A201 подходит для работы с бетоном, кирпичом, штукатуркой, древесиной и другими распространёнными строительными основаниями. Его можно применять для заполнения небольших трещин, герметизации малоподвижных стыков и оформления примыканий между стенами, перегородками и потолком.</p><p>Состав также подходит для обработки швов вокруг оконных и дверных конструкций, подоконников, плинтусов и декоративных элементов. После высыхания поверхность герметика можно окрашивать совместимыми лакокрасочными материалами.</p></div></section>
      <section className="article-redesign__split"><img src={`${A}pages/about/2.png`} alt="Производство герметика"/><div><h2>Подготовка<br/>инструментов</h2><p>Для работы понадобится картридж A201, монтажный пистолет, строительный нож и инструмент для выравнивания шва. Для защиты краёв соединения удобно использовать малярную ленту.</p><p>Заранее подготовьте чистую ветошь, щётку или пылесос. Поверхность необходимо очистить от пыли, грязи, жира и остатков старых материалов.</p></div></section>
      <aside className="article-redesign__notice"><img src={`${A}article-notice.png`} alt="Важно"/><p>Статья — жанр журналистики, в котором автор ставит задачу проанализировать общественные ситуации, процессы и явления. В статье автор рассматривает отдельные ситуации как часть более широкого явления и аргументированно пишет о своей точке зрения.</p></aside>
      <section className="article-redesign__split"><img src={`${A}raw-10.jpg`} alt="Производственный цех"/><div><h2>Подготовка<br/>инструментов</h2><p>Для работы понадобится картридж A201, монтажный пистолет, строительный нож и инструмент для выравнивания шва. Для защиты краёв соединения удобно использовать малярную ленту.</p><p>Качество шва напрямую зависит от состояния основания. Перед нанесением поверхность необходимо тщательно очистить.</p></div></section>
      <section className="article-redesign__split article-redesign__split--reverse"><div><h2>Применение при<br/>холодных температурах</h2><p>A201 представлен как морозостойкий герметик для внутренних и наружных работ. Морозостойкость готового шва и возможность нанесения состава при отрицательной температуре — не одно и то же.</p><p>При расчёте учитывают объём одного картриджа и добавляют небольшой запас. Нераспечатанные картриджи необходимо хранить в оригинальной упаковке.</p></div><img src={`${A}raw-14.jpg`} alt="Линия производства герметика"/></section>
      <blockquote className="article-redesign__quote"><img className="article-redesign__quote-icon" src={`${A}article-quotes.png`} alt=""/><p>Нераспечатанные картриджи необходимо хранить в оригинальной упаковке и соблюдать температурные условия, указанные производителем. Герметик следует защищать от прямых солнечных лучей и сильного нагрева.</p><footer><div><b>Иван Варламов</b><small>Ген. директор</small></div><img src={`${A}article-director.png`} alt="Иван Варламов"/></footer></blockquote>
      <section className="article-redesign__works"><h2>Для каких работ подходит A201</h2><div>{workItems.map((text,index)=><article key={text}><strong>{String(index+1).padStart(2,'0')}</strong><p>{text}</p></article>)}</div></section>
      <section className="article-redesign__avoid"><h2>Где не стоит использовать<br/>акриловый герметик</h2><p>Акриловый герметик A201 подходит для работы с бетоном, кирпичом, штукатуркой, древесиной и другими распространёнными строительными основаниями. Его можно применять для заполнения небольших трещин, герметизации малоподвижных стыков и оформления примыканий между стенами, перегородками и потолком.</p><div className="article-redesign__avoid-main"><strong>01</strong><b>Для работы на улице важна защита от ветра и влаги. При этом материал должен обеспечивать достаточный воздухообмен, чтобы внутри сохранялся комфорт даже при высокой физической активности.</b></div><ol><li><b>1.1</b><span>Одна из наиболее частых ошибок — нанесение герметика на загрязнённую поверхность. Пыль, жир и остатки старых материалов создают разделительный слой, из-за которого шов начинает отслаиваться по краям.</span></li><li><b>1.2</b><span>Ещё одна проблема возникает при поверхностном замазывании трещины. Если герметик закрывает только верхнюю часть дефекта, внутри остаётся пустота, и ремонт быстро теряет прочность.</span></li><li><b>1.2.1</b><span>Не следует заполнять слишком глубокие швы без уплотнительного шнура. Это увеличивает расход материала, замедляет высыхание и может привести к неравномерной деформации состава.</span></li><li><b>1.2.2</b><span>Акриловый герметик не следует считать универсальной заменой всем другим типам составов. Он может не подойти для участков, которые постоянно контактируют с водой, испытывают сильную деформацию или подвергаются высокой механической нагрузке.</span></li></ol></section>
    </article>
  </main></Shell>
}

function AdvertisingCard({image,title,text}){
  return <article className="advertising-card"><img src={`${A}${image}`} alt={title}/><div><h3>{title}</h3><p>{text}</p><dl><div><dt>Материал</dt><dd>Высокое качество</dd></div><div><dt>Нанесение</dt><dd>Полноцветная печать</dd></div></dl></div></article>
}

function AdvertisingPage(){
  const [sent,setSent]=useState(false)
  const merch=['Рюкзаки KLEI’M PRO','Бейсболки KLEI’M PRO','Футболки KLEI’M PRO']
  const souvenirs=['Ручки, карандаши, блокноты, кружки','Календари, каталоги, буклеты, баннеры','Информационные планшетки']
  return <Shell className="advertising-page">
    <section className="section advertising-hero"><div className="advertising-heading"><h1>Рекламные материалы<br/>для продвижения<br/>продукции KLEI’M PRO</h1><div className="wholesale-badge"><span>Для<br/>оптовых<br/>партнёров</span><img src={`${A}wholesale-logo.jpg`} alt="KLEIM PRO"/></div></div><div className="advertising-hero__visual"><img src={`${A}advertising-hero.jpg`} alt="Рекламные материалы KLEIM PRO"/><p>Рекламные материалы, которые помогают продвигать продажи товаров под ТМ KLEI’M PRO, способствуют комфорту сотрудников и поддерживают корпоративные связи с маркой.</p><div><img className="advertising-manager-icon" src={`${A}advertising-manager.png`} alt=""/><b>Индивидуальные условия обсуждает<br/>ваш персональный менеджер</b><Link to="/contacts">Оставить заявку <img src={`${A}advertising-side-arrow.png`} alt=""/></Link></div></div></section>
    <section className="section advertising-how"><div>{[['01','Как это работает','Рекламные материалы KLEI’M PRO помогают продвигать продажи, повышают комфорт сотрудников и поддерживают корпоративную связь с маркой на вашей точке продаж.'],['02','Бонусная программа','Часть продукции доступна для приобретения или получения в виде бонусов за достижение определённых объёмов закупок.'],['03','Логистика','Доставка возможна на брендированном автотранспорте и сопровождается необходимой документацией.']].map(([n,t,p])=><article key={n}><span>{n}</span><h2>{t}</h2><p>{p}</p></article>)}</div><img src={`${A}advertising-how.jpg`} alt="Как работает рекламная программа"/></section>
    <section className="section advertising-products"><h2>Одежда и мерч</h2><div>{merch.map(title=><AdvertisingCard image="advertising-merch.jpg" title={title} text="Практичный мерч с фирменным изображением KLEI’M PRO" key={title}/>)}</div></section>
    <section className="section advertising-products"><h2>Сувенирная продукция<br/>и полиграфия</h2><div>{souvenirs.map(title=><AdvertisingCard image="advertising-souvenirs.jpg" title={title} text="Брендированная продукция для клиентов и партнёров" key={title}/>)}</div></section>
    <section className="section advertising-equipment"><h2>Оборудование<br/>места продаж</h2><div><article><img src={`${A}advertising-vehicle.jpg`} alt="Брендирование автомобилей"/><h3>Брендирование автомобилей</h3><p>Борта грузового автотранспорта используются как рекламные площади и периодически обновляются.</p><footer><span><img src={`${A}advertising-auto-icon-1.png`} alt=""/>Помощь в брендировании транспорта</span><span><img src={`${A}advertising-auto-icon-2.png`} alt=""/>Дизайн и изготовление макетов</span></footer></article><article><img src={`${A}advertising-shelves.jpg`} alt="Стеллажи для продукции"/><h3>Стеллажи для продукции</h3><p>Стандартные стеллажи из прочных материалов помогают аккуратно представить продукцию.</p><footer><span><img src={`${A}advertising-shelf-icon-1.png`} alt=""/>Условия зависят от объёма сотрудничества</span><span><img src={`${A}advertising-shelf-icon-2.png`} alt=""/>Детали уточняйте у менеджера</span></footer></article></div></section>
    <section className="section packaging-request advertising-request"><div><h2>Соберём для вас<br/>пакет рекламной<br/>продукции под ваш<br/>объём закупок</h2><img src={`${A}advertising-request-merch.jpg`} alt="Одежда и мерч KLEIM PRO"/></div><form onSubmit={e=>{e.preventDefault();setSent(true)}}><img src={`${A}faq-products-cutout.png`} alt="Продукция KLEIM PRO"/><div><h3>Оставьте контакты</h3><p>И персональный менеджер свяжется с вами, подберёт позиции и расскажет об условиях бонусной программы.</p><input required placeholder="ФИО"/><input required type="tel" placeholder="Телефон"/><textarea rows="3" placeholder="Ваш вопрос"/><label><input type="checkbox" defaultChecked/> Согласие на обработку персональных данных</label><a href="#privacy">Политика конфиденциальности</a><button type="submit">{sent?'Заявка отправлена':'Отправить заявку'}</button></div></form></section>
  </Shell>
}

function App(){
  const path=useHashRoute()
  const pages={
    '/':<Home/>, '/catalog':<CategoriesPage/>, '/catalog/glue':<CatalogPage/>, '/glue':<CatalogPage/>, '/product/pva-d3':<ProductPageV2/>,
    '/about':<AboutPage/>, '/wholesale':<WholesalePage/>, '/advertising':<AdvertisingPage/>, '/packaging':<PackagingPage/>, '/selector':<SelectorPage/>,
    '/career':<InfoPage type="career"/>, '/suppliers':<InfoPage type="suppliers"/>, '/ambassadors':<InfoPage type="ambassadors"/>, '/charity':<InfoPage type="charity"/>,
    '/documents':<DocumentsPage/>, '/blog':<BlogPage/>, '/blog/article':<ArticlePageNew/>, '/contacts':<ContactsPage/>,
  }
  return pages[path] || <NotFound/>
}

export default App

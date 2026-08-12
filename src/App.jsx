import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft, ArrowRight, Check, ChevronDown, Download, FileText,
  Filter, MapPin, MessageSquare, Search, X,
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
  ['Клей', 'category-1.png'], ['Герметики', 'category-2.png'],
  ['Спец герметики', 'category-3.png'], ['Гибридные клеи и герметики', 'category-4.png'],
  ['Герметики для кровли, фасадов и водостоков', 'figma/figma-category-product.png'],
  ['Пена монтажная', 'figma/figma-product-05.png'],
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
        <Link to="/packaging" onClick={onClose}><img src={`${A}figma/figma-menu-production.png`} alt="Производство упаковки" /></Link>
        <Link to="/advertising" onClick={onClose}><img src={`${A}figma/figma-menu-materials.png`} alt="Рекламные материалы" /></Link>
      </div>
      <div className="mega-menu__bottom-promos">
        <Link to="/selector" onClick={onClose}><img src={`${A}figma/figma-menu-sealant-guide.png`} alt="Какой герметик выбрать?" /></Link>
        <Link to="/selector" onClick={onClose}><img src={`${A}figma/figma-menu-glue-table.png`} alt="Таблица подбора клеев" /></Link>
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
    <header className={`header ${overlay ? '' : 'header--page'}`}>
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
      <label className="search"><Search size={20} /><input aria-label="Поиск по каталогу" placeholder="Поиск по каталогу" /></label>
      <div className="header-contacts"><a href="mailto:info@kleimpro.ru">info@kleimpro.ru</a><a href="tel:+78000000000">8 (800) 000-00-00</a></div>
      <div className="messengers"><a href="https://t.me" target="_blank"><img src={`${A}telegram.svg`} alt="Telegram" />TG</a><i /><a href="https://max.ru" target="_blank"><img src={`${A}max.svg`} alt="MAX" />MAX</a></div>
      {catalogOpen && <div id="catalog-menu"><CatalogMenu onClose={closeMenus} /></div>}
      {companyOpen && <CompanyMenu onClose={closeMenus} />}
    </header>
    {(catalogOpen || companyOpen) && <button className="menu-backdrop" aria-label="Закрыть меню" onClick={closeMenus} />}
  </>
}

function Breadcrumbs({ items = [] }) {
  return <nav className="breadcrumbs"><Link to="/">Главная</Link>{items.map((item, i) => <span key={`${item}-${i}`}>/ {item}</span>)}</nav>
}

function PageIntro({ title, parent, kicker, children }) {
  return <section className="page-intro section"><Breadcrumbs items={[parent, title].filter(Boolean)} /><h1>{title}</h1>{kicker && <p className="page-intro__kicker">{kicker}</p>}{children}</section>
}

function LeadForm({ title = 'Остались вопросы?', text = 'Оставьте заявку — мы свяжемся с вами в ближайшее время', compact = false }) {
  const [sent, setSent] = useState(false)
  return <form className={`lead-form ${compact ? 'lead-form--compact' : ''}`} style={{ '--faq-decoration': `url(${A}figma/figma-faq-decoration.png)` }} onSubmit={e => { e.preventDefault(); setSent(true) }}>
    <h3>{title}</h3><p>{text}</p><input placeholder="ФИО" required /><input type="tel" placeholder="Телефон" required /><textarea placeholder="Ваш вопрос" rows="3" />
    <label className="consent"><span><Check size={16} /></span>Согласие на обработку персональных данных</label><a className="privacy" href="#privacy">Политика конфиденциальности</a>
    <button className="button form-button" type="submit">{sent ? 'Заявка отправлена' : 'Отправить заявку'}</button>
  </form>
}

function ContactSection() {
  return <section className="section contacts" id="contacts"><div className="contacts__map"><img src={`${A}figma/figma-contacts-map.png`} alt="Карта офиса KLEIM PRO" /></div><div className="contact-card"><h2>Контакты</h2><a href="tel:+78000000000">8 (800) 000-00-00</a><a href="mailto:info@kleimpro.ru">info@kleimpro.ru</a><p><MapPin size={24} />Россия, РТ, г. Бугульма,<br />ул. Нефтяников, д. 17, оф. 6</p><div className="messengers messengers--contact"><a href="https://t.me"><img src={`${A}telegram.svg`} alt="" />TG</a><i /><a href="https://max.ru"><img src={`${A}max.svg`} alt="" />MAX</a></div></div></section>
}

function Footer() {
  return <footer className="footer"><img className="footer__background" src={`${A}figma/figma-footer-background.png`} alt="" /><div className="footer__top section"><nav><Link to="/catalog">Каталог</Link><Link to="/wholesale">Оптовым клиентам и дилерам</Link><Link to="/about">О компании</Link><Link to="/catalog">Наша продукция</Link><Link to="/about">Где нас купить</Link><Link to="/blog">Блог</Link><Link to="/contacts">Контакты</Link></nav><div className="footer__contacts"><img src={`${A}logo.svg`} alt="KLEIM PRO" /><a href="tel:+78000000000">8 (800) 000-00-00</a><a href="mailto:info@kleimpro.ru">info@kleimpro.ru</a></div></div><div className="footer__visual"><img src={`${A}figma/figma-footer-product.png`} alt="Продукция KLEIM PRO" /></div><div className="footer__bottom section"><span>Copyright © 2026</span><a href="#rules">Правила обработки персональных данных</a><a href="#privacy">Политика конфиденциальности</a></div></footer>
}

function Shell({ children, noContacts = false, noFooter = false }) {
  return <main id="top" className="page"><Header />{children}{!noContacts && <ContactSection />}{!noFooter && <Footer />}<button className="chat" aria-label="Написать нам"><MessageSquare fill="currentColor" /></button></main>
}

function ProductCard({ index = 0 }) {
  return <Link className="catalog-card" to="/product/pva-d3"><div className="catalog-card__image"><img src={`${A}pages/catalog/2.png`} alt="" /><span>{index % 3 === 0 ? 'Хит' : 'Новинка'}</span></div><div className="catalog-card__copy"><h3>{products[index % products.length]}</h3><p>Профессиональный состав для прочного и долговечного соединения.</p><b>Подробнее <ArrowRight size={16} /></b></div></Link>
}

function Home() {
  return <main id="top"><section className="hero"><img className="hero__background" src={`${A}figma/figma-hero.png`} alt="" /><Header overlay /><div className="hero__shade" /><div className="hero__content"><div className="eyebrow"><span />Более 500 позиций в наличии</div><h1>Производство<br />профессиональных<br />герметиков<br />и клеевых систем</h1><p>Надежный производитель строительной химии для бизнеса. Стабильное качество, собственное производство и поставки по всей России.</p><Button>Оптовым клиентам и дилерам</Button></div></section>
    <section className="section company"><div className="company__image"><img src={`${A}figma/figma-company-production.png`} alt="Производственный комплекс" /><div className="company__arrows"><button><ArrowLeft /></button><button><ArrowRight /></button></div></div><div className="company__copy"><h2>Собственные производственные мощности</h2><p>и передовые лаборатории, которые позволяют контролировать каждый этап создания продукции</p><div className="stats"><article><strong>2</strong><b>завода</b><span>Производят около 90% строительной химии.</span></article><article><strong>3</strong><b>лаборатории</b><span>Разрабатывают продукты и контролируют качество.</span></article></div></div></section>
    <section className="section partners"><h2>Лучшие условия для партнёров</h2><div className="partner-grid">{[['figma-partner-full-cycle.png','Производитель полного цикла'],['figma-partner-stm.png','Производство под СТМ'],['figma-partner-stock.png','Постоянное наличие'],['figma-partner-wholesale.png','Оптовые цены'],['figma-partner-documents.png','Документы']].map(([img,title])=><Link className="partner-card" to="/wholesale" key={title}><img src={`${A}figma/${img}`} alt=""/><div><h3>{title}</h3><p>Собственные заводы, лаборатории и стабильные поставки.</p></div></Link>)}<LeadForm compact title="Лучшие условия" text="Оставьте заявку и мы предложим лучшие цены." /></div></section>
    <section className="section products"><div className="section-heading"><h2>Наша продукция</h2><Link to="/catalog">Смотреть все <ArrowRight size={18}/></Link></div><div className="product-grid">{[1,2,3,4].map(i=><Link to="/catalog" key={i}><img src={`${A}category-${i}.png`} alt="Категория продукции"/></Link>)}</div></section>
    <ContactSection /><Footer /><button className="chat"><MessageSquare fill="currentColor" /></button></main>
}

function CategoriesPage() {
  return <Shell><PageIntro title="Все товары" /><section className="section category-list">{categories.map(([title,img],i)=><Link className="category-tile" to="/catalog/glue" key={title}><span>0{i+1}</span><h2>{title}</h2><img src={`${A}${img}`} alt=""/><i><ArrowRight /></i></Link>)}</section></Shell>
}

function CatalogPage() {
  const [filtersOpen,setFiltersOpen]=useState(false)
  return <Shell><PageIntro title="Клей" parent="Каталог" /><section className="section catalog-layout"><button className="filter-mobile" onClick={()=>setFiltersOpen(!filtersOpen)}><Filter size={18}/> Фильтры</button><aside className={`filters ${filtersOpen?'is-open':''}`}><h3>Фильтры</h3>{['Назначение','Основа','Материал','Цвет','Объём'].map((f,i)=><details open={i<2} key={f}><summary>{f}<ChevronDown size={16}/></summary>{['Для дерева','Для металла','Универсальный','Для наружных работ'].map(v=><label key={v}><input type="checkbox"/> {v}</label>)}</details>)}<button className="button">Показать товары</button></aside><div><div className="filter-chips"><button>Все товары</button><button>Для дерева</button><button>Для металла</button><button>Белый</button></div><div className="catalog-grid">{products.map((_,i)=><ProductCard index={i} key={i}/>)}</div><nav className="pagination"><button>1</button><button>2</button><button>3</button><span>…</span><button>20</button><button>Вперёд <ArrowRight size={16}/></button></nav></div></section></Shell>
}

function ProductPage() {
  const [color,setColor]=useState('Белый')
  return <Shell><section className="section product-detail"><Breadcrumbs items={['Каталог','Герметики']} /><div className="product-detail__hero"><div className="product-gallery"><img src={`${A}pages/catalog/2.png`} alt="Клей KLEIM PRO" /></div><div className="product-summary"><span>Артикул: 2025-П38</span><h1>Клей ПВА D3 столярный влагостойкий</h1><p>Двухкомпонентный быстрый клей: спрей-активатор KLEI’M PRO и клей-гель моментальный цианокрилатный.</p><ul><li>Защита от плесени и грибка</li><li>Постоянная эластичность</li><li>Не трескается</li><li>Без запаха</li></ul><h4>Цвет</h4><div className="color-picker">{['Белый','Серый','Бежевый','Прозрачный'].map(c=><button className={color===c?'is-active':''} onClick={()=>setColor(c)} key={c}>{c}</button>)}</div><div className="buy-row"><Button to="/contacts">Купить оптом</Button><a className="button button--dark" href="https://www.vseinstrumenti.ru" target="_blank">ВсеИнструменты</a></div></div></div>
    <section className="product-block"><h2>Технические характеристики</h2><div className="spec-grid">{[['Плотность','не менее 0,95 г/см³'],['Время пленкообразования','3–15 минут'],['Скорость полимеризации','2 мм/сутки'],['Температура эксплуатации','от −40°С до +150°С'],['Водостойкость','100%'],['Срок годности','24 месяца']].map(([a,b])=><p key={a}><span>{a}</span><b>{b}</b></p>)}</div></section>
    <section className="product-block product-application"><div><h2>Применение</h2><p>Набор применяется для склеивания, ремонта и фиксации древесины, МДФ, ДСП, резины, кожи, стекла, металла и большинства пластмасс.</p></div><img src={`${A}pages/product/1.png`} alt="Применение клея"/></section>
    <section className="product-block"><h2>Документация</h2><DocumentGrid small /></section><section className="product-block question-block"><LeadForm title="Задайте ваш вопрос" text="Наш консультант ответит в течение 30 минут" /></section></section></Shell>
}

function AboutPage() {
  const features=[['20 лет','производим профессиональную строительную химию'],['500+','позиций в ассортименте'],['2','собственных завода'],['3','лаборатории контроля качества']]
  return <Shell><PageIntro title="Производитель профессиональной строительной химии" /><section className="section about-hero"><img src={`${A}figma/figma-hero.png`} alt="Производство KLEIM PRO"/><div className="about-stats">{features.map(([n,t])=><article key={n}><strong>{n}</strong><span>{t}</span></article>)}</div></section><section className="section split-section"><div><h2>Собственные производственные мощности</h2><p>Контролируем каждый этап: от разработки рецептуры и входного сырья до упаковки и отгрузки готовой продукции.</p></div><img src={`${A}figma/figma-company-production.png`} alt="Завод"/></section><section className="section"><h2>Инновации в производстве</h2><div className="feature-cards">{['Новые рецептуры','Автоматизированные линии','Стабильное качество'].map((t,i)=><article key={t}><img src={`${A}pages/about/${i+2}.png`} alt=""/><h3>{t}</h3><p>Современные технологии, лабораторные испытания и контроль на всех этапах.</p></article>)}</div></section><section className="section split-section split-section--reverse"><img src={`${A}pages/about/8.png`} alt="Автопарк"/><div><h2>Собственный автопарк</h2><p>Доставляем продукцию партнёрам по всей России и обеспечиваем устойчивую логистику.</p></div></section><section className="section map-wide"><h2>География поставок</h2><img src={`${A}figma/figma-stores-map.png`} alt="География поставок"/></section></Shell>
}

function WholesalePage() {
  return <Shell><PageIntro title="Оптовым клиентам и дилерам" /><section className="section wholesale-hero"><div><h2>Развиваем бизнес вместе</h2><p>Выгодные оптовые цены, персональный менеджер, стабильные поставки и маркетинговая поддержка.</p><Button to="/contacts">Стать партнёром</Button></div><img src={`${A}pages/about/8.png`} alt="Логистика KLEIM PRO"/></section><section className="section"><h2>Условия сотрудничества</h2><div className="number-cards">{[['01','Персональные цены'],['02','Плановые поставки'],['03','Поддержка продаж']].map(([n,t])=><article key={n}><strong>{n}</strong><h3>{t}</h3><p>Индивидуальные условия под объём и формат вашего бизнеса.</p></article>)}</div></section><section className="section split-section"><div><h2>Стабильная логистика</h2><p>Собственный склад и автопарк позволяют поддерживать наличие и соблюдать сроки поставок.</p></div><img src={`${A}pages/about/8.png`} alt="Автопарк"/></section><section className="section form-panel"><LeadForm title="Станьте нашим партнёром" text="Оставьте контакты, персональный менеджер подготовит предложение"/></section></Shell>
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
  const [answer,setAnswer]=useState(0);const options=['Крыша','Фасад','Ванная и кухня','Дерево','Стекло','Металл']
  return <Shell><PageIntro title="Какой герметик выбрать?" parent="Каталог" /><section className="section selector"><div className="selector__visual"><img src={`${A}pages/selector/2.png`} alt="Схема подбора герметиков"/></div><div className="selector__panel"><span>Шаг 1 из 3</span><h2>Где будет использоваться герметик?</h2><div>{options.map((o,i)=><button className={answer===i?'is-active':''} onClick={()=>setAnswer(i)} key={o}>{o}</button>)}</div><Button to="/product/pva-d3">Показать результат</Button></div></section><section className="section recommended"><h2>Подходящие решения</h2><div className="catalog-grid">{[0,1,2].map(i=><ProductCard index={i} key={i}/>)}</div></section></Shell>
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
  const docs=['Отказное письмо / Декларация соответствия','Экспертное заключение','Паспорт безопасности','Лист технической информации','Свидетельство о государственной регистрации','Сертификат соответствия','Протокол испытаний']
  return <div className={`document-grid ${small?'document-grid--small':''}`}>{docs.map((d,i)=><a href={`${A}pages/documents/${(i%8)+1}.png`} download key={d}><FileText/><span>{d}</span><Download/></a>)}</div>
}

function DocumentsPage(){return <Shell><PageIntro title="Документы" /><section className="section"><DocumentGrid/><h2 className="cert-title">Сертификаты продукции</h2><div className="certificate-grid">{[1,2,3].map(i=><a href={`${A}pages/documents/${i}.png`} target="_blank" key={i}><img src={`${A}pages/documents/${i}.png`} alt="Сертификат"/></a>)}</div></section></Shell>}

function BlogPage(){
  const list=useMemo(()=>Array.from({length:12},(_,i)=>articles[i%3]),[])
  return <Shell><PageIntro title="Блог" /><section className="section blog-list">{list.map(([title,text],i)=><Link to="/blog/article" className="blog-card" key={i}><img src={`${A}pages/blog/${(i%8)+1}.png`} alt=""/><div><h2>{title}</h2><p>{text}</p><span>02.07.2026</span></div></Link>)}</section><nav className="pagination section"><button>1</button><button>2</button><button>3</button><span>…</span><button>20</button><button>Вперёд <ArrowRight size={16}/></button></nav></Shell>
}

function ArticlePage(){return <Shell><section className="section article-page"><Breadcrumbs items={['Блог','Акриловый герметик A201']} /><Link className="back-link" to="/blog"><ArrowLeft size={18}/> Назад</Link><h1>Акриловый герметик A201:<br/>полное руководство по применению</h1><img className="article-hero" src={`${A}pages/article/2.png`} alt="Акриловый герметик A201"/><article><h2>Для каких работ подходит A201</h2><p>Акриловый герметик A201 подходит для работы с бетоном, кирпичом, штукатуркой, древесиной и другими распространёнными строительными основаниями. Его применяют для заполнения небольших трещин, герметизации малоподвижных стыков и оформления примыканий.</p><p>После высыхания поверхность герметика можно окрашивать совместимыми лакокрасочными материалами, благодаря чему шов легко сделать практически незаметным.</p><h2>Подготовка инструментов</h2><p>Для работы понадобится картридж A201, монтажный пистолет, строительный нож и инструмент для выравнивания шва. Основание очищают от пыли, грязи, жира и старых материалов.</p><blockquote>Качество шва напрямую зависит от состояния основания и соблюдения технологии нанесения.</blockquote><h2>Порядок нанесения</h2><p>Срежьте наконечник, установите картридж в пистолет и равномерно заполните шов. Разровняйте состав до начала образования поверхностной плёнки.</p></article></section><section className="section recommended"><h2>Читайте также</h2><div className="blog-list blog-list--compact">{articles.map(([t,p],i)=><Link to="/blog/article" className="blog-card" key={t}><img src={`${A}pages/blog/${i+1}.png`} alt=""/><div><h2>{t}</h2><p>{p}</p></div></Link>)}</div></section></Shell>}

function ContactsPage(){return <Shell noContacts><PageIntro title="Контакты" /><section className="section contact-page"><div className="contact-page__details"><h2>Производство и офис</h2><a href="tel:+78000000000">8 (800) 000-00-00</a><a href="mailto:info@kleimpro.ru">info@kleimpro.ru</a><p><MapPin/>Россия, Республика Татарстан,<br/>г. Бугульма, ул. Нефтяников, д. 17, оф. 6</p><p>Пн–Пт: 08:00–17:00</p></div><img src={`${A}pages/contacts/1.png`} alt="Карта офиса"/></section><section className="section form-panel"><LeadForm title="Свяжитесь с нами" text="Ответим на вопросы о продукции и сотрудничестве"/></section></Shell>}

function NotFound(){return <Shell><section className="section not-found"><strong>404</strong><h1>Страница не найдена</h1><Button to="/">Вернуться на главную</Button></section></Shell>}

function App(){
  const path=useHashRoute()
  const pages={
    '/':<Home/>, '/catalog':<CategoriesPage/>, '/catalog/glue':<CatalogPage/>, '/product/pva-d3':<ProductPage/>,
    '/about':<AboutPage/>, '/wholesale':<WholesalePage/>, '/advertising':<PromoPage type="advertising"/>, '/packaging':<PromoPage type="packaging"/>, '/selector':<SelectorPage/>,
    '/career':<InfoPage type="career"/>, '/suppliers':<InfoPage type="suppliers"/>, '/ambassadors':<InfoPage type="ambassadors"/>, '/charity':<InfoPage type="charity"/>,
    '/documents':<DocumentsPage/>, '/blog':<BlogPage/>, '/blog/article':<ArticlePage/>, '/contacts':<ContactsPage/>,
  }
  return pages[path] || <NotFound/>
}

export default App

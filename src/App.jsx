import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  MapPin,
  MessageSquare,
  Search,
  X,
} from 'lucide-react'

const A = `${import.meta.env.BASE_URL}assets/`

const partnerCards = [
  { image: 'figma/figma-partner-full-cycle.png', title: 'Производитель полного цикла', text: 'Собственные заводы, лаборатории, контроль качества.' },
  { image: 'figma/figma-partner-stm.png', title: 'Производство под СТМ', text: 'Выпускаем продукцию под вашей торговой маркой.' },
  { image: 'figma/figma-partner-stock.png', title: 'Постоянное наличие', text: 'Большие складские остатки и стабильные поставки.' },
  { image: 'figma/figma-partner-wholesale.png', title: 'Оптовые цены', text: 'Гибкие условия для дилеров и крупных заказчиков.' },
  { image: 'figma/figma-partner-documents.png', title: 'Документы', text: 'Сертификаты, паспорта безопасности, техническая документация.' },
]

const advantages = [
  ['Разнообразный ассортимент', 'Для большого числа задач под разные сферы и материалы, 100 продуктов в диапазоне климатических условий и конечно же большая палитра цветовых решений.'],
  ['Доверие покупателей', 'Обеспечивается нашими главными свойствами — стабильность, качество и собственная ценовая политика.'],
  ['20 лет', 'Производим высококачественную продукцию.'],
]

const articles = [
  ['figma/figma-product-01.png', 'Как выбрать герметик для фасада: 5 главных правил', 'Разбираем, какой герметик лучше выдержит мороз, УФ-излучение и деформацию. Сравниваем акриловые, силиконовые и гибридные составы и даём чёткие рекомендации для разных типов фасадов.'],
  ['figma/figma-product-02.png', 'Акриловый герметик A201: полное руководство по применению', 'Подробная инструкция по работе с одним из самых популярных герметиков KLEIM PRO. Подготовка поверхности, оптимальные условия нанесения, время полимеризации и распространённые ошибки.'],
  ['figma/figma-product-03.png', 'Почему важно использовать профессиональные герметики', 'В чём разница между профессиональной линейкой и товарами из масс-маркета. Срок службы, надёжность шва, экономия на переделках и почему для серьёзных объектов бытовые герметики не подходят.'],
  ['figma/figma-product-04.png', 'Акриловый герметик A201: полное руководство по применению', 'Подробная инструкция по работе с одним из самых популярных герметиков KLEIM PRO. Подготовка поверхности, оптимальные условия нанесения, время полимеризации и распространённые ошибки.'],
]

const faq = [
  ['Для каких работ подходит акриловый герметик A201?', 'Акриловый герметик KLEIM PRO A201 — универсальный морозостойкий состав для внутренних и наружных работ.'],
  ['Можно ли использовать герметики KLEIM PRO при отрицательных температурах?', 'Да, часть линейки рассчитана на зимнее нанесение. Точный температурный диапазон указан в техническом паспорте продукта.'],
  ['Какой срок годности у герметиков и клеевых систем KLEIM PRO?', 'Срок зависит от состава и упаковки. В среднем — от 12 до 18 месяцев при соблюдении условий хранения.'],
  ['В чём отличие акриловых герметиков от силиконовых?', 'Акриловые составы можно окрашивать, а силиконовые лучше переносят постоянный контакт с водой и сохраняют высокую эластичность.'],
  ['Нужно ли грунтовать поверхность перед нанесением герметика?', 'Основание должно быть сухим, чистым и обезжиренным. Для пористых и сильно впитывающих поверхностей грунтование улучшает адгезию.'],
  ['Как правильно хранить герметики KLEIM PRO?', 'Храните закрытую упаковку в сухом помещении и соблюдайте температурный диапазон, указанный на этикетке продукта.'],
]

const catalogGroups = [
  ['По основе', ['Акриловые ↗', 'Силиконовые', 'Битумные', 'Гибридные', 'Полиуретановые', 'Силокриловые', 'Силикатные']],
  ['По назначению', ['Для кровли', 'Для ванной и кухни', 'Для дымохода', 'Для автомобилей', 'Для труб', 'Универсальный']],
  ['По материалу', ['Для дерева', 'Для металла', 'Для пластика', 'Для стекла', 'Для бетона', 'Для плитки']],
  ['По цвету', ['Белый', 'Серый', 'Черный', 'Прозрачный']],
  ['Другое', ['Термостойкий', 'Влагостойкий', 'Для наружных работ', '1 компонентный', '2 компонентный', 'Резьбовой']],
]

const catalogSections = [
  'КЛЕЙ KLEIM PRO',
  'ГЕРМЕТИК KLEIM PRO',
  'ПЕНА МОНТАЖНАЯ',
  'ГИБРИДНЫЕ КЛЕИ И ГЕРМЕТИКИ KLEIM PRO',
  'ГЕРМЕТИКИ ДЛЯ КРОВЛИ ФАСАДОВ И ВОДОСТОКОВ',
  'СПЕЦ ГЕРМЕТИКИ',
  'ПИСТОЛЕТ',
]

function CatalogMenu({ onClose }) {
  return (
    <div className="mega-menu" role="dialog" aria-label="Каталог продукции">
      <aside className="mega-menu__sidebar">
        <nav>
          {catalogSections.map((item, index) => <a className={index === 0 ? 'is-active' : ''} href="#products" onClick={onClose} key={item}>{item}</a>)}
        </nav>
        <a className="mega-menu__client" href="#partners" onClick={onClose}>Оптовым клиентам <img src={`${A}arrow-up-right.svg`} alt="" /></a>
      </aside>

      <div className="mega-menu__content">
        <div className="mega-menu__groups">
          {catalogGroups.map(([title, items]) => <section key={title}>
            <h3>{title}</h3>
            {items.map((item) => <a href="#products" onClick={onClose} key={item}>{item}</a>)}
          </section>)}
        </div>

        <div className="mega-menu__side-promos">
          <a href="#company" onClick={onClose}><img src={`${A}figma/figma-menu-production.png`} alt="Производство упаковки" /></a>
          <a href="#blog" onClick={onClose}><img src={`${A}figma/figma-menu-materials.png`} alt="Рекламные материалы" /></a>
        </div>

        <div className="mega-menu__bottom-promos">
          <a href="#products" onClick={onClose}>
            <img src={`${A}figma/figma-menu-sealant-guide.png`} alt="Какой герметик выбрать?" />
          </a>
          <a href="#products" onClick={onClose}>
            <img src={`${A}figma/figma-menu-glue-table.png`} alt="Таблица подбора клеев" />
          </a>
        </div>

        <nav className="mega-menu__mobile-links">
          <a href="#partners" onClick={onClose}>Оптовым клиентам и дилерам</a>
          <a href="#blog" onClick={onClose}>Блог</a>
          <a href="#contacts" onClick={onClose}>Контакты</a>
        </nav>
      </div>
    </div>
  )
}

function CompanyMenu({ onClose }) {
  return (
    <nav className="company-menu" aria-label="О компании">
      {['Карьера', 'Поставщикам', 'Клуб Амбассадор', 'Благотворительность', 'Документы'].map((item) => <a href="#company" onClick={onClose} key={item}>{item}</a>)}
    </nav>
  )
}

function Button({ children, dark = false, type = 'button', onClick }) {
  return (
    <button className={`button ${dark ? 'button--dark' : ''}`} type={type} onClick={onClick}>
      <span>{children}</span>
      <img src={`${A}arrow-up-right.svg`} alt="" />
    </button>
  )
}

function Header({ catalogOpen, companyOpen, setCatalogOpen, setCompanyOpen, closeMenus }) {
  return (
    <header className="header">
      <a href="#top" className="logo" aria-label="KLEIM PRO">
        <img src={`${A}logo.svg`} alt="KLEIM PRO" />
      </a>
      <button className="catalog-button" onClick={() => { setCatalogOpen(!catalogOpen); setCompanyOpen(false) }} aria-expanded={catalogOpen} aria-controls="catalog-menu">
        {catalogOpen ? <X size={24} /> : <img src={`${A}menu.svg`} alt="" />}
        Каталог
      </button>
      <nav className="nav">
        <button className="nav__company" onClick={() => { setCompanyOpen(!companyOpen); setCatalogOpen(false) }} aria-expanded={companyOpen}>О компании <ChevronDown className={companyOpen ? 'is-open' : ''} size={16} /></button>
        <a href="#partners" onClick={closeMenus}>Оптовым клиентам и дилерам</a>
        <a href="#products" onClick={closeMenus}>Наша продукция</a>
        <a href="#blog" onClick={closeMenus}>Блог</a>
        <a href="#contacts" onClick={closeMenus}>Контакты</a>
      </nav>
      <label className="search">
        <Search size={20} />
        <input aria-label="Поиск по каталогу" placeholder="Поиск по каталогу" />
      </label>
      <div className="header-contacts">
        <a href="mailto:info@kleimpro.ru">info@kleimpro.ru</a>
        <a href="tel:+78000000000">8 (800) 000-00-00</a>
      </div>
      <div className="messengers" aria-label="Мессенджеры">
        <a href="#telegram"><img src={`${A}telegram.svg`} alt="Telegram" /><span>TG</span></a>
        <i />
        <a href="#max"><img src={`${A}max.svg`} alt="MAX" /><span>MAX</span></a>
      </div>
      {catalogOpen && <div id="catalog-menu"><CatalogMenu onClose={closeMenus} /></div>}
      {companyOpen && <CompanyMenu onClose={closeMenus} />}
    </header>
  )
}

function LeadForm({ compact = false, decorated = false }) {
  const [sent, setSent] = useState(false)
  return (
    <form className={`lead-form ${compact ? 'lead-form--compact' : ''}`} onSubmit={(event) => { event.preventDefault(); setSent(true) }}>
      {compact && <><h3>Лучшие условия</h3><p>Оставьте заявку и мы предложим лучшие цены на продукцию.</p></>}
      {!compact && <><h3>Остались вопросы?</h3><p>Оставьте заявку — мы свяжемся с вами в ближайшее время</p></>}
      <input name="name" placeholder={compact ? 'Ваше имя' : 'ФИО'} required />
      <input name="phone" type="tel" placeholder="Телефон" required />
      {!compact && <textarea name="question" placeholder="Ваш вопрос" rows="3" />}
      <label className="consent"><span><Check size={16} /></span>Согласие на обработку персональных данных</label>
      <a className="privacy" href="#privacy">Политика конфиденциальности</a>
      <button className="button form-button" type="submit">{sent ? 'Заявка отправлена' : compact ? 'Получить лучшие условия' : 'Отправить заявку'}</button>
      {decorated && <img className="lead-form__decoration" src={`${A}figma/figma-faq-decoration.png`} alt="" />}
    </form>
  )
}

function App() {
  const [catalogOpen, setCatalogOpen] = useState(false)
  const [companyOpen, setCompanyOpen] = useState(false)
  const [activeFaq, setActiveFaq] = useState(0)
  const closeMenus = () => { setCatalogOpen(false); setCompanyOpen(false) }

  useEffect(() => {
    const closeOnEscape = (event) => { if (event.key === 'Escape') closeMenus() }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [])

  return (
    <main id="top">
      <section className="hero">
        <img className="hero__background" src={`${A}figma/figma-hero.png`} alt="" />
        <Header catalogOpen={catalogOpen} companyOpen={companyOpen} setCatalogOpen={setCatalogOpen} setCompanyOpen={setCompanyOpen} closeMenus={closeMenus} />
        {(catalogOpen || companyOpen) && <button className="menu-backdrop" aria-label="Закрыть меню" onClick={closeMenus} />}
        <div className="hero__shade" />
        <div className="hero__content">
          <div className="eyebrow"><span />Более 500 позиций в наличии</div>
          <h1>Производство<br />профессиональных<br />герметиков<br />и клеевых систем</h1>
          <p>Надежный производитель строительной химии для бизнеса. Обеспечиваем строительные компании, дилеров, торговые сети и производственные предприятия профессиональными герметиками и клеевыми системами с гарантией стабильного качества и поставок.</p>
          <Button>Оптовым клиентам и дилерам</Button>
        </div>
      </section>

      <section className="section company" id="company">
        <div className="company__image">
          <img src={`${A}figma/figma-company-production.png`} alt="Производственный комплекс KLEIM PRO" />
          <div className="company__arrows" aria-label="Фотографии производства">
            <button aria-label="Предыдущее фото"><ArrowLeft /></button>
            <button aria-label="Следующее фото"><ArrowRight /></button>
          </div>
        </div>
        <div className="company__copy">
          <h2>Собственные производственные мощности</h2>
          <p>и передовые лаборатории, которые позволяют нам контролировать каждый этап создания профессиональных герметиков и клеевых систем</p>
          <div className="stats">
            <article><strong>2</strong><b>завода</b><span>Производящие около 90% строительной химии, используемой в стройке и ремонте.</span></article>
            <article><strong>3</strong><b>лаборатории</b><span>По разработке инновационных продуктов и контролю качества на всех этапах.</span></article>
          </div>
        </div>
      </section>

      <section className="section partners" id="partners">
        <h2>Лучшие условия для партнёров</h2>
        <div className="partner-grid">
          {partnerCards.map((card) => <article className="partner-card" key={card.title}>
            <img src={`${A}${card.image}`} alt="" />
            <div><h3>{card.title}</h3><p>{card.text}</p></div>
          </article>)}
          <LeadForm compact />
        </div>
      </section>

      <section className="section production">
        <div className="production__inner">
          <img className="production__background" src={`${A}figma/figma-production-capabilities.png`} alt="" />
          <div className="production__intro">
            <h2>Производственные возможности</h2>
            <p>Мы не просто выпускаем строительную химию, а предлагаем комплексные производственные решения для бизнеса.</p>
            <Button>Оптовым клиентам</Button>
          </div>
          <article className="glass-card glass-card--one"><b>Гибкие объёмы</b><p>Выпускаем как небольшие партии для запуска новых проектов, так и крупные объемы для федеральных сетей, дилеров и промышленных предприятий.</p></article>
          <article className="glass-card glass-card--two"><b>Разработка и СТМ</b><p>Разрабатываем новые продукты, производим под собственной и частной торговой маркой, обеспечиваем фасовку, колеровку и контроль качества.</p></article>
        </div>
      </section>

      <section className="section products" id="products">
        <div className="section-heading"><h2>Наша продукция</h2><div className="slider-buttons"><button aria-label="Назад"><ArrowLeft /></button><button aria-label="Вперёд"><ArrowRight /></button></div></div>
        <div className="product-grid">
          {[1, 2, 3, 4].map((item) => <a href="#catalog" key={item}><img src={`${A}category-${item}.png`} alt={`Категория продукции ${item}`} /></a>)}
        </div>
      </section>

      <section className="section stores">
        <div className="retailers">
          <h2>Где нас купить</h2>
          {[1, 2, 3, 4, 5, 6].map((index) => <span className="retailer" key={index}><img src={`${A}figma/figma-retailer-0${index}.png`} alt="Магазин-партнёр" /></span>)}
          <button>Все магазины <ArrowRight size={18} /></button>
        </div>
        <div className="map-visual">
          <img className="map-export" src={`${A}figma/figma-stores-composite.png`} alt="География продаж KLEIM PRO" />
        </div>
      </section>

      <section className="section benefits">
        <h2>Ключевые преимущества</h2>
        <div className="benefits__layout">
          <div className="benefits__copy">
            {advantages.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}
          </div>
          <div className="benefits__photo"><img src={`${A}figma/figma-benefits-media.png`} alt="Завод KLEIM PRO" /></div>
        </div>
      </section>

      <section className="section blog" id="blog">
        <div className="section-heading"><h2>Наш блог</h2><a href="#all">Смотреть все <ArrowRight size={18} /></a></div>
        <div className="article-grid">
          {articles.map(([image, title, description], index) => <article key={`${image}-${index}`}>
            <img src={`${A}${image}`} alt="" />
            <div><h3>{title}</h3><p>{description}</p><span>02.07.2026</span></div>
          </article>)}
        </div>
      </section>

      <section className="section faq" id="faq">
        <h2>Часто задаваемые вопросы</h2>
        <div className="faq__layout">
          <div className="accordions">
            {faq.map(([question, answer], index) => <article className={activeFaq === index ? 'is-open' : ''} key={question}>
              <button onClick={() => setActiveFaq(activeFaq === index ? -1 : index)} aria-expanded={activeFaq === index}><span>{question}</span><i /></button>
              <div><p>{answer}</p></div>
            </article>)}
          </div>
          <LeadForm decorated />
        </div>
      </section>

      <section className="section contacts" id="contacts">
        <div className="contacts__map"><img src={`${A}figma/figma-contacts-map.png`} alt="Карта офиса KLEIM PRO" /></div>
        <div className="contact-card">
          <h2>Контакты</h2>
          <a href="tel:+78000000000">8 (800) 000-00-00</a>
          <a href="mailto:info@kleimpro.ru">info@kleimpro.ru</a>
          <p><MapPin size={24} />Россия, РТ, г. Бугульма,<br />ул. Нефтяников, д. 17, оф. 6</p>
          <div className="messengers messengers--contact"><a href="#telegram"><img src={`${A}telegram.svg`} alt="Telegram" />TG</a><i /><a href="#max"><img src={`${A}max.svg`} alt="MAX" />MAX</a></div>
        </div>
      </section>

      <footer className="footer">
        <img className="footer__background" src={`${A}figma/figma-footer-background.png`} alt="" />
        <div className="footer__top section">
          <nav><a href="#products">Каталог</a><a href="#partners">Оптовым клиентам и дилерам</a><a href="#company">О компании</a><a href="#products">Наша продукция</a><a href="#stores">Где нас купить</a><a href="#blog">Блог</a><a href="#faq">Вопросы</a><a href="#contacts">Контакты</a></nav>
          <div className="footer__contacts"><img src={`${A}logo.svg`} alt="KLEIM PRO" /><a href="tel:+78000000000">8 (800) 000-00-00</a><a href="mailto:info@kleimpro.ru">info@kleimpro.ru</a></div>
        </div>
        <div className="footer__visual"><img src={`${A}figma/figma-footer-product.png`} alt="Продукция KLEIM PRO" /></div>
        <div className="footer__bottom section"><span>Copyright © 2026</span><a href="#rules">Правила обработки персональных данных</a><a href="#privacy">Политика конфиденциальности</a></div>
      </footer>

      <button className="chat" aria-label="Написать нам"><MessageSquare fill="currentColor" /></button>
    </main>
  )
}

export default App

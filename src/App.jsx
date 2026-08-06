import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  MapPin,
  MessageSquare,
  Play,
  Search,
  X,
} from 'lucide-react'

const A = '/assets/'

const partnerCards = [
  { image: 'raw-09.jpg', title: 'Производитель полного цикла', text: 'Собственные заводы, лаборатории, контроль качества.' },
  { image: 'raw-08.jpg', title: 'Производство под СТМ', text: 'Выпускаем продукцию под вашей торговой маркой.' },
  { image: 'raw-20.png', title: 'Постоянное наличие', text: 'Большие складские остатки и стабильные поставки.' },
  { image: 'partner-full-cycle.png', title: 'Оптовые цены', text: 'Гибкие условия для дилеров и крупных заказчиков.' },
  { image: 'raw-13.png', title: 'Документы', text: 'Сертификаты, паспорта безопасности, техническая документация.' },
]

const advantages = [
  ['Разнообразный ассортимент', 'Для большого числа задач под разные сферы и материалы, 100 продуктов в диапазоне климатических условий и конечно же большая палитра цветовых решений.'],
  ['Доверие покупателей', 'Обеспечивается нашими главными свойствами — стабильность, качество и собственная ценовая политика.'],
  ['20 лет', 'Производим высококачественную продукцию.'],
]

const articles = [
  ['raw-16.jpg', 'Как устроено производство герметиков полного цикла'],
  ['raw-10.jpg', 'Контроль качества: от сырья до готовой партии'],
  ['raw-14.jpg', 'Что важно знать при выборе промышленного герметика'],
  ['raw-18.png', 'Как подобрать состав под конкретную задачу'],
]

const faq = [
  ['Для каких работ подходит акриловый герметик A201?', 'Акриловый герметик KLEIM PRO A201 — универсальный морозостойкий состав для внутренних и наружных работ.'],
  ['Можно ли использовать герметики KLEIM PRO при отрицательных температурах?', 'Да, часть линейки рассчитана на зимнее нанесение. Точный температурный диапазон указан в техническом паспорте продукта.'],
  ['Какой срок годности у продукции?', 'Срок зависит от состава и упаковки. В среднем — от 12 до 18 месяцев при соблюдении условий хранения.'],
  ['Выпускаете ли вы продукцию под частной торговой маркой?', 'Да. Разрабатываем рецептуру, дизайн упаковки и производим партии под СТМ заказчика.'],
  ['Можно ли заказать образцы перед оптовой закупкой?', 'Да, менеджер поможет подобрать продукты и согласует комплект образцов для тестирования.'],
]

function Button({ children, dark = false, type = 'button', onClick }) {
  return (
    <button className={`button ${dark ? 'button--dark' : ''}`} type={type} onClick={onClick}>
      <span>{children}</span>
      <img src={`${A}arrow-up-right.svg`} alt="" />
    </button>
  )
}

function Header({ menuOpen, setMenuOpen }) {
  return (
    <header className="header">
      <a href="#top" className="logo" aria-label="KLEIM PRO">
        <img src={`${A}logo.svg`} alt="KLEIM PRO" />
      </a>
      <button className="catalog-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}>
        {menuOpen ? <X size={24} /> : <img src={`${A}menu.svg`} alt="" />}
        Каталог
      </button>
      <nav className={`nav ${menuOpen ? 'nav--open' : ''}`}>
        <a href="#company">О компании <ChevronDown size={16} /></a>
        <a href="#partners">Оптовым клиентам и дилерам</a>
        <a href="#products">Наша продукция</a>
        <a href="#blog">Блог</a>
        <a href="#contacts">Контакты</a>
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
    </header>
  )
}

function LeadForm({ compact = false }) {
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
    </form>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeFaq, setActiveFaq] = useState(0)

  return (
    <main id="top">
      <section className="hero">
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <div className="hero__shade" />
        <div className="hero__decor" aria-hidden="true" />
        <div className="hero__content">
          <div className="eyebrow"><span />Более 500 позиций в наличии</div>
          <h1>Производство<br />профессиональных<br />герметиков<br />и клеевых систем</h1>
          <p>Надежный производитель строительной химии для бизнеса. Обеспечиваем строительные компании, дилеров, торговые сети и производственные предприятия профессиональными герметиками и клеевыми системами с гарантией стабильного качества и поставок.</p>
          <Button>Оптовым клиентам и дилерам</Button>
        </div>
        <button className="play" aria-label="Смотреть видео"><Play size={42} /></button>
      </section>

      <section className="section company" id="company">
        <div className="company__image">
          <img src={`${A}raw-16.jpg`} alt="Производственный комплекс KLEIM PRO" />
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
          {['Лемана ПРО', 'Петрович', 'Лемана ПРО', 'Лемана ПРО', 'Все инструменты', 'Максидом'].map((name, index) => <span className={`retailer retailer--${index + 1}`} key={`${name}-${index}`}>{name}</span>)}
          <button>Все магазины <ArrowRight size={18} /></button>
        </div>
        <div className="map-visual">
          <img className="map-export" src={`${A}map-section.png`} alt="География продаж KLEIM PRO" />
          <img className="map-mobile" src={`${A}raw-05.png`} alt="Карта городов продаж" />
        </div>
      </section>

      <section className="section benefits">
        <h2>Ключевые преимущества</h2>
        <div className="benefits__layout">
          <div className="benefits__copy">
            {advantages.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}
          </div>
          <div className="benefits__photo"><img src={`${A}raw-17.jpg`} alt="Завод KLEIM PRO" /><div><strong>10 млн+</strong><span>единиц продукции в год</span></div></div>
        </div>
      </section>

      <section className="section blog" id="blog">
        <div className="section-heading"><h2>Наш блог</h2><a href="#all">Читать все <ArrowRight size={18} /></a></div>
        <div className="article-grid">
          {articles.map(([image, title], index) => <article key={title}>
            <img src={`${A}${image}`} alt="" />
            <div><span>0{index + 1}.08.2026</span><h3>{title}</h3><a href="#read">Читать статью <ArrowRight size={16} /></a></div>
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
          <LeadForm />
        </div>
      </section>

      <section className="section contacts" id="contacts">
        <div className="contacts__map"><img src={`${A}raw-06.png`} alt="Карта офиса KLEIM PRO" /></div>
        <div className="contact-card">
          <h2>Контакты</h2>
          <a href="tel:+78000000000">8 (800) 000-00-00</a>
          <a href="mailto:info@kleimpro.ru">info@kleimpro.ru</a>
          <p><MapPin size={24} />Россия, РТ, г. Бугульма,<br />ул. Нефтяников, д. 17, оф. 6</p>
          <div className="messengers messengers--contact"><a href="#telegram"><img src={`${A}telegram.svg`} alt="Telegram" />TG</a><i /><a href="#max"><img src={`${A}max.svg`} alt="MAX" />MAX</a></div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer__top section">
          <nav><a href="#products">Каталог</a><a href="#partners">Оптовым клиентам и дилерам</a><a href="#company">О компании</a><a href="#products">Наша продукция</a><a href="#stores">Где нас купить</a><a href="#blog">Блог</a><a href="#faq">Вопросы</a><a href="#contacts">Контакты</a></nav>
          <div className="footer__contacts"><img src={`${A}logo.svg`} alt="KLEIM PRO" /><a href="tel:+78000000000">8 (800) 000-00-00</a><a href="mailto:info@kleimpro.ru">info@kleimpro.ru</a></div>
        </div>
        <div className="footer__visual"><img src={`${A}raw-07.png`} alt="Продукция KLEIM PRO" /></div>
        <div className="footer__bottom section"><span>Copyright © 2026</span><a href="#rules">Правила обработки персональных данных</a><a href="#privacy">Политика конфиденциальности</a></div>
      </footer>

      <button className="chat" aria-label="Написать нам"><MessageSquare fill="currentColor" /></button>
    </main>
  )
}

export default App

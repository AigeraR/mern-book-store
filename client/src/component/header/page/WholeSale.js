import React from 'react';
import Header from '../Header';
import Breadcrumbs from '../../Breadcrumbs';
import Footer from '../../footer/Footer';

const WholeSale = () => {
  return (
    <>
      <Header />
      <div>
      <Breadcrumbs />
      </div>
      <div className="max-w-7xl mx-auto font-open-sans items-center justify-center bg-white pr-40 pl-40 pt-12">
        
        <h1 className="text-3xl font-bold text-center mb-6">Оптовым покупателям</h1>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Условия оптовой покупки</h2>
          <p>
            Мы предлагаем выгодные условия для оптовых покупателей. Если вы хотите приобрести наши книги в большом количестве, мы предоставляем специальные скидки и условия сотрудничества.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Как сделать оптовый заказ</h2>
          <p>
            Для того чтобы сделать оптовый заказ, выполните следующие шаги:
          </p>
          <ol className="list-decimal ml-5 mt-2">
            <li>Свяжитесь с нами по телефону или электронной почте для обсуждения деталей заказа.</li>
            <li>Определите количество и список книг, которые хотите заказать.</li>
            <li>Подпишите договор на оптовую поставку.</li>
            <li>Произведите оплату удобным для вас способом.</li>
            <li>Ожидайте доставку согласно оговоренным срокам.</li>
          </ol>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Преимущества работы с нами</h2>
          <ul className="list-disc ml-5 mt-2">
            <li>Высококачественная продукция по выгодным ценам</li>
            <li>Гибкие условия оплаты и доставки</li>
            <li>Персональный менеджер для каждого клиента</li>
            <li>Возможность возврата и обмена товара</li>
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Контакты для оптовых покупателей</h2>
          <p>
            Если у вас есть вопросы или вы хотите сделать оптовый заказ, свяжитесь с нами:
          </p>
          <p>
            Телефон: +996(708) 17 29 88
          </p>
          <p>
            Email: wholesale@ourbookstore.com
          </p>
        </section>
      </div>
      <Footer/>
    </>
  );
}

export default WholeSale;

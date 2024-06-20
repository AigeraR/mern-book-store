
import React from 'react';
import Header from '../Header';
import Breadcrumbs from '../../Breadcrumbs';
import Footer from '../../footer/Footer';

const Delivery = () => {
    return (
        <>
            <Header />
            <div>
                <Breadcrumbs />
            </div>
            <div className="max-w-7xl mx-auto font-open-sans items-center justify-center bg-white pr-40 pl-40 pt-12">
                <h1 className="text-3xl font-bold text-center mb-6">Доставка</h1>
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Условия доставки</h2>
                    <p>
                        Мы предлагаем несколько вариантов доставки для вашего удобства. Вы можете выбрать наиболее подходящий вариант в зависимости от вашего местоположения и предпочтений.
                    </p>
                </section>
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Способы доставки</h2>
                    <ul className="list-disc ml-5 mt-2">
                        <li>Курьерская доставка</li>
                        <li>Доставка почтой</li>
                        <li>Самовывоз</li>
                    </ul>
                </section>
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Сроки доставки</h2>
                    <p>
                        Сроки доставки зависят от выбранного способа и вашего местоположения. Курьерская доставка обычно занимает от 1 до 3 дней, почтовая доставка - от 3 до 7 дней.
                    </p>
                </section>
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Стоимость доставки</h2>
                    <p>
                        Стоимость доставки зависит от выбранного способа и суммы заказа. Мы предлагаем бесплатную доставку для заказов на сумму свыше 5000 рублей.
                    </p>
                </section>
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Контакты службы доставки</h2>
                    <p>
                        Если у вас есть вопросы по поводу доставки, вы можете связаться с нашей службой поддержки по телефону +996(708) 17 29 88 или по электронной почте delivery@ourbookstore.com.
                    </p>
                </section>
            </div>
            <Footer/>
            
        </>
    );
}

export default Delivery;

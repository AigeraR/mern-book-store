import React from 'react';
import Header from '../Header';
import Breadcrumbs from '../../Breadcrumbs';
import Footer from '../../footer/Footer';

const Payment = () => {
    return (
        <>
            <Header />
            <div>
                <Breadcrumbs />
            </div>
            <div className="max-w-7xl mx-auto font-open-sans items-center justify-center bg-white pr-40 pl-40 pt-12">

                <h1 className="text-3xl font-bold text-center mb-6">Оплата</h1>
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Способы оплаты</h2>
                    <p>
                        Мы предлагаем различные способы оплаты, чтобы сделать покупку удобной и безопасной для вас:
                    </p>
                    <ul className="list-disc ml-5 mt-2">
                        <li>Банковские карты (Visa, MasterCard, Маэстро)</li>
                        <li>Электронные кошельки (PayPal, Яндекс.Деньги, QIWI)</li>
                        <li>Безналичный расчет для юридических лиц</li>
                    </ul>
                </section>
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Инструкция по оплате</h2>
                    <p>
                        Для оплаты заказа выполните следующие шаги:
                    </p>
                    <ol className="list-decimal ml-5 mt-2">
                        <li>Выберите товары и добавьте их в корзину</li>
                        <li>Перейдите в корзину и нажмите кнопку "Оформить заказ"</li>
                        <li>Заполните необходимые данные и выберите способ оплаты</li>
                        <li>Следуйте инструкциям на экране для завершения оплаты</li>
                    </ol>
                </section>
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Безопасность платежей</h2>
                    <p>
                        Мы гарантируем безопасность ваших платежных данных. Все транзакции защищены и проходят через надежные платежные системы.
                    </p>
                </section>
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Возврат средств</h2>
                    <p>
                        В случае отмены заказа или возврата товара, возврат средств будет произведен на тот же платежный метод, который использовался для оплаты заказа. Время возврата средств может зависеть от политики вашего банка или платежной системы.
                    </p>
                </section>
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Контакты</h2>
                    <p>
                        Если у вас возникли вопросы по поводу оплаты, пожалуйста, свяжитесь с нашей службой поддержки по телефону +996(708) 17 29 88 или по электронной почте support@ourbookstore.com. Мы будем рады помочь вам!
                    </p>
                </section>
            </div>
            <Footer />
        </>
    );
}

export default Payment;

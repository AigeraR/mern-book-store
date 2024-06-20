import React from 'react';
import Header from '../Header';
import Breadcrumbs from '../../Breadcrumbs';
import Footer from '../../footer/Footer';
const AboutUs = () => {
    return (
        <>
            <Header />
            <div>
                <Breadcrumbs />
            </div>
            <div className="max-w-7xl mx-auto font-open-sans items-center justify-center bg-white pr-40 pl-40 pt-8">
                <h1 className="text-3xl font-bold text-center mb-6">О нас</h1>
                <section className="mb-6">
                    <h2 className="text-2xl mb-5">Наша миссия</h2>
                    <p>
                        Наша миссия - предоставлять высококачественные книги, которые вдохновляют, обучают и развлекают наших читателей. Мы стремимся к созданию сообщества любителей книг, которые могут найти и поделиться своими любимыми произведениями.
                    </p>
                </section>
                <section className="mb-6">
                    <h2 className="text-2xl  mb-2">История компании</h2>
                    <p>
                        Наша компания была основана в 2020 году с целью сделать книги доступными для всех. С тех пор мы выросли в крупный книжный магазин, предлагающий широкий ассортимент книг различных жанров. Мы гордимся тем, что обслуживаем наших клиентов и поддерживаем авторов со всего мира.
                    </p>
                </section>
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Команда</h2>
                    <p>
                        Наша команда состоит из преданных своему делу профессионалов, которые любят книги так же сильно, как и наши клиенты. Мы работаем усердно, чтобы предоставить вам лучшие книги и лучший сервис.
                    </p>
                </section>
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Контакты</h2>
                    <p>
                        Если у вас есть вопросы или предложения, пожалуйста, свяжитесь с нами по телефону +996(708) 17 29 88 или по электронной почте info@ourbookstore.com. Мы будем рады помочь вам!
                    </p>
                </section>
            </div>
            <Footer/>
        </>
    );
}

export default AboutUs;

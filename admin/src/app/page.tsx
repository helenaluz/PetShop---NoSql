import Image from "next/image";
import Link from 'next/link';
import style from './page.module.css'
import { useState } from "react";


export default function Home() {
  return (
    <section className={style.section}>
    <main>      
      <div>
        <h1 className={style.titulo}> Bem vindo administrador!</h1>
        <h1 className={`display-5 p-3 ${style.texto2}`}>Acesso rápido</h1>
        <div className="container d-flex justify-content-around">
          <div
            className="card text-bg-dark m-2 servico"
            id="veterinario"
            style={{ width: '20rem' }}
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGcv25gPu69uUIwPHWhqsQauv4E9FVhk7bCw&s"
              className="card-img overlay"
              alt="..."
              style={{ objectFit: 'cover', height: '100%' }}
            />
            <div className="card-img-overlay">
              <h5 className="card-title"></h5>
              <p className="card-text"></p>
            </div>
            <div
              className="card-img-overlay d-flex flex-column justify-content-end align-items-center"
            >
              <button type="button" className="btn btn-light"><a>Consultas</a></button>
            </div>
          </div>
          <div
            className="card text-bg-dark m-2 servico overlay"
            id="adocao"
            style={{ width: '20rem' }}
          >
            <img
              src="https://premierpet.com.br/wp-content/uploads/2023/12/model-banner-siames-mobile-v1-1024x1024.png"
              className="card-img overlay"
              alt="..."
              style={{ objectFit: 'cover', height: '100%' }}
            />
            <div className="card-img-overlay">
              <h5 className="card-title"></h5>
              <p className="card-text"></p>
            </div>
            <div
              className="card-img-overlay d-flex flex-column justify-content-end align-items-center"
            >
              <button type="button" className="btn btn-light">Pets</button>
            </div>
          </div>
          <div
            className="card text-bg-dark m-2 servico overlay"
            id="petshop"
            style={{ width: '20rem' }}
          >
            <img
              src="https://fisiocarepet.com.br/wp-content/uploads/2022/04/frases-capa.png"
              className="card-img overlay"
              alt="..."
              style={{ objectFit: 'cover', height: '100%' }}
            />
            <div className="card-img-overlay">
              <h5 className="card-title"></h5>
              <p className="card-text"></p>
            </div>
            <div
              className="card-img-overlay d-flex flex-column justify-content-end align-items-center"
            >
              <button type="button" className="btn btn-light">PetShop</button>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-4">
        <h1 className={`display-5 p-3 ${style.texto2}`}>Quem Somos</h1>
        <blockquote className={`blockquote ps-5 ${style.texto2}`}>
          <p>
            Somos uma empresa focada em animais dométicos destinada a fazer o
            seu dia e o dia do seu bichinho melhor! <br />
            Criada em 2023 por uma aspirante em veterinária nós já mudamos a
            vida de diversos animais
          </p>
        </blockquote>
      </div>
    </main>
    </section>
  );
}
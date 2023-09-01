
import { getUsers } from '../service/getUsers.js';
import { updateMessage } from '../../message/service/updateMessage.js';
import { getMessages } from '../../message/service/getMessages.js';
import { DateTime } from 'https://moment.github.io/luxon/es6/luxon.js';
const params = new URLSearchParams(window.location.search);
const ID = params.get('id');
let ID2 = 0;
let listMessages = await getMessages();
let listUsers = await getUsers();

const SEND_MESSAGE = document.querySelector('.container__whatsapp__myChat__barraChats__formulario-input');
const IMG_SEND = document.querySelector('.container__whatsapp__myChat__barraChats__formulario-send');
const TEMPLATE_CHANGE_IMAGE = document.querySelector('.container__whatsapp__changeImagen');
const TEMPLATE_MY_CONTACTS = document.querySelector('.container__whatsapp__myContacts');
const ARROW_BACK_PERFIL = document.querySelector('.container__whatsapp__changeImagen__header__imgPerfil-arrow');
const EDIT_NAME = document.querySelector('.container__whatsapp__changeImagen__body__data__formulario__nameImg-img');
const INPUT_EDIT = document.querySelector('.container__whatsapp__changeImagen__body__data__formulario__nameImg-name');
const SEND_MESSAGE_MY_CHAT = document.querySelector('.container__whatsapp__myChat__header-search');
const TEMPLETE_INFO_MESSAGE = document.querySelector('.container__whatsapp__infoMesagge');
const CLOSE_TEMPLETE_INFO_MESSAGE = document.querySelector('.container__whatsapp__infoMesagge__header-closeIcon');
const CONTAINER_SEND_MESSAGE = document.querySelector('.container__whatsapp__myChat__fondo__mensajeEnviado__contenedor');
const ARROW_DOWN_SEND = document.querySelector('.container__whatsapp__myChat__fondo__mensajeEnviado__contenedor__message-arrow');
const CONTAINER_RECEIVE_MESSAGE = document.querySelector('.container__whatsapp__myChat__fondo__mensajeRecibido__contenedor');
const ARROW_DOWN_RECEIVE = document.querySelector('.container__whatsapp__myChat__fondo__mensajeRecibido__contenedor__message-arrow');
const LIST_MESSAGE_SEND = document.querySelector('.container__whatsapp__myChat__fondo__mensajeEnviado__contenedor__message-arrow-lista');
const LIST_MESSAGE_RECEIVE = document.querySelector('.container__whatsapp__myChat__fondo__mensajeRecibido__contenedor__message-arrow-lista');
const CONTAINER_CARD = document.querySelector('.container__whatsapp__myContacts__card')
const CONTAINER_HEADER_USER = document.querySelector('.container__whatsapp__myContacts__header');


export const LOADING_IMAGE_PROFILE = async () => {
    let user = listUsers.find(user => user.id == ID);
    const img = `<img class="container__whatsapp__myContacts__header-user" src="${user.urlImgPerfil}" alt="userMyContacts"></img>`
    CONTAINER_HEADER_USER.innerHTML = img;
}
/*Listar la lista de mensajes de cada usuario */
export const LIST_MY_CHAT = async () => {
    let user = listUsers.find(user => user.id == ID);
    let mylistMessages = listMessages.filter(index => index.idUser1 == ID || index.idUser2 == ID)
    let html = ``;
    let user2;
    mylistMessages.forEach((message) => {
        if (parseInt(ID) === message.idUser1) {
            user2 = listUsers.find(index => index.id == message.idUser2);
        } else {
            user2 = listUsers.find(index => index.id == message.idUser1);
        }
        const DIV_CARD = `<div id ="${user2.id}" class= "container__whatsapp__myContacts__card__cardContact">
        <img class="fas fa-search container__whatsapp__myContacts__card__cardContact-imagen" src=${user2.urlImgPerfil} alt="userContact">
        <div class="container__whatsapp__myContacts__card__cardContact__text">
            <div class="container__whatsapp__myContacts__card__cardContact__text__nameDate">
                <h5 class="container__whatsapp__myContacts__card__cardContact__text__nameDate-name">${user2.nombre}</h5>
                <h6 class="container__whatsapp__myContacts__card__cardContact__text__nameDate-date">${message.conversaciones[message.conversaciones.length - 1].hour} </h6>
            </div>
            <div class="container__whatsapp__myContacts__card__cardContact__text__imgText">
                <img class="container__whatsapp__myContacts__card__cardContact__text__imgText-img" src="img/check.png" alt="">
                <h6 class="container__whatsapp__myContacts__card__cardContact__text__imgText-text">
                    ${message.conversaciones[message.conversaciones.length - 1].message}
                </h6>
            </div>
        </div>
    </div>`;
        html += DIV_CARD;
    })
    CONTAINER_CARD.innerHTML = html;
}
/*Cargar la foto de perfil del usuario que se selecciono para chatear */
export const LOADDING_CHAT = async (ID2) => {
    let user = listUsers.find(user => user.id == ID);
    let user2 = listUsers.find(user => user.id == ID2);
    const div = document.querySelector('.container__whatsapp__myChat__header__imgUserLine');
    const IMAGE_PERFIL =
        `<img class="container__whatsapp__myChat__header__imgUserLine-img" src="${user2.urlImgPerfil}" alt="user_chat">
    <div class="container__whatsapp__myChat__header__imgUserLine__userLine">
        <h5 class="container__whatsapp__myChat__header__imgUserLine__userLine-name">${user2.nombre}</h5>
        <h6 class="container__whatsapp__myChat__header__imgUserLine__userLine-line"> ${user2.fechaHoraEnLinea}</h6>
    </div>`
    div.innerHTML = IMAGE_PERFIL;
}
/*Cargar los mensajes de chat  selecionado */
export const LOADING_MESSAGES = async (ID2) => {
    let user = listUsers.find(user => user.id == ID);
    let user2 = listUsers.find(user => user.id == ID2);
    let mylistMessages = listMessages.find(message => message.idUser1 == ID && message.idUser2 == ID2 || message.idUser1 == ID2 && message.idUser2 == ID);
    let html = ``;
    let div = document.querySelector('.container__whatsapp__myChat__fondo');
    mylistMessages.conversaciones.forEach((message) => {
        if (message.sendBy == ID) {
            const DIV_MENSSAGE_SEND =
            `
            <div class="container__whatsapp__myChat__fondo__mensajeEnviado">
            <div class="container__whatsapp__myChat__fondo__mensajeEnviado__contenedor">
                <div class="container__whatsapp__myChat__fondo__mensajeEnviado__contenedor__message">
                    <h5 class="container__whatsapp__myChat__fondo__mensajeEnviado__contenedor__message-text">${message.message} </h5>
                    <li><img class="container__whatsapp__myChat__fondo__mensajeEnviado__contenedor__message-arrow" src="img/icon-arrow-down.svg" alt="iconArrow">
                        <ul class="container__whatsapp__myChat__fondo__mensajeEnviado__contenedor__message-arrow-lista">
                            <li class="container__whatsapp__myChat__fondo__mensajeEnviado__contenedor__message-arrow-lista__textEdit">Editar <img class="container__whatsapp__myChat__fondo__mensajeRecibido__contenedor__message-arrow-lista__editImag" src="img/editar-codigo.png" alt="icon edit"> </li>
                            <li class="container__whatsapp__myChat__fondo__mensajeEnviado__contenedor__message-arrow-lista__textDelete">Eliminar <img class="container__whatsapp__myChat__fondo__mensajeRecibido__contenedor__message-arrow-lista__deleteImag" src="img/basura.png" alt="icon delete"></li>
                        </ul>
                    </li>
                </div>
                <div class="container__whatsapp__myChat__fondo__mensajeEnviado__contenedor-img">
                    <h6 class="container__whatsapp__myChat__fondo__mensajeEnviado__contenedor-img_date">${message.hour.toLocaleString(DateTime.TIME_SIMPLE)} </h6>
                    <img class="container__whatsapp__myChat__fondo__mensajeEnviado__contenedor-img_img" src="img/check.png" alt="mesage enviado">
                </div>
            </div>
        </div>
            `
            html += DIV_MENSSAGE_SEND;
        } else {
            const DIV_MENSSAGE_SEND =
            `
            <div class="container__whatsapp__myChat__fondo__mensajeRecibido">
                        <div class="container__whatsapp__myChat__fondo__mensajeRecibido__contenedor">
                            <div class="container__whatsapp__myChat__fondo__mensajeRecibido__contenedor__message">
                                <h5 class="container__whatsapp__myChat__fondo__mensajeRecibido__contenedor__message-text"> ${message.message}</h5>
                                    <li><img class="container__whatsapp__myChat__fondo__mensajeRecibido__contenedor__message-arrow" src="img/icon-arrow-down.svg" alt="iconArrow">
                                        <ul class="container__whatsapp__myChat__fondo__mensajeRecibido__contenedor__message-arrow-lista">
                                            <li class="container__whatsapp__myChat__fondo__mensajeRecibido__contenedor__message-arrow-lista__textEdit">Editar <img class="container__whatsapp__myChat__fondo__mensajeRecibido__contenedor__message-arrow-lista__editImag" src="img/editar-codigo.png" alt="icon edit"> </li>
                                            <li class="container__whatsapp__myChat__fondo__mensajeRecibido__contenedor__message-arrow-lista__textDelete">Eliminar <img class="container__whatsapp__myChat__fondo__mensajeRecibido__contenedor__message-arrow-lista__deleteImag" src="img/basura.png" alt="icon delete"></li>
                                        </ul>
                                    </li>
                            </div>
                            <div class="container__whatsapp__myChat__fondo__mensajeRecibido__contenedor-img">
                                <h6 class="container__whatsapp__myChat__fondo__mensajeRecibido__contenedor-img_date">${message.hour.toLocaleString(DateTime.TIME_SIMPLE)} </h6>
                                <img class="container__whatsapp__myChat__fondo__mensajeRecibido__contenedor-img_img" src="img/check.png" alt="mesage enviado">
                            </div>
                        </div>
                        
                    </div>`
        html += DIV_MENSSAGE_SEND;
        }
    });
    div.innerHTML = html;
}
export const LAST_MESSAGE = async () => {
    let bandera_fecha ={
        "date": '30/12/2000',
        "hour": '00:00 p.m'
    }
    let mylistMessages = listMessages.filter(message => message.idUser1 == ID || message.idUser2 == ID);
    mylistMessages.forEach((message) => {
        console.log(message.conversaciones[message.conversaciones.length - 1].date);
        if (message.conversaciones[message.conversaciones.length - 1].date > bandera_fecha.date) {
             bandera_fecha.date = message.conversaciones[message.conversaciones.length - 1].date;
             bandera_fecha.hour = message.conversaciones[message.conversaciones.length - 1].hour;
        }else if(message.conversaciones[message.conversaciones.length-1].date == bandera_fecha.date){
             if(message.conversaciones[message.conversaciones.length - 1].hour > bandera_fecha.hour){
                 bandera_fecha.date = message.conversaciones[message.conversaciones.length - 1].date;
                 bandera_fecha.hour = message.conversaciones[message.conversaciones.length - 1].hour;
                 }
         }
    });
    return bandera_fecha;
}
export const LAST_CHAT = async () => {
    let bandera_fecha=  await LAST_MESSAGE();
    console.log(bandera_fecha);
}
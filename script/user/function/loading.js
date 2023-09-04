
import { getUsers } from '../service/getUsers.js';
import { updateMessage } from '../../message/service/updateMessage.js';
import { getMessages } from '../../message/service/getMessages.js';
import { DateTime } from 'https://moment.github.io/luxon/es6/luxon.js';
import { updatePhotoUser } from '../service/updatePhoto.js';
const params = new URLSearchParams(window.location.search);
const ID = params.get('id');
let ID2 = 0;
let listMessages = await getMessages();
let listUsers = await getUsers();

const CONTAINER_CARD = document.querySelector('.container__whatsapp__myContacts__card')
const CONTAINER_HEADER_USER = document.querySelector('.container__whatsapp__myContacts__header');


/*Imagen del usuario en watsApp */
export const LOADING_IMAGE_PROFILE = async () => {
    let user = listUsers.find(user => user.id == ID);
    const img = `<img class="container__whatsapp__myContacts__header-user" src="${user.urlImgPerfil}" alt="userMyContacts"></img>`
    CONTAINER_HEADER_USER.innerHTML = img;
}
/*Imagen del usario en el panel change imagen */
const CHANGE_IMAGEN = document.querySelector('.container__whatsapp__changeImagen__body__img');
export const IMAGEN_PANEL_CHANGE_IMAGEN = async()=>{
    let user = listUsers.find(user=> user.id == ID);
    const IMG_CHANGE_IMAGEN = `<img class="container__whatsapp__changeImagen__body__img-img" src="${user.urlImgPerfil}" alt="fondoChangeImg">`
    CHANGE_IMAGEN.innerHTML = IMG_CHANGE_IMAGEN;    
}
/*Url por defecto del usuario que ingreso */

const URL_CHANGE_IMAGEN = document.querySelector('.container__whatsapp__changeImagen__body__ChangeImagen__formulario__nameImg');

export const URL_DEFECTO = async()=>{
    let user = listUsers.find(user=> user.id == ID);
    const URLDEFECTO = `
                        <input type="url" id="url" class="container__whatsapp__changeImagen__body__ChangeImagen__formulario__nameImg-name" value="${user.urlImgPerfil}"  >
                        <img class="container__whatsapp__changeImagen__body__ChangeImagen__formulario__nameImg-img" src="https://res.cloudinary.com/dbktnqag9/image/upload/v1693670649/right_or_wrong_4_preview_fntwpz.png" alt="edit">
                        `
    URL_CHANGE_IMAGEN.innerHTML = URLDEFECTO;
       
    
}

/*Cargar el nombre del usuario */
const ADDNAME =document.querySelector('.container__whatsapp__changeImagen__body__data__formulario__nameImg');
export const NAME_USER = async () => {
    let user = listUsers.find(user => user.id == ID);
    const name = `
                <input type="text" id="nombre" class="container__whatsapp__changeImagen__body__data__formulario__nameImg-name" value="${user.nombre}" disabled>
                <img class="container__whatsapp__changeImagen__body__data__formulario__nameImg-img" src="img/edit.png" alt="edit">
                `
    ADDNAME.innerHTML = name;
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
const CONTAINER_SEND_MESSAGE = document.querySelector('.container__whatsapp__myChat__fondo__mensajeEnviado__contenedor');
const ARROW_DOWN_SEND = document.querySelector('.container__whatsapp__myChat__fondo__mensajeEnviado__contenedor__message-arrow');
const CONTAINER_RECEIVE_MESSAGE = document.querySelector('.container__whatsapp__myChat__fondo__mensajeRecibido__contenedor');
const ARROW_DOWN_RECEIVE = document.querySelector('.container__whatsapp__myChat__fondo__mensajeRecibido__contenedor__message-arrow');
export const LAST_CHAT = async () => {
    let bandera_fecha=  await LAST_MESSAGE();
}



/*Mostrar y desaparecer la flecha de opciones de los mensajes enviados */
CONTAINER_SEND_MESSAGE.addEventListener('mouseover', () => {
    ARROW_DOWN_SEND.style.display = 'block';
});
CONTAINER_SEND_MESSAGE.addEventListener('mouseout', () => {
    ARROW_DOWN_SEND.style.display = 'none';
});
/*Mostrar y desaparecer la lista desplegable de los mensajes enviados */
ARROW_DOWN_SEND.addEventListener('click', () => {
    LIST_MESSAGE_SEND.style.display = 'block';
});
ARROW_DOWN_SEND.addEventListener('dblclick', () => {
    LIST_MESSAGE_SEND.style.display = 'none';
});
/*Mostrar y desaparecer la flecha de opciones de los mensajes recividos */
CONTAINER_RECEIVE_MESSAGE.addEventListener('mouseover', () => {
    ARROW_DOWN_RECEIVE.style.display = 'block';
});
CONTAINER_RECEIVE_MESSAGE.addEventListener('mouseout', () => {
    ARROW_DOWN_RECEIVE.style.display = 'none';
});
/*Mostrar y desaparecer la lista desplegable de los mensajes enviados */
ARROW_DOWN_RECEIVE.addEventListener('click', () => {
    LIST_MESSAGE_RECEIVE.style.display = 'block';
});
ARROW_DOWN_RECEIVE.addEventListener('dblclick', () => {
    LIST_MESSAGE_RECEIVE.style.display = 'none';
});



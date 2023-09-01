
import { getUsers } from './user/service/getUsers.js';
import { getMessages } from './message/service/getMessages.js';
import { updateMessage } from './message/service/updateMessage.js';
import { DateTime } from 'https://moment.github.io/luxon/es6/luxon.js';
import {LOADING_IMAGE_PROFILE,LIST_MY_CHAT,LOADDING_CHAT,LOADING_MESSAGES,LAST_MESSAGE,LAST_CHAT} from './user/function/loading.js';


/*Capturar los parametros que recibimos en la URL*/ 
const params = new URLSearchParams(window.location.search);
/* Constante con la id del usuaario que inicio sesion */
const ID = params.get('id');
/* Constante con la id del usuaario que se selecciono para chatear, cambiara cada vez que se selecione otro chat*/
let ID2 = 0;
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

/*Realizamos dos gets uno para obtener infornacion de los mensajes y otros de los usuarios*/
let listMessages = await getMessages();
let listUsers = await getUsers();

/*Cambiar icono, cuanto este escribiendo un mensaje */
SEND_MESSAGE.addEventListener('input', () => {
    if (SEND_MESSAGE.value === "") {
        IMG_SEND.src = "img/microphone.png";
    } else {
        IMG_SEND.src = "img/iconEnviarMensaje.png";
    }

});

/*Enviar Mensaje del usuario con sesion iniciada al del ultimo chat seleccionado*/
SEND_MESSAGE.addEventListener('keypress', async (e) => {
    /*Se enviara el mensaje cuando se presione la tecla enter, falta hacer validacion de el boton que se encuentra al lado izquierdo*/ 
    if (e.key === 'Enter') {
        /*Obtenemos la informacino del usuario que inicio sesion y el usuario que se selecciono para chatear*/
        let user = listUsers.find(user => user.id == ID);
        let user2 = listUsers.find(user => user.id == ID2);
        let message = listMessages.find(message => message.idUser1 == ID && message.idUser2 == ID2 || message.idUser1 == ID2 && message.idUser2 == ID);
        message.conversaciones.push(
            {
                "sendBy": ID,
                "date": DateTime.now().toLocaleString(),
                "hour": DateTime.local().toLocaleString(DateTime.TIME_WITH_SECONDS),
                "message": SEND_MESSAGE.value,
                "flag": false
            }
        );
        let data = updateMessage(parseInt(ID), parseInt(ID2), message.id, message.conversaciones);
        SEND_MESSAGE.value = "";
        listMessages = await getMessages();
    }
});

/*Dar click en arrow, para volver al home */
ARROW_BACK_PERFIL.addEventListener('click', () => {
    TEMPLATE_CHANGE_IMAGE.style.display = 'none';
    TEMPLATE_MY_CONTACTS.style.display = 'block';
});

/*Editar el nombre */
EDIT_NAME.addEventListener('click', () => {
    INPUT_EDIT.readOnly = true;
    INPUT_EDIT.style.border = "2px solid black";
});

/*Templete de buscar los mensajes */
SEND_MESSAGE_MY_CHAT.addEventListener('click', () => {
    TEMPLETE_INFO_MESSAGE.style.display = 'block';
});

CLOSE_TEMPLETE_INFO_MESSAGE.addEventListener('click', () => {
    TEMPLETE_INFO_MESSAGE.style.display = 'none';
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


/*Listar la lista de mensajes de cada usuario */

/*Cargar la foto de perfil del usuario que se selecciono para chatear */

/*Cargar los mensajes de chat  selecionado */


LAST_CHAT();
LOADING_IMAGE_PROFILE();
LIST_MY_CHAT();
/*Los siguientes container los cargamos aqui y no en el principio de la script para no generar errores*/
const MY_CONTACTS_CARD = document.querySelectorAll('.container__whatsapp__myContacts__card__cardContact');
const CHANGE_PERSONAL_INFORMATION = document.querySelector('.container__whatsapp__myContacts__header-user');
console.log(CONTAINER_CARD)
console.log('Lista',MY_CONTACTS_CARD)
/*Poner en otro color cuando se seleccione una card */
CONTAINER_CARD.addEventListener('click', () => {
    MY_CONTACTS_CARD.forEach((card) => {
        card.addEventListener('click', () => {
            card.style.backgroundColor = '#e9e9e9';
            ID2 = parseInt(card.id);
            LOADDING_CHAT(card.id);
            LOADING_MESSAGES(card.id);
        });
        if(card.id != ID2){
            card.style.backgroundColor = '#ffffff';
        }
    });
});

/*Dar click en la foto, para cambiar los datos */
CHANGE_PERSONAL_INFORMATION.addEventListener('click', () => {
    TEMPLATE_CHANGE_IMAGE.style.display = 'block';
    TEMPLATE_MY_CONTACTS.style.display = 'none';
});

/*Mostrar y desaparecer la flecha de opciones de los mensajes enviados */
CONTAINER_SEND_MESSAGE.addEventListener('mouseover', () => {
    ARROW_DOWN_SEND.style.display = 'block';
});
CONTAINER_SEND_MESSAGE.addEventListener('mouseout', () => {
    ARROW_DOWN_SEND.style.display = 'none';
});

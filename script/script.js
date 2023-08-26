import {getMessages} from './getMessages.js';

const params = new URLSearchParams(window.location.search);
const ID = params.get('id');

const MY_CONTACTS_CARD = document.querySelector('.container__whatsapp__myContacts__cardContact');
const SEND_MESSAGE = document.querySelector('.container__whatsapp__myChat__barraChats__formulario-input');
const IMG_SEND = document.querySelector('.container__whatsapp__myChat__barraChats__formulario-send');
const CHANGE_PERSONAL_INFORMATION= document.querySelector('.container__whatsapp__myContacts__header-user');
const TEMPLATE_CHANGE_IMAGE= document.querySelector('.container__whatsapp__changeImagen');
const TEMPLATE_MY_CONTACTS= document.querySelector('.container__whatsapp__myContacts');
const ARROW_BACK_PERFIL= document.querySelector('.container__whatsapp__changeImagen__header__imgPerfil-arrow');
const EDIT_NAME = document.querySelector('.container__whatsapp__changeImagen__body__data__formulario__nameImg-img');
const INPUT_EDIT= document.querySelector('.container__whatsapp__changeImagen__body__data__formulario__nameImg-name');
const SEND_MESSAGE_MY_CHAT = document.querySelector('.container__whatsapp__myChat__header-search');
const TEMPLETE_INFO_MESSAGE= document.querySelector('.container__whatsapp__infoMesagge');
const CLOSE_TEMPLETE_INFO_MESSAGE = document.querySelector('.container__whatsapp__infoMesagge__header-closeIcon');
const CONTAINER_SEND_MESSAGE = document.querySelector('.container__whatsapp__myChat__fondo__mensajeEnviado__contenedor');
const ARROW_DOWN_SEND =document.querySelector('.container__whatsapp__myChat__fondo__mensajeEnviado__contenedor__message-arrow');
const CONTAINER_RECEIVE_MESSAGE =document.querySelector('.container__whatsapp__myChat__fondo__mensajeRecibido__contenedor');
const ARROW_DOWN_RECEIVE= document.querySelector('.container__whatsapp__myChat__fondo__mensajeRecibido__contenedor__message-arrow');
const LIST_MESSAGE_SEND = document.querySelector('.container__whatsapp__myChat__fondo__mensajeEnviado__contenedor__message-arrow-lista');
const LIST_MESSAGE_RECEIVE = document.querySelector('.container__whatsapp__myChat__fondo__mensajeRecibido__contenedor__message-arrow-lista');


/*Poner en otro color cuando se seleccione una card */
MY_CONTACTS_CARD.addEventListener('click',()=>{
    console.log('cards:  ', MY_CONTACTS_CARD)
     MY_CONTACTS_CARD.style.backgroundColor = " rgb(237, 237, 237)";
});

/*Cambiar icono, cuanto este escribiendo un mensaje */
SEND_MESSAGE.addEventListener('input',()=>{
    if(SEND_MESSAGE.value === "")
    {
        IMG_SEND.src="img/microphone.png";
    }else{
        IMG_SEND.src= "img/iconEnviarMensaje.png";
    }
    
});

/*Dar click en la foto, para cambiar los datos */
CHANGE_PERSONAL_INFORMATION.addEventListener('click',()=>{
    TEMPLATE_CHANGE_IMAGE.style.display='block';
    TEMPLATE_MY_CONTACTS.style.display='none';
});

/*Dar click en arrow, para volver al home */
ARROW_BACK_PERFIL.addEventListener('click',()=>{
    TEMPLATE_CHANGE_IMAGE.style.display='none';
    TEMPLATE_MY_CONTACTS.style.display='block';
});

/*Editar el nombre */
EDIT_NAME.addEventListener('click',()=>{
    INPUT_EDIT.readOnly= false;
    INPUT_EDIT.style.border="2px solid black";
});

/*Templete de buscar los mensajes */

SEND_MESSAGE_MY_CHAT.addEventListener('click',()=>{
    TEMPLETE_INFO_MESSAGE.style.display='block';
});

CLOSE_TEMPLETE_INFO_MESSAGE.addEventListener('click',()=>{
    TEMPLETE_INFO_MESSAGE.style.display='none';
});
/*Mostrar y desaparecer la flecha de opciones de los mensajes enviados */
CONTAINER_SEND_MESSAGE.addEventListener('mouseover',()=>{
    ARROW_DOWN_SEND.style.display='block';
});
CONTAINER_SEND_MESSAGE.addEventListener('mouseout',()=>{
    ARROW_DOWN_SEND.style.display='none';
});
/*Mostrar y desaparecer la lista desplegable de los mensajes enviados */
ARROW_DOWN_SEND.addEventListener('click',()=>{
    LIST_MESSAGE_SEND.style.display='block';
});
ARROW_DOWN_SEND.addEventListener('dblclick',()=>{
    LIST_MESSAGE_SEND.style.display='none';
});
/*Mostrar y desaparecer la flecha de opciones de los mensajes recividos */
CONTAINER_RECEIVE_MESSAGE.addEventListener('mouseover',()=>{
    ARROW_DOWN_RECEIVE.style.display='block';
});
CONTAINER_RECEIVE_MESSAGE.addEventListener('mouseout',()=>{
    ARROW_DOWN_RECEIVE.style.display='none';
});
/*Mostrar y desaparecer la lista desplegable de los mensajes enviados */
ARROW_DOWN_RECEIVE.addEventListener('click',()=>{
    LIST_MESSAGE_RECEIVE.style.display='block';
});
ARROW_DOWN_RECEIVE.addEventListener('dblclick',()=>{
    LIST_MESSAGE_RECEIVE.style.display='none';
});


const LIST_MY_CHAT = async () => {
    let listMessages = await getMessages();

    let mylistMessages = listMessages.filter(index => index.idUser1 == ID || index.idUser2 == ID)
    console.log(mylistMessages);
}

LIST_MY_CHAT();
import { getMessages } from './getMessages.js';
import { getUsers } from './getUsers.js';
import { updateMessage } from './updateMessage.js';
import { DateTime } from 'https://moment.github.io/luxon/es6/luxon.js';

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

/*Cargar la foto de perfil del usuario que inicio sesion */
const LOADING_IMAGE_PROFILE = async () => {
    let user = listUsers.find(user => user.id == ID);
    const img = `<img class="container__whatsapp__myContacts__header-user" src="${user.urlImgPerfil}" alt="userMyContacts"></img>`
    CONTAINER_HEADER_USER.innerHTML = img;

}
/*Listar la lista de mensajes de cada usuario */
const LIST_MY_CHAT = async () => {

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
                <h6 class="container__whatsapp__myContacts__card__cardContact__text__nameDate-date">Viernes </h6>
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
const LOADDING_CHAT = async () => {
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
const LOADING_MESSAGES = async () => {
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
const LAST_MESSAGE = async () => {
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
const LAST_CHAT = async () => {
    let bandera_fecha=  await LAST_MESSAGE();
    console.log(bandera_fecha);
}
LAST_CHAT();
LOADING_IMAGE_PROFILE();
LIST_MY_CHAT();
/*Los siguientes container los cargamos aqui y no en el principio de la script para no generar errores*/
const MY_CONTACTS_CARD = document.querySelectorAll('.container__whatsapp__myContacts__cardContact');
const CHANGE_PERSONAL_INFORMATION = document.querySelector('.container__whatsapp__myContacts__header-user');

/*Poner en otro color cuando se seleccione una card */
CONTAINER_CARD.addEventListener('click', () => {
    MY_CONTACTS_CARD.forEach((card) => {
        card.addEventListener('click', () => {
            card.style.backgroundColor = '#e9e9e9';
            ID2 = parseInt(card.id);
            LOADDING_CHAT();
            LOADING_MESSAGES();
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
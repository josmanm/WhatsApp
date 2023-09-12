
import { getUsers } from '../service/getUsers.js';
import { updateMessage } from '../../message/service/updateMessage.js';
import { getMessages } from '../../message/service/getMessages.js';
import { updatePhotoUser } from '../service/updatePhoto.js';
import { deleteMessage } from '../../message/service/deleteMessage.js';
import { DateTime } from 'https://moment.github.io/luxon/es6/luxon.js';
const params = new URLSearchParams(window.location.search);
const ID = params.get('id');
let ID2 = 0;
let listMessages = await getMessages();
let listUsers = await getUsers();

const CONTAINER_CARD = document.querySelector('.container__whatsapp__myContacts__card')
const CONTAINER_HEADER_USER = document.querySelector('.container__whatsapp__myContacts__header');
const LIST_MESSAGE_SEND = document.querySelector('.container__whatsapp__myChat__fondo__mensajeEnviado__contenedor__message-arrow-lista');
const LIST_MESSAGE_RECEIVE = document.querySelector('.container__whatsapp__myChat__fondo__mensajeRecibido__contenedor__message-arrow-lista');


/*Imagen del usuario en watsApp */
export const LOADING_IMAGE_PROFILE = async () => {
    let user = listUsers.find(user => user.id == ID);
    const img = `<img class="container__whatsapp__myContacts__header-user" src="${user.urlImgPerfil}" alt="userMyContacts"></img>`
    CONTAINER_HEADER_USER.innerHTML = img;
}
/*Imagen del usario en el panel change imagen */
const CHANGE_IMAGEN = document.querySelector('.container__whatsapp__changeImagen__body__img');
export const IMAGEN_PANEL_CHANGE_IMAGEN = async () => {
    let user = listUsers.find(user => user.id == ID);
    const IMG_CHANGE_IMAGEN = `<img class="container__whatsapp__changeImagen__body__img-img" src="${user.urlImgPerfil}" alt="fondoChangeImg">`
    CHANGE_IMAGEN.innerHTML = IMG_CHANGE_IMAGEN;
}
/*Url por defecto del usuario que ingreso */
const URL_CHANGE_IMAGEN = document.querySelector('.container__whatsapp__changeImagen__body__ChangeImagen__formulario__nameImg');

export const URL_DEFECTO = async () => {
    let user = listUsers.find(user => user.id == ID);
    const URLDEFECTO = `
                        <input type="url" id="url" class="container__whatsapp__changeImagen__body__ChangeImagen__formulario__nameImg-name" value="${user.urlImgPerfil}"  >
                        <img class="container__whatsapp__changeImagen__body__ChangeImagen__formulario__nameImg-img" src="https://res.cloudinary.com/dbktnqag9/image/upload/v1693670649/right_or_wrong_4_preview_fntwpz.png" alt="edit">
                        `
    URL_CHANGE_IMAGEN.innerHTML = URLDEFECTO;


}
/*Cargar el nombre del usuario */
const ADDNAME = document.querySelector('.container__whatsapp__changeImagen__body__data__formulario__nameImg');
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
                <h6 class="container__whatsapp__myContacts__card__cardContact__text__nameDate-date">${DateTime.fromISO(message.conversaciones[message.conversaciones.length - 1].hour).toLocaleString(DateTime.TIME_SIMPLE)} </h6>
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
    let mylistMessages = listMessages.find(message => message.idUser1 == user.id && message.idUser2 == ID2 || message.idUser1 == ID2 && message.idUser2 == ID);
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
                    <h6 class="container__whatsapp__myChat__fondo__mensajeEnviado__contenedor-img_date">${DateTime.fromISO(message.hour).toLocaleString(DateTime.TIME_SIMPLE)} </h6>
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
                                <h6 class="container__whatsapp__myChat__fondo__mensajeRecibido__contenedor-img_date">${DateTime.fromISO(message.hour).toLocaleString(DateTime.TIME_SIMPLE)} </h6>
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
    let bandera_fecha = {
        "date": "2000-08-12T07:30:39.179-05:00",
        "hour": "2000-08-12T07:30:39.179-05:00"
    }
    let mylistMessages = listMessages.filter(message => message.idUser1 == ID || message.idUser2 == ID);
    mylistMessages.forEach((message) => {
        let fecha = message.conversaciones[message.conversaciones.length - 1].date;
        let hour =  message.conversaciones[message.conversaciones.length - 1].hour;
        // Compara las fechas
        if (fecha > bandera_fecha.date) {
            bandera_fecha.date = fecha;
            bandera_fecha.hour = hour;
        }
    });
    
    return  {
        "date": bandera_fecha.date,
        "hour": bandera_fecha.hour
    };
}
export const LAST_CHAT = async () => {
    let bandera_fecha = await LAST_MESSAGE();
    console.log(bandera_fecha);
    let mylistMessages = listMessages.filter(message => message.idUser1 == ID || message.idUser2 == ID);
    mylistMessages.forEach(async (message) => {
        
        let fecha = message.conversaciones[message.conversaciones.length - 1].date;
        let hour =  message.conversaciones[message.conversaciones.length - 1].hour;
        if (fecha ==  bandera_fecha.date && hour ==bandera_fecha.hour) {
            if (ID == message.idUser1) {
                ID2 = message.idUser2;
                LOADDING_CHAT(message.idUser2);
                LOADING_MESSAGES(message.idUser2);
            } else {
                LOADDING_CHAT(message.idUser1);
                LOADING_MESSAGES(message.idUser1);
            }
            iniciada(ID, ID2);
            listMessages = await getMessages();
        }
    })
    return ID2;
}


/*Listar la lista de mensajes de cada conversacion */
const CONTAINER_CARD_MESSAGE = document.querySelector('.container__whatsapp__infoMesagge__cardInfo');
export const LIST_MY_MESSAGE = async (ID2) => {
    //CONTAINER_CARD_MESSAGE.style.display='none';
    let user = listUsers.find(user => user.id == ID);
    let mylistMessages = listMessages.filter(index => index.idUser1 == ID && index.idUser2 == ID2)
    mylistMessages[0].conversaciones.forEach(messages => {
        const { sendBy, date, hour, message, flag } = messages;
        CONTAINER_CARD_MESSAGE.innerHTML += `    
                    <div id="${messages}" class="container__whatsapp__infoMesagge__cardInfo-card">
                        <h6 class="container__whatsapp__infoMesagge__cardInfo-card-date"> ${messages.date}</h6>
                        <div class="container__whatsapp__infoMesagge__cardInfo-card__infoMessage">
                            <img class="container__whatsapp__infoMesagge__cardInfo-card__infoMessage-check" src="img/check.png" alt="iconCheck">
                            <p class="container__whatsapp__infoMesagge__cardInfo-card__infoMessage-message">
                            ${messages.message}
                            </p>
                        </div>
                    </div>`;
    });

}

export function iniciada(ID, ID2) {
    let mylistMessages = listMessages.find(message => message.idUser1 == ID && message.idUser2 == ID2 || message.idUser1 == ID2 && message.idUser2 == ID)
    const CONTAINER_SEND_MESSAGE = document.querySelectorAll('.container__whatsapp__myChat__fondo__mensajeEnviado__contenedor');
    const ARROW_DOWN_SEND = document.querySelectorAll('.container__whatsapp__myChat__fondo__mensajeEnviado__contenedor__message-arrow');
    const CONTAINER_RECEIVE_MESSAGE = document.querySelectorAll('.container__whatsapp__myChat__fondo__mensajeRecibido__contenedor');
    const ARROW_DOWN_RECEIVE = document.querySelectorAll('.container__whatsapp__myChat__fondo__mensajeRecibido__contenedor__message-arrow');
    const MENU_DESPLEGABLE_SEND = document.querySelectorAll('.container__whatsapp__myChat__fondo__mensajeEnviado__contenedor__message-arrow-lista');
    const MENU_DESPLEGABLE_RECIVE = document.querySelectorAll('.container__whatsapp__myChat__fondo__mensajeRecibido__contenedor__message-arrow-lista');
    const DELETE_MESSAGE = document.querySelectorAll('.container__whatsapp__myChat__fondo__mensajeEnviado__contenedor__message-arrow-lista__textDelete');
    const EDIT_MESSAGE = document.querySelectorAll('.container__whatsapp__myChat__fondo__mensajeEnviado__contenedor__message-arrow-lista__textEdit');
    const MESSAGES = document.querySelectorAll('.container__whatsapp__myChat__fondo__mensajeEnviado__contenedor__message-text');
    const DATE_MESSAGE = document.querySelectorAll('.container__whatsapp__myChat__fondo__mensajeEnviado__contenedor-img_date');

    for (let index = 0; index < CONTAINER_SEND_MESSAGE.length; index++) {
        /*Enviados */
        CONTAINER_SEND_MESSAGE[index].addEventListener('mouseover', () => {
            ARROW_DOWN_SEND[index].style.display = 'block';
        });
        CONTAINER_SEND_MESSAGE[index].addEventListener('mouseout', () => {
            ARROW_DOWN_SEND[index].style.display = 'none';
        });
        ARROW_DOWN_SEND[index].addEventListener('click', () => {
            MENU_DESPLEGABLE_SEND[index].style.display = 'block';
        })
        ARROW_DOWN_SEND[index].addEventListener('dblclick', () => {
            MENU_DESPLEGABLE_SEND[index].style.display = 'none';
        })
        DELETE_MESSAGE[index].addEventListener('click', () => {
            MENU_DESPLEGABLE_SEND[index].style.display = 'none';
            Swal.fire({
                title: "Eliminar",
                text: "¿Deseas eliminar este mensaje?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Aceptar",
                cancelButtonText: "Cancelar",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    let message = mylistMessages.conversaciones.filter(message => message.message != MESSAGES[index].innerText);
                    DELETE_MESSAGE_FROM_CHAT(mylistMessages.id, message);
                    listMessages = await getMessages();
                    Swal.fire("Mensaje Eliminado");
                }
            });
        });
        const renderizarEdit = document.querySelector('.container__whatsapp__ModalEdit');
        EDIT_MESSAGE[index].addEventListener('click', () => {
            MENU_DESPLEGABLE_SEND[index].style.display = 'none';
            let html = ``;
            renderizarEdit.style.display = 'flex';
            const DIV_MENSSAGE_EDIT =
                `
            <div class="container__whatsapp__ModalEdit-body">
                    <div class="container__whatsapp__ModalEdit-body-header">
                        <img class="container__whatsapp__ModalEdit-body-header-closeIcon" src="img/icon-closeW.svg" alt="closeIndoMesagge">
                        <h3 class="container__whatsapp__ModalEdit-body-header-title"> Edita el mensaje</h3>
                    </div>
                    <div class="container__whatsapp__ModalEdit-body_fondo">
                        <div class="container__whatsapp__ModalEdit-body_fondo__mensajeEnviado">
                            <div class="container__whatsapp__ModalEdit-body_fondo__mensajeEnviado__contenedor">
                                <div class="container__whatsapp__ModalEdit-body_fondo__mensajeEnviado__contenedor__message">
                                    <h5 class="container__whatsapp__ModalEdit-body_fondo__mensajeEnviado__contenedor__message-text"> ${MESSAGES[index].innerText} </h5>
                                </div>
                                <div class="container__whatsapp__ModalEdit-body_fondo__mensajeEnviado__contenedor-img">
                                    <h6 class="container__whatsapp__ModalEdit-body_fondo__mensajeEnviado__contenedor-img_date">${DATE_MESSAGE[index].innerText} </h6>
                                    <img class="container__whatsapp__ModalEdit-body_fondo__mensajeEnviado__contenedor-img_img" src="img/check.png" alt="mesage enviado">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="container__whatsapp__ModalEdit-body-Mensaje">
                        <form onsubmit="return false;" class="container__whatsapp__ModalEdit-body-Mensaje__formulario">
                            <input type="text" class="container__whatsapp__ModalEdit-body-Mensaje__formulario-input" placeholder="Escribe un mensaje" value ="${MESSAGES[index].innerText}">
                            <button  type="button"><img class="container__whatsapp__ModalEdit-body-Mensaje__formulario-send" src="img/microphone.png" alt="iconMicrophone"></button>
                        </form>
                    </div>
                </div>`
            renderizarEdit.innerHTML = DIV_MENSSAGE_EDIT;
            const CLOSE_MODAL_EDIT = document.querySelector('.container__whatsapp__ModalEdit-body-header-closeIcon');
            const SEND_MESSAGE = document.querySelector('.container__whatsapp__ModalEdit-body-Mensaje__formulario-input');
            const IMG_SEND = document.querySelector('.container__whatsapp__ModalEdit-body-Mensaje__formulario-send');
            /*Cambiar icono, cuanto este escribiendo un mensaje */
            SEND_MESSAGE.addEventListener('input', () => {
                if (SEND_MESSAGE.value === "") {
                    IMG_SEND.src = './img/microphone.png';
                } else {
                    IMG_SEND.src = "./img/iconEnviarMensaje.png";
                }
            });

            CLOSE_MODAL_EDIT.addEventListener('click', () => {
                renderizarEdit.style.display = 'none';
            });
            SEND_MESSAGE.addEventListener('keypress', async (e) => {
                if (e.key === 'Enter') {
                    for (let i = 0; i < mylistMessages.conversaciones.length; i++) {
                        if (mylistMessages.conversaciones[i].message == MESSAGES[index].innerText) {
                            mylistMessages.conversaciones[i].message = SEND_MESSAGE.value;
                            mylistMessages.conversaciones[i].hour = DateTime.now().toLocaleString(DateTime.TIME_SIMPLE);
                            mylistMessages.conversaciones[i].date = DateTime.now().toLocaleString(DateTime.DATE_SHORT);
                            EDIT_MESSAGE_FROM_CHAT(mylistMessages.id, mylistMessages.conversaciones);
                            renderizarEdit.style.display = 'none';
                        }
                    }
                }
            })
        });
    }
};



/*Eliminar mensajes de un chat*/
export const DELETE_MESSAGE_FROM_CHAT = async (idmessge, mylistMessages) => {
    await deleteMessage(idmessge, mylistMessages);
}
/*Editar mensajes de un chat*/
export const EDIT_MESSAGE_FROM_CHAT = async (idmessge, mylistMessages) => {
    await updateMessage(idmessge, mylistMessages);
}   
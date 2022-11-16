# Socket.IO + React + Node

## Contenido

Este repo es la continucación del [ejemplo anterior](https://github.com/marcegdv/demo-node-socket.io), pero esta vez con un servidor un poco mas evolucionado (Express + Socket.IO), y su función será la de conectar enviar mensajes de chat entre varios clientes que se conecten a la app, la cual se hizo en React.

---

## Socket.IO en React

Para instalar el cliente de socket.io en React hay que usar el comando `npm install socket.io-client`.

Luego importar la siguiente función para establecer la conexión con el servidor:

`import { connect } from 'socket.io-client';`

Y el parámetro que lleva es la url del servidor, retornando un objeto de tipo Socket mediante el cual el frontend va a escuchar y enviar mensajes al servidor. En este ejemplo la url es la que utiliza el servidor de este repo:

`const socket = connect('http://localhost:5000');`

En este repo, le pasamos al componente principal la constante `socket` como parámetro `<App socket={socket}/>` para que establezca las acciones a realizar con los mensajes que enviará el servidor. Y son definidos dentro de un `useEffect`. Esto es para que se definan una vez y se remuevan los *listeners* ya que pueden recibirse mensajes extras desde el servidor de manera errónea. En resumen:

```js
useEffect(() => {
    socket.on('connect', () => {
        // ...
    });
    socket.on('un evento o mensaje', (param) => {
        // ...
        socket.emit('respuesta', value);
    });
    // ...
    return () => {
        socket.off('connect');
        socket.off('un evento o mensaje');
        // ...
    };
}, []);
```
Cuando estamos usando la librería `socket.io-client` no se deben anidar `socket.on(...)` como del lado del servidor con el caso del evento/mensaje *'connect'*.

---
# La App funcionando
Luego de instalar las dependencias del servidor y del cliente (como vimos [acá](https://github.com/marcegdv/demo-node-socket.io)):
- Para iniciar el servidor, usar el comando `npm run server` el cual utilizará el puerto 5000 local. O entrando a la carpeta *server* y usando el comando `npm run start`.
- Para iniciar el cliente, usar el comando `npm run client` que iniciará el servicio de React y abrirá un navegador, accediendo a la url *http://localhost:3000*. O entrando a la carpeta *client* y usando el comando `npm run start`.

En la interface escribimos el nombre con el que vamos a identificarnos, para luego poder acceder a uno de los dos canales de chat disponibles. Abriendo múltiples pestañas en el navegador se podrá ver cómo llegan mensajes al resto de los clientes cuando escribimos en un chat.

Es una de las formas de implementar una app en la que varios clientes pueden interactuar.

---


<div style="text-align: center; padding-top: 64px;">
    <img src="https://cdn.discordapp.com/attachments/1016886193595617322/1039362069159489586/image.png" height="180px">
</div>

---

### Aún aprendiendo React... disculpen las molestias :)
El código no es el mejor, ya que se podrá apreciar el workaround con los valores de los estados. Lo principal es el useEffect que definirá que va a escuchar y su función de limpieza.
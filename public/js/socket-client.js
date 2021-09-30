//referencias del HTML
const lblOnline = document.querySelector("#lblOnline");
const lblOffline = document.querySelector("#lblOffline");
const txtMensaje = document.querySelector("#txtMensaje");
const btnEnviar = document.querySelector("#btnEnviar");

const socketClient = io();

socketClient.on("connect", () => {
  //   console.log("Conectado");
  lblOffline.style.display = "none";
  lblOnline.style.display = "";
});

socketClient.on("disconnect", () => {
  //   console.log("desconectado del servidor");
  lblOffline.style.display = "";
  lblOnline.style.display = "none";
});

socketClient.on("enviar-mensaje", (payload) => {
  console.log(payload);
});

btnEnviar.addEventListener("click", () => {
  const mensaje = txtMensaje.value;
  const payload = {
    mensaje,
    id: "123456a",
    fecha: new Date().getTime(),
  };
  socketClient.emit("enviar-mensaje", payload, (id) => {
    console.log("Desde el server ", id);
  });
});

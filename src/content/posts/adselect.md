---
title: "AdSelect desde dentro: promesas, rutas y señales de alerta"
pubDatetime: 2026-11-10T04:00:00-00:00
description: "Un recorrido por los dominios, el frontend y la API de AdSelect para separar lo que observamos de lo que todavía no podemos demostrar."
tags:
  - phishing
  - estafa
  - pentesting
featured: false
draft: true
timezone: "America/Havana"
---

# AdSelect desde dentro

## 1. Contexto: ¿de dónde sale la sospecha?

En estos últimos días han aparecido plataformas que prometen hacernos «millonarios» de manera fácil. XenPaid, por ejemplo, le hizo perder el tiempo a más de un conocido. Ahora tenemos a AdSelect, una especie de versión remasterizada del mismo cuento. En Cuba, donde la necesidad aprieta y la información no siempre llega clara, estas promesas encuentran público rápido.

Según lo que mostraba la plataforma durante esta revisión, ofrecía entre **3 y 5 dólares por ver anuncios** y un bono de **10 dólares por referido**, además de comisiones. Suena bien, quizá demasiado bien. Pero una promesa llamativa no demuestra por sí sola que sea una estafa. Vamos a mirar qué se puede comprobar y dónde se tensa la historia.

> **Alcance:** observaciones realizadas entre el 10 y el 11 de noviembre de 2026. Los dominios y el contenido del sitio cambiaron durante la redacción; una captura o respuesta de esa fecha no describe necesariamente su estado actual.

## 2. OSINT: dominios y huellas públicas

### 2.1. `adselect.net`

Consulté el historial de [Who.is para `adselect.net`](https://who.is/history/adselect.net) y el [buscador de ICANN](https://lookup.icann.org/). En la consulta aparecían estos datos:

| Campo | Valor observado |
| --- | --- |
| Titular | Oculto mediante un servicio de privacidad |
| Registrador | Namecheap |
| Creación del dominio | 7 de diciembre de 2003 |
| Última actualización | 9 de noviembre de 2026 |
| Vencimiento | 7 de diciembre de 2027 |
| Estados | `clientHold`, `clientTransferProhibited` |
| Servidores DNS | Cloudflare |

La fecha de 2003 corresponde al **registro del dominio**, no al nacimiento de la plataforma. Tampoco usar privacidad de registro o Cloudflare demuestra fraude: son prácticas habituales. `clientHold` sí merece atención porque puede impedir que el dominio resuelva, pero el registro por sí solo no explica la causa.

En las búsquedas aparecieron nombres parecidos, entre ellos `adselect.cc`. La semejanza del nombre tampoco prueba una relación. Para este segundo dominio encontré lo siguiente en las consultas de registro:

| Campo | Valor observado |
| --- | --- |
| Creación del dominio | 5 de noviembre de 2026 |
| Vencimiento | 5 de noviembre de 2027 |
| Titular | Oculto mediante PrivacyGuardian.org |
| Registrador | NameSilo, LLC |
| Servidores DNS | Cloudflare |
| Estado | `clientTransferProhibited` |

`adselect.cc` era reciente en la fecha de la revisión. Eso justifica mirar con más cuidado, pero todavía no alcanza para dictar sentencia.

### 2.2. Wayback Machine

Después revisé la [Wayback Machine](https://web.archive.org/) para entender cómo se veía el sitio antes de los cambios. La línea de tiempo y la primera captura ayudan a ubicar **qué versión** estamos analizando.

![Línea de tiempo de capturas de AdSelect en Wayback Machine](../../assets/images/blog/adselect/timeline.png)

![Primera aparición localizada en el archivo web](../../assets/images/blog/adselect/aparicion.png)

Esta era una de las vistas antiguas del panel:

![Vista anterior del panel de AdSelect](../../assets/images/blog/adselect/dashboard_old.png)

Una captura archivada confirma que una página se veía así en ese momento; no confirma quién la operaba ni que pagara a sus usuarios.

## 3. Enumeración: lo que entrega el navegador

Lo primero que me sorprendió del dashboard, además del **tremendo vibecoding**, fue la ausencia de `capitalize_case` en varios textos. Pero bueno, pongámonos más técnicos.

![Primera captura del dashboard](../../assets/images/blog/adselect/dashboard_1.png)

![Segunda captura del dashboard](../../assets/images/blog/adselect/dashboard_2.png)

### 3.1. Tecnología observada

Al consultar `https://adselect.org/` con WhatWeb, la respuesta incluía `X-Powered-By: Next.js`, Cloudflare, el título de la página y la dirección `support@adselect.net`. El encabezado apunta a **Next.js**; no identifica por sí solo toda la arquitectura del servidor.

En la consola del navegador, `window.next?.version` devolvió `16.1.6` durante la revisión. Esa versión es una observación puntual: puede cambiar con cualquier despliegue.

### 3.2. Rutas en los archivos JavaScript

Next.js es un **framework de JavaScript**, no un lenguaje. El navegador recibe archivos JavaScript generados a partir del código de la aplicación. Aunque estén empaquetados y cueste leerlos, las rutas usadas por el frontend pueden aparecer allí.

Abrí las herramientas de desarrollo y busqué `/api` entre los archivos cargados. Esta es la vista desde la que inicié la búsqueda:

![Panel del depurador del navegador](../../assets/images/blog/adselect/depurador.png)

![Búsqueda global de rutas API en los archivos cargados](../../assets/images/blog/adselect/busqueda_global.png)

![Resultados de una búsqueda local de rutas API](../../assets/images/blog/adselect/busqueda_local.png)

Desde `/login` y `/register` aparecieron estas rutas. También probé la enumeración automatizada con [JSRecon](https://github.com/js-recon/js-recon).

| Ruta encontrada | Función aparente |
| --- | --- |
| `/api/auth/forgot` | Recuperación de cuenta |
| `/api/auth/forgot-id` | Recuperación del identificador de usuario |
| `/api/auth/login` | Inicio de sesión |
| `/api/auth/me` | Consulta de sesión |
| `/api/auth/register` | Registro |
| `/api/auth/register-paid` | Registro asociado a pago |
| `/api/auth/register-paid/invoice` | Factura del registro de pago |
| `/api/auth/register-paid/proof` | Comprobante del registro de pago |
| `/api/auth/username-check` | Disponibilidad del nombre de usuario |
| `/api/brand` | Datos de marca o configuración |
| `/api/checkout/status` | Estado del proceso de cobro o retiro |
| `/api/pixel-log` | Registro de eventos |
| `/api/public/registration-mode` | Modo de registro |
| `/api/public/sponsor` | Datos del patrocinador |

Encontrar una ruta en el frontend **no demuestra** que siga activa, que acepte un método concreto ni que sea vulnerable. Para afirmar eso hacen falta respuestas observadas y pruebas acotadas. Días antes, `/admin` también permitía ver referencias a rutas administrativas; durante esta revisión ya no aparecían de la misma forma. Vale la pena recuperar aquella observación porque ayuda a entender cómo estaba construida la interfaz original.

### 3.3. Una ventana al antiguo panel de administración

> **Nota sobre la evidencia histórica:** lo que sigue reconstruye una prueba realizada contra una versión anterior de AdSelect a partir de notas y capturas conservadas. **Ese comportamiento ya no estaba disponible para repetirlo durante la revisión posterior**, después de los cambios del sitio. Por tanto, esta sección explica cómo funcionaba la interfaz en aquel momento, no cómo funciona la plataforma actualmente. Las capturas enlazadas documentan la prueba original; no deben interpretarse como evidencia de acceso administrativo vigente.

Al revisar los archivos JavaScript observé una ruta `/admin` y una lógica de comprobación de sesión. Según la versión analizada, la interfaz consultaba el endpoint de sesión —identificado en la enumeración como `/api/auth/me`— y utilizaba el campo `role` para decidir qué pantalla mostrar. Si el usuario no tenía el rol esperado, el navegador terminaba redirigiéndolo fuera de la vista administrativa.

Había un detalle interesante: **el código de esa pantalla llegaba al navegador antes de que se completara la decisión de redirección**. Eso permitía estudiar la interfaz sin necesidad de demostrar que el servidor concediera permisos de administrador.

Para comprobarlo utilicé la función **Match and Replace de Burp Suite**, que permite sustituir partes de las respuestas HTTP mientras pasan por el proxy. En esta prueba, el objetivo no era modificar la cuenta en el servidor, sino observar qué ocurría cuando el frontend recibía una respuesta de sesión con un valor diferente en el campo del rol.

El flujo fue el siguiente:

1. Accedí a la ruta `/admin` con una sesión ordinaria.
2. La aplicación consultó los datos de la sesión y la respuesta indicaba el rol `member`.
3. Configuré Match and Replace para que, en la respuesta entregada al navegador, el valor del rol apareciera como `admin`.
4. Al recibir esa respuesta modificada, el frontend permitió visualizar la pantalla administrativa que anteriormente no llegaba a mostrarse de forma estable.

Esta es la configuración de sustitución conservada de aquella prueba:

![Configuración de Match and Replace utilizada en la prueba](../../assets/images/blog/adselect/match_and_replace.png)

Para comparar lo ocurrido, primero está la respuesta **sin modificar**, con el rol original:

![Respuesta original de sesión antes de aplicar Match and Replace](../../assets/images/blog/adselect/respueta_sin_match_replace.png)

Y después la respuesta **modificada localmente** por el proxy:

![Respuesta de sesión alterada mediante Match and Replace](../../assets/images/blog/adselect/respuesta_con_match_replace.png)

El resultado fue esta vista del antiguo dashboard de administración:

![Vista histórica del panel de administración de AdSelect](../../assets/images/blog/adselect/admin_dashboard.png)

Aquí está la distinción clave: **pude visualizar una pantalla administrativa, pero no acceder a sus funcionalidades privilegiadas**. El cambio se realizó sobre la respuesta que veía el navegador; no hay evidencia de que se alterara el rol almacenado en el servidor ni de que las API administrativas aceptaran operaciones no autorizadas.

Esto sugiere que, al menos en aquella versión, la **presentación de la ruta administrativa dependía de una comprobación en el cliente** que podía manipularse. Sin embargo, no permite concluir que faltara toda protección del lado del servidor, ni que existiera una vulnerabilidad explotable de escalada de privilegios. Para afirmar eso habría que comprobar de manera independiente los controles de autorización de cada operación administrativa.

#### 3.3.1. Los textos que llamaron la atención

Una vez visible la interfaz, encontré mensajes y expresiones en inglés cuya redacción me recordó a usos propios del **inglés de la India**. Estas observaciones formaron parte de las primeras pistas que me llevaron a preguntarme quién había construido AdSelect. Conservo dos capturas de aquellos textos:

![Primera captura de expresiones observadas en la antigua interfaz administrativa](../../assets/images/blog/adselect/textos_indish.png)

![Segunda captura de expresiones observadas en la antigua interfaz administrativa](../../assets/images/blog/adselect/textos_indish_2.png)

Ahora bien, **el estilo de redacción no permite identificar la nacionalidad ni la ubicación de los responsables**. Ese inglés podría proceder de un desarrollador, una plantilla reutilizada, una traducción, contenido copiado o un tercero. Sin otras pruebas independientes, sería incorrecto afirmar que los creadores de AdSelect eran indios.

¿Por qué incluir entonces estas imágenes? Porque muestran una parte del proceso real de investigación: a veces una anomalía lingüística abre una hipótesis que merece explorar, aunque no llegue a demostrarse. **La pista es interesante; la atribución sigue abierta.**

Por último, el hecho de que esta vista desapareciera o dejara de ser reproducible tras los cambios de la plataforma tampoco demuestra, por sí solo, que alguien corrigiera una vulnerabilidad o intentara ocultar información. Solo sabemos que el comportamiento observado en la versión anterior dejó de estar disponible durante la revisión posterior.

## 4. Análisis activo: tres comportamientos a revisar

Al observar las solicitudes en Burp Suite aparecieron tres puntos que merecen una revisión más cuidadosa:

1. **Recuperación de contraseña.** El flujo parecía pedir correo y número de teléfono para cambiar la contraseña. Si ambos datos bastan y no hay una verificación adicional, podría existir un problema de toma de cuentas. La captura muestra el flujo observado, pero no prueba por sí sola que se pueda tomar una cuenta ajena.

![Solicitud observada en el flujo de recuperación de contraseña](../../assets/images/blog/adselect/forgot.png)

2. **Recuperación del identificador.** La respuesta de `forgot-id` parecía revelar datos parcialmente ocultos. El riesgo depende de qué campos se puedan consultar, cuántas consultas admite y cuánta información deja reconstruir.

![Primera respuesta del flujo forgot-id](../../assets/images/blog/adselect/forgot-id-1.png)

![Segunda respuesta del flujo forgot-id](../../assets/images/blog/adselect/forgot-id-2.png)

3. **Registro y referidos.** El formulario permitía repetir solicitudes de registro. Si el sistema acredita bonos por cuentas ficticias sin controles suficientes, el contador de ingresos podría inflarse. La limitación de Cloudflare reduce la velocidad de las solicitudes; no valida que cada cuenta corresponda a una persona distinta.

![Solicitud de registro observada](../../assets/images/blog/adselect/register.png)

## 5. Prueba de concepto: ¿dinero o solo un número?

Para explorar el caso de los referidos utilicé [M.A.C.A.C.O](https://github.com/RojoFW/M.A.C.A.C.O), una herramienta que desarrollé para repetir solicitudes POST a partir de una plantilla. La idea era comprobar si el panel acreditaba bonos al crear cuentas asociadas a un mismo patrocinador.

La captura siguiente muestra el **saldo que presentó la interfaz** después de la prueba:

![Saldo mostrado en el panel después de la prueba de referidos](../../assets/images/blog/adselect/ingresos.png)

Y listo, ¿tenemos 1000 dólares? Jeje... si realmente fuese tan fácil. **Un saldo en pantalla no equivale a dinero retirado.** La observación apunta a una posible manipulación del contador de referidos, pero para hablar de ganancias reales haría falta documentar un retiro completado y verificable. También faltaría comprobar si el sistema revierte cuentas duplicadas más tarde.

## 6. Lo que cambió mientras escribía

Mientras preparaba esta guía dejé de poder acceder a `adselect.net` y encontré la página en `adselect.org`. La consulta de registro de `.org` indicaba creación y actualización el **10 de noviembre de 2026 a las 02:53 UTC**, con Namecheap como registrador, Cloudflare como DNS y los estados `clientTransferProhibited` y `addPeriod`.

El **11 de noviembre** la página ya había cambiado drásticamente; en esa revisión parecía estar montada en WordPress. Por eso las capturas, la versión de Next.js, las rutas enumeradas y la prueba histórica del panel `/admin` deben leerse como una **fotografía del momento**, no como una descripción permanente del dominio. En particular, la prueba con Match and Replace corresponde a una versión anterior que ya no pude reproducir en la revisión posterior.

## 7. Conclusión

Hay señales suficientes para desconfiar y seguir investigando: promesas de ingresos llamativas, cambios rápidos de dominio, una antigua interfaz administrativa cuya presentación dependía de una respuesta de sesión modificable en el navegador y un flujo de referidos que parecía permitir inflar el saldo mostrado. Lo que pude observar **no basta para demostrar pagos reales ni para identificar a los responsables**. Esa distinción importa: una investigación técnica gana fuerza cuando deja claro qué vio, qué infiere y qué todavía no sabe.

Si usaste la plataforma, guarda capturas y comprobantes de cualquier pago o retiro. Ahí está la evidencia que podría cerrar la pregunta más importante de esta historia.

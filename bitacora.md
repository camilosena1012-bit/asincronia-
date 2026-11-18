Parte 1: ¿Por qué existe el código asíncrono?

¿Qué se imprime si cambias el 0 por 2000? ¿Cambia el orden?

Se imprime exactamente en el mismo orden: 1. Pido la pizza, luego 3. Mientras tanto, veo televisión, y por último 2. La pizza está lista. La única diferencia es que habrá una pausa real de 2 segundos antes de mostrar el mensaje 2. El orden no cambia porque cualquier setTimeout pasa primero por las APIs del entorno y luego a la cola de tareas, esperando obligatoriamente a que la pila de llamadas (call stack) quede vacía.

Menciona dos operaciones de una aplicación real que deberían ser asíncronas y explica por qué.

Consultar el catálogo de un restaurante en una app de domicilios: Si fuera síncrona, congelaría por completo la interfaz del usuario mientras espera la respuesta de la base de datos.

Procesar un pago con tarjeta: Depende de pasarelas externas de red y bancos, por lo que la asincronía permite que la aplicación siga respondiendo a las acciones del usuario mientras se procesa la transacción.

Parte 2: Callbacks
¿Qué pasa si en dividir quitas el return después de llamar al callback con el error?

Si se omite el return, la ejecución continúa y llama al callback dos veces: primero reportando el error y de inmediato ejecutando la línea de éxito con un valor inválido (Infinity o NaN), generando comportamientos erráticos.

¿Por qué conviene que el error sea el primer parámetro y no el segundo?

Es la convención error-first de Node.js, la cual obliga al programador a validar de manera explícita si ocurrió un fallo antes de intentar procesar el resultado.

Parte 3: Promesas
En el ejemplo de Promise.all, ¿por qué el tiempo total es de unos 2 segundos?

Porque las promesas se ejecutan simultáneamente en paralelo. El tiempo total de Promise.all equivale estrictamente a lo que tarde la operación más lenta del grupo (en este caso, 2 segundos), y no a la suma de todas.

¿Qué pasa si en una cadena olvidas el return dentro de un .then()?

El .then() devuelve implícitamente undefined de inmediato, lo que rompe la cadena de asincronía y hace que el siguiente .then() reciba undefined en lugar de esperar el resultado de la sub-promesa.

Parte 4: Async/await
¿Por qué console.log(saludar()) no imprime "Hola"?

Porque cualquier función declarada con async retorna de manera automática una Promesa en estado cumplido, no el texto plano.

Tienes que traer el perfil de un usuario y, con su ciudad, el clima de su ciudad, además de las noticias del día. ¿Qué tareas van en secuencia y cuáles en paralelo?

En secuencia: Traer el perfil del usuario y luego consultar el clima de su ciudad, ya que la petición del clima depende directamente del dato de la ciudad obtenido en el perfil.

En paralelo: Consultar las noticias del día, ya que es un proceso independiente que no necesita esperar los datos del usuario.

Caso de estudio: empleados y salarios en tres versiones

1. En la versión 3, ¿en qué orden salen los tres mensajes? ¿Por qué no esperan uno al otro?
Orden en el que salen: Salen prácticamente al mismo tiempo (en función de los milisegundos), pero visualmente se imprimen en orden inverso o casi simultáneo, o dependiendo del flujo: id 1, id 3 y id 4 (o muy mezclados si hubiera ligeras variaciones), ya que el ID 4 no existe y el ID 3 lanza un error antes de los 500 ms totales de la segunda función. Más exactamente, los tres llamados se lanzan de manera concurrente (en paralelo).

¿Por qué no esperan uno al otro?: Al invocar mostrarInformacion(1), mostrarInformacion(3) y mostrarInformacion(4) de forma consecutiva en el código principal sin usar await antes de cada llamada, JavaScript dispara las tres funciones asíncronas al mismo tiempo. Cada una inicia su propio setTimeout de 500 ms de forma independiente. Ninguna función bloquea el hilo principal ni espera a que la anterior termine su try/catch global para empezar.

2. Si quisieras que los tres se consultaran en orden, uno después del otro, ¿cómo lo escribirías?
Para ejecutarlos estrictamente de manera secuencial (esperando a que termine el id 1, luego el 3, y finalmente el 4), puedes envolver las llamadas en una función asíncrona usando un bucle for...of o utilizando await de manera secuencial





preguntas de analisis del nivel 3 

1. Control de respuestas en Callbacks vs. Promise.allCallbacks: Requiere un contador manual (procesados) para saber cuándo terminaron todas las peticiones asíncronas desordenadas.Promise.all: Automatiza esto, gestiona la concurrencia y entrega los resultados ordenados en un solo bloque sin contadores.

2. Tiempos: Secuencial vs. ParaleloSecuencial: Suma el tiempo de cada consulta de forma individual ($300\text{ ms} \times N$). Más lento y lineal.Paralelo: Ejecuta todo al mismo tiempo; el tiempo total equivale al de la consulta más lenta (300 ms).

3. Similitud con 1 a N en MongoDBEquivale a consultar una colección principal (ventas), agrupar por clave foránea (idarticulo), filtrar y hacer un $lookup o populate para traer los datos de la colección relacionada (artículos).
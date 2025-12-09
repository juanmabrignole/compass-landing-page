<script>
  import { onDestroy } from 'svelte';

  // Countdown hacia el 20 de enero de 2026
  let days = '00';
  let hours = '00';
  let minutes = '00';
  let seconds = '00';

  const countDownDate = new Date('Jan 20, 2026 00:00:00').getTime();

  const countdownFunction = setInterval(() => {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    if (distance < 0) {
      clearInterval(countdownFunction);
      return;
    }

    days = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
    hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
    minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    seconds = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
  }, 1000);

  // Limpieza al destruir el componente
  onDestroy(() => {
    clearInterval(countdownFunction);
  });

  // Función para manejar el formulario
  async function handleForm(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const body = JSON.stringify(Object.fromEntries(form));

    try {
      const res = await fetch('https://n8n-krak.com/webhook/newsletter', {
        method: 'POST',
        body,
      });
      if (res.ok) {
        alert('Gracias por inscribirte!');
        e.target.reset();
      } else {
        alert('Hubo un error. Por favor, intentá nuevamente.');
      }
    } catch (error) {
      console.error(error);
      alert('Hubo un error. Por favor, intentá nuevamente.');
    }
  }
</script>

<svelte:head>
  <title>Masterclass de Krak Real Estate con Marcelo Napolitano</title>
  <meta name="description" content="Inscríbete a la masterclass exclusiva para agentes de Krak Real Estate con Marcelo Napolitano." />
</svelte:head>

<!-- Hero -->
<section class="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
  <div class="max-w-4xl mx-auto text-center">
    <h1 class="text-5xl md:text-6xl font-bold mb-6 text-gray-900 font-inter leading-tight">Masterclass de Krak Real Estate con Marcelo Napolitano</h1>
    <p class="text-2xl text-gray-700 mb-10 font-inter max-w-3xl mx-auto">Aprende las estrategias más efectivas para cerrar propiedades más rápido y generar confianza con tus clientes.</p>
    <a href="#formulario" class="inline-block bg-[#08407C] hover:bg-[#396696] text-white font-bold text-lg py-4 px-8 rounded-lg shadow-lg transition duration-300 transform hover:scale-105">🎯 Inscribite acá sin cargo</a>
  </div>
</section>

<!-- Countdown -->
<section class="py-20 px-4 sm:px-6 lg:px-8 bg-white">
  <div class="max-w-4xl mx-auto text-center">
    <h2 class="text-3xl font-bold text-gray-900 mb-10 font-inter">⏰ ¡Quedan solo:</h2>
    <div class="flex flex-wrap justify-center gap-8 text-4xl font-bold text-gray-800 font-inter">
      <div class="flex flex-col items-center min-w-[100px]"><span class="text-5xl">{days}</span><span class="text-base font-normal mt-2">días</span></div>
      <div class="flex flex-col items-center min-w-[100px]"><span class="text-5xl">{hours}</span><span class="text-base font-normal mt-2">horas</span></div>
      <div class="flex flex-col items-center min-w-[100px]"><span class="text-5xl">{minutes}</span><span class="text-base font-normal mt-2">minutos</span></div>
      <div class="flex flex-col items-center min-w-[100px]"><span class="text-5xl">{seconds}</span><span class="text-base font-normal mt-2">segundos</span></div>
    </div>
  </div>
</section>

<!-- Formulario de inscripción -->
<section id="formulario" class="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
  <div class="max-w-3xl mx-auto">
    <h2 class="text-3xl font-bold mb-10 text-center font-inter">📝 Completá el formulario para reservar tu lugar</h2>
    <form on:submit|preventDefault={handleForm} class="space-y-8 bg-white p-8 rounded-xl shadow-md">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="nombre" class="block text-lg font-medium text-gray-700">Nombre</label>
          <input type="text" id="nombre" name="nombre" required class="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#08407C] focus:border-[#08407C] text-lg">
        </div>
        <div>
          <label for="apellido" class="block text-lg font-medium text-gray-700">Apellido</label>
          <input type="text" id="apellido" name="apellido" required class="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#08407C] focus:border-[#08407C] text-lg">
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="email" class="block text-lg font-medium text-gray-700">Email</label>
          <input type="email" id="email" name="email" required class="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#08407C] focus:border-[#08407C] text-lg">
        </div>
        <div>
          <label for="telefono" class="block text-lg font-medium text-gray-700">Teléfono</label>
          <input type="tel" id="telefono" name="telefono" required class="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#08407C] focus:border-[#08407C] text-lg">
        </div>
      </div>
      <div>
        <label for="comentario" class="block text-lg font-medium text-gray-700">Comentario</label>
        <textarea id="comentario" name="comentario" rows="4" class="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#08407C] focus:border-[#08407C] text-lg"></textarea>
      </div>
      <div>
        <button type="submit" class="w-full bg-[#08407C] hover:bg-[#396696] text-white font-bold text-xl py-4 px-6 rounded-lg shadow-lg transition duration-300 transform hover:scale-105">Enviar inscripción</button>
      </div>
    </form>
  </div>
</section>
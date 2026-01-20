<script lang="ts">
  const BRAND = "COMPASS";

  // Arquitectura de información como el prototipo
  const nav = [
    { href: "#trayectoria", label: "TRAYECTORIA" },
    { href: "#nosotros", label: "NOSOTROS" },
    { href: "#casos", label: "CASOS DE ÉXITO" },
    { href: "#contacto", label: "CONTACTANOS" }
  ];

  // Cards placeholder (mañana: imágenes reales)
  const proyectos = ["Desarrollo 1", "Desarrollo 2", "Desarrollo 3", "Desarrollo 4"];

  const proximamente = [
    { title: "Proyecto A", subtitle: "Descripción breve del emprendimiento.", badge: "Ene 26 · Entrega" },
    { title: "Proyecto B", subtitle: "Descripción breve del emprendimiento.", badge: "Pronto" }
  ];

  // Carruseles (placeholder)
  let nosotrosIndex = 0;
  const nosotros = [
    {
      name: "Nombre Apellido",
      role: "Rol / Perfil",
      bio:
        "Breve descripción del integrante. Mañana reemplazamos por el texto real del prototipo / cliente.",
      imgAlt: "Integrante Compass"
    },
    {
      name: "Nombre Apellido",
      role: "Rol / Perfil",
      bio: "Breve descripción del integrante. Mañana reemplazamos por el texto real del prototipo / cliente.",
      imgAlt: "Integrante Compass"
    },
    {
      name: "Nombre Apellido",
      role: "Rol / Perfil",
      bio: "Breve descripción del integrante. Mañana reemplazamos por el texto real del prototipo / cliente.",
      imgAlt: "Integrante Compass"
    }
  ];

  let casosIndex = 0;
  const casos = [
    { title: "Caso de Éxito 1", subtitle: "Resumen breve del caso. (placeholder)", metric: "Impacto / Resultado" },
    { title: "Caso de Éxito 2", subtitle: "Resumen breve del caso. (placeholder)", metric: "Impacto / Resultado" },
    { title: "Caso de Éxito 3", subtitle: "Resumen breve del caso. (placeholder)", metric: "Impacto / Resultado" }
  ];

  function prevNosotros() {
    nosotrosIndex = (nosotrosIndex - 1 + nosotros.length) % nosotros.length;
  }
  function nextNosotros() {
    nosotrosIndex = (nosotrosIndex + 1) % nosotros.length;
  }

  function prevCasos() {
    casosIndex = (casosIndex - 1 + casos.length) % casos.length;
  }
  function nextCasos() {
    casosIndex = (casosIndex + 1) % casos.length;
  }

  // =============================
  // FORM (n8n) — lo activamos cuando tengas el webhook
  // =============================
  let nombre = "";
  let correo = "";
  let telefono = "";
  let mensaje = "";

  let loading = false;
  let ok = false;
  let error = "";

  const webhook = import.meta.env.VITE_N8N_WEBHOOK_URL as string | undefined;

  async function onSubmit(e: SubmitEvent) {
    e.preventDefault();
    ok = false;
    error = "";

    if (!webhook) {
      error = "Todavía no está configurado el webhook (VITE_N8N_WEBHOOK_URL). Lo conectamos cuando el front esté OK.";
      return;
    }

    loading = true;
    try {
      const form = new FormData();
      form.append("nombre", nombre);
      form.append("correo", correo);
      form.append("telefono", telefono);
      form.append("mensaje", mensaje);
      form.append("source", "compass-landing");
      form.append("ts", new Date().toISOString());

      const res = await fetch(webhook, { method: "POST", body: form });
      if (!res.ok) throw new Error("Webhook error");

      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead");
      }

      ok = true;
      nombre = "";
      correo = "";
      telefono = "";
      mensaje = "";
    } catch {
      error = "No se pudo enviar. Probá de nuevo.";
    } finally {
      loading = false;
    }
  }

  // =============================
  // SVG ICONS (inline, sin librerías)
  // =============================
  const IconChevronLeft = `<svg viewBox="0 0 24 24" fill="none" class="h-6 w-6"><path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const IconChevronRight = `<svg viewBox="0 0 24 24" fill="none" class="h-6 w-6"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const IconArrowDown = `<svg viewBox="0 0 24 24" fill="none" class="h-6 w-6"><path d="M12 5v12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M7 13l5 5 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const IconPlusCircle = `<svg viewBox="0 0 24 24" fill="none" class="h-7 w-7"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M12 8v8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M8 12h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
  const IconPin = `<svg viewBox="0 0 24 24" fill="none" class="h-6 w-6"><path d="M12 21s7-4.4 7-11a7 7 0 10-14 0c0 6.6 7 11 7 11z" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="10" r="2.5" stroke="currentColor" stroke-width="2"/></svg>`;

  const IconInstagram = `<svg viewBox="0 0 24 24" fill="none" class="h-5 w-5"><path d="M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4z" stroke="currentColor" stroke-width="2"/><path d="M12 16a4 4 0 100-8 4 4 0 000 8z" stroke="currentColor" stroke-width="2"/><path d="M17.5 6.5h.01" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`;
  const IconLinkedIn = `<svg viewBox="0 0 24 24" fill="none" class="h-5 w-5"><path d="M6 9v12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M6 6.5v.2" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M10 21V9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M10 13c.8-2.2 4-3 5.7-1.1 1.1 1.2 1.3 2.6 1.3 4.1V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const IconFacebook = `<svg viewBox="0 0 24 24" fill="none" class="h-5 w-5"><path d="M14 8h2V5h-2c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.5l.5-3H13V9c0-.6.4-1 1-1z" fill="currentColor"/></svg>`;
</script>

<svelte:head>
  <title>Compass</title>
  <meta name="description" content="Compass — desarrollos con trayectoria y compromiso." />
</svelte:head>

<!-- =============================
HERO (foto full + overlay, nav arriba, CTA centrado, flecha abajo)
Requiere /static/hero.jpg (mañana reemplazás)
============================= -->
<section class="relative min-h-[82vh] flex flex-col">
  <div class="absolute inset-0">
    <img src="/hero.jpg" alt="Compass" class="h-full w-full object-cover" />
    <div class="absolute inset-0 bg-black/35"></div>
    <div class="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/70 to-transparent"></div>
  </div>

  <div class="relative z-10">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-6">
      <header class="flex items-center justify-between gap-4">
        <!-- ✅ LOGO NEGRO en hero (fondo oscuro) -->
        <a href="#" aria-label="Compass" class="inline-flex items-center">
          <img
            src="/logo_compass.svg"
            alt="Compass"
            class="h-6 sm:h-7 md:h-8 w-auto object-contain"
          />
        </a>

        <nav class="hidden md:flex items-center gap-8 text-xs font-extrabold tracking-[.18em] text-white/90">
          {#each nav as item}
            <a class="hover:text-white" href={item.href}>{item.label}</a>
          {/each}
        </nav>

        <a
          href="#contacto"
          class="rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-extrabold tracking-[.18em] px-4 py-2 border border-white/20"
        >
          CONTACTANOS
        </a>
      </header>
    </div>
  </div>

  <div class="relative z-10 flex-1 flex items-center">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full text-center">
      <h1 class="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.05]">
        Donde el mar orienta,<br />nosotros construimos futuro.
      </h1>

      <p class="mt-4 text-white/85 max-w-3xl mx-auto text-sm sm:text-base">
        Compass es más que una desarrolladora. <br>
        Es una brújula que marca un rumbo claro: construir con calidad, transparencia y compromiso.
      </p>

      <div class="mt-10 flex justify-center">
        <a
          href="#proyectos"
          class="inline-flex items-center justify-center rounded-xl bg-[#11b4a6] hover:opacity-95 text-white font-extrabold tracking-wide px-8 py-4 shadow"
        >
          CONOCÉ NUESTROS EMPRENDIMIENTOS
        </a>
      </div>

      <div class="mt-10 flex justify-center text-white/85">
        <a href="#trayectoria" aria-label="Bajar" class="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 hover:bg-white/15 h-12 w-12">
          {@html IconArrowDown}
        </a>
      </div>
    </div>
  </div>
</section>

<!-- =============================
TRAYECTORIA (oscuro + 2 cards con acento)
============================= -->
<section id="trayectoria" class="bg-[#1f1f1f] text-white">
  <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
    <h1 class="text-3xl sm:text-4xl font-extrabold">Trayectoria y experiencia</h1>
    <h2 class="mt-4 text-white/80 text-base sm:text-lg leading-relaxed max-w-4xl mx-auto">
      Con más de 12 años en el rubro, desarrollamos y construimos edificios desde el pozo, combinando técnica, calidad y dedicación. <br>
    </h2>
    <p>Cada proyecto es el resultado de un trabajo minucioso, donde seleccionamos materiales de primera línea y supervisamos personalmente cada detalle de obra. Nuestra experiencia se refleja en desarrollos que perduran y en la confianza de quienes eligen invertir y vivir en ellos. </p>

  </div>

  <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 text-left">
        <div class="h-1 w-10 bg-[#11b4a6] rounded-full mb-4"></div>
        <h3 class="text-xl font-extrabold">Hacia donde vamos</h3>
        <p class="mt-3 text-white/75 leading-relaxed text-sm">
          En Compass proyectamos un futuro donde la calidad y el compromiso sigan marcando nuestro rumbo. Queremos consolidarnos como una marca reconocida en Mar del Plata por la seriedad de su trabajo y el valor real de sus desarrollos. Creemos en una ciudad con todo para crecer, y queremos ser parte activa de esa transformación, construyendo oportunidades que mejoren la vida de quienes la habitan y visitan. 
        </p>
      </div>

      <div class="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 text-left">
        <div class="h-1 w-10 bg-[#11b4a6] rounded-full mb-4"></div>
        <h3 class="text-xl font-extrabold">Compromiso</h3>
        <p class="mt-3 text-white/75 leading-relaxed text-sm">
          Nuestro compromiso es simple y profundo: entregar cada departamento como si fuera propio. Cuidamos los detalles, respetamos el entorno y honramos la identidad marplatense que nos inspira. Ser una desarrolladora de escala humana nos permite estar cerca de cada proyecto y de cada persona, garantizando que cada paso que damos sea firma y responsable y con propósito.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- =============================
NOSOTROS (carrusel simple con chevrons + íconos)
============================= -->
<section id="nosotros" class="bg-[#d8c8ad]">
  <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
    <div class="flex items-center justify-between gap-4">
      <h2 class="text-3xl sm:text-4xl font-extrabold">Nosotros</h2>

      <div class="flex items-center gap-2">
        <button
          type="button"
          on:click={prevNosotros}
          class="h-11 w-11 rounded-full border border-black/20 bg-white/25 hover:bg-white/35 flex items-center justify-center"
          aria-label="Anterior"
        >
          {@html IconChevronLeft}
        </button>
        <button
          type="button"
          on:click={nextNosotros}
          class="h-11 w-11 rounded-full border border-black/20 bg-white/25 hover:bg-white/35 flex items-center justify-center"
          aria-label="Siguiente"
        >
          {@html IconChevronRight}
        </button>
      </div>
    </div>

    <div class="mt-8 rounded-3xl border border-black/15 bg-white/25 overflow-hidden">
      <div class="grid grid-cols-1 md:grid-cols-2">
        <div class="relative aspect-[4/3] md:aspect-auto md:min-h-[360px] bg-white/20 flex items-center justify-center">
          <div
            class="absolute inset-0 opacity-60"
            style="background:
              linear-gradient(135deg, rgba(0,0,0,.10), transparent 60%),
              repeating-linear-gradient(45deg, rgba(0,0,0,.07) 0 12px, rgba(255,255,255,.07) 12px 24px);"
          ></div>
          <span class="relative z-10 text-xs tracking-[.2em] uppercase opacity-80">Foto (mañana)</span>
        </div>

        <div class="p-6 sm:p-10">
          <p class="text-sm font-extrabold tracking-[.18em] opacity-80">{nosotros[nosotrosIndex].role}</p>
          <h3 class="mt-2 text-2xl font-extrabold">{nosotros[nosotrosIndex].name}</h3>
          <p class="mt-4 opacity-80 leading-relaxed">{nosotros[nosotrosIndex].bio}</p>

          <div class="mt-8 flex items-center gap-4">
            <a href="#" aria-label="LinkedIn" class="h-10 w-10 rounded-full border border-black/15 bg-white/30 hover:bg-white/40 flex items-center justify-center">
              {@html IconLinkedIn}
            </a>
            <a href="#" aria-label="Instagram" class="h-10 w-10 rounded-full border border-black/15 bg-white/30 hover:bg-white/40 flex items-center justify-center">
              {@html IconInstagram}
            </a>
            <a href="#" aria-label="Facebook" class="h-10 w-10 rounded-full border border-black/15 bg-white/30 hover:bg-white/40 flex items-center justify-center">
              {@html IconFacebook}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- =============================
CASOS DE ÉXITO (carrusel simple)
============================= -->
<section id="casos" class="bg-[#d8c8ad]">
  <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
    <div class="flex items-center justify-between gap-4">
      <h2 class="text-3xl sm:text-4xl font-extrabold">Casos de éxito</h2>

      <div class="flex items-center gap-2">
        <button
          type="button"
          on:click={prevCasos}
          class="h-11 w-11 rounded-full border border-black/20 bg-white/25 hover:bg-white/35 flex items-center justify-center"
          aria-label="Anterior"
        >
          {@html IconChevronLeft}
        </button>
        <button
          type="button"
          on:click={nextCasos}
          class="h-11 w-11 rounded-full border border-black/20 bg-white/25 hover:bg-white/35 flex items-center justify-center"
          aria-label="Siguiente"
        >
          {@html IconChevronRight}
        </button>
      </div>
    </div>

    <div class="mt-8 rounded-3xl border border-black/15 bg-white/25 p-6 sm:p-10">
      <p class="text-sm font-extrabold tracking-[.18em] opacity-80">{casos[casosIndex].metric}</p>
      <h3 class="mt-2 text-2xl font-extrabold">{casos[casosIndex].title}</h3>
      <p class="mt-4 opacity-80 leading-relaxed">{casos[casosIndex].subtitle}</p>
    </div>
  </div>
</section>

<!-- =============================
PROYECTOS TERMINADOS (grid 2x2 con + en círculo)
============================= -->
<section id="proyectos" class="bg-[#d8c8ad]">
  <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
    <h2 class="text-3xl sm:text-4xl font-extrabold">Proyectos terminados</h2>

    <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      {#each proyectos as item}
        <div class="rounded-2xl overflow-hidden border border-black/15 bg-white/25 group">
          <div class="relative overflow-hidden bg-white/20 aspect-[4/3] flex items-center justify-center">
            <div
              class="absolute inset-0 opacity-60"
              style="background:
                linear-gradient(135deg, rgba(0,0,0,.10), transparent 60%),
                repeating-linear-gradient(45deg, rgba(0,0,0,.07) 0 12px, rgba(255,255,255,.07) 12px 24px);"
            ></div>

            <div class="absolute right-4 top-4 text-black/70 bg-white/60 rounded-full p-2 border border-black/10">
              {@html IconPlusCircle}
            </div>

            <span class="relative z-10 text-xs tracking-[.2em] uppercase opacity-80">{item} (img)</span>
          </div>

          <div class="flex items-center justify-between px-5 py-4">
            <strong class="text-lg">{item}</strong>
            <span class="text-sm font-extrabold tracking-[.18em] opacity-70">VER</span>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- =============================
PRÓXIMAMENTE (2 cards)
============================= -->
<section class="bg-[#1f1f1f] text-white">
  <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
    <h2 class="text-3xl sm:text-4xl font-extrabold">Próximamente</h2>

    <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      {#each proximamente as c}
        <div class="rounded-2xl overflow-hidden border border-white/15 bg-white/5">
          <div class="relative overflow-hidden bg-white/10 aspect-video flex items-center justify-center">
            <div
              class="absolute inset-0 opacity-30"
              style="background:
                linear-gradient(135deg, rgba(255,255,255,.08), transparent 60%),
                repeating-linear-gradient(45deg, rgba(255,255,255,.06) 0 12px, rgba(0,0,0,.06) 12px 24px);"
            ></div>
            <div class="absolute left-5 bottom-5">
              <div class="text-3xl font-extrabold">{c.badge.split("·")[0].trim()}</div>
              <div class="text-white/75 font-extrabold tracking-[.12em] uppercase">Entrega</div>
            </div>
          </div>

          <div class="p-5">
            <div class="flex items-center justify-between gap-4">
              <strong class="text-lg">{c.title}</strong>
              <span class="text-xs rounded-full px-3 py-1 border border-[#11b4a6]/40 bg-[#11b4a6]/15">
                {c.badge}
              </span>
            </div>
            <p class="mt-3 text-white/75 leading-relaxed">{c.subtitle}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- =============================
CONTACTO (form + mapa con pin)
============================= -->
<section id="contacto" class="bg-[#d8c8ad]">
  <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
    <h2 class="text-3xl sm:text-4xl font-extrabold">Contactate con nosotros</h2>

    <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <form class="rounded-2xl border border-black/15 bg-white/25 p-6 sm:p-8 space-y-4" on:submit={onSubmit}>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            class="w-full rounded-xl border border-black/20 bg-white/60 px-4 py-3"
            placeholder="Nombre"
            bind:value={nombre}
            required
          />
          <input
            class="w-full rounded-xl border border-black/20 bg-white/60 px-4 py-3"
            placeholder="Correo"
            type="email"
            bind:value={correo}
            required
          />
        </div>

        <input
          class="w-full rounded-xl border border-black/20 bg-white/60 px-4 py-3"
          placeholder="Teléfono"
          bind:value={telefono}
        />

        <textarea
          class="w-full rounded-xl border border-black/20 bg-white/60 px-4 py-3"
          placeholder="Mensaje"
          rows="6"
          bind:value={mensaje}
        ></textarea>

        <button class="w-full rounded-xl bg-[#11b4a6] py-3 font-extrabold text-white shadow disabled:opacity-60" disabled={loading}>
          {loading ? "Enviando..." : "ENVIAR"}
        </button>

        {#if ok}
          <p class="text-sm font-semibold">Gracias 🙌 Te contactamos en breve.</p>
        {/if}

        {#if error}
          <p class="text-sm font-semibold text-black/70">{error}</p>
        {/if}
      </form>

      <div class="rounded-2xl border border-black/15 bg-white/25 p-6 sm:p-8">
        <div class="flex items-center gap-2 font-extrabold">
          <span class="text-[#11b4a6]">{@html IconPin}</span>
          <span>Ubicación</span>
        </div>

        <p class="mt-2 opacity-80 text-sm">Mañana pegamos el embed del mapa o la dirección.</p>

        <div class="mt-4 relative overflow-hidden rounded-2xl border border-black/20 bg-white/20 aspect-[16/10] flex items-center justify-center">
          <div
            class="absolute inset-0 opacity-60"
            style="background:
              linear-gradient(135deg, rgba(0,0,0,.10), transparent 60%),
              repeating-linear-gradient(45deg, rgba(0,0,0,.07) 0 12px, rgba(255,255,255,.07) 12px 24px);"
          ></div>
          <span class="relative z-10 text-xs tracking-[.2em] uppercase opacity-80">Mapa (mañana)</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- =============================
FOOTER (logo + links + sociales)
============================= -->
<footer class="bg-[#1f1f1f] text-white">
  <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
    <div>
      <!-- ✅ LOGO BLANCO en footer (fondo oscuro) -->
      <img
        src="/BLANCO-COMPASS.png"
        alt="Compass"
        class="h-7 sm:h-8 w-auto object-contain"
      />

      <p class="mt-4 text-white/75 text-sm leading-relaxed">
        En la trayectoria y el compromiso se encuentra nuestra visión del trabajo con excelencia y dedicación.
      </p>
    </div>

    <div class="text-sm">
      <p class="font-extrabold tracking-[.18em]">SECCIONES</p>
      <div class="mt-4 flex flex-col gap-2 text-white/80 font-semibold">
        <a class="hover:text-white" href="#trayectoria">Trayectoria</a>
        <a class="hover:text-white" href="#nosotros">Nosotros</a>
        <a class="hover:text-white" href="#casos">Casos de éxito</a>
        <a class="hover:text-white" href="#contacto">Contacto</a>
      </div>
    </div>

    <div class="text-sm">
      <p class="font-extrabold tracking-[.18em]">REDES</p>
      <div class="mt-4 flex items-center gap-3">
        <a href="#" aria-label="LinkedIn" class="h-11 w-11 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 flex items-center justify-center">
          {@html IconLinkedIn}
        </a>
        <a href="#" aria-label="Instagram" class="h-11 w-11 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 flex items-center justify-center">
          {@html IconInstagram}
        </a>
        <a href="#" aria-label="Facebook" class="h-11 w-11 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 flex items-center justify-center">
          {@html IconFacebook}
        </a>
      </div>
    </div>
  </div>

  <div class="border-t border-white/10">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div class="text-white/70 text-sm">© {new Date().getFullYear()} {BRAND}</div>
      <div class="text-white/60 text-xs font-semibold tracking-[.18em] uppercase">Compass Landing</div>
    </div>
  </div>
</footer>

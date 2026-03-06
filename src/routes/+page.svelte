<script lang="ts">
  import { onMount } from "svelte";

  const BRAND = "COMPASS";

  const nav = [
    { href: "#trayectoria", label: "TRAYECTORIA" },
    { href: "#como-trabajamos", label: "CÓMO TRABAJAMOS" },
    { href: "#desarrollos", label: "DESARROLLOS" },
    { href: "#material", label: "MATERIAL" },
    { href: "#contacto", label: "CONTACTO" }
  ];

  // HERO — foto aérea de Mar del Plata, Playa Varese (Fermin Rodriguez Penelas, Unsplash)
  const HERO_IMG = "https://images.pexels.com/photos/26919251/pexels-photo-26919251.jpeg?auto=compress&cs=tinysrgb&w=1920";

  const pilares = [
    {
      title: "Buena ubicación",
      text: "Elegimos zonas con valor real: entorno, accesos y calidad de vida, pensando en cómo se vive y cómo se proyecta."
    },
    {
      title: "Diseño honesto",
      text: "Arquitectura clara, funcional y luminosa. Materiales y terminaciones que sostienen el estándar en el tiempo."
    },
    {
      title: "Planificación responsable",
      text: "Obra ordenada y previsión. Construir desde el pozo requiere método, control y una gestión seria."
    },
    {
      title: "Ejecución cuidada",
      text: "Supervisión y detalle en cada etapa. Nuestro compromiso es entregar cada unidad como si fuera propia."
    }
  ];

  const BROCHURES = {
    norte: "/brochures/Compass%203.pdf",
    chauvin: "/brochures/Compass%20Chauvin.pdf",
    chauvin_v2: "/brochures/Compass%20Chauvin-3.pdf",
    guemes: "/brochures/Brochure%20digital%20-%20Compass%20Guemes.pdf"
  };

  type Dev = {
    id: "norte" | "plaza" | "chauvin" | "guemes";
    title: string;
    status: "Finalizado" | "En desarrollo";
    badge: string;
    subtitle: string;
    cover: string;
    gallery: string[];
    brochure?: string;
    brochureExtra?: string;
  };

  const PLAZA_IMG = "/compass-plaza/Compass%202%20%28Compass%20Plaza%29%20%20%282%29.jpeg";

  const desarrollos: Dev[] = [
    {
      id: "norte",
      title: "Compass Norte",
      status: "Finalizado",
      badge: "2022 · Totalmente vendido",
      subtitle: "Edificio de 4 departamentos en piso completo (125 m²), cochera y baulera. Barrio Constitución, a 2 cuadras de la playa, vista al mar. SUM con parrilla.",
      cover: "/compass-3/page-01.webp",
      gallery: [
        "/compass-3/page-01.webp",
        "/compass-3/page-02.webp",
        "/compass-3/page-03.webp",
        "/compass-3/page-04.webp",
        "/compass-3/page-05.webp"
      ],
      brochure: BROCHURES.norte
    },
    {
      id: "plaza",
      title: "Compass Plaza",
      status: "Finalizado",
      badge: "Edificio de 8 pisos",
      subtitle: "Semipisos luminosos de 2 y 3 ambientes y una unidad de 4 ambientes en el último nivel. Balcones al frente y contrafrente. Cochera y baulera. PB: SUM con parrilla.",
      cover: PLAZA_IMG,
      gallery: [PLAZA_IMG]
    },
    {
      id: "chauvin",
      title: "Compass Chauvin",
      status: "En desarrollo",
      badge: "Entrega 10/2026",
      subtitle: "28 unidades en 7 pisos. 2 ambientes (67 m²), dos al frente y dos al contrafrente por nivel. Cochera y baulera. PB: SUM con parrilla.",
      cover: "/compass-chauvin/compass-chauvin-frente04.jpg",
      gallery: [
        "/compass-chauvin/compass-chauvin-frente04.jpg",
        "/compass-chauvin/compass-chauvin-frente02.jpg",
        "/compass-chauvin/compass-chauvin-living01.webp",
        "/compass-chauvin/compass-chauvin-habitacion01.webp",
        "/compass-chauvin/compass-chauvin-SUM.webp",
        "/compass-chauvin/compass-chauvin-planta-unidad.webp"
      ],
      brochure: BROCHURES.chauvin,
      brochureExtra: BROCHURES.chauvin_v2
    },
    {
      id: "guemes",
      title: "Compass Güemes",
      status: "En desarrollo",
      badge: "Entrega 02/2028",
      subtitle: "Proyecto de 5 pisos, a pasos del centro comercial Güemes. Semipisos de 2 y 3 ambientes (64 m² y 104 m²). Balcón aterrazado con parrilla. Cochera y baulera.",
      cover: "/compass-guemes/compass-guemes-frente02.jpg",
      gallery: [
        "/compass-guemes/compass-guemes-frente02.jpg",
        "/compass-guemes/compass-guemes-living01.webp",
        "/compass-guemes/compass-guemes-dormitorios01.webp",
        "/compass-guemes/compass-guemes-hallAcceso.webp",
        "/compass-guemes/compass-guemes-plantaTipo.webp"
      ],
      brochure: BROCHURES.guemes
    }
  ];

  let active: Dev | null = null;
  let imgIndex = 0;

  function openDev(d: Dev) {
    active = d;
    imgIndex = 0;
    if (typeof document !== "undefined") document.body.style.overflow = "hidden";
  }
  function closeDev() {
    active = null;
    if (typeof document !== "undefined") document.body.style.overflow = "";
  }
  function prevImg() {
    if (!active) return;
    imgIndex = (imgIndex - 1 + active.gallery.length) % active.gallery.length;
  }
  function nextImg() {
    if (!active) return;
    imgIndex = (imgIndex + 1) % active.gallery.length;
  }

  onMount(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!active) return;
      if (e.key === "Escape") closeDev();
      if (e.key === "ArrowLeft") prevImg();
      if (e.key === "ArrowRight") nextImg();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

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

  const IconChevronLeft = `<svg viewBox="0 0 24 24" fill="none" class="h-6 w-6"><path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const IconChevronRight = `<svg viewBox="0 0 24 24" fill="none" class="h-6 w-6"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const IconArrowDown = `<svg viewBox="0 0 24 24" fill="none" class="h-6 w-6"><path d="M12 5v12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M7 13l5 5 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const IconPin = `<svg viewBox="0 0 24 24" fill="none" class="h-6 w-6"><path d="M12 21s7-4.4 7-11a7 7 0 10-14 0c0 6.6 7 11 7 11z" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="10" r="2.5" stroke="currentColor" stroke-width="2"/></svg>`;
  const IconX = `<svg viewBox="0 0 24 24" fill="none" class="h-6 w-6"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
</script>

<svelte:head>
  <title>Compass</title>
  <meta name="description" content="Compass — desarrollamos edificios de pozo en Mar del Plata con ubicación, diseño honesto, planificación responsable y ejecución cuidada." />
</svelte:head>

<!-- HERO -->
<section class="relative min-h-[82vh] flex flex-col" style="background: var(--c-ink);">
  <div class="absolute inset-0">
    <img
      src={HERO_IMG}
      alt=""
      class="absolute inset-0 h-full w-full object-cover"
      style="object-position: 70% 45%;"
      loading="eager"
      fetchpriority="high"
    />
    <div class="absolute inset-0 bg-black/45"></div>
    <div class="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/80 to-transparent"></div>
  </div>

  <div class="relative z-10">
    <div class="compass-container pt-6">
      <header class="flex items-center justify-between gap-4">
        <!-- ✅ fix: href="/" en lugar de href="#" -->
        <a href="/" aria-label="Compass" class="inline-flex items-center">
          <img
            src="/logo_compass.svg"
            alt="Compass"
            class="h-7 sm:h-8 w-auto object-contain invert brightness-0"
            style="filter: invert(1) brightness(2);"
          />
        </a>

        <nav class="hidden md:flex items-center gap-8 text-xs font-extrabold tracking-[.18em] text-white/90">
          {#each nav as item}
            <a class="hover:text-white" href={item.href}>{item.label}</a>
          {/each}
        </nav>
        <a href="#contacto" class="rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-extrabold tracking-[.18em] px-4 py-2 border border-white/20" > 
        CONTACTO
        </a>
      </header>
    </div>
  </div>

  <div class="relative z-10 flex-1 flex items-center">
    <div class="compass-container w-full text-center">
      <h1 class="compass-h1 text-white text-4xl sm:text-5xl md:text-6xl">
        Desarrollamos edificios de pozo<br class="hidden sm:block" />
        en Mar del Plata
      </h1>

      <p class="mt-5 text-white/85 max-w-4xl mx-auto text-sm sm:text-base leading-relaxed">
        Somos una desarrolladora inmobiliaria con base en Mar del Plata, enfocada en proyectos residenciales de pozo.
        Cada edificio nace de una combinación clara: buena ubicación, diseño arquitectónico honesto, planificación financiera responsable
        y una ejecución cuidada de principio a fin.
      </p>

      <div class="mt-10 flex justify-center gap-3">
        <a href="#desarrollos" class="compass-btn compass-btn-primary">
          VER DESARROLLOS
        </a>
        
          <a href="#material" class="compass-btn compass-btn-ghost"
          style="border-color: rgba(255,255,255,.25); color: white; background: rgba(255,255,255,.08);">
          VER MATERIAL
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

<!-- TRAYECTORIA -->
<section id="trayectoria" style="background: var(--c-ink); color: white;">
  <div class="compass-container py-16 sm:py-20 text-center">
    <h2 class="text-3xl sm:text-4xl font-extrabold">Trayectoria y experiencia</h2>
    <p class="mt-4 text-white/80 max-w-4xl mx-auto leading-relaxed">
      Con más de 12 años en el rubro, desarrollamos y construimos edificios desde el pozo, combinando técnica, calidad y dedicación.
      Cada proyecto es el resultado de un trabajo minucioso, con supervisión y cuidado de detalle de principio a fin.
    </p>

    <div class="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
      <div class="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
        <div class="h-1 w-10 rounded-full mb-4" style="background: var(--c-marine);"></div>
        <h3 class="text-xl font-extrabold">Hacia dónde vamos</h3>
        <p class="mt-3 text-white/75 leading-relaxed text-sm">
          Consolidarnos como una marca reconocida en Mar del Plata por la seriedad del trabajo y el valor real de los desarrollos,
          acompañando el crecimiento de una ciudad con enorme potencial.
        </p>
      </div>

      <div class="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
        <div class="h-1 w-10 rounded-full mb-4" style="background: var(--c-marine);"></div>
        <h3 class="text-xl font-extrabold">Compromiso</h3>
        <p class="mt-3 text-white/75 leading-relaxed text-sm">
          Entregar cada departamento como si fuera propio: cuidando terminaciones, respetando el entorno y sosteniendo una escala humana
          que nos permite estar cerca de cada proyecto y de cada persona.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- CÓMO TRABAJAMOS -->
<section id="como-trabajamos" style="background: var(--c-concrete); color: var(--c-ink);">
  <div class="compass-container py-16 sm:py-20">
    <div class="flex items-end justify-between gap-4">
      <h2 class="text-3xl sm:text-4xl font-extrabold">Cómo trabajamos</h2>
      <span class="hidden sm:inline text-sm font-semibold opacity-70">Ubicación · Diseño · Planificación · Ejecución</span>
    </div>

    <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each pilares as p}
        <div class="compass-card p-6">
          <div class="h-1 w-10 rounded-full mb-4" style="background: var(--c-marine);"></div>
          <h3 class="text-lg font-extrabold">{p.title}</h3>
          <p class="mt-3 text-sm opacity-80 leading-relaxed">{p.text}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- DESARROLLOS -->
<section id="desarrollos" style="background: var(--c-bg); color: var(--c-ink);">
  <div class="compass-container py-16 sm:py-20">
    <h2 class="text-3xl sm:text-4xl font-extrabold">Desarrollos</h2>
    <p class="mt-3 opacity-80 max-w-3xl">
      Proyectos residenciales de pozo en Mar del Plata. Terminados y en desarrollo, con estándar constructivo y terminaciones cuidadas.
    </p>

    <div class="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
      {#each desarrollos as d}
        <article class="compass-card overflow-hidden">
          <div class="relative aspect-[16/10] bg-black/10">
            <img src={d.cover} alt={d.title} class="absolute inset-0 h-full w-full object-cover" loading="lazy" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent"></div>

            <div class="absolute left-4 top-4 inline-flex items-center gap-2">
              <span
                class="text-xs font-extrabold tracking-[.14em] uppercase px-3 py-2 rounded-full"
                style="background: rgba(255,255,255,.75); border: 1px solid rgba(0,0,0,.08);"
              >
                {d.status}
              </span>
              <span
                class="text-xs font-extrabold tracking-[.14em] uppercase px-3 py-2 rounded-full"
                style="background: color-mix(in srgb, var(--c-marine) 20%, transparent); border: 1px solid color-mix(in srgb, var(--c-marine) 35%, transparent);"
              >
                {d.badge}
              </span>
            </div>

            <button
              type="button"
              on:click={() => openDev(d)}
              class="absolute right-4 top-4 rounded-full h-11 w-11 flex items-center justify-center"
              style="background: rgba(255,255,255,.75); border: 1px solid rgba(0,0,0,.10);"
              aria-label="Ver detalles"
            >
              +
            </button>

            <div class="absolute left-4 bottom-4 right-4">
              <h3 class="text-white text-2xl font-extrabold">{d.title}</h3>
            </div>
          </div>

          <div class="p-6">
            <p class="text-sm opacity-85 leading-relaxed">{d.subtitle}</p>

            <div class="mt-5 flex flex-col sm:flex-row gap-3">
              <button type="button" on:click={() => openDev(d)} class="compass-btn compass-btn-primary">
                VER DETALLES
              </button>

              {#if d.brochure}
                
                  <a href={d.brochure}
                  target="_blank"
                  rel="noopener"
                  class="compass-btn compass-btn-ghost" >
                  BROCHURE
                </a>
              {/if}
            </div>

            {#if d.brochureExtra}
              <div class="mt-3 text-sm opacity-75">
                <a class="underline" href={d.brochureExtra} target="_blank" rel="noopener">Brochure alternativo</a>
              </div>
            {/if}
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>

<!-- MATERIAL -->
<section id="material" style="background: var(--c-concrete); color: var(--c-ink);">
  <div class="compass-container py-16 sm:py-20">
    <h2 class="text-3xl sm:text-4xl font-extrabold">Material</h2>
    <p class="mt-3 opacity-80 max-w-3xl">Video y carpeta con documentos para conocer más sobre los desarrollos.</p>

    <div class="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="compass-card overflow-hidden">
        <div class="aspect-video">
          <iframe
            class="h-full w-full"
            src="https://www.youtube.com/embed/l-uc4Hc4sYM"
            title="Compass"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
        <div class="p-6">
          <h3 class="text-lg font-extrabold">Video</h3>
          <p class="mt-2 text-sm opacity-80">Una mirada general del proyecto y la propuesta.</p>
        </div>
      </div>

      <div class="compass-card p-6 sm:p-8">
        <h3 class="text-lg font-extrabold">¿Te interesa algún desarrollo?</h3>
        <p class="mt-3 text-sm opacity-80 leading-relaxed">
          Consultá disponibilidad y valores actualizados. Respondemos a la brevedad.
        </p>

        <!-- ✅ Refactor: eliminado botón ABRIR DRIVE, se canaliza todo por contacto -->
        <div class="mt-6">
          <a href="#contacto" class="compass-btn compass-btn-primary w-full text-center">PEDIR INFO</a>
        </div>

        <div class="mt-8 rounded-2xl p-4" style="background: rgba(0,0,0,.04); border: 1px solid var(--c-border);">
          <p class="text-sm opacity-80">
            Consultá disponibilidad y valores actualizados. Respondemos a la brevedad.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- CONTACTO -->
<section id="contacto" style="background: var(--c-bg); color: var(--c-ink);">
  <div class="compass-container py-16 sm:py-20">
    <h2 class="text-3xl sm:text-4xl font-extrabold">Contactate con nosotros</h2>

    <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <form class="compass-card p-6 sm:p-8 space-y-4" on:submit={onSubmit}>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            class="w-full rounded-xl border px-4 py-3"
            style="border-color: var(--c-border); background: rgba(255,255,255,.7);"
            placeholder="Nombre"
            bind:value={nombre}
            required
          />
          <input
            class="w-full rounded-xl border px-4 py-3"
            style="border-color: var(--c-border); background: rgba(255,255,255,.7);"
            placeholder="Correo"
            type="email"
            bind:value={correo}
            required
          />
        </div>

        <input
          class="w-full rounded-xl border px-4 py-3"
          style="border-color: var(--c-border); background: rgba(255,255,255,.7);"
          placeholder="Teléfono"
          bind:value={telefono}
        />

        <textarea
          class="w-full rounded-xl border px-4 py-3"
          style="border-color: var(--c-border); background: rgba(255,255,255,.7);"
          placeholder="Mensaje"
          rows="6"
          bind:value={mensaje}
        ></textarea>

        <button
          class="w-full rounded-xl py-3 font-extrabold text-white shadow disabled:opacity-60"
          style="background: var(--c-marine);"
          disabled={loading}
        >
          {loading ? "Enviando..." : "ENVIAR"}
        </button>

        {#if ok}
          <p class="text-sm font-semibold">Gracias 🙌 Te contactamos en breve.</p>
        {/if}

        {#if error}
          <p class="text-sm font-semibold opacity-80">{error}</p>
        {/if}
      </form>

      <div class="compass-card p-6 sm:p-8">
        <div class="flex items-center gap-2 font-extrabold">
          <span style="color: var(--c-marine);">{@html IconPin}</span>
          <span>Ubicación</span>
        </div>

        <p class="mt-2 opacity-80 text-sm">Las Heras 3207, Mar del Plata, Buenos Aires</p>

        <div class="mt-4 overflow-hidden rounded-2xl border" style="border-color: var(--c-border);">
          <iframe
            title="Ubicación Compass"
            class="w-full h-[22rem] sm:h-[26rem]"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=Las%20Heras%203207%2C%20Mar%20del%20Plata%2C%20Buenos%20Aires&output=embed"
          ></iframe>
        </div>

        <div class="mt-4">
          
            <a class="compass-btn compass-btn-ghost"
            target="_blank"
            rel="noopener"
            href="https://www.google.com/maps/search/?api=1&query=Las%20Heras%203207%2C%20Mar%20del%20Plata%2C%20Buenos%20Aires">
            ABRIR EN GOOGLE MAPS
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer style="background: var(--c-ink); color: white;">
  <div class="compass-container py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
    <div>
      <img src="/logo_compass.svg" alt="Compass" class="h-7 sm:h-8 w-auto object-contain" />
      <p class="mt-4 text-white/75 text-sm leading-relaxed">
        Desarrollos residenciales de pozo en Mar del Plata. Calidad, transparencia y compromiso.
      </p>
    </div>

    <div class="text-sm">
      <p class="font-extrabold tracking-[.18em]">SECCIONES</p>
      <div class="mt-4 flex flex-col gap-2 text-white/80 font-semibold">
        <a class="hover:text-white" href="#trayectoria">Trayectoria</a>
        <a class="hover:text-white" href="#desarrollos">Desarrollos</a>
        <a class="hover:text-white" href="#material">Material</a>
        <a class="hover:text-white" href="#contacto">Contacto</a>
      </div>
    </div>

    <div class="text-sm">
      <p class="font-extrabold tracking-[.18em]">KRAK</p>
      <p class="mt-4 text-white/70 text-sm">Landing Compass · Krak Real Estate</p>
    </div>
  </div>

  <div class="border-t border-white/10">
    <div class="compass-container py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div class="text-white/70 text-sm">© {new Date().getFullYear()} {BRAND}</div>
      <div class="text-white/60 text-xs font-semibold tracking-[.18em] uppercase">Compass Landing</div>
    </div>
  </div>
</footer>

<!-- MODAL DETALLES -->
{#if active}
  <div class="fixed inset-0 z-[999]">
    <button class="absolute inset-0 bg-black/70" on:click={closeDev} aria-label="Cerrar"></button>

    <div class="absolute inset-x-0 top-6 mx-auto w-[min(980px,92vw)]">
      <div class="compass-card overflow-hidden" style="background: rgba(255,255,255,.92);">
        <div class="flex items-center justify-between px-5 py-4 border-b" style="border-color: var(--c-border);">
          <div>
            <div class="text-xs font-extrabold tracking-[.14em] uppercase opacity-70">{active.status}</div>
            <h3 class="text-2xl font-extrabold">{active.title}</h3>
          </div>

          <button
            class="h-11 w-11 rounded-full flex items-center justify-center"
            style="border:1px solid var(--c-border); background: rgba(255,255,255,.7);"
            on:click={closeDev}
            aria-label="Cerrar"
          >
            {@html IconX}
          </button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2">
          <div class="relative bg-black/5">
            <img
              src={active.gallery[imgIndex]}
              alt={active.title}
              class="w-full h-[22rem] sm:h-[26rem] object-cover"
            />

            {#if active.gallery.length > 1}
              <button
                class="absolute left-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full flex items-center justify-center"
                style="background: rgba(255,255,255,.75); border:1px solid rgba(0,0,0,.10);"
                on:click={prevImg}
                aria-label="Anterior"
              >
                {@html IconChevronLeft}
              </button>
              <button
                class="absolute right-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full flex items-center justify-center"
                style="background: rgba(255,255,255,.75); border:1px solid rgba(0,0,0,.10);"
                on:click={nextImg}
                aria-label="Siguiente"
              >
                {@html IconChevronRight}
              </button>
            {/if}

            <div
              class="absolute left-4 bottom-4 text-xs font-extrabold tracking-[.14em] uppercase px-3 py-2 rounded-full"
              style="background: rgba(255,255,255,.75); border:1px solid rgba(0,0,0,.08);"
            >
              {active.badge}
            </div>
          </div>

          <div class="p-6 sm:p-8">
            <p class="text-sm opacity-85 leading-relaxed">{active.subtitle}</p>

            <div class="mt-6 flex flex-col sm:flex-row gap-3">
              {#if active.brochure}
                <a class="compass-btn compass-btn-primary" href={active.brochure} target="_blank" rel="noopener">
                  ABRIR BROCHURE
                </a>
              {/if}
              <a class="compass-btn compass-btn-ghost" href="#contacto" on:click={closeDev}>
                CONSULTAR DISPONIBILIDAD
              </a>
            </div>

            {#if active.brochureExtra}
              <div class="mt-3 text-sm opacity-75">
                <a class="underline" href={active.brochureExtra} target="_blank" rel="noopener">Brochure alternativo</a>
              </div>
            {/if}

            {#if active.gallery.length > 1}
              <div class="mt-6 grid grid-cols-5 gap-2">
                {#each active.gallery as src, i}
                  <button
                    class="rounded-lg overflow-hidden border"
                    style="border-color: {i === imgIndex ? 'color-mix(in srgb, var(--c-marine) 60%, transparent)' : 'var(--c-border)'};"
                    on:click={() => (imgIndex = i)}
                    aria-label={"Ver imagen " + (i + 1)}
                  >
                    <img src={src} alt="" class="h-14 w-full object-cover" />
                  </button>
                {/each}
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
<script lang="ts">
  // =============================
  // CONFIG SIMPLE (editá acá)
  // =============================
  const BRAND = "COMPASS";

  const nav = [
    { href: "#trayectoria", label: "TRAYECTORIA" },
    { href: "#vision", label: "VISIÓN" },
    { href: "#proyectos", label: "PROYECTOS" },
    { href: "#contacto", label: "CONTACTO" }
  ];

  const proyectos = ["Desarrollo 1", "Desarrollo 2", "Desarrollo 3", "Desarrollo 4"];

  const proximamente = [
    { title: "Proyecto A", subtitle: "Descripción breve del emprendimiento.", badge: "Ene 26 · Entrega" },
    { title: "Proyecto B", subtitle: "Descripción breve del emprendimiento.", badge: "Pronto" }
  ];

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

    // Si todavía no está seteado, no rompemos la UX:
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

      // (opcional) Pixel Lead si lo cargás globalmente:
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
</script>

<svelte:head>
  <title>Compass</title>
  <meta name="description" content="Compass — desarrollos con trayectoria y compromiso." />
</svelte:head>

<!-- =============================
HERO
============================= -->
<section class="bg-[#d8c8ad]">
  <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-8 pb-14 sm:pt-10 sm:pb-20">
    <header class="flex items-center justify-between gap-4">
      <div class="font-black tracking-[.18em] text-sm">{BRAND}</div>

      <nav class="hidden md:flex items-center gap-6 text-sm font-semibold tracking-wide opacity-90">
        {#each nav as item}
          <a class="hover:opacity-70" href={item.href}>{item.label}</a>
        {/each}
      </nav>

      <a
        href="#contacto"
        class="rounded-xl bg-[#11b4a6] px-4 py-2 text-sm font-bold text-white shadow hover:opacity-95"
      >
        CONTACTANOS
      </a>
    </header>

    <div class="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
      <div>
        <h1 class="text-4xl sm:text-5xl font-extrabold leading-[1.05]">
          Donde el mar orienta,<br />
          nosotros construimos futuro.
        </h1>

        <p class="mt-5 text-lg sm:text-xl opacity-80 max-w-xl">
          En la trayectoria y el compromiso se encuentra nuestra visión del trabajo con excelencia y dedicación.
        </p>

        <div class="mt-8 flex flex-col sm:flex-row gap-3">
          <a
            href="#proyectos"
            class="inline-flex items-center justify-center rounded-xl bg-[#11b4a6] px-6 py-4 font-bold text-white shadow"
          >
            CONOCÉ NUESTROS EMPRENDIMIENTOS
          </a>

          <a
            href="#trayectoria"
            class="inline-flex items-center justify-center rounded-xl border border-black/25 bg-white/20 px-6 py-4 font-bold"
          >
            VER MÁS
          </a>
        </div>
      </div>

      <!-- Placeholder Imagen Hero -->
      <div class="relative overflow-hidden rounded-2xl border border-black/20 bg-white/20 aspect-[4/3] flex items-center justify-center">
        <div
          class="absolute inset-0 opacity-60"
          style="background:
            linear-gradient(135deg, rgba(0,0,0,.10), transparent 60%),
            repeating-linear-gradient(45deg, rgba(0,0,0,.07) 0 12px, rgba(255,255,255,.07) 12px 24px);"
        ></div>
        <span class="relative z-10 text-xs tracking-[.2em] uppercase opacity-80">Hero image (mañana)</span>
      </div>
    </div>
  </div>
</section>

<!-- =============================
TRAYECTORIA
============================= -->
<section id="trayectoria" class="bg-[#1f1f1f] text-white">
  <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
    <h2 class="text-3xl sm:text-4xl font-extrabold">TRAYECTORIA Y EXPERIENCIA</h2>
    <p class="mt-5 text-white/80 text-lg leading-relaxed max-w-3xl">
      Construimos desarrollos con una mirada integral: planificación, detalle y ejecución.
      Creemos en procesos claros, comunicación directa y decisiones con fundamento.
    </p>
  </div>
</section>

<!-- =============================
VISIÓN (2 columnas)
============================= -->
<section id="vision" class="bg-[#d8c8ad]">
  <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="rounded-2xl border border-black/15 bg-white/25 p-6 sm:p-8">
        <h3 class="text-sm font-extrabold tracking-[.2em]">HACIA DONDE VAMOS</h3>
        <p class="mt-4 opacity-80 leading-relaxed">
          Creamos espacios que duren en el tiempo, con identidad, calidad y una visión de crecimiento sostenido.
        </p>
      </div>

      <div class="rounded-2xl border border-black/15 bg-white/25 p-6 sm:p-8">
        <h3 class="text-sm font-extrabold tracking-[.2em]">COMPROMISO</h3>
        <p class="mt-4 opacity-80 leading-relaxed">
          Nos involucramos en cada etapa, cuidando la calidad y el vínculo con quienes confían en nuestro trabajo.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- =============================
PROYECTOS TERMINADOS (grid 2x2)
============================= -->
<section id="proyectos" class="bg-[#d8c8ad]">
  <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
    <h2 class="text-3xl sm:text-4xl font-extrabold">PROYECTOS TERMINADOS</h2>

    <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      {#each proyectos as item}
        <div class="rounded-2xl overflow-hidden border border-black/15 bg-white/25">
          <div class="relative overflow-hidden bg-white/20 aspect-[4/3] flex items-center justify-center">
            <div
              class="absolute inset-0 opacity-60"
              style="background:
                linear-gradient(135deg, rgba(0,0,0,.10), transparent 60%),
                repeating-linear-gradient(45deg, rgba(0,0,0,.07) 0 12px, rgba(255,255,255,.07) 12px 24px);"
            ></div>
            <span class="relative z-10 text-xs tracking-[.2em] uppercase opacity-80">{item} (img)</span>
          </div>

          <div class="flex items-center justify-between px-5 py-4">
            <strong class="text-lg">{item}</strong>
            <span class="text-2xl font-black opacity-70">+</span>
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
    <h2 class="text-3xl sm:text-4xl font-extrabold">PRÓXIMAMENTE</h2>

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
            <span class="relative z-10 text-xs tracking-[.2em] uppercase opacity-80">Imagen (mañana)</span>
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
CONTACTO (form + mapa placeholder)
============================= -->
<section id="contacto" class="bg-[#d8c8ad]">
  <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
    <h2 class="text-3xl sm:text-4xl font-extrabold">CONTACTO</h2>

    <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <form
        class="rounded-2xl border border-black/15 bg-white/25 p-6 sm:p-8 space-y-4"
        on:submit={onSubmit}
      >
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

        <input
          class="w-full rounded-xl border border-black/20 bg-white/60 px-4 py-3"
          placeholder="Teléfono"
          bind:value={telefono}
        />

        <textarea
          class="w-full rounded-xl border border-black/20 bg-white/60 px-4 py-3"
          placeholder="Mensaje"
          rows="5"
          bind:value={mensaje}
        ></textarea>

        <button
          class="w-full rounded-xl bg-[#11b4a6] py-3 font-bold text-white shadow disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>

        {#if ok}
          <p class="text-sm font-semibold">Gracias 🙌 Te contactamos en breve.</p>
        {/if}

        {#if error}
          <p class="text-sm font-semibold text-black/70">{error}</p>
        {/if}
      </form>

      <div class="rounded-2xl border border-black/15 bg-white/25 p-6 sm:p-8">
        <p class="font-bold">Mapa</p>
        <p class="mt-2 opacity-80 text-sm">Mañana pegamos el embed o la dirección.</p>

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
FOOTER
============================= -->
<footer class="bg-[#1f1f1f] text-white">
  <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
    <div class="opacity-80">© {new Date().getFullYear()} {BRAND}</div>
    <div class="flex gap-6 font-semibold opacity-80">
      <a class="hover:opacity-70" href="#trayectoria">Trayectoria</a>
      <a class="hover:opacity-70" href="#proyectos">Proyectos</a>
      <a class="hover:opacity-70" href="#contacto">Contacto</a>
    </div>
  </div>
</footer>

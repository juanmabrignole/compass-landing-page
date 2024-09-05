<script lang="ts">
	let prevButton: HTMLButtonElement;
	let nextButton: HTMLButtonElement;
	let aboutUsCarousel: HTMLDivElement;
    let curriculumTextInput: HTMLSpanElement

    async function handleNewsLetter(e: SubmitEvent & {
        currentTarget: EventTarget & HTMLFormElement;
    }) {
        let target = e.target
        if (!(target instanceof HTMLFormElement)) return;
        let form = Object.fromEntries(new FormData(target))
        let body = JSON.stringify(form)
        target.classList.add('await')
        try {
            let res = await fetch('https://n8n-krak.com/webhook/newsletter', { method: 'POST', body })
            console.log(res)
            if (res.ok) {
                target.classList.add('then')
                target.classList.remove('await')
            } else throw new Error()
        } catch(_) {
            console.log(_)
            target.classList.add('catch')
            target.classList.remove('await')
        }
    }
</script>

<section class="bg-[url(/hero-1.png)] bg-cover backdrop-brightness-50 min-h-screen text-white grid place-content-center text-center drop-shadow-2xl relative">
	<div>
		<h1 class="text-5xl lg:text-6xl font-bold mb-4 mt-24">Convertite en un Krak.</h1>
		<p class="mb-8">Unite a nosotros y transformá tu carrera profesional.</p>
		<a href="/" class="block bg-blue-500 hover:bg-black text-white uppercase rounded-full w-fit mx-auto py-6 px-14 font-bold text-sm"> Quiero empezar </a>
	</div>
	<a href="#banner-1" class="absolute bottom-8 right-8 flex flex-col items-center gap-4">
		<span class="text-sm">SCROLL</span>
		<img class="h-12" src="/svg/arrow-white.svg" alt="" />
	</a>
</section>

<section class="bg-blue-500 text-white" id="banner-1">
	<div class="mx-auto w-full max-w-6xl grid lg:grid-cols-2 px-4">
		<h2 class="text-4xl lg:text-5xl font-medium py-20 text-balance">Forma parte de un<br> equipo de bienes<br> raíces al servicio de<br> tu desarrollo personal<br> y profesional</h2>
		<div class="relative h-80 lg:h-full">
			<img class="absolute w-fit h-96 bottom-0 left-0" src="/svg/circle.svg" alt="" />
			<img class="absolute w-fit h-80 bottom-0 left-10 lg:left-16" src="/woman.png" alt="woman" />
		</div>
	</div>
</section>

<section class="py-20">
	<div class="mx-auto w-full max-w-6xl">
		<h2 class="text-4xl lg:text-5xl font-semibold text-blue-500 text-center mb-12">Ventajas de ser un Krak</h2>
		<div class="grid lg:grid-cols-3 place-content-center mb-8">
			<div class="bg-blue-500 rounded-3xl p-10 text-white">
				<img class="h-16 w-fit mx-auto mb-8" src="/svg/feature-1.svg" alt="mano sosteniendo una casa" />
				<p class="text-sm text-center max-w-64 mx-auto">Obtené visibilidad destacada en los portales inmobiliarios más importantes del país</p>
			</div>
			<div class="p-10">
				<img class="h-20 w-fit mx-auto mb-8" src="/svg/feature-2.svg" alt="celular con notificacion" />
				<p class="text-center mx-auto text-lg">Exposición de tu cartera<br /> en redes sociales</p>
			</div>
			<div class="p-10">
				<img class="h-20 w-fit mx-auto mb-8" src="/svg/feature-3.svg" alt="mano sosteniendo un porcentaje" />
				<p class="text-center mx-auto text-lg">Comisiones<br /> más justas</p>
			</div>
			<div class="p-10">
				<img class="h-20 w-fit mx-auto mb-8" src="/svg/feature-4.svg" alt="engranaje girando" />
				<p class="text-center mx-auto text-lg">
					Asistencia en el desarrollo<br /> de tu marca personal
				</p>
			</div>
			<div class="p-10">
				<img class="h-16 my-4 w-fit mx-auto mb-8" src="/svg/feature-5.svg" alt="persona dando una clase" />
				<p class="text-center mx-auto text-lg">Capacitaciones<br /> constantes</p>
			</div>
			<div class="p-10">
				<img class="h-20 w-fit mx-auto mb-8" src="/svg/feature-6.svg" alt="moneda con una flecha apuntando hacia abajo" />
				<p class="text-center mx-auto text-lg">Bonificaciones<br /> por objetivos</p>
			</div>
			<div class="p-10">
				<img class="h-20 w-fit mx-auto mb-8" src="/svg/feature-7.svg" alt="red de personas" />
				<p class="text-center mx-auto text-lg">Ambiente profesional<br /> y desafiante</p>
			</div>
			<div class="p-10">
				<img class="h-16 my-4 w-fit mx-auto mb-8" src="/svg/feature-8.svg" alt="un edificio" />
				<p class="text-center mx-auto text-lg">Infraestructura</p>
			</div>
			<div class="p-10">
				<img class="h-16 my-4 w-fit mx-auto mb-8" src="/svg/feature-9.svg" alt="un foquito" />
				<p class="text-center mx-auto text-lg">Cultura<br /> emprendedora</p>
			</div>
		</div>
	</div>
	<a href="/" class="block bg-blue-500 hover:bg-black text-white uppercase rounded-full w-fit mx-auto py-6 px-14 font-bold text-sm"> Quiero ser un Krak </a>
</section>

<section class="pt-20 pb-24 bg-[#313B51]">
	<div class="flex flex-col-reverse items-center text-white mb-12">
		<h2 class="text-4xl lg:text-5xl font-bold text-balance text-center">¿Qué significa ser un Krak?</h2>
		<p class="font-medium mb-4 text-gray-100">Te contamos en pocos minutos</p>
	</div>
	<div class="max-w-4xl w-full mx-auto rounded-3xl aspect-video bg-black drop-shadow-2xl shadow-2xl mb-12"></div>
	<a href="/" class="block bg-white hover:bg-black hover:text-white text-blue-500 uppercase rounded-full w-fit mx-auto py-6 px-14 font-bold text-sm"> Quiero ser un Krak </a>
</section>

<section class="bg-white py-20 relative">
	<div class="flex flex-col-reverse items-center mb-12">
		<h2 class="text-4xl lg:text-5xl font-bold text-blue-500">Nuestra cultura</h2>
		<p class="font-medium mb-4 text-gray-600">Para el trabajo y para la vida</p>
	</div>
	<p class="max-w-xl mx-auto w-fit lg:text-center text-balance px-6 lg:text-pretty mb-16 text-lg text-gray-600">Estos son nuestros valores para el trabajo y para la vida, con estos valores nos guiamos y le damos la bienvenida a cada uno que se incorpore a la experiencia de ser parte de Krak.</p>
	<div class="hidden lg:block">
		<button
			on:click={() => {
				aboutUsCarousel.scrollBy({ behavior: 'smooth', left: -1 });
			}}
			bind:this={prevButton}
			class="absolute size-16 z-10 hidden bg-white hover:bg-black hover:text-white rounded-full grid place-content-center drop-shadow-2xl top-[24rem] left-12"><span class="icon-[tabler--chevron-left] text-3xl"></span></button>
		<button
			on:click={() => {
				aboutUsCarousel.scrollBy({ behavior: 'smooth', left: 1 });
			}}
			bind:this={nextButton}
			class="absolute size-16 z-10 bg-white hover:bg-black hover:text-white rounded-full grid place-content-center drop-shadow-2xl top-[24rem] right-12"><span class="icon-[tabler--chevron-right] text-3xl"></span></button>
	</div>

	<div
		bind:this={aboutUsCarousel}
		on:scroll={(e) => {
			let target = e.currentTarget;

			if (target.scrollLeft == 0) {
				prevButton.classList.add('hidden');
				nextButton.classList.remove('hidden');
			}
			if (target.scrollLeft == target.scrollWidth - target.clientWidth) {
				prevButton.classList.remove('hidden');
				nextButton.classList.add('hidden');
			}
		}}
		class="overflow-x-scroll flex gap-4 px-[calc((100vw-20rem)/2)] md:px-[calc((100vw-64rem)/2)] no-scrollbar snap-x snap-mandatory">
		<div class="bg-blue-500 text-white rounded-3xl w-80 min-w-80 px-8 pt-7 pb-16 snap-always snap-center">
			<h3 class="font-thin text-5xl font-inter text-blue-200 mb-4">01</h3>
			<h4 class="font-bold text-2xl mb-4">Lealtad</h4>
			<p class="text-sm text-blue-100">Sobre todo lealtad! Quiere decir que estamos para nuestros compañeros, estamos en primera linea con ellos, y valoramos los esfuerzos de cada uno porque ellos harían lo mismo por nosotros. Somos leales con nuestro compañeros y con nosotros mismos buscando alcanzar nuestros objetivos con caballerosidad y códigos.</p>
		</div>
		<div class="bg-blue-500 text-white rounded-3xl w-80 min-w-80 px-8 pt-7 pb-16 snap-always snap-center">
			<h3 class="font-thin text-5xl font-inter text-blue-200 mb-4">02</h3>
			<h4 class="font-bold text-2xl mb-4">Todos somos líderes</h4>
			<p class="text-sm text-blue-100">Nuestro trabajo es el reflejo de nuestra personalidad. Es nuestra carta de presentación y fija los estándares de calidad de quienes nos rodean. No hay mejor forma para liderar que haber hecho el trabajo antes. Lideramos desde el frente de batalla, no desde la comodidad del fondo de la linea.</p>
		</div>
		<div class="bg-blue-500 text-white rounded-3xl w-80 min-w-80 px-8 pt-7 pb-16 snap-always snap-center">
			<h3 class="font-thin text-5xl font-inter text-blue-200 mb-4">03</h3>
			<h4 class="font-bold text-2xl mb-4">Valor agregado</h4>
			<p class="text-sm text-blue-100">Entendemos por valor agregado superar las expectativas de nuestra contraparte, sea un cliente o un compañero. Dedicarle un tiempo extra a escuchar a un compañero también es valor agregado. Siempre causar el impacto positivo en la otra persona a través de un extra no esperado.</p>
		</div>
		<div class="bg-blue-500 text-white rounded-3xl w-80 min-w-80 px-8 pt-7 pb-16 snap-always snap-center">
			<h3 class="font-thin text-5xl font-inter text-blue-200 mb-4">04</h3>
			<h4 class="font-bold text-2xl mb-4">Humildad</h4>
			<p class="text-sm text-blue-100">
				No nos conformamos nunca, siempre vamos por más. Somos seres de objetivos, si algún día consideramos que llegamos a lo que queremos ser, será el día que dejaremos de existir. El camino es claro, siempre para arriba y adelante, nunca para atrás. En los momentos de que logramos nuestros objetivos, son los momentos de mayor humildad, siempre hay alguien mejor que nosotros, pero te vamos a
				alcanzar.
			</p>
		</div>
	</div>
</section>

<section class="bg-gray-100 py-20 w-full">
	<h2 class="text-5xl text-blue-500 mb-16 text-center font-semibold">Preguntas Frecuentes</h2>
	<ul class="flex flex-col gap-2 max-w-xs lg:max-w-4xl mx-auto">
		<li>
			<label class="flex flex-col bg-blue-500 text-white py-4 px-12 rounded-xl has-[:checked]:bg-blue-50 has-[:checked]:text-black hover:cursor-pointer relative">
                <input class="sr-only peer" name="faq" type="checkbox" />
				<span class="absolute top-4 right-10 icon-[tabler--chevron-down] text-3xl peer-checked:rotate-180 hidden lg:block"></span>
				<h3 class="text-xl font-semibold">¿Por qué ser un agente Krak?</h3>
				<div class="max-h-0 overflow-hidden peer-checked:max-h-96 transition-all">
                    <div class="py-4">
                        <p class="text-gray-700">Una app de turnos. Realmente solo turnos pagos, no somos una agenda.</p>
                    </div>
				</div>
            </label>
		</li>
		<li>
			<label class="flex flex-col bg-blue-500 text-white py-4 px-12 rounded-xl has-[:checked]:bg-blue-50 has-[:checked]:text-black hover:cursor-pointer relative">
                <input class="sr-only peer" name="faq" type="checkbox" />
				<span class="absolute top-4 right-10 icon-[tabler--chevron-down] text-3xl peer-checked:rotate-180 hidden lg:block"></span>
				<h3 class="text-xl font-semibold">¿Tengo que tener experiencia?</h3>
				<div class="max-h-0 overflow-hidden peer-checked:max-h-96 transition-all">
                    <div class="py-4">
                        <p class="text-gray-700">Una app de turnos. Realmente solo turnos pagos, no somos una agenda.</p>
                    </div>
				</div>
            </label>
		</li>
		<li>
			<label class="flex flex-col bg-blue-500 text-white py-4 px-12 rounded-xl has-[:checked]:bg-blue-50 has-[:checked]:text-black hover:cursor-pointer relative">
                <input class="sr-only peer" name="faq" type="checkbox" />
				<span class="absolute top-4 right-10 icon-[tabler--chevron-down] text-3xl peer-checked:rotate-180 hidden lg:block"></span>
				<h3 class="text-xl font-semibold">¿Tengo que pagar algun fee para trabajar con ustedes?</h3>
				<div class="max-h-0 overflow-hidden peer-checked:max-h-96 transition-all">
                    <div class="py-4">
                        <p class="text-gray-700">Una app de turnos. Realmente solo turnos pagos, no somos una agenda.</p>
                    </div>
				</div>
            </label>
		</li>
		<li>
			<label class="flex flex-col bg-blue-500 text-white py-4 px-12 rounded-xl has-[:checked]:bg-blue-50 has-[:checked]:text-black hover:cursor-pointer relative">
                <input class="sr-only peer" name="faq" type="checkbox" />
				<span class="absolute top-4 right-10 icon-[tabler--chevron-down] text-3xl peer-checked:rotate-180 hidden lg:block"></span>
				<h3 class="text-xl font-semibold">¿Cuál es el diferencial de Krak Real Estate?</h3>
				<div class="max-h-0 overflow-hidden peer-checked:max-h-96 transition-all">
                    <div class="py-4">
                        <p class="text-gray-700">Una app de turnos. Realmente solo turnos pagos, no somos una agenda.</p>
                    </div>
				</div>
            </label>
		</li>
		<li>
			<label class="flex flex-col bg-blue-500 text-white py-4 px-12 rounded-xl has-[:checked]:bg-blue-50 has-[:checked]:text-black hover:cursor-pointer relative">
                <input class="sr-only peer" name="faq" type="checkbox" />
				<span class="absolute top-4 right-10 icon-[tabler--chevron-down] text-3xl peer-checked:rotate-180 hidden lg:block"></span>
				<h3 class="text-xl font-semibold">¿Las capacitaciones tienen costo?</h3>
				<div class="max-h-0 overflow-hidden peer-checked:max-h-96 transition-all">
                    <div class="py-4">
                        <p class="text-gray-700">Una app de turnos. Realmente solo turnos pagos, no somos una agenda.</p>
                    </div>
				</div>
            </label>
		</li>
		<li>
			<label class="flex flex-col bg-blue-500 text-white py-4 px-12 rounded-xl has-[:checked]:bg-blue-50 has-[:checked]:text-black hover:cursor-pointer relative">
                <input class="sr-only peer" name="faq" type="checkbox" />
				<span class="absolute top-4 right-10 icon-[tabler--chevron-down] text-3xl peer-checked:rotate-180 hidden lg:block"></span>
				<h3 class="text-xl font-semibold">¿Cómo puedo sumarme al equipo?</h3>
				<div class="max-h-0 overflow-hidden peer-checked:max-h-96 transition-all">
                    <div class="py-4">
                        <p class="text-gray-700">Una app de turnos. Realmente solo turnos pagos, no somos una agenda.</p>
                    </div>
				</div>
            </label>
		</li>
	</ul>
</section>

<section class="pt-20 pb-24 bg-[#313B51]" id="contact">
	<div class="flex flex-col-reverse items-center text-white mb-12 lg:mb-20">
		<h2 class="text-4xl lg:text-5xl font-bold text-center">Queremos <br class="lg:hidden"> conocerte</h2>
	</div>
	<form class="max-w-xs lg:max-w-4xl w-full mx-auto rounded-3xl">
        <label class="text-gray-500 mb-4 relative flex group-await:opacity-50">
            <input class="rounded-xl peer pt-7 pb-2 pl-12 px-4 w-full font-bold" type="text" placeholder="" maxlength="255" name="name" required> 
            <span class="absolute peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base peer-focus:text-xs peer-focus:top-2 peer-focus:text-gray-500 text-gray-500 text-xs left-12 top-2 transition-all">Nombre</span>
        </label>
        <label class="text-gray-500 mb-4 relative flex group-await:opacity-50">
            <input class="rounded-xl peer pt-7 pb-2 pl-12 px-4 w-full font-bold" type="email" placeholder="" maxlength="255" name="email" required> 
            <span class="absolute peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base peer-focus:text-xs peer-focus:top-2 peer-focus:text-gray-500 text-gray-500 text-xs left-12 top-2 transition-all">Correo</span>
        </label>
        <label class="text-gray-500 mb-4 relative flex group-await:opacity-50">
            <input class="rounded-xl peer pt-7 pb-2 pl-12 px-4 w-full font-bold" type="tel" placeholder="" maxlength="255" name="phone" required> 
            <span class="absolute peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base peer-focus:text-xs peer-focus:top-2 peer-focus:text-gray-500 text-gray-500 text-xs left-12 top-2 transition-all">Teléfono</span>
        </label>
        <div class="grid lg:grid-cols-2 gap-4 lg:gap-2 mb-4">
            <div class="pl-12 pr-8 lg:pr-12  py-4 bg-white rounded-xl flex justify-between items-center gap-8 lg:gap-12">
                <span>Experiencia</span>

                <label class="flex items-center gap-2 lg:gap-4 ml-auto">
                    <input type="radio" name="experience" value="yes" required/>
                    <span>Si</span>
                </label>
                <label class="flex items-center gap-2 lg:gap-4 ">
                    <input type="radio" name="experience" value="no" required/>
                    <span>No</span>
                </label>
            </div>
            <label class="text-gray-500 relative flex group-await:opacity-50">
                <input class="rounded-xl peer pt-7 pb-2 pl-12 px-4 w-full font-bold" type="number" placeholder="" maxlength="255" name="years"> 
                <span class="absolute peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base peer-focus:text-xs peer-focus:top-2 peer-focus:text-gray-500 text-gray-500 text-xs left-12 top-2 transition-all">Años de experiencia</span>
            </label>
        </div>
        <label class="text-gray-500 mb-8 relative flex group-await:opacity-50 hover:cursor-pointer group">
            <input on:input={(e)=>{
                let files = e.currentTarget.files
                if (files) {
                    let file = files[0]
                    curriculumTextInput.innerText = file.name
                }
            }} class="absolute inset-0 sr-only" type="file" placeholder="" name="curriculum" required> 
            <span bind:this={curriculumTextInput} class="rounded-xl bg-white group-hover:bg-gray-100 peer pt-5 pl-40 h-16 px-4 w-full font-bold peer whitespace-nowrap overflow-hidden"></span>
            <span class="absolute top-5 text-gray-500 text-base font-normal left-12 transition-all">Adjuntar CV</span>
        </label>
        <button class="ml-auto text-white group/button px-20 py-5 bg-blue-500 hover:bg-black rounded-xl group-await:bg-black font-semibold *:overflow-hidden flex items-center justify-center mx-auto" type="submit">
            <span class="w-16 group-await:w-0">Enviar</span>
            <span class="group-await:hidden w-0 group-hover/button:w-6 transition-all text-2xl icon-[mdi--chevron-right]"></span>
            <span class="icon-[tabler--loader-2] text-2xl w-0 group-await:w-6 group-await:animate-spin"></span>
        </button>
    </form>
</section>
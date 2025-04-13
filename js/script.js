const inputNombre = document.getElementById('input1');
const inputUser = document.getElementById('input2');
const botonAgregar = document.getElementById('button_agregar');
const registrarUsuarioDiv = document.querySelector('.content_registrarUsuario');
const inputBuscador = document.getElementById('input_buscador');
const divResultado = document.getElementById('resultadoBuscador');

let listaUsuarios = [];

// Navegación con Enter entre campos
function manejoEnter(event, siguienteCampo) {
    if (event.key === 'Enter') {
        if (siguienteCampo) {
            siguienteCampo.focus();
        } else {
            botonAgregar.click();
        }
    }
}

inputNombre.addEventListener('keydown', (event) => manejoEnter(event, inputUser));
inputUser.addEventListener('keydown', (event) => manejoEnter(event));

// Agregar usuario
botonAgregar.addEventListener('click', () => {
    const nombre = inputNombre.value.trim();
    const usuario = inputUser.value.trim();

    if (nombre === '' || usuario === '') {
        alert("Por favor completa ambos campos.");
        return;
    }

    const usuarioExiste = listaUsuarios.some(u => u.usuario === usuario);
    if (usuarioExiste) {
        alert("Este usuario ya existe");
        return;
    }

    listaUsuarios.push({ nombre, usuario });

    inputNombre.value = '';
    inputUser.value = '';
});

// Efecto visual del contenedor de registro
registrarUsuarioDiv.addEventListener('focusin', () => {
    registrarUsuarioDiv.classList.add('activo');
});

registrarUsuarioDiv.addEventListener('focusout', () => {
    setTimeout(() => {
        if (!registrarUsuarioDiv.contains(document.activeElement)) {
            registrarUsuarioDiv.classList.remove('activo');
        }
    }, 0);
});

// Efecto visual del contenedor de buscador
const buscadorDiv = document.querySelector('.content_buscador');
buscadorDiv.addEventListener('focusin', () => {
    buscadorDiv.classList.add('activo');
});

buscadorDiv.addEventListener('focusout', () => {
    setTimeout(() => {
        if (!buscadorDiv.contains(document.activeElement)) {
            buscadorDiv.classList.remove('activo');
        }
    }, 0);
});

// Buscar usuario por nombre de usuario
inputBuscador.addEventListener('input', () => {
    const texto = inputBuscador.value.trim().toLowerCase();
    divResultado.innerHTML = ''; // Limpiar resultados anteriores

    if (texto === '') {
        // No mostrar nada si el campo está vacío
        return;
    }

    const resultados = listaUsuarios.filter(u =>
        u.usuario.toLowerCase().includes(texto)
    );

    if (resultados.length === 0) {
        divResultado.innerHTML = '<p class="no_resultado">Usuario no encontrado</p>';
        return;
    }

    resultados.forEach(usuario => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta_usuario');
        tarjeta.innerHTML = `
            <p><strong>@${usuario.usuario}</strong> (${usuario.nombre})</p>
            `;
        divResultado.appendChild(tarjeta);
    });
});

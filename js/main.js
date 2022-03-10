(function () {
    // variables y objetos a generales 
    let app = document.getElementById('app');
    let inputCaracteres = document.getElementById('numero-caracteres');

    const configuracion = {
        caracteres: parseInt(inputCaracteres.value),
        simbolos: true,
        numeros: true,
        mayusculas: true,
        minusculas: true
    }

    const caracteres = {
        numeros: '0 1 2 3 4 5 6 7 8 9',
        simbolos: '| @ ! # $ % & / ( ) = ? ¿ ¡ * ^ [ ] ; , : . - _  +',
        mayusculas: 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z',
        minusculas: 'a b c d e f g h i j k l m n o p q r s t u v w x y z'
    }

    // Eventos 
    app.addEventListener('click', (e) => {
        e.preventDefault();
    })

    app.elements.namedItem('btn-menos-uno').addEventListener('click', () => {
        if(configuracion.caracteres > 1){
            configuracion.caracteres--;
            inputCaracteres.value = configuracion.caracteres;
        }
    });

    app.elements.namedItem('btn-mas-uno').addEventListener('click', () => {
        if(configuracion.caracteres < 20) {
            configuracion.caracteres++;
            inputCaracteres.value = configuracion.caracteres;
        }
    });

    
    let elementos = [...app.elements].filter((elem) => {
        return /^btn-(simbolos|numeros|mayusculas)/.test(elem.id)
    });

    for (let i = 0; i < elementos.length; i++) {
        if (elementos[i].id == 'btn-simbolos' || elementos[i].id == 'btn-numeros' || 
            elementos[i].id == 'btn-mayusculas' ) {
            elementos[i].addEventListener('click',(e) => {
                let change = elementos[i].id.slice(4);
                btnToggle(e, change);
            })
        }
    }

    app.elements.namedItem('btn-generar').addEventListener('click', e => {
        generarPassword();
    });


    app.elements.namedItem('input-password').addEventListener('click', () => {
        copiarPassword();
    });

    // Funciones 

    function btnToggle(elem, conf) {
        elem.target.classList.toggle('false');
        elem.target.childNodes[0].classList.toggle('bx-check');
        elem.target.childNodes[0].classList.toggle('bx-x');
        configuracion[conf] = !configuracion[conf];
    }

    function generarPassword() {
        let caracteresFinales = '';
        let password = '';

        for(propiedad in configuracion) {
            if(configuracion[propiedad] == true) {
                caracteresFinales += caracteres[propiedad] + ' ';
            }
        }
        caracteresFinales = caracteresFinales.trim();
        caracteresFinales = caracteresFinales.split(" ");

        for (let i = 0; i < configuracion.caracteres; i++) {
            let numAzar = Math.floor(Math.random() * caracteresFinales.length);
            password += caracteresFinales[numAzar];
        }
        
        mostrarPassword(password);
    }

    function mostrarPassword(password){
        app.elements.namedItem('input-password').value = password;
    }

    function copiarPassword() {
        app.elements.namedItem('input-password').select();
        document.execCommand('copy');
        document.getElementById('alerta-copiado').classList.add('active');

        setTimeout(() => {
            document.getElementById('alerta-copiado').classList.remove('active');
        }, 2000)
    }

    generarPassword();
}());
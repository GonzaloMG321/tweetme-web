const MESES = {
    1: 'Enero',
    2: 'Febrero',
    3: 'Marzo',
    4: 'Abril',
    5: 'Mayo',
    6: 'Junio',
    7: 'Julio',
    8: 'Agosto',
    9: 'Septiembre',
    10: 'Octubre',
    11: 'Noviembre',
    12: 'Diciembre'
}


export const stopPropagation = ( event )=> {
    event.stopPropagation()
}

export const daysBetween = (first, second) => {

    // Copy date parts of the timestamps, discarding the time parts.
    var one = new Date(first.getFullYear(), first.getMonth(), first.getDate());
    var two = new Date(second.getFullYear(), second.getMonth(), second.getDate());

    // Do the math.
    var millisecondsPerDay = 1000 * 60 * 60 * 24;
    var millisBetween = two.getTime() - one.getTime();
    var days = millisBetween / millisecondsPerDay;

    // Round down.
    return Math.floor(days);
}

export const getFechaPublicacion = ( fecha )  => {
    const dia = fecha.getDate()
    const mes = fecha.getMonth()
    const anio = fecha.getFullYear()

    const fechaActual = new Date()

    const diasPasados = daysBetween( fecha, fechaActual)

    let fechaFinal =  " Hola wey";
    
    if( diasPasados > 0){
        if ( anio === fechaActual.getFullYear() ) {
            fechaFinal = `${ getAbreviaturaMes( mes ) } ${ dia }`
        }else{
            fechaFinal = `${ getAbreviaturaMes( mes ) } ${ dia } ${ anio }`
        }
    }else{
        let tiempo = " 10 horas";
        const horasDiferencia = fechaActual.getHours() - fecha.getHours()
        if(horasDiferencia === 0){
            const minutosDiferencia = fechaActual.getMinutes() - fecha.getMinutes() 
            if(minutosDiferencia === 0 ){
                tiempo = 'unos instantes'
            }else if ( minutosDiferencia === 1){
                tiempo = 'un 1 minuto'
            }else {
                tiempo = `${minutosDiferencia} minutos`
            }
        }else if( horasDiferencia === 1){
            tiempo = '1 hora'
        }else{
            tiempo = `${horasDiferencia} horas`
        }

        fechaFinal = `Hace ${tiempo}`
    }

    return fechaFinal;
}

export const getAbreviaturaMes = ( mes ) => {
    return MESES[mes]
} 

export const compareArrayTweets = (tweets, tweetsInit) => {
    let existe = false
    if(tweetsInit.length > 0){
        const tweet = tweetsInit[0]
        existe = tweets.some(element => {
            return tweet.id === element.id 
        })
    }
    return existe
}

/*
Borra los elementos del primer array que coinciden con los del segundo
 */
export const borrarElementos = (primerArray, segundoArray) => {
    const nuevo = primerArray.filter(elemento => {
        const coincide = segundoArray.some(elementoSegundoArray => {
            return elemento.id === elementoSegundoArray.id
        })
        return !coincide
    })
    return nuevo
}
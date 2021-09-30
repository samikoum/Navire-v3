

const todayUpdateFunction = (date)=>{
    var today = new Date(date);

    var dd = today.getDate()
    var mm = today.getMonth() + 1
    var yyyy = today.getFullYear();

    if(dd<=9 && mm<=9) {
        today = `${yyyy}-0${mm}-0${dd}`
    }else if(dd<=9) {
        today = `${yyyy}-${mm}-0${dd}`
    }else if(mm<=9) {
        today = `${yyyy}-0${mm}-${dd}`
    }else {
        today = `${yyyy}-${mm}-${dd}`
    }

    today = String(today)

    return today

}

export default todayUpdateFunction
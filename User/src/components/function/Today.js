

  const todayFunction = (date) => {
    var today = new Date(date);

    var dd = today.getDate()
    var mm = today.getMonth() + 1
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;

    return today

}

export default todayFunction
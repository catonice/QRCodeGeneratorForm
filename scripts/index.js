window.onload = function () {
    let json = localStorage.getItem("json");

    json = JSON.parse(json);
    if (json) {
        $('#name').val(json.name);
        $('#surname').val(json.surname);
        $('#temp').val(json.temp);
        $('#visitDate').val(json.visitDate);
    }
    var d = new Date();
    var month = d.getMonth();
    var month_actual = month + 1;

    if (month_actual < 10) {
        month_actual = "0" + month_actual;
    }

    var day_val = d.getDate();
    if (day_val < 10) {
        day_val = "0" + day_val;
    }

    let str = d.getFullYear() + "-" + month_actual + "-" + day_val;
    $('#visitDate').val(str);
}

function makeQRCode() {
    var typeNumber = 0;
    var errorCorrectionLevel = 'L';
    var qr = qrcode(typeNumber, errorCorrectionLevel);

    var name = $('#name').val();
    var surname = $('#surname').val();
    var temp = $('#temp').val();
    var visitDate = $('#visitDate').val();

    var json = {
        'name': name,
        'surname': surname,
        'temp': temp,
        'visitDate': visitDate
    }

    json = JSON.stringify(json);
    visitDate = visitDate.replace(/-/gi, '/')

    var str = name + "|" + surname + "|" + temp + "|" + visitDate;

    localStorage.setItem("json", json);

    qr.addData(str);
    qr.make();
    document.getElementById('placeHolder').innerHTML = qr.createImgTag();
}
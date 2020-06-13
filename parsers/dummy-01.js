module.exports = (data) => {

    if (data[0]) {

        data[0] = 0xAA;
    }

    return data;
}

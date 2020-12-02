const nodeXlsx = require('node-xlsx');
const fs = require('fs');

module.exports ={
    renderExcel(path, dataExcel){
        const wstream = fs.createWriteStream('public/' + path);
        const buffer = nodeXlsx.build([{
            name: 'Excel',
            data: dataExcel
        }]);
        wstream.write(buffer);
        wstream.end();
        return path;
    }
}
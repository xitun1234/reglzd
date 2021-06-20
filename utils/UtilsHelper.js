const nodeXlsx = require('node-xlsx');
const fs = require('fs');

module.exports ={
    renderExcel(path, dataExcel){
        const wstream = fs.createWriteStream('public/' + path);
        const dataSheet1 = [[1, 2, 3], [true, false, null, 'sheetjs'], ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']];
        const buffer = nodeXlsx.build([{
            name: 'Excel',
            data: dataExcel
        }]);
        wstream.write(buffer);
        wstream.end();
        return path;
    }
}
document.write("<table>")
for(var row=1;row<10;row++){
    document.write("<tr>")
    for(var colum = 1;colum<=row;colum++){
        document.write(`<td>${colum}x${row}=${row*colum}</td>`)
    }
    document.write("</tr>")
}
document.write("</table>")
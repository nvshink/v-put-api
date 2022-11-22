const ticketTemplate = (printData) => {
    return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
        </head>
        <body>
        <p>${printData.id}</p>
        <p>${printData.name}</p>
        <p>${printData.series}</p>
        <p>${printData.number}</p>
        <p>${printData.flight.startCity}</p>
        </body>
    </html>
    `;
    };
    module.exports = ticketTemplate;
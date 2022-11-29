const ticketTemplate = (printData) => {
  return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style type="text/css">
          * {
            font-family: Roboto, arial, helvetica, sans-serif;
          }
          td {
            padding: 0px 50px;
          }
          p {
            color: gray;
            margin: 3px;
          }
          h1 {
            margin: 0;
          }
          h3 {
            margin: 20px 0 0 0;
          }
          .p-header {
            margin-bottom: 8px;
          }
          .white-on-black {
            background-color: black;
            color: white;
          }
         </style>
        </head>
        <body>
        <table>
          <tr>
            <td>
              <h1>Маршрутная</h1>
              <h1>квитанция</h1>
              <p>ELECTRONIC TICKET/ITINERARY RECEIPT</p>
            </td>
            <td>
              <p>НОМЕР ВАШЕГО БИЛЕТА</p>
              <p class="white-on-black">${printData.id}</p>
            </td>
          </tr>
          <tr>
            <td>
              <h3>Данные полёта</h3>
            </td>
          </tr>
          <tr>
            <td>
              <p class="p-header">ПАССАЖИР<p>
              <p>${printData.name}</p>
            </td>
            <td>
              <p class="p-header">ПАСПОРТ<p>
              <p>${printData.series} ${printData.number}</p>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>
              <h3>Информация о маршруте</h3>
            </td>
          </tr>
          <tr>
            <td>
              <p class="p-header">ВЫЛЕТ<p>
              <p>${printData.flight.startCity}</p>
              <p>${printData.flight.startDate.toUTCString()}</p>
            </td>
            <td>
              <p class="p-header">ПРИБЫТИЕ<p>
              <p>${printData.flight.endCity}</p>
              <p>${printData.flight.endDate.toUTCString()}</p>
            </td>
            <td></td>
          </tr>
        </table>
        <p></p>
        </body>
    </html>
    `;
};
module.exports = ticketTemplate;
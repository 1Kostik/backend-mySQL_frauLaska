const mjml2html = require("mjml");
const { format } = require("date-fns");
const { uk } = require("date-fns/locale");

const { getMainImage } = require("../controllers/products");

const createEmail = async (order) => {
  const {
    name,
    last_name,
    id,
    order_date,
    payment_method,
    payment_status,
    total_amount,
    phone,
    email,
    recipient_name,
    recipient_last_name,
    recipient_phone,
    delivery_type,
    delivery_city,
    delivery_destination,
    order_items,
  } = order;

  const heroSectionHtml = `<mj-section
      padding="10px 30px"
      background-color="#171616"
      border-bottom="15px solid #252525"
    >
      <mj-column>
         <mj-image
          align="left"
          width="50px"
          height="40px"
          padding="10px 0 0 "
          src="https://res.cloudinary.com/dqbugqiwk/image/upload/v1729614158/fraulogo.png"
          href="https://perunitsa.com/"
        />
      </mj-column>
      <mj-column padding-left="30px">
        <mj-text css-class="text">
          <span>${name} ${last_name}</span>, дякуємо за покупку
        </mj-text>
        <mj-text css-class="text"> <span>Замовлення:</span> №${id} </mj-text>
        <mj-text css-class="text">
          <span>Оформлено:</span> ${format(order_date, "d MMMM yyyy 'р.' ", {
            locale: uk,
          })}
        </mj-text>
      </mj-column>
    </mj-section>`;

  const paymentHtml = `<mj-section
      css-class="section"
      padding="15px 30px 10px"
      background-color="#171616"
    >
      <mj-column border-bottom="1px solid #b7b7b7" padding-bottom="10px">
        <mj-text css-class="text">
          Оплата: <span>${
            payment_method === "Накладний платіж"
              ? "Післяплатою"
              : "Картою на сайті"
          }</span>
        </mj-text>
      </mj-column>
      <mj-column border-bottom="1px solid #b7b7b7" padding-bottom="10px">
        <mj-text css-class="text">
         ${
           payment_status === "Сплачено" ? "Сплачено:" : "Сума до сплати:"
         }  <span>${total_amount} грн</span>
        </mj-text>
      </mj-column>
    </mj-section>`;

  const customerInfoHtml = `<mj-section
      css-class="section"
      padding="0px 30px 10px"
      background-color="#171616"
    >
      <mj-column border-bottom="1px solid #b7b7b7" padding-bottom="56px">
        <mj-text css-class="text"> Замовник </mj-text>
      </mj-column>
      <mj-column border-bottom="1px solid #b7b7b7" padding-bottom="10px">
        <mj-text css-class="text"> <span>${name} ${last_name}</span> </mj-text>
        <mj-text css-class="text"><span>${phone}</span> </mj-text>
        <mj-text css-class="text"><span>${email}</span> </mj-text>
      </mj-column>
    </mj-section>`;

  const receiverInfoHtml = `<mj-section
      css-class="section"
      padding="0px 30px 10px"
      background-color="#171616"
    >
      <mj-column border-bottom="1px solid #b7b7b7" padding-bottom="33px">
        <mj-text css-class="text"> Отримувач </mj-text>
      </mj-column>
      <mj-column border-bottom="1px solid #b7b7b7" padding-bottom="10px">
        <mj-text css-class="text"> <span>${
          recipient_name ? recipient_name : name
        } ${
    recipient_last_name ? recipient_last_name : last_name
  }</span> </mj-text>
        <mj-text css-class="text"><span>${
          recipient_phone ? recipient_phone : phone
        }</span> </mj-text>
      </mj-column>
    </mj-section>`;

  const deliveryHtml = `<mj-section
      css-class="section"
      padding="0px 30px 15px"
      background-color="#171616"
      border-bottom="15px solid #252525"
    >
      <mj-column>
        <mj-text css-class="text">Адреса доставки</mj-text>
      </mj-column>
      <mj-column>
      ${
        delivery_type !== "Самовивіз"
          ? `<mj-text css-class="text"><span>${delivery_city}</span></mj-text>
        <mj-text css-class="text"><span>${delivery_destination}</span> </mj-text>`
          : `<mj-text css-class="text"><span>Самовивіз</span> </mj-text>`
      }
      </mj-column>
    </mj-section>`;

  const orderedItemsHtml = await Promise.all(
    order_items.map(
      async ({ title, color, size, count, total_cost, product_id }) => {
        const mainImg = await getMainImage(product_id);
        const unitType =
          size && size.toString().replace(/[^a-zA-Zа-яА-ЯёЁ]/g, "");
        const type =
          unitType === "шт"
            ? "Пакування"
            : unitType === "гр"
            ? "Вага"
            : "Об'єм";
        return `<mj-section
      css-class="section"
      padding="15px 30px 0"
      background-color="#171616"
    >
      <mj-column border-bottom="1px solid #b7b7b770" padding="0 10px 15px 0" width="60px">
        <mj-image
          align="center"
          width="50px"
          height="50px"
          src="${mainImg}"
          padding="0px"
          border-radius="8px"
        />
      </mj-column>
      <mj-column border-bottom="1px solid #b7b7b770" padding="0 0 19px" width="340px">
        <mj-text css-class="text" align="left">${title}</mj-text>
        <mj-text css-class="text" align="left">${
          total_cost / count
        } грн × ${count} </mj-text>
      </mj-column>
      <mj-column border-bottom="1px solid #b7b7b770" padding="0 0 19px" width="120px">
        ${
          color
            ? `<mj-text css-class="text" align="left" padding="0">
                  <span style="display: inline-block; margin-right: 5px;">Колір:</span>
                  <span style="background-color: ${color}; display: inline-block; width: 11px; height: 11px; border-radius: 50%;"/>
               </mj-text> 
                ${
                  size
                    ? `<mj-text css-class="text" align="left">
               <span>${type}:</span> ${size}
              </mj-text>`
                    : `<mj-text css-class="text" align="left" padding="0">
                  <span style="display: inline-block; margin-right: 5px;"></span>
               </mj-text>`
                }`
            : `${
                size
                  ? `<mj-text css-class="text" align="left">
               <span>${type}:</span> ${size}
              </mj-text>`
                  : `<mj-text css-class="text" align="left" padding="0">
                  <span style="display: inline-block; margin-right: 5px;"></span>
               </mj-text>`
              }<mj-text css-class="text" align="left" padding="0">
                  <span style="display: inline-block; margin-right: 5px;"></span>
               </mj-text>`
        }
        
      </mj-column>
      <mj-column border-bottom="1px solid #b7b7b770" padding="10px 0 32px" width="120px">
        <mj-text css-class="text" align="right"> ${total_cost} грн </mj-text>
      </mj-column>
    </mj-section>`;
      }
    )
  );

  const orderedItemsHtmlString = orderedItemsHtml.join("");

  const deliveryPriceHtml =
    delivery_type === "Самовивіз"
      ? ``
      : `<mj-section
      css-class="section"
      padding="15px 30px 0"
      background-color="#171616"
    >
      <mj-column border-bottom="1px solid #b7b7b7" padding="0 0 15px">
        <mj-text css-class="text" align="center">
          Доставка «Новою поштою»
        </mj-text>
      </mj-column>
      <mj-column border-bottom="1px solid #b7b7b7" padding="0 0 15px">
        <mj-text css-class="text" align="right">
          за тарифами перевізника
        </mj-text>
      </mj-column>
    </mj-section>`;

  const totalAmountHtml = `<mj-section
      css-class="section"
      padding="15px 30px 10px"
      background-color="#171616"
    >
      <mj-column border-bottom="3px solid #b7b7b7" padding="0 0 15px ">
        <mj-text
          css-class="text total"
          align="right"
          font-size="18px"
          font-weight="bold"
        >
          <span>Всього</span> ${total_amount} грн
        </mj-text>
      </mj-column>
    </mj-section>`;

  const htmlOutput = mjml2html(
    `
  <mjml>
  <mj-head>
    <mj-title>Заказ на сайті Frau Laska</mj-title>
    <mj-preview>Заказ на сайті Frau Laska</mj-preview>
    <mj-font
      name="Raleway"
      href="https://fonts.googleapis.com/css?family=Raleway"
    />
    <mj-style inline="inline">
      .text {padding: 5px !important} .text div {color: #d7d7d7 !important;
      font-family: Helvetica !important;} .text span { color: #838383
      !important; } .link a{ text-decoration: underline !important; }
      .text.total span { padding-right: 10px !important; font-size: 14px; color:
      #d7d7d7 !important} 
    </mj-style>
  </mj-head>

  <mj-body background-color="#252525" width="700px">
    ${heroSectionHtml}
    ${paymentHtml}
    ${customerInfoHtml}
    ${receiverInfoHtml}
    ${deliveryHtml}
    <mj-section
      css-class="section"
      padding="15px 30px 0px"
      background-color="#171616"
    >
      <mj-column border-bottom="1px solid #b7b7b7" padding-bottom="10px">
        <mj-text css-class="text" font-size="18px" font-weight="bold">
          Замовлення
        </mj-text>
      </mj-column>
    </mj-section>
    ${orderedItemsHtmlString}
    ${deliveryPriceHtml}
    ${totalAmountHtml}
    <mj-section
      css-class="section"
      padding="15px 30px 10px"
      background-color="#171616"
    >
      <mj-column padding="0 0 15px">
        <mj-text css-class="text" font-size="16px">+380(96)148-88-48</mj-text>
      </mj-column>
      <mj-column padding="0 0 15px">
        <mj-text css-class="text" font-size="16px">Frau.association@gmail.com</mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`
  );

  return htmlOutput.html;
};

module.exports = createEmail;

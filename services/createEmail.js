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

  const heroSectionHtml = `
    <mj-section css-class="split-section">
      <mj-column width="290px">
         <mj-image
          css-class="logo"
          align="left"
          width="50px"
          height="40px"
          src="https://res.cloudinary.com/dqbugqiwk/image/upload/v1729614158/fraulogo.png"
          href="https://www.shop.fraulaska.com/"
        />
      </mj-column>
      <mj-column  width="400px !important">
        <mj-text css-class="text">
          <span>${name} ${last_name}</span>, дякуємо за покупку
        </mj-text>
        <mj-text css-class="text" ><span>Замовлення:</span> № ${id}</mj-text>
        <mj-text css-class="text">
          <span>Оформлено:</span> ${format(order_date, "d MMMM yyyy 'р.' ", {
            locale: uk,
          })}
        </mj-text>
      </mj-column>
    </mj-section>`;

  const paymentHtml = `
    <mj-section css-class="section">
      <mj-column width="290px">
        <mj-text css-class="text title">
          Оплата:
        </mj-text>
        <mj-text css-class="text">
        <span>${
          payment_method === "Накладний платіж"
            ? "Накладний платіж"
            : "Переказ на банківський рахунок"
        }</span>
        </mj-text>
      </mj-column>
      <mj-column width="400px">
       ${
         payment_method === "paymentByRequisites"
           ? `<mj-text css-class="text pay recipient">
                  Найменування отримувача: <span>ФОП Лотоцька Лана Сергіївна</span>
              </mj-text>
              <mj-text css-class="text">
                Код отримувача: <span>3196409941</span>
              </mj-text>
              <mj-text css-class="text pay">
                  Рахунок отримувача: <span>UA063052990000026009000403601</span>
              </mj-text>
              <mj-text css-class="text">
                 Назва банку: <span>АТ КБ "ПРИВАТБАНК"</span>
              </mj-text>`
           : ``
       }
        <mj-text css-class="text" align="right">
         Сума до сплати:  <span>${total_amount} грн</span>
        </mj-text>
      </mj-column>
    </mj-section>`;

  const customerInfoHtml = `
    <mj-section css-class="section">
      <mj-column>
        <mj-text css-class="text title">Замовник:</mj-text>
      </mj-column>
      <mj-column>
        <mj-text css-class="text customer"><span>${name} ${last_name}</span></mj-text>
        <mj-text css-class="text customer"><span>${phone}</span></mj-text>
        <mj-text css-class="text customer"><span>${email}</span></mj-text>
      </mj-column>
    </mj-section>
    `;

  const receiverInfoHtml = `
    <mj-section css-class="section">
      <mj-column>
        <mj-text css-class="text title">Отримувач:</mj-text>
      </mj-column>
      <mj-column>
        <mj-text css-class="text customer">
          <span>${recipient_name ? recipient_name : name} ${
    recipient_last_name ? recipient_last_name : last_name
  }</span></mj-text>
        <mj-text css-class="text customer"><span>${
          recipient_phone ? recipient_phone : phone
        }</span></mj-text>
      </mj-column>
    </mj-section>
    `;

  const deliveryHtml = `
    <mj-section css-class="split-section">
      <mj-column>
        <mj-text css-class="text title">Адреса доставки:</mj-text>
      </mj-column>
      <mj-column>
      ${
        delivery_type !== "Самовивіз"
          ? `<mj-text css-class="text customer"><span>${delivery_city}</span></mj-text>
        <mj-text css-class="text customer"><span>${delivery_destination}</span></mj-text>`
          : `<mj-text css-class="text customer"><span>Самовивіз</span></mj-text>`
      }
      </mj-column>
    </mj-section>
    `;

  const orderedItemsHtml = await Promise.all(
    order_items.map(
      async ({ title, color, size, count, total_cost, product_id }) => {
        const mainImg = await getMainImage(product_id);
        const unitType =
          size && size.toString().replace(/[^a-zA-Zа-яА-ЯёЁ]/g, "");
        const type =
          unitType === "шт" ? "Комплект" : unitType === "гр" ? "Вага" : "Об'єм";
        return `
        <mj-section css-class="section product">
      <mj-column  width="90px">
        <mj-image
          align="left"
          width="90px"
          src=${mainImg}
          padding="0 0 0 5px"
          border-radius="10px"
        />
      </mj-column>
      <mj-column width="370px">
        <mj-text css-class="text description">${title}</mj-text>
        <mj-text css-class="text description">${
          total_cost / count
        } грн × ${count} </mj-text>
      </mj-column>
      <mj-column  width="120px">
        ${
          color
            ? `<mj-text css-class="text variation">
                  <span style="display: inline-block; margin-right: 5px;">Колір:</span>
                  <span style="background-color: ${color}; display: inline-block; width: 11px; height: 11px; border-radius: 50%;"/>
               </mj-text> 
                ${
                  size
                    ? `<mj-text css-class="text variation">
               <span>${type}:</span> ${size}
              </mj-text>`
                    : `<mj-text css-class="text variation" padding="0">
                  <span style="display: inline-block; margin-right: 5px"/>
               </mj-text>`
                }`
            : `${
                size
                  ? `<mj-text css-class="text variation">
               <span>${type}:</span> ${size}
              </mj-text>`
                  : `<mj-text css-class="text variation" padding="0">
                  <span style="display: inline-block; margin-right: 5px"/>
               </mj-text>`
              }<mj-text css-class="text variation" padding="0">
                  <span style="display: inline-block; margin-right: 5px"/>
               </mj-text>`
        }
        
      </mj-column>
      <mj-column  width="120px">
        <mj-text css-class="text total" align="right">${total_cost} грн </mj-text>
      </mj-column>
    </mj-section>`;
      }
    )
  );

  const orderedItemsHtmlString = orderedItemsHtml.join("");

  const deliveryPriceHtml =
    delivery_type === "Самовивіз"
      ? ``
      : `<mj-section css-class="section">
      <mj-column>
        <mj-text css-class="text">
          Доставка «Новою поштою»
        </mj-text>
      </mj-column>
      <mj-column>
        <mj-text css-class="text delivery">
          <span>за тарифами перевізника</span>
        </mj-text>
      </mj-column>
    </mj-section>`;

  const totalAmountHtml = `
    <mj-section css-class="section">
      <mj-column>
        <mj-text css-class="text total-amount" align="right">
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
    <mj-style >
      .logo {padding: 0 15px 10px !important}
      
      .split-section {padding: 0 10px; background-color: #171616; border-bottom: 15px 					solid #252525}
      .section {background-color: #171616; padding: 0 10px; border-bottom: 1px solid 									#b7b7b7}
      .section.product {border-bottom: 1px solid	#b7b7b720}
         
      .text {padding: 5px !important} 
      .text div {color: #d7d7d7 !important; font-family: Helvetica !important; 
      	font-size: 12px !important} 
      .text span { color: #838383 !important} 
      .text.pay span {line-height: 20px}
      .text.pay.recipient div {padding-right: 119px}
      .title div {font-size: 14px !important}
      .text.delivery span {text-align: left !important}
      
      .text.total div {font-size: 16px !important; color:
      	#d7d7d7 !important}  
      .total-amount span, .total-amount div {font-size: 24px !important; 
     			 font-weight: bold}
      .text.description div, .text.variation div {text-align: right !important}
      
      .link a{ text-decoration: underline !important; }
      
      
      @media only screen and (min-width: 480px) {
      .section {padding: 0 10px}
      
 			.text div {font-size: 14px !important}
      .text.pay span {line-height: 14px}
      .text.pay.recipient div {padding-right: 0}
      .text.customer div{text-align: right !important}
      .text.delivery div {text-align: right !important}
      .title div{font-size: 18px !important}
      .total-amount div {font-size: 24px !important; 
     			 font-weight: bold}
      .product {padding-left: 10px !important}
      .text.description div, .text.variation div {text-align: left !important}
      .text.description div {padding-left: 10px}
}
      
    </mj-style>
  </mj-head>

  <mj-body background-color="#252525" width="700px">
    ${heroSectionHtml}
    ${paymentHtml}
    ${customerInfoHtml}
    ${receiverInfoHtml}
    ${deliveryHtml}
    <mj-section css-class="section">
      <mj-column>
        <mj-text css-class="text" font-size="20px !important" font-weight="bold">
          Замовлення
        </mj-text>
      </mj-column>
    </mj-section>
    ${orderedItemsHtmlString}
    ${deliveryPriceHtml}
    ${totalAmountHtml}
    <mj-section css-class="section last">
      <mj-column>
        <mj-text css-class="text title" align="center">+380(96)148-88-48</mj-text>
      </mj-column>
      <mj-column> 
        <mj-text css-class="text title" align="center">Frau.association@gmail.com</mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`
  );

  return htmlOutput.html;
};

module.exports = createEmail;

import { formatToBrazilianString, getDate } from "../../utils/getData"
import { currency } from "../../utils/mask/currency"
import { serializeProducts } from "../../utils/serialize-products"
import { Customer } from "../entities/customer"
import { Product } from "../entities/product"

export function createCustomerEmail(customer: Customer, products: Product[]) {
  const date = formatToBrazilianString(getDate())
  const listForBudget = serializeProducts(products).map(
    (product) =>
      `<tr style="background-color: #ffffff">
        <td style="white-space: nowrap; padding: 8px 16px">${product.ref}</td>
        <td style="white-space: nowrap; padding: 8px 16px">${product.amount}</td>
      </tr>`
  )
  return `<div
  style="
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 600;
    color: #565857;
  "
>
  <ul style="list-style: none; font-size: 16px; padding: 0">
    <li style="margin-top: 1rem">
      Enviado em: ${date}
    </li>
    <li style="margin-top: 1rem">Enviado por: ${customer.name}, ${
    customer.email
  }</li>    
 
    <li style="margin-top: 1rem">
      <table
        style="
          width: fit-content;
          text-align: center;
          margin-top: 8px;
          background-color: rgba(0, 0, 0, 0.1);
          border-radius: 5px;
        "
      >
        <caption
          style="
            margin-bottom: 16px;
            font-size: 16px;
            white-space: nowrap;
            text-align: left;
            font-weight: bold;
          "
        >
          Lista para orçamento:
        </caption>
        <tr
          style="background-color: #00aaaa; color: #ffffff; font-size: 16px"
        >
          <th style="padding: 8px 16px">Referência</th>
          <th style="padding: 8px 16px">Quantidade</th>          
        </tr>
        ${listForBudget.join("").replace(/>,/g, ">")}      
      </table>
    </li>
  </ul>
</div>`
}

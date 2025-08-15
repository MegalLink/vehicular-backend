import { Injectable } from '@nestjs/common';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

import {
  IPdfRepository,
  PaymentAdditionalData,
  OrderDto,
} from '../../domain/interfaces/pdf-repository.interface';

const FRANCHISE_MAIN_COLOR = '#5189AB';
const SECONDARY_COLOR = '#888';

@Injectable()
export class PdfRepository implements IPdfRepository {
  constructor() {
    (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
  }

  generateInvoice(
    order: OrderDto,
    additionalData: PaymentAdditionalData,
  ): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const invoicePFF: pdfMake.TCreatedPdf = this.invoiceTemplate(
        order,
        additionalData,
      );
      invoicePFF.getBuffer((buffer: Buffer) => {
        if (buffer) {
          resolve(buffer);
        } else {
          reject(new Error('Failed to generate pdf buffer'));
        }
      });
    });
  }

  private invoiceTemplate(
    order: OrderDto,
    additionalData: PaymentAdditionalData,
  ): pdfMake.TCreatedPdf {
    const roundToTwoDecimals = (num: number) => Math.round(num * 100) / 100;
    const totalWithTax = roundToTwoDecimals(
      order.items.reduce(
        (sum, item) =>
          sum +
          roundToTwoDecimals(item.price + item.price * additionalData.tax) *
            item.quantity,
        0,
      ),
    );
    const totalWithOutTax = roundToTwoDecimals(
      order.items.reduce(
        (sum, item) => sum + roundToTwoDecimals(item.price) * item.quantity,
        0,
      ),
    );

    const dd: TDocumentDefinitions = {
      content: [
        {
          columns: [
            {
              text: 'INVOICE',
              style: 'header',
            },
            {
              text: `Order ID: ${order.orderID}`,
              alignment: 'right',
              style: 'orderDetails',
            },
          ],
        },
        {
          columns: [
            {
              text: `Date: ${order.createdAt.toDateString()}`,
              alignment: 'right',
              style: 'orderDetails',
            },
          ],
        },

        {
          text: 'Customer Information',
          style: 'subheader',
          margin: [0, 20, 0, 10],
        },
        {
          columns: [
            {
              width: '50%',
              stack: [
                {
                  text: `Name: ${order.userDetail.firstName} ${order.userDetail.lastName}`,
                  style: 'customerDetails',
                },
                {
                  text: `Document: ${order.userDetail.identityDocumentType} - ${order.userDetail.identityDocumentNumber}`,
                  style: 'customerDetails',
                },
                {
                  text: `Phone: ${order.userDetail.phone}`,
                  style: 'customerDetails',
                },
              ],
            },
            {
              width: '50%',
              stack: [
                {
                  text: `Address: ${order.userDetail.address}`,
                  style: 'customerDetails',
                },
                {
                  text: `City: ${order.userDetail.city}, ${order.userDetail.province}`,
                  style: 'customerDetails',
                },
                {
                  text: `Postal Code: ${order.userDetail.postalCode}`,
                  style: 'customerDetails',
                },
              ],
              alignment: 'right',
            },
          ],
        },

        // Tabla de ítems
        {
          text: 'Order Items',
          style: 'subheader',
          margin: [0, 20, 0, 10],
        },
        {
          style: 'itemsTable',
          table: {
            widths: ['auto', '*', 'auto', 'auto', 'auto'],
            body: [
              [
                { text: 'Code', style: 'tableHeader' },
                { text: 'Product Name', style: 'tableHeader' },
                { text: 'Quantity', style: 'tableHeader' },
                { text: 'Unit Price', style: 'tableHeader' },
                { text: 'Total', style: 'tableHeader' },
              ],
              ...order.items.map((item) => [
                { text: `${item.code}`, style: 'tableItem' },
                { text: `${item.name}`, style: 'tableItem' },
                {
                  text: `${item.quantity}`,
                  alignment: 'center',
                  style: 'tableItem',
                },
                {
                  text: `$${item.price.toFixed(2)}`,
                  alignment: 'right',
                  style: 'tableItem',
                },
                {
                  text: `$${(item.quantity * item.price).toFixed(2)}`,
                  alignment: 'right',
                  style: 'tableItem',
                },
              ]),
              // Subtotal, IVA y Total
              [
                {
                  text: 'Subtotal',
                  colSpan: 3,
                  alignment: 'right',
                  style: 'tableItem',
                },
                {},
                {},
                {},
                {
                  text: `$${totalWithOutTax}`,
                  alignment: 'right',
                  style: 'tableTotal',
                },
              ],
              [
                {
                  text: `IVA (${additionalData.tax * 100}%)`,
                  colSpan: 3,
                  alignment: 'right',
                  style: 'tableItem',
                },
                {},
                {},
                {},
                {
                  text: `$${roundToTwoDecimals(totalWithTax - totalWithOutTax)}`,
                  alignment: 'right',
                  style: 'tableTotal',
                },
              ],
              [
                {
                  text: 'Total',
                  colSpan: 3,
                  alignment: 'right',
                  style: 'tableItem',
                },
                {},
                {},
                {},
                {
                  text: `$${totalWithTax}`,
                  alignment: 'right',
                  style: 'tableTotal',
                },
              ],
            ],
          },
          layout: {
            hLineWidth: () => 0,
            vLineWidth: () => 0,
            fillColor: function (rowIndex: number) {
              return rowIndex % 2 === 0 ? '#f3f3f3' : null;
            },
          },
        },

        {
          columns: [
            {
              text: `Payment platform ID: ${additionalData.paymentID}`,
              style: 'statusText',
              margin: [0, 20, 0, 10],
            },
            {
              text: `Payment With: ${additionalData.paymentWith}`,
              style: 'statusText',
              alignment: 'right',
              margin: [0, 20, 0, 10],
            },
          ],
        },

        // Pie de página
        {
          text: 'Thank you for your purchase!',
          style: 'footer',
          alignment: 'center',
          margin: [0, 50, 0, 0],
        },
      ],
      styles: {
        header: {
          fontSize: 24,
          bold: true,
          color: FRANCHISE_MAIN_COLOR,
        },
        subheader: {
          fontSize: 18,
          bold: true,
          color: FRANCHISE_MAIN_COLOR,
        },
        customerDetails: {
          fontSize: 12,
          margin: [0, 2, 0, 2],
        },
        orderDetails: {
          fontSize: 12,
          color: SECONDARY_COLOR,
        },
        itemsTable: {
          margin: [0, 20, 0, 20],
        },
        tableHeader: {
          bold: true,
          fontSize: 12,
          color: 'white',
          fillColor: FRANCHISE_MAIN_COLOR,
          alignment: 'center',
        },
        tableItem: {
          margin: [5, 5, 5, 5],
        },
        tableTotal: {
          margin: [5, 5, 5, 5],
          bold: true,
          fontSize: 12,
        },
        statusText: {
          fontSize: 12,
          color: '#333',
        },
        footer: {
          fontSize: 14,
          italics: true,
          bold: true,
          color: FRANCHISE_MAIN_COLOR,
        },
      },
    };

    return pdfMake.createPdf(dd);
  }
}

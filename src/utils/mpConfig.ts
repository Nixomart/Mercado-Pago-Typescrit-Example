import * as MercadoPago from 'mercadopago';

export const mercadopago = {
    acces_token: "APP_USR-1546690050022270-012519-8faec084bd0e1627edb05a0877a7aadd-1295500452"
}

MercadoPago.configure({
    access_token: mercadopago.acces_token
})
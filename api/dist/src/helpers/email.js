"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchaseMail = exports.greetingsMail = exports.sendMail = void 0;
const nodemailer = require('nodemailer');
const createTrans = () => {
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "12753a589e2465",
            pass: "9bae82dd916865"
        }
    });
    return transport;
};
const sendMail = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = createTrans();
    const info = yield transporter.sendMail({
        from: '"Equipo de Mikasa Nueva" <foo@example.com>',
        to: `${user.email}`,
        subject: `Hola ${user.name}, ¬°¬°Bienvenido a Mikasa NUeva!!`,
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
        
        <head>
            <meta charset="UTF-8">
            <meta content="width=device-width, initial-scale=1" name="viewport">
            <meta name="x-apple-disable-message-reformatting">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta content="telephone=no" name="format-detection">
            <title></title>
            <!--[if (mso 16)]>
            <style type="text/css">
            a {text-decoration: none;}
            </style>
            <![endif]-->
            <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
            <!--[if gte mso 9]>
        <xml>
            <o:OfficeDocumentSettings>
            <o:AllowPNG></o:AllowPNG>
            <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
        </head>
        
        <body>
            <div class="es-wrapper-color">
                <!--[if gte mso 9]>
              <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                <v:fill type="tile" color="#fafafa"></v:fill>
              </v:background>
            <![endif]-->
                <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
                    <tbody>
                        <tr>
                            <td class="esd-email-paddings" valign="top">
                                <table cellpadding="0" cellspacing="0" class="es-content esd-header-popover" align="center">
                                    <tbody>
                                        <tr>
                                            <td class="esd-stripe esd-synchronizable-module" align="center">
                                                <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: transparent;" bgcolor="rgba(0, 0, 0, 0)">
                                                    <tbody>
                                                        <tr>
                                                            <td class="esd-structure es-p20" align="left">
                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align="center" class="esd-block-text es-infoblock">
                                                                                                <p><a target="_blank">View online version</a></p>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table cellpadding="0" cellspacing="0" class="es-header" align="center">
                                    <tbody>
                                        <tr>
                                            <td class="esd-stripe esd-synchronizable-module" align="center">
                                                <table bgcolor="#ffffff" class="es-header-body" align="center" cellpadding="0" cellspacing="0" width="600">
                                                    <tbody>
                                                        <tr>
                                                            <td class="esd-structure es-p10t es-p10b es-p20r es-p20l" align="left">
                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td width="560" class="es-m-p0r esd-container-frame" valign="top" align="center">
                                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                                    <tbody>
                                                                                        <tr class="es-visible-simple-html-only">
                                                                                            <td align="center" class="esd-block-image es-p20b" style="font-size: 0px;">
                                                                                                <h1>Centinel Security</h1>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table cellpadding="0" cellspacing="0" class="es-content" align="center">
                                    <tbody>
                                        <tr>
                                            <td class="esd-stripe" align="center">
                                                <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600">
                                                    <tbody>
                                                        <tr>
                                                            <td class="esd-structure es-p30t es-p30b es-p20r es-p20l" align="left">
                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align="center" class="esd-block-image es-p10t es-p10b" style="font-size: 0px;"><a target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/102/102649.png?w=360" alt style="display: block;" width="100"></a></td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td align="center" class="esd-block-text es-p10b es-m-txt-c">
                                                                                                <h1 style="font-size: 46px; line-height: 100%;">Confirm Your Email</h1>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td align="center" class="esd-block-text es-p5t es-p5b es-p40r es-p40l es-m-p0r es-m-p0l">
                                                                                                <p>You‚Äôve received this message because your email address has been registered with our site. Please click the button below to verify your email address and confirm that you are the owner of this account.</p>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td align="center" class="esd-block-text es-p10t es-p5b">
                                                                                                <p>If you did not register with us, please disregard this email.</p>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td align="center" class="esd-block-button es-p10t es-p10b"><span class="es-button-border" style="border-radius: 6px;"><a href="http://localhost:3000/" class="es-button" target="_blank" style="border-left-width: 30px; border-right-width: 30px; border-radius: 6px;">CONFIRM YOUR EMAIL</a></span></td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td align="center" class="esd-block-text es-p5t es-p5b es-p40r es-p40l es-m-p0r es-m-p0l">
                                                                                                <p>Once confirmed, this email will be uniquely associated with your account.</p>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table cellpadding="0" cellspacing="0" class="es-footer" align="center">
                                    <tbody>
                                        <tr>
                                            <td class="esd-stripe esd-synchronizable-module" align="center">
                                                <table class="es-footer-body" align="center" cellpadding="0" cellspacing="0" width="640" style="background-color: transparent;">
                                                    <tbody>
                                                        <tr>
                                                            <td class="esd-structure es-p20t es-p20b es-p20r es-p20l" align="left">
                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td width="600" class="esd-container-frame" align="left">
                                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align="center" class="esd-block-social es-p15t es-p15b" style="font-size:0">
                                                                                                <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social">
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td align="center" valign="top" class="es-p40r"><a target="_blank" href><img title="Facebook" src="https://wnowhu.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" alt="Fb" width="32"></a></td>
                                                                                                            <td align="center" valign="top" class="es-p40r"><a target="_blank" href><img title="Twitter" src="https://wnowhu.stripocdn.email/content/assets/img/social-icons/logo-black/twitter-logo-black.png" alt="Tw" width="32"></a></td>
                                                                                                            <td align="center" valign="top" class="es-p40r"><a target="_blank" href><img title="Instagram" src="https://wnowhu.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png" alt="Inst" width="32"></a></td>
                                                                                                            <td align="center" valign="top"><a target="_blank" href><img title="Youtube" src="https://wnowhu.stripocdn.email/content/assets/img/social-icons/logo-black/youtube-logo-black.png" alt="Yt" width="32"></a></td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td align="center" class="esd-block-text es-p35b">
                                                                                                <p>Style Casual&nbsp;¬© 2021 Style Casual, Inc. All Rights Reserved.</p>
                                                                                                <p>4562 Hazy Panda Limits, Chair Crossing, Kentucky, US, 607898</p>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td class="esd-block-menu" esd-tmp-menu-padding="5|5" esd-tmp-divider="1|solid|#cccccc" esd-tmp-menu-color="#999999">
                                                                                                <table cellpadding="0" cellspacing="0" width="100%" class="es-menu">
                                                                                                    <tbody>
                                                                                                        <tr class="links">
                                                                                                            <td align="center" valign="top" width="33.33%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-top: 5px; padding-bottom: 5px;"><a target="_blank" href="https://" style="color: #999999;">Visit Us </a></td>
                                                                                                            <td align="center" valign="top" width="33.33%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-top: 5px; padding-bottom: 5px; border-left: 1px solid #cccccc;"><a target="_blank" href="https://" style="color: #999999;">Privacy Policy</a></td>
                                                                                                            <td align="center" valign="top" width="33.33%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-top: 5px; padding-bottom: 5px; border-left: 1px solid #cccccc;"><a target="_blank" href="https://" style="color: #999999;">Terms of Use</a></td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table cellpadding="0" cellspacing="0" class="es-content esd-footer-popover" align="center">
                                    <tbody>
                                        <tr>
                                            <td class="esd-stripe esd-synchronizable-module" align="center">
                                                <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: transparent;" bgcolor="rgba(0, 0, 0, 0)">
                                                    <tbody>
                                                        <tr>
                                                            <td class="esd-structure es-p20" align="left">
                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align="center" class="esd-block-text es-infoblock">
                                                                                                <p><a target="_blank"></a>No longer want to receive these emails?&nbsp;<a href target="_blank">Unsubscribe</a>.<a target="_blank"></a></p>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </body>
        
        </html>`
    });
});
exports.sendMail = sendMail;
const greetingsMail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = createTrans();
    yield transporter.sendMail({
        from: '<foo@example.com>',
        to: `${email}`,
        subject: `Bienvenida`,
        html: `<h1>¬°Muchas gracias por unirte a nuestra comunidad!</h1>
    <h1>Ahora vas a poder publicar y disfrutar de todo lo que Mikasa Nueva puede ofrecerte.</h1>
    <h1>¬°Sentite como en Kasa!</h1>
    `
    });
});
exports.greetingsMail = greetingsMail;
const purchaseMail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = createTrans();
    yield transporter.sendMail({
        from: '<foo@example.com>',
        to: `${email}`,
        subject: `¬°Gracias por tu pago!`,
        html: `<h1>En Mikasa Nueva apreciamos mucho tu aporte.</h1>
      <h1>Por eso ahora tu publicaci√≥n va a permanecer destacada indefinidamente.</h1>
      <h1>¬°Sentite como en Kasa!</h1>
      `
    });
});
exports.purchaseMail = purchaseMail;

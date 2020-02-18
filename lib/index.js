"use strict";

/**
 * Module dependencies
 */

/* eslint-disable import/no-unresolved */
/* eslint-disable prefer-template */
// Public node modules.
const _ = require("lodash");
const nodemailer = require("nodemailer");

/* eslint-disable no-unused-vars */
module.exports = {
  provider: "nodemailer",
  name: "Nodemailer",
  auth: {
    nodemailer_default_from: {
      label: "Nodemailer Default From",
      type: "text"
    },
    nodemailer_default_replyto: {
      label: "Nodemailer Default Reply-To",
      type: "text"
    },
    host: {
      label: "Host",
      type: "text"
    },
    port: {
      label: "Port",
      type: "number"
    }
  },

  init: config => {
    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: false
    });

    return {
      send: options => {
        console.log("Sending email", options, config);
        return new Promise((resolve, reject) => {
          // Default values.
          options = _.isObject(options) ? options : {};
          options.from = options.from || config.nodemailer_default_from;
          options.replyTo =
            options.replyTo || config.nodemailer_default_replyto;
          options.text = options.text || options.html;
          options.html = options.html || options.text;

          const msg = [
            "from",
            "to",
            "cc",
            "bcc",
            "subject",
            "text",
            "html",
            "attachments"
          ];

          transporter
            .sendMail(_.pick(options, msg))
            .then(resolve)
            .catch(error => {
              console.log("Error while sending email", JSON.stringify(error));
              reject(error);
            });
        });
      }
    };
  }
};

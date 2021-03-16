import Document, { Head, Html, Main, NextScript } from "next/document";
import React, { ReactElement } from "react";
import { ServerStyleSheet } from "styled-components";

export default class CustomDocument extends Document<{
  styleTags: ReactElement[];
}> {
  static getInitialProps({ renderPage }) {
    let sheet = new ServerStyleSheet();

    let page = renderPage((App) => (props) =>
      sheet.collectStyles(<App {...props} />)
    );

    let styleTags = sheet.getStyleElement();

    return { ...page, styleTags };
  }

  render() {
    return (
      <Html>
        <Head>{this.props.styleTags}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

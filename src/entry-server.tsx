// @refresh reload
import { createHandler, StartServer } from '@solidjs/start/server';

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <title>Expert Software Development Services | GABO Solutions</title>
          <meta
            name="description"
            content="Discover top-tier software development services with GABO Solutions. From SaaS to custom apps, we bring your digital projects to life with expert precision. Connect with us today to transform your ideas into reality!"
          />
          <meta
            name="keywords"
            content="gabo, solutions, software development, SaaS, business, startup, MVP, entrepreneurship"
          />
          <meta name="robots" content="index, follow" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <link rel="canonical" href="https://gabo.solutions/" />
          <meta
            property="og:title"
            content="Expert Software Development Services | GABO Solutions"
          />
          <meta
            property="og:description"
            content="Discover top-tier software development services with GABO Solutions. From SaaS to custom apps, we bring your digital projects to life with expert precision."
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://gabo.solutions/" />
          <meta
            property="og:image"
            content="https://gabo.solutions/images/social-share.jpg"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css"
          />
          <link href="images/webclip.png" rel="apple-touch-icon" />
          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));

import { A } from '@solidjs/router';

export default function about() {
  return (
    <main class="container mx-auto p-48 bg-stone-800 text-white min-h-full">
      <section class="text-center">
        <h1 class="text-4xl font-bold mb-6">About Us</h1>
        <p class="text-lg">
          GABO LLC is a software development company that specializes in
          building modern, scalable web applications. Our team consists of
          passionate developers, designers, and product managers dedicated to
          delivering high-quality software solutions that meet the needs of our
          clients.
        </p>
      </section>
      <section class="mt-10">
        <h2 class="text-3xl font-semibold text-center mb-4">Our Mission</h2>
        <p class="text-lg">
          Our mission is to empower businesses through technology. We strive to
          create products that enhance productivity, improve customer
          experience, and drive growth.
        </p>
      </section>
      <section class="mt-10">
        <h2 class="text-3xl font-semibold text-center mb-4">Our Team</h2>
        <p class="text-lg">
          We believe in the power of a diverse team to bring innovative ideas to
          the table. Our experts come from a variety of backgrounds, bringing a
          unique perspective to every project we undertake.
        </p>
      </section>
      <section class="mt-10">
        <h2 class="text-3xl font-semibold text-center mb-4">Get in Touch</h2>
        <p class="text-lg">
          Interested in learning more about our services or starting a project
          with us? Contact us at{' '}
          <a
            href="mailto:sendmessage@gabo.email"
            class="text-blue-600 hover:underline"
          >
            sendmessage@gabo.email
          </a>
          .
        </p>
      </section>
    </main>
  );
}

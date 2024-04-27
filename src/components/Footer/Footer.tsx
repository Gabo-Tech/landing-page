import { createEffect, onCleanup, onMount } from 'solid-js';
import { A, useLocation } from '@solidjs/router';

export default function Footer() {
  return (
    <footer class="bg-stone-700 text-white text-center p-4 pb-6 w-full">
      <div class="container mx-auto flex justify-between">
        <div>
          <h4>LEGAL</h4>
          <ul>
            <li>
              <A href="/privacy" class="hover:underline">
                Privacy Policy
              </A>
            </li>
            <li>
              <A href="/terms" class="hover:underline">
                Terms of Service
              </A>
            </li>
          </ul>
        </div>
        <div>
          <h4>COMPANY</h4>
          <ul>
            <li>
              <A href="/" class="hover:underline">
                Home
              </A>
            </li>
            <li>
              <A href="/about" class="hover:underline">
                About Us
              </A>
            </li>
            <li>
              <A href="/contact" class="hover:underline">
                Contact Us
              </A>
            </li>
            <li>
              <A href="/services" class="hover:underline">
                Services
              </A>
            </li>
            <li>© {new Date().getFullYear()} GABO LLC</li>
          </ul>
        </div>
        <div>
          <h4>GET HELP</h4>
          <ul>
            <li>
              <A href="/contact" class="hover:underline">
                Support
              </A>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

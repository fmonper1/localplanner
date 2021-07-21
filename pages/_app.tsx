import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../context/auth/auth-context";
import { Navbar } from "../layout/navbar";
import { NotificationProvider } from "../context/notifications/notification-context";
import Image from "next/image";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen h-full">
        <NotificationProvider>
          <Navbar />
        </NotificationProvider>
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>

        <footer>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <span>
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                width={72}
                height={16}
              />
            </span>
          </a>
        </footer>
      </div>
    </AuthProvider>
  );
}
export default MyApp;
